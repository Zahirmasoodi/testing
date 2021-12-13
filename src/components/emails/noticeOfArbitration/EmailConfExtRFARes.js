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

const EmailConfExtRFARes = (props) => {
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
    date: "",
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
    formData.append("respondentEmail2", data.respondentEmail2);
    formData.append("respondentName", data.respondentName);
    formData.append("respondentName2", data.respondentName2);
    formData.append("respondentAddress", data.respondentAddress);
    formData.append("respondentPhone", data.respondentPhone);
    formData.append("claimantEmail", data.claimantEmail);
    formData.append("claimantName", data.claimantName);
    formData.append("claimantEmail2", data.claimantEmail2);
    formData.append("claimantName2", data.claimantName2);
    formData.append("createdAt", data.createdAt);
    formData.append("natureOfDispute", data.natureOfDispute);
    formData.append("createdAt", data.createdAt);
    formData.append("caseNumber", data.caseNumber);

    formData.append("numOfDays", state.numOfDays);
    formData.append("date", state.date);

    formData.append("language", document.dir == "ltr" ? "ltr" : "rtl");

    axios
      .post(`${baseURL}/email/extendRFAresponse`, formData)
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
        <p style={{ textAlign: "center" }}>
          Name : {props.location.state.respondentName}
          <br />
          Address : {props.location.state.respondentAddress}
          <br />
          Contact Number : {props.location.state.respondentPhone}
        </p>
        <br />
        <p style={{ textAlign: "center" }}>
          Claimant ({props.location.state.claimantName})
          <br />
          vs
          <br />
          Respondent ({props.location.state.respondentName}){" "}
          {props.location.state.respondentName2 != ""
            ? `, ${props.location.state.respondentName2}`
            : null}
        </p>
        <br />
        <p style={{ textAlign: "center" }}>
          <b>Subject</b> Confirmation for Extension of the Deadline for
          Submitting Response to the RFA
        </p>
        <br />
        <p>Allah, Peace, Mercy and Blessing upon you</p>
        <p>
          Warm Greetings from the International Islamic Centre for
          Reconciliation and Arbitration (IICRA).
        </p>
        <h5>Dear Respondent</h5>
        <br />
        <p>
          Pursuant to the Request for Arbitration submitted by the Claimant
          dated {props.location.state.createdAt.split("T")[0]} regarding the
          extension of deadline for the submission of responses to the RFA, we
          would like to inform you that having examined your request for
          extension, IICRA has approved your request and accordingly has decided
          to extend the deadline for submission until{" "}
          <Input
            type="date"
            name="date"
            id="date"
            onChange={handleText}
            value={state.date}
          />{" "}
        </p>
        <p>
          We are looking forward to receiving the response on the said date.
        </p>
        <br />
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
          إسم المحتكم ضده: {props.location.state.respondentName} <br />
          العنوان الكامل: {props.location.state.respondentAddress} <br />
          رقم الهاتف: {props.location.state.respondentPhone}
        </div>
        <br />
        <div style={{ textAlign: "center" }}>
          المحتكم ({props.location.state.claimantName})<br />
          ضد
          <br />
          المحتكم ضده ({props.location.state.respondentName}){" "}
          {props.location.state.respondentName2 != ""
            ? `, ${props.location.state.respondentName2}`
            : null}
        </div>
        <br />
        <p style={{ textAlign: "center" }}>
          <b>الموضوع</b> : التأكيد لتمديد مدة تقديم الرد على الطلب{" "}
        </p>
        <p style={{ textAlign: "right" }}>
          السلام عليكم ورحمة الله وبركاته {props.location.state.respondentName},
        </p>
        <p style={{ textAlign: "right" }}>
          عناية المحتكم ضده، {props.location.state.respondentName},
        </p>
        <br />
        <p style={{ textAlign: "right" }}>
          يهديكم المركز الإسلامي الدولي للصلح والتحكيم أطيب التحية،
        </p>

        <p style={{ textAlign: "right" }}>
          وعطفًا على طلب التحكيم المقدم من قبل المحتكم بتاريخ{" "}
          {props.location.state.createdAt.split("T")[0]} وبدراسة الطلب المقدم من
          جانبكم لتمديد المهلة الممنوحة لكم للرد على طلب التحكيم، نود الإفادة
          بأن المركز قد وافق على طلبكم لتمديد مدة تقديم الرد على طلب التحكيم في
          الدعوى التحكيمية الماثلة وذلك حتى التاريخ
          <Input
            type="date"
            name="date"
            id="date"
            onChange={handleText}
            value={state.date}
          />
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
        stepName="Notice of Arbitration"
        stepPathPrev="notice"
        stepPath="arbitrationNotice"
        name="Confirmation to Extend The Submission of RFA Response"
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
export default EmailConfExtRFARes;
