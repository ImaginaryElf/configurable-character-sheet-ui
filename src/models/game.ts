import { Player } from './player';

export class Game {
  id: PropertyKey;
  gm_id: string;
  name: string | undefined;
  schema: any | undefined;
  layout: any | undefined;
  players: Player[] | undefined;

  constructor(
    id: PropertyKey,
    gm_id: string,
    name: string,
    schema: any,
    layout: any,
    players: Player[]
  ) {
    this.id = id;
    this.gm_id = gm_id;
    this.name = name;
    this.schema = schema;
    this.layout = layout;
    this.players = players;
  }
}
