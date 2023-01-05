import { ChatMessage } from "@banano-casino/chat";
import { CasinoTable } from "@banano-casino/lib-poker-js";
import { createContext, ReactNode, useEffect, useState } from "react";

/* Using state machine on the client? */
/* Think yes. */

export type BananoCasino = {
  tables: Record<CasinoTable["id"], CasinoTable>;
  users: User[];
  chat: ChatMessage[];
};

/* TODO: module for this. */
type User = {};

/* Idk... first will receive all events always -> then improve. */
/* Can probably keep things like this for a long time. Even if 100 tables always running, */
/* still not that much data..? */
/* What would the potential refactoring look like? */

// TODO: use something else for state management.
// nanostores?
const ContextBananoCasino = createContext<BananoCasino>(null!);

export const ProviderBananoCasino = (props: { children: ReactNode }) => {
  const [casino, setCasino] = useState({
    tables: {},
    users: [],
    chat: [],
  });

  /* ws. */
  useEffect(() => {}, []);

  return (
    <ContextBananoCasino.Provider value={casino}>{props.children}</ContextBananoCasino.Provider>
  );
};
