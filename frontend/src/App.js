import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Main from "./components/body/Main";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/">
            <Header />
            <Main />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
