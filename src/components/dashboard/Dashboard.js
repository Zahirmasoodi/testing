import React, { Component } from "react";
import { Container, Row, Nav, NavItem, NavLink, Col } from "reactstrap";
import Scheduler from "./Scheduler";
import Notification from "rc-notification";
import "rc-notification/assets/index.css";
import axios from "axios";
import up from "../../assets/up.png";
import down from "../../assets/down.png";
import { getEnvironment } from "../../config";
import { withTranslation } from "react-i18next";

let notification = null;

Notification.newInstance(
  { style: { top: "10vh", right: "2vh" } },
  (n) => (notification = n)
);

class Dashboard extends Component {
  baseURL = getEnvironment().apiUrl;

  state = {
    matches: window.matchMedia("(min-width: 768px)").matches,

    dropdownOpen: false,
    arbitration: false,
    reconciliation: false,
    ciae: false,
    ypg: false,
    member: false,

    valid: false,
    // b1: true,
    // b2: false,
    // b3: false,
    // b4: false,
    // b5: false,

    arr1: false,
    arr2: false,
    arr3: false,
    arr4: false,
    arr5: false,

    left: false,

    notice: [],
  };

  sublink = {
    paddingLeft: "2vw",
    color: "white",
    backgroundColor: "green",
    paddingTop: "2vh",
    paddingBottom: "2vh",
    cursor: "pointer",
    borderRight: 0,
  };
  sublinkHover = {
    paddingLeft: "2vw",
    color: "white",
    backgroundColor: "green",
    paddingTop: "2vh",
    paddingBottom: "2vh",
    cursor: "pointer",
    borderRight: `3px solid white`,
  };

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  auth = JSON.parse(localStorage.getItem("iicra-token"));

  componentDidMount() {
    const handler = (e) => this.setState({ matches: e.matches });
    window.matchMedia("(min-width: 1024px)").addListener(handler);

    if (this.auth != "admin") {
      this.props.history.push("/login");
    }
    const checkLoggedIn = async () => {
      const token = localStorage.getItem("x-auth-token");

      await axios
        .post(`${this.baseURL}/admin/tokenIsValid`, null, {
          headers: { "x-auth-token": token },
        })
        .then((res) => {
          this.setState({
            valid: res.data.valid,
          });
        });

      if (!this.state.valid) this.props.history.push("/login");
    };

    checkLoggedIn();

    axios
      .get(`${this.baseURL}/notify/all`)
      .then((res) => {
        this.setState({ notice: res.data });
        this.showNotification(res);
        console.log(this.state.notice);
      })
      .catch((e) => console.log(e));
  }

  showNotification(res) {
    const that = this;
    res.data.forEach((notif) => {
      if (notif.read == false) {
        notification.notice({
          content: <span>{notif.type}</span>,
          duration: false,
          closable: true,
          key: notif._id,
          style: {
            backgroundColor: "yellow",
            color: "black",
            border: "1px dotted green",
          },
          onClose() {
            const form = new FormData();
            form.append("id", notif._id);
            axios
              .post(`${that.baseURL}/notify/delNotice`, form)
              .then(() => console.log("notice HIT"))
              .catch(() => console.log("Something went Wrong"));
          },
        });
      }
    });
  }

  handleClick = (e) => {
    if (e == "arbitration") {
      this.setState({
        arbitration: !this.state.arbitration,
        reconciliation: false,
        ciae: false,
        ypg: false,
        member: false,
        arr1: !this.state.arr1,
        arr2: false,
        arr3: false,
        arr4: false,
        arr5: false,
      });
    } else if (e == "reconciliation") {
      this.setState({
        arbitration: false,
        reconciliation: !this.state.reconciliation,
        ciae: false,
        ypg: false,
        member: false,
        arr2: !this.state.arr2,
        arr1: false,
        arr3: false,
        arr4: false,
        arr5: false,
      });
    } else if (e == "ciae") {
      this.setState({
        arbitration: false,
        reconciliation: false,
        ciae: !this.state.ciae,
        ypg: false,
        member: false,
        arr3: !this.state.arr3,
        arr1: false,
        arr2: false,
        arr4: false,
        arr5: false,
      });
    } else if (e == "ypg") {
      this.setState({
        arbitration: false,
        reconciliation: false,
        ciae: false,
        member: false,
        ypg: !this.state.ypg,
        arr4: !this.state.arr4,
        arr1: false,
        arr2: false,
        arr3: false,
        arr5: false,
      });
    } else if (e == "member") {
      this.setState({
        arbitration: false,
        reconciliation: false,
        ciae: false,
        ypg: false,
        member: !this.state.member,
        arr4: false,
        arr1: false,
        arr2: false,
        arr3: false,
        arr5: !this.state.arr5,
      });
    }
  };

  render() {
    const { arr1, arr2, arr3, arr4 } = this.state;

    const { t } = this.props;
    return (
      <Container fluid>
        {this.state.matches ? (
          <Row>
            <Col sm={12} md={2} lg={2} style={styles.padding}>
              <Nav tabs vertical navbar style={styles.sidebar}>
                <NavItem>
                  <NavLink
                    style={styles.link}
                    onClick={() => {
                      this.handleClick("arbitration");
                    }}
                  >
                    {document.dir == "ltr" ? "Arbitration" : "تحكم"}
                    <img
                      src={arr1 ? up : down}
                      alt="down arrow"
                      style={styles.img}
                    />
                  </NavLink>
                  {this.state.arbitration ? (
                    <div style={styles.linkContainer}>
                      <div
                        className="sidebarDashboard"
                        style={styles.sublink}
                        onClick={() => {
                          this.props.history.push({
                            pathname: "/",
                            auth: this.props.location.auth,
                          });
                        }}
                        onMouseEnter={() => {
                          this.setState({
                            left: true,
                          });
                        }}
                        onMouseLeave={() => {
                          this.setState({
                            left: false,
                          });
                        }}
                      >
                        File a Case
                      </div>

                      <div
                        className="sidebarDashboard"
                        style={styles.sublink}
                        onClick={() =>
                          this.props.history.push({
                            pathname: "/cases",
                            auth: this.props.location.auth,
                          })
                        }
                      >
                        Access All Cases Information
                      </div>
                    </div>
                  ) : null}
                </NavItem>
                <NavItem>
                  <NavLink
                    style={styles.link}
                    onClick={() => {
                      this.handleClick("reconciliation");
                    }}
                  >
                    {document.dir == "ltr" ? "Reconciliation" : "تصالح"}
                    <img
                      src={arr2 ? up : down}
                      alt="down arrow"
                      style={styles.img}
                    />
                  </NavLink>
                  {this.state.reconciliation ? (
                    <div style={styles.linkContainer}>
                      <div
                        className="sidebarDashboard"
                        style={styles.sublink}
                        onClick={() => {
                          this.props.history.push({
                            pathname: "/reconciliation",
                          });
                        }}
                      >
                        Request for Conciliation
                      </div>
                      <div
                        className="sidebarDashboard"
                        style={styles.sublink}
                        onClick={() =>
                          this.props.history.push({
                            pathname: "/cases_",
                          })
                        }
                      >
                        Access All Cases Information
                      </div>
                    </div>
                  ) : null}
                </NavItem>
                <NavItem>
                  <NavLink
                    style={styles.link}
                    onClick={() => {
                      this.handleClick("ciae");
                    }}
                  >
                    CIAE
                    <img
                      src={arr3 ? up : down}
                      alt="down arrow"
                      style={styles.img}
                    />
                  </NavLink>
                  {this.state.ciae ? (
                    <div style={styles.linkContainer}>
                      <div className="sidebarDashboard" style={styles.sublink}>
                        Registration
                      </div>
                      <div className="sidebarDashboard" style={styles.sublink}>
                        Access All Training Information
                      </div>
                      <div className="sidebarDashboard" style={styles.sublink}>
                        Registered Instructions
                      </div>
                    </div>
                  ) : null}
                </NavItem>
                <NavItem>
                  <NavLink
                    style={styles.link}
                    onClick={() => {
                      this.handleClick("ypg");
                    }}
                  >
                    YPG
                    <img
                      src={arr4 ? up : down}
                      alt="down arrow"
                      style={styles.img}
                    />
                  </NavLink>
                  {this.state.ypg ? (
                    <div style={styles.linkContainer}>
                      <div className="sidebarDashboard" style={styles.sublink}>
                        Registration
                      </div>
                      <div className="sidebarDashboard" style={styles.sublink}>
                        Program Materials
                      </div>
                    </div>
                  ) : null}
                </NavItem>
                <NavItem>
                  <NavLink
                    style={styles.link}
                    onClick={() => {
                      this.handleClick("member");
                    }}
                  >
                    {document.dir == "ltr" ? "Members" : "أعضاء"}
                    <img
                      src={arr1 ? up : down}
                      alt="down arrow"
                      style={styles.img}
                    />
                  </NavLink>
                  {this.state.member ? (
                    <div style={styles.linkContainer}>
                      <div
                        className="sidebarDashboard"
                        style={styles.sublink}
                        onClick={() => {
                          this.props.history.push({
                            pathname: "/addMember",
                            auth: this.props.location.auth,
                          });
                        }}
                        onMouseEnter={() => {
                          this.setState({
                            left: true,
                          });
                        }}
                        onMouseLeave={() => {
                          this.setState({
                            left: false,
                          });
                        }}
                      >
                        Add a member
                      </div>

                      <div
                        className="sidebarDashboard"
                        style={styles.sublink}
                        onClick={() =>
                          this.props.history.push({
                            pathname: "/members",
                            auth: this.props.location.auth,
                          })
                        }
                      >
                        View Members
                      </div>
                    </div>
                  ) : null}
                </NavItem>
              </Nav>
            </Col>
            <Col sm={12} md={10} lg={10} style={styles.calender}>
              <Scheduler />
            </Col>
          </Row>
        ) : (
          <Col sm={12} md={12} lg={12} style={styles.calender}>
            <Notification />
            <Scheduler />
          </Col>
        )}
      </Container>
    );
  }
}

const styles = {
  rows: {
    marginBottom: "2vh",
    marginTop: "5vh",
  },
  title: {
    paddingLeft: "1vh",
    backgroundColor: "#008f53",
  },
  sidebar: {
    paddingTop: "2vh",
    height: "92vh",
    width: "17vw",
    backgroundColor: "#008f53",
    position: "fixed",
  },
  linkContainer: {
    borderTop: ".5px solid white",
    borderBottom: ".5px solid white",
  },
  link: {
    paddingLeft: "2vw",
    color: "white",
    fontSize: "14px",
    minHeight: "7vh",
    cursor: "pointer",
  },
  sublink: {
    paddingLeft: "2vw",
    color: "white",
    backgroundColor: "green",
    paddingTop: "2vh",
    paddingBottom: "2vh",
    cursor: "pointer",
  },
  padding: {
    padding: "0",
    backgroundColor: "#008F53",
    minHeight: "92vh",
  },
  calender: {
    alignContent: "center",
    marginTop: "5.5vh",
  },
  img: { height: "2vh", float: "right", paddingRight: "1vw" },
};

export default Dashboard;
