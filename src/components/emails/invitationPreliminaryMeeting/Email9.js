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

const Email9 = (props) => {
  const baseURL = getEnvironment().apiUrl;

  const [state, setState] = useState({
    meetingLink: "",
    letterDate: "",
    pastDate: "",
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
    formData.append("letterDate", state.letterDate);
    formData.append("pastDate", state.pastDate);
    formData.append("meetingLink", state.meetingLink);

    axios
      .post(`${baseURL}/email/rejectionPreliminaryMeetingClaimant`, formData)
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

        <p style={{ textAlign: "center" }}>
          {props.location.state.claimantName}
          <br />
          vs
          <br />
          {props.location.state.respondentName}
        </p>
        <p style={{ textAlign: "center" }}>
          <b>Subject: Rejection to Reschedule the Preliminary Meeting</b>
        </p>

        <p>Allah, Peace, Mercy and Blessing upon you;</p>

        <p>
          <b>In Attention to Claimant/Respondent,</b>
        </p>

        <p>
          With reference to your letter dated{" "}
          <Input
            type="date"
            name="letterDate"
            value={state.letterDate}
            onChange={handleText}
          />{" "}
          regarding the postponement of preliminary meeting to be held on
          <Input
            type="date"
            name="pastDate"
            value={state.pastDate}
            onChange={handleText}
          />
          , we would like to inform you that the arbitral tribunal has rejected
          the request due to the absence of serious reasons provided to justify
          the postponement, in order to achieve justice within the specified
          timeframes.
        </p>

        <p>
          Accordingly, you are kindly requested to attend the meeting on the
          date fixed by the reputed Tribunal as indicated above, and please find
          the link below.
          <br />
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
      <section style={{ textAlign: "right" }}>
        <p>
          رقم الدعوى التحكيمية :{" "}
          {`ARB${props.location.state.createdAt.split("-")[0]}-${pad(
            props.location.state.caseNumber
          )} `}
        </p>
        <p style={{ textAlign: "center" }}>
          {props.location.state.claimantName}
          <br />
          ضد
          <br />
          {props.location.state.respondentName}
        </p>
        <p style={{ textAlign: "center" }}>
          <b>موضوع: رفض طلب تأجيل الاجتماع التمهيدي</b>
        </p>
        <p>السلام عليكم ورحمة الله وبركاته:</p>
        <p>
          <b>السادة/ المحتكم/ المحتكم ضده...............الموقر،</b>
        </p>

        <p>
          عطفًا على خطابكم المرسل المؤرخ في
          <Input
            type="date"
            name="letterDate"
            value={state.letterDate}
            onChange={handleText}
          />
          بشأن تأجيل موعد عقد الاجتماع التمهيدي المزمع عقده بتاريخ
          <Input
            type="date"
            name="pastDate"
            value={state.pastDate}
            onChange={handleText}
          />
          نود إفادتكم علمًا بأن هيئة التحكيم قد رفضت طلبكم لعدم جدية أسباب
          التأجيل المقدمة، وحرصًا منها على تحقيق العدالة ضمن الآجال الزمنية
          المحددة.
        </p>
        <p>
          وعليه، يرجى منكم حضور الاجتماع في الموعد المحدد من قبل هيئة التحكيم
          سابقًا كما هو مبين أعلاه، ندرج طيه مجددًا الرابط الخاص بالاجتماع
          التمهيدي.
          <br />
          <Input
            type="text"
            name="meetingLink"
            value={state.meetingLink}
            onChange={handleText}
          />
        </p>
        <p>
          كما نذكر الحضور بضرورة إبراز هوياتهم، والمستندات التي تخولهم حضور
          الاجتماع، وأي مستندات أخرى يودون إيداعها في ملف الدعوى التحكيمية.
        </p>
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
        name="Arbitral Tribunal Rejected the Request to Reschedule the Preliminary Meeting - Claimant"
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
export default Email9;
