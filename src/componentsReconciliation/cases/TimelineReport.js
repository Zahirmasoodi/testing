import React, { useEffect, useState } from "react";
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

const TimelineReport = (props) => {
  const [notice, setNotice] = useState("dd-mm-yyyy");
  const [nomination, setNomination] = useState("dd-mm-yyyy");
  const [transmission, setTransmission] = useState("dd-mm-yyyy");
  const [premliminary, setPremliminary] = useState("dd-mm-yyyy");
  const [meeting, setMeeting] = useState("dd-mm-yyyy");
  const [draft, setDraft] = useState("dd-mm-yyyy");
  const [prehearing, setPrehearing] = useState("dd-mm-yyyy");
  const [hearing, setHearing] = useState("dd-mm-yyyy");
  const [submission, setSubmission] = useState("dd-mm-yyyy");
  const [issuance, setIssuance] = useState("dd-mm-yyyy");

  useEffect(() => {
    props.location.state.timeline.map((time) => {
      let date;
      switch (time.name) {
        case "notice":
          date = time.date.split("T");
          setNotice(date[0]);
          break;

        case "nomination":
          date = time.date.split("T");
          setNomination(date[0]);
          break;

        case "transmission":
          date = time.date.split("T");
          setTransmission(date[0]);
          break;

        case "premliminary":
          date = time.date.split("T");
          setPremliminary(date[0]);
          break;

        case "meeting":
          date = time.date.split("T");
          setMeeting(date[0]);
          break;

        case "draft":
          date = time.date.split("T");
          setDraft(date[0]);
          break;

        case "prehearing":
          date = time.date.split("T");
          setPrehearing(date[0]);
          break;

        case "hearing":
          date = time.date.split("T");
          setHearing(date[0]);
          break;

        case "submission":
          date = time.date.split("T");
          setSubmission(date[0]);
          break;

        case "issuance":
          date = time.date.split("T");
          setIssuance(date[0]);
          break;

        default:
          break;
      }
    });
  }, []);

  const role = localStorage.getItem("iicra-token");

  const handleNavigationRFA = (data) => {
    props.history.push({
      pathname: "/cases_/rfa_",
      state: data,
    });
  };

  const handleNavigationNotice = (data) => {
    props.history.push({
      pathname: "/cases_/notice_",
      state: data,
    });
  };

  const handleNavigationAppointArb = (data) => {
    props.history.push({
      pathname: "/cases_/nomination_",
      state: data,
    });
  };

  const handleNavigationArbFile = (data) => {
    props.history.push({
      pathname: "/cases_/transmission_",
      state: data,
    });
  };

  const handleNavigationPreliminary = (data) => {
    props.history.push({
      pathname: "/cases_/premliminary_",
      state: data,
    });
  };

  const handleNavigationMeeting = (data) => {
    props.history.push({
      pathname: "/cases_/meeting_",
      state: data,
    });
  };

  const handleNavigationDraft = (data) => {
    props.history.push({
      pathname: "/cases_/draft_",
      state: data,
    });
  };

  const handleNavigationInvHearing = (data) => {
    props.history.push({
      pathname: "/cases_/prehearing_",
      state: data,
    });
  };

  const handleNavigationHearing = (data) => {
    props.history.push({
      pathname: "/cases_/hearing_",
      state: data,
    });
  };

  const handleNavigationMemorandum = (data) => {
    props.history.push({
      pathname: "/cases_/submission_",
      state: data,
    });
  };

  const handleNavigationAward = (data) => {
    props.history.push({
      pathname: "/cases_/issuance_",
      state: data,
    });
  };

  const { step } = props.location.state;

  const start = props.location.state.createdAt.split("T");

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
            {JSON.parse(role) == "admin" ? (
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
                <BreadcrumbItem style={styles.crumb}>
                  Timeline -{" "}
                  {props.location.state.caseNumberRec
                    ? `REC${props.location.state.createdAt.split("-")[0]}-${pad(
                        props.location.state.caseNumberRec
                      )}`
                    : "CASE/REC"}
                </BreadcrumbItem>
              </Breadcrumb>
            ) : null}

            {JSON.parse(role) == "first" ||
            JSON.parse(role) == "second" ||
            JSON.parse(role) == "concil" ||
            JSON.parse(role) == "interpretor" ? (
              <Breadcrumb>
                <BreadcrumbItem
                  onClick={() =>
                    props.history.push({
                      pathname: `/${role.split(`"`)[1]}`,
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
                <BreadcrumbItem style={styles.crumb}>
                  Timeline -{" "}
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
              <h6 style={styles.center}>Timeline Of Conciliation Proceeding</h6>
              <CardBody>
                <Table bordered hover>
                  <thead>
                    <tr>
                      <th>S. No.</th>
                      <th>Proceedings</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>I.</td>
                      <td
                        onClick={() =>
                          handleNavigationRFA(props.location.state)
                        }
                        style={step == 1 ? styles.navigate_ : styles.navigate}
                      >
                        Submission of Request for Conciliation (RFC)
                      </td>

                      <td>{start[0]}</td>
                    </tr>
                    {step >= 2 ? (
                      <tr>
                        <td>II.</td>
                        <td
                          onClick={() => {
                            handleNavigationNotice(props.location.state);
                          }}
                          style={step == 2 ? styles.navigate_ : styles.navigate}
                        >
                          Notice of Conciliation
                        </td>

                        <td>{notice}</td>
                      </tr>
                    ) : null}
                    {step >= 3 ? (
                      <tr>
                        <td>III.</td>

                        <td
                          onClick={() => {
                            handleNavigationAppointArb(props.location.state);
                          }}
                          style={step == 3 ? styles.navigate_ : styles.navigate}
                        >
                          Nomination and Appointment of the Conciliator(s)
                        </td>

                        <td>{nomination}</td>
                      </tr>
                    ) : null}
                    {step >= 4 ? (
                      <tr>
                        <td>IV.</td>
                        <td
                          onClick={() => {
                            handleNavigationArbFile(props.location.state);
                          }}
                          style={step == 4 ? styles.navigate_ : styles.navigate}
                        >
                          Transmission of Reconciliation File to Conciliator(s)
                        </td>

                        <td>{transmission}</td>
                      </tr>
                    ) : null}
                    {step >= 5 ? (
                      <tr>
                        <td>V.</td>
                        <td
                          onClick={() => {
                            handleNavigationPreliminary(props.location.state);
                          }}
                          style={step == 5 ? styles.navigate_ : styles.navigate}
                        >
                          Invitation for First Meeting
                        </td>

                        <td>{premliminary}</td>
                      </tr>
                    ) : null}
                    {step >= 6 ? (
                      <tr>
                        <td>VI.</td>
                        <td
                          onClick={() => {
                            handleNavigationMeeting(props.location.state);
                          }}
                          style={step == 6 ? styles.navigate_ : styles.navigate}
                        >
                          First Meeting
                        </td>

                        <td>{meeting}</td>
                      </tr>
                    ) : null}

                    {step >= 7 ? (
                      <tr>
                        <td>VII.</td>
                        <td
                          onClick={() => {
                            handleNavigationDraft(props.location.state);
                          }}
                          style={step == 7 ? styles.navigate_ : styles.navigate}
                        >
                          Extension of Conciliation Proceeding
                        </td>
                        <td>{draft}</td>
                      </tr>
                    ) : null}

                    {step >= 8 ? (
                      <tr>
                        <td>VIII.</td>
                        <td
                          onClick={() => {
                            handleNavigationInvHearing(props.location.state);
                          }}
                          style={step == 8 ? styles.navigate_ : styles.navigate}
                        >
                          Invitation for Meeting (...all)
                        </td>
                        <td>{prehearing}</td>
                      </tr>
                    ) : null}
                    {step >= 9 ? (
                      <tr>
                        <td>IX.</td>
                        <td
                          onClick={() => {
                            handleNavigationHearing(props.location.state);
                          }}
                          style={step == 9 ? styles.navigate_ : styles.navigate}
                        >
                          Meeting(s)
                        </td>
                        <td>{hearing}</td>
                      </tr>
                    ) : null}
                    {step >= 10 ? (
                      <tr>
                        <td>X.</td>
                        <td
                          onClick={() => {
                            handleNavigationMemorandum(props.location.state);
                          }}
                          style={
                            step == 10 ? styles.navigate_ : styles.navigate
                          }
                        >
                          Submission of Final Memorandum
                        </td>
                        <td>{submission}</td>
                      </tr>
                    ) : null}
                    {step >= 11 ? (
                      <tr>
                        <td>XI.</td>
                        <td
                          onClick={() => {
                            handleNavigationAward(props.location.state);
                          }}
                          style={
                            step == 11 ? styles.navigate_ : styles.navigate
                          }
                        >
                          Issuance of Final Agreement
                        </td>
                        <td>{issuance}</td>
                      </tr>
                    ) : null}
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
    padding: "1vh",
    borderRadius: "5px",
    cursor: "crosshair",
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
  active: {
    height: "4vh",
    backgroundColor: "white",
    borderRadius: "50%",
  },
  navigate: {
    cursor: "pointer",
    color: "blue",
  },
  navigate_: {
    cursor: "pointer",
    color: "green",
    fontWeight: "bold",
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

export default TimelineReport;
