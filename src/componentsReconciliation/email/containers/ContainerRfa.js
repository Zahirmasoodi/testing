import React from "react";
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

const ContainerRfa = (props) => {
  const role = JSON.parse(localStorage.getItem("iicra-token"));

  const handleNavigationApproved = (data) => {
    props.history.push({
      pathname: "/email_/rfc_/approved_",
      state: data,
    });
  };

  const pad = (num) => {
    if (num < 10) {
      return "00" + num;
    } else if (num > 9 && num < 100) {
      return "0" + num;
    } else return num;
  };

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
                      pathname: "/cases_/rfa_",
                      state: props.location.state,
                    })
                  }
                  style={styles.crumbTabs}
                >
                  RFA
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
                      pathname: "/cases_/rfa_",
                      state: props.location.state,
                    })
                  }
                  style={styles.crumbTabs}
                >
                  RFA
                </BreadcrumbItem>
                <BreadcrumbItem style={styles.crumb}>
                  Templates -{" "}
                  {props.location.state.caseNumberRec
                    ? `REC${props.location.state.createdAt.split("-")[0]}-${pad(
                        props.location.state.caseNumberRec
                      )}`
                    : "CASE/REC"}
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
                        onClick={() => {
                          alert("X");
                          handleNavigationApproved(props.location.state);
                        }}
                      >
                        Notice of Reconciliation
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

export default ContainerRfa;
