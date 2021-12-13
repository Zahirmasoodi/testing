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
import pad from "../../../pad";

const Email48 = (props) => {
  const baseURL = getEnvironment().apiUrl;

  const [state, setState] = useState({
    time: "",
    oldDate: "",
    letterDate: "",
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
    formData.append("meetingLink", state.meetingLink);
    formData.append("oldDate", state.oldDate);
    formData.append("newDate", state.newDate);
    formData.append("letterDate", state.letterDate);
    formData.append("time", state.time);
    formData.append("caseNumber", data.caseNumber);
    formData.append("createdAt", data.createdAt);
    formData.append("language", document.dir == "ltr" ? "ltr" : "rtl");

    axios
      .post(`${baseURL}/email/tribunalRejectedRescheduleHearing`, formData)
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
          <b>Subject: Rejection to Reschedule the Hearing</b>
        </p>

        <p>Allah, Peace, Mercy and Blessing upon you;</p>

        <p>
          <b>In Attention to Claimant/Respondent, </b>
        </p>

        <p>
          With reference to your letter dated{" "}
          <Input
            type="date"
            name="letterDate"
            value={state.letterDate}
            onChange={handleText}
          />{" "}
          regarding the postponement of the Hearing to be held on{" "}
          <Input
            type="date"
            name="oldDate"
            value={state.oldDate}
            onChange={handleText}
          />
          , we would like to inform you that the Arbitral Tribunal has rejected
          the request due to the absence of valid reasons provided to justify
          the postponement, in order to achieve justice within the specified
          timeframes.
        </p>
        <p>
          Accordingly, you are kindly requested to attend the Hearing on the
          date fixed by the reputed Tribunal as indicated above, and please find
          the link of the Hearing below.
          <br />
          Meeting Link :
          <Input
            type="text"
            name="meetingLink"
            value={state.meetingLink}
            onChange={handleText}
          />
        </p>
        <p>
          Please note that the arbitral tribunal may ask the parties in the
          beginning of the session to present their identities and documents
          authorizing them to attend the Hearing.
        </p>
        <p>We thank you in advance for your attendance.</p>
        <h6>
          <b>
            Kind Regards, <br /> <br />
            Arbitral Tribunal Secretary,
            <br />
            International Islamic Centre for Reconciliation and Arbitration
          </b>
        </h6>
      </section>
    );
  };

  const ar = () => {
    return (
      <section style={{ textAlign: "right" }}>
        <p>
          رقم الدعوى التحكيمية :
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
          <b>موضوع: رفض طلب تأجيل جلسة التحكيم</b>
        </p>

        <p> السلام عليكم ورحمة الله وبركاته:</p>

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
          />{" "}
          المتضمن طلب موعد عقد جلسة التحكيم المزمع عقدها بتاريخ
          <Input
            type="date"
            name="oldDate"
            value={state.oldDate}
            onChange={handleText}
          />
          نود إفادتكم علمًا بأن هيئة التحكيم قررت رفض طلبكم لعدم جدية أسباب
          التأجيل المقدمة، وحرصًا منها على تحقيق العدالة ضمن الآجال الزمنية
          المحددة.
        </p>
        <p>
          وعليه، يرجى منكم حضور جلسة التحكيم في الموعد المحدد من قبل هيئة
          التحكيم سابقًا كما هو مبين أعلاه، ندرج طيه مجددًا الرابط الخاص
          بالجلسة.
          <br />
          <Input
            type="text"
            name="meetingLink"
            value={state.meetingLink}
            onChange={handleText}
          />
        </p>
        <p>
          علمًا بأن هيئة التحكيم في مستهل جلسة التحكيم سوف تطلب من الحضور إبراز
          هوياتهم والمستندات التي تخولكم حضور جلسة التحكيم.
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
        name="Arbitral Tribunal Rejected the Request to Reschedule the Arbitration Hearing - Respondent"
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
export default Email48;
