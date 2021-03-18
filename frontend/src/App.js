import React from "react";
import jwt from "jsonwebtoken";
import { connect } from "react-redux";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import key from "./secret";
import Header from "./components/header/Header";
import Navbar from "./components/header/Navbar";
import Main from "./components/body/Main";
import Users from "./components/users/Users";
import UserPlaces from "./components/users/UserPlaces";
import FavPlaces from "./components/body/FavPlaces";
import Auth from "./components/Auth/Auth";
import "./App.css";

function App(props) {
  const token = JSON.parse(localStorage.getItem("placesUser")) || "";

  jwt.verify(token, key, (err, data) => {
    if (err) {
      localStorage.removeItem("placesUser");
    } else {
      fetch(`/users/${data.id}`)
        .then((res) => res.json())
        .then((res) => {
          props.autoLoginAction(res.id, res.name, res.userPhoto, res.fav);
        });
    }
  });

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
          <Route path="/my-places" exact>
            <Navbar />
            <FavPlaces />
          </Route>
          <Route path="/auth" component={Auth} />
          <Route path="/">
            <Header />
            <Main />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    autoLoginAction: (id, name, userPhoto, places, fav) =>
      dispatch({ type: "AUTO_LOGIN", id, name, userPhoto, fav }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
