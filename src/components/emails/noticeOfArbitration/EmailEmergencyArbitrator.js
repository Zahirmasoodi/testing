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
import Swal from "sweetalert2";
import Header from "../containers/Header";
import { getEnvironment } from "../../../config";

const EmailEmergencyArbitrator = (props) => {
  const baseURL = getEnvironment().apiUrl;

  const [state, setState] = useState({
    allCases: [],
    resEmail: "",
    claEmail: "",
    filingDate: "",
    notes: "",
    emergencyArbitrator: "",
    numOfDays: "",
    cvEmergencyArbitrator: "",
    article: "",
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.files[0] });
  };

  const handleText = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSend = (data) => {
    const formData = new FormData();
    formData.append("respondentEmail", data.respondentEmail);
    formData.append("respondentName", data.respondentName);
    formData.append("respondentEmail2", data.respondentEmail2);
    formData.append("respondentName2", data.respondentName2);
    formData.append("respondentAddress", data.respondentAddress);
    formData.append("respondentPhone", data.respondentPhone);
    formData.append("claimantEmail", data.claimantEmail);
    formData.append("claimantName", data.claimantName);
    formData.append("claimantEmail2", data.claimantEmail2);
    formData.append("claimantName2", data.claimantName2);
    formData.append("createdAt", data.createdAt);
    formData.append("natureOfDispute", data.natureOfDispute);
    formData.append("caseNumber", data.caseNumber);
    formData.append("notes", state.notes);
    formData.append("article", state.article);
    formData.append("emergencyArbitrator", state.emergencyArbitrator);
    formData.append("numOfDays", state.numOfDays);
    formData.append("cvEmergencyArbitrator", state.cvEmergencyArbitrator);
    formData.append("language", document.dir == "ltr" ? "ltr" : "rtl");

    axios
      .post(`${baseURL}/email/emergencyArbitrator`, formData)
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
      <div>
        <p>
          To : {props.location.state.claimantEmail}{" "}
          {props.location.state.respondentEmail}
        </p>
        <p>
          Claimant ({props.location.state.claimantName})
          <br />
          vs
          <br />
          Respondent ({props.location.state.respondentName})
        </p>
        <br />
        <p>
          <b>Subject</b> : Appointment of an Emergency Arbitrator
        </p>
        <p>
          Warm Greetings from the International Islamic Centre for
          Reconciliation and Arbitration (IICRA).
        </p>

        <h5>Attention to the Parties,</h5>
        <p>
          Based on the Request for Arbitration (RFA) initiated dated{" "}
          {props.location.state.createdAt.split("T")[0]}and the request to
          appoint an emergency arbitrator submitted by the Claimant, and
          pursuant to the provisions of Article (18) of the Arbitration Rules,
          IICRA hereby nominates Dr./Mr{" "}
          <Input
            type="text"
            name="emergencyArbitrator"
            onChange={handleText}
            value={state.emergencyArbitrator}
          />{" "}
          as an emergency arbitrator. Please refer to the attached Curriculum
          Vita (CV) for your kind perusal.
        </p>
        <p>
          Pursuant to the arbitration rules, specifically Article (18/4), the
          Parties hereby duly informed to submit their objection or confirmation
          of non-objection to the aforementioned proposed nomination within two
          (2) days.
        </p>
        <br />
        <p>Thank you for respecting the regulatory deadlines.</p>
        <CustomInput
          style={{
            overflow: "hidden",
            backgroundColor: "white",
            border: "none",
          }}
          type="file"
          name="cvEmergencyArbitrator"
          onChange={handleChange}
        />
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
      </div>
    );
  };

  const ar = () => {
    return (
      <div style={{ fontSize: "16px" }}>
        <p style={{ textAlign: "right" }}>
          إلى
          {props.location.state.claimantEmail}{" "}
          {props.location.state.respondentEmail}
        </p>
        <br />
        <p style={{ textAlign: "center" }}>
          المحتكم ({props.location.state.claimantName})<br />
          ضد <br />
          المحتكم ضده ({props.location.state.respondentName}){" "}
        </p>
        <p style={{ textAlign: "center" }}>
          <b>الموضوع</b>: تعيين محكم طوارئ
        </p>
        <p style={{ textAlign: "right" }}>السلام عليكم ورحمة الله وبركاته،</p>

        <h5 style={{ textAlign: "right" }}>
          عناية/ الأطراف،،،،،،،،،،،،،،،،،،الأفاضل،
        </h5>
        <br />
        <p style={{ textAlign: "right" }}>
          بناءًا على طلب التحكيم المؤرخ في
          {props.location.state.createdAt.split("T")[0]}
          وطلب تعيين محكم طوارئ الذي تقدم به المحتكم وعملًا بأحكام المادة (18)
          من قواعد التحكيم، فإن المركز يرشح{" "}
          <Input
            type="text"
            name="emergencyArbitrator"
            onChange={handleText}
            value={state.emergencyArbitrator}
          />{" "}
          كمحكم طوارئ. مرفق طيه سيرته الذاتية.
        </p>
        <p style={{ textAlign: "right" }}>
          وعملًا بقواعد التحكيم وتحديدًا المادة (4/18) يمنحكم المركز (2) يومين
          كأجل للاعتراض على محكم طوارئ المرشح.
        </p>

        <CustomInput
          style={{
            overflow: "hidden",
            backgroundColor: "white",
            border: "none",
          }}
          type="file"
          name="cvEmergencyArbitrator"
          onChange={handleChange}
        />

        <p style={{ textAlign: "right" }}>
          شاكرين لكم التقيد بلآجال التنظيمية،
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
        stepName="Notice of Arbitration"
        stepPathPrev="notice"
        stepPath="arbitrationNotice"
        name="Notice for Nomination of Emergency Arbitrator"
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
export default EmailEmergencyArbitrator;
