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
import Swal from "sweetalert2";
import Header from "../containers/Header";
import { getEnvironment } from "../../../config";
import pad from "../../../pad";

const Regection = (props) => {
  const baseURL = getEnvironment().apiUrl;

  const [state, setState] = useState({
    allCases: [],
    reason: "",
  });

  const handleText = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSend = (data) => {
    const formData = new FormData();
    formData.append("respondentName", data.respondentName);
    formData.append("respondentName2", data.respondentName2);
    formData.append("respondentEmail", data.respondentEmail);
    formData.append("respondentEmail2", data.respondentEmail2);
    formData.append("claimantEmail", data.claimantEmail);
    formData.append("claimantEmail2", data.claimantEmail2);
    formData.append("claimantName", data.claimantName);
    formData.append("claimantName2", data.claimantName2);
    formData.append("createdAt", data.createdAt);
    formData.append("caseNumber", data.caseNumber);
    formData.append("reason", state.reason);
    formData.append("language", document.dir == "ltr" ? "ltr" : "rtl");

    axios
      .post(`${baseURL}/email/rejected`, formData)
      .then(() => {
        console.log("SENT");
        Swal.fire({
          title: document.dir == "ltr" ? "SENT" : "مرسل",
          icon: "success",
        });
        props.history.push({
          pathname: "/email/rfa",
          state: props.location.state,
        });
      })
      .catch(() => {
        Swal.fire({
          title: document.dir == "ltr" ? "Something went Wrong" : "هناك خطأ ما",
          icon: "error",
        });
      });
  };

  const en = () => {
    return (
      <div>
        <br />
        <p>
          Case Number:
          <b>
            {" "}
            {`ARB${props.location.state.createdAt.split("-")[0]}-${pad(
              props.location.state.caseNumber
            )} `}
          </b>
        </p>
        <p>
          {props.location.state.claimantName}
          <br />
          VS
          <br />
          {props.location.state.respondentName}
        </p>
        <p style={{ textAlign: "center" }}>
          <h6>
            <b>Subject: Rejection to the Request for Arbitration (RFA)</b>
          </h6>
        </p>
        <p>Dear {props.location.state.claimantName},</p>
        <p>
          Greetings from the International Islamic Centre for Reconciliation and
          Arbitration (IICRA).
        </p>
        <p>
          This letter is addressed to you in response to your Request for
          Arbitration (RFA) submitted on{" "}
          {props.location.state.createdAt.split("T")[0]}. As per the assessment
          conducted by the IICRA Executive Committee, we hereby regret to inform
          you that your RFA has been rejected due to the following legal
          ground(s).
        </p>
        <p>
          <Input
            type="textarea"
            name="reason"
            rows="5"
            cols="50"
            onChange={handleText}
            value={state.reason}
          />
        </p>
        <p>
          <i>
            Please do not hesitate to contact IICRA, should you require any
            further clarification.
          </i>
        </p>

        <h6>
          <br />
          <b>
            Sincerely,
            <br />
            <br />
            Signature &amp; Stamp <br />
            Rami Sulaiman <br />
            Chief Executive Officer <br />
            International Islamic Centre for Reconciliation &amp; Arbitration{" "}
            <br />
          </b>
        </h6>
      </div>
    );
  };

  const ar = () => {
    return (
      <div style={{ fontSize: "16px" }}>
        {" "}
        <br />
        <p style={{ textAlign: "right" }}>
          رقم الدعوى التحكيمية :
          <b>
            {" "}
            {`ARB${props.location.state.createdAt.split("-")[0]}-${pad(
              props.location.state.caseNumber
            )} `}
          </b>
        </p>
        <p style={{ textAlign: "right" }}>
          (المحتكم ): {props.location.state.claimantName}
          <br />
          ضد
          <br />
          (المحتكم ضده) : {props.location.state.respondentName}
        </p>
        <p style={{ textAlign: "center" }}>
          <h6>
            <b>نموذج رفض طلب التحكيم </b>
          </h6>
        </p>
        <p style={{ textAlign: "right" }}>
          عزيزي المحتكم ضده، {props.location.state.claimantName},
        </p>
        <p style={{ textAlign: "right" }}>
          يهديكم المركز الإسلامي للمصالحة والتحكيم أطيب التحية،
        </p>
        <p style={{ textAlign: "right" }}>
          هذه الرسالة موجهة إليكم ردًا على طلب التحكيم المقدم من جانبكم فيn{" "}
          {props.location.state.createdAt.split("T")[0]}. وفقًا للتقييم
          والمراجعة الذي قامت بأجرته اللجنة التنفيذية لدى المركز، نأسف لإبلاغكم
          أنه قد تم رفض طلب التحكيم بسبب الأسس القانونية المذكورة أدناه:
        </p>
        <p style={{ textAlign: "right" }}>
          <Input
            type="textarea"
            name="reason"
            rows="5"
            cols="50"
            onChange={handleText}
            value={state.reason}
          />
        </p>
        <p style={{ textAlign: "right" }}>
          <i>للمزيد من الاستفسارات والتوضيحات، يرجى التواصل معنا مباشرة.</i>
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

  return (
    <>
      <Header
        data={props.location.state}
        stepName={document.dir == "ltr" ? "RFA" : "طلب التحكيم"}
        stepPathPrev="rfa"
        stepPath="rfa"
        name={document.dir == "ltr" ? "Rejected" : "مرفوض"}
      />
      <Container style={styles.formUserContainer} className="shadow-lg">
        <h6 style={styles.center}>
          {document.dir == "ltr" ? "Rejection of RFA" : "رفض طلب التحكيم"}
        </h6>

        <Card style={styles.cardBg}>
          <CardHeader style={styles.letterContainer}>
            <img style={styles.header} src={header} alt="header" />
          </CardHeader>
          <CardBody>
            {document.dir == "ltr" ? en() : ar()}{" "}
            <Button onClick={() => handleSend(props.location.state)}>
              {document.dir == "ltr" ? "Send" : "إرسال"}
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
export default Regection;
