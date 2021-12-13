import React, { useState } from "react";
import { Card, CardBody, CardHeader, Button, Container } from "reactstrap";
import header from "../../../assets/letterHead.png";
import axios from "axios";
import jsPDF from "jspdf";
import Swal from "sweetalert2";
import Header from "../containers/Header";
import { getEnvironment } from "../../../config";
import pad from "../../../pad";

const Email41 = (props) => {
  const baseURL = getEnvironment().apiUrl;

  const [state, setState] = useState({
    reason: "",
    doc: new jsPDF(),
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

    axios
      .post(
        `${baseURL}/email/tribunalRejectsSummonInterpreterClaimant`,
        formData
      )
      .then(() => {
        Swal.fire({
          title: "SENT",
          icon: "success",
        });
        props.history.push({
          pathname: "/email/inviteHearing",
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

  return (
    <>
      <Header
        data={props.location.state}
        stepName="Invitation for Hearing"
        stepPathPrev="prehearing"
        stepPath="inviteHearing"
        name="Arbitral Tribunal Rejecting the Summon Certified Interpretor of the Claimant"
      />
      <Container style={styles.formUserContainer} className="shadow-lg">
        <h6 style={styles.center}>Email Template</h6>

        <Card style={styles.cardBg}>
          <CardHeader style={styles.letterContainer}>
            <img style={styles.header} src={header} alt="header" />
          </CardHeader>
          <CardBody>
            <p>
              Case Number :
              {`ARB${props.location.state.createdAt.split("-")[0]}-${pad(
                props.location.state.caseNumber
              )} `}
            </p>
            <p>
              {props.location.state.claimantName}
              <br />
              vs
              <br />
              {props.location.state.respondentName}
            </p>
            <p>
              <b>
                Subject: Arbitral Tribunal Rejecting the Request to Summon
                Certified Interpreter
              </b>
            </p>
            <p>
              <b>Dear Claimant,</b>
            </p>
            <p>
              As per the Order No. ___ on (Date), the Arbitral Tribunal rejected
              your request to summon (Name of the Interpreter) to act as
              Interpreter on this arbitral proceeding due to the following
              reason(s):
            </p>
            <p>
              <input
                type="textarea"
                name="reason"
                value={state.reason}
                onChange={handleText}
              />
              <br />
              Thank you in advance for respecting the IICRA Rules.
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
export default Email41;
