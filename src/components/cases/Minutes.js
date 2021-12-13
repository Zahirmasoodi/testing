import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Table,
  Card,
  CardBody,
  Button,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
// import CKEditor from "react-ckeditor-component";
import jsPDF from "jspdf";
import axios from "axios";
import logo from "../../assets/logo.png";
import Swal from "sweetalert2";
import { getEnvironment } from "../../config";
// import Hearing from "./Hearing";
import pad from "../../pad";
import stamp from "../../assets/stamp.png";
import stampSign from "../../assets/stampSign.png";
// import myFont from "../form/jspdfArabic";
import myFont from "../../Majalli";

import font from "../../Amiri-Bold-normal";

const Minutes = (props) => {
  const baseURL = getEnvironment().apiUrl;

  const [state, setState] = useState({
    placeOfMeeting: "location",
    hearingNumber: "",
    orderFile: "",
    //
    typeOfOrder: "",
    order: "",
    recipient: "",
    //
    typeOfOrder1: "",
    order1: "",
    recipient1: "",
    //
    typeOfOrder2: "",
    order2: "",
    recipient2: "",
    //
    chairmanAttendance: "",
    arbitratorAttendance: "",
    arbitratorAttendance1: "",
    arbitratorAttendance2: "",
    rapporteurAttendance: "",
    claimantAttendance: "",
    respondentAttendance: "",
    expertAttendance: "",
    witnessAttendance: "",
    interpretorAttendance: "",
    //
    tribunal: "1",
    doc: new jsPDF(),
  });
  const [dates, setDates] = useState({
    // respondentDeadline: "",
    // respondentDays: "",
    // claimantDeadline: "",
    // claimantDays: "",
    // tribunalOrder: "",
    startTime: "",
    endTime: "",
  });

  const role = JSON.parse(localStorage.getItem("iicra-token"));

  const [count, setCount] = useState(1);
  const [content, setContent] = useState({
    contentRespondent: "12",
    contentClaimant: "34",
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleDates = (e) => {
    setDates({
      ...dates,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (data) => {
    generatePdf();

    const pdf = state.doc.output("blob");

    const formData = new FormData();
    formData.append("author", role);
    formData.append("type", "hearing");
    formData.append("arbit", pdf);

    axios
      .post(`${baseURL}/form/minutes/${props.location.state._id}`, formData)
      .then(() => {
        Swal.fire({
          title: "SENT",
          icon: "success",
        });
        props.history.push({
          pathname: "/email/hearing",
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

  const updateContent = (newContent) => {
    setContent(newContent);
  };

  const onChange = (evt) => {
    var newContent = evt.editor.getData();
    setContent(newContent);
    console.log("CONTENT :: ", evt.editor);
  };

  const onBlur = (evt) => {
    console.log("onBlur event called with event info: ", evt);
  };

  const afterPaste = (evt) => {
    console.log("afterPaste event called with event info: ", evt);
  };

  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();

  const generatePdf = () => {
    state.doc.rect(5, 5, 200, 287);
    state.doc.addImage(logo, "png", 90, 7, 28, 26);
    state.doc.setFontSize(14);
    let lineCount = 38;
    state.doc.text(`Minutes of Main Hearing`, 105, lineCount, "center");
    state.doc.text(
      `Arbitration Case No: ARB${
        props.location.state.createdAt.split("-")[0]
      }-${pad(props.location.state.caseNumber)}`,
      105,
      (lineCount += 6),
      "center"
    );
    state.doc.text(
      `Held on ${date}, ${dates.startTime}`,
      105,
      (lineCount += 6),
      "center"
    );
    state.doc.text(
      "At International Islamic Center for Reconciliation and Arbitration, Dubai, UAE",
      105,
      (lineCount += 6),
      "center"
    );
    state.doc.setFontSize(10);
    state.doc.text("1.", 15, (lineCount += 10));
    state.doc.text("Name of the Claimant: ", 20, lineCount);
    state.doc.text(props.location.state.claimantName, 70, lineCount);
    state.doc.text("Nationality", 20, (lineCount += 5));
    state.doc.text(props.location.state.claimantNationality, 70, lineCount);
    state.doc.text("Address", 20, (lineCount += 5));
    state.doc.text(props.location.state.claimantAddress, 70, lineCount);
    state.doc.text("Phone", 20, (lineCount += 5));
    state.doc.text(props.location.state.claimantPhone, 70, lineCount);
    state.doc.text("Email", 20, (lineCount += 5));
    state.doc.text(props.location.state.claimantEmail, 70, lineCount);

    if (props.location.state.legalAuthEmail) {
      state.doc.text("Legal Representative: ", 20, (lineCount += 10));
      state.doc.text(props.location.state.legalAuthFirmName, 70, lineCount);
      state.doc.text("Nationality", 20, (lineCount += 5));
      state.doc.text(props.location.state.legalAuthNationality, 70, lineCount);
      state.doc.text("Address", 20, (lineCount += 5));
      state.doc.text(props.location.state.legalAuthAddress, 70, lineCount);
      state.doc.text("Phone", 20, (lineCount += 5));
      state.doc.text(props.location.state.legalAuthPhone, 70, lineCount);
      state.doc.text("Email", 20, (lineCount += 5));
      state.doc.text(props.location.state.legalAuthEmail, 70, lineCount);
    }

    if (props.location.state.claimantEmail2) {
      state.doc.text("Additional Claimant: ", 20, (lineCount += 10));
      state.doc.text(props.location.state.claimantName2, 70, lineCount);
      state.doc.text("Nationality", 20, (lineCount += 5));
      state.doc.text(props.location.state.claimantNationality2, 70, lineCount);
      state.doc.text("Address", 20, (lineCount += 5));
      state.doc.text(props.location.state.claimantAddress2, 70, lineCount);
      state.doc.text("Phone", 20, (lineCount += 5));
      state.doc.text(props.location.state.claimantPhone2, 70, lineCount);
      state.doc.text("Email", 20, (lineCount += 5));
      state.doc.text(props.location.state.claimantEmail2, 17000, lineCount);
      if (props.location.state.legalAuthEmail2) {
        state.doc.text("Legal Representative: ", 20, (lineCount += 10));
        state.doc.text(props.location.state.legalAuthFirmName2, 70, lineCount);
        state.doc.text("Nationality", 20, (lineCount += 5));
        state.doc.text(
          props.location.state.legalAuthNationality2,
          70,
          lineCount
        );
        state.doc.text("Address", 20, (lineCount += 5));
        state.doc.text(props.location.state.legalAuthAddress2, 70, lineCount);
        state.doc.text("Phone", 20, (lineCount += 5));
        state.doc.text(props.location.state.legalAuthPhone2, 70, lineCount);
        state.doc.text("Email", 20, (lineCount += 5));
        state.doc.text(props.location.state.legalAuthEmail2, 70, lineCount);
      }
    }

    state.doc.text("2.", 15, (lineCount += 10));
    state.doc.text("Name of the Respondent: ", 20, lineCount);
    state.doc.text(props.location.state.respondentName, 70, lineCount);
    state.doc.text("Nationality", 20, (lineCount += 5));
    state.doc.text(props.location.state.respondentNationality, 70, lineCount);
    state.doc.text("Address", 20, (lineCount += 5));
    state.doc.text(props.location.state.respondentAddress, 70, lineCount);
    state.doc.text("Phone", 20, (lineCount += 5));
    state.doc.text(props.location.state.respondentPhone, 70, lineCount);
    state.doc.text("Email", 20, (lineCount += 5));
    state.doc.text(props.location.state.respondentEmail, 70, lineCount);

    if (props.location.state.respondentEmail2) {
      state.doc.text("Additional Respondent: ", 20, (lineCount += 10));
      state.doc.text(props.location.state.respondentName2, 70, lineCount);
      state.doc.text("Nationality", 20, (lineCount += 5));
      state.doc.text(
        props.location.state.respondentNationality2,
        70,
        lineCount
      );
      state.doc.text("Address", 20, (lineCount += 5));
      state.doc.text(props.location.state.respondentAddress2, 70, lineCount);
      state.doc.text("Phone", 20, (lineCount += 5));
      state.doc.text(props.location.state.respondentPhone2, 70, lineCount);
      state.doc.text("Email", 20, (lineCount += 5));
      state.doc.text(props.location.state.respondentEmail2, 70, lineCount);
    }

    state.doc.text("3.", 15, (lineCount += 10));
    state.doc.text("Arbitral Tribunal:", 20, lineCount);

    if (props.location.state.arbitrators.length > 0) {
      props.location.state.arbitrators.map((arbitrator) => {
        state.doc.text("Arbitrator", 20, (lineCount += 5));
        state.doc.text(arbitrator.name, 70, lineCount);
        state.doc.text("Nationality", 20, (lineCount += 5));
        // state.doc.text(arbitrator.nationality, 70, lineCount);
        state.doc.text("Address", 20, (lineCount += 5));
        state.doc.text(arbitrator.address, 70, lineCount);
        state.doc.text("Phone", 20, (lineCount += 5));
        state.doc.text(arbitrator.phone, 70, lineCount);
        state.doc.text("Email", 20, (lineCount += 5));
        state.doc.text(arbitrator.email, 70, lineCount);
      });
    }

    state.doc.text("4.", 15, (lineCount += 10));
    state.doc.text(
      `The Main Arbitration Hearing was held via IICRA E-platform at ${dates.startTime} on ${date}. In accordance with E-Arbitration`,
      20,
      lineCount
    );
    state.doc.text(
      "Platform Rules of International Islmaic Centre for Reconciliation and Arbitration (IICRA).",
      20,
      (lineCount += 5)
    );

    if (props.location.state.arbitrators.length == "3") {
      setState({ ...state, tribunal: "3" });
    }

    if (state.tribunal == "3") {
      if (state.chairmanAttendance == "Present") {
        state.doc.text("Chairman", 20, (lineCount += 10));
        // state.doc.text("Present", 70, lineCount);
      }
      if (state.arbitratorAttendance1 == "Present") {
        state.doc.text("Co-Arbitrator", 20, (lineCount += 5));
        // state.doc.text(state.arbitratorAttendance1, 70, lineCount);
      }
      if (state.arbitratorAttendance2 == "Present") {
        state.doc.text("Co-Arbitrator", 20, (lineCount += 5));
        // state.doc.text(state.arbitratorAttendance2, 70, lineCount);
      }
    } else if (
      state.tribunal == "1" &&
      state.arbitratorAttendance == "Present"
    ) {
      state.doc.text("Sole Arbitrator", 20, (lineCount += 10));
      // state.doc.text(state.arbitratorAttendance2, 70, lineCount);
    }
    if (state.rapporteurAttendance == "Present") {
      state.doc.text("Rapporteur", 20, (lineCount += 5));
      // state.doc.text(state.rapporteurAttendance, 70, lineCount);
    }
    if (state.claimantAttendance == "Present") {
      state.doc.text("Claimant", 20, (lineCount += 5));
      // state.doc.text(state.claimantAttendance, 70, lineCount);
    }
    if (state.claimantAttendance2 == "Present") {
      state.doc.text("Additional Claimant", 20, (lineCount += 5));
      // state.doc.text(state.claimantAttendance, 70, lineCount);
    }
    if (state.respondentAttendance == "Present") {
      state.doc.text("Respondent", 20, (lineCount += 5));
      // state.doc.text(state.respondentAttendance, 70, lineCount);
    }
    if (state.respondentAttendance2 == "Present") {
      state.doc.text("Additional Respondent", 20, (lineCount += 5));
      // state.doc.text(state.respondentAttendance, 70, lineCount);
    }
    if (state.expertAttendance == "Present") {
      state.doc.text("Expert", 20, (lineCount += 5));
      // state.doc.text(state.expertAttendance, 70, lineCount);
    }
    if (state.witnessAttendance == "Present") {
      state.doc.text("Witnesses", 20, (lineCount += 5));
      // state.doc.text(state.witnessAttendance, 70, lineCount);
    }
    if (state.interpretorAttendance == "Present") {
      state.doc.text("Interpreter", 20, (lineCount += 5));
      // state.doc.text(state.interpretorAttendance, 70, lineCount);
    }
    state.doc.text("6.", 15, (lineCount += 10));
    state.doc.text(
      "The Attendees have confirmed that they are satisfied with the way the Arbitral Proceedings was conducted and they",
      20,
      lineCount
    );

    state.doc.text(
      "confirmed that they do not have any objections in this regard.",
      20,
      (lineCount += 5)
    );
    state.doc.text("7.", 15, (lineCount += 10));
    state.doc.text(
      "The Legal Representative of the Claimant stated that",
      20,
      lineCount
    );
    const notesClaimant = content.contentClaimant.match(/.{1,110}/g);
    const notesRespondent = content.contentRespondent.match(/.{1,110}/g);

    // const notes = ["Zahir"];

    notesClaimant.map((note) => {
      if (lineCount > 280) {
        state.doc.addPage();
        state.doc.rect(5, 5, 200, 287);
        lineCount = 5;
      } else {
        state.doc.text(note, 22, (lineCount += 5), {
          maxWidth: 190,
          align: "justify",
        });
      }
    });

    state.doc.text("8.", 15, (lineCount += 10));
    state.doc.text(
      "The Legal Representative of the Respondent stated that",
      20,
      lineCount
    );
    notesRespondent.map((note) => {
      if (lineCount > 280) {
        state.doc.addPage();
        state.doc.rect(5, 5, 200, 287);
        lineCount = 5;
      } else {
        state.doc.text(note, 22, (lineCount += 5), {
          maxWidth: 190,
          align: "justify",
        });
      }
    });

    if (lineCount > 280) {
      state.doc.addPage();
      state.doc.rect(5, 5, 200, 287);
      lineCount = 10;
    }

    let orderTrimmed = state.order.match(/.{1,110}/g);

    if (state.order) {
      state.doc.text(`Order 1.`, 15, (lineCount += 10));
      state.doc.text(`Type of Order:`, 18, (lineCount += 5));
      state.doc.text(state.typeOfOrder, 100, lineCount);
      state.doc.text(`Recipient:`, 18, (lineCount += 5));
      state.doc.text(state.recipient, 100, lineCount);
      state.doc.text(`Order:`, 18, (lineCount += 5));
      orderTrimmed.map((ord) => {
        if (lineCount > 275) {
          state.doc.addPage();
          state.doc.rect(10, 10, 190, 275);
          lineCount = 10;
        } else {
          state.doc.text(ord, 21, (lineCount += 5));
        }
      });
    }

    let orderTrimmed1 = state.order1.match(/.{1,110}/g);
    if (state.order1) {
      state.doc.text(`Order 2.`, 15, (lineCount += 10));
      state.doc.text(`Type of Order:`, 18, (lineCount += 5));
      state.doc.text(state.typeOfOrder1, 100, lineCount);
      state.doc.text(`Recipient:`, 18, (lineCount += 5));
      state.doc.text(state.recipient1, 100, lineCount);
      state.doc.text(`Order:`, 18, (lineCount += 5));
      orderTrimmed1.map((ord) => {
        if (lineCount > 275) {
          state.doc.addPage();
          state.doc.rect(10, 10, 190, 275);
          lineCount = 10;
        } else {
          state.doc.text(ord, 21, (lineCount += 5));
        }
      });
    }

    let orderTrimmed2 = state.order2.match(/.{1,110}/g);
    if (state.order2) {
      state.doc.text(`Order 3.`, 15, (lineCount += 10));
      state.doc.text(`Type of Order:`, 18, (lineCount += 5));
      state.doc.text(state.typeOfOrder2, 100, lineCount);
      state.doc.text(`Recipient:`, 18, (lineCount += 5));
      state.doc.text(state.recipient2, 100, lineCount);
      state.doc.text(`Order:`, 18, (lineCount += 5));
      orderTrimmed2.map((ord) => {
        if (lineCount > 275) {
          state.doc.addPage();
          state.doc.rect(10, 10, 190, 275);
          lineCount = 10;
        } else {
          state.doc.text(ord, 21, (lineCount += 5));
        }
      });
    }

    state.doc.text(
      `The Meeting adjourned at ${dates.endTime} and accordingly the Minutes has been signed by the Parties, Arbitral Tribunal`,
      105,
      (lineCount += 10),
      "center"
    );
    state.doc.text(
      "and Arbitral Tribunal Secretary.",
      105,
      (lineCount += 5),
      "center"
    );
    state.doc.addImage(stamp, "jpeg", 70, (lineCount += 5), 50, 24);
    state.doc.addImage(stampSign, "jpeg", 50, (lineCount += 5), 50, 24);

    state.doc.save("new");
    setState({ ...state, doc: new jsPDF() });
  };

  const generatePdfArabic = () => {
    state.doc.addFileToVFS("MyFont.ttf", myFont);
    state.doc.addFont("MyFont.ttf", "MyFont", "normal");
    state.doc.addFileToVFS("MyFontBold.ttf", font);
    state.doc.addFont("MyFontBold.ttf", "MyFontBold", "normal");
    state.doc.setFont("MyFont");

    state.doc.rect(5, 5, 200, 287);
    state.doc.addImage(logo, "png", 90, 7, 28, 26);
    state.doc.setFontSize(14);
    let lineCount = 38;
    state.doc.text(`محضر جلسة التحكيم الرئيسية`, 105, lineCount, "center");
    state.doc.text(
      `الدعوى التحكيمية رقم : ARB${
        props.location.state.createdAt.split("-")[0]
      }-${pad(props.location.state.caseNumber)}`,
      105,
      (lineCount += 6),
      "center"
    );
    state.doc.text(
      `المنعقدة بتاريخ  ${date}, ${dates.startTime}`,
      105,
      (lineCount += 6),
      "center"
    );
    state.doc.text(
      "المركز الإسلامي الدولي للصلح والتحكيم، دبي، الإمارات",
      105,
      (lineCount += 6),
      "center"
    );
    state.doc.setFontSize(10);
    state.doc.text("1.", 195, (lineCount += 10), "right");
    state.doc.text("المحتكم", 190, lineCount, "right");
    state.doc.text(props.location.state.claimantName, 130, lineCount, "right");
    state.doc.text("الجنسية", 190, (lineCount += 5), "right");
    state.doc.text(
      props.location.state.claimantNationality,
      130,
      lineCount,
      "right"
    );
    state.doc.text("العنوان الكامل", 190, (lineCount += 5), "right");
    state.doc.text(
      props.location.state.claimantAddress,
      130,
      lineCount,
      "right"
    );
    state.doc.text("هاتف متحرك", 190, (lineCount += 5), "right");
    state.doc.text(props.location.state.claimantPhone, 130, lineCount, "right");
    state.doc.text("البريد الالكتروني", 190, (lineCount += 5), "right");
    state.doc.text(props.location.state.claimantEmail, 130, lineCount, "right");

    if (props.location.state.legalAuthEmail) {
      state.doc.text(
        "إسم الممثل القانوني للمحتكم (الحاضر عن المحتكم)",
        190,
        (lineCount += 10),
        "right"
      );
      state.doc.text(
        props.location.state.legalAuthFirmName,
        130,
        lineCount,
        "right"
      );
      state.doc.text("الجنسية", 190, (lineCount += 5), "right");
      state.doc.text(
        props.location.state.legalAuthNationality,
        130,
        lineCount,
        "right"
      );
      state.doc.text("العنوان الكامل", 190, (lineCount += 5), "right");
      state.doc.text(
        props.location.state.legalAuthAddress,
        130,
        lineCount,
        "right"
      );
      state.doc.text("هاتف متحرك", 190, (lineCount += 5), "right");
      state.doc.text(
        props.location.state.legalAuthPhone,
        130,
        lineCount,
        "right"
      );
      state.doc.text("البريد الإلكتروني", 190, (lineCount += 5), "right");
      state.doc.text(
        props.location.state.legalAuthEmail,
        130,
        lineCount,
        "right"
      );
    }

    if (props.location.state.claimantEmail2) {
      state.doc.text("المحتكم", 190, (lineCount += 10), "right");
      state.doc.text(
        props.location.state.claimantName2,
        130,
        lineCount,
        "right"
      );
      state.doc.text("الجنسية", 190, (lineCount += 5), "right");
      state.doc.text(
        props.location.state.claimantNationality2,
        130,
        lineCount,
        "right"
      );
      state.doc.text("العنوان الكامل", 190, (lineCount += 5), "right");
      state.doc.text(
        props.location.state.claimantAddress2,
        130,
        lineCount,
        "right"
      );
      state.doc.text("هاتف متحرك", 190, (lineCount += 5), "right");
      state.doc.text(
        props.location.state.claimantPhone2,
        130,
        lineCount,
        "right"
      );
      state.doc.text("البريد الإلكتروني", 190, (lineCount += 5), "right");
      state.doc.text(
        props.location.state.claimantEmail2,
        130,
        lineCount,
        "right"
      );
      if (props.location.state.legalAuthEmail2) {
        state.doc.text(
          "	إسم الممثل القانوني للمحتكم ",
          190,
          (lineCount += 10),
          "right"
        );
        state.doc.text(
          props.location.state.legalAuthFirmName2,
          130,
          lineCount,
          "right"
        );
        state.doc.text("الجنسية", 190, (lineCount += 5), "right");
        state.doc.text(
          props.location.state.legalAuthNationality2,
          130,
          lineCount,
          "right"
        );
        state.doc.text("العنوان الكامل", 190, (lineCount += 5), "right");
        state.doc.text(
          props.location.state.legalAuthAddress2,
          130,
          lineCount,
          "right"
        );
        state.doc.text("هاتف متحرك", 190, (lineCount += 5), "right");
        state.doc.text(
          props.location.state.legalAuthPhone2,
          130,
          lineCount,
          "right"
        );
        state.doc.text("البريد الإلكتروني", 190, (lineCount += 5), "right");
        state.doc.text(
          props.location.state.legalAuthEmail2,
          130,
          lineCount,
          "right"
        );
      }
    }

    state.doc.text("2.", 195, (lineCount += 10), "right");
    state.doc.text("إسم المحتكم ضده", 190, lineCount, "right");
    state.doc.text(
      props.location.state.respondentName,
      130,
      lineCount,
      "right"
    );
    state.doc.text("الجنسية", 190, (lineCount += 5), "right");
    state.doc.text(
      props.location.state.respondentNationality,
      130,
      lineCount,
      "right"
    );
    state.doc.text("العنوان الكامل", 190, (lineCount += 5), "right");
    state.doc.text(
      props.location.state.respondentAddress,
      130,
      lineCount,
      "right"
    );
    state.doc.text("هاتف متحرك", 190, (lineCount += 5), "right");
    state.doc.text(
      props.location.state.respondentPhone,
      130,
      lineCount,
      "right"
    );
    state.doc.text("البريد الإلكتروني", 190, (lineCount += 5), "right");
    state.doc.text(
      props.location.state.respondentEmail,
      130,
      lineCount,
      "right"
    );

    if (props.location.state.respondentEmail2) {
      state.doc.text("إسم المحتكم ضده", 190, (lineCount += 10), "right");
      state.doc.text(
        props.location.state.respondentName2,
        130,
        lineCount,
        "right"
      );
      state.doc.text("الجنسية", 190, (lineCount += 5), "right");
      state.doc.text(
        props.location.state.respondentNationality2,
        130,
        lineCount,
        "right"
      );
      state.doc.text("العنوان الكامل", 190, (lineCount += 5), "right");
      state.doc.text(
        props.location.state.respondentAddress2,
        130,
        lineCount,
        "right"
      );
      state.doc.text("البريد الإلكتروني", 190, (lineCount += 5), "right");
      state.doc.text(
        props.location.state.respondentPhone2,
        130,
        lineCount,
        "right"
      );
      state.doc.text("هاتف متحرك", 190, (lineCount += 5), "right");
      state.doc.text(
        props.location.state.respondentEmail2,
        130,
        lineCount,
        "right"
      );
    }

    state.doc.text("3.", 195, (lineCount += 10), "right");
    state.doc.text(
      ":هيئة التحكيم (محكم فرد أو هيئة تحكيم ثلاثية)",
      190,
      lineCount,
      "right"
    );

    if (props.location.state.arbitrators.length > 0) {
      props.location.state.arbitrators.map((arbitrator) => {
        state.doc.text("أعضاء هيئة التحكيم", 190, (lineCount += 5), "right");
        state.doc.text(arbitrator.name, 130, lineCount, "right");
        state.doc.text("الجنسية", 190, (lineCount += 5), "right");
        // state.doc.text(arbitrator.nationality, 130, lineCount);
        state.doc.text("العنوان الكامل", 190, (lineCount += 5), "right");
        state.doc.text(arbitrator.address, 130, lineCount, "right");
        state.doc.text("هاتف متحرك", 190, (lineCount += 5), "right");
        state.doc.text(arbitrator.phone, 130, lineCount, "right");
        state.doc.text("البريد الإلكتروني", 190, (lineCount += 5), "right");
        state.doc.text(arbitrator.email, 130, lineCount, "right");
      });
    }

    state.doc.text("4.", 195, (lineCount += 10), "right");
    state.doc.text(
      `بدأت جلسة التحكيم الرئيسية عبر المنصة الإلكترونية للمركز في الساعة ${dates.startTime} بتاريخ ${date}، وعملًا بلائحة منصة التحكيم الإلكترونية الخاصة بالمركز`,
      190,
      lineCount,
      "right"
    );

    state.doc.text("5.", 195, (lineCount += 10), "right");
    state.doc.text("الحضور هم مما يلي", 190, lineCount, "right");

    if (props.location.state.arbitrators.length == "3") {
      setState({ ...state, tribunal: "3" });
    }

    if (state.tribunal == "3") {
      if (state.chairmanAttendance == "Present") {
        state.doc.text("Chairman", 190, (lineCount += 10), "right");
        // state.doc.text("Present", 130, lineCount);
      }
      if (state.arbitratorAttendance1 == "Present") {
        state.doc.text("Co-Arbitrator", 190, (lineCount += 5), "right");
        // state.doc.text(state.arbitratorAttendance1, 130, lineCount);
      }
      if (state.arbitratorAttendance2 == "Present") {
        state.doc.text("Co-Arbitrator", 190, (lineCount += 5), "right");
        // state.doc.text(state.arbitratorAttendance2, 130, lineCount);
      }
    } else if (
      state.tribunal == "1" &&
      state.arbitratorAttendance == "Present"
    ) {
      state.doc.text("Sole Arbitrator", 190, (lineCount += 10), "right");
      // state.doc.text(state.arbitratorAttendance2, 130, lineCount);
    }
    if (state.rapporteurAttendance == "Present") {
      state.doc.text("Rapporteur", 190, (lineCount += 5), "right");
      // state.doc.text(state.rapporteurAttendance, 130, lineCount);
    }
    if (state.claimantAttendance == "Present") {
      state.doc.text("Claimant", 190, (lineCount += 5), "right");
      // state.doc.text(state.claimantAttendance, 130, lineCount);
    }
    if (state.claimantAttendance2 == "Present") {
      state.doc.text("Additional Claimant", 190, (lineCount += 5), "right");
      // state.doc.text(state.claimantAttendance, 130, lineCount);
    }
    if (state.respondentAttendance == "Present") {
      state.doc.text("Respondent", 190, (lineCount += 5), "right");
      // state.doc.text(state.respondentAttendance, 130, lineCount);
    }
    if (state.respondentAttendance2 == "Present") {
      state.doc.text("Additional Respondent", 190, (lineCount += 5), "right");
      // state.doc.text(state.respondentAttendance, 130, lineCount);
    }
    if (state.expertAttendance == "Present") {
      state.doc.text("Expert", 190, (lineCount += 5), "right");
      // state.doc.text(state.expertAttendance, 130, lineCount);
    }
    if (state.witnessAttendance == "Present") {
      state.doc.text("Witnesses", 190, (lineCount += 5), "right");
      // state.doc.text(state.witnessAttendance, 130, lineCount);
    }
    if (state.interpretorAttendance == "Present") {
      state.doc.text("Interpreter", 190, (lineCount += 5), "right");
      // state.doc.text(state.interpretorAttendance, 130, lineCount);
    }
    state.doc.text("6.", 195, (lineCount += 10), "right");
    state.doc.text(
      "أكد الحضور بأنهم قبلوا بالطريقة التي تم بها سير إجراءات عقد الاجتماع، ولا توجد لديهم أي اعتراضات في هذا الصدد.",
      190,
      lineCount,
      "right"
    );

    state.doc.text("7.", 195, (lineCount += 10), "right");
    state.doc.text("أفاد الممثل القانوني للمحتكم بأن", 190, lineCount, "right");
    const notesClaimant = content.contentClaimant.match(/.{1,110}/g);
    const notesRespondent = content.contentRespondent.match(/.{1,110}/g);

    // const notes = ["Zahir"];

    notesClaimant.map((note) => {
      if (lineCount > 280) {
        state.doc.addPage();
        state.doc.rect(5, 5, 200, 287);
        lineCount = 5;
      } else {
        state.doc.text(note, 188, (lineCount += 5), "right");
      }
    });

    state.doc.text("8.", 195, (lineCount += 10), "right");
    state.doc.text(
      "أفاد الممثل القانوني للمحتكم ضده بأن ",
      190,
      lineCount,
      "right"
    );
    notesRespondent.map((note) => {
      if (lineCount > 280) {
        state.doc.addPage();
        state.doc.rect(5, 5, 200, 287);
        lineCount = 5;
      } else {
        state.doc.text(note, 188, (lineCount += 5), "right");
      }
    });

    if (lineCount > 280) {
      state.doc.addPage();
      state.doc.rect(5, 5, 200, 287);
      lineCount = 10;
    }

    let orderTrimmed = state.order.match(/.{1,110}/g);

    if (state.order) {
      state.doc.text(`Order 1.`, 195, (lineCount += 10), "right");
      state.doc.text(`Type of Order:`, 192, (lineCount += 5), "right");
      state.doc.text(state.typeOfOrder, 100, lineCount, "right");
      state.doc.text(`Recipient:`, 192, (lineCount += 5), "right");
      state.doc.text(state.recipient, 100, lineCount, "right");
      state.doc.text(`Order:`, 192, (lineCount += 5), "right");
      orderTrimmed.map((ord) => {
        if (lineCount > 275) {
          state.doc.addPage();
          state.doc.rect(10, 10, 190, 275);
          lineCount = 10;
        } else {
          state.doc.text(ord, 189, (lineCount += 5), "right");
        }
      });
    }

    let orderTrimmed1 = state.order1.match(/.{1,110}/g);
    if (state.order1) {
      state.doc.text(`Order 2.`, 195, (lineCount += 10), "right");
      state.doc.text(`Type of Order:`, 192, (lineCount += 5), "right");
      state.doc.text(state.typeOfOrder1, 100, lineCount, "right");
      state.doc.text(`Recipient:`, 192, (lineCount += 5), "right");
      state.doc.text(state.recipient1, 100, lineCount, "right");
      state.doc.text(`Order:`, 192, (lineCount += 5), "right");
      orderTrimmed1.map((ord) => {
        if (lineCount > 275) {
          state.doc.addPage();
          state.doc.rect(10, 10, 190, 275);
          lineCount = 10;
        } else {
          state.doc.text(ord, 189, (lineCount += 5), "right");
        }
      });
    }

    let orderTrimmed2 = state.order2.match(/.{1,110}/g);
    if (state.order2) {
      state.doc.text(`Order 3.`, 195, (lineCount += 10), "right");
      state.doc.text(`Type of Order:`, 192, (lineCount += 5), "right");
      state.doc.text(state.typeOfOrder2, 100, lineCount, "right");
      state.doc.text(`Recipient:`, 192, (lineCount += 5), "right");
      state.doc.text(state.recipient2, 100, lineCount, "right");
      state.doc.text(`Order:`, 192, (lineCount += 5), "right");
      orderTrimmed2.map((ord) => {
        if (lineCount > 275) {
          state.doc.addPage();
          state.doc.rect(10, 10, 190, 275);
          lineCount = 10;
        } else {
          state.doc.text(ord, 189, (lineCount += 5), "right");
        }
      });
    }

    state.doc.text("قرارات هيئة التحكيم", 105, (lineCount += 10), "center");

    state.doc.text(
      `انتهى الجلسة  في الوقت ساعة ${dates.endTime}، وتم توقيع المحضر من قبل الحضور على النحو الماثل. `,
      105,
      (lineCount += 10),
      "center"
    );

    state.doc.addImage(stamp, "jpeg", 130, (lineCount += 5), 50, 24);
    state.doc.addImage(stampSign, "jpeg", 50, (lineCount += 5), 50, 24);

    state.doc.save("new");
    setState({ ...state, doc: new jsPDF() });
  };

  return (
    <>
      <Container fluid style={styles.crumbContainer}>
        <Row>
          <Col>
            {role == "admin" ? (
              <Breadcrumb>
                <BreadcrumbItem
                  onClick={() =>
                    props.history.push({
                      pathname: "/dashboard",
                    })
                  }
                  style={styles.crumbTabs}
                >
                  Dashboard
                </BreadcrumbItem>
                <BreadcrumbItem
                  onClick={() =>
                    props.history.push({
                      pathname: "/cases",
                    })
                  }
                  style={styles.crumbTabs}
                >
                  Cases
                </BreadcrumbItem>
                <BreadcrumbItem
                  onClick={() =>
                    props.history.push({
                      pathname: "/cases/expanded",
                      state: props.location.state,
                    })
                  }
                  style={styles.crumbTabs}
                >
                  Details
                </BreadcrumbItem>
                <BreadcrumbItem
                  onClick={() =>
                    props.history.push({
                      pathname: "/cases/timeline",
                      state: props.location.state,
                    })
                  }
                  style={styles.crumbTabs}
                >
                  Timeline
                </BreadcrumbItem>
                <BreadcrumbItem
                  onClick={() =>
                    props.history.push({
                      pathname: "/cases/hearing",
                      state: props.location.state,
                    })
                  }
                  style={styles.crumbTabs}
                >
                  Hearing(s)
                </BreadcrumbItem>
                <BreadcrumbItem style={styles.crumb}>
                  Minutes -{" "}
                  {props.location.state.caseNumber
                    ? `ARB${props.location.state.createdAt.split("-")[0]}-${pad(
                        props.location.state.caseNumber
                      )}`
                    : "CASE/ARB"}
                </BreadcrumbItem>
              </Breadcrumb>
            ) : null}
          </Col>
        </Row>
      </Container>
      <Container fluid style={styles.formUserContainer}>
        <h6 style={styles.center} onClick={() => generatePdfArabic()}>
          Minutes of Hearing
        </h6>

        <Row className="ml-5 mr-5 mt-3 mb-3 ">
          <Col>
            <Card className="shadow">
              <CardBody>
                Praise be to Allah almighty, the Lord of the worlds, and prayers
                and peace be upon the most honorable messengers, our master
                Muhammad, his family and all his companions.
                <br />
                With reference to CASE{" "}
                {props.location.state.caseNumber
                  ? `ARB${props.location.state.createdAt.split("-")[0]}-${pad(
                      props.location.state.caseNumber
                    )}`
                  : "CASE/ARB"}{" "}
                between {props.location.state.claimantName} and{" "}
                {props.location.state.respondentName}. Based on IICRA
                Arbitration rules, the hearing is being held on{" "}
                {now.toLocaleDateString()} at {now.toLocaleTimeString()} in{" "}
                <Label>
                  <Input
                    type="text"
                    id="placeOfMeeting"
                    name="placeOfMeeting"
                    value={state.placeOfMeeting}
                    onChange={handleChange}
                  />
                </Label>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* <Row className="ml-5 mr-5">
          <Col>
            <FormGroup check style={styles.radio}>
              <Label>Arbitration Hearing Number</Label>
              <Input
                type="text"
                name="hearingNumber"
                value={state.hearingNumber}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
        </Row> */}
        <Row className="ml-5 mr-5 pb-3">
          <Col>
            <Label>Meeting started at</Label>
            <Input
              type="time"
              id="startTime"
              name="startTime"
              value={dates.startTime}
              onChange={handleDates}
            />
          </Col>
          <Col>
            <Label>Meeting ended at</Label>

            <Input
              type="time"
              id="endTime"
              name="endTime"
              value={dates.endTime}
              onChange={handleDates}
            />
          </Col>

          <Col style={{ textAlign: "right" }}>
            <br />
            <Button color="success" onClick={handleSubmit}>
              Submit
            </Button>
          </Col>
        </Row>
        <Row className="ml-5 mr-5">
          <Col>
            <Table bordered hover style={styles.table}>
              <tbody>
                <tr>
                  <td>Arbitration Hearing Number</td>
                  <td style={styles.td2}>
                    <FormGroup check style={styles.radio}>
                      <Label>
                        <Input
                          type="select"
                          name="hearingNumber"
                          value={state.hearingNumber}
                          onChange={handleChange}
                          className="shadow-sm"
                        >
                          <option>01</option>
                          <option>02</option>
                          <option>03</option>
                          <option>04</option>
                          <option>05</option>
                        </Input>
                      </Label>
                    </FormGroup>
                  </td>
                </tr>
                <tr>
                  <td>Tribunal</td>
                  <td style={styles.td2}>
                    <FormGroup check style={styles.radio}>
                      <Label check>
                        <Input
                          type="select"
                          name="tribunal"
                          value={state.tribunal}
                          style={styles.tribunal}
                          onChange={handleChange}
                          className="shadow-sm"
                        >
                          <option>1</option>
                          <option>3</option>
                        </Input>
                      </Label>
                    </FormGroup>
                  </td>
                </tr>
                {state.tribunal == "3" ? (
                  <tr>
                    <td>Chairman</td>
                    <td style={styles.td2}>
                      <FormGroup check style={styles.radio}>
                        <Label check>
                          <Input
                            type="radio"
                            name="chairmanAttendance"
                            style={styles.pointer}
                            value="Present"
                            onChange={handleChange}
                          />
                          Present
                        </Label>
                      </FormGroup>
                    </td>
                  </tr>
                ) : null}
                {state.tribunal == "3" ? (
                  <>
                    <tr>
                      <td>Co Arbitrator</td>
                      <td style={styles.td2}>
                        <FormGroup check style={styles.radio}>
                          <Label check>
                            <Input
                              type="radio"
                              name="arbitratorAttendance1"
                              style={styles.pointer}
                              value="Present"
                              onChange={handleChange}
                            />{" "}
                            Present
                          </Label>
                        </FormGroup>
                      </td>
                    </tr>
                    <tr>
                      <td>Co Arbitrator</td>
                      <td style={styles.td2}>
                        <FormGroup check style={styles.radio}>
                          <Label check>
                            <Input
                              type="radio"
                              name="arbitratorAttendance2"
                              style={styles.pointer}
                              value="Present"
                              onChange={handleChange}
                            />{" "}
                            Present
                          </Label>
                        </FormGroup>
                      </td>
                    </tr>
                  </>
                ) : null}
                {state.tribunal == "1" ? (
                  <tr>
                    <td>Sole Arbitrator</td>
                    <td style={styles.td2}>
                      <FormGroup check style={styles.radio}>
                        <Label check>
                          <Input
                            type="radio"
                            name="arbitratorAttendance"
                            style={styles.pointer}
                            value="Present"
                            onChange={handleChange}
                          />{" "}
                          Present
                        </Label>
                      </FormGroup>
                    </td>
                  </tr>
                ) : null}

                <tr>
                  <td>Rapporteur</td>
                  <td style={styles.td2}>
                    <FormGroup check style={styles.radio}>
                      <Label check>
                        <Input
                          type="radio"
                          name="rapporteurAttendance"
                          style={styles.pointer}
                          value="Present"
                          onChange={handleChange}
                        />{" "}
                        Present
                      </Label>
                    </FormGroup>
                  </td>
                </tr>
                <tr>
                  <td>Claimant</td>
                  <td style={styles.td2}>
                    <FormGroup check style={styles.radio}>
                      <Label check>
                        <Input
                          type="radio"
                          name="claimantAttendance"
                          style={styles.pointer}
                          value="Present"
                          onChange={handleChange}
                        />{" "}
                        Present
                      </Label>
                    </FormGroup>
                  </td>
                </tr>
                <tr>
                  <td>Respondent</td>
                  <td style={styles.td2}>
                    <FormGroup check style={styles.radio}>
                      <Label check>
                        <Input
                          type="radio"
                          name="respondentAttendance"
                          style={styles.pointer}
                          value="Present"
                          onChange={handleChange}
                        />{" "}
                        Present
                      </Label>
                    </FormGroup>
                  </td>
                </tr>
                <tr>
                  <td>Expert</td>
                  <td style={styles.td2}>
                    <FormGroup check style={styles.radio}>
                      <Label check>
                        <Input
                          type="radio"
                          name="expertAttendance"
                          style={styles.pointer}
                          value="Present"
                          onChange={handleChange}
                        />{" "}
                        Present
                      </Label>
                    </FormGroup>
                  </td>
                </tr>
                <tr>
                  <td>Witness</td>
                  <td style={styles.td2}>
                    <FormGroup check style={styles.radio}>
                      <Label check>
                        <Input
                          type="radio"
                          name="witnessAttendance"
                          style={styles.pointer}
                          value="Present"
                          onChange={handleChange}
                        />{" "}
                        Present
                      </Label>
                    </FormGroup>
                  </td>
                </tr>
                <tr>
                  <td>Interpreter</td>
                  <td style={styles.td2}>
                    <FormGroup check style={styles.radio}>
                      <Label check>
                        <Input
                          type="radio"
                          name="interpretorAttendance"
                          style={styles.pointer}
                          value="Present"
                          onChange={handleChange}
                        />{" "}
                        Present
                      </Label>
                    </FormGroup>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <hr />
        <Row className="m-5">
          <Col>
            <Label>The Legal Representative of the Respondent states</Label>
            <Input
              type="textarea"
              className="shadow"
              name="content"
              id="content"
              value={content.contentClaimant}
              onChange={(e) =>
                setContent({ ...content, contentClaimant: e.target.value })
              }
              className="shadow-lg"
              rows="8"
            />
          </Col>
          <Col>
            <Label>The Legal Representative of the Claimant states</Label>
            <Input
              type="textarea"
              className="shadow-lg"
              name="content"
              id="content"
              value={content.contentRespondent}
              onChange={(e) =>
                setContent({ ...content, contentRespondent: e.target.value })
              }
              className="shadow"
              rows="8"
            />
          </Col>
        </Row>
        <hr />
        <Row className="m-5">
          <Col>
            <Form>
              <Row>
                <Col lg={8} md={8} sm={12}>
                  <FormGroup>
                    <Label>Order</Label>
                    <Input
                      type="textarea"
                      rows="5"
                      className="shadow"
                      id="order"
                      name="order"
                      value={state.order}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col lg={2} md={2} sm={6}>
                  <FormGroup>
                    <Label>Type of Order</Label>
                    <Input
                      type="select"
                      id="typeOfOrder"
                      name="typeOfOrder"
                      value={state.typeOfOrder}
                      onChange={handleChange}
                      className="shadow-sm"
                    >
                      <option></option>
                      <option>First Order</option>
                      <option>Reserved Order</option>
                      <option>Temporary Order</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col lg={2} md={2} sm={6}>
                  <FormGroup>
                    <Label>Recipient</Label>
                    <Input
                      type="select"
                      id="recipient"
                      name="recipient"
                      value={state.recipient}
                      onChange={handleChange}
                      className="shadow-sm"
                    >
                      <option></option>
                      <option>Claimant</option>
                      <option>Respondent</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              {count == "2" ? (
                <Row>
                  <Col lg={8} md={8} sm={12}>
                    <FormGroup>
                      <Label>Order</Label>
                      <Input
                        type="textarea"
                        rows="5"
                        className="shadow"
                        id="order1"
                        name="order1"
                        value={state.order1}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg={2} md={2} sm={6}>
                    <FormGroup>
                      <Label>Type of Order </Label>
                      <Input
                        type="select"
                        id="typeOfOrder1"
                        name="typeOfOrder1"
                        value={state.typeOfOrder1}
                        onChange={handleChange}
                        className="shadow-sm"
                      >
                        <option></option>
                        <option>First Order</option>
                        <option>Reserved Order</option>
                        <option>Temporary Order</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col lg={2} md={2} sm={6}>
                    <FormGroup>
                      <Label>Recipient</Label>
                      <Input
                        type="select"
                        id="recipient1"
                        name="recipient1"
                        value={state.recipient1}
                        onChange={handleChange}
                        className="shadow-sm"
                      >
                        <option></option>
                        <option>Claimant</option>
                        <option>Respondent</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
              ) : null}
              {count >= "3" ? (
                <>
                  <Row>
                    <Col lg={8} md={8} sm={12}>
                      <FormGroup>
                        <Label>Order</Label>
                        <Input
                          type="textarea"
                          rows="5"
                          className="shadow"
                          id="order1"
                          name="order1"
                          value={state.order1}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={2} md={2} sm={6}>
                      <FormGroup>
                        <Label>Type of Order </Label>
                        <Input
                          type="select"
                          id="typeOfOrder1"
                          name="typeOfOrder1"
                          value={state.typeOfOrder1}
                          onChange={handleChange}
                          className="shadow-sm"
                        >
                          <option></option>
                          <option>First Order</option>
                          <option>Reserved Order</option>
                          <option>Temporary Order</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col lg={2} md={2} sm={6}>
                      <FormGroup>
                        <Label>Recipient</Label>
                        <Input
                          type="select"
                          id="recipient1"
                          name="recipient1"
                          value={state.recipient1}
                          onChange={handleChange}
                          className="shadow-sm"
                        >
                          <option></option>
                          <option>Claimant</option>
                          <option>Respondent</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={8} md={8} sm={12}>
                      <FormGroup>
                        <Label>Order</Label>
                        <Input
                          type="textarea"
                          rows="5"
                          className="shadow"
                          id="order2"
                          name="order2"
                          value={state.order2}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={2} md={2} sm={6}>
                      <FormGroup>
                        <Label>Type of Order </Label>
                        <Input
                          type="select"
                          id="typeOfOrder2"
                          name="typeOfOrder2"
                          value={state.typeOfOrder2}
                          onChange={handleChange}
                          className="shadow-sm"
                        >
                          <option></option>
                          <option>First Order</option>
                          <option>Reserved Order</option>
                          <option>Temporary Order</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col lg={2} md={2} sm={6}>
                      <FormGroup>
                        <Label>Recipient</Label>
                        <Input
                          type="select"
                          id="recipient2"
                          name="recipient2"
                          value={state.recipient2}
                          onChange={handleChange}
                          className="shadow-sm"
                        >
                          <option></option>
                          <option>Claimant</option>
                          <option>Respondent</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                </>
              ) : null}
              <Button onClick={() => setCount(count + 1)}>Add Order</Button>
            </Form>
          </Col>
        </Row>
        <Row className="ml-5 mr-5 pb-3" style={{ textAlign: "right" }}>
          <Col>
            <Button onClick={handleSubmit}>Submit</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
const styles = {
  formUserContainer: {
    marginTop: "5vh",
    paddingTop: "5vh",
    backgroundColor: "#f6f6f6",
    minHeight: "100vh",
  },
  radio: {
    display: "inline",
    marginRight: "10vh",
  },
  table: {
    backgroundColor: "white",
    borderRadius: "5px",
  },
  td2: {
    textAlign: "right",
  },
  center: {
    color: "white",
    textAlign: "center",
    backgroundColor: "#008f53",
    padding: "1vh",
    borderRadius: "5px",
  },
  pointer: {
    cursor: "pointer",
    transform: "scale(1.2)",
    backgroundColor: "green",
  },
  crumbContainer: {
    width: "100vw",
    position: "fixed",
    top: "8vh",
    paddingLeft: "0px",
    paddingRight: "0px",
    zIndex: 9,
  },
  crumb: { color: "green", cursor: "not-allowed" },
  crumbTabs: {
    cursor: "pointer",
  },
};
export default Minutes;
