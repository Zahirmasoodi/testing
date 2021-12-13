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

const ContainerArbNotice = (props) => {
  const role = JSON.parse(localStorage.getItem("iicra-token"));

  const handleNavigation1 = (data) => {
    props.history.push({
      pathname: "/email_/prelimMeeting_/1",
      state: data,
      // state: state.allCases,
    });
  };

  const handleNavigation2 = (data) => {
    props.history.push({
      pathname: "/email/hearing/2",
      state: data,
      // state: state.allCases,
    });
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
                      pathname: "/cases",
                    })
                  }
                  style={styles.crumbTabs}
                >
                  Cases
                </BreadcrumbItem>
                <BreadcrumbItem
                  onClick={() =>
                    props.history.push({
                      pathname: "/cases/expanded",
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
                      pathname: "/cases/timeline",
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
                      pathname: "/cases/hearing",
                      state: props.location.state,
                    })
                  }
                  style={styles.crumbTabs}
                >
                  Hearing
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
                      pathname: "/cases/expanded",
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
                      pathname: "/cases/timeline",
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
                      pathname: "/cases/hearing",
                      state: props.location.state,
                    })
                  }
                  style={styles.crumbTabs}
                >
                  Hearing
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
                        onClick={() => handleNavigation1(props.location.state)}
                      >
                        Virtual Minutes of Arbitration Hearing - Sole Arbitrator
                      </td>
                    </tr>
                    <tr style={styles.border}>
                      <td
                        onClick={() => handleNavigation2(props.location.state)}
                      >
                        Virtual Minutes of Arbitration Hearing No. ___ -
                        Arbitral Tribunal
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
