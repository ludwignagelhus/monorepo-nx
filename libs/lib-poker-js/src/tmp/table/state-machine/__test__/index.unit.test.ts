import { Card, PokerTable } from "@banano-casino/lib-poker-js";
import * as A from "fp-ts/lib/Array";
import { difference } from "ramda";
import { initHand, PokerAction } from "..";
import { testTableConfig } from "./test-util";

/* Testing special hand things...? */

/* Raising has a few edge cases: */
/* - side pots. */
/*   -  */
/* - last raise (short stacked all in) was not large enough to let other players rereaise. */

/* straddling */
/* - preflop action happens according to straddler(s) seat positions. */

/* This (test... case?) might be really good. */
/* Tests are not isolated... */
/* But get to check logic design, and that things work well together. */
/* Ask a senior for their opinion when logic and test is working as intended. */

/* Actually... */
/* Maybe split somethings up... */
/*  */
describe("Hand is played to completion without errors:", () => {
  /* Hand description: */
  /* Semi realistic play. */

  /* Want to test: */
  /* - table and hand initialization */
  /* -  */

  /* pos: holecards (stack) */
  /* - 6 players */
  /* - utg: KcQc (90bb)  */
  /* - mp: Qh4s (100bb) */
  /* - co: 6h6d (80bb) */
  /* - btn: 2s10h (100bb)  */
  /* - sb: AhAs (150bb) */
  /* - bb: 8d9d (140bb) */

  /* - utg 3x open */
  /* - mp fold */
  /* - co call */
  /* - button fold */
  /* - sb 3bet to 13bb */
  /* - bb cold calls */
  /* - utg calls */
  /* - co calls */

  /* flop: [6c,2c,7h] (52bb) */
  /* - sb bet 21bb  */
  /* - bb call */
  /* - utg call */
  /* - co call */

  /* turn: [Ad] */
  /* - sb check  */
  /* - bb bet all in */
  /* - utg call */
  /* - co call */
  /* - sb call */

  /* river: [7c] */
  /* no more betting */
  /* -> find winners for all pots. */

  /* TODO: also need to include post-flop cards. */
  const testCards = [
    Card(12, "clubs"),
    Card(11, "clubs"),

    Card(12, "hearts"),
    Card(4, "spades"),

    Card(6, "clubs"),
    Card(6, "diamonds"),

    Card(2, "spades"),
    Card(10, "hearts"),

    Card(14, "hearts"),
    Card(14, "spades"),

    Card(9, "diamonds"),
    Card(8, "diamonds"),
  ];

  let table = PokerTable(testTableConfig);

  /* - Init table. */
  /*   - have players sit down. */
  /*   - players put chips on table. */
  /*   - players sit in. */

  /* - Init hand. */
  /*   - set button and set blinds. */
  /*   - post blinds. */
  /*   - deal cards. */
  /*     - only players not sitting out get dealt cards. */
  describe("Initializes table for new hand correctly.", () => {
    let t = PokerTable(testTableConfig);
    let actions: PokerAction[];

    [t, actions] = initHand(t);

    const expected: PokerTable = t;
    test("Has a deck.", () => {
      expect(t.deck.length).toEqual(52);
    });

    t.deck = stackDeck(t.deck, testCards);

    test("Has correctly posted blinds correctly and antes.", () => {
      /* How to test this? */
      /* Blind seats bets correspond to tables config values for blinds. */
      /* pot correspond to players. */

      expect(t.deck.length).toEqual(52);
    });

    /* - preflop action works correctly */

    /* post flop action */
    /*  */
  });

  // it("initializes hand correctly.", () => {
  //   table = Table.updateTable(table, { kind: "setPokerConfig" });
  //   expect;
  // });
});

function stackDeck(deck: Card[], stackedCards: Card[]) {
  return A.concat(stackedCards)(difference(deck, stackedCards));
}
