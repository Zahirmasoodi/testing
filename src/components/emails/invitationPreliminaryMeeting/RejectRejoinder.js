import React, { useState } from "react";
import {
  Card,
  CardBody,
  Input,
  CardHeader,
  Button,
  Container,
} from "reactstrap";
import header from "../../../assets/letterHead.png";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "../containers/Header";
import { getEnvironment } from "../../../config";

const RejectRejoinder = (props) => {
  const baseURL = getEnvironment().apiUrl;

  const [state, setState] = useState({
    allCases: [],
    resEmail: "",
    claEmail: "",
    agreementDate: "",
    notes: "",
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleText = (e) => {
    setState({ ...state, notes: e.target.value });
  };

  const handleSend = (data) => {
    const formData = new FormData();
    formData.append("respondentEmail", data.respondentEmail);
    formData.append("respondentName", data.respondentName);
    formData.append("respondentPhone", data.respondentPhone);
    formData.append("claimantEmail", data.claimantEmail);
    formData.append("claimantName", data.claimantName);
    formData.append("createdAt", data.createdAt);
    formData.append("natureOfDispute", data.natureOfDispute);
    formData.append("caseNumber", data.caseNumber);
    formData.append("notes", state.notes);
    formData.append("language", document.dir == "ltr" ? "ltr" : "rtl");

    axios
      .post(`${baseURL}/email/rejectRejoinder`, formData)
      .then(() => {
        Swal.fire({
          title: "SENT",
          icon: "success",
        });
        props.history.push({
          pathname: "/email/arbitrationNotice",
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

  const en = () => {
    return (
      <>
        <p>
          Claimant ({props.location.state.claimantName})<br />
          vs
          <br />
          Respondent ({props.location.state.respondentName}){" "}
        </p>
        <br />
        <p style={{ textAlign: "center" }}>
          <b>Subject</b> : Rejection of Request for Third Party Intervention
        </p>
        <p>Attention to the Claimant/Respondent, </p>
        <p>
          Warm Greetings from the International Islamic Centre for
          Reconciliation and Arbitration (IICRA).
        </p>
        <p>
          Pursuant to your request dated{" "}
          <Input
            type="date"
            name="agreementDate"
            id="agreementDate"
            value={state.agreementDate}
            onChange={handleChange}
          />{" "}
          regarding{" "}
          <Input
            type="textarea"
            cols="50"
            rows="5"
            name="notes"
            onChange={handleText}
            value={state.notes}
          />{" "}
          we would like to inform you that the Arbitral Tribunal & IICRA have
          rejected the request for admission or intervention that was initiated,
          as the Tribunal & IICRA did not find the Request more convincing.
        </p>

        <p>Thank you for respecting the regulatory deadlines.</p>

        <h6>
          <b>
            Sincerely, <br />
            <br />
            Signature &amp; Stamp <br />
            Rami Sulaiman <br />
            Chief Executive Officer <br />
            International Islamic Centre for Reconciliation &amp; Arbitration{" "}
            <br />
          </b>
        </h6>
      </>
    );
  };

  const ar = () => {
    return (
      <div style={{ fontSize: "16px" }}>
        <div style={{ textAlign: "center" }}>
          المحتكم ({props.location.state.claimantName})<br />
          ضد
          <br />
          المحتكم ضده ({props.location.state.respondentName}){" "}
        </div>
        <br />
        <p style={{ textAlign: "center" }}>
          <b>الموضوع</b> : نموذج قبول طلب الإدخال
        </p>
        <br />
        <p style={{ textAlign: "right" }}>السلام عليكم ورحمة الله وبركاته:</p>
        <p style={{ textAlign: "right" }}>
          السادة/المحتكم/المحتكم ضده
          ،،،،،،،،،،،،،،،،،،،،،،،،،،،،،،،،،،،،،،،،،الموقر
        </p>

        <p style={{ textAlign: "right" }}>
          عطفًا على طلبكم المؤرخ
          <Input
            type="date"
            name="agreementDate"
            id="agreementDate"
            value={state.agreementDate}
            onChange={handleChange}
          />{" "}
          بشأن
          <Input
            type="textarea"
            cols="50"
            rows="5"
            name="notes"
            onChange={handleText}
            value={state.notes}
          />{" "}
          نود إفادتكم بأن هيئة التحكيم والمركز قد رفضت طلب الإدخال الذي تقدم به،
          حيث لم تجد هيئة التحكيم والمركز مبررًا لقبول الطلب.{" "}
        </p>

        <h6 style={{ textAlign: "right" }}>
          <b>
            وتفضلوا بقبول فائق التقدير والاحترام, <br />
            <br />
            التوقيع والختم <br />
            رامي سليمان <br />
            الرئيس التنفيذى <br />
            المركز الإسلامي الدولي للمصالحة والتحكيم
            <br />
          </b>
        </h6>
      </div>
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
        stepName="Invitation for Preliminary Meeting"
        stepPathPrev="premliminary"
        stepPath="invitePreMeeting"
        name="Rejection of Request for Third Party Intervention"
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
export default RejectRejoinder;
