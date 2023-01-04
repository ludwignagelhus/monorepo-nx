import { useEffect } from "react";
import { wsSend } from "../../ws";

/* Some kinda table format? column names at the top. */

export const Lobby = () => {
  useEffect(() => {
    wsSend.lobbyJoin();
    return wsSend.lobbyLeave;
  }, []);

  return (
    <div className="w-full">
      <div className={"w-full flex flex-col gap-4 p-5 relative"}>
        <div className="w-full bg-blue-300 h-20"></div>
        <TableInList />
        <TableInList />
        <TableInList />
      </div>
    </div>
  );
};

const TableInList = () => {
  return (
    <div className="flex flex-row rounded gap-8 p-2.5 bg-base-300 hover:bg-base-200 select-none shadow-md">
      <p style={{ fontWeight: "bold" }}>Amazonas</p>
      <p>No-limit Texas hold'em</p>
      <p>3/4</p>
    </div>
  );
};
