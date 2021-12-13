import React, { useState } from "react";
import { Card, CardBody, CardHeader, Button, Container } from "reactstrap";
import header from "../../../assets/letterHead.png";
import axios from "axios";
import { getEnvironment } from "../../../config";

const Email1 = (props) => {
  const baseURL = getEnvironment().apiUrl;

  const [state, setState] = useState({
    allCases: [],
    date: "",
    time: "",
    soleArbitrator: "",
    soleArbitratorEmail: "",
    meetingLink: "",
  });

  const handleText = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSend = (data) => {
    const formData = new FormData();
    formData.append("respondentEmail", data.respondentEmail);
    formData.append("respondentName", data.respondentName);
    formData.append("claimantEmail", data.claimantEmail);
    formData.append("claimantName", data.claimantName);
    formData.append("soleArbitrator", state.soleArbitrator);
    formData.append("soleArbitratorEmail", state.soleArbitratorEmail);

    axios
      .post(`${baseURL}/email/confirmationOfSoleArbitrator`, formData)
      .then(() => console.log("sent"))
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
          <p>
            Name: <br />
            Address: <br />
            Contact Number: <br />
          </p>
          <br />
          <p>Case Number : {`REC2020-${props.location.state.caseNumberRec}`}</p>

          <p>{props.location.state.claimantName}</p>
          <p>VS</p>
          <p>{props.location.state.respondentName}</p>
          <p>
            <b>
              Subject: Invitation for the First Meeting under IICRA Rules (Case
              no)
            </b>
          </p>
          <br />
          <p>
            The International Islamic Centre for Reconciliation and Arbitration
            (IICRA) would like to update you all that the Conciliator post
            deliberation as per IICRA Rules has decided to hold the First
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
            <br />
            <p>
              Hence, IICRA and the Conciliator hereby call upon the parties to
              accordingly attend the scheduled virtual meeting accordingly.
            </p>
            Meeting Link :{" "}
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
          <br />
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
export default Email1;
