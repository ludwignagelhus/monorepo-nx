import { Link, Navigate, Route, Routes } from "react-router-dom";
import { Table } from "./routes/Table";
import { Lobby } from "./routes/Lobby";

export function App() {
  return (
    <>
      <div className="flex flex-row gap-10 m-5" role="navigation">
        <Link to="table">Table</Link>
        <Link to="lobby">Lobby</Link>
      </div>

      <Routes>
        // "/" goes to page/component(s) being developing.
        <Route path="/" element={<Navigate to="table" />} />
        <Route path="table">
          <Route path=":tableName" element={<Table />} />
        </Route>
        <Route path="table" element={<Table />} />
        <Route path="lobby" element={<Lobby />} />
      </Routes>
    </>
  );
}
