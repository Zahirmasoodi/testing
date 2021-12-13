import React, { useState } from "react";
import {
  Card,
  CardBody,
  Input,
  CardHeader,
  Button,
  Container,
} from "reactstrap";
import header from "../../../assets/letterHead.png";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "../containers/Header";
import { getEnvironment } from "../../../config";

const EmailCoArbitrator = (props) => {
  const baseURL = getEnvironment().apiUrl;

  const [state, setState] = useState({
    allCases: [],
    soleArbitrator: "",
    date: "",
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
    formData.append("respondentEmail2", data.respondentEmail2);
    formData.append("respondentName2", data.respondentName2);
    formData.append("claimantEmail2", data.claimantEmail2);
    formData.append("claimantName2", data.claimantName2);
    formData.append("date", state.date);
    formData.append("arbitrator", state.soleArbitrator);
    formData.append("language", document.dir == "ltr" ? "ltr" : "rtl");
    formData.append("createdAt", data.createdAt);
    formData.append("caseNumber", data.caseNumber);

    axios
      .post(`${baseURL}/email/appointmentOfSoleArbitrator`, formData)
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
        <br />
        <p>
          Case Number: ARB
          {props.location.state.createdAt.split("-")[0]}-
          {pad(props.location.state.caseNumberRec)}
        </p>
        <p>
          {props.location.state.claimantName}
          <br />
          vs
          <br />
          {props.location.state.respondentName}
        </p>
        <p>
          <b>Subject: Nomination of the Sole Arbitrator</b>
        </p>
        <p>Allah, Peace, Mercy and Blessing upon you;</p>
        <p>
          <b>Attention to the Parties,</b>
        </p>
        <p>
          Warm Greetings from the International Islamic Centre for
          Reconciliation and Arbitration (IICRA).
        </p>
        <p>
          Referring to the letter addressed to you dated
          <Input
            type="date"
            name="date"
            value={state.date}
            onChange={handleText}
          />{" "}
          regarding the appointment of Sole Arbitrator Dr. Mr.
          <Input
            type="text"
            name="soleArbitrator"
            value={state.soleArbitrator}
            onChange={handleText}
          />
          Since IICRA did not receive any objection to his/her nomination within
          the regulatory deadlines specified in Article 6/29 of IICRA Rules.
          Therefore, we would like to inform you through this notice that IICRA
          confirms the appointment of {state.soleArbitrator} to act as a Sole
          Arbitrator in order to act as Sole Arbitrator in the aforementioned
          case.
        </p>
        <p>
          Further, pursuant to the Provisions of Article (25) of IICRA
          Arbitration Rules, the Sole Arbitrator shall sign the Mission Contract
          and nominate an Arbitral Tribunal Secretary. Also, you shall be duly
          informed about the transmission of the Case File and schedule of the
          virtual Preliminary Meeting in due course.
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
            Chief Executive Officer (CEO) <br />
            International Islamic Centre for Reconciliation and Arbitration{" "}
            <br />
          </b>
        </h6>
      </>
    );
  };

  const ar = () => {
    return (
      <>
        <br />
        <p style={{ textAlign: "right" }}>
          رقم الدعوى التحكيمية : ARB
          {props.location.state.createdAt.split("-")[0]}-
          {pad(props.location.state.caseNumberRec)}
        </p>
        <p style={{ textAlign: "center" }}>
          {props.location.state.claimantName}
          <br />
          ضد <br />
          {props.location.state.respondentName}
        </p>
        <p style={{ textAlign: "center" }}>
          <b>الموضوع: تعيين المحكم الفرد </b>
        </p>
        <br />
        <p style={{ textAlign: "right" }}>السلام عليكم ورحمة الله وبركاته:</p>
        <br />
        <p style={{ textAlign: "right" }}>
          <b>عناية السادة/ الأطراف،،،،،،،،،،،،،،،،،،الأفاضل</b>
        </p>
        <p>
          يهديكم المركز الإسلامي الدولي للصلح والتحكيم (المركز) أطيب التحية،
        </p>
        <p style={{ textAlign: "right" }}>
          الإشارة إلى الخطاب الموجهة لكم بتاريخ
          <Input
            type="date"
            name="date"
            value={state.date}
            onChange={handleText}
          />{" "}
          بشأن ترشيح (تسمية) المحكم الفرد
          <Input
            type="text"
            name="soleArbitrator"
            value={state.soleArbitrator}
            onChange={handleText}
          />
          ، وحيث لم يرد للمركز أي اعتراض على تسميته ضمن الآجال التنظيمية المحددة
          في المادة 29/6 من قواعد المركز، وعليه، نود إفادتكم بموجب هذا الإشعار
          بأن المركز قد قرر تعيين الدكتور/ الاستاذ
          {state.soleArbitrator}
          للتصرف كمكحم فرد في الدعوى التحكيمية الماثلة، على أن يتم توقيع عقد
          المهمة معه عملًا بأحكام المادة رقم (25) من قواعد التحكيم لدى المركز.
        </p>
        <p style={{ textAlign: "right" }}>
          وهذا سيقوم المحكم الفرد بترشيح أمين سر لهيئة التحكيم ومن ثم تحديد
          تاريخ لعقد الاجتماع التمهيدي الذي سيدعى لحضوره كافة الأطراف.
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

  const pad = (num) => {
    if (num < 10) {
      return "00" + num;
    } else if (num > 9 && num < 100) {
      return "0" + num;
    } else return num;
  };

  return (
    <>
      <Header
        data={props.location.state}
        stepName="Nomination and Appointment of Arbitrator(s)"
        stepPathPrev="nomination"
        stepPath="nominateArb"
        name="Appointment of Sole Arbitrator"
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
export default EmailCoArbitrator;
