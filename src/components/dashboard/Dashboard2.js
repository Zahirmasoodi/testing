import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Table,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import axios from "axios";
import { v4 } from "uuid";
import { getEnvironment } from "../../config";

export class Dashboard2 extends Component {
  baseURL = getEnvironment().apiUrl;

  state = {
    allCases: [],
    test: "",
    valid: false,
    user: null,
  };

  componentDidMount() {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem("x-auth-token");

      await axios
        .post(`${this.baseURL}/form/tokenIsValid`, null, {
          headers: { "x-auth-token": token },
        })
        .then((res) => {
          this.setState({
            valid: res.data.valid,
            user: res.data,
          });
        });

      if (this.state.valid) {
        await axios
          .get(
            `${this.baseURL}/form/casesRes/${this.state.user.user.respondentEmail}`,
            {
              headers: { "x-auth-token": token },
            }
          )
          .then((res) => {
            this.setState({
              allCases: res.data,
            });
          })
          .catch((err) => console.log(err));
      }
    };

    checkLoggedIn();
  }

  pad = (num) => {
    if (num < 10) {
      return "00" + num;
    } else if (num > 9 && num < 100) {
      return "0" + num;
    } else return num;
  };

  handleNavigation = (data) => {
    this.props.history.push({
      pathname: "/cases/expanded",
      state: data,
    });
  };

  render() {
    const listData = this.state.allCases.map((cases, index) => {
      console.log("cases", cases);
      return (
        <tr key={v4()}>
          <td style={{ cursor: "crosshair" }}>{index + 1}</td>
          <td
            style={{ cursor: "pointer" }}
            onClick={() => this.handleNavigation(cases)}
          >
            {cases.caseNumber
              ? `ARB${cases.createdAt.split("-")[0]}-${this.pad(
                  cases.caseNumber
                )}`
              : "CASE/ARB"}
          </td>
          <td
            style={{ cursor: "pointer" }}
            onClick={() => this.handleNavigation(cases)}
          >
            {cases.claimantName}
          </td>
          <td style={{ cursor: "crosshair" }}>
            {cases.approved ? (
              <span style={{ color: "green", letterSpacing: "1px" }}>
                <b>Approved</b>
              </span>
            ) : (
              <span style={{ color: "orange", letterSpacing: "1px" }}>
                <b>Pending</b>
              </span>
            )}
          </td>
        </tr>
      );
    });

    return (
      <>
        <Container fluid style={styles.crumbContainer}>
          <Row>
            <Col>
              <Breadcrumb>
                <BreadcrumbItem style={styles.crumb}>Cases</BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
        </Container>
        <Container style={styles.formUserContainer} className="shadow">
          <Row>
            <Col>
              <Card style={styles.cardBg}>
                <h6 style={styles.center}>List of All Cases</h6>
                <CardBody>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>S. No.</th>
                        <th>Arbitration Case Number</th>
                        <th>Filed By</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>{listData}</tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

const styles = {
  center: {
    color: "white",
    textAlign: "center",
    backgroundColor: "#008f53",
    paddingTop: "1vh",
    paddingBottom: "1vh",
    cursor: "not-allowed",
  },
  formUserContainer: {
    marginTop: "10vh",
    paddingTop: "5vh",
    paddingBottom: "3vh",
    backgroundColor: "#f6f6f6",
    minHeight: "92vh",
  },
  cardBg: {
    backgroundColor: "#f6f6f6",
    border: "none",
  },
  crumbContainer: {
    width: "100vw",
    position: "fixed",
    top: "8vh",
    paddingLeft: "0px",
    paddingRight: "0px",
    zIndex: 9,
  },
  crumb: { color: "green" },
  crumbTabs: {
    cursor: "pointer",
  },
};

export default Dashboard2;
