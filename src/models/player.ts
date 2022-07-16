export class Player {
  id: PropertyKey;
  character: any;

  constructor(id: PropertyKey, character: any) {
    this.id = id;
    this.character = character;
  }
}
