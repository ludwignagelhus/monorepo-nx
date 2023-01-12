import { PokerTable, Seat } from "@banano-casino/lib-poker-js";
import { tuple } from "fp-ts-std";
import * as A from "fp-ts/Array";

/* This is probably some of the most complicated game logic. */
export const bumpPlayerToAct = (table: PokerTable) => {
  const t = table;
  const iCurrent = table.playerToAct;

  /* Rearrange seats so that current is at index 0. */
  const psIAndSeat = table.seats.map((s, i) => tuple.create([i, s]));
  const rearranged = A.rotate(t.playerToAct)(psIAndSeat);

  const next = rearranged.find(([i, s]) => canAct(s));

  /* who is the next player... */
  /* - has cards */
  /* - has chips */
  /* - not sitting out? handle here or in parent? */

  /* how to handle when nextToAct is sitting out... */

  return t;
};

export const canAct = (seat: Seat) =>
  seat.kind === "taken" && seat.player.cards.length > 0 && seat.player.stack > 0;
