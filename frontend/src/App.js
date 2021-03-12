import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Navbar from "./components/header/Navbar";
import Main from "./components/body/Main";
import Users from "./components/users/Users";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/users">
            <Navbar />
            <Users />
          </Route>
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
