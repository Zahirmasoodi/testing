import React, { useState } from "react";
import {
  Card,
  CardBody,
  Input,
  CardHeader,
  Button,
  Container,
  CustomInput,
} from "reactstrap";
import header from "../../../assets/letterHead.png";
import axios from "axios";
import jsPDF from "jspdf";
import Swal from "sweetalert2";
import Header from "../containers/Header";
import { getEnvironment } from "../../../config";
import pad from "../../../pad";

const EmailSoleNominatingRap = (props) => {
  const baseURL = getEnvironment().apiUrl;

  const [state, setState] = useState({
    allCases: [],
    rapporteurName: "",
    cvOfRap: "",
    doc: new jsPDF(),
  });

  const handleText = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleFile = (e) => {
    setState({ ...state, [e.target.name]: e.target.files[0] });
  };

  const handleSend = (data) => {
    const pdf = state.doc.output("blob");

    const formData = new FormData();
    formData.append("respondentEmail", data.respondentEmail);
    formData.append("respondentName", data.respondentName);
    formData.append("claimantEmail", data.claimantEmail);
    formData.append("claimantName", data.claimantName);
    formData.append("respondentEmail2", data.respondentEmail2);
    formData.append("respondentName2", data.respondentName2);
    formData.append("claimantEmail2", data.claimantEmail2);
    formData.append("claimantName2", data.claimantName2);
    formData.append("caseNumber", data.caseNumber);
    formData.append("arbitratorName", state.arbitratorName);
    formData.append("email", data.claimantEmail);
    formData.append("cvOfRap", state.cvOfRap);
    formData.append("rapporteurName", state.rapporteurName);
    formData.append("createdAt", data.createdAt);
    formData.append("language", document.dir == "ltr" ? "ltr" : "rtl");

    axios
      .post(`${baseURL}/email/soleNominatesRap`, formData)
      .then(() => {
        Swal.fire({
          title: "SENT",
          icon: "success",
        });
        props.history.push({
          pathname: "/email/nominateArb",
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
          Case Number: {props.location.state.createdAt.split("-")[0]}-
          {pad(props.location.state.caseNumber)}
        </p>
        <br />
        <p>{props.location.state.claimantName}</p>
        <p>VS</p>
        <p>{props.location.state.respondentName}</p>
        <p>
          <b>Subject: Nomination of Arbitral Tribunal Secretary</b>
        </p>
        <p>Allah, Peace, Mercy and Blessing upon you;</p>
        <p>
          <b>Dear Messrs. IICRA & Parties,</b>
        </p>
        <br />
        <p>
          Pursuant to the provisions of Article (24) of the arbitration rules,
          we would like to inform you that the Arbitral Tribunal hereby
          nominates Mr.
          <Input
            type="text"
            name="rapporteurName"
            value={state.rapporteurName}
            onChange={handleText}
          />{" "}
          to act as Arbitral Tribunal Secretary in the present Arbitration Case.
        </p>
        <p>
          Please find attached Curriculum Vitae (CV) of nominated Arbitral
          Tribunal Secretary for your kind perusal.
          <br />
          <br />
          Kind Regards,
        </p>
        <section>
          <CustomInput
            style={{
              overflow: "hidden",
              backgroundColor: "white",
              border: "none",
            }}
            type="file"
            name="cvOfRap"
            label="Upload a File"
            onChange={handleFile}
          />
        </section>
      </>
    );
  };

  const ar = () => {
    return (
      <>
        <p className="text-right">
          رقم الدعوى التحكيمية : ARB
          {props.location.state.createdAt.split("-")[0]}-
          {pad(props.location.state.caseNumber)}
        </p>
        <p className="text-center">
          {props.location.state.claimantName}
          <br />
          ضد
          <br />
          {props.location.state.respondentName}
        </p>
        <p className="text-right">
          <b>الموضوع: تسمية أمين السر</b>
        </p>
        <p className="text-right">السلام عليكم ورحمة الله وبركاته:</p>
        <p className="text-right">
          <b>السادة/ الأطراف ،،،،،،،،،،،،،،،،،،الأفاضل،</b>
        </p>

        <p className="text-right">
          علمًا بأحكام المادة (24) من قواعد التحكيم، نود الإفادة بأن هيئة
          التحكيم ترشح الأستاذ
          <Input
            type="text"
            name="rapporteurName"
            value={state.rapporteurName}
            onChange={handleText}
          />{" "}
          للقيام بهام أمين السر في الدعوى التحكيمية رقم
        </p>
        <p className="text-right">
          مرفق طيه السيرة الذاتية لأمين السر المرشح.
          <br />
          <br />
          إقبلوا فائق التحية والتقدير،
        </p>
        <section className="text-right">
          <CustomInput
            style={{
              overflow: "hidden",
              backgroundColor: "white",
              border: "none",
            }}
            type="file"
            name="cvOfRap"
            label="Upload a File"
            onChange={handleFile}
          />
        </section>
      </>
    );
  };

  return (
    <>
      <Header
        data={props.location.state}
        stepName="Nomination and Appointment of Arbitrator(s)"
        stepPathPrev="nomination"
        stepPath="nominateArb"
        name="Sole Arbitrator Nominating a Rapportuer"
      />
      <Container style={styles.formUserContainer} className="shadow-lg">
        <h6 style={styles.center}>Email Template</h6>
        <Card style={styles.cardBg}>
          <CardBody>
            {document.dir === "ltr" ? en() : ar()}
            <Button
              onClick={() => handleSend(props.location.state)}
              className="mt-3"
            >
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
export default EmailSoleNominatingRap;
