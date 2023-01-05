import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./app";
import { ProviderBananoCasino } from "./lib/state";

import "./ws";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <BrowserRouter>
    <ProviderBananoCasino>
      <App />
    </ProviderBananoCasino>
  </BrowserRouter>
);
