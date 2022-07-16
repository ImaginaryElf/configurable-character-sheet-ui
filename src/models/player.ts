export class Player {
  id: PropertyKey;
  characters: any[];

  constructor(id: PropertyKey, characters: any[]) {
    this.id = id;
    this.characters = characters;
  }
}
