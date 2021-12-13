import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  Button,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
// import CKEditor from "react-ckeditor-component";
import jsPDF from "jspdf";
import axios from "axios";
import logo from "../../../assets/logo.png";
import Swal from "sweetalert2";
import { getEnvironment } from "../../../config";
// import SignatureCanvas from "react-signature-canvas";
import myFont from "../../../Majalli";
import pad from "../../../pad";
const Email24 = (props) => {
  const baseURL = getEnvironment().apiUrl;

  const [state, setState] = useState({
    placeOfMeeting: "",
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
    claimantAttendance2: "",
    respondentAttendance: "",
    respondentAttendance2: "",
    expertAttendance: "",
    witnessAttendance: "",
    interpretorAttendance: "",
    //
    tribunal: "1",
    doc: new jsPDF({
      encryption: {
        userPassword: "zahir",
        ownerPassword: "zahir",
        userPermissions: ["print"],
        // try changing the user permissions granted
      },
    }),
  });

  useEffect(() => {
    if (props.location.state.arbitrators.length > 0) {
      props.location.state.arbitrators.map((arbitrator) => {
        if (arbitrator.chairman) {
          setChairman(arbitrator);
        }
      });
    }
  }, []);

  const [trimmedDataURL, setTrimmedDataURL] = useState("");
  const [count, setCount] = useState(1);
  // const [content, setContent] = useState("Zahir ul Islam");
  const [chairman, setChairman] = useState();
  const [dates, setDates] = useState({
    respondentDeadline: "",
    respondentDays: "",
    claimantDeadline: "",
    claimantDays: "",
    tribunalOrder: "",
    startTime: "",
    endTime: "",
  });

  const role = JSON.parse(localStorage.getItem("iicra-token"));

  let today = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    day: "numeric",
    month: "long",
  };

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
    console.log(e.target);
  };

  const handleSubmit = (data) => {
    generatePdfArabic(props.location.state);
    // if (
    //   dates.respondentDeadline != "" &&
    //   dates.respondentDays != "" &&
    //   dates.claimantDeadline != "" &&
    //   dates.claimantDays != "" &&
    //   dates.tribunalOrder != ""
    // ) {
    //   if (
    //     count == "1" &&
    //     state.order != "" &&
    //     state.recipient != "" &&
    //     state.typeOfOrder != ""
    //   ) {
    //     document.dir == "ltr"
    //       ? generatePdf()
    //       : generatePdfArabic(props.location.state);

    //     const pdf = new File([state.doc.output("blob")], "test.pdf", {
    //       type: "application/pdf",
    //     });

    //     const formData = new FormData();
    //     formData.append("author", role);
    //     formData.append("type", "meetin");
    //     formData.append("arbit", pdf);

    //     // axios
    //     //   .post(`${baseURL}/form/minutes/${props.location.state._id}`, formData)
    //     //   .then(() => {
    //     //     Swal.fire({
    //     //       title: "SENT",
    //     //       icon: "success",
    //     //     });
    //     //     props.history.push({
    //     //       pathname: "/email/premeeting",
    //     //       state: props.location.state,
    //     //     });
    //     //   })
    //     //   .catch(() =>
    //     //     Swal.fire({
    //     //       title: "Something went Wrong",
    //     //       icon: "error",
    //     //     })
    //     //   );
    //   } else if (
    //     count == "2" &&
    //     state.order != "" &&
    //     state.recipient != "" &&
    //     state.typeOfOrder != "" &&
    //     state.order1 != "" &&
    //     state.recipient1 != "" &&
    //     state.typeOfOrder1 != ""
    //   ) {
    //     document.dir == "ltr"
    //       ? generatePdf()
    //       : generatePdfArabic(props.location.state);

    //     const pdf = new File([state.doc.output("blob")], "test.pdf", {
    //       type: "application/pdf",
    //     });

    //     const formData = new FormData();
    //     formData.append("author", role);
    //     formData.append("type", "meetin");
    //     formData.append("arbit", pdf);

    //     // axios
    //     //   .post(`${baseURL}/form/minutes/${props.location.state._id}`, formData)
    //     //   .then(() => {
    //     //     Swal.fire({
    //     //       title: "SENT",
    //     //       icon: "success",
    //     //     });
    //     //     props.history.push({
    //     //       pathname: "/email/premeeting",
    //     //       state: props.location.state,
    //     //     });
    //     //   })
    //     //   .catch(() =>
    //     //     Swal.fire({
    //     //       title: "Something went Wrong",
    //     //       icon: "error",
    //     //     })
    //     //   );
    //   } else if (
    //     count == "3" &&
    //     state.order != "" &&
    //     state.recipient != "" &&
    //     state.typeOfOrder != "" &&
    //     state.order1 != "" &&
    //     state.recipient1 != "" &&
    //     state.typeOfOrder1 != "" &&
    //     state.order2 != "" &&
    //     state.recipient2 != "" &&
    //     state.typeOfOrder2 != ""
    //   ) {
    //     document.dir == "ltr"
    //       ? generatePdf()
    //       : generatePdfArabic(props.location.state);

    //     const pdf = new File([state.doc.output("blob")], "test.pdf", {
    //       type: "application/pdf",
    //     });

    //     const formData = new FormData();
    //     formData.append("author", role);
    //     formData.append("type", "meetin");
    //     formData.append("arbit", pdf);

    //     // axios
    //     //   .post(`${baseURL}/form/minutes/${props.location.state._id}`, formData)
    //     //   .then(() => {
    //     //     Swal.fire({
    //     //       title: "SENT",
    //     //       icon: "success",
    //     //     });
    //     //     props.history.push({
    //     //       pathname: "/email/premeeting",
    //     //       state: props.location.state,
    //     //     });
    //     //   })
    //     //   .catch(() =>
    //     //     Swal.fire({
    //     //       title: "Something went Wrong",
    //     //       icon: "error",
    //     //     })
    //     //   );
    //   } else {
    //     Swal.fire({
    //       text: `Please fill all the fields! = ${count}`,
    //       icon: "warning",
    //     });
    //   }
    // } else {
    //   Swal.fire({
    //     text: `Please fill all the fields! Outer Else = ${count}`,
    //     icon: "warning",
    //   });
    // }
  };

  // const updateContent = (newContent) => {
  //   setContent(newContent);
  // };

  // const onChange = (evt) => {
  //   var newContent = evt.editor.getData();
  //   setContent(newContent);
  //   console.log("CONTENT :: ", evt.editor);
  // };

  // const onBlur = (evt) => {
  //   console.log("onBlur event called with event info: ", evt);
  // };

  // const afterPaste = (evt) => {
  //   console.log("afterPaste event called with event info: ", evt);
  // };

  const now = new Date();
  const date = now.toLocaleDateString("en-US", options);
  // const time = now.toLocaleTimeString("en-US", {
  //   hour: "numeric",
  //   minute: "numeric",
  //   hour12: true,
  // });

  const generatePdf = () => {
    // const notes = content.match(/.{1,110}/g);
    const orderFormatted = state.order.match(/.{1,110}/g);
    const orderFormatted1 = state.order1.match(/.{1,110}/g);
    const orderFormatted2 = state.order2.match(/.{1,110}/g);

    state.doc.rect(5, 5, 200, 287);
    state.doc.addImage(logo, "png", 90, 7, 28, 26);
    state.doc.setFontSize(14);
    let lineCount = 38;
    state.doc.text("Terms of Reference (TOR)", 105, lineCount, "center");
    state.doc.text(
      `Arbitration Case No: ARB${
        props.location.state.createdAt.split("-")[0]
      }-${pad(props.location.state.caseNumber)}`,
      105,
      (lineCount += 6),
      "center"
    );
    state.doc.setFontSize(11);
    state.doc.text(
      `In the main Arbitration Hearing which was held on ${date}, this Terms of Reference (TOR)`,
      105,
      (lineCount += 10),
      "center"
    );
    state.doc.text(
      `has been drafted in the present arbitration case, where the parties have acknowledged the terms and`,
      105,
      (lineCount += 6),
      "center"
    );
    state.doc.text(
      `conditions incorporated in the TOR are as follows:`,
      105,
      (lineCount += 6),
      "center"
    );

    state.doc.setFontSize(10);
    state.doc.text("1.", 15, (lineCount += 10));
    state.doc.text("Claimant: ", 20, lineCount);
    state.doc.text(props.location.state.claimantName, 100, lineCount);
    state.doc.text("Nationality", 20, (lineCount += 5));
    state.doc.text(props.location.state.claimantNationality, 100, lineCount);
    state.doc.text("Address", 20, (lineCount += 5));
    state.doc.text(props.location.state.claimantAddress, 100, lineCount);
    state.doc.text("Phone", 20, (lineCount += 5));
    state.doc.text(props.location.state.claimantPhone, 100, lineCount);
    state.doc.text("Email", 20, (lineCount += 5));
    state.doc.text(props.location.state.claimantEmail, 100, lineCount);

    if (props.location.state.legalAuthEmail) {
      state.doc.text("Legal Representative: ", 20, (lineCount += 10));
      state.doc.text(props.location.state.legalAuthFirmName, 100, lineCount);
      state.doc.text("Nationality", 20, (lineCount += 5));
      state.doc.text(props.location.state.legalAuthNationality, 100, lineCount);
      state.doc.text("Address", 20, (lineCount += 5));
      state.doc.text(props.location.state.legalAuthAddress, 100, lineCount);
      state.doc.text("Phone", 20, (lineCount += 5));
      state.doc.text(props.location.state.legalAuthPhone, 100, lineCount);
      state.doc.text("Email", 20, (lineCount += 5));
      state.doc.text(props.location.state.legalAuthEmail, 100, lineCount);
    }

    if (props.location.state.claimantEmail2) {
      state.doc.text("Claimant: ", 20, (lineCount += 10));
      state.doc.text(props.location.state.claimantName2, 100, lineCount);
      state.doc.text("Nationality", 20, (lineCount += 5));
      state.doc.text(props.location.state.claimantNationality2, 100, lineCount);
      state.doc.text("Address", 20, (lineCount += 5));
      state.doc.text(props.location.state.claimantAddress2, 100, lineCount);
      state.doc.text("Phone", 20, (lineCount += 5));
      state.doc.text(props.location.state.claimantPhone2, 100, lineCount);
      state.doc.text("Email", 20, (lineCount += 5));
      state.doc.text(props.location.state.claimantEmail2, 100, lineCount);
      if (props.location.state.legalAuthEmail2) {
        state.doc.text("Legal Representative: ", 20, (lineCount += 10));
        state.doc.text(props.location.state.legalAuthFirmName2, 100, lineCount);
        state.doc.text("Nationality", 20, (lineCount += 5));
        state.doc.text(
          props.location.state.legalAuthNationality2,
          100,
          lineCount
        );
        state.doc.text("Address", 20, (lineCount += 5));
        state.doc.text(props.location.state.legalAuthAddress2, 100, lineCount);
        state.doc.text("Phone", 20, (lineCount += 5));
        state.doc.text(props.location.state.legalAuthPhone2, 100, lineCount);
        state.doc.text("Email", 20, (lineCount += 5));
        state.doc.text(props.location.state.legalAuthEmail2, 100, lineCount);
      }
    }

    state.doc.text("2.", 15, (lineCount += 10));
    state.doc.text("Respondent: ", 20, lineCount);
    state.doc.text(props.location.state.respondentName, 100, lineCount);
    state.doc.text("Nationality", 20, (lineCount += 5));
    state.doc.text(props.location.state.respondentNationality, 100, lineCount);
    state.doc.text("Address", 20, (lineCount += 5));
    state.doc.text(props.location.state.respondentAddress, 100, lineCount);
    state.doc.text("Phone", 20, (lineCount += 5));
    state.doc.text(props.location.state.respondentPhone, 100, lineCount);
    state.doc.text("Email", 20, (lineCount += 5));
    state.doc.text(props.location.state.respondentEmail, 100, lineCount);

    if (props.location.state.respondentEmail2) {
      state.doc.text("Respondent: ", 20, (lineCount += 10));
      state.doc.text(props.location.state.respondentName2, 100, lineCount);
      state.doc.text("Nationality", 20, (lineCount += 5));
      state.doc.text(
        props.location.state.respondentNationality2,
        100,
        lineCount
      );
      state.doc.text("Address", 20, (lineCount += 5));
      state.doc.text(props.location.state.respondentAddress2, 100, lineCount);
      state.doc.text("Phone", 20, (lineCount += 5));
      state.doc.text(props.location.state.respondentPhone2, 100, lineCount);
      state.doc.text("Email", 20, (lineCount += 5));
      state.doc.text(props.location.state.respondentEmail2, 100, lineCount);
    }

    state.doc.text("3.", 15, (lineCount += 10));
    state.doc.text("Arbitral Tribunal:", 20, lineCount);

    if (props.location.state.arbitrators.length > 0) {
      props.location.state.arbitrators.map((arbitrator) => {
        state.doc.text("Arbitrator", 20, (lineCount += 5));
        state.doc.text(arbitrator.name, 100, lineCount);
        state.doc.text("Nationality", 20, (lineCount += 5));
        // state.doc.text(arbitrator.nationality, 100, lineCount);
        state.doc.text("Address", 20, (lineCount += 5));
        state.doc.text(arbitrator.address, 100, lineCount);
        state.doc.text("Phone", 20, (lineCount += 5));
        state.doc.text(arbitrator.phone, 100, lineCount);
        state.doc.text("Email", 20, (lineCount += 5));
        state.doc.text(arbitrator.email, 100, lineCount);
      });
    }

    state.doc.setFontSize(11);
    state.doc.text(
      "=> First:  Subject Matter of the Dispute:",
      15,
      (lineCount += 10)
    );
    state.doc.setFontSize(10);
    state.doc.text(
      "The task designated to the reputed Arbitral Tribunal in the present Arbitration Case is to resolve the dispute between the parties, arising out of",
      20,
      (lineCount += 5),
      { maxWidth: 170, align: "justify" }
    );

    //DOCUMENTS 1

    state.doc.text("The Claimant claims that", 20, (lineCount += 10));
    state.doc.text(
      "The Respondent replies to what has been stated in the Statements of the Claim submitted by the Claimant that",
      20,
      (lineCount += 7),
      { maxWidth: 170, align: "justify" }
    );
    state.doc.setFontSize(11);
    state.doc.text("=> Second: Arbitration Clause:", 15, (lineCount += 10));
    state.doc.setFontSize(10);
    state.doc.text(
      `The parties have agreed to the Arbitration Clause/Arbitration Agreement set forth in contract they have signed ${state.agreementDate} which stipulates:`,
      20,
      (lineCount += 5),
      { maxWidth: 170, align: "justify" }
    );
    // state.doc.text(
    //   ``,
    //   20,
    //   (lineCount += 5)
    // );
    state.doc.setFontSize(11);
    state.doc.text(`=> Third: Seat of Arbitration:`, 15, (lineCount += 10));
    state.doc.setFontSize(10);
    state.doc.text(
      `The seat of arbitration in the present arbitration case was decided to be ……………`,
      20,
      (lineCount += 5)
    );
    state.doc.setFontSize(11);
    state.doc.text(
      `=> Fourth: Language of Arbitration: `,
      15,
      (lineCount += 10)
    );
    state.doc.setFontSize(10);
    state.doc.text(
      `The language of arbitration in the present arbitration case shall be ${props.location.state.arbitrationLanguage} and a legal certified translation of all arbitration documents shall be provided if they are written in a language other than the specified arbitration language, or as deemed appropriate by the reputed Arbitral Tribunal.`,
      20,
      (lineCount += 5),
      { maxWidth: 170, align: "justify" }
    );

    state.doc.addPage();
    state.doc.rect(5, 5, 200, 287);
    lineCount = 5;

    state.doc.text("=> Fifth: Applicable Law: ", 15, (lineCount += 10));
    state.doc.text(
      `i. The Arbitral Tribunal shall apply to the subject matter of the dispute the relevant laws in force in the State of`,
      20,
      (lineCount += 5),
      { maxWidth: 170, align: "justify" }
    );
    state.doc.text(
      `ii. In arbitral proceedings, the reputed Tribunal shall apply the Arbitration Rules with their appendices and attachments, including E-Platform Rules adopted by IICRA.`,
      20,
      (lineCount += 5),
      { maxWidth: 170, align: "justify" }
    );

    state.doc.text(
      `iii. The applicable Shari’ah provisions shall be determined pursuant to the rules of IICRA, or `,
      20,
      (lineCount += 10),
      { maxWidth: 170, align: "justify" }
    );
    state.doc.setFontSize(11);

    state.doc.text(`=> Sixth: Applicable Law: `, 15, (lineCount += 10));
    state.doc.setFontSize(10);

    state.doc.text(
      `The Arbitral Tribunal, when necessary, may decide on designating one or more experts to inform about the issues required to adjudicate the Arbitration dispute. The Tribunal shall estimate the amount of the expert’s fees that must be deposited the expert’s efforts and expenses, in accordance with the arbitration rules of IICRA.`,
      20,
      (lineCount += 5),
      {
        maxWidth: 170,
        align: "justify",
      }
    );

    state.doc.setFontSize(11);
    state.doc.text(
      `=> Seventh: Arbitral Tribunal Secretary`,
      15,
      (lineCount += 24)
    );
    state.doc.setFontSize(10);
    state.doc.text(
      `Mr./Ms.…………………… has been appointed as an Arbitral Tribunal Secretary in the present Arbitration Case.`,
      20,
      (lineCount += 10),
      {
        maxWidth: 170,
        align: "justify",
      }
    );

    state.doc.setFontSize(11);
    state.doc.text(`=> Eighth: Issuance of Award:`, 15, (lineCount += 10));
    state.doc.setFontSize(10);
    state.doc.text(
      `i. The Arbitral Award pursuant to the arbitration rules of IICRA, shall be issued within six months, from the date of handing over the Arbitration case file to the arbitral tribunal (With the fact that the arbitration case was handed to the Tribunal on ………….).`,
      20,
      (lineCount += 5),
      {
        maxWidth: 170,
        align: "justify",
      }
    );

    state.doc.text(
      `ii. The parties agreed to authorize the Arbitral Tribunal to extend the arbitration period when necessary and appropriate, and the award shall be deemed to have been issued from the date of its signature.`,
      20,
      (lineCount += 14),
      {
        maxWidth: 170,
        align: "justify",
      }
    );
    state.doc.text(
      `iii. The Arbitral Tribunal shall deliver the original copy of the final Arbitral Award along with the original TOR to each party within five (5) days from the date of its issuance.`,
      20,
      (lineCount += 9),
      {
        maxWidth: 170,
        align: "justify",
      }
    );

    state.doc.setFontSize(11);
    state.doc.text(
      `=> Ninth: Arbitrators' Fees and Arbitration Expenses:`,
      15,
      (lineCount += 10)
    );
    state.doc.setFontSize(10);
    state.doc.text(
      `i. The remuneration of Arbitral Tribunal and Arbitration expenses have been paid in full for the original case from ………. and deposited at IICRA.`,
      20,
      (lineCount += 5),
      {
        maxWidth: 170,
        align: "justify",
      }
    );

    state.doc.text(
      `ii. The Arbitral Award, upon its issuance shall include who will bear the arbitrators’ remunerations and expenses, or the percentage of what each party shall bear.`,
      20,
      (lineCount += 9),
      {
        maxWidth: 168,
        align: "justify",
      }
    );

    state.doc.save("new");
    setState({ ...state, doc: new jsPDF() });
  };

  const generatePdfArabic = (data) => {
    state.doc.addFileToVFS("MyFont.ttf", myFont);
    state.doc.addFont("MyFont.ttf", "MyFont", "normal");
    state.doc.setFont("MyFont");
    state.doc.rect(5, 5, 200, 287);
    state.doc.addImage(logo, "png", 90, 7, 28, 26);

    let lineCount = 38;
    state.doc.setFontSize(17);
    state.doc.text("وثيقة الشروط المرجعية", 105, lineCount, "center");
    state.doc.text(
      `ARB${props.location.state.createdAt.split("-")[0]}-${pad(
        props.location.state.caseNumber
      )} : في الدعوى التحكيمية رقم`,
      105,
      (lineCount += 6),
      "center"
    );
    state.doc.setFontSize(13);
    state.doc.text(
      `:في جلسة التحكيم الرئيسية المنعقدة بتاريخ .../.../...  تم وضع هذه الوثيقة الشروط المرجعية في الدعوى التحكيمية الماثلة، حيث أقر الأطراف بالشروط والأحكام التي تضمنتها على النحو التالي`,
      105,
      (lineCount += 10),
      { maxWidth: 200, align: "center", lineHeightFactor: 1 }
    );
    state.doc.setFontSize(10);
    state.doc.text(":١. المحتكم", 190, (lineCount += 20), "right");
    state.doc.text(props.location.state.claimantName, 100, lineCount, "right");
    state.doc.text(":الجنسية", 187, (lineCount += 6), "right");
    state.doc.text(
      props.location.state.claimantNationality,
      100,
      lineCount,
      "right"
    );
    state.doc.text(":العنوان الكامل", 187, (lineCount += 6), "right");
    state.doc.text(
      props.location.state.claimantAddress,
      100,
      lineCount,
      "right"
    );
    state.doc.text(
      ":البريد الإلكتروني",
      187,
      (lineCount += 6),
      "right",
      "right"
    );
    state.doc.text(props.location.state.claimantEmail, 100, lineCount, "right");

    state.doc.text(":هاتف متحرك", 187, (lineCount += 6), "right");
    state.doc.text(props.location.state.claimantPhone, 100, lineCount, "right");

    if (props.location.state.legalAuthEmail) {
      state.doc.text(
        "إسم الممثل القانوني للمحتكم (الحاضر عن المحتكم):____________(إن وجد)",
        190,
        (lineCount += 10),
        "right"
      );
      state.doc.text(
        props.location.state.legalAuthFirmName,
        100,
        lineCount,
        "right"
      );

      state.doc.text(":الجنسية", 187, (lineCount += 6), "right");
      state.doc.text(
        props.location.state.legalAuthNationality,
        100,
        lineCount,
        "right"
      );

      state.doc.text(":العنوان الكامل", 187, (lineCount += 6), "right");
      state.doc.text(
        props.location.state.legalAuthAddress,
        100,
        lineCount,
        "right"
      );

      state.doc.text(":البريد الإلكتروني", 187, (lineCount += 6), "right");

      state.doc.text(
        props.location.state.legalAuthEmail,
        100,
        lineCount,
        "right"
      );

      state.doc.text(":هاتف متحرك", 187, (lineCount += 6), "right");
      state.doc.text(
        props.location.state.legalAuthPhone,
        100,
        lineCount,
        "right"
      );
    }

    if (props.location.state.claimantEmail2) {
      state.doc.text("المحتكم", 190, (lineCount += 10), "right");
      state.doc.text(
        props.location.state.claimantName2,
        100,
        lineCount,
        "right"
      );
      state.doc.text(":الجنسية", 187, (lineCount += 6), "right");
      state.doc.text(
        props.location.state.claimantNationality2,
        100,
        lineCount,
        "right"
      );
      state.doc.text(":العنوان الكامل", 187, (lineCount += 6), "right");
      state.doc.text(
        props.location.state.claimantAddress2,
        100,
        lineCount,
        "right"
      );
      state.doc.text(
        ":البريد الإلكتروني",
        187,
        (lineCount += 6),
        "right",
        "right"
      );
      state.doc.text(
        props.location.state.claimantEmail2,
        100,
        lineCount,
        "right"
      );

      state.doc.text(":هاتف متحرك", 187, (lineCount += 6), "right");

      state.doc.text(
        props.location.state.claimantPhone2,
        100,
        lineCount,
        "right"
      );

      if (props.location.state.legalAuthEmail2) {
        state.doc.text(
          "إسم الممثل القانوني للمحتكم (الحاضر عن المحتكم):____________(إن وجد)",
          190,
          (lineCount += 10),
          "right"
        );
        state.doc.text(
          props.location.state.legalAuthFirmName2,
          100,
          lineCount,
          "right"
        );

        state.doc.text(":الجنسية", 187, (lineCount += 6), "right");
        state.doc.text(
          props.location.state.legalAuthNationality2,
          100,
          lineCount,
          "right"
        );

        state.doc.text(":العنوان الكامل", 187, (lineCount += 6), "right");
        state.doc.text(
          props.location.state.legalAuthAddress2,
          100,
          lineCount,
          "right"
        );

        state.doc.text(":البريد الإلكتروني", 187, (lineCount += 6), "right");
        state.doc.text(
          props.location.state.legalAuthEmail2,
          100,
          lineCount,
          "right"
        );

        state.doc.text(":هاتف متحرك", 187, (lineCount += 6), "right");
        state.doc.text(
          props.location.state.legalAuthPhone2,
          100,
          lineCount,
          "right"
        );
      }
    }

    state.doc.text(":٢. إسم المحتكم ضده", 190, (lineCount += 10), "right");
    state.doc.text(
      props.location.state.respondentName,
      100,
      lineCount,
      "right"
    );

    state.doc.text(":الجنسية", 187, (lineCount += 6), "right");
    state.doc.text(
      props.location.state.respondentNationality,
      100,
      lineCount,
      "right"
    );

    state.doc.text(":العنوان الكامل", 187, (lineCount += 6), "right");
    state.doc.text(
      props.location.state.respondentAddress,
      100,
      lineCount,
      "right"
    );

    state.doc.text(":البريد الإلكتروني", 187, (lineCount += 6), "right");
    state.doc.text(
      props.location.state.respondentEmail,
      100,
      lineCount,
      "right"
    );

    state.doc.text(":هاتف متحرك", 187, (lineCount += 6), "right");
    state.doc.text(
      props.location.state.respondentPhone,
      100,
      lineCount,
      "right"
    );

    if (props.location.state.respondentEmail2) {
      state.doc.text(":إسم المحتكم ضده", 190, (lineCount += 10), "right");
      state.doc.text(
        props.location.state.respondentName2,
        100,
        lineCount,
        "right"
      );

      state.doc.text(":الجنسية", 187, (lineCount += 6), "right");
      state.doc.text(
        props.location.state.respondentNationality2,
        100,
        lineCount,
        "right"
      );

      state.doc.text(":العنوان الكامل", 187, (lineCount += 6), "right");
      state.doc.text(
        props.location.state.respondentAddress2,
        100,
        lineCount,
        "right"
      );

      state.doc.text(":البريد الإلكتروني", 187, (lineCount += 6), "right");
      state.doc.text(
        props.location.state.respondentEmail2,
        100,
        lineCount,
        "right"
      );

      state.doc.text(":هاتف متحرك", 187, (lineCount += 6), "right");
      state.doc.text(
        props.location.state.respondentPhone2,
        100,
        lineCount,
        "right"
      );
    }

    state.doc.text(
      "(٣. هيئة التحكيم )محكم فرد أو هيئة تحكيم ثلاثي",
      190,
      (lineCount += 10),
      "right"
    );

    state.doc.setFontSize(10);
    state.doc.text(`:إسم أعضاء هيئة التحكيم`, 190, (lineCount += 6), "right");
    if (props.location.state.arbitrators.length > 0) {
      props.location.state.arbitrators.map((arbitrator) => {
        state.doc.text(":المحتكم", 187, (lineCount += 5), "right");
        state.doc.text(arbitrator.name, 100, lineCount, "right");
        state.doc.text(":الجنسية", 187, (lineCount += 5), "right");
        // state.doc.text(arbitrator.nationality, 100, lineCount);
        state.doc.text(":العنوان الكامل", 187, (lineCount += 5), "right");
        state.doc.text(arbitrator.address, 100, lineCount, "right");
        state.doc.text(":البريد الإلكتروني", 187, (lineCount += 5), "right");
        state.doc.text(arbitrator.phone, 100, lineCount, "right");
        state.doc.text(":هاتف متحرك", 187, (lineCount += 5), "right");
        state.doc.text(arbitrator.email, 100, lineCount, "right");
      });
    }

    state.doc.setFontSize(11);
    state.doc.text(":أولاً/ موضوع النزاع <=", 195, (lineCount += 10), "right");
    state.doc.setFontSize(10);
    state.doc.text(
      ":)إن المهمة الموكلة لهيئة التحكيم في هذه الدعوى التحكيمية تتمثل في الفصل في النزاع القائم بين الأطراف، والناشئ عن )بيعة النزاع",
      190,
      (lineCount += 5),
      { maxWidth: 200, align: "right" }
    );

    //DOCUMENTS 1

    state.doc.text("يدعي )المحتكم( بأن", 190, (lineCount += 10), "right");
    state.doc.text(
      "يرد )المحتكم ضده( على ما ورد في ادعاءات المحتكم بأن",
      190,
      (lineCount += 7),
      "right"
    );
    state.doc.setFontSize(11);
    state.doc.text(":ثانياً/ شرط التحكيم  <=", 195, (lineCount += 10), "right");

    state.doc.setFontSize(10);
    state.doc.text(
      `مؤرخة في والتي نصت على أنه ${state.agreementDate} اتفق الأطراف على شرط تحكيم/ مشارطة تحكيم ورد في`,
      190,
      (lineCount += 5),
      { maxWidth: 200, align: "right" }
    );
    // state.doc.text(
    //   ``,
    //   20,
    //   (lineCount += 5)
    // );
    state.doc.setFontSize(11);
    state.doc.text(":ثالثا/ مقر التحكيم <=", 195, (lineCount += 10), "right");

    state.doc.setFontSize(10);
    state.doc.text(
      `حدد مقر التحكيم في الدعوى التحكيمية الماثلة بـــــ `,
      190,
      (lineCount += 5),
      "right"
    );
    state.doc.setFontSize(11);
    state.doc.text(":رابعا/ لغة التحكيم <=", 195, (lineCount += 10), "right");

    state.doc.setFontSize(10);
    state.doc.text(
      `تكون لغة التحكيم في الدعوى التحكيمية الماثلة هي اللغة ${props.location.state.arbitrationLanguage} وتقدم ترجمة قانونية لكافة الوثائق والمستندات إذا كانت محررة بغير لغة التحكيم المحددة، أو وفق ما تراه هيئة التحكيم مناسبًا.`,
      190,
      (lineCount += 5),
      { maxWidth: 170, align: "right" }
    );

    state.doc.addPage();
    state.doc.rect(5, 5, 200, 287);
    lineCount = 5;

    state.doc.text(
      ":خامسًا/ القانون الواجب التطبيق <=",
      195,
      (lineCount += 10),
      "right"
    );

    state.doc.text(
      `أ‌.	تطبق هيئة التحكيم على موضوع النزاع القوانين ذات الصلة بالموضوع والنافذة في دولة`,
      190,
      (lineCount += 5),
      { maxWidth: 200, align: "right" }
    );
    state.doc.text(
      `ب‌. في إجراءات التحكيم تلتزم هيئة التحكيم بتطبيق قواعد التحكيم بملاحقها ومرفقاتها ومن بينها لائحة المنصة الالكترونية، كما هي معتمدة لدى المركز الإسلامي الدولي للصلح والتحكيم`,
      190,
      (lineCount += 5),
      { maxWidth: 200, align: "right" }
    );

    state.doc.text(
      `ج. تحدد الأحكام الشرعية واجبة التطبيق عملاً بقواعد المركز، أو`,
      190,
      (lineCount += 10),
      { maxWidth: 200, align: "right" }
    );
    state.doc.setFontSize(11);

    state.doc.text(":سادسًا/ <=", 195, (lineCount += 10), "right");

    state.doc.setFontSize(10);

    state.doc.text(
      `لهيئة التحكيم عند الاقتضاء أن تحكم بندب خبير اوأكثر للإستنارة برأيهم في المسائل التى يستلزمها الفصل في الدعوى التحكيمية. وتقدر الهيئة مبلغ أتعاب الخبير الذي يجب إيداعه مقابل جهد ومصاريف الخبير عملاً بقواعد التحكيم المعتمدة لدى المركز`,
      190,
      (lineCount += 5),
      {
        maxWidth: 200,
        align: "right",
      }
    );

    state.doc.setFontSize(11);
    state.doc.text(
      ":سابعًا/ أمين سر الهيئة <=",
      195,
      (lineCount += 15),
      "right"
    );

    state.doc.setFontSize(10);
    state.doc.text(
      `تم تعيين .......................... أمينا للسر في هذه الدعوى التحكيمية`,
      190,
      (lineCount += 10),
      {
        maxWidth: 200,
        align: "right",
      }
    );

    state.doc.setFontSize(11);
    state.doc.text(":ثامنًا/ إصدار الحكم  <=", 195, (lineCount += 10), "right");

    state.doc.setFontSize(10);
    state.doc.text(
      `أ‌.	يصدر حكم التحكيم خلال ستة اشهر عملاً بقواعد التحكيم المعتمدة لدى المركز، وذلك من تاريخ تسليم ملف الدعوى التحكيمية الى هيئة التحكيم ( علمًا بأن تسليم دعوى التحكيم تم بتاريخ .............)`,
      190,
      (lineCount += 5),
      {
        maxWidth: 200,
        align: "right",
      }
    );

    state.doc.text(
      `ب‌. إتفق الاطراف على تخويل هيئة التحكيم تمديد مدة التحكيم عند اللزوم، ويعتبر الحكم صادرا من تاريخ التوقيع عليه`,
      190,
      (lineCount += 14),
      {
        maxWidth: 200,
        align: "right",
      }
    );
    state.doc.text(
      `ج. على هيئة التحكيم تسليم أصل حكم التحكيم النهائي مع أصل هذه الوثيقة الى كل طرف خلال خمسة أيام من تاريخ صدوره`,
      190,
      (lineCount += 9),
      {
        maxWidth: 200,
        align: "right",
      }
    );

    state.doc.setFontSize(11);

    state.doc.text(
      ":تاسعًا/ أتعاب المحكمين ومصاريف التحكيم <=",
      195,
      (lineCount += 10),
      "right"
    );

    state.doc.setFontSize(10);
    state.doc.text(
      `أ‌. تم سداد أتعاب هيئة التحكيم والمصاريف كاملة للدعوى الاصلية من ...........، واودعت لدى خزينة المركز`,
      190,
      (lineCount += 5),
      {
        maxWidth: 200,
        align: "right",
      }
    );

    state.doc.text(
      `ب‌. يتضمن حكم التحكيم عند صدوره من يتحمل أتعاب المحكمين والمصاريف، أو نسبة ما يتحمله كل طرف`,
      190,
      (lineCount += 9),
      {
        maxWidth: 200,
        align: "right",
      }
    );

    state.doc.save();
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
                      pathname: "/cases/meeting",
                      state: props.location.state,
                    })
                  }
                  style={styles.crumbTabs}
                >
                  Meeting(s)
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
        <h6
          style={styles.center}
          onClick={
            () => generatePdfArabic(props.location.state)
            //   document.dir == "ltr"
            //     ? generatePdf(props.location.state)
            //     : generatePdfArabic(props.location.state)
          }
        >
          Terms of Reference (TOR)
        </h6>

        <Row className="ml-5 mr-5 mt-3 mb-3 ">
          <Col>
            <Card className="shadow">
              <CardBody>
                In the main Arbitration Hearing which was held on (Date …/…/…),
                this Terms of Reference (TOR) has been drafted in the present
                arbitration case, where the parties have acknowledged the terms
                and conditions incorporated in the TOR are as follows:
                <br />
                With reference to CASE{" "}
                {`ARB${props.location.state.createdAt.split("-")[0]}-${pad(
                  props.location.state.caseNumber
                )}`}
                between {props.location.state.claimantName} and{" "}
                {props.location.state.respondentName}.
              </CardBody>
            </Card>
          </Col>
        </Row>
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

        {/* <Row className="ml-5 mr-5">
            <Col>
              <Table bordered hover style={styles.table} className="shadow">
                <tbody>
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
                  {props.location.state.claimantEmail2 ? (
                    <tr>
                      <td>Claimant</td>
                      <td style={styles.td2}>
                        <FormGroup check style={styles.radio}>
                          <Label check>
                            <Input
                              type="radio"
                              name="claimantAttendance2"
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
                  {props.location.state.respondentEmail2 ? (
                    <tr>
                      <td>Respondent</td>
                      <td style={styles.td2}>
                        <FormGroup check style={styles.radio}>
                          <Label check>
                            <Input
                              type="radio"
                              name="respondentAttendance2"
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
          </Row> */}

        <Row className="m-3">
          <Col>
            <FormGroup>
              <Label>Claimant's Deadline</Label>
              <Input
                type="date"
                id="claimantDeadline"
                name="claimantDeadline"
                value={dates.claimantDeadline}
                onChange={handleDates}
                className="shadow-sm"
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>No. of Days</Label>
              <Input
                type="number"
                id="claimantDays"
                name="claimantDays"
                value={dates.claimantDays}
                onChange={handleDates}
                className="shadow-sm"
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Respondent's Deadline</Label>
              <Input
                type="date"
                id="respondentDeadline"
                name="respondentDeadline"
                value={dates.respondentDeadline}
                onChange={handleDates}
                className="shadow-sm"
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>No. of Days</Label>
              <Input
                type="number"
                id="respondentDays"
                name="respondentDays"
                value={dates.respondentDays}
                onChange={handleDates}
                className="shadow-sm"
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Order of Arbitral Tribunal</Label>
              <Input
                type="date"
                id="tribunalOrder"
                name="tribunalOrder"
                value={dates.tribunalOrder}
                onChange={handleDates}
                className="shadow-sm"
              />
            </FormGroup>
          </Col>
        </Row>
        <hr />
        <Row className="ml-5 mr-5">
          <Col>
            <Form>
              <Row>
                <Col lg={8} md={8} sm={12}>
                  <FormGroup>
                    <Label>Order</Label>
                    <Input
                      type="textarea"
                      id="order"
                      name="order"
                      rows="5"
                      value={state.order}
                      onChange={handleChange}
                      className="shadow"
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
              <hr />
              {count == "2" ? (
                <>
                  <Row>
                    <Col lg={8} md={8} sm={12}>
                      <FormGroup>
                        <Label>Order</Label>
                        <Input
                          type="textarea"
                          id="order1"
                          name="order1"
                          rows="5"
                          value={state.order1}
                          onChange={handleChange}
                          className="shadow"
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={2} md={2} sm={6}>
                      <FormGroup>
                        <Label>Type of Order</Label>
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
                  <hr />
                </>
              ) : null}
              {count >= "3" ? (
                <>
                  <Row>
                    <Col lg={8} md={8} sm={12}>
                      <FormGroup>
                        <Label>Order</Label>
                        <Input
                          type="textarea"
                          id="order1"
                          name="order1"
                          rows="5"
                          value={state.order1}
                          onChange={handleChange}
                          className="shadow"
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={2} md={2} sm={6}>
                      <FormGroup>
                        <Label>Type of Order</Label>
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
                  <hr />
                  <Row>
                    <Col lg={8} md={8} sm={12}>
                      <FormGroup>
                        <Label>Order</Label>
                        <Input
                          type="textarea"
                          id="order2"
                          name="order2"
                          rows="5"
                          value={state.order2}
                          onChange={handleChange}
                          className="shadow"
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={2} md={2} sm={6}>
                      <FormGroup>
                        <Label>Type of Order</Label>
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
                  <hr />
                </>
              ) : null}
              <Button onClick={() => setCount(count + 1)}>Add Order</Button>
            </Form>
          </Col>
        </Row>
        <hr />
        <Row className="ml-5 mr-5 pb-3" style={{ textAlign: "right" }}>
          <Col>
            <Button color="success" onClick={handleSubmit}>
              Submit
            </Button>
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
export default Email24;
