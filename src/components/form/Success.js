import React, { useEffect } from "react";
import {
  Card,
  CardTitle,
  CardHeader,
  CardBody,
  Container,
  Progress,
  Row,
  Col,
} from "reactstrap";
import success from "../../assets/success.svg";
import tick from "../../assets/tick.png";

const Confirm = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Container style={styles.formUserContainer} className="shadow">
      <Row>
        <Col style={styles.progress}>
          <ul style={{ padding: 0 }}>
            <Row style={{ textAlign: "center" }}>
              <Col>
                <li
                  id="claimant"
                  style={{
                    display: "inline",
                    fontSize: "15px",
                    lineHeight: "45px",
                    background: "green",
                    borderRadius: "50%",
                    padding: "2vh 12%",
                  }}
                >
                  <img
                    src={tick}
                    style={{ height: "3vh", width: "3vh" }}
                    alt="step finished"
                  />
                </li>
              </Col>
              <Col>
                <li
                  id="respondent"
                  style={{
                    display: "inline",
                    fontSize: "15px",
                    lineHeight: "45px",
                    background: "green",
                    borderRadius: "50%",
                    padding: "2vh 12%",
                  }}
                >
                  <img
                    src={tick}
                    style={{ height: "3vh", width: "3vh" }}
                    alt="step finished"
                  />
                </li>
              </Col>
              <Col>
                <li
                  id="dispute"
                  style={{
                    display: "inline",
                    fontSize: "15px",
                    lineHeight: "45px",
                    background: "green",
                    borderRadius: "50%",
                    padding: "2vh 12%",
                  }}
                >
                  <img
                    src={tick}
                    style={{ height: "3vh", width: "3vh" }}
                    alt="step finished"
                  />
                </li>
              </Col>
              <Col>
                <li
                  id="arbitrator"
                  style={{
                    display: "inline",
                    fontSize: "15px",
                    lineHeight: "45px",
                    background: "green",
                    borderRadius: "50%",
                    padding: "2vh 12%",
                  }}
                >
                  <img
                    src={tick}
                    style={{ height: "3vh", width: "3vh" }}
                    alt="step finished"
                  />
                </li>
              </Col>
              <Col>
                <li
                  id="suggestion"
                  style={{
                    display: "inline",
                    fontSize: "15px",
                    lineHeight: "45px",
                    background: "green",
                    borderRadius: "50%",
                    padding: "2vh 12%",
                  }}
                >
                  <img
                    src={tick}
                    style={{ height: "3vh", width: "3vh" }}
                    alt="step finished"
                  />
                </li>
              </Col>
              <Col>
                <li
                  id="Undertakings"
                  style={{
                    display: "inline",
                    fontSize: "15px",
                    lineHeight: "45px",
                    background: "green",
                    borderRadius: "50%",
                    padding: "2vh 12%",
                  }}
                >
                  <img
                    src={tick}
                    style={{ height: "3vh", width: "3vh" }}
                    alt="step finished"
                  />
                </li>
              </Col>
              <Col>
                <li
                  id="eSignature"
                  style={{
                    display: "inline",
                    fontSize: "15px",
                    lineHeight: "45px",
                    background: "green",
                    borderRadius: "50%",
                    padding: "2vh 12%",
                  }}
                >
                  <img
                    src={tick}
                    style={{ height: "3vh", width: "3vh" }}
                    alt="step finished"
                  />
                </li>
              </Col>
            </Row>
          </ul>
          <div style={{ marginTop: "-37px", backgroundColor: "green" }}>
            <hr style={{ border: "1.2px solid green" }} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col style={styles.progress}>
          <Progress color="success" value="100" />
        </Col>
      </Row>
      <Card style={styles.cardBg}>
        <CardHeader style={styles.header}>
          <img src={success} alt="success" style={styles.success} />
          <CardTitle style={styles.center}>
            {document.dir == "ltr"
              ? "Submitted Successfully"
              : "تم تقديم الطلب بنجاح"}
          </CardTitle>
        </CardHeader>
        <CardBody style={styles.body}>
          {document.dir == "ltr"
            ? `Your request has been successfully submitted and IICRA shall notify
          the status of your request within three (3) working days.`
            : `وسيقوم المركز بإرسال البريد الاكتروني لاستلام الطلب ويقوم بإخطار الطرف المبادر بتأكيد قبول الطلب أو برفضه في غضون ثلاثة (3) أيام عمل`}
        </CardBody>
      </Card>
    </Container>
  );
};
const styles = {
  center: {
    color: "white",
    textAlign: "center",
    backgroundColor: "#008f53",
    paddingTop: "2vh",
    paddingBottom: "2vh",
    marginTop: "10vh",
    cursor: "not-allowed",
  },
  body: {
    textAlign: "center",
    cursor: "crosshair",
  },
  success: {
    height: "25vh",
  },
  formUserContainer: {
    marginTop: "5vh",
    paddingTop: "5vh",
    paddingBottom: "3vh",
    backgroundColor: "#f6f6f6",
  },
  header: {
    padding: "10vh",
    textAlign: "center",
  },
  cardBg: {
    backgroundColor: "#f6f6f6",
    border: "none",
  },
  progress: {
    marginBottom: "4vh",
  },
};

export default Confirm;
