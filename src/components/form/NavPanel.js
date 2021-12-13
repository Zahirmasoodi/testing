import React, { useState, useEffect } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useHistory, useLocation } from "react-router-dom";

// import Notifications from "./Notification";
import logo from "../../assets/Logo-2.png";
import userIcon from "../../assets/user.png";

const NavPanel = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [notify, setNotify] = useState(false);
  const [active, setActive] = useState("");
  const [logout, setLogout] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const token = localStorage.getItem("x-auth-token");

  const location = useLocation().pathname;

  const history = useHistory();
  useEffect(() => {
    if (token) {
      setLogout(true);
    }

    // if (
    //   history.location.pathname == "/" ||
    //   history.location.pathname == "/signup"
    // ) {
    //   setActive(true);
    // } else {
    //   setActive(false);
    // }
    if (location == "/" || location == "/signup" || location == "/manual") {
      setActive(true);
    } else setActive(false);
  }, [location, token]);

  // const toggle = () => setIsOpen(!isOpen);

  // const notificationsddToggle = (e) => {
  //   setNotify(!notify);
  // };

  // const notifications = [
  //   {
  //     title: "Deadline Confirmed",
  //     type: "unread",
  //   },
  //   {
  //     title: "Request for deadline extention",
  //     type: "read",
  //   },
  //   {
  //     title: "CV of Arbitrator Uploaded",
  //     type: "unread",
  //   },
  //   {
  //     title: "RFA Filed",
  //     type: "read",
  //   },
  // ];

  const handleClick = () => {
    history.push("/login");
  };

  return (
    <div dir="ltr">
      <Navbar light expand="md" style={styles.navbar} className="shadow-sm">
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink
                style={styles.navLink}
                href="https://www.portal.iicra.com/"
                target="_blank"
                rel="noopener"
              >
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
          {/* <NavbarText className="mr-3" onClick={handleClick}>
            {active ? <span style={styles.login}>Log in</span> : null}
          </NavbarText>
          <NavbarText className="mr-3">
            <img
              onClick={() => setLogout(!logout)}
              src={userIcon}
              alt="icon"
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
          </NavbarText> */}
          <NavLink>
            <NavbarText className="mr-3" onClick={handleClick}>
              {active ? (
                <span style={styles.login}>
                  <b>Sign in</b>
                </span>
              ) : null}
            </NavbarText>
          </NavLink>
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle color="white">
              <img
                onClick={() => setLogout(!logout)}
                src={userIcon}
                alt="icon"
                style={styles.navIcon}
              />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Options</DropdownItem>
              <DropdownItem divider />
              {logout ? (
                <DropdownItem
                  onClick={() => {
                    localStorage.removeItem("x-auth-token");
                    localStorage.removeItem("iicra-token");
                    setLogout(!logout);
                    history.push("/login");
                  }}
                >
                  Logout
                </DropdownItem>
              ) : null}
              <DropdownItem divider />
              <DropdownItem>
                <a href="mailto:info@iicra.com" style={{ color: "black" }}>
                  Support
                </a>
              </DropdownItem>
              <DropdownItem divider />
            </DropdownMenu>
          </Dropdown>
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
    fontSize: "16px",
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
