import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Container,
  Input,
} from "reactstrap";
import header from "../../../assets/letterHead.png";
import axios from "axios";
import jsPDF from "jspdf";
import Swal from "sweetalert2";
import Header from "../containers/Header";
import { getEnvironment } from "../../../config";

const Email15 = (props) => {
  const baseURL = getEnvironment().apiUrl;

  const [state, setState] = useState({
    order: "",
    date: "",
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
    formData.append("arbitratorName", state.arbitratorName);
    formData.append("email", data.claimantEmail);

    axios
      .post(`${baseURL}/email/arbTribunalRejectedReqClaimant`, formData)
      .then(() => {
        Swal.fire({
          title: "SENT",
          icon: "success",
        });
        props.history.push({
          pathname: "/email/draft",
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
        <p>vs</p>
        <p>{props.location.state.respondentName}</p>
        <p>
          <b>
            Subject: Rejection to Extend the Deadline Submission of Documents
          </b>
        </p>

        <p>
          <b>Dear Claimant,</b>
        </p>

        <p>
          As per the Order No.{" "}
          <Input
            type="text"
            name="order"
            value={state.order}
            onChange={handleText}
          />{" "}
          , the Arbitral Tribunal would like to inform you that due to the
          irrational and invalid reason your request to extend the submission of
          documents has been rejected and will expect to submit the required
          documents on{" "}
          <Input
            type="date"
            name="date"
            value={state.date}
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
            <br />
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
        <p>vs</p>
        <p>{props.location.state.respondentName}</p>
        <p>
          <b>
            Subject: Rejection to Extend the Deadline Submission of Documents
          </b>
        </p>

        <p>
          <b>Dear Claimant,</b>
        </p>

        <p>
          As per the Order No.{" "}
          <Input
            type="text"
            name="order"
            value={state.order}
            onChange={handleText}
          />{" "}
          , the Arbitral Tribunal would like to inform you that due to the
          irrational and invalid reason your request to extend the submission of
          documents has been rejected and will expect to submit the required
          documents on{" "}
          <Input
            type="date"
            name="date"
            value={state.date}
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
            <br />
          </b>
        </h6>
      </section>
    );
  };

  return (
    <>
      <Header
        data={props.location.state}
        stepName="Draft Terms of Reference &amp; Submission of Documents"
        stepPathPrev="draft"
        stepPath="draft"
        name="Arbitral Tribunal Rejected the Request to extend the Deadline Submission of Documents - Claimant"
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
export default Email15;
