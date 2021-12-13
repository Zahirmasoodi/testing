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

const Email43 = (props) => {
  const baseURL = getEnvironment().apiUrl;

  const [state, setState] = useState({});

  const handleText = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSend = (data) => {
    const formData = new FormData();
    formData.append("respondentEmail", data.respondentEmail);
    formData.append("respondentName", data.respondentName);
    formData.append("claimantEmail", data.claimantEmail);
    formData.append("claimantName", data.claimantName);
    formData.append("createdAt", data.createdAt);
    formData.append("caseNumber", data.caseNumber);
    formData.append("letterDate", state.letterDate);
    formData.append("meetingDate", state.meetingDate);
    formData.append("meetingLink", state.meetingLink);
    formData.append("time", state.time);
    formData.append("language", document.dir == "ltr" ? "ltr" : "rtl");

    axios
      .post(`${baseURL}/email/tribunalAcceptsWitness`, formData)
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

  const en = () => {
    return (
      <section>
        <p>
          Case Number :
          {`ARB${props.location.state.createdAt.split("-")[0]}-${pad(
            props.location.state.caseNumber
          )} `}{" "}
        </p>

        <p className="text-center">
          {props.location.state.claimantName}
          <br />
          vs
          <br />
          {props.location.state.respondentName}
        </p>
        <p className="text-center">
          <b>Subject: Confirmation of Request for Summon</b>
        </p>
        <p>Allah, Peace, Mercy and Blessing upon you;</p>

        <p>
          <b>In Attention to the Claimant /Respondent,</b>
        </p>

        <p>
          With reference to your letter dated
          <Input
            type="date"
            name="letterDate"
            value={state.letterDate}
            onChange={handleText}
          />
          regarding the request to accept the Request for summoning the Witness,
          we would like to inform that the Arbitral Tribunal has accepted your
          request to hear the witness in the Hearing based on the reasons
          provided.
        </p>
        <p>
          Accordingly, the Hearing in the present arbitration case to hear the
          witness is scheduled on{" "}
          <Input
            type="date"
            name="meetingDate"
            value={state.meetingDate}
            onChange={handleText}
          />
          at
          <Input
            type="time"
            name="time"
            value={state.time}
            onChange={handleText}
          />
        </p>
        <p>
          Please find the below link to attend the Hearing
          <Input
            type="text"
            name="meetingLink"
            value={state.meetingLink}
            onChange={handleText}
          />
        </p>
        <p>We thank you in advance for your attendance.</p>
        <h6>
          <b>
            Kind Regards,
            <br /> <br />
            Arbitral Tribunal Secretary,
            <br />
            International Islamic Centre for Reconciliation & Arbitration
            (IICRA)
          </b>
        </h6>
      </section>
    );
  };

  const ar = () => {
    return (
      <section className="text-right">
        <p>
          رقم الدعوى التحكيمية :
          {`ARB${props.location.state.createdAt.split("-")[0]}-${pad(
            props.location.state.caseNumber
          )} `}
        </p>

        <p className="text-center">
          {props.location.state.claimantName}
          <br />
          ضد
          <br />
          {props.location.state.respondentName}
        </p>

        <p className="text-center">
          <b>موضوع: الموافقة على استدعاء واستجواب الشاهد</b>
        </p>
        <p>السلام عليكم ورحمة الله وبركاته:</p>

        <p>
          <b>السادة/ المحتكم/ المحتكم ضده...............الموقر</b>
        </p>

        <p>
          عطفًا على خطابكم المرسل المؤرخ في
          <Input
            type="date"
            name="date"
            value={state.date}
            onChange={handleText}
          />
          بشأن الموافقة على استدعاء واستجواب الشاهد ، نود الإفادة بأن هيئة
          التحكيم قد وافقت على استجواب الشاهد بناءً على ما قدمتم من أسباب،
        </p>
        <p>
          وعليه، تم الموافقة على استدعاء الشاهد للحضور في تاريخ
          <Input
            type="date"
            name="meetingDate"
            value={state.meetingDate}
            onChange={handleText}
          />
          على الساعة
          <Input
            type="time"
            name="time"
            value={state.time}
            onChange={handleText}
          />
          لاستجوابه
        </p>
        <p>
          لذا ندرج طيه الرابط الخاص بالجلسة.
          <Input
            type="text"
            name="meetingLink"
            value={state.meetingLink}
            onChange={handleText}
          />
        </p>
        <p>شاكرين لكم مقدمًا حضوركم</p>
        <h6>
          <b>
            وتفضلوا بقبول فائق التقدير والاحترام
            <br /> <br />
            مقدمه/أمين السر
            <br />
            المركز الإسلامي الدولي للصلح والتحكيم
          </b>
        </h6>
      </section>
    );
  };

  return (
    <>
      <Header
        data={props.location.state}
        stepName="Invitation for Hearing"
        stepPathPrev="prehearing"
        stepPath="inviteHearing"
        name="Sole Arbitrator Requesting to Summon the Certified Interpretor"
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
export default Email43;
