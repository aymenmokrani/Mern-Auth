import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";
import { DataLayer } from "./utils/DataLayer";

ReactDOM.render(
  <BrowserRouter>
    <DataLayer>
      <App />
    </DataLayer>
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
