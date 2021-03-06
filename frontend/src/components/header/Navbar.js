import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import MenuIcon from "@material-ui/icons/Menu";

import NewModal from "../modal/New";
import "./Navbar.css";
let navbar, navbarCont, myTimer;

class Navbar extends Component {
  state = {
    mobile: window.innerWidth < 600,
    open: false,
    showModal: false,
  };
  componentDidMount() {
    navbarCont.style.height = `${navbar.offsetHeight}px`;
  }
  render() {
    function debounce(context) {
      clearTimeout(myTimer);
      myTimer = setTimeout(() => {
        context.setState({ mobile: window.innerWidth < 600 });
      }, 500);
    }

    window.addEventListener("resize", () => {
      debounce(this);
    });
    return (
      <div ref={(el) => (navbarCont = el)} className="navbar_cont">
        <NewModal
          show={this.state.showModal}
          hide={() => this.setState({ showModal: false })}
        />

        <div ref={(el) => (navbar = el)} id="navbar" className="navbar">
          <Link style={{ textDecoration: "none", color: "#000" }} to="/">
            <div className="navbar_logo">Places</div>
          </Link>
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
              <NavLink to="/users">All users</NavLink>
            </li>
            {this.props.auth ? (
              <li>
                <NavLink to="/my-places">Fav Places</NavLink>
              </li>
            ) : (
              ""
            )}
            {this.props.auth ? (
              <li>
                <a onClick={() => this.setState({ showModal: true })}>New</a>
              </li>
            ) : (
              ""
            )}

            {this.props.auth ? (
              <li>
                <NavLink
                  onClick={this.props.logoutAction}
                  style={{ textTransform: "capitalize" }}
                  to="/"
                >
                  {this.props.name} Logout?
                </NavLink>
              </li>
            ) : (
              <li>
                <NavLink to="/auth">Login</NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    name: state.name,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutAction: () => dispatch({ type: "LOGOUT" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
