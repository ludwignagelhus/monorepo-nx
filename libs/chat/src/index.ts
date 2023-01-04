/* Maybe put channelId on chatMessage? */
/* Maybe can extend ... Room? */
export type Channel = {
  name: string;
  id: string;

  muted: string[]; // Array<player["id"]>
};

/* Hmmm... what has what and what are relationships? */
/* Sketch out on paper? */
/* - room */
/* - joinable by players */
/* - connection */
/* - chat */
/* - user */

/* Chat and Table both extend Joinable? */
/* If even want... data transmission mixed up with data... */
/* chat,tables <-> communication <-> client */

/* WIP. */
/* Who can post in a channel. */
/* By levels? */
/* TODO: Find better name. */
type PostingStatus = {
  whitelisted: string[];
  groups: string[];
};

export type ChatMessage = {
  playerName: string;
  text: string;
};
