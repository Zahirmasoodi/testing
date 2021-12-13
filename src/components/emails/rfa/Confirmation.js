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
import "../index.css";

const Confirmation = (props) => {
  const baseURL = getEnvironment().apiUrl;
  const {
    createdAt,
    caseNumber,
    claimantName,
    claimantName2,
    claimantEmail,
    respondentName,
    respondentName2,
    valueOfDispute,
  } = props.location.state;

  const [state, setState] = useState({
    article: "",
    article_: "",
    date: "",
    caseManager: "",
  });

  const handleText = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSend = (data) => {
    const formData = new FormData();
    formData.append("claimantEmail", data.claimantEmail);
    formData.append("claimantPassword", data.claimantPassword);
    formData.append("claimantEmail2", data.claimantEmail2);
    formData.append("claimantPassword2", data.claimantPassword2);
    formData.append("claimantName", data.claimantName);
    formData.append("claimantName2", data.claimantName2);
    formData.append("respondentName", data.respondentName);
    formData.append("respondentName2", data.respondentName2);
    formData.append("caseNumber", data.caseNumber);
    formData.append("createdAt", data.createdAt);
    formData.append("valueOfDispute", data.valueOfDispute);
    formData.append("caseManager", state.caseManager);
    formData.append("date", state.date);
    formData.append("article", state.article);
    formData.append("language", document.dir == "ltr" ? "ltr" : "rtl");

    axios
      .post(`${baseURL}/email/ackClaimantApproved`, formData)
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
        <p>
          Case No:
          <b>{`ARB${createdAt.split("-")[0]}-${pad(caseNumber)} `}</b>
        </p>
        <p>
          {claimantName}, {claimantName2 && claimantName2}
          <br />
          vs
          <br />
          {respondentName}, {respondentName2 && respondentName2}
        </p>
        <p className="text-center">
          <h6>
            <b>
              Subject: Notification & Acknowledgment of Request for Arbitration
            </b>
          </h6>
        </p>
        <p>Allah, Peace, Mercy and Blessing upon you</p>
        <p>In attention to the Claimant,</p>
        <p>
          Warm Greetings from the International Islamic Centre for
          Reconciliation and Arbitration (IICRA).
        </p>
        <p>
          We would like to inform you that you have files a Request for
          Arbitration (RFA) at IICRA dated
          {createdAt.split("T")[0]} in order to adjudicate the dispute through
          Arbitration against the Respondent/Respondents is/are as follows:
        </p>
        <p>Name of Respondent: {respondentName}</p>
        <p>
          {respondentName2 && (
            <span>Name of second Respondent {respondentName2}</span>
          )}
        </p>
        <p>
          The Claimant hereby requests the Tribunal to oblige the respondent(s)
          to pay an amount of {valueOfDispute} dirhams, fees, expenses, and
          attorneys' fees, as a result of the breach of the provisions of the
          contract concluded dated
          <Input
            type="date"
            name="date"
            value={state.date}
            onChange={handleText}
          />
          which stipulates IICRA Arbitration Clause in Article
          <Input
            type="text"
            name="article"
            onChange={handleText}
            value={state.article}
          />
          of the contract.
        </p>
        <p>
          Pursuant to the Provisions of Article (13) of IICRA Arbitration Rules,
          and after the registration fees paid by the Claimant, IICRA having
          examined the RFA has approved and registered it under Case No{" "}
          {`ARB${createdAt.split("-")[0]}-${pad(caseNumber)}`}
          Further IICRA has appointed Mr.
          <Input
            type="text"
            name="caseManager"
            value={state.caseManager}
            onChange={handleText}
          />
          as a Case Manager in order to notify the Respondent of the RFA along
          with the attachments within three (3) Days from the date of this
          notification, given that this notice has been issued based on what has
          been stipulated in the RFA, data and Claims.
        </p>
        <p>
          Please log in to use IICRA e-Arbitration platform via the link
          provided below: <br />
          <a href="https://www.portal.iicra.com/login">IICRA Portal</a>
          <br />
          Email: {claimantEmail}
          <br />
          Password : <b>********</b>
        </p>
        <p>For further inquiries, please email us at: info@iicra.com</p>

        <h6>
          <b>
            Sincerely,
            <br />
            <br />
            Signature &amp; Stamp <br />
            Rami Sulaiman <br />
            Chief Executive Officer <br />
            International Islamic Centre for Reconciliation &amp; Arbitration{" "}
          </b>
        </h6>
      </div>
    );
  };

  const ar = () => {
    return (
      <section style={{ fontSize: "16px", textAlign: "right" }}>
        <div>
          رقم الدعوى التحكيمية :
          <b> {`ARB${createdAt.split("-")[0]}-${pad(caseNumber)} `}</b>
        </div>
        <p className="text-center">
          {claimantName}, {claimantName2 && claimantName2}
          <br />
          ضد
          <br />
          {respondentName}, {respondentName2 && respondentName2}
        </p>
        <p className="text-center">
          <b>الموضوع : إشعار وبقبول طلب التحكيم</b>
        </p>
        <p>السلام عليكم ورحمة الله وبركاته</p>
        <p>
          عناية المحتكم : {claimantName}, {claimantName2 && claimantName2}
        </p>
        <p>
          يهديكم المركز الإسلامي الدولي للصلح والتحكيم (المركز) أطيب التحية،
          ويود الإفادة بأنه في تاريخ {createdAt.split("T")[0]} قد تم إيداع طلب
          التحكيم لدى المركز من قبلكم، وذلك بشأن الفصل في نزاعكم عن التحكيم في
          مواجهة المحتكم ضده:
        </p>
        <p>إسم المحتكم الأول : {respondentName}</p>

        {respondentName2 && <p>{respondentName2}:إسم المحتكم الثاني </p>}

        <p>
          وذلك حول المطالبة بإلزام المحتكم ضده بسداد مبلغ {valueOfDispute} درهم
          والرسوم والمصاريف وأتعاب المحاماة ، وذلك نتيجة إخلال المحتكم ضده
          بالتزاماته التعاقدية مع المحتكم.
        </p>
        <p>
          وعملا بنص المادة (13) من قواعد التحكيم الخاصة بالمركز بشأنقيد طلب
          التحكيم، وبعد سداد المحتكم لرسم التسجيل ( مرفق إيصال الإيداع )، تم
          دارسة طلب التحكيم وقيد الدعوى التحكيمية لدى المركز تحت رقم
          {` ARB${createdAt.split("-")[0]}-${pad(caseNumber)} `}
          وعين المركز مديرًا لإدارة الدعوى التحكيمية وهو الأستاذ
          <Input
            className="mb-1"
            type="text"
            name="caseManager"
            value={state.caseManager}
            onChange={handleText}
            placeholder="مديرًا"
          />
          على أن يبدأ المركز بإجراءات تبليغ المحتكم ضده بنسخة من طلب التحكيم
          ومرفقاته في غضون ثلاثة (3) أيام من تاريخ هذا الإشعار، علمًا بأن هذا
          الإشعار صادر بناء على ما ورد في طلب التحكيم بيانات وادعاءات.
        </p>
        <p>
          الرجاء تسجيل الدخول لاستخدام المنصة الإلكترونية للمركز عبر الرابط
          <br />
          <a href="http://portal.iicra.com/login" target="blank">
            iicra.com
          </a>
          <br />
          البريد الإلكتروني : {claimantEmail}
          <br />
          كلمة المرور : <b>********</b>
        </p>

        <p>
          للمزيد من الاستفسارات، يرجى التواصل معنا عبر البريد الإلكتروني:
          info@iicra.com
        </p>

        <h6>
          <b>
            وتفضلوا بقبول فائق التقدير والاحترام <br />
            <br />
            التوقيع والختم <br />
            رامي سليمان <br />
            الرئيس التنفيذى <br />
            المركز الإسلامي الدولي للصلح والتحكيم
            <br />
          </b>
        </h6>
      </section>
    );
  };

  return (
    <>
      <Header
        data={props.location.state}
        stepName={document.dir == "ltr" ? "RFA" : "طلب التحكيم"}
        stepPathPrev="rfa"
        stepPath="rfa"
        name={document.dir == "ltr" ? "Approved" : "وافق"}
      />
      <Container className="shadow-lg formUserContainer">
        <h6 className="center">
          {document.dir == "ltr"
            ? "Acknowledgement of RFA"
            : "إقرار بطلب التحكيم"}
        </h6>

        <Card className="cardBg">
          <CardHeader className="letterContainer">
            <img
              className="header"
              src={header}
              alt="international islamic arbitration letter head"
            />
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

export default Confirmation;
