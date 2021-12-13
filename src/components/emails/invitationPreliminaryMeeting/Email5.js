import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Container,
} from "reactstrap";
import header from "../../../assets/letterHead.png";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "../containers/Header";
import { getEnvironment } from "../../../config";

const Email5 = (props) => {
  const baseURL = getEnvironment().apiUrl;

  const [state, setState] = useState({
    allCases: [],
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
      .post(
        `${baseURL}/email/rescheduleClaimAttendPreliminaryMeetingCo`,
        formData
      )
      .then(() => {
        Swal.fire({
          title: "SENT",
          icon: "success",
        });
        props.history.push({
          pathname: "/email/invitePreMeeting",
          state: props.location.state,
        });
      })
      .catch(() =>
        Swal.fire({
          title: "Something went Wrong",
          icon: "error",
        })
      );
  };

  const pad = (num) => {
    if (num < 10) {
      return "00" + num;
    } else if (num > 9 && num < 100) {
      return "0" + num;
    } else return num;
  };

  const en = () => {
    return (
      <section>
        <p>
          Case Number :{" "}
          {`ARB${props.location.state.createdAt.split("-")[0]}-${pad(
            props.location.state.caseNumber
          )} `}
        </p>

        <p>{props.location.state.claimantName}</p>
        <p>VS</p>
        <p>{props.location.state.respondentName}</p>
        <p>
          <b>Subject: Confirmation to Reschedule the Preliminary Meeting</b>
        </p>

        <p>
          <b>Dear Claimant,</b>
        </p>

        <p>
          As per the Order No. ___, the Arbitral Tribunal would like to grant
          your request to reschedule the Preliminary Meeting and confirm the
          next schedule on (Date and Time).
          <br />
          Hence, IICRA and Arbitral Tribunal hereby call upon the parties to
          accordingly attend the scheduled virtual hearing accordingly.
          <br />
          Meeting Link:{" "}
          <Input
            type="text"
            name="meetingLink"
            value={state.meetingLink}
            onChange={handleText}
          />{" "}
        </p>

        <h6>
          <b>
            Sincerely, <br /> <br />
            <br />
            Signature &amp; Stamp <br />
            Rami Sulaiman <br />
            Chief Executive Officer (CEO) <br />
            International Islamic Centre for Reconciliation and Arbitration{" "}
          </b>
        </h6>
      </section>
    );
  };

  const ar = () => {
    return (
      <section>
        <p>
          Case Number :{" "}
          {`ARB${props.location.state.createdAt.split("-")[0]}-${pad(
            props.location.state.caseNumber
          )} `}
        </p>

        <p>{props.location.state.claimantName}</p>
        <p>VS</p>
        <p>{props.location.state.respondentName}</p>
        <p>
          <b>Subject: Confirmation to Reschedule the Preliminary Meeting</b>
        </p>

        <p>
          <b>Dear Claimant,</b>
        </p>

        <p>
          As per the Order No. ___, the Arbitral Tribunal would like to grant
          your request to reschedule the Preliminary Meeting and confirm the
          next schedule on (Date and Time).
          <br />
          Hence, IICRA and Arbitral Tribunal hereby call upon the parties to
          accordingly attend the scheduled virtual hearing accordingly.
          <br />
          Meeting Link:{" "}
          <Input
            type="text"
            name="meetingLink"
            value={state.meetingLink}
            onChange={handleText}
          />{" "}
        </p>

        <h6>
          <b>
            Sincerely, <br /> <br />
            <br />
            Signature &amp; Stamp <br />
            Rami Sulaiman <br />
            Chief Executive Officer (CEO) <br />
            International Islamic Centre for Reconciliation and Arbitration{" "}
          </b>
        </h6>
      </section>
    );
  };

  return (
    <>
      <Header
        data={props.location.state}
        stepName="Invitation for Preliminary Meeting"
        stepPathPrev="premliminary"
        stepPath="invitePreMeeting"
        name="Arbitral Tribunal Confirms to Reschedule the Preliminary Meeting - Claimant"
      />
      <Container style={styles.formUserContainer} className="shadow-lg">
        <h6 style={styles.center}>Email Template</h6>

        <Card style={styles.cardBg}>
          <CardHeader style={styles.letterContainer}>
            <img style={styles.header} src={header} alt="header" />
          </CardHeader>
          <CardBody>
            {document.dir == "ltr" ? en() : ar()}
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
export default Email5;
