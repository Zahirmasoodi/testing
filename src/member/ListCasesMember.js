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
import UserContext from "../context/UserContext";
import romanize from "../roman";
import pad from "../pad";
import { getEnvironment } from "../config";

export class ListCasesMember extends Component {
  baseURL = getEnvironment().apiUrl;

  state = {
    allCases: [],
    test: "",
    valid: false,
    user: null,
    loading: false,
    currentPage: 1,
    casesPerPage: 10,
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
          console.log(this.state.user.member.email);
        });

      if (this.state.valid) {
        await axios
          .get(`${this.baseURL}/form/cases/${this.state.user.member.email}`, {
            headers: { "x-auth-token": token },
          })
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

  handleNavigation = (data) => {
    this.props.history.push({
      pathname: "/cases/expanded",
      state: data,
    });
  };

  render() {
    const listData = this.state.allCases.map((cases, index) => {
      return (
        <tr key={index}>
          <td style={{ cursor: "crosshair" }}>{romanize(index + 1)}.</td>
          <td
            onClick={() => this.handleNavigation(cases)}
            style={{ cursor: "pointer" }}
          >
            {cases.caseNumber
              ? `ARB${cases.createdAt.split("-")[0]}-${pad(cases.caseNumber)}`
              : "CASE/ARB"}
          </td>
          <td
            onClick={() => this.handleNavigation(cases)}
            style={{ cursor: "pointer" }}
          >
            {cases.claimantName}
          </td>
          <td style={{ cursor: "crosshair" }}>
            {cases.createdAt.split("T")[0]}
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
      <UserContext.Consumer>
        {(userData) => (
          <>
            <Container fluid style={styles.crumbContainer}>
              <Row>
                <Col>
                  <Breadcrumb>
                    <BreadcrumbItem
                      active
                      onClick={() =>
                        this.props.history.push({
                          pathname: "/dashboard",
                        })
                      }
                      style={styles.crumbTabs}
                    >
                      Dashboard
                    </BreadcrumbItem>
                    <BreadcrumbItem style={styles.crumb}>Cases</BreadcrumbItem>
                  </Breadcrumb>
                </Col>
              </Row>
            </Container>
            <Container style={styles.formUserContainer} className="shadow">
              <Row>
                <Col>
                  <Card style={styles.cardBg}>
                    <h6 className="pr-2" style={styles.center}>
                      All Cases
                    </h6>
                    <CardBody>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>S. No.</th>
                            <th>Arbitration Case Number</th>
                            <th>Filed By</th>
                            <th>Filed At</th>
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
        )}
      </UserContext.Consumer>
    );
  }
}

const styles = {
  center: {
    color: "white",
    textAlign: "center",
    backgroundColor: "#008f53",
    padding: "1vh",
    borderRadius: "5px",
    cursor: "not-allowed",
  },
  formUserContainer: {
    marginTop: "10vh",
    paddingTop: "5vh",
    paddingBottom: "3vh",
    backgroundColor: "#f6f6f6",
    minHeight: "79vh",
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

export default ListCasesMember;
