import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Container,
  Input,
  CustomInput,
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
    conciliatorCV: "",
    date: "",
  });

  const handleText = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    console.log(e.target);
    setState({ ...state, conciliatorCV: e.target.files[0] });
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
    formData.append("conciliatorCV", state.conciliatorCV);

    formData.append("language", document.dir == "ltr" ? "ltr" : "rtl");

    axios
      .post(`${baseURL}/emailReconciliation/requestConciliator`, formData)
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
        <p>Case Number : {props.location.state.caseNumberRec}</p>
        <p>{props.location.state.claimantName}</p>
        <p>vs</p>
        <p>{props.location.state.respondentName}</p>
        <p>
          <b>Subject: Request for Nomination of Conciliator</b>
        </p>
        <p>Allah, Peace, Mercy and Blessing upon you.</p>
        <p>
          Warm Greetings from the International Islamic Centre for
          Reconciliation and Arbitration (IICRA).
        </p>

        <p>Attention to the Parties,</p>
        <p>
          Based on the Request for Reconciliation initiated dated{" "}
          {props.location.state.createdAt.split("T")[0]}
          and the request to appoint a conciliator submitted by the Applicant,
          IICRA hereby nominates
          <Input
            type="text"
            name="conciliatorName"
            value={state.conciliatorName}
            onChange={handleText}
          />
          to act as a Conciliator between the parties in order to reach an
          amicable settlement. Please refer to the attached Curriculum Vita{" "}
          <CustomInput
            style={{
              overflow: "hidden",
              backgroundColor: "white",
              border: "none",
            }}
            type="file"
            label="Upload a File"
            onChange={handleFile}
          />
          of the nominated Conciliator for your kind perusal.
        </p>
        <p>
          Pursuant to the Reconciliation Rules, specifically Article (9), the
          Parties hereby duly informed to submit their objection or confirmation
          of non-objection to the aforementioned proposed nomination within five
          (5) days.
        </p>
        <p>
          Further, pursuant to the Provisions of Article (8) of IICRA
          Reconciliation Rules, the appointed Conciliator shall sign the Mission
          Contract.
        </p>

        <p>Thank you for respecting the regulatory deadlines.</p>
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
          رقم الدعوى التحكيمية : {props.location.state.caseNumberRec}
        </p>
        <p style={{ textAlign: "center" }}>
          {props.location.state.claimantName}
        </p>
        <p style={{ textAlign: "center" }}>ضد</p>
        <p style={{ textAlign: "center" }}>
          {props.location.state.respondentName}
        </p>
        <p style={{ textAlign: "center" }}>
          <b>الموضوع: ترشيح المصالح</b>
        </p>
        <p style={{ textAlign: "right" }}>السلام عليكم ورحمة الله وبركاته:</p>
        <p>عناية السادة/ الأطراف،،،،،،،،،،،،،،،،،،الأفاضل</p>
        <p style={{ textAlign: "right" }}>
          يهديكم المركز الإسلامي الدولي للصلح والتحكيم (المركز) أطيب التحية،
        </p>
        <p style={{ textAlign: "right" }}>
          بناءًا على طلب الصلح المؤرخ في
          {props.location.state.createdAt.split("T")[0]}
          وطلب تعيين المصالح الذي تقدم به طالب الصلح، فإن المركز يرشح إسم
          <Input
            type="text"
            name="conciliatorName"
            value={state.conciliatorName}
            onChange={handleText}
          />
          كمصالح لبحث سبل التسوية الودية.
          <CustomInput
            style={{
              overflow: "hidden",
              backgroundColor: "white",
              border: "none",
            }}
            type="file"
            label="Upload a File"
            onChange={handleFile}
          />
          مرفق طيه سيرته الذاتية.
        </p>

        <p style={{ textAlign: "right" }}>
          وعملًا بقواعد الصلح وتحديدًا المادة (9) يمنحكم المركز (5) أيام كأجل
          للاعتراض على المصالح المرشح.
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
