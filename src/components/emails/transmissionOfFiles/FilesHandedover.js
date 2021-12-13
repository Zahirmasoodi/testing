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

const FilesHandedover = (props) => {
  const baseURL = getEnvironment().apiUrl;

  const [state, setState] = useState({
    first: "",
    second: "",
    third: "",
    rapporteur: "",
  });

  const handleText = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSend = (data) => {
    const formData = new FormData();
    formData.append("respondentEmail", data.respondentEmail);
    formData.append("date", state.date);
    formData.append("respondentName", data.respondentName);
    formData.append("claimantEmail", data.claimantEmail);
    formData.append("claimantName", data.claimantName);
    formData.append("soleArbitrator", state.soleArbitrator);
    formData.append("soleArbitratorEmail", state.soleArbitratorEmail);
    formData.append("language", document.dir == "ltr" ? "ltr" : "rtl");
    formData.append("caseNumber", data.caseNumber);
    formData.append("createdAt", data.createdAt);
    formData.append("first", state.first);
    formData.append("second", state.second);
    formData.append("third", state.third);
    formData.append("rapporteur", state.rapporteur);

    axios
      .post(`${baseURL}/email/filesHandedOver`, formData)
      .then(() => {
        Swal.fire({
          title: "SENT",
          icon: "success",
        });
        props.history.push({
          pathname: "/email/transmission",
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
          <b>Subject: Notice of Handing Over the Case File to the Tribunal</b>
        </p>
        <p>Allah, Peace, Mercy and Blessing upon you;</p>
        <p>
          <b>Attention to the Parties,</b>
        </p>
        <p>
          <b>
            Warm Greetings from the International Islamic Centre for
            Reconciliation and Arbitration (IICRA).
          </b>
        </p>
        <p>
          We would like to inform you that the Tribunal has signed the Mission
          Contract and it is now duly formed by Three (3) Arbitrators are as
          follows:
          <br />
          1. Name of 1st Co-Arbitrator
          <Input
            type="text"
            name="first"
            value={state.first}
            onChange={handleText}
          />
          <br />
          2. Name of 2nd Co-Arbitrator
          <Input
            type="text"
            name="second"
            value={state.second}
            onChange={handleText}
          />
          <br /> 3. Name of Chairman
          <Input
            type="text"
            name="third"
            value={state.third}
            onChange={handleText}
          />
        </p>
        <p>
          In accordance with the Provisions of Article (25) of IICRA Rules, the
          Chief Executive Officer (CEO) of IICRA has handed over the case file
          to the Tribunal in order to carry out its mission and accordingly Mr.
          <Input
            type="text"
            name="rapporteur"
            value={state.rapporteur}
            onChange={handleText}
          />{" "}
          has been appointed to act as an Arbitral Tribunal Secretary in the
          present Arbitration Case the.
        </p>

        <p>
          Pursuant to the provisions of Article (30) of IICRA Rules, the
          Chairman of the Tribunal shall, within ten (10) days from the receipt
          of this letter, invite the parties to attend the preliminary meeting{" "}
        </p>
        <h6>
          <b>
            Sincerely, <br /> <br />
            <br />
            Signature &amp; Stamp <br />
            Rami Sulaiman <br />
            Chief Executive Officer (CEO) <br />
            International Islamic Centre for Reconciliation and Arbitration{" "}
            <br />
          </b>
        </h6>
        <br />
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
          ضد
          <br />
          {props.location.state.respondentName}
        </p>
        <p style={{ textAlign: "right" }}>
          <b>موضوع: إشعار بتسليم ملف التحكيم لهيئة التحكيم </b>
        </p>

        <p style={{ textAlign: "right" }}> السلام عليكم ورحمة الله وبركاته:</p>
        <p style={{ textAlign: "right" }}>
          <b>عناية السادة/ الأطراف،،،،،،،،،،،،،،،،،،الأفاضل</b>
        </p>
        <p style={{ textAlign: "right" }}>
          يهديكم المركز الإسلامي الدولي للصلح والتحكيم (المركز) أطيب التحية،
          ونود إفادتكم بأنه قد تم توقيع عقد المهمة من قبل أعضاء هيئة التحكيم.
          وقد تم تشكيل هيئة التحكيم أصولا من (3) محكمين وهم:
          <br />
          رئيسًا لهيئة التحكيم
          <Input
            type="text"
            name="first"
            value={state.first}
            onChange={handleText}
          />
          <br />
          عضًوا
          <Input
            type="text"
            name="second"
            value={state.second}
            onChange={handleText}
          />
          <br />
          عضًوا
          <Input
            type="text"
            name="third"
            value={state.third}
            onChange={handleText}
          />
        </p>
        <p style={{ textAlign: "right" }}>
          وعملا بنص المادة (25) من قواعد التحكيم، فقد سلم المدير التنفيذي للمحكم
          الفرد المستندات الخاصة بالدعوى التحكيمية الماثلة، ليباشر مهمته التي تم
          تعيينه من أجله. وقد عين الأستاذ
          <Input
            type="text"
            name="rapporteur"
            value={state.rapporteur}
            onChange={handleText}
          />{" "}
          كأمين سر هيئة التحكيم
        </p>
        <p style={{ textAlign: "right" }}>
          هذا وسيقوم المحكم الفرد خلال عشر (10) أيام من تاريخ هذا الخطاب بدعوة
          الأطراف لحضور الاجتماع التمهيدي عملُا بأحكام المادة (30) من قواعد
          المركز.
        </p>
        <p style={{ textAlign: "right" }}>شاكرين لكم جميعًا</p>

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
        stepName="Transmission of Files to Arbitrator(s)"
        stepPathPrev="nominateArb"
        stepPath="transmission"
        name="Subject: Notice of Handing Over the Case File to the Tribunal"
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
export default FilesHandedover;
