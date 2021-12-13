import React, { useState, useEffect } from "react";
import {
  Card,
  Input,
  CardBody,
  CardHeader,
  Button,
  Container,
} from "reactstrap";
import header from "../../../assets/letterHead.png";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "../containers/Header";
import { getEnvironment } from "../../../config";
import pad from "../../../pad";

const Pending = (props) => {
  const baseURL = getEnvironment().apiUrl;

  const [state, setState] = useState({
    allCases: [],
    documents: "",
    article_: "",
  });

  const handleText = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSend = (data) => {
    const formData = new FormData();
    formData.append("respondentName", data.respondentName);
    formData.append("claimantEmail", data.claimantEmail);
    formData.append("claimantName", data.claimantName);
    formData.append("respondentName2", data.respondentName);
    formData.append("claimantEmail2", data.claimantEmail);
    formData.append("claimantName2", data.claimantName);
    formData.append("respondentEmail", data.respondentEmail);
    formData.append("respondentEmail2", data.respondentEmail2);
    formData.append("createdAt", data.createdAt);
    formData.append("natureOfDispute", data.natureOfDispute);
    formData.append("arbitratorName", data.arbitratorName);
    formData.append("arbitrationLanguage", data.arbitrationLanguage);
    formData.append("reliefSought", data.reliefSought);
    formData.append("documents", state.documents);
    formData.append("language", document.dir == "ltr" ? "ltr" : "rtl");
    formData.append("caseNumber", data.caseNumber);

    axios
      .post(`${baseURL}/email/ackClaimantPending`, formData)
      .then(() => {
        Swal.fire({
          title: document.dir == "ltr" ? "SENT" : "مرسل",
          icon: "success",
        });
        props.history.push({
          pathname: "/email/rfa",
          state: props.location.state,
        });
      })
      .catch(() =>
        Swal.fire({
          title: document.dir == "ltr" ? "Something went Wrong" : "هناك خطأ ما",
          icon: "error",
        })
      );
  };

  const en = () => {
    return (
      <div>
        <br />
        <p>
          Case Number:
          <b>
            {`ARB${props.location.state.createdAt.split("-")[0]}-${pad(
              props.location.state.caseNumber
            )} `}
          </b>
        </p>
        <p>
          {props.location.state.claimantName}
          <br />
          VS
          <br />
          {props.location.state.respondentName}
        </p>
        <p style={{ textAlign: "center" }}>
          <h6>
            <b>
              Subject: IICRA Acknowledgement of RFA &amp; Requesting for
              Additional Requirements
            </b>
          </h6>
        </p>

        <p>Dear {props.location.state.claimantName},</p>
        <p>
          We are writing to inform you that the International Islamic Centre for
          Reconciliation and Arbitration (IICRA) has received a soft copy of
          your Request for Arbitration (RFA) on{" "}
          {props.location.state.createdAt.split("T")[0]}.
        </p>
        <p>
          Your RFA has been filed as IICRA Case Number
          <b>
            {" "}
            {`ARB${props.location.state.createdAt.split("-")[0]}-${pad(
              props.location.state.caseNumber
            )} `}
          </b>{" "}
          Please quote this case number in all future correspondence.
        </p>
        <p>
          As per the assessment of your RFA by the IICRA Management, kindly
          complete the below list of requirements in order to proceed to the
          Arbitration.
        </p>
        <p>
          <Input
            type="textarea"
            name="documents"
            rows="5"
            cols="50"
            onChange={handleText}
            value={state.documents}
          />
        </p>
        <i>
          Shall you require any assistance, please do not hesitate to contact{" "}
          <b>info@iicra.com</b>
        </i>
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
      </div>
    );
  };

  const ar = () => {
    return (
      <div>
        <br />
        <p style={{ textAlign: "right" }}>
          رقم الدعوى التحكيمية:
          <b>
            {`ARB${props.location.state.createdAt.split("-")[0]}-${pad(
              props.location.state.caseNumber
            )} `}
          </b>
        </p>
        <p style={{ textAlign: "center" }}>
          {props.location.state.claimantName}
          <br />
          ضد
          <br />
          {props.location.state.respondentName}
        </p>
        <p style={{ textAlign: "center" }}>
          <b>موضوع: إشعار طلب التحكيم وطلب متطلبات إضافية</b>
        </p>

        <p style={{ textAlign: "right" }}>
          السادة الأفاضل {props.location.state.claimantName},
        </p>
        <p style={{ textAlign: "right" }}>
          يهديكم المركز الإسلامي الدولي للصلح والتحكيم أطيب التحية، ونود إفادتكم
          بأن المركز قد تلقى نسخة {props.location.state.createdAt.split("T")[0]}
          .
        </p>
        <p style={{ textAlign: "right" }}>
          لكترونية من طلب التحكيم وقد تأسس طلب التحكيم المقدم من قبلكم لدى
          المركز بدعوى تحكيمية رقم
          <b>
            {" "}
            {`ARB${props.location.state.createdAt.split("-")[0]}-${pad(
              props.location.state.caseNumber
            )} `}
          </b>{" "}
          ويرجى منكم ذكر رقم هذا في جميع المراسلات المقبلة.
        </p>
        <p style={{ textAlign: "right" }}>
          وفقًا لتقييم طلب التحكيم المقدم الذي تم إجراءه من قبل المركز ، يرجى
          منكم إيداع المستندات التالية لسير إجراءات التحكيم.
        </p>
        <p style={{ textAlign: "right" }}>
          <Input
            type="textarea"
            name="documents"
            rows="5"
            cols="50"
            onChange={handleText}
            value={state.documents}
          />
        </p>
        <p style={{ textAlign: "right" }}>
          <i>
            نأمل أن نتلقى ردكم الكريم في أقرب فرصة ممكن. <b>info@iicra.com</b>
          </i>
        </p>
        <br />
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
      </div>
    );
  };

  return (
    <>
      <Header
        data={props.location.state}
        stepName={document.dir == "ltr" ? "RFA" : "طلب التحكيم"}
        stepPathPrev="rfa"
        stepPath="rfa"
        name={
          document.dir == "ltr"
            ? "Incomplete Information"
            : "معلومات غير مكتملة"
        }
      />
      <Container style={styles.formUserContainer} className="shadow-lg">
        <h6 style={styles.center}>
          {document.dir == "ltr" ? "Pending Documents" : "المستندات المعلقة"}
        </h6>

        <Card style={styles.cardBg}>
          <CardHeader style={styles.letterContainer}>
            <img style={styles.header} src={header} alt="header" />
          </CardHeader>
          <CardBody>
            {document.dir == "ltr" ? en() : ar()}
            <Button onClick={() => handleSend(props.location.state)}>
              {document.dir == "ltr" ? "Send" : "إرسال"}
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
export default Pending;
