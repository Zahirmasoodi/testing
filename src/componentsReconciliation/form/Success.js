import React, { Component } from "react";
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
  return (
    <Container style={styles.formUserContainer} className="shadow">
      <Row>
        <Col style={styles.progress}>
          <ul style={{ padding: 0 }}>
            <Row style={{ textAlign: "center" }}>
              <Col xl={2} lg={2} md={2} sm={2} xs={2}>
                <li
                  id="claimant"
                  style={{
                    display: "inline",
                    fontSize: "15px",
                    background: "green",
                    borderRadius: "50%",
                    padding: "2vh 9%",
                    lineHeight: "45px",
                  }}
                >
                  <img
                    src={tick}
                    style={{ height: "3.8vh", width: "3.8vh" }}
                    alt="step finished"
                  />
                </li>
              </Col>
              <Col xl={2} lg={2} md={2} sm={2} xs={2}>
                <li
                  id="respondent"
                  style={{
                    display: "inline",
                    fontSize: "15px",
                    background: "green",
                    borderRadius: "50%",
                    padding: "2vh 9%",
                    lineHeight: "45px",
                  }}
                >
                  <img
                    src={tick}
                    style={{ height: "3.8vh", width: "3.8vh" }}
                    alt="step finished"
                  />
                </li>
              </Col>
              <Col xl={2} lg={2} md={2} sm={2} xs={2}>
                <li
                  id="dispute"
                  style={{
                    display: "inline",
                    fontSize: "15px",
                    background: "green",
                    borderRadius: "50%",
                    padding: "2vh 9%",
                    lineHeight: "45px",
                  }}
                >
                  <img
                    src={tick}
                    style={{ height: "3.8vh", width: "3.8vh" }}
                    alt="step finished"
                  />
                </li>
              </Col>
              <Col xl={2} lg={2} md={2} sm={2} xs={2}>
                <li
                  id="arbitrator"
                  style={{
                    display: "inline",
                    fontSize: "15px",
                    background: "green",
                    borderRadius: "50%",
                    padding: "2vh 9%",
                    lineHeight: "45px",
                  }}
                >
                  <img
                    src={tick}
                    style={{ height: "3.8vh", width: "3.8vh" }}
                    alt="step finished"
                  />
                </li>
              </Col>
              <Col xl={2} lg={2} md={2} sm={2} xs={2}>
                <li
                  id="Undertakings"
                  style={{
                    display: "inline",
                    fontSize: "15px",
                    background: "green",
                    borderRadius: "50%",
                    padding: "2vh 9%",
                    lineHeight: "45px",
                  }}
                >
                  <img
                    src={tick}
                    style={{ height: "3.8vh", width: "3.8vh" }}
                    alt="step finished"
                  />
                </li>
              </Col>
              <Col xl={2} lg={2} md={2} sm={2} xs={2}>
                <li
                  id="eSignature"
                  style={{
                    display: "inline",
                    fontSize: "15px",
                    background: "green",
                    borderRadius: "50%",
                    padding: "2vh 9%",
                    lineHeight: "45px",
                  }}
                >
                  <img
                    src={tick}
                    style={{ height: "3.8vh", width: "3.8vh" }}
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
          <CardTitle style={styles.center}>Submitted Successfully</CardTitle>
        </CardHeader>
        <CardBody style={styles.body}>
          Your request has been successfully submitted and IICRA shall notify
          the status of your request within three (3) working days.
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
  },
  body: {
    textAlign: "center",
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
