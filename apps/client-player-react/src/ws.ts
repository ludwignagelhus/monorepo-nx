import { ActionName, casino } from "@banano-casino/lib-casino";
import { flow as f, pipe as p } from "fp-ts/lib/function";
import * as R from "fp-ts/Record";
import SockJS from "sockjs-client";

export const sock = new SockJS("http://localhost:4205");
sock.onopen = function (this: WebSocket, event: Event) {
  console.log("connected to server!");
};

sock.onmessage = (e) => {
  console.log(JSON.parse(e.data));
};

sock.onclose = () => console.log("closed");

const send = (data: any) => {
  sock.send(JSON.stringify(data));
};

/* = = = Actions = = = */

// Suspect can be typed correctly, but don't know with which fns... HKT? compose? extend? ¯\_(ツ)_/¯
export const wsSend = p(
  casino,
  R.map((fn: any) => f(fn, (action) => sock.OPEN && send(action)))
) as { [K in ActionName]: (...args: Parameters<typeof casino[K]>) => void };
// /* ^Avoids duplicated code such as: */
// // export const reserveSeat = (table: string, seat: number) =>
// //   send({ kind: "reserveSeat", table, seat });
