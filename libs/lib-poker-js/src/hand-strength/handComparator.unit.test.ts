import { Card } from "../shared/card";
import { PokerHand } from "./getHandValue";
import { handComparator } from "./handComparator";

test("highest pair decides winner.", () => {
  const h1: PokerHand = {
    kind: "twoPair",
    cards: [
      Card(14, "hearts"),
      Card(14, "spades"),
      Card(2, "hearts"),
      Card(2, "spades"),
      Card(4, "clubs"),
    ],
  };
  const h2: PokerHand = {
    kind: "twoPair",
    cards: [
      Card(13, "hearts"),
      Card(13, "spades"),
      Card(12, "hearts"),
      Card(12, "spades"),
      Card(2, "spades"),
    ],
  };
  expect(handComparator(h1, h2)).toEqual(1);
});

test("high card decides winner when pairs are equal.", () => {
  const h1: PokerHand = {
    kind: "twoPair",
    cards: [
      Card(14, "hearts"),
      Card(14, "spades"),
      Card(2, "hearts"),
      Card(2, "spades"),
      Card(7, "hearts"),
    ],
  };
  const h2: PokerHand = {
    kind: "twoPair",
    cards: [
      Card(14, "clubs"),
      Card(14, "diamonds"),
      Card(2, "clubs"),
      Card(2, "diamonds"),
      Card(8, "spades"),
    ],
  };
  expect(handComparator(h1, h2)).toEqual(-1);
});

// /* Advanced one; full house has some special logic. */
test("hand strength is tied.", () => {
  const h1: PokerHand = {
    kind: "twoPair",
    cards: [
      Card(14, "hearts"),
      Card(14, "spades"),
      Card(2, "hearts"),
      Card(2, "spades"),
      Card(10, "hearts"),
    ],
  };
  const h2: PokerHand = {
    kind: "twoPair",
    cards: [
      Card(14, "clubs"),
      Card(14, "diamonds"),
      Card(2, "clubs"),
      Card(2, "diamonds"),
      Card(10, "spades"),
    ],
  };
  expect(handComparator(h1, h2)).toEqual(0);
});
