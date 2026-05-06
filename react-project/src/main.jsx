import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { Provider } from "react-redux";
import { store } from "./redux/store";

import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

// <App />
ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="849190322201-unot1oflrprcq20dmf5bh528srq14gsp.apps.googleusercontent.com">

    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </GoogleOAuthProvider>

);