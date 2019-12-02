import * as React from "react";
import { render } from "react-dom";
import { ThemeProvider } from "theme-ui";
import { roboto } from "@theme-ui/presets";

import App from "./App";

render(
  <ThemeProvider theme={roboto}>
    {" "}
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
