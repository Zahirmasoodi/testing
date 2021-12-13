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
import Header from "../containers/Header";
import { getEnvironment } from "../../../config";
import Swal from "sweetalert2";

const Confirmation = (props) => {
  const baseURL = getEnvironment().apiUrl;

  const [state, setState] = useState({
    allCases: [],
    conciliatorName: "",
    date: "",
  });

  const handleText = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSend = (data) => {
    const formData = new FormData();
    formData.append("respondentName", data.respondentName);
    formData.append("claimantEmail", data.claimantEmail);
    formData.append("claimantName", data.claimantName);
    formData.append("createdAt", data.createdAt);
    formData.append("caseNumberRec", data.caseNumberRec);
    formData.append("conciliatorName", state.conciliatorName);
    formData.append("date", state.date);
    formData.append("language", document.dir == "ltr" ? "ltr" : "rtl");

    axios
      .post(`${baseURL}/emailReconciliation/appointConciliator`, formData)
      .then(() => {
        Swal.fire({
          title: "SENT",
          icon: "success",
        });
        props.history.push({
          pathname: "/email_/nominateArb_",
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
        <p>Case Number : {props.location.state.caseNumber}</p>
        <p>{props.location.state.claimantName}</p>
        <p>vs</p>
        <p>{props.location.state.respondentName}</p>
        <p>
          <b>Subject: Appointment of Conciliator</b>
        </p>
        <p>Allah, Peace, Mercy and Blessing upon you.</p>

        <p>
          Warm Greetings from the International Islamic Centre for
          Reconciliation and Arbitration (IICRA).
        </p>

        <p>Attention to the Parties,</p>
        <p>
          Referring to the letter addressed to you dated{" "}
          <Input
            type="date"
            name="date"
            value={state.date}
            onChange={handleText}
          />{" "}
          regarding the appointment of Conciliator{" "}
          <Input
            type="text"
            name="conciliatorName"
            value={state.conciliatorName}
            onChange={handleText}
          />{" "}
          Since IICRA did not receive any objection to his/her nomination within
          the regulatory deadlines specified in Article (9) of IICRA
          Reconciliation Rules, we would like to inform you accordingly that
          IICRA hereby confirms the appointment of {state.conciliatorName} to
          act as a Conciliator in order to discuss the means of amicable
          settlement.
        </p>
        <p>
          Further, pursuant to the Provisions of Article (8) of IICRA
          Reconciliation Rules, the appointed Conciliator shall sign the Mission
          Contract.
        </p>

        <p>
          We thank you in advance for your cooperation and respecting regulatory
          deadline.
        </p>
        <h6>
          <b>
            Sincerely,
            <br />
            Signature &amp; Stamp <br />
            Rami Sulaiman <br />
            Chief Executive Officer <br />
            International Islamic Centre for Reconciliation &amp; Arbitration{" "}
          </b>
        </h6>
      </>
    );
  };

  const ar = () => {
    return (
      <>
        <p style={{ textAlign: "right" }}>
          رقم الدعوى التحكيمية : {props.location.state.caseNumber}
        </p>
        <p style={{ textAlign: "center" }}>
          {props.location.state.claimantName}
        </p>
        <p style={{ textAlign: "center" }}>ضد</p>
        <p style={{ textAlign: "center" }}>
          {props.location.state.respondentName}
        </p>
        <p style={{ textAlign: "center" }}>
          <b>الموضوع: تعيين المصالح</b>
        </p>
        <p style={{ textAlign: "right" }}>السلام عليكم ورحمة الله وبركاته:</p>
        <p>عناية السادة/ الأطراف،،،،،،،،،،،،،،،،،،الأفاضل</p>
        <p style={{ textAlign: "right" }}>
          يهديكم المركز الإسلامي الدولي للصلح والتحكيم (المركز) أطيب التحية،
        </p>
        <p style={{ textAlign: "right" }}>
          بالإشارة إلى الخطاب الموجهة لكم بتاريخ
          <Input
            type="date"
            name="date"
            value={state.date}
            onChange={handleText}
          />{" "}
          بشأن ترشيح (تسمية) المصالح
          <Input
            type="text"
            name="conciliatorName"
            value={state.conciliatorName}
            onChange={handleText}
          />{" "}
          وحيث لم يرد للمركز أي اعتراض على تسميته ضمن الآجال التنظيمية المحددة
          في المادة ) 9) من قواعد الصلح المعتمدة لدى المركز، وعليه، نود إفادتكم
          بموجب هذا الإشعار بأن المركز قد قرر تعيينه للتصرف كمصالح لبحث سبل
          التسوية الودية، على أن يتم توقيع عقد المهمة معه عملًا بأحكام المادة
          رقم (8) من قواعد الصلح لدى المركز.
        </p>
        <p style={{ textAlign: "right" }}>
          شاكرين لكم مقدما تعاونكم واحترام الآجال التنظيمية.
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
      </>
    );
  };

  return (
    <>
      <Header
        data={props.location.state}
        stepName="RFA"
        stepPathPrev="rfa"
        stepPath="rfa"
        name="Approved"
      />
      <Container style={styles.formUserContainer} className="shadow-lg">
        <h6 style={styles.center}>Appointment of the Conciliator</h6>

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
export default Confirmation;
