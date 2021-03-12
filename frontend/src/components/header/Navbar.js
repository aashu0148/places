import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import MenuIcon from "@material-ui/icons/Menu";

import "./Navbar.css";
let navbar, navbarCont, myTimer;
class Navbar extends Component {
  state = {
    mobile: window.innerWidth < 600,
    open: false,
  };
  componentDidMount() {
    navbarCont.style.height = `${navbar.offsetHeight}px`;
  }
  render() {
    function updateState(context) {
      context.setState({ mobile: window.innerWidth < 600 });
    }
    function debounce(context) {
      clearTimeout(myTimer);
      myTimer = setTimeout(() => {
        updateState(context);
      }, 500);
    }

    window.addEventListener("resize", () => {
      console.log(this.state.mobile);
      debounce(this);
    });

    return (
      <div ref={(el) => (navbarCont = el)} className="navbar_cont">
        <div ref={(el) => (navbar = el)} className="navbar">
          <div className="navbar_logo">Places</div>
          {this.state.mobile ? (
            <div
              className="navbar_burger"
              onClick={() => {
                this.setState({ open: !this.state.open });
              }}
            >
              {this.state.open ? <CloseIcon /> : <MenuIcon />}
            </div>
          ) : (
            ""
          )}
          <ul
            className={
              this.state.mobile
                ? this.state.open
                  ? "navbar_mob_list navbar_mob_list-active"
                  : "navbar_mob_list"
                : "navbar_list"
            }
          >
            <li>
              <NavLink to="/">My Places</NavLink>
            </li>
            <li>
              <NavLink to="/">New</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Navbar;
