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
import UserContext from "../../context/UserContext";
import romanize from "../../roman";
import pad from "../../pad";
import { getEnvironment } from "../../config";

export class ListAll extends Component {
  baseURL = getEnvironment().apiUrl;

  state = {
    allCases: [],
    test: "",
    valid: false,
    user: null,
    loading: false,
  };

  componentDidMount() {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem("x-auth-token");

      await axios
        .post(`${this.baseURL}/admin/tokenIsValid`, null, {
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
          .get(`${this.baseURL}/form/cases`, {
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
            ARB{cases.createdAt.split("-")[0]}-{pad(cases.caseNumber)}
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
                <b>{document.dir == "ltr" ? "Approved" : "وافق"}</b>
              </span>
            ) : (
              <span style={{ color: "orange", letterSpacing: "1px" }}>
                <b>{document.dir == "ltr" ? "Pending" : "قيد الانتظار"}</b>
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
            <Container
              fluid
              style={styles.crumbContainer}
              className={document.dir == "ltr" ? "text-left" : "text-right"}
            >
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
                      {document.dir == "ltr" ? "Dashboard" : " لوحة القيادة "}
                    </BreadcrumbItem>
                    <BreadcrumbItem style={styles.crumb}>
                      {document.dir == "ltr" ? "Cases" : "/ قضايا"}
                    </BreadcrumbItem>
                  </Breadcrumb>
                </Col>
              </Row>
            </Container>
            <Container
              style={styles.formUserContainer}
              className="shadow"
              className={document.dir == "ltr" ? "text-left" : "text-right"}
            >
              <Row>
                <Col>
                  <Card style={styles.cardBg}>
                    <h6 className="pr-2" style={styles.center}>
                      {document.dir == "ltr" ? "All Cases" : "جميع الحالات"}
                    </h6>
                    <CardBody>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>
                              {document.dir == "ltr" ? "S. No." : "S. No."}
                            </th>
                            <th>
                              {document.dir == "ltr"
                                ? "Arbitration Case Number"
                                : "رقم قضية التحكيم"}
                            </th>
                            <th>
                              {document.dir == "ltr" ? "Filed By" : "رفعتها"}
                            </th>
                            <th>
                              {document.dir == "ltr" ? "Filed At" : "محفوظ في"}
                            </th>
                            <th>{document.dir == "ltr" ? "Status" : "حالة"}</th>
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

export default ListAll;
