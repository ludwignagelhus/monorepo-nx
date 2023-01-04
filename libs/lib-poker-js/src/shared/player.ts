import { Card } from "./card";

/* What about id property for types shared between client and server? */

export type Player = {
  name: string;
  holecards: Card[];
  stack: number;
  sittingOut: {
    is: boolean;
    since: Date;
  };
};
