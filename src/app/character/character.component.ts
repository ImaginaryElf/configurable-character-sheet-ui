import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {GameRepository} from '../../repositories/game.repository';
import {ActivatedRoute} from '@angular/router';
import {ApiClientService} from '../../services/api-client.service';
import {Game} from '../../models/game';
import {AbstractControl, FormArray, FormControl, FormGroup,} from '@angular/forms';
import {flattenDeep, get} from 'lodash-es';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
})
export class CharacterComponent implements OnInit, OnDestroy {
  characterId: string = '';
  character: any;
  game: Game | undefined;
  subscriptions: Subscription = new Subscription();
  form: FormGroup = new FormGroup({});

  constructor(
    private gameRepo: GameRepository,
    private activatedRoute: ActivatedRoute,
    private apiClientService: ApiClientService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.activatedRoute.paramMap.subscribe((params: any) => {
        this.characterId = params.get('id');
        this.apiClientService.getGameByCharacter(this.characterId).subscribe();
      })
    );
    this.subscriptions.add(
      this.gameRepo.game$.subscribe((game) => {
        if(!game?.layout?.tabs || !game?.players) {
          return;
        }
        this.game = game;
        const characters = game?.players?.flatMap((p: any) => p.characters);
        this.character = characters?.find((c: any) => c.id == this.characterId);
        this.constructForm(game);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  constructForm(game: Game) {
    let layoutControls: any[] = [];
    game.layout.tabs.forEach((t: any) => {
      if (t.layout.rows) {
        const controls = this.getLayoutControls(t.layout.rows);
        layoutControls.push(controls);
      }
    });
    layoutControls = flattenDeep(layoutControls);
    if (layoutControls.length < 0 || !game || !this.character) {
      return;
    }
    this.constructFormControls(
      '',
      '',
      this.character,
      layoutControls,
      this.form
    );
  }

  getLayoutControls(rows: any[]) {
    let controls: any[] = [];
    rows.forEach((r) => {
      if(r.control) {
        controls.push(r.control);
      }
      if (r.columns) {
        r.columns.forEach((c: any) => {
          if (c.control) {
            controls.push(c.control);
          }
          if(c.rows) {
            const subControls = this.getLayoutControls(c.rows);
            controls.push(subControls);
          }
        });
      }
    });
    return controls;
  }

  constructFormControls(
    parentPath: string | undefined,
    layoutPath: string | undefined,
    obj: any,
    layoutControls: any[],
    form: AbstractControl | null | undefined
  ) {
    if (!obj || !form) {
      return;
    }
    for (const key in obj) {
      if(key != 'id') {
        if (obj[key] && !Array.isArray(obj[key]) && typeof obj[key] == 'object') {
          (form as FormGroup).addControl(key, new FormGroup({}));
          this.constructFormControls(
            `${parentPath ? parentPath + '.' : ''}${key}`,
            `${layoutPath ? layoutPath + '.' : ''}${key}`,
            obj[key],
            layoutControls,
            form?.get(key)
          );
        } else if (obj[key] && Array.isArray(obj[key]) && typeof obj[key][0] == 'object') {
          let formGroups: FormGroup[] = [];
          obj[key].forEach((item: any, index: number) => {
            formGroups.push(new FormGroup({}));
            this.constructFormControls(
              `${parentPath ? parentPath + '.' : ''}${key}[${index}]`,
              `${layoutPath ? layoutPath + '.' : ''}${key}`,
              item,
              layoutControls,
              formGroups[index]
            );
          });
          (form as FormGroup).addControl(key, new FormArray(formGroups));
        } else if (Array.isArray(obj[key]) || obj.hasOwnProperty(key)) {
          let layoutRefString = `${layoutPath ? layoutPath + '.' : ''}${key}`;
          if(parentPath && parentPath.lastIndexOf(']') == parentPath.length - 1) {
            layoutRefString = layoutPath ? layoutPath : '';
          }
          const objectPropertyPath = `${parentPath ? parentPath + '.' : ''}${key}`;
          const layoutControl = layoutControls.find((lc: any) => lc.dataField == layoutRefString);
          const objectValue = get(this.character, objectPropertyPath);
          const control = this.constructFormControl(
            layoutControl,
            objectValue
          );
          (form as FormGroup).addControl(key, control);      }

      }
    }
  }

  constructFormControl(layoutControl: any, charPropValue: any) {
    switch (layoutControl.type) {
      case 'textInput':
      case 'numericInput':
      case 'boolInput':
      case 'tableInput':
        return new FormControl(charPropValue);
      case 'listInput':
        let formControls: FormControl[] = [];
        charPropValue.forEach((val: any) => {
          formControls.push(new FormControl(val));
        });
        return new FormArray(formControls);
      default:
        return;
    }
  }

  getParentControl(formPath: string) {
    if(formPath.includes('.')) {
      const path = formPath.substring(0, formPath.lastIndexOf('.'));
      return this.form.get(path) as FormGroup;
    } else {
      return this.form;
    }
  }

  getFormControl(formPath: string) {
    return this.form.get(formPath) as FormArray;
  }

  getControlName(formPath: string) {
    if(formPath.includes('.')) {
      return formPath.substring(
        formPath.lastIndexOf('.') + 1,
        formPath.length
      );
    } else {
      return formPath;
    }
  }

  onSubmit() {
    console.log('Form submit: ' + this.form.value);
  }
}
