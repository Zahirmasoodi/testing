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

const CorrectedAward = (props) => {
  const baseURL = getEnvironment().apiUrl;
  const [state, setState] = useState({
    allCases: [],
    agreement: "",
    agreementDate: "",
    resEmail: "",
    claEmail: "",
    notes: "",
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSend = (data) => {
    const formData = new FormData();
    formData.append("respondentEmail", data.respondentEmail);
    formData.append("respondentName", data.respondentName);
    formData.append("respondentName2", data.respondentName2);
    formData.append("respondentAddress", data.respondentAddress);
    formData.append("respondentPhone", data.respondentPhone);
    formData.append("claimantEmail", data.claimantEmail);
    formData.append("claimantName", data.claimantName);
    formData.append("createdAt", data.createdAt);
    formData.append("natureOfDispute", data.natureOfDispute);
    formData.append("arbitratorName", data.arbitratorName);
    formData.append("reliefSought", data.reliefSought);
    formData.append("caseNumber", data.caseNumber);
    formData.append("autoPdf", data.autoPdf);
    formData.append("agreement", state.agreement);
    formData.append("agreementDate", state.agreementDate);
    formData.append("language", document.dir == "ltr" ? "ltr" : "rtl");

    axios
      .post(`${baseURL}/email/noticeOfRFAToRespondent`, formData)
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
          Name : {props.location.state.respondentName}
          <br />
          Address : {props.location.state.respondentAddress}
          <br />
          Contact Number : {props.location.state.respondentPhone}
        </p>
        <br />
        <p style={{ textAlign: "center" }}>
          Claimant : {props.location.state.claimantName}
          <br />
          vs
          <br />
          Respondent : {props.location.state.respondentName},
          {props.location.state.respondentName2 != ""
            ? `, ${props.location.state.respondentName2}`
            : null}
        </p>
        <br />
        <p style={{ textAlign: "center" }}>
          <b>Subject</b> : Notice of Arbitration
        </p>
        <br />
        <p>Allah, Peace, Mercy and Blessing upon you</p>
        <br />
        <h5>Dear Respondent,</h5>
        <br />
        <p>
          Warm Greetings from the International Islamic Centre for
          Reconciliation and Arbitration (IICRA).
        </p>

        <p>
          We would like to inform you that the Claimant has filed against you a
          Request for Arbitration (RFA) at IICRA dated{" "}
          <b>{props.location.state.createdAt.split("T")[0]}</b> in order
          adjudicate the dispute arising out of the{" "}
          <Input
            type="text"
            name="agreement"
            id="agreement"
            value={state.agreement}
            onChange={handleChange}
          />{" "}
          entered into dated{" "}
          <Input
            type="date"
            name="agreementDate"
            id="agreementDate"
            value={state.agreementDate}
            onChange={handleChange}
          />{" "}
          and Pursuant to Article 10 of IICRA Arbitration Rules, please find
          herewith a copy of RFA along with its necessary attachments.
        </p>
        <p>
          Further, IICRA filed the RFA under Case Number ARB
          {props.location.state.createdAt.split("-")[0]}-
          {pad(props.location.state.caseNumber)} and as per the RFA, the relief
          sought by the Claimant are as follows:
        </p>
        <p>{props.location.state.reliefSought}</p>
        <br />
        <p>
          Pursuant Article 11 of IICRA Rules, you are hereby requested to
          respond to the RFA within Twenty (20) Days from the receipt of this
          notification and your response must include your reply to RFA,
          Counter-Claim (if any) along with supporting documents, your
          Nomination or Objection of Sole Arbitrator/Co-Arbitrator and feedback
          regarding the language and seat of Arbitration, jurisdiction etc. in
          the arbitration proceedings.
        </p>
        <br />
        <p>
          We thank you in advance for respecting IICRA Rules and deadlines for
          Arbitral proceedings. Hence, we are earnestly looking forward to
          hearing from you.
        </p>

        <br />
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
        <br />
      </>
    );
  };

  const ar = () => {
    return (
      <div style={{ fontSize: "16px" }}>
        <div style={{ textAlign: "right" }}>
          إسم المحتكم ضده : {props.location.state.respondentName}
          <br />
          العنوان الكامل : {props.location.state.respondentAddress}
          <br />
          رقم الهاتف : {props.location.state.respondentPhone}
        </div>
        <br />
        <div style={{ textAlign: "center" }}>
          المحتكم ({props.location.state.claimantName})<br />
          ضد
          <br />
          المحتكم ضده ({props.location.state.respondentName},{" "}
          {props.location.state.respondentName2 != "" &&
            props.location.state.respondentName2}
          ){" "}
        </div>

        <p style={{ textAlign: "right" }}>السلام عليكم ورحمة الله وبركاته</p>
        <br />
        <p style={{ textAlign: "center" }}>
          <b>الموضوع</b> : تبليغ المحتكم ضده بطلب التحكيم
        </p>
        <br />
        <h5 style={{ textAlign: "right" }}>عناية المحتكم ضده </h5>
        <br />
        <p style={{ textAlign: "right" }}>
          يهديكم المركز الإسلامي الدولي للصلح والتحكيم (المركز) أطيب التحية، و
          نود إفادتكم علمًا بأن المحتكم قد تقدم طلب التحكيم بتاريخ _______
          لتسوية النزاع الذي ينشأ عن (الاتفاقية) الموقعة بين الأطراف بتاريخ{" "}
          <b>{props.location.state.createdAt.split("T")[0]}</b> ووفقًا للمادة من
          قواعد المركز. مرفق لكم نسخة من طلب التحكيم ومرفقاته.
          <Input
            type="text"
            name="agreement"
            id="agreement"
            value={state.agreement}
            onChange={handleChange}
          />{" "}
          <Input
            type="date"
            name="agreementDate"
            id="agreementDate"
            value={state.agreementDate}
            onChange={handleChange}
          />{" "}
          وفقًا للمادة (١٠) من قواعد المركز. يرجى العثور على نسخة الطلب مع
          مرفقاته.
        </p>
        <br />
        <p style={{ textAlign: "right" }}>
          وعليه، تم قيد الدعوى التحكيمية لدى المركز تحت رقم
          {props.location.state.createdAt.split("-")[0]}
          {pad(props.location.state.caseNumber)}
        </p>
        <br />
        <p style={{ textAlign: "right" }}>
          وإضافة إلى ذلك وفقًا لطلب التحكيم، يطلب المحتكم الطلبات التالية:{" "}
        </p>
        <p style={{ textAlign: "right" }}>
          {props.location.state.reliefSought}
        </p>
        <br />
        <p style={{ textAlign: "right" }}>
          وعطفًا للمادة 11رقم من قواعدالتحكيم لدى المركز ، يرجى منكم تزويدنا
          بردكم على الطلب في غضون عشرين (20) يومًا من استلام هذا الخطاب، ويجب أن
          يتضمن ردكم على طلب التحكيم والدعوى المتقابلة (إن وجدت ) مع المستندات
          الخاصة بكم، وترشيحكم أو اعتراضكم للمحكم الفرد، وأي ملاحظات لديكم بخصوص
          اللغة، ومكان التحكيم، والاختصاص القضائي وغيرها في سير إجراءات التحكيم.
        </p>
        <br />
        <p style={{ textAlign: "right" }}>
          نشكركم على احترام قواعد المركز والآجال التنظيمية لسير إجراءات التحكيم.
          ولذا، نأمل أن نلتقي ردكم السريع في أقرب فرصة منكم.
        </p>

        <br />
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
        <br />
      </div>
    );
  };

  return (
    <>
      <Header
        data={props.location.state}
        stepName="Issuance of Final Award"
        stepPathPrev="issuance"
        stepPath="award"
        name="Correction of the Final Award"
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
export default CorrectedAward;
