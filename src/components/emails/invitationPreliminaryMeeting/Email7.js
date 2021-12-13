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
import pad from "../../../pad";

const Email7 = (props) => {
  const baseURL = getEnvironment().apiUrl;

  const [state, setState] = useState({
    date: "",
    time: "",
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
    formData.append("caseNumber", data.caseNumber);
    formData.append("createdAt", data.createdAt);
    formData.append("language", document.dir == "ltr" ? "ltr" : "rtl");
    formData.append("date", state.date);
    formData.append("time", state.time);
    formData.append("meetingLink", state.meetingLink);

    axios
      .post(`${baseURL}/email/remindPreliminaryMeeting`, formData)
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

  const en = () => {
    return (
      <section>
        <p>
          Case Number :{" "}
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
          <b>Subject: Reminder to Attend the Preliminary Meeting</b>
        </p>
        <p>Allah, Peace, Mercy and Blessing upon you;</p>

        <p>
          <b>In Attention to the Parties, </b>
        </p>

        <p>
          With reference to the aforementioned subject, and pursuant to the
          invitation letter directed to you to attend the preliminary meeting in
          the present arbitration case, we would like to remind you to attend
          the preliminary meeting in the present arbitration case on{" "}
          <Input
            type="date"
            name="date"
            value={state.date}
            onChange={handleText}
          />
          at{" "}
          <Input
            type="time"
            name="time"
            value={state.time}
            onChange={handleText}
          />{" "}
          Dubai time via the link provided below.
          <br />
          Meeting Link:{" "}
          <Input
            type="text"
            name="meetingLink"
            value={state.meetingLink}
            onChange={handleText}
          />
        </p>
        <p>
          We also would like to remind the parties to present their identities,
          the documents that authorize them to attend the meeting, and any other
          documents they would like to produce in the case.
        </p>
        <p>We thank you in advance for your attendance.</p>

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
          رقم الدعوى التحكيمية :{" "}
          {`ARB${props.location.state.createdAt.split("-")[0]}-${pad(
            props.location.state.caseNumber
          )} `}
        </p>

        <p>
          {props.location.state.claimantName}
          <br />
          ضد
          <br />
          {props.location.state.respondentName}
        </p>
        <p>
          <b>موضوع: تذكير بحضور الاجتماع التمهيدي</b>
        </p>
        <p>السلام عليكم ورحمة الله وبركاته:</p>
        <p>
          <b>السادة/ الأطراف............................... الأفاضل،</b>
        </p>

        <p>
          بالإشارة إلى الموضوع أعلاه، وعطفًا على خطاب الدعوة المرسل لكم لحضور
          الاجتماع التمهيدي في الدعوى التحكيمية الماثلة، نود تذكيركم بضرورة حضور
          الاجتماع التمهيدي في الدعوى التحكيمية الماثلة عبر الرابط المبين أدناه
          وذلك بتاريخ
          <Input
            type="date"
            name="date"
            value={state.date}
            onChange={handleText}
          />
          على الساعة
          <Input
            type="time"
            name="time"
            value={state.time}
            onChange={handleText}
          />{" "}
          <br />
          صباحًا ومساءً بتوقيت دبي. لذا ندرج طيه الرابط الخاص بالاجتماع التمهيدي
          <Input
            type="text"
            name="meetingLink"
            value={state.meetingLink}
            onChange={handleText}
          />{" "}
        </p>
        <p>
          كما نذكر الحضور بضرورة إبراز هوياتهم، والمستندات التي تخولهم حضور
          الاجتماع، وأي مستندات أخرى يودون إيداعها في ملف الدعوى التحكيمية.
        </p>
        <p>شاكرين لكم مقدمًا حضوركم.</p>
        <h6>
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
        name="Sole Arbitrator Rejected the Request to Reschedule the Preliminary Meeting - Claimant"
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
export default Email7;
