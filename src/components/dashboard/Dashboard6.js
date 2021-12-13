import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Input,
  Table,
  Button,
  Card,
  CardBody,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import axios from "axios";
import { v4 } from "uuid";
import ethics from "../../assets/ethics.pdf";
import iicrarules from "../../assets/iicrarules.pdf";
import Label from "reactstrap/lib/Label";
import { getEnvironment } from "../../config";

export class Dashboard6 extends Component {
  baseURL = getEnvironment().apiUrl;

  state = {
    allCases: [],
    test: "",
    valid: false,
    user: null,
    cvOfArbitrator: "",
  };

  componentDidMount() {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem("x-auth-token");

      const tokenResponse = await axios
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
        const email = localStorage.getItem("arbitratorEmail");
        console.log(email);
        await axios
          .get(
            // `${this.baseURL}/form/cases/${this.state.user.user.claimantEmail}`,
            `${this.baseURL}/form/casesArbitrator/${email}`,
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

  handleNavigation = (data) => {
    this.props.history.push({
      pathname: "/arbitrator/case",
      state: data,
    });
  };

  handleMissionContract = (data) => {
    this.props.history.push({
      pathname: "/arbitrator/missionContract",
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
    this.state.allCases.map((cases) => {
      const date = cases.createdAt.split("T");

      // let deadline = new Date(valueOf(cases.createdAt));
      const deadline = new Date(cases.createdAt);
      // const finalDeadline = deadline.setDate(deadline.getDate() + 90);
      console.log(deadline);

      return (
        <tr key={v4()}>
          <td
            style={{ cursor: "pointer" }}
            onClick={() => this.handleNavigation(cases)}
          >
            ARB{cases.createdAt.split("-")[0]}-{this.pad(cases.caseNumber)}
          </td>
          <td style={{ cursor: "crosshair" }}>
            {cases.arbitrators.length == 1 || cases.arbitrators.length == 0
              ? "Sole"
              : "Tribunal"}
          </td>
          <td
            style={{ cursor: "pointer" }}
            onClick={() => this.handleMissionContract(cases)}
          >
            View
          </td>
          <td style={{ cursor: "crosshair" }}>{date[0]}</td>
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
          <td>4 months</td>
        </tr>
      );
    });

  render() {
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
        <Container fluid style={styles.formUserContainer}>
          <Row>
            <Col>
              <Card className="shadow">
                <CardBody>
                  <Table bordered>
                    <thead>
                      <tr>
                        <th>Case</th>
                        <th>Arbitrator</th>
                        <th>Mission Contract</th>
                        <th>Start Date</th>
                        <th>Status</th>
                        <th>Dead Line</th>
                      </tr>
                    </thead>
                    <tbody>{this.listData()}</tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="mt-4" style={{ textAlign: "center" }}>
            <Col>
              <a
                href={iicrarules}
                target="_blank"
                style={{
                  color: "white",
                  textDecoration: "none",
                }}
              >
                <Button className="btn btn-success" style={{ width: "90%" }}>
                  IICRA Arbitration rules
                </Button>
              </a>
            </Col>
            <Col>
              <a
                href={ethics}
                target="_blank"
                style={{
                  color: "white",
                  textDecoration: "none",
                }}
              >
                <Button className="btn btn-success" style={{ width: "90%" }}>
                  Ethics of Arbitration
                </Button>
              </a>
            </Col>
            <Col>
              <a
                href="#"
                target="_blank"
                style={{
                  color: "white",
                  textDecoration: "none",
                }}
              >
                <Button className="btn btn-success" style={{ width: "90%" }}>
                  IICRA - Conditions
                </Button>
              </a>
            </Col>
          </Row>
          <Row className="m-1 mt-4">
            <Col>
              <Label>CV of Arbitrator</Label>
              <Input
                id="cvOfArbitrator"
                name="cvOfArbitrator"
                type="file"
                onChange={(e) => {
                  this.setState({
                    cvOfArbitrator: e.target.files[0],
                  });
                }}
              />
            </Col>
            <Col style={{ textAlign: "right" }}>
              <Button
                onClick={() => {
                  if (this.state.cvOfArbitrator) {
                    alert("UPLOADED");
                  } else alert("Select a File");
                }}
              >
                Upload
              </Button>
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
    paddingTop: "10vh",
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

export default Dashboard6;
