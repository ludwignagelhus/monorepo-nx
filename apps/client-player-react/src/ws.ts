import { Action, ActionName, mkAction } from "@banano-casino/lib-casino";
import { flow as f, pipe as p } from "fp-ts/lib/function";
import * as R from "fp-ts/Record";
import SockJS from "sockjs-client";

const sock = new SockJS("http://localhost:4205");
// TODO: read about `this`-parameter.
sock.onopen = function (this: WebSocket, event: Event) {
  console.log("connected to server!");
};

sock.onmessage = (e) => {
  console.log(JSON.parse(e.data));
  /* TODO: handle state things with state machine...? */
};

sock.onclose = () => console.log("closed");

const send = <T extends Action>(data: any) => {
  sock.send(JSON.stringify(data));
};

/* = = = Actions = = = */

// Suspect can be typed correctly, but don't know with which fns... HKT? compose? extend? ¯\_(ツ)_/¯
export const wsSend = p(
  mkAction,
  R.map((fn: any) => f(fn, send))
) as { [K in ActionName]: (...args: Parameters<typeof mkAction[K]>) => void };
// /* ^Avoids duplicated code such as: */
// // export const reserveSeat = (table: string, seat: number) =>
// //   send({ kind: "reserveSeat", table, seat });
