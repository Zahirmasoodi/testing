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

const Email31 = (props) => {
  const baseURL = getEnvironment().apiUrl;

  const [state, setState] = useState({
    meetingLink: "",
    time: "",
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
    formData.append("meetingLink", state.meetingLink);
    formData.append("time", state.time);
    formData.append("date", state.date);

    formData.append("caseNumber", data.caseNumber);
    formData.append("createdAt", data.createdAt);
    formData.append("language", document.dir == "ltr" ? "ltr" : "rtl");

    axios
      .post(`${baseURL}/email/reminderForHearing`, formData)
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
          Case Number{" "}
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
          <b>Subject: Reminder to Attend the Hearing</b>
        </p>
        <p>Allah, Peace, Mercy and Blessing upon you;</p>
        <p>
          <b>In Attention to the Parties,</b>
        </p>
        <br />
        <p>
          With reference to the aforementioned subject, and pursuant to the
          invitation letter directed to you to attend the Hearing in the present
          arbitration case, we would like to remind you to attend the Hearing in
          the present arbitration case on{" "}
          <Input
            type="date"
            name="date"
            value={state.date}
            onChange={handleText}
          />{" "}
          at{" "}
          <Input
            type="time"
            name="time"
            value={state.time}
            onChange={handleText}
          />{" "}
          Dubai time via the link provided below.
          <br />
          <Input
            type="text"
            name="meetingLink"
            value={state.meetingLink}
            onChange={handleText}
          />{" "}
        </p>
        <p>
          Please note that the arbitral tribunal may ask the parties in the
          beginning of the session to present their identities and documents
          authorizing them to attend the Hearing.
        </p>
        <p>We thank you in advance for your attendance. </p>
        <h6>
          <b>
            Kind Regards, <br /> <br />
            Arbitral Tribunal Secretary, <br />
            International Islamic Centre for Reconciliation and Arbitration{" "}
          </b>
        </h6>
      </section>
    );
  };

  const ar = () => {
    return (
      <section style={{ textAlign: "right" }}>
        <p>
          Case Number{" "}
          {`ARB${props.location.state.createdAt.split("-")[0]}-${pad(
            props.location.state.caseNumber
          )} `}{" "}
        </p>

        <p className="text-center">
          {props.location.state.claimantName}
          <br />
          ضد
          <br />
          {props.location.state.respondentName}
        </p>
        <p className="text-center">
          <b>موضوع: تذكير بحضور جلسة التحكيم</b>
        </p>
        <p>السلام عليكم ورحمة الله وبركاته:</p>
        <p>
          <b>السادة/ الأطراف............................... الأفاضل، </b>
        </p>

        <p>
          بالإشارة إلى الموضوع أعلاه، وعطفًا على خطاب الدعوة المرسل لكم لحضور
          جلسة التحكيم في الدعوى التحكيمية الماثلة، نود تذكيركم بضرورة حضور جلسة
          التحكيم في الدعوى التحكيمية الماثلة عبر الرابط المبين أدناه وذلك
          بتاريخ
          <Input
            type="date"
            name="date"
            value={state.date}
            onChange={handleText}
          />{" "}
          على الساعة{" "}
          <Input
            type="time"
            name="time"
            value={state.time}
            onChange={handleText}
          />{" "}
          وعليه، ندرج طيه الرابط الخاص بجلسة التحكيم:
          <br />
          <Input
            type="text"
            name="meetingLink"
            value={state.meetingLink}
            onChange={handleText}
          />{" "}
        </p>
        <p>
          علمًا بأن هيئة التحكيم في مستهل جلسة التحكيم سوف تطلب من الحضور إبراز
          هوياتهم والمستندات التي تخولهم حضور جلسة التحكيم.
        </p>
        <p>شاكرين لكم مقدمًا حضوركم.</p>
        <h6>
          <b>
            وتفضلوا بقبول فائق التقدير والاحترام <br /> <br />
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
        name="Sole Arbitrator Requesting to Summon an Expert"
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
export default Email31;
