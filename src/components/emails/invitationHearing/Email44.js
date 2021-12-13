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

const Email44 = (props) => {
  const baseURL = getEnvironment().apiUrl;

  const [state, setState] = useState({
    letterDate: "",
    meetingDate: "",
    interpreter: "",
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
    formData.append("createdAt", data.createdAt);
    formData.append("caseNumber", data.caseNumber);
    formData.append("language", document.dir == "ltr" ? "ltr" : "rtl");
    formData.append("letterDate", state.letterDate);
    formData.append("meetingDate", state.meetingDate);
    formData.append("interpreter", state.interpreter);

    axios
      .post(`${baseURL}/email/tribunalRequestsSummonInterpreter`, formData)
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
          Case Number{" "}
          {`ARB${props.location.state.createdAt.split("-")[0]}-${pad(
            props.location.state.caseNumber
          )} `}
        </p>
        <p className="text-center">
          {props.location.state.claimantName}
          <br />
          vs
          <br />
          {props.location.state.respondentName}
        </p>
        <p className="text-center">
          <b>
            Subject: Template for the Appointment of Simultaneous Interpreter
          </b>
        </p>
        <p>Allah, Peace, Mercy and Blessing upon you.</p>

        <p>
          <b>Attention to the Parties,</b>
        </p>

        <p>
          Warm Greetings from the International Islamic Centre for
          Reconciliation and Arbitration (IICRA).
        </p>
        <p>
          With reference to the letter addressed to you on
          <Input
            type="date"
            name="letterDate"
            value={state.letterDate}
            onChange={handleText}
          />
          regarding summoning of the witness, and pursuant to the provisions of
          Article (45/3) of IICRA Arbitration Rules, We would like to inform you
          by this notice Arbitral Tribunal has decided to appoint
          <Input
            type="text"
            name="interpreter"
            value={state.interpreter}
            onChange={handleText}
          />
          to attend the hearing to be held on
          <Input
            type="date"
            name="meetingDate"
            value={state.meetingDate}
            onChange={handleText}
          />{" "}
          as a Simultaneous Interpreter.
        </p>
        <p>
          We thank you in advance for your cooperation and respecting regulatory
          deadline.
        </p>
        <h6>
          <b>
            Kind Regards,
            <br /> <br />
            Arbitral Tribunal Secretary,
            <br />
            International Islamic Centre for Reconciliation & Arbitration
          </b>
        </h6>
      </section>
    );
  };

  const ar = () => {
    return (
      <section className="text-right">
        <p>
          رقم الدعوى التحكيمية :
          {`ARB${props.location.state.createdAt.split("-")[0]}-${pad(
            props.location.state.caseNumber
          )} `}
        </p>
        <p className="text-center">
          {props.location.state.claimantName}
          <br />
          ضد
          <br />
          {props.location.state.respondentName}
        </p>
        <p className="text-center">
          <b>الموضوع: تعيين مترجم</b>
        </p>
        <p>السلام عليكم ورحمة الله وبركاته:</p>

        <p>
          <b>عناية السادة/ الأطراف،،،،،،،،،،،،،،،،،،الأفاضل</b>
        </p>

        <p>
          يهديكم المركز الإسلامي الدولي للصلح والتحكيم (المركز) أطيب التحية،
        </p>
        <p>
          بالإشارة إلى الخطاب الموجهة لكم بتاريخ
          <Input
            type="date"
            name="letterDate"
            value={state.letterDate}
            onChange={handleText}
          />
          بشأن استجواب الشاهد، وعملأ بأحكام المادة (45) من قواعد التحكيم،نود
          إفادتكم بموجب هذا الإشعار بأن المركز قد قرر تعيين السيد
          <Input
            type="text"
            name="interpreter"
            value={state.interpreter}
            onChange={handleText}
          />
          كمترجم لحضور جلسة التحكيم المزمع عقدها في تاريخ
          <Input
            type="date"
            name="meetingDate"
            value={state.meetingDate}
            onChange={handleText}
          />{" "}
        </p>
        <p>إقبلوا منا فائق التحية التقدير.</p>
        <h6>
          <b>
            وتفضلوا بقبول فائق التقدير والاحترام
            <br /> <br />
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
        name="Arbitral Tribunal Requesting to Summon the Certified Interpretor"
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
export default Email44;
