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
    first: "",
    second: "",
    third: "",
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
    formData.append("first", state.first);
    formData.append("second", state.second);
    formData.append("third", state.third);
    formData.append("date", state.date);
    formData.append("respondentEmail2", data.respondentEmail2);
    formData.append("respondentName2", data.respondentName2);
    formData.append("claimantEmail2", data.claimantEmail2);
    formData.append("claimantName2", data.claimantName2);
    formData.append("caseNumber", data.caseNumber);
    formData.append("language", document.dir == "ltr" ? "ltr" : "rtl");
    formData.append("createdAt", data.createdAt);

    axios
      .post(`${baseURL}/email/appointmentOfCoArbitralTribunal`, formData)
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
          {pad(props.location.state.caseNumber)}
        </p>
        <p>
          {props.location.state.claimantName}
          <br />
          vs
          <br />
          {props.location.state.respondentName}
        </p>
        <p>
          <b>Subject: Nomination of the Chairman of Arbitral Tribunal</b>
        </p>
        <p>Allah, Peace, Mercy and Blessing upon you;</p>
        <p>
          <b>Dear Parties,</b>
        </p>
        <p>
          The International Islamic Centre for Reconciliation and Arbitration
          (IICRA) would like to inform you that both of the appointed
          Co-Arbitrators have agreed to appoint {state.third}
          <Input
            type="date"
            name="date"
            value={state.date}
            onChange={handleText}
          />{" "}
          to act as Chairman in the present Arbitration Case. Further, pursuant
          to the Provisions of Article (25) of IICRA Rules, the Chairman in case
          appointed along with appointed Co-Arbitrators hall sign the Mission
          Contract.
          <br />
          Thus, please be informed that the Arbitral Tribunal is now duly formed
          by Three (3) Co-Arbitrators are as follows:
          <br />
          Nominated Chairman
          <Input
            type="text"
            name="third"
            value={state.third}
            onChange={handleText}
          />{" "}
          <br />
          Nominated 1st Co-Arbitrator{" "}
          <Input
            type="text"
            name="first"
            value={state.first}
            onChange={handleText}
          />{" "}
          <br />
          Nominated 3rd Co-Arbitrator{" "}
          <Input
            type="text"
            name="second"
            value={state.second}
            onChange={handleText}
          />{" "}
          <br />
          In case any of the two parties have any objection to the nomination of
          Chairman of the Tribunal, it shall notify IICRA thereof accordingly by
          submitting the reasons for the objection in accordance with the
          provisions of Article 6/21 of IICRA Rules.
        </p>

        <p>
          We thank you in advance for your cooperation and respect for
          regulatory deadlines. We thank you in advance for your cooperation and
          respecting regulatory deadline.
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
          {pad(props.location.state.caseNumber)}
        </p>
        <p style={{ textAlign: "center" }}>
          {props.location.state.claimantName}
          <br />
          ضد <br />
          {props.location.state.respondentName}
        </p>
        <p style={{ textAlign: "center" }}>
          <b>الموضوع: تسمية (ترشيح) رئيس هيئة التحكيم </b>
        </p>
        <br />
        <p style={{ textAlign: "right" }}>السلام عليكم ورحمة الله وبركاته:</p>
        <br />
        <p style={{ textAlign: "right" }}>
          <b>عناية السادة/ أطراف النزاع ،،،،،،،،،،،،،،،،،،المحترمين</b>
        </p>
        <br />
        <p style={{ textAlign: "right" }}>
          يهديكم المركز الإسلامي الدولي للصلح والتحكيم (المركز) أطيب التحية،
          ويود إفادتكم علمًا بأن كلا المحكمين المعينين قد اتفقا على تسمية المحكم
          الثالث الأستاذ
          {state.third}
          كرئيس لهيئة التحكيم في الدعوى التحكيمية الماثلة، على أن يتم توقيع عقد
          المهمة معه عملًا بأحكام المادة رقم (25) من قواعد التحكيم لدى المركز.
          <br />
          ولذلك، تم تشكيل هيئة التحكيم أصولًا من ثلاثة (3) محكمين وتتألف هيئة
          التحكيم مما يلي:
          <br />
          الأستاذ......... إسم المحكم المرشح كرئيس الهيئة{" "}
          <Input
            type="text"
            name="third"
            value={state.third}
            onChange={handleText}
          />{" "}
          <br />
          الأستاذ.........إسم المحكم الأول المعين{" "}
          <Input
            type="text"
            name="first"
            value={state.first}
            onChange={handleText}
          />{" "}
          <br />
          الأستاذ......إسم المحكم الثاني المعين
          <Input
            type="text"
            name="second"
            value={state.second}
            onChange={handleText}
          />{" "}
        </p>
        <p style={{ textAlign: "right" }}>
          وفي حال كان لدى أي أطراف اعتراض على تسمية رئيس هيئة التحكيم فعليه
          إشعار المركز بذلك مع إيداع أسباب الاعتراض عملًا للأحكام المادة 6/21 من
          قواعد المركز.
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
        name="Appointment of Arbitral-Tribunal"
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
