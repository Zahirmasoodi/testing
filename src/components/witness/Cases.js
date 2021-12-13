import React, { Component } from "react";
import { Container, Row, Col, Card, CardBody, Table } from "reactstrap";
import axios from "axios";
import UserContext from "../../context/UserContext";
import { getEnvironment } from "../../config";

export class CasesWitness extends Component {
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
        });

      if (this.state.valid) {
        const email = localStorage.getItem("witnessEmail");

        await axios
          .get(`${this.baseURL}/form/witnessDashboard/${email}`, {
            headers: { "x-auth-token": token },
          })
          .then((res) => {
            console.log(res.data);
            this.setState({
              allCases: res.data,
            });
          })
          .catch((err) => console.log(err));
      }
    };

    checkLoggedIn();
  }

  // indexOfLastPost = this.state.currentPage * this.state.casesPerPage;
  // indexOfFirstPost = this.indexOfLastPost - this.state.casesPerPage;
  // currentPosts = this.state.allCases.slice(
  //   this.indexOfFirstPost,
  //   this.indexOfLastPost
  // );

  handleNavigation = (data) => {
    this.props.history.push({
      pathname: "/cases/expanded",
      state: data,
    });
  };

  pad = (num) => {
    if (num < 10) {
      return "00" + num;
    } else if (num > 9 && num < 100) {
      return "0" + num;
    } else return num;
  };

  listData = () =>
    this.state.allCases.map((cases, index) => {
      console.log("HERE", cases);
      return (
        <tr key={index}>
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

  render() {
    return (
      <UserContext.Consumer>
        {(userData) => (
          <Container style={styles.formUserContainer} className="shadow">
            <Row>
              <Col>
                <Card style={styles.cardBg}>
                  <h3 style={styles.center}>List of All Cases</h3>
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
                      <tbody>{this.listData()}</tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
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
    paddingTop: "1vh",
    paddingBottom: "1vh",
    cursor: "not-allowed",
  },
  formUserContainer: {
    marginTop: "5vh",
    paddingTop: "5vh",
    paddingBottom: "3vh",
    backgroundColor: "#f6f6f6",
    minHeight: "100vh",
  },
  cardBg: {
    backgroundColor: "#f6f6f6",
    border: "none",
  },
};

export default CasesWitness;
