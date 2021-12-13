import React, { useState } from "react";
import { Card, CardBody, CardHeader, Button, Container } from "reactstrap";
import header from "../../../assets/letterHead.png";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "../containers/Header";
import { getEnvironment } from "../../../config";

const Email56 = (props) => {
  const baseURL = getEnvironment().apiUrl;

  const [state, setState] = useState({
    allCases: [],
    soleArbitrator: "",
    soleArbitratorEmail: "",
    document: "",
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
      .post(`${baseURL}/email/soleRequestsDocumentsRespondent`, formData)
      .then(() => {
        Swal.fire({
          title: "SENT",
          icon: "success",
        });
        props.history.push({
          pathname: "/email/memorandum",
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

  return (
    <>
      <Header
        data={props.location.state}
        stepName="Submission of Final Memorandum"
        stepPathPrev="submission"
        stepPath="memorandum"
        name="Sole Arbitrator Requesting the Respondent to Submit the Required Documents"
      />
      <Container style={styles.formUserContainer} className="shadow-lg">
        <h6 style={styles.center}>Email Template</h6>

        <Card style={styles.cardBg}>
          <CardHeader style={styles.letterContainer}>
            <img style={styles.header} src={header} alt="header" />
          </CardHeader>
          <CardBody>
            <br />
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
              <b>
                Subject: Requesting the Respondent to Submit the Required
                Document(s)
              </b>
            </p>

            <br />
            <p>
              <b>Dear Respondent,</b>
            </p>

            <p>
              As per the Order No. ___ on (Date), the Sole Arbitrator would like
              to request to the Claimant to produce the required document(s) as
              follows:
              <br />
              <input
                type="textarea"
                name="document"
                value={state.document}
                onChange={handleText}
              />
            </p>
            <p>
              Please be noted that as per the instructions received from the
              reputed Sole Arbitrator the deadline for the above documents will
              be on (Date) and IICRA shall not received any documents submission
              thereafter until the Sole Arbitrator advised otherwise.
              <br />
              We thank you all in advance for respecting IICRA Rules and we are
              looking forward to receiving your feedback.
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
export default Email56;
