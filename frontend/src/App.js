import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Navbar from "./components/header/Navbar";
import Main from "./components/body/Main";
import Users from "./components/users/Users";
import UserPlaces from "./components/users/UserPlaces";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route
            path="/users/:uid"
            render={(props) => {
              return (
                <>
                  <Navbar />
                  <UserPlaces {...props} />
                </>
              );
            }}
          />
          <Route path="/users" exact>
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
