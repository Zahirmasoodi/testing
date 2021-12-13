import React, { useContext, useEffect, useState } from "react";
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
import UserContext from "../../../context/UserContext";
import axios from "axios";
import { getEnvironment } from "../../../config";

const ContainerArbNotice = (props) => {
  const baseURL = getEnvironment().apiUrl;

  const role = JSON.parse(localStorage.getItem("iicra-token"));

  const handleNavigationSole = (data) => {
    props.history.push({
      pathname: "/email_/nominateArb_/1",
      state: data,
      // state: state.allCases,
    });
  };

  const handleNavigationConfirm = (data) => {
    props.history.push({
      pathname: "/email_/nominateArb_/2",
      state: data,
    });
  };

  const handleNavigationMissionContract = (data) => {
    props.history.push({
      pathname: "/email_/nominateArb_/3",
      state: data,
    });
  };

  const user = useContext(UserContext);
  useEffect(() => {
    const token = localStorage.getItem("x-auth-token");
    const role = localStorage.getItem("iicra-token");
    const tokenResponse = axios
      .post(`${baseURL}/form/tokenIsValid`, null, {
        headers: { "x-auth-token": token },
      })
      .then((res) => console.log(res.data));
  }, []);

  return (
    <>
      <Container fluid style={styles.crumbContainer}>
        <Row>
          <Col>
            {role == "admin" ? (
              <Breadcrumb>
                <BreadcrumbItem
                  onClick={() =>
                    props.history.push({
                      pathname: "/dashboard",
                    })
                  }
                  style={styles.crumbTabs}
                >
                  Dashboard
                </BreadcrumbItem>
                <BreadcrumbItem
                  onClick={() =>
                    props.history.push({
                      pathname: "/cases_",
                    })
                  }
                  style={styles.crumbTabs}
                >
                  Cases
                </BreadcrumbItem>
                <BreadcrumbItem
                  onClick={() =>
                    props.history.push({
                      pathname: "/cases_/expanded_",
                      state: props.location.state,
                    })
                  }
                  style={styles.crumbTabs}
                >
                  Details
                </BreadcrumbItem>
                <BreadcrumbItem
                  onClick={() =>
                    props.history.push({
                      pathname: "/cases_/timeline_",
                      state: props.location.state,
                    })
                  }
                  style={styles.crumbTabs}
                >
                  Timeline
                </BreadcrumbItem>
                <BreadcrumbItem
                  onClick={() =>
                    props.history.push({
                      pathname: "/cases_/nomination_",
                      state: props.location.state,
                    })
                  }
                  style={styles.crumbTabs}
                >
                  Nomination and Appointment of the Arbitrator(s)
                </BreadcrumbItem>
                <BreadcrumbItem style={styles.crumb}>
                  Templates - {props.location.state._id}
                </BreadcrumbItem>
              </Breadcrumb>
            ) : null}
            {role == "claimant" ||
            role == "respondent" ||
            role == "arbitrator" ||
            role == "rapporteur" ||
            role == "expert" ||
            role == "witness" ? (
              <Breadcrumb>
                <BreadcrumbItem
                  onClick={() =>
                    props.history.push({
                      pathname: `/${role}`,
                    })
                  }
                  style={styles.crumbTabs}
                >
                  Cases
                </BreadcrumbItem>
                <BreadcrumbItem
                  onClick={() =>
                    props.history.push({
                      pathname: "/cases_/expanded_",
                      state: props.location.state,
                    })
                  }
                  style={styles.crumbTabs}
                >
                  Details
                </BreadcrumbItem>
                <BreadcrumbItem
                  onClick={() =>
                    props.history.push({
                      pathname: "/cases_/timeline_",
                      state: props.location.state,
                    })
                  }
                  style={styles.crumbTabs}
                >
                  Timeline
                </BreadcrumbItem>
                <BreadcrumbItem
                  onClick={() =>
                    props.history.push({
                      pathname: "/cases_/nomination_",
                      state: props.location.state,
                    })
                  }
                  style={styles.crumbTabs}
                >
                  Nomination and Appointment of the Arbitrator(s)
                </BreadcrumbItem>
                <BreadcrumbItem style={styles.crumb}>
                  Templates - {props.location.state._id}
                </BreadcrumbItem>
              </Breadcrumb>
            ) : null}
          </Col>
        </Row>
      </Container>
      <Container style={styles.formUserContainer} className="shadow">
        <Row>
          <Col>
            <Card style={styles.cardBg}>
              <h6 style={styles.center}>Templates</h6>
              <CardBody>
                <Table bordered hover style={{ textAlign: "center" }}>
                  <tbody>
                    <tr style={styles.border}>
                      <td
                        onClick={() =>
                          handleNavigationConfirm(props.location.state)
                        }
                      >
                        Request for Nominating A Conciliator
                      </td>
                    </tr>
                    <tr style={styles.border}>
                      <td
                        onClick={() =>
                          handleNavigationSole(props.location.state)
                        }
                      >
                        Appointment of the Conciliator
                      </td>
                    </tr>
                    <tr style={styles.border}>
                      <td
                        onClick={() =>
                          handleNavigationMissionContract(props.location.state)
                        }
                      >
                        Mission Contract for Conciliator
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

const styles = {
  center: {
    color: "white",
    textAlign: "center",
    backgroundColor: "#008f53",
    paddingTop: "1vh",
    paddingBottom: "1vh",
    borderRadius: "5px",
  },
  formUserContainer: {
    marginTop: "10vh",
    paddingTop: "5vh",
    paddingBottom: "3vh",
    backgroundColor: "#f6f6f6",
    minHeight: "100vh",
  },
  cardBg: {
    backgroundColor: "#f6f6f6",
    border: "none",
  },
  border: {
    border: "2px solid green",
    color: "blue",
    marginBottom: "1vh",
    cursor: "pointer",
  },
  crumbContainer: {
    width: "100vw",
    position: "fixed",
    top: "8vh",
    paddingLeft: "0px",
    paddingRight: "0px",
    zIndex: 9,
  },
  crumb: { color: "green", cursor: "not-allowed" },
  crumbTabs: {
    cursor: "pointer",
  },
};

export default ContainerArbNotice;
