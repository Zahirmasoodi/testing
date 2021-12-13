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
import pad from "../../pad";
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

  const handleNavigation = (path) => {
    props.history.push({
      pathname: path,
      state: props.location.state,
    });
  };

  const { step } = props.location.state;
  const start = props.location.state.createdAt.split("T");

  return (
    <>
      <Container
        fluid
        style={styles.crumbContainer}
        className={document.dir == "ltr" ? "text-left" : "text-right"}
      >
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
                  {document.dir == "ltr" ? "Dashboard" : " لوحة القيادة"}
                </BreadcrumbItem>
                <BreadcrumbItem
                  onClick={() =>
                    props.history.push({
                      pathname: "/cases",
                    })
                  }
                  style={styles.crumbTabs}
                >
                  {document.dir == "ltr" ? "Cases" : " حالات"}
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
                  {document.dir == "ltr" ? "Details" : " تفاصيل"}
                </BreadcrumbItem>
                <BreadcrumbItem style={styles.crumb}>
                  {document.dir == "ltr" ? "Timeline" : " الجدول الزمني"} - ARB
                  {props.location.state.createdAt.split("-")[0]}-
                  {pad(props.location.state.caseNumber)}
                </BreadcrumbItem>
              </Breadcrumb>
            ) : null}

            {JSON.parse(role) == "claimant" ||
            JSON.parse(role) == "respondent" ||
            JSON.parse(role) == "arbitrator" ||
            JSON.parse(role) == "rapporteur" ||
            JSON.parse(role) == "expert" ||
            JSON.parse(role) == "witness" ||
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
                  {document.dir == "ltr" ? "Cases" : " حالات"}
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
                  {document.dir == "ltr" ? "Details" : " تفاصيل"}
                </BreadcrumbItem>
                <BreadcrumbItem style={styles.crumb}>
                  {document.dir == "ltr" ? "Timeline" : " الجدول الزمني"} - ARB
                  {props.location.state.createdAt.split("-")[0]}-
                  {pad(props.location.state.caseNumber)}
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
              <h6 style={styles.center}>
                {document.dir == "ltr"
                  ? "Timeline Of Arbitration Proceeding"
                  : "الجدول الزمني لاجراءات التحكيم"}
              </h6>

              <CardBody>
                <Table bordered hover>
                  <thead>
                    <tr>
                      <th>{document.dir == "ltr" ? "S. No." : "رقم سري"}</th>
                      <th>
                        {document.dir == "ltr" ? "Proceedings" : "الإجراءات"}
                      </th>
                      <th>{document.dir == "ltr" ? "Date" : "تاريخ"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>I.</td>
                      <td
                        onClick={() => handleNavigation("/cases/rfa")}
                        style={step == 1 ? styles.navigate_ : styles.navigate}
                      >
                        {document.dir == "ltr"
                          ? "Submission of Request for Arbitration (RFA)"
                          : "تقديم طلب التحكيم"}
                      </td>

                      <td>{start[0]}</td>
                    </tr>
                    {step >= 2 ? (
                      <tr>
                        <td>II.</td>
                        <td
                          onClick={() => {
                            handleNavigation("/cases/notice");
                          }}
                          style={step == 2 ? styles.navigate_ : styles.navigate}
                        >
                          {document.dir == "ltr"
                            ? "Notice of Arbitration"
                            : "إشعار التحكيم"}
                        </td>

                        <td>{notice}</td>
                      </tr>
                    ) : null}
                    {step >= 3 ? (
                      <tr>
                        <td>III.</td>

                        <td
                          onClick={() => {
                            handleNavigation("/cases/nomination");
                          }}
                          style={step == 3 ? styles.navigate_ : styles.navigate}
                        >
                          {document.dir == "ltr"
                            ? "Nomination and Appointment of the Arbitrator(s)"
                            : "ترشيح وتعيين المحكم"}
                        </td>

                        <td>{nomination}</td>
                      </tr>
                    ) : null}
                    {step >= 4 ? (
                      <tr>
                        <td>IV.</td>
                        <td
                          onClick={() => {
                            handleNavigation("/cases/transmission");
                          }}
                          style={step == 4 ? styles.navigate_ : styles.navigate}
                        >
                          {document.dir == "ltr"
                            ? "Transmission of Arbitration File to Arbitrator(s)"
                            : "إحالة ملف التحكيم إلى المحكم"}
                        </td>

                        <td>{transmission}</td>
                      </tr>
                    ) : null}
                    {/* {step >= 5 ? (
                      <tr>
                        <td>V.</td>
                        <td
                          onClick={() => {
                            handleNavigation("/cases/premliminary");
                          }}
                          style={step == 5 ? styles.navigate_ : styles.navigate}
                        >
                          {document.dir == "ltr"
                            ? "Invitation for Preliminary Meeting"
                            : "دعوة للاجتماع التمهيدي"}
                        </td>
                        <td>{premliminary}</td>
                      </tr>
                    ) : null} */}
                    {step >= 5 ? (
                      <tr>
                        <td>V.</td>
                        <td
                          onClick={() => {
                            handleNavigation("/cases/meeting");
                          }}
                          style={step == 5 ? styles.navigate_ : styles.navigate}
                        >
                          {document.dir == "ltr"
                            ? "Preliminary Meeting"
                            : "الاجتماع التمهيدي"}
                        </td>

                        <td>{meeting}</td>
                      </tr>
                    ) : null}

                    {step ? (
                      <tr>
                        <td>VI.</td>
                        <td
                          onClick={() => {
                            handleNavigation("/cases/exchange");
                          }}
                          style={step == 5 ? styles.navigate_ : styles.navigate}
                        >
                          {document.dir == "ltr"
                            ? "Exchange of Documents"
                            : "تبادل المستندات"}
                        </td>

                        <td>{meeting}</td>
                      </tr>
                    ) : null}

                    {/* {step >= 6 ? (
                      <tr>
                        <td>VII.</td>
                        <td
                          onClick={() => {
                            handleNavigation("/cases/draft");
                          }}
                          style={step == 6 ? styles.navigate_ : styles.navigate}
                        >
                          {document.dir == "ltr"
                            ? "Draft Terms of Reference & Submission of Documents"
                            : "مسودة الاختصاصات وتقديم الوثائق"}
                        </td>
                        <td>{draft}</td>
                      </tr>
                    ) : null} */}

                    {/* {step >= 8 ? (
                      <tr>
                        <td>VIII.</td>
                        <td
                          onClick={() => {
                            handleNavigation("/cases/prehearing");
                          }}
                          style={step == 8 ? styles.navigate_ : styles.navigate}
                        >
                          {document.dir == "ltr"
                            ? "Invitation for Hearing (...all)"
                            : "دعوة للسمع (الكل)"}
                        </td>
                        <td>{prehearing}</td>
                      </tr>
                    ) : null} */}
                    {step >= 6 ? (
                      <tr>
                        <td>VII.</td>
                        <td
                          onClick={() => {
                            handleNavigation("/cases/hearing");
                          }}
                          style={step == 6 ? styles.navigate_ : styles.navigate}
                        >
                          {document.dir == "ltr"
                            ? "Hearing(s)"
                            : "جلسات الاستماع"}
                        </td>
                        <td>{hearing}</td>
                      </tr>
                    ) : null}

                    {step ? (
                      <tr>
                        <td>VIII.</td>
                        <td
                          onClick={() => {
                            handleNavigation("/cases/summon");
                          }}
                          style={step == 5 ? styles.navigate_ : styles.navigate}
                        >
                          {document.dir == "ltr"
                            ? "Call Expert / Witness / Interpretor"
                            : "اتصل بالخبير / الشاهد / المترجم"}
                        </td>

                        <td>{meeting}</td>
                      </tr>
                    ) : null}
                    {step >= 7 ? (
                      <tr>
                        <td>IX.</td>
                        <td
                          onClick={() => {
                            handleNavigation("/cases/submission");
                          }}
                          style={step == 7 ? styles.navigate_ : styles.navigate}
                        >
                          {document.dir == "ltr"
                            ? "Final Submission"
                            : "تقديم المذكرة النهائية"}
                        </td>
                        <td>{submission}</td>
                      </tr>
                    ) : null}
                    {step >= 8 ? (
                      <tr>
                        <td>X.</td>
                        <td
                          onClick={() => {
                            handleNavigation("/cases/issuance");
                          }}
                          style={step == 8 ? styles.navigate_ : styles.navigate}
                        >
                          {document.dir == "ltr"
                            ? "Final Award"
                            : "اصدار الجائزة النهائية"}
                        </td>
                        <td>{issuance}</td>
                      </tr>
                    ) : null}
                    {step ? (
                      <tr>
                        <td>XI.</td>
                        <td
                          onClick={() => {
                            handleNavigation("/cases/correct");
                          }}
                          style={step == 8 ? styles.navigate_ : styles.navigate}
                        >
                          {document.dir == "ltr"
                            ? "Correction / Explanation"
                            : "تصحيح / شرح"}
                        </td>
                        <td>{issuance}</td>
                      </tr>
                    ) : null}
                    {step ? (
                      <tr>
                        <td>XII.</td>
                        <td
                          onClick={() => {
                            handleNavigation("/cases/requests");
                          }}
                          style={step == 8 ? styles.navigate_ : styles.navigate}
                        >
                          {document.dir == "ltr"
                            ? "Other Requests"
                            : "طلبات أخرى"}
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
