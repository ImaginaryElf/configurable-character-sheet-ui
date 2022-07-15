import { Player } from './player';

export class Game {
  id: PropertyKey;
  name: string | undefined;
  schema: any | undefined;
  layout: any | undefined;
  players: Player[] | undefined;

  constructor(
    id: PropertyKey,
    name: string,
    schema: any,
    layout: any,
    players: Player[]
  ) {
    this.id = id;
    this.name = name;
    this.schema = schema;
    this.layout = layout;
    this.players = players;
  }
}
