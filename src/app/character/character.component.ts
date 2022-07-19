import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameRepository } from '../../repositories/game.repository';
import { ActivatedRoute } from '@angular/router';
import { ApiClientService } from '../../services/api-client.service';
import { Game } from '../../models/game';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { get } from 'lodash-es';

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
  form!: FormGroup;

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
        this.game = game;
        console.log('game: ' + JSON.stringify(this.game));
        const characters = game?.players?.flatMap((p: any) => p.characters);
        this.character = characters?.find((c: any) => c.id == this.characterId);
        console.log('character: ' + JSON.stringify(this.character));
        this.constructForm();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  constructForm() {
    const layoutControls: any[] = [];
    this.game?.layout.tabs.forEach((t: any) => {
      if (t.rows) {
        layoutControls.push(this.getLayoutControls(t.rows));
      }
    });
    if (layoutControls.length < 0 || !this.game || !this.character) {
      return;
    }
    this.constructFormControls(
      [],
      [],
      this.character,
      layoutControls,
      this.form
    );
  }

  getLayoutControls(rows: any[]) {
    return rows.flatMap((r) => {
      if (r.columns) {
        r.columns.flatMap((c: any) => {
          if (c.control) {
            return c.control;
          } else if (c.rows) {
            return this.getLayoutControls(c.rows);
          }
        });
      }
    });
  }

  constructFormControls(
    path: string[],
    layoutRef: string[],
    obj: any,
    layoutControls: any[],
    form: AbstractControl | null | undefined
  ) {
    if (!obj || !form) {
      return;
    }

    for (const key in obj) {
      if (obj[key] && typeof obj[key] == 'object') {
        path.push(key);
        layoutRef.push(key);
        (form as FormGroup).addControl(key, new FormGroup({}));
        this.constructFormControls(
          path,
          layoutRef,
          obj[key],
          layoutControls,
          form?.get(key)
        );
      } else if (Array.isArray(obj[key]) && typeof obj[key][0] == 'object') {
        layoutRef.push(key);
        obj[key].forEach((item: any, index: number) => {
          path.push(`${key}[${index}]`);
          (form?.get(key) as FormArray).push(new FormGroup({}));
          this.constructFormControls(
            path,
            layoutRef,
            item,
            layoutControls,
            form?.get(`${key}[${index}]`)
          );
        });
      } else if (Array.isArray(obj[key]) || obj.hasOwnProperty(key)) {
        path.push(key);
        layoutRef.push(key);
        const layoutControl = layoutControls.find(
          (lc: any) =>
            lc.dataField ==
            (layoutRef.length <= 1 ? layoutRef[0] : layoutRef.join('.'))
        );
        const control = this.constructFormControl(
          layoutControl,
          get(this.character, path)
        );
        (form as FormGroup).addControl(key, control);
      }
    }
  }

  constructFormControl(layoutControl: any, charPropValue: any) {
    switch (layoutControl.type) {
      case 'textInput':
      case 'numericInput':
      case 'tableInput':
      case 'boolInput':
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
    const path = formPath.substring(0, formPath.lastIndexOf('.'));
    return this.form.get(path) as FormGroup;
  }

  getFormControl(formPath: string) {
    return this.form.get(formPath) as FormArray;
  }

  getControlName(formPath: string) {
    return formPath.substring(
      formPath.lastIndexOf('.') + 1,
      formPath.length - 1
    );
  }

  onSubmit() {
    console.log('Form submit: ' + this.form.value);
  }
}
