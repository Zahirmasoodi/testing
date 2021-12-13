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

const Email35 = (props) => {
  const baseURL = getEnvironment().apiUrl;

  const [state, setState] = useState({
    date: "",
    reason: "",
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
    formData.append("date", state.date);
    formData.append("reason", state.reason);
    formData.append("language", document.dir == "ltr" ? "ltr" : "rtl");

    axios
      .post(`${baseURL}/email/tribunalRejectsSummonWitness`, formData)
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
          Case Number
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
          <b>
            Subject: Arbitral tribunal Rejecting the Request to Summon
            Witness(es)
          </b>
        </p>

        <p>Allah, Peace, Mercy and Blessing upon you;</p>
        <p>
          <b>In Attention to Claimant/Respondent,</b>
        </p>
        <p>
          With reference to your letter dated{" "}
          <Input
            type="date"
            name="date"
            value={state.date}
            onChange={handleText}
          />
          regarding summoning a witness in the present Arbitration Case, we
          would like to inform you that the reputed Tribunal has rejected due to
          the absence of valid reasons provided to justify the said summon in
          order to achieve justice within the specified time limits.
        </p>
        <p>
          <Input
            type="textarea"
            name="reason"
            rows="5"
            value={state.reason}
            onChange={handleText}
          />
        </p>
        <p> We thank you in advance for your attendance.</p>
        <h6>
          <b>
            Sincerely, <br /> <br />
            <br />
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
      <section className="text-right">
        <p>
          رقم الدعوى التحكيمية
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
          <b>موضوع: رفض طلب استدعاء واستجواب شاهد</b>
        </p>

        <p>السلام عليكم ورحمة الله وبركاته:</p>
        <p>
          <b>السادة/ المحتكم/ المحتكم ضده...............الموقر،</b>
        </p>
        <p>
          عطفًا على خطابكم المرسل المؤرخ في
          <Input
            type="date"
            name="date"
            value={state.date}
            onChange={handleText}
          />
          بشأن طلب استجواب شاهد في الدعوى التحكيميمة الماثلة، نود إفادتكم علمًا
          بأن هيئة التحكيم قد رفضت طلبكم للأسباب التالية:
        </p>
        <p>
          <Input
            type="textarea"
            name="reason"
            rows="5"
            value={state.reason}
            onChange={handleText}
          />
        </p>
        <p>شاكرين لكم مقدمًا حضوركم.</p>
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
        name="Arbitral Tribunal Rejecting the Request to Summon Witness(es) - Claimant"
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
export default Email35;
