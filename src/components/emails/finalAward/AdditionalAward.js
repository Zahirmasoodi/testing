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

const AdditionalAward = (props) => {
  const baseURL = getEnvironment().apiUrl;
  const [state, setState] = useState({
    date: "",
    meetingLink: "",
    oldDate: "",
    date: "",
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
      .post(`${baseURL}/email/additionalAward`, formData)
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
      <section>
        <p>
          Case Number : ARB{props.location.state.createdAt.split("-")[0]}-
          {props.location.state.caseNumber}
        </p>
        <p style={{ textAlign: "center" }}>
          {props.location.state.claimantName}
          <br />
          vs
          <br />
          {props.location.state.respondentName},
          {props.location.state.respondentName2 != ""
            ? `, ${props.location.state.respondentName2}`
            : null}
        </p>

        <p style={{ textAlign: "center" }}>
          <b>Subject</b> : Additional Arbitral Award
        </p>

        <p>Allah, Peace, Mercy and Blessing upon you</p>
        <h5>In Attention to the Parties,</h5>
        <p>
          Warm Greetings from the International Islamic Centre for
          Reconciliation and Arbitration (IICRA).
        </p>

        <p>
          In connection with your letter dated{" "}
          <Input
            type="date"
            name="oldDate"
            value={state.oldDate}
            onChange={handleChange}
          />{" "}
          regarding the request for correction/interpretation of the final
          arbitral award issued on
          <Input
            type="date"
            name="date"
            value={state.date}
            onChange={handleChange}
          />{" "}
          we wish to inform that the arbitral tribunal, Pursuant to the
          provisions of Article No. (60), it has corrected/interpreted the final
          arbitration award, in accordance with the attached additional
          provision.{" "}
        </p>

        <p>Thank you very much,</p>

        <h6>
          <b>
            Kind Regards, <br />
            <br />
            Arbitral Tribunal Secretary,
            <br />
            International Islamic Centre for Reconciliation &amp; Arbitration{" "}
          </b>
        </h6>
      </section>
    );
  };

  const ar = () => {
    return (
      <section className="text-right">
        <p>
          رقم الدعوى التحكيمية : ARB
          {props.location.state.createdAt.split("-")[0]}-
          {props.location.state.caseNumber}
        </p>
        <p style={{ textAlign: "center" }}>
          {props.location.state.claimantName}
          <br />
          ضد
          <br />
          {props.location.state.respondentName},
          {props.location.state.respondentName2 != ""
            ? `, ${props.location.state.respondentName2}`
            : null}
        </p>

        <p style={{ textAlign: "center" }}>موضوع: حكم التحكيم الإضافي</p>

        <p>السلام عليكم ورحمة الله وبركاته:</p>
        <h5>عناية الأطراف................الأفاضل </h5>
        <p>
          عطفًا على خطابكم المرسل المؤرخ في{" "}
          <Input
            type="date"
            name="oldDate"
            value={state.oldDate}
            onChange={handleChange}
          />{" "}
          بشأن طلب تصحيح/تفسير الحكم التحكيم النهائي الصادر بتاريخ
          <Input
            type="date"
            name="date"
            value={state.date}
            onChange={handleChange}
          />{" "}
          نود الإفادة بأن هيئة التحكيم، عملًا بأحكام المادة رقم (60) قد قامت
          بتصحيح/ تفسير حكم التحكيم النهائي، وفق الحكم الإضافي المرفق.
        </p>

        <h6>
          <b>
            وتفضلوا بقبول فائق التقدير والاحترام
            <br />
            <br />
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
        stepName="Issuance of Final Award"
        stepPathPrev="issuance"
        stepPath="award"
        name="Additional Arbitral Award"
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
export default AdditionalAward;
