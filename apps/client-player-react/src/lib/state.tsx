import { ChatMessage } from "@banano-casino/chat";
import { CasinoTable } from "@banano-casino/lib-poker-js";
import { createContext, useEffect, useState } from "react";

/* Using state machine on the client? */

/* Think yes. */

export type BananoCasino = {
  tables: Record<CasinoTable["id"], CasinoTable>;
  users: User[];
  chat: ChatMessage[];
};

/* Module for this? */
type User = {};

/* Store needs to... handle updating state somewhat? */
/* - state */
/* - getting lobby state and updating. */
/* - telling server we are no longer in the lobby, when lobby closes? */

/* - ponging when server pings? */
/* server may ping various rooms to determine whether any connections can be closed. */
/* How would client know whether one of it's windows are the lobby? */

/* Idk... first will receive all events always -> then improve. */
/* Can probably keep things like this for a long time. Even if 100 tables always running, */
/* still not that much data..? */
/* What would the potential refactoring look like? */

// TODO: use something else for state management.
// nanostores?
const ContextBananoCasino = createContext<BananoCasino>(null!);

export const ProviderBananoCasino = () => {
  const [casino, setCasino] = useState({
    tables: {},
    users: [],
    chat: [],
  });

  useEffect(() => {
    ws.
  }, []);

  return <ContextBananoCasino.Provider value={casino}></ContextBananoCasino.Provider>;
};
