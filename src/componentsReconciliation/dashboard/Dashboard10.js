import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Card,
  CardBody,
  Breadcrumb,
  BreadcrumbItem,
  Label,
  CustomInput,
} from "reactstrap";
import axios from "axios";
import { v4 } from "uuid";
import ethics from "../../assets/ethics.pdf";
import iicrarules from "../../assets/iicrarules.pdf";
import Swal from "sweetalert2";
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
        .then((res) =>
          this.setState({
            valid: res.data.valid,
            user: res.data,
          })
        );

      if (this.state.valid) {
        await axios
          .get(
            `${this.baseURL}/formReconciliation/_cases_/${this.state.user.user_.arbitratorEmail}`,
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

  role = JSON.parse(localStorage.getItem("iicra-token"));

  handleNavigation = (data) => {
    this.props.history.push({
      pathname: "/cases_/expanded_",
      state: data,
    });
  };

  handleMissionContract = (data) => {
    this.props.history.push({
      pathname: "/email_/nominateArb_/3",
      state: data,
    });
  };

  handleUpload = (file) => {
    const form = new FormData();
    form.append("arbit", file);
    form.append("author", this.role);
    form.append("type", "draftTerms");
    axios
      .post(
        `${this.baseURL}/formReconciliation/noticeOfArb/${this.props.location.state._id}`,
        form
      )
      .then(() =>
        Swal.fire({
          title: "File has been uploaded successfully",
          icon: "success",
        }).then(() =>
          this.props.history.push({
            pathname: "/cases/expanded",
            state: this.props.location.state,
          })
        )
      )
      .catch((err) =>
        Swal.fire({
          title: err,
          icon: "error",
        })
      );
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
      const date = cases.createdAt.split("T")[0];

      const deadline = new Date(cases.createdAt);
      // const finalDeadline = deadline.setDate(deadline.getDate() + 90);

      return (
        <tr key={v4()}>
          <td
            style={{ cursor: "pointer" }}
            onClick={() => this.handleNavigation(cases)}
          >
            {cases.caseNumberRec
              ? `REC${cases.createdAt.split("-")[0]}-${this.pad(
                  cases.caseNumberRec
                )}`
              : "CASE/REC"}
          </td>
          <td>{!cases.arbitrators.length > 0 ? "Single" : "Multiple"}</td>
          <td onClick={() => this.handleMissionContract(cases)}>Sign</td>
          <td style={{ cursor: "pointer" }}>
            <a
              href={`${this.baseURL}/${cases.arbitratorMissionContract}`}
              target="_blank"
            >
              View
            </a>
          </td>
          <td style={{ cursor: "crosshair" }}>{date}</td>
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
          <td>{"deadline"}</td>
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
                        <th>Conciliator</th>
                        <th>Signature</th>
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
                  IICRA Conciliation Rules
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
                  Ethics of Conciliation
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
              <Label>CV of Conciliator</Label>
              <CustomInput
                style={{
                  overflow: "hidden",
                  backgroundColor: "white",
                  border: "none",
                }}
                type="file"
                label="Upload a File"
                onChange={(e) => {
                  this.handleUpload(e.target.files[0]);
                }}
              />
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
    cursor: "crosshair",
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
