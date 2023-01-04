import { ChatMessage } from "@banano-casino/chat";

export interface CasinoTable {
  id: string;
  chat: ChatMessage[];
  name: string;
  spectators: string[]; // players' display names. idk some way so users can communicate/interact.
  waitingList: string[]; // players waiting to join the game.
  // seats: unknown[]; // would something like this work?
}
