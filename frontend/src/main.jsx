import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import config from "../config.jsx";
import { Provider } from "react-redux";
import store from "./redux/store";


const environment = process.env.NODE_ENV || 'development';
const { API_BASE_URL } = config[environment];

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
