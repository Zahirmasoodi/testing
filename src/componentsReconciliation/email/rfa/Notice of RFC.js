import React, { useState } from "react";
import { Card, CardBody, CardHeader, Button, Container } from "reactstrap";
import header from "../../../assets/letterHead.png";
import axios from "axios";
import Header from "../containers/Header";
import { getEnvironment } from "../../../config";

const Confirmation = (props) => {
  const baseURL = getEnvironment().apiUrl;

  const [state, setState] = useState({
    allCases: [],
    article: "",
    article_: "",
  });

  const handleText = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSend = (data) => {
    const formData = new FormData();
    formData.append("respondentName", data.respondentName);
    formData.append("claimantEmail", data.claimantEmail);
    formData.append("claimantName", data.claimantName);
    formData.append("createdAt", data.createdAt);
    formData.append("natureOfDispute", data.natureOfDispute);
    formData.append("arbitratorName", data.arbitratorName);
    formData.append("arbitrationLanguage", data.arbitrationLanguage);
    formData.append("reliefSought", data.reliefSought);
    formData.append("article", state.article);
    formData.append("article_", state.article_);

    axios
      .post(`${baseURL}/email/ackClaimantApproved`, formData)
      .then(() => console.log("sent"))
      .catch(() => console.log("error"));
  };

  return (
    <>
      <Header
        data={props.location.state}
        stepName="RFA"
        stepPathPrev="rfa"
        stepPath="rfa"
        name="Approved"
      />
      <Container style={styles.formUserContainer} className="shadow-lg">
        <h6 style={styles.center}>Notice of RFC</h6>

        <Card style={styles.cardBg}>
          <CardHeader style={styles.letterContainer}>
            <img style={styles.header} src={header} alt="header" />
          </CardHeader>
          <CardBody>
            <br />
            <p>
              Case Number: REC{props.location.state.createdAt.split("-")[0]}
              {"-"}
              {props.location.state.caseNumberRec}
            </p>
            <p>
              {props.location.state.claimantName}
              vs
              {props.location.state.respondentName}
            </p>
            <p>
              <b>Subject: Notice of Reconciliation</b>
            </p>

            <p>Dear {props.location.state.respondentName},</p>

            <p>
              We would like to inform you that the Initiating Party has filed
              the Request for Conciliation (RFC) dated
              {props.location.state.createdAt.split("T")[0]} to settle a dispute
              arises out of the (Agreement) on (Date) Pursuant to Article 6 of
              IICRA Rules, kindly find herewith the copy of RFC along with its
              attachments. Thus, IICRA filed the RFC under Case Number{" "}
              {`${props.location.state.createdAt.split("-")[0]}-${
                props.location.state.caseNumberRec
              }`}
            </p>

            <p>As per the RFC, ……………………………………………….. are as follows:</p>
            <p>{props.location.state.natureOfDispute}</p>
            <p>
              Under Article 11 of IICRA Rules, you are kindly requested to
              provide us with your response to RFA within Fourteen (14) Days
              upon receiving this notification. Your response shall contain your
              reply to RFC, Counterclaim, if any supported by any documents
              available and (your Nomination or Objection of Conciliator) and
              any remarks you have regarding the language, seat of
              Reconciliation, jurisdiction etc. in the conciliation proceedings.
              We thank you in advance for respecting IICRA Rules and deadlines
              for Reconciliation proceedings. We are earnestly looking forward
              to hearing from you.
            </p>
            <br />
            <p>
              Please log in on IICRA Online System:
              <br />
              Link: ______________
              <br />
              Username:___________
              <br />
              Password: ______________
            </p>
            <br />
            <i>
              Shall you require any assistance, please do not hesitate to
              contact <b>info@iicra.com</b>
            </i>
            <br />
            <h6>
              <b>
                Sincerely,
                <br />
                <br />
                Signature &amp; Stamp <br />
                Rami Sulaiman <br />
                Chief Executive Officer <br />
                International Islamic Centre for Reconciliation &amp;
                Arbitration <br />
              </b>
            </h6>
            <Button onClick={() => handleSend(props.location.state)}>
              Send
            </Button>
          </CardBody>
        </Card>
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
  },
  button: {
    margin: 15,
    backgroundColor: "#008f53",
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
    border: "2px solid green",
  },
  cardBgSecondary: {
    backgroundColor: "#f6f6f6",
    marginTop: "3vh",
  },
  header: {
    height: "20vh",
    width: "80%",
  },
  letterContainer: {
    textAlign: "center",
    backgroundColor: "#f6f6f6",
    border: "none",
  },
};
export default Confirmation;
