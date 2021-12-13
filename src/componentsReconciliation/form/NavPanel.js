import React, { useState, useEffect } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  DropdownToggle,
  Dropdown,
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import Notifications from "./Notification";
import logo from "../../assets/Logo-2.png";
import { act } from "react-dom/test-utils";

const NavPanel = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notify, setNotify] = useState(false);
  const [active, setActive] = useState("");
  const [logout, setLogout] = useState(false);

  const history = useHistory();
  useEffect(() => {
    if (
      history.location.pathname == "/" ||
      history.location.pathname == "/signup"
    ) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [history.location.pathname]);

  const toggle = () => setIsOpen(!isOpen);

  const notificationsddToggle = (e) => {
    setNotify(!notify);
  };

  const notifications = [
    {
      title: "Deadline Confirmed",
      type: "unread",
    },
    {
      title: "Request for deadline extention",
      type: "read",
    },
    {
      title: "CV of Arbitrator Uploaded",
      type: "unread",
    },
    {
      title: "RFA Filed",
      type: "read",
    },
  ];

  const handleClick = () => {
    if (active == "Login") {
      history.push("/login");
    } else {
      localStorage.removeItem("x-auth-token");
      localStorage.removeItem("iicra-token");
      history.push("/login");
    }
  };

  return (
    <div>
      <Navbar light expand="md" style={styles.navbar} className="shadow-sm">
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink style={styles.navLink} href="https://www.iicra.com">
                <img src={logo} style={styles.logo} />
              </NavLink>
            </NavItem>
          </Nav>
          {/* <Dropdown isOpen={notify} toggle={(e) => notificationsddToggle(e)}>
            <DropdownToggle caret nav>
              <i className="i-bell"></i>
              <span className="badge badge-pill badge-warning">
                {notifications.length}
              </span>
            </DropdownToggle>
            <Notifications notifications={notifications} />
          </Dropdown> */}
          <NavbarText className="mr-3" onClick={handleClick}>
            {active ? <span style={styles.login}>Log in</span> : false}
          </NavbarText>
          <NavbarText className="mr-5">
            <img
              onClick={() => setLogout(!logout)}
              src={require("../../assets/user.png")}
              style={styles.navIcon}
            />
            {logout ? (
              <span
                className="shadow"
                style={styles.logout}
                onClick={() => {
                  localStorage.removeItem("x-auth-token");
                  localStorage.removeItem("iicra-token");
                  setLogout(!logout);
                  history.push("/login");
                }}
              >
                Logout
              </span>
            ) : null}
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

const styles = {
  navbar: {
    backgroundColor: "white",
    height: "8vh",
    position: "fixed",
    width: "100vw",
    top: 0,
    zIndex: 10,
    //also go to App.js and check styles.cover // paddingTop
  },
  navLink: {
    color: "black",
    fontWeight: "bold",
    fontSize: "15px",
  },
  logo: {
    height: "6vh",
  },
  login: {
    fontSize: "14px",
    cursor: "pointer",
    color: "black",
  },
  logout: {
    position: "absolute",
    top: "9vh",
    right: "2vw",
    backgroundColor: "white",
    borderRadius: "3px",
    minWidth: "4vw",
    textAlign: "center",
    fontSize: "16px",
    padding: "1vh 2vh",
    cursor: "pointer",
    color: "black",
  },
  navIcon: { height: "3.5vh", cursor: "pointer" },
};

export default NavPanel;
