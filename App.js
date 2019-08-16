import React from "react";

import { Provider } from "react-redux";

import Menu from "./src/Menu";
import { store } from "./src/redux";
import Dashboard from "./src/Dashboard";

const App = () => {
  return (
    <Provider store={store}>
      <Menu />
      <Dashboard />
    </Provider>
  );
};

export default App;
