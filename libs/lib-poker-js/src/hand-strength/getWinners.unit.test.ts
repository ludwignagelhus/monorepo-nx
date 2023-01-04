import { NonEmptyArray } from "fp-ts/lib/NonEmptyArray";
import { Card } from "../shared/card";
import { getWinners } from "./getWinners";

/* TODO: in this module, one describe block for omaha, and one describe block for hold'em. */
/* Hold em first, even though it is actually covered by omaha? -> strive for simplicity and */
/* explicitness over DRY-ness. */

/* ===== Begin hold'em. ===== */

describe("find winning hold'em hands", () => {
  const communityCards: NonEmptyArray<Card> = [
    Card(12, "spades"),
    Card(11, "spades"),
    Card(10, "spades"),
    Card(10, "hearts"),

    Card(3, "hearts"),
  ];

  /* TODO: after refactor, these consts should hold the actual hand value; not just */
  /* the holecards used to find the hand value. */
  const royalFlush = [Card(14, "spades"), Card(13, "spades")],
    straightFlush = [Card(9, "spades"), Card(8, "spades")],
    fourOfAKind = [Card(10, "diamonds"), Card(10, "clubs")],
    fullHouse = [Card(11, "spades"), Card(10, "spades")],
    flush = [Card(5, "spades"), Card(4, "spades")],
    straight = [Card(13, "clubs"), Card(9, "clubs")],
    threeOfAKind = [Card(10, "diamonds"), Card(14, "hearts")],
    twoPair = [Card(11, "spades"), Card(9, "hearts")],
    pair = [Card(6, "diamonds"), Card(5, "diamonds")];

  test("royal flush is better than straight flush.", () =>
    expect(getWinners([royalFlush, straightFlush], communityCards)).toEqual([0]));

  test("straight flush is better than four of a kind.", () =>
    expect(getWinners([straightFlush, fourOfAKind], communityCards)).toEqual([0]));

  test("four of a kind is better than full house.", () =>
    expect(getWinners([fourOfAKind, fullHouse], communityCards)).toEqual([0]));

  test("full house is better than flush.", () =>
    expect(getWinners([fullHouse, flush], communityCards)).toEqual([0]));

  test("flush is better than straight.", () =>
    expect(getWinners([flush, straight], communityCards)).toEqual([0]));

  test("straight is better than three of a kind.", () =>
    expect(getWinners([straight, threeOfAKind], communityCards)).toEqual([0]));

  test("three of a kind is better than two pair.", () =>
    expect(getWinners([threeOfAKind, twoPair], communityCards)).toEqual([0]));

  test("two pair is better than pair.", () =>
    expect(getWinners([twoPair, pair], communityCards)).toEqual([0]));

  // TODO Need another set of community cards to test high card.
  test("two pair is better than pair.", () =>
    expect(getWinners([twoPair, pair], communityCards)).toEqual([0]));
});

// /* TODO: multiple winners (same hole cards). */
// /* TODO: multiple winners/tie (board equals winning hand). */
// /* TODO: winning hand has two holecards which make up a straight, but one of the hole cards are also on the board. */
// /*       see below: */
// /*     In case of a tie/to make the hand value, either card from hand or the board can be used... */
// /*       Which card to use? hand or community? Giving community presedence makes things easier to process; */
// /*       Less cards as highlighted as "used". */
// /*     Ie. hole cards only used if they can be used to get a better hand value than the 5 community cards. */

// // it("should find the two winners with the same hand strength.", () => {
// //   const communityCards: Card[] = [
// //     Card(9, "diamonds"),
// //     Card(8, "hearts"),
// //     Card(2, "spades"),
// //     Card(8, "clubs"),
// //     Card(8, "spades"),
// //     Card(3, "clubs"),
// //     Card(8, "diamonds"),
// //   ];

// //   expect(getWinners([[Card(3, "hearts")]], communityCards)).toEqual([0]);
// // });

/* ===== End hold'em. ===== */

/* ===== Begin omaha ===== */

/* Shouldn't really need a file for both nlhe and omaha... */

/* How would a good test for this look like? */

/* two players with cards which make multiple made hands */
/* -> for each player, find their strongest hand. */
/* -> find the  correct winner of the hand. */

/* Can probably put tests for both holdem and omaha in same file. */

// describe("find winning omaha hands.", () => {
//   const communityCards: NonEmptyArray<Card> = [
//     Card(12, "spades"),
//     Card(11, "spades"),
//     Card(10, "spades"),
//     Card(10, "hearts"),

//     Card(4, "clubs"),
//     Card(9, "diamonds"),
//     Card(3, "hearts"),
//   ];

//   /* TODO: copy over code from hold em tests? */
//   /* Anyway, make holdem tests pretty first. */
//   // const holeCards: Partial<Record<HandName, Card[]>> = {
//   //   royalFlush: [Card(14, "spades"), Card(13, "spades")],
//   //   STRAIGHT_FLUSH: [Card(9, "spades"), Card(8, "spades")],
//   //   FOUR_OF_A_KIND: [Card(10, "diamonds"), Card(10, "clubs")],
//   //   FULL_HOUSE: [Card(11, "spades"), Card(10, "spades")],
//   //   FLUSH: [Card(5, "spades"), Card(4, "spades")],
//   //   STRAIGHT: [Card(13, "clubs"), Card(9, "clubs")],
//   //   THREE_OF_A_KIND: [Card(10, "diamonds"), Card(14, "hearts")],
//   //   TWO_PAIR: [Card(11, "spades"), Card(9, "hearts")],
//   //   PAIR: [Card(6, "diamonds"), Card(5, "diamonds")],
//   // };

//   it("royal flush is better than straight flush.", () =>
//     expect(
//       getWinners(
//         [
//           [Card(4, "spades"), Card(5, "spades"), Card(6, "hearts"), Card(7, "hearts")],
//           [
//             Card(2, "clubs"),
//             Card(2, "clubs"),
//             Card(2, "clubs"),
//             Card(2, "clubs"),
//             Card(2, "clubs"),
//           ],
//         ],
//         []
//       )
//     ).toEqual([0]));
// });

/* ===== End omaha. ===== */
