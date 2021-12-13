import React, { useState } from "react";
import { Card, CardBody, CardHeader, Button, Container } from "reactstrap";
import header from "../../../assets/letterHead.png";
import axios from "axios";
import jsPDF from "jspdf";
import { getEnvironment } from "../../../config";

const Email29 = (props) => {
  const baseURL = getEnvironment().apiUrl;

  const [state, setState] = useState({
    allCases: [],
    arbitratorName: "",
    date: "",
    time: "",
    meetingLink: "",
    doc: new jsPDF(),
  });

  const handleText = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSend = (data) => {
    const pdf = state.doc.output("blob");

    const formData = new FormData();
    formData.append("respondentEmail", data.respondentEmail);
    formData.append("respondentName", data.respondentName);
    formData.append("claimantEmail", data.claimantEmail);
    formData.append("claimantName", data.claimantName);
    formData.append("arbitratorName", state.arbitratorName);
    formData.append("email", data.claimantEmail);
    formData.append("sample", pdf);

    axios
      .post(`${baseURL}/email/appointmentOfSoleArbitrator`, formData)
      .then(() => alert("success"))
      .catch(() => console.log("error"));
  };

  return (
    <Container style={styles.formUserContainer} className="shadow-lg">
      <h3 style={styles.center}>Email Template</h3>

      <Card style={styles.cardBg}>
        <CardHeader style={styles.letterContainer}>
          <img style={styles.header} src={header} alt="header" />
        </CardHeader>
        <CardBody>
          <br />

          <p>Case Number: {props.location.state.caseNumberRec}</p>
          <br />
          <p>(Initiating Party) {props.location.state.claimantName}</p>
          <p>VS</p>
          <p>(Opposing Party(s)) {props.location.state.respondentName}</p>
          <p>
            <b>Subject: Invitation for the Final Meeting under IICRA Rules</b>
          </p>
          <br />
          <p>
            <b>Dear Parties,</b>
          </p>
          <br />
          <p>
            The International Islamic Centre for Reconciliation and Arbitration
            (IICRA) would like to update you all that the Conciliator post
            deliberation as per IICRA Rules has decided to hold the Final
            Meeting on{" "}
            <input
              type="date"
              name="date"
              value={state.date}
              onChange={handleText}
            />{" "}
            at{" "}
            <input
              type="time"
              name="time"
              value={state.time}
              onChange={handleText}
            />
          </p>
          <p>
            Hence, IICRA and the Conciliator hereby call upon the parties to
            accordingly attend the scheduled virtual meeting accordingly.
            <br />
            Meeting Link:{" "}
            <input
              type="text"
              name="meetingLink"
              value={state.meetingLink}
              onChange={handleText}
            />
          </p>
          <h6>
            <b>
              Sincerely, <br /> <br />
              <br />
              Signature &amp; Stamp <br />
              Rami Sulaiman <br />
              Chief Executive Officer (CEO) <br />
              International Islamic Centre for Reconciliation and Arbitration{" "}
              <br />
            </b>
          </h6>
          <Button onClick={() => handleSend(props.location.state)}>Send</Button>
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
    paddingTop: "1vh",
    paddingBottom: "1vh",
  },
  button: {
    margin: 15,
    backgroundColor: "#008f53",
  },
  formUserContainer: {
    marginTop: "5vh",
    paddingTop: "5vh",
    paddingBottom: "3vh",
    backgroundColor: "#f6f6f6",
    minHeight: "100vh",
  },
  cardBg: {
    backgroundColor: "#f6f6f6",
    border: "none",
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
export default Email29;
