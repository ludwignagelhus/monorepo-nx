import { PokerHand } from "./getHandValue";

export type ConfigHandStrength = {
  /* TODO?: rename to nHoleCardsToUse? */
  nHoleCardsToUse: number; // number of holecards which can be used in made hand.
  // Hand presedence (also specifies which potential special hand variants to include)?
  handPresedence: PokerHand["kind"];
  // Any other things which could be configuarable?
};
