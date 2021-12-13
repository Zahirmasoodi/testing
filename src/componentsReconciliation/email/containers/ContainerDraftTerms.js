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
      pathname: "/email/draftTerms/1",
      state: data,
      // state: state.allCases,
    });
  };
  const handleNavigation2 = (data) => {
    props.history.push({
      pathname: "/email/draftTerms/2",
      state: data,
      // state: state.allCases,
    });
  };
  const handleNavigation3 = (data) => {
    props.history.push({
      pathname: "/email/draftTerms/3",
      state: data,
      // state: state.allCases,
    });
  };
  const handleNavigation4 = (data) => {
    props.history.push({
      pathname: "/email/draftTerms/4",
      state: data,
      // state: state.allCases,
    });
  };
  const handleNavigation5 = (data) => {
    props.history.push({
      pathname: "/email/draftTerms/5",
      state: data,
      // state: state.allCases,
    });
  };
  const handleNavigation6 = (data) => {
    props.history.push({
      pathname: "/email/draftTerms/6",
      state: data,
      // state: state.allCases,
    });
  };
  const handleNavigation7 = (data) => {
    props.history.push({
      pathname: "/email/draftTerms/7",
      state: data,
      // state: state.allCases,
    });
  };
  const handleNavigation8 = (data) => {
    props.history.push({
      pathname: "/email/draftTerms/8",
      state: data,
      // state: state.allCases,
    });
  };
  const handleNavigation9 = (data) => {
    props.history.push({
      pathname: "/email/draftTerms/9",
      state: data,
      // state: state.allCases,
    });
  };
  const handleNavigation10 = (data) => {
    props.history.push({
      pathname: "/email/draftTerms/10",
      state: data,
      // state: state.allCases,
    });
  };
  const handleNavigation11 = (data) => {
    props.history.push({
      pathname: "/email/draftTerms/11",
      state: data,
      // state: state.allCases,
    });
  };
  const handleNavigation12 = (data) => {
    props.history.push({
      pathname: "/email/draftTerms/12",
      state: data,
      // state: state.allCases,
    });
  };
  const handleNavigation13 = (data) => {
    props.history.push({
      pathname: "/email/draftTerms/13",
      state: data,
      // state: state.allCases,
    });
  };
  const handleNavigation14 = (data) => {
    props.history.push({
      pathname: "/email/draftTerms/14",
      state: data,
      // state: state.allCases,
    });
  };
  const handleNavigation15 = (data) => {
    props.history.push({
      pathname: "/email/draftTerms/15",
      state: data,
      // state: state.allCases,
    });
  };
  const handleNavigation16 = (data) => {
    props.history.push({
      pathname: "/email/draftTerms/16",
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
                      pathname: "/cases/draft",
                      state: props.location.state,
                    })
                  }
                  style={styles.crumbTabs}
                >
                  Draft Terms of Reference &amp; Submission of Documents
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
                      pathname: "/cases/draft",
                      state: props.location.state,
                    })
                  }
                  style={styles.crumbTabs}
                >
                  Draft Terms of Reference &amp; Submission of Documents
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
                        Sole Arbitrator Rejected the Request to Extend the
                        Deadline Submission of Documents - Claimant
                      </td>
                    </tr>
                    <tr style={styles.border}>
                      <td
                        onClick={() => handleNavigation2(props.location.state)}
                      >
                        Sole Arbitrator Rejected the Request to Extend the
                        Deadline Submission of Documents - Respondent
                      </td>
                    </tr>
                    <tr style={styles.border}>
                      <td
                        onClick={() => handleNavigation3(props.location.state)}
                      >
                        Arbitral Tribunal Rejected the Request to Extend the
                        Deadline Submission of Documents - Claimant
                      </td>
                    </tr>
                    <tr style={styles.border}>
                      <td
                        onClick={() => handleNavigation4(props.location.state)}
                      >
                        Arbitral Tribunal Rejected the Request to Extend the
                        Deadline Submission of Documents - Respondent
                      </td>
                    </tr>
                    <tr style={styles.border}>
                      <td
                        onClick={() => handleNavigation5(props.location.state)}
                      >
                        Sole Arbitrator Confirmation to Extend the Submission of
                        Documents - Claimant
                      </td>
                    </tr>
                    <tr style={styles.border}>
                      <td
                        onClick={() => handleNavigation6(props.location.state)}
                      >
                        Sole Arbitrator Confirmation to Extend the Submission of
                        Document(s) - Respondent
                      </td>
                    </tr>
                    <tr style={styles.border}>
                      <td
                        onClick={() => handleNavigation7(props.location.state)}
                      >
                        Arbitral Tribunal Confirmation to Extend the Submission
                        of Documents - Claimant
                      </td>
                    </tr>
                    <tr style={styles.border}>
                      <td
                        onClick={() => handleNavigation8(props.location.state)}
                      >
                        Arbitral Tribunal Confirmation to Extend the Submission
                        of Document(s) - Respondent
                      </td>
                    </tr>
                    <tr style={styles.border}>
                      <td
                        onClick={() => handleNavigation9(props.location.state)}
                      >
                        FINAL Comments on Draft Terms of Reference by Sole
                        Arbitrator
                      </td>
                    </tr>
                    <tr style={styles.border}>
                      <td
                        onClick={() => handleNavigation10(props.location.state)}
                      >
                        FINAL Comments on Draft Terms of Reference by Arbitral
                        Tribunal
                      </td>
                    </tr>
                    <tr style={styles.border}>
                      <td
                        onClick={() => handleNavigation11(props.location.state)}
                      >
                        FINAL Terms of Reference (TOR) Sole Arbitrator
                      </td>
                    </tr>
                    <tr style={styles.border}>
                      <td
                        onClick={() => handleNavigation12(props.location.state)}
                      >
                        FINAL Terms of Reference (TOR) Arbitral Tribunal
                      </td>
                    </tr>
                    <tr style={styles.border}>
                      <td
                        onClick={() => handleNavigation13(props.location.state)}
                      >
                        Confirmation for the Feedback on Draft TOR by Sole
                        Arbitrator - Claimant
                      </td>
                    </tr>
                    <tr style={styles.border}>
                      <td
                        onClick={() => handleNavigation14(props.location.state)}
                      >
                        Confirmation for the Feedback on Draft TOR by Sole
                        Arbitrator - Respondent
                      </td>
                    </tr>
                    <tr style={styles.border}>
                      <td
                        onClick={() => handleNavigation15(props.location.state)}
                      >
                        Confirmation for the Feedback on Draft TOR by Arbitral
                        Tribunal- Claimant
                      </td>
                    </tr>
                    <tr style={styles.border}>
                      <td
                        onClick={() => handleNavigation16(props.location.state)}
                      >
                        Confirmation for the Feedback on Draft TOR by Arbitral
                        Tribunal - Respondent
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
