import React, { useState, useEffect } from "react";
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
  Modal,
  ModalBody,
  ModalHeader,
  CustomInput,
} from "reactstrap";
// import CKEditor from "react-ckeditor-component";
import jsPDF from "jspdf";
import axios from "axios";
import logo from "../../../assets/logo.png";
import Swal from "sweetalert2";
import { getEnvironment } from "../../../config";
// import SignatureCanvas from "react-signature-canvas";
import myFont from "../../form/jspdfArabic";
import font from "../../../Amiri-Bold-normal";
import stamp from "../../../assets/stamp.png";
import stampSign from "../../../assets/stampSign.png";
import "jspdf-autotable";

const Email12 = (props) => {
  const baseURL = getEnvironment().apiUrl;

  const toggle = () => setShow(!show);

  const [show, setShow] = useState(false);
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
    doc: new jsPDF(),
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

  const [claimant1, setClaimant1] = useState("");
  const [claimant2, setClaimant2] = useState("");
  const [respondent1, setRespondent1] = useState("");
  const [respondent2, setRespondent2] = useState("");
  const [arbitrator1, setArbitrator1] = useState("");
  const [arbitrator2, setArbitrator2] = useState("");
  const [chairman_, setChairman_] = useState("");

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
    state.doc.text("Minutes of Preliminary Meeting", 105, lineCount, "center");
    state.doc.text(
      `Arbitration Case No: ARB${
        props.location.state.createdAt.split("-")[0]
      }-${pad(props.location.state.caseNumber)}`,
      105,
      (lineCount += 6),
      "center"
    );
    state.doc.text(
      `Preliminary Meeting, ${date}, ${dates.startTime}`,
      105,
      (lineCount += 6),
      "center"
    );

    state.doc.text(
      `At International Islamic Center for Reconciliation and Arbitration, Dubai, UAE`,
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
    state.doc.text("4.", 15, (lineCount += 10));
    state.doc.text(
      `The meeting was held via IICRA E-platform at ${dates.startTime} on ${date}.`,
      20,
      lineCount
    );
    state.doc.text("5.", 15, (lineCount += 10));
    state.doc.text("The attendees are: ", 20, lineCount);

    if (props.location.state.arbitrators.length == "3") {
      setState({ ...state, tribunal: "3" });
    }

    if (state.tribunal == "3") {
      if (state.chairmanAttendance == "Present") {
        state.doc.text("Chairman", 20, (lineCount += 10));
        // state.doc.text("Present", 100, lineCount);
      }
      if (state.arbitratorAttendance1 == "Present") {
        state.doc.text("Co-Arbitrator", 20, (lineCount += 5));
        // state.doc.text(state.arbitratorAttendance1, 100, lineCount);
      }
      if (state.arbitratorAttendance2 == "Present") {
        state.doc.text("Co-Arbitrator", 20, (lineCount += 5));
        // state.doc.text(state.arbitratorAttendance2, 100, lineCount);
      }
    } else if (
      state.tribunal == "1" &&
      state.arbitratorAttendance == "Present"
    ) {
      state.doc.text("Sole Arbitrator", 20, (lineCount += 10));
      // state.doc.text(state.arbitratorAttendance2, 100, lineCount);
    }
    if (state.rapporteurAttendance == "Present") {
      state.doc.text("Rapporteur", 20, (lineCount += 5));
      // state.doc.text(state.rapporteurAttendance, 100, lineCount);
    }
    if (state.claimantAttendance == "Present") {
      state.doc.text("Claimant", 20, (lineCount += 5));
      // state.doc.text(state.claimantAttendance, 100, lineCount);
    }
    if (state.claimantAttendance2 == "Present") {
      state.doc.text("Additional Claimant", 20, (lineCount += 5));
      // state.doc.text(state.claimantAttendance, 100, lineCount);
    }
    if (state.respondentAttendance == "Present") {
      state.doc.text("Respondent", 20, (lineCount += 5));
      // state.doc.text(state.respondentAttendance, 100, lineCount);
    }
    if (state.respondentAttendance == "Present") {
      state.doc.text("Additional Respondent", 20, (lineCount += 5));
      // state.doc.text(state.respondentAttendance, 100, lineCount);
    }
    if (state.expertAttendance == "Present") {
      state.doc.text("Expert", 20, (lineCount += 5));
      // state.doc.text(state.expertAttendance, 100, lineCount);
    }
    if (state.witnessAttendance == "Present") {
      state.doc.text("Witnesses", 20, (lineCount += 5));
      // state.doc.text(state.witnessAttendance, 100, lineCount);
    }
    if (state.interpretorAttendance == "Present") {
      state.doc.text("Interpreter", 20, (lineCount += 5));
      // state.doc.text(state.interpretorAttendance, 100, lineCount);
    }

    state.doc.text("6.", 15, (lineCount += 10));
    state.doc.text(
      "The Arbitral Tribunal has reviewed the documents produced by the Claimant’s Representative in order to legally",
      20,
      lineCount
    );
    state.doc.text(
      "prove his attendance, and these documents include the following:",
      20,
      (lineCount += 5)
    );
    //DOCUMENTS 1

    state.doc.text("7.", 15, (lineCount += 10));
    state.doc.text(
      "The Arbitral Tribunal has reviewed the documents produced by the Respondent’s Representative in order to legally",
      20,
      lineCount
    );
    state.doc.text(
      "prove his attendance, and these documents include the following:",
      20,
      (lineCount += 5)
    );
    //DOCUMENTS 2
    state.doc.text("8.", 15, (lineCount += 10));

    state.doc.text(
      "It is agreed that the following addresses are only the accepted addresses for all communications between Arbitral",
      20,
      lineCount
    );
    state.doc.text(
      "Tribunal, Parties and Arbitral Tribunal Secretary.",
      20,
      (lineCount += 5)
    );
    state.doc.text("The addresses are:", 20, (lineCount += 6));
    if (chairman) {
      state.doc.text("Arbitral Tribunal :", 24, (lineCount += 5));
      state.doc.text(chairman.name, 100, lineCount);
      state.doc.text("Email :", 24, (lineCount += 5));
      state.doc.text(chairman.email, 100, lineCount);
      state.doc.text("Contact No. :", 24, (lineCount += 5));
      state.doc.text(chairman.phone, 100, lineCount);
    }

    if (props.location.state.rapporteurEmail) {
      state.doc.text("Arbitral Tribunal Secretary :", 24, (lineCount += 5));
      state.doc.text(props.location.state.rapporteurName, 100, lineCount);
      state.doc.text("Email :", 24, (lineCount += 5));
      state.doc.text(props.location.state.rapporteurEmail, 100, lineCount);
      state.doc.text("Contact No. :", 24, (lineCount += 5));
      state.doc.text(props.location.state.rapporteurPhone, 100, lineCount);
    }

    state.doc.text("Claimant :", 24, (lineCount += 5));
    state.doc.text(props.location.state.claimantName, 100, lineCount);
    state.doc.text("Email :", 24, (lineCount += 5));
    state.doc.text(props.location.state.claimantEmail, 100, lineCount);
    state.doc.text("Contact No. :", 24, (lineCount += 5));
    state.doc.text(props.location.state.claimantPhone, 100, lineCount);

    state.doc.text("Respondent :", 24, (lineCount += 5));
    state.doc.text(props.location.state.respondentName, 100, lineCount);
    state.doc.text("Email :", 24, (lineCount += 5));
    state.doc.text(props.location.state.respondentEmail, 100, lineCount);
    state.doc.text("Contact No. :", 24, (lineCount += 5));
    state.doc.text(props.location.state.respondentPhone, 100, lineCount);

    state.doc.addPage();
    state.doc.rect(5, 5, 200, 287);
    lineCount = 5;

    state.doc.text("9.", 15, (lineCount += 5));
    state.doc.text(
      `IICRA received the Request for Arbitration (RFA) submitted by the Claimant dated ${
        props.location.state.createdAt.split("T")[0]
      } and having examined`,
      20,
      lineCount
    );
    state.doc.text(
      `the request, IICRA has registered it as Arbitration Case no: ARB${
        props.location.state.createdAt.split("-")[0]
      }-${props.location.state.caseNumber}`,
      20,
      (lineCount += 5)
    );
    state.doc.text("10.", 15, (lineCount += 10));

    state.doc.text(
      `IICRA has notified the respondent of a copy of RFA along with its attachment on the addresses provided by the`,
      20,
      lineCount
    );
    state.doc.text(
      `Claimant where it was duly received by the Respondent Mr./Ms. ${props.location.state.respondentName}.`,
      20,
      (lineCount += 5)
    );
    state.doc.text(`11.`, 15, (lineCount += 10));

    state.doc.text(
      `The Attendees have confirmed that they are satisfied with the way the Arbitral Proceedings was conducted and`,
      20,
      lineCount
    );

    state.doc.text(
      `confirmed that they have no objections in this regard.`,
      20,
      (lineCount += 5)
    );
    state.doc.text(`12. `, 15, (lineCount += 5));

    state.doc.text(
      `The Arbitration shall be conducted under the Rules of the International Islamic Centre for Reconciliation & Arbitration`,
      20,
      lineCount
    );
    state.doc.text(
      `(IICRA) as per the Arbitration Clause/Arbitration Agreement.`,
      20,
      (lineCount += 5)
    );
    state.doc.text(`13.`, 15, (lineCount += 10));

    state.doc.text(
      `The language of arbitration, as decided, shall be ${props.location.state.arbitrationLanguage}`,
      20,
      lineCount
    );
    state.doc.text(`14.`, 15, (lineCount += 10));

    state.doc.text(
      `Pursuant to the provisions of Article )34(of the Arbitration Rules, the applicable substantive law dispute resolution`,
      20,
      lineCount
    );
    state.doc.text(
      `shall be the Law ${props.location.state.governingLaw}`,
      20,
      (lineCount += 5)
    );
    state.doc.text(`15.`, 15, (lineCount += 10));

    state.doc.text(
      `Pursuant to the provisions of Article (35) of the Arbitration Rules, the applicable Shari’ah provisions for dispute`,
      20,
      lineCount
    );
    state.doc.text(
      `resolution shall be the Provisions of Islamic Shari’ah.`,
      20,
      (lineCount += 5)
    );
    state.doc.text(`16.`, 15, (lineCount += 10));

    state.doc.text(
      `The seat of arbitration in the present arbitration case shall be the IICRA Head Quarter in Dubai, United Arab Emirates`,
      20,
      lineCount
    );
    state.doc.text(`17.`, 15, (lineCount += 10));

    state.doc.text(
      `Pursuant to the provisions of Article (2/30) of the Arbitration Rules, the arbitral tribunal has set the below schedule for`,
      20,
      lineCount
    );
    state.doc.text(
      `the conduct of Arbitral proceedings.`,
      20,
      (lineCount += 5)
    );

    state.doc.autoTable({
      theme: "striped",
      head: [["Sr.", "CONCERNED PARTY", "AGENDA", "DESCRIPTION", "DATE"]],
      body: [
        [
          "1",
          "Claimant",
          "Full Statements of Claim",
          `The Tribunal grants the Claimant ${dates.claimantDays} days’ timing for the submission the full statement of claim or the attachments submitted with RFA are deemed sufficient.`,
          `${dates.claimantDeadline}`,
        ],
        [
          "2",
          "Respondent",
          "Statements of Defense",
          `The Tribunal grants the Respondent ${dates.respondentDays} days’ timing for the submission of response to the statement or submit a counterclaim`,
          `${dates.respondentDeadline}`,
        ],
        [
          "3",
          "Arbitral Tribunal",
          "Order of Arbitral Tribunal",
          `Providing the parties with draft Terms of Reference for their comments and signature or directly hold the Main Hearing.`,
          `${dates.tribunalOrder}`,
        ],
      ],
      startY: (lineCount += 10),
      styles: {
        lineColor: "#c7c7c7",
        lineWidth: 0,
        cellPadding: 2,
        fillColor: [220, 220, 220],
      },
      headStyles: { fillColor: [0, 128, 0] },
    });
    state.doc.setFontSize(13);

    state.doc.text(
      `Orders of Arbitral Tribunal`,
      105,
      (lineCount += 70),
      "center"
    );
    state.doc.line(79, (lineCount += 2), 132, lineCount);
    state.doc.setFontSize(11);
    if (state.order) {
      state.doc.text(`Order 1.`, 15, (lineCount += 10));
      state.doc.text(`Type of Order:`, 15, (lineCount += 5));
      state.doc.text(state.typeOfOrder, 100, lineCount);
      state.doc.text(`Recipient:`, 15, (lineCount += 5));
      state.doc.text(state.recipient, 100, lineCount);
      state.doc.text(`Order:`, 15, (lineCount += 5));
      orderFormatted.map((ord) => {
        if (lineCount > 275) {
          state.doc.addPage();
          state.doc.rect(10, 10, 190, 275);
          lineCount = 10;
        } else {
          state.doc.text(ord, 20, (lineCount += 5));
        }
      });
    }

    if (state.order1) {
      state.doc.text(`Order 2.`, 15, (lineCount += 10));
      state.doc.text(`Type of Order:`, 15, (lineCount += 5));
      state.doc.text(state.typeOfOrder1, 100, lineCount);
      state.doc.text(`Recipient:`, 15, (lineCount += 5));
      state.doc.text(state.recipient1, 100, lineCount);
      state.doc.text(`Order:`, 15, (lineCount += 5));
      orderFormatted1.map((ord) => {
        if (lineCount > 275) {
          state.doc.addPage();
          state.doc.rect(10, 10, 190, 275);
          lineCount = 10;
        } else {
          state.doc.text(ord, 185, (lineCount += 5), "right");
        }
      });
    }

    if (state.order2) {
      state.doc.text(`Order 3.`, 15, (lineCount += 10));
      state.doc.text(`Type of Order:`, 15, (lineCount += 5));
      state.doc.text(state.typeOfOrder2, 100, lineCount);
      state.doc.text(`Recipient:`, 15, (lineCount += 5));
      state.doc.text(state.recipient2, 100, lineCount);
      state.doc.text(`Order:`, 15, (lineCount += 5));
      orderFormatted2.map((ord) => {
        if (lineCount > 275) {
          state.doc.addPage();
          state.doc.rect(10, 10, 190, 275);
          lineCount = 10;
        } else {
          state.doc.text(ord, 185, (lineCount += 5), "right");
        }
      });
    }

    var claim1 = new Image();

    if (claimant1 != "") {
      var src = URL.createObjectURL(claimant1);
      claim1.src = src;

      state.doc.addImage(claim1, "jpeg", 18, (lineCount += 2), 40, 24);
    }

    var respon1 = new Image();

    if (respondent1 != "") {
      var src = URL.createObjectURL(respondent1);
      respon1.src = src;

      state.doc.addImage(respon1, "jpeg", 78, lineCount, 40, 24);
    }

    var chair1 = new Image();

    if (chairman_ != "") {
      var src = URL.createObjectURL(chairman_);
      chair1.src = src;

      state.doc.addImage(chair1, "jpeg", 138, lineCount, 40, 24);
    }

    // let abc = `${baseURL}/${props.location.state.claimantSign}`;

    // const imm = `https://st.depositphotos.com/1016545/4532/i/950/depositphotos_45321749-stock-photo-letters-in-fire-letter-f.jpg`;
    // const def = base64.encode(abc);
    // const imgData = `data:image/jpg;base64, ${def}`;

    // var imageurl = `${baseURL}/${props.location.state.claimantSign}`;
    // var som = convertImgToBase64(imageurl);
    // console.log(imm);
    // console.log(abc);
    // state.doc.addImage(abc, "JPEG", 130, (lineCount += 10), 100, 100);
    // state.doc.addImage(imm, "jpeg", 30, (lineCount += 10), 100, 100);

    // console.log(URL.createObjectURL(abc));
    state.doc.text(
      `The Meeting adjourned at ${dates.endTime} and accordingly the Minutes has been signed by the Parties, Arbitral Tribunal`,
      105,
      (lineCount += 30),
      "center"
    );
    state.doc.text(
      "and Arbitral Tribunal Secretary.",
      105,
      (lineCount += 5),
      "center"
    );
    state.doc.save("new");
    setState({ ...state, doc: new jsPDF() });
  };

  const generatePdfArabic = (data) => {
    const orderFormatted = state.order.match(/.{1,116}/g);
    const orderFormatted1 = state.order1.match(/.{1,116}/g);
    const orderFormatted2 = state.order2.match(/.{1,116}/g);

    state.doc.addFileToVFS("MyFont.ttf", myFont);
    state.doc.addFont("MyFont.ttf", "MyFont", "normal");
    state.doc.addFileToVFS("MyFontBold.ttf", font);
    state.doc.addFont("MyFontBold.ttf", "MyFontBold", "normal");
    state.doc.setFont("MyFontBold");
    state.doc.rect(5, 5, 200, 287);
    state.doc.addImage(logo, "png", 90, 7, 28, 26);

    let lineCount = 38;

    state.doc.setFontSize(11);
    // state.doc.setFontSize(10);
    state.doc.text(`محضر الاجتماع التمهيدي`, 105, lineCount, "center");
    state.doc.text(
      `ARB${data.createdAt.split("-")[0]}-${pad(
        data.caseNumber
      )} : الدعوى التحكيمية رقم`,
      105,
      (lineCount += 6),
      "center"
    );
    state.doc.text(
      `الاجتماع التمهيدي ${date} – المركز الإسلامي الدولي للصلح والتحكيم، دبي، الإمارات`,
      105,
      (lineCount += 6),
      "center"
    );
    state.doc.setFont("MyFont");

    state.doc.text(":١. المحتكم", 190, (lineCount += 10), "right");
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

    // state.doc.text(
    //   "إسم الممثل القانوني للمحتكم ضده (الحاضر عن المحتكم ضده):____________(إن وجد)",
    //   190,
    //   (lineCount += 10),
    //   "right"
    // );
    // state.doc.text(":الجنسية", 187, (lineCount += 6), "right");
    // state.doc.text(":العنوان الكامل", 187, (lineCount += 6), "right");
    // state.doc.text(":البريد الإلكتروني", 187, (lineCount += 6), "right");
    // state.doc.text(":هاتف متحرك", 187, (lineCount += 6), "right");

    state.doc.setFont("MyFontBold");
    state.doc.text(
      "(٣. هيئة التحكيم )محكم فرد أو هيئة تحكيم ثلاثي",
      190,
      (lineCount += 10),
      "right"
    );

    state.doc.setFont("MyFont");
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
    state.doc.text(
      `٤. انعقد الاجتماع التمهيدي عبر المنصة الإلكترونية للمركز في الساعة ..........بتاريخ ${dates.startTime}`,
      190,
      (lineCount += 10),
      "right"
    );
    state.doc.text(`:٥. الحضور هم مما يلي`, 190, (lineCount += 10), "right");

    if (props.location.state.arbitrators.length == "3") {
      setState({ ...state, tribunal: "3" });
    }

    if (state.tribunal == "3") {
      if (state.chairmanAttendance == "Present") {
        state.doc.text("Chairman", 190, (lineCount += 10), "right");
        // state.doc.text("Present", 100, lineCount);
      }
      if (state.arbitratorAttendance1 == "Present") {
        state.doc.text("Co-Arbitrator", 190, (lineCount += 5), "right");
        // state.doc.text(state.arbitratorAttendance1, 100, lineCount);
      }
      if (state.arbitratorAttendance2 == "Present") {
        state.doc.text("Co-Arbitrator", 190, (lineCount += 5), "right");
        // state.doc.text(state.arbitratorAttendance2, 100, lineCount);
      }
    } else if (
      state.tribunal == "1" &&
      state.arbitratorAttendance == "Present"
    ) {
      state.doc.text("Sole Arbitrator", 190, (lineCount += 10), "right");
      // state.doc.text(state.arbitratorAttendance2, 100, lineCount);
    }
    if (state.rapporteurAttendance == "Present") {
      state.doc.text("أمين سر هيئة التحكيم", 190, (lineCount += 5), "right");
      // state.doc.text(state.rapporteurAttendance, 100, lineCount);
    }
    if (state.claimantAttendance == "Present") {
      state.doc.text("المحتكم", 190, (lineCount += 5), "right");
      // state.doc.text(state.claimantAttendance, 100, lineCount);
    }
    if (state.claimantAttendance2 == "Present") {
      state.doc.text("Additional Claimant", 190, (lineCount += 5), "right");
      // state.doc.text(state.claimantAttendance, 100, lineCount);
    }
    if (state.respondentAttendance == "Present") {
      state.doc.text("المحتكم ضده", 190, (lineCount += 5), "right");
      // state.doc.text(state.respondentAttendance, 100, lineCount);
    }
    if (state.respondentAttendance == "Present") {
      state.doc.text("Additional Respondent", 190, (lineCount += 5), "right");
      // state.doc.text(state.respondentAttendance, 100, lineCount);
    }
    if (state.expertAttendance == "Present") {
      state.doc.text("Expert", 190, (lineCount += 5), "right");
      // state.doc.text(state.expertAttendance, 100, lineCount);
    }
    if (state.witnessAttendance == "Present") {
      state.doc.text("Witnesses", 190, (lineCount += 5), "right");
      // state.doc.text(state.witnessAttendance, 100, lineCount);
    }
    if (state.interpretorAttendance == "Present") {
      state.doc.text("Interpreter", 190, (lineCount += 5), "right");
      // state.doc.text(state.interpretorAttendance, 100, lineCount);
    }
    // state.doc.text(`أعضاء هيئة التحكيم -`, 187, (lineCount += 6), "right");
    // state.doc.text(`المحتكم -`, 187, (lineCount += 6), "right");
    // state.doc.text(`المحتكم ضده -`, 187, (lineCount += 6), "right");
    // state.doc.text(`أمين سر هيئة التحكيم -`, 187, (lineCount += 6), "right");
    state.doc.text(
      `:٦. اطلعت هيئة التحكيم على المستندات التي تقدم بها الحاضر عن المحتكم لإثبات حضوره قانونًا، وشملت تلك الوثائق ما يلي`,
      190,
      (lineCount += 10),
      "right"
    );
    state.doc.text(
      `وكالة قانونية مصدقة بتاريخ -`,
      187,
      (lineCount += 6),
      "right"
    );
    state.doc.text(
      `وقد قررت هيئة التحكيم في هذا الصدد -`,
      187,
      (lineCount += 6),
      "right"
    );
    //DOCUMENTS 1
    state.doc.text(
      `:٧. اطلعت هيئة التحكيم على المستندات التي تقدم بها الحاضر عن المحتكم ضده لإثبات حضوره قانونًا، وشملت تلك الوثائق ما يلي`,
      190,
      (lineCount += 10),
      "right"
    );
    state.doc.text(
      `وكالة قانونية مصدقة بتاريخ -`,
      187,
      (lineCount += 6),
      "right"
    );
    state.doc.text(
      `وقد قررت هيئة التحكيم في هذا الصدد -`,
      187,
      (lineCount += 6),
      "right"
    );

    //DOCUMENTS 2

    state.doc.addPage();
    state.doc.rect(10, 10, 190, 275);

    lineCount = 10;

    state.doc.text(
      `:٨. أدلى الحضور بعناوين مقارهم المختارة لأغراض تبليغ مراسلات الدعوى التحكيمية الماثلة على النحو التالي`,
      190,
      (lineCount += 10),
      "right"
    );

    if (chairman) {
      state.doc.text(`:عنوان هيئة التحكيم`, 190, (lineCount += 6), "right");

      state.doc.text(chairman.name, 100, lineCount, "right");
      state.doc.text(`:البريد الإلكتروني`, 187, (lineCount += 6), "right");

      state.doc.text(chairman.email, 100, lineCount, "right");
      state.doc.text(`:هاتف متحرك`, 187, (lineCount += 6), "right");

      state.doc.text(chairman.phone, 100, lineCount, "right");
    }

    state.doc.text(`:عنوان أمين السر`, 190, (lineCount += 9), "right");
    if (props.location.state.rapporteurEmail) {
      state.doc.text(
        props.location.state.rapporteurName,
        100,
        lineCount,
        "right"
      );

      state.doc.text(`:البريد الإلكتروني`, 187, (lineCount += 6), "right");
      state.doc.text(
        props.location.state.rapporteurEmail,
        100,
        lineCount,
        "right"
      );

      state.doc.text(`:هاتف متحرك`, 187, (lineCount += 6), "right");
      state.doc.text(
        props.location.state.rapporteurPhone,
        100,
        lineCount,
        "right"
      );
    }

    state.doc.text(`:عنوان المحتكم`, 190, (lineCount += 9), "right");
    state.doc.text(props.location.state.claimantName, 100, lineCount, "right");

    state.doc.text(`:البريد الإلكتروني`, 187, (lineCount += 6), "right");
    state.doc.text(props.location.state.claimantEmail, 100, lineCount, "right");

    state.doc.text(`:هاتف متحرك`, 187, (lineCount += 6), "right");
    state.doc.text(props.location.state.claimantPhone, 100, lineCount, "right");

    state.doc.text(`:عنوان المحتكم ضده`, 190, (lineCount += 9), "right");
    state.doc.text(
      props.location.state.respondentName,
      100,
      lineCount,
      "right"
    );

    state.doc.text(`:البريد الإلكتروني`, 187, (lineCount += 6), "right");
    state.doc.text(
      props.location.state.respondentEmail,
      100,
      lineCount,
      "right"
    );

    state.doc.text(`:هاتف متحرك`, 187, (lineCount += 6), "right");
    state.doc.text(
      props.location.state.respondentPhone,
      100,
      lineCount,
      "right"
    );

    state.doc.text(
      `:تسلم المركز طلب التحكيم المقدم من قبل المحتكم بتاريخ ${
        props.location.state.createdAt.split("T")[0]
      } وبدارسة الطلب تم قيد الدعوى التحكيمية لدى المركز تحت رقم`,
      190,
      (lineCount += 9),
      "right"
    );
    state.doc.text(
      `ARB${data.createdAt.split("-")[0]}-${pad(data.caseNumber)}`,
      187,
      (lineCount += 6),
      "right"
    );
    state.doc.text(
      `١٠. تم تبليغ المحتكم ضده بنسخة من طلب التحكيم ومرفقاته من قبل المركز على العناوين المتوفرة لديه، حيث تأكد استلام طلب التحكيم من قبل`,
      190,
      (lineCount += 9),
      "right"
    );
    state.doc.text(
      `المحتكم ضده عبر السيد ${props.location.state.respondentName}`,
      190,
      (lineCount += 9),
      "right"
    );
    state.doc.text(
      `.١١. أكد حضور الاجتماع التمهيدي بأنهم قبلوا بالطريقة التي تم بها سير إجراءات الاجتماع، ولا توجد لديهم أي اعتراضات في هذا الصدد`,
      190,
      (lineCount += 9),
      "right"
    );
    state.doc.text(
      `.١٢. سيتم السير في إجراءات التحكيم وفقًا لقواعد التحكيم المعتمدة لدى المركز الإسلامي الدولي للصلح والتحكيم ، ووفقًا لشرط التحكيم / مشارطة التحكيم`,
      190,
      (lineCount += 9),
      "right"
    );
    state.doc.text(
      `١٣. تكون لغة التحكيم وفق ما هو مقرر هي اللغة ${props.location.state.arbitrationLanguage}`,
      190,
      (lineCount += 9),
      "right"
    );
    state.doc.text(
      `١٤. عملاً بأحكام المادة 34 من قواعد التحكيم، حُدد القانون الموضوعي واجب التطبيق لفض النزاع هو القانون ${props.location.state.governingLaw}`,
      190,
      (lineCount += 9),
      "right"
    );
    state.doc.text(
      `١٥. عملاً بأحكام المادة 35 من قواعد التحكيم، حددت الأحكام الشرعية واجبة التطبيق لفض النزاع هي أحكام الشريعة الإسلامية`,
      190,
      (lineCount += 9),
      "right"
    );
    state.doc.text(
      `١٦. يكون مقر التحكيم في الدعوى التحكيمية الماثلة هو مقر المركز الرئيس في دولة الإمارات العربية المتحدة أو`,
      190,
      (lineCount += 9),
      "right"
    );
    state.doc.text(
      `١٧. عملاً بأحكام المادة 2/30 من قواعد التحكيم، وضعت هيئة التحكيم جدولاً لسير إجراءات التحكيم كما يلي`,
      190,
      (lineCount += 9),
      "right"
    );
    state.doc.autoTable({
      startY: (lineCount += 10),
      theme: "striped",
      headStyles: {
        font: "MyFont",
        valign: "middle",
        halign: "right",
        fillColor: [0, 128, 0],
      },
      bodyStyles: { font: "MyFont", valign: "middle", halign: "right" },
      head: [
        ["التاريخ", "وصف موجز", " جدول الأعمال", "الجهة", "الرقم التسلسلي"],
      ],
      body: [
        [
          `${dates.claimantDeadline}`,
          " تمنح هيئة التحكيم المحتكم مهلة لتقديم لائحة دعوى متكاملة، أو الاكتفاء بما قدم كمرفقات لطلب التحكيم",
          " لائحة دعوى متكاملة",
          " المحتكم",
          ".1",
        ],
        [
          `${dates.respondentDeadline}`,
          " تمنح هيئة التحكيم للمحتكم ضده مهلة لتقديم رده على لائحة الدعوى ، وقيد دعوى متقابلة (إن وجدت)",
          " لائحة الرد",
          " المحتكم ضده",
          ".2",
        ],
        [
          `${dates.tribunalOrder}`,
          `-	تزويد الأطراف بمسودة لوثيقة التحكيم للتعقيب عليها وتوقيعها في الجلسة الرئيسية. 
        -	أو عقد جلسة رئيسية مباشرة.
        `,
          " قرار هيئة التحكيم ",
          " هيئة التحكيم",
          ".3",
        ],

        // ...
      ],
      styles: {
        lineColor: "#c7c7c7",
        lineWidth: 0,
        cellPadding: 3,
        fontStyle: myFont,
        fillColor: [220, 220, 220],
      },
    });

    state.doc.setFont("MyFontBold");
    state.doc.text(`قرارات هيئة التحكيم`, 105, (lineCount += 75), "center");

    state.doc.setFont("MyFont");
    if (state.order) {
      state.doc.text(`Order 1.`, 190, (lineCount += 10), "right");
      state.doc.text(`Type of Order:`, 190, (lineCount += 5), "right");
      state.doc.text(state.typeOfOrder, 100, lineCount, "right");
      state.doc.text(`Recipient:`, 190, (lineCount += 5), "right");
      state.doc.text(state.recipient, 100, lineCount, "right");
      state.doc.text(`Order:`, 190, (lineCount += 5), "right");
      orderFormatted.map((ord) => {
        if (lineCount > 275) {
          state.doc.addPage();
          state.doc.rect(10, 10, 190, 275);
          lineCount = 10;
        } else {
          state.doc.text(ord, 185, (lineCount += 5), "right");
        }
      });
    }

    if (state.order1) {
      state.doc.text(`Order 2.`, 190, (lineCount += 10), "right");
      state.doc.text(`Type of Order:`, 190, (lineCount += 5), "right");
      state.doc.text(state.typeOfOrder, 100, lineCount, "right");
      state.doc.text(`Recipient:`, 190, (lineCount += 5), "right");
      state.doc.text(state.recipient, 100, lineCount, "right");
      state.doc.text(`Order:`, 190, (lineCount += 5), "right");

      orderFormatted1.map((ord) => {
        if (lineCount > 275) {
          state.doc.addPage();
          state.doc.rect(10, 10, 190, 275);
          lineCount = 10;
        } else {
          state.doc.text(ord, 185, (lineCount += 5), "right");
        }
      });
    }

    if (state.order2) {
      state.doc.text(`Order 3.`, 190, (lineCount += 10), "right");
      state.doc.text(`Type of Order:`, 190, (lineCount += 5), "right");
      state.doc.text(state.typeOfOrder, 100, lineCount, "right");
      state.doc.text(`Recipient:`, 190, (lineCount += 5), "right");
      state.doc.text(state.recipient, 100, lineCount, "right");
      state.doc.text(`Order:`, 190, (lineCount += 5), "right");
      orderFormatted2.map((ord) => {
        if (lineCount > 275) {
          state.doc.addPage();
          state.doc.rect(10, 10, 190, 275);
          lineCount = 10;
        } else {
          state.doc.text(ord, 185, (lineCount += 5), "right");
        }
      });
    }
    state.doc.text(
      `القرار الأول: انهاء الاجتماع التمهيدي، وتكليف أمين سر هيئة التحكيم تزويد الأطراف بمحضر الاجتماع بعد توثيقة.`,
      190,
      (lineCount += 10),
      "right"
    );

    state.doc.text(
      `القرار الثاني: يتوجب على الأطراف الإمتثال والتقيد بالآجال التنظيمية المحددة في الجدول المشار له في البند (17).`,
      190,
      (lineCount += 10),
      "right"
    );
    state.doc.text(
      `انتهى الاجتماع التمهيدي في الساعة ${dates.endTime}، وتم عرض توقيع المحضر على الأطراف، وهيئة التحكيم، وأمين سر هيئة التحكيم. `,
      190,
      (lineCount += 10),
      "right"
    );

    state.doc.addImage(stamp, "jpeg", 70, (lineCount += 5), 50, 24);
    state.doc.addImage(stampSign, "jpeg", 50, (lineCount += 5), 50, 24);
    state.doc.save();

    setState({ ...state, doc: new jsPDF() });
  };

  const pad = (num) => {
    if (num < 10) {
      return "00" + num;
    } else if (num > 9 && num < 100) {
      return "0" + num;
    } else return num;
  };

  const download = (e) => {
    // var element = document.createElement("a");
    // var file = new Blob([`${baseURL}/${props.location.state}.${el}`], {
    //   type: "image/*",
    // });
    // element.href = URL.createObjectURL(file);
    // element.download = "image.jpg";
    // element.click();
    axios
      .get(`${baseURL}/${props.location.state.claimantSign}`)
      .then((response) => {
        alert("YES");
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "image.jpg"); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Container fluid style={styles.crumbContainer}>
        <Modal isOpen={show} toggle={toggle}>
          <ModalHeader
            toggle={toggle}
            style={{ color: "#008F53", fontWeight: "bolder" }}
          >
            {document.dir == "ltr" ? `Signatures` : "Signatures"}
          </ModalHeader>
          <ModalBody>
            {props.location.state.claimantSign && (
              <Row>
                <Col>
                  <a
                    target="_blank"
                    href={`${baseURL}/${props.location.state.claimantSign}`}
                    download
                  >
                    {/* <img
                    src={`${baseURL}/${props.location.state.claimantSign}`}
                    alt={props.location.state.claimantEmail}
                  /> */}
                    Claimant 1<sup>st</sup>
                  </a>
                </Col>
              </Row>
            )}
            {props.location.state.claimantSign2 && (
              <Row>
                <Col>
                  <a
                    target="_blank"
                    href={`${baseURL}/${props.location.state.claimantSign2}`}
                    download
                  >
                    {/* <img
                    src={`${baseURL}/${props.location.state.claimantSign}`}
                    alt={props.location.state.claimantEmail}
                  /> */}
                    Claimant 1<sup>nd</sup>
                  </a>
                </Col>
              </Row>
            )}
            {props.location.state.respondentSign && (
              <Row>
                <Col>
                  <a
                    target="_blank"
                    href={`${baseURL}/${props.location.state.respondentSign}`}
                    download
                  >
                    {/* <img
                    src={`${baseURL}/${props.location.state.claimantSign}`}
                    alt={props.location.state.claimantEmail}
                  /> */}
                    Respondent 1<sup>st</sup>
                  </a>
                </Col>
              </Row>
            )}
            {props.location.state.respondentSign2 && (
              <Row>
                <Col>
                  <a
                    target="_blank"
                    href={`${baseURL}/${props.location.state.respondentSign2}`}
                    download
                  >
                    {/* <img
                    src={`${baseURL}/${props.location.state.claimantSign}`}
                    alt={props.location.state.claimantEmail}
                  /> */}
                    Respondent 2<sup>nd</sup>
                  </a>
                </Col>
              </Row>
            )}
            {props.location.state.arbitrators.lenth > 0 &&
              props.location.state.arbitrators.map((arb) => {
                return (
                  <Row>
                    <Col>
                      <a
                        target="_blank"
                        href={`${baseURL}/${arb.signature}`}
                        download
                      >
                        {/* <img
                    src={`${baseURL}/${props.location.state.claimantSign}`}
                    alt={props.location.state.claimantEmail}
                  /> */}
                        Arbitrator
                      </a>
                    </Col>
                  </Row>
                );
              })}
          </ModalBody>
        </Modal>

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
          // onClick={
          // () => generatePdf(props.location.state)
          //   document.dir == "ltr"
          //     ? generatePdf(props.location.state)
          //     : generatePdfArabic(props.location.state)
          // }
        >
          Minutes of Preliminary Meeting
          <span
            style={{ float: "right", cursor: "pointer" }}
            className="mr-2"
            onClick={toggle}
          >
            Signatures
          </span>
        </h6>

        <Row className="ml-5 mr-5 mt-3 mb-3 ">
          <Col>
            <Card className="shadow">
              <CardBody onClick={generatePdf}>
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
                Arbitration rules, the meeting is being held on{" "}
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
        </Row>
        <hr />

        <Row>
          <Col>
            <Label>Claimant's Sign</Label>
            <CustomInput
              style={{
                overflow: "hidden",
                backgroundColor: "white",
                border: "none",
              }}
              type="file"
              name="claimant1"
              label={document.dir == "ltr" ? "Upload a File" : "تحميل ملف"}
              onChange={(e) => {
                // setState({ ...state, file: e.target.files[0] });
                setClaimant1(e.target.files[0]);
              }}
            />
          </Col>
          <Col>
            <Label>Respondent's Sign</Label>
            <CustomInput
              style={{
                overflow: "hidden",
                backgroundColor: "white",
                border: "none",
              }}
              type="file"
              name="respondent1"
              label={document.dir == "ltr" ? "Upload a File" : "تحميل ملف"}
              onChange={(e) => {
                // setState({ ...state, file: e.target.files[0] });
                setRespondent1(e.target.files[0]);
              }}
            />
          </Col>
          <Col>
            <Label>Chairman's Sign</Label>
            <CustomInput
              style={{
                overflow: "hidden",
                backgroundColor: "white",
                border: "none",
              }}
              type="file"
              name="chairman_"
              label={document.dir == "ltr" ? "Upload a File" : "تحميل ملف"}
              onChange={(e) => {
                // setState({ ...state, file: e.target.files[0] });
                setChairman_(e.target.files[0]);
              }}
            />
          </Col>
        </Row>
        {/* <Row className=" ml-5 mr-5">
          <Col>
            <CKEditor
              activeClass="p10"
              content={content}
              events={{
                blur: onBlur,
                afterPaste: afterPaste,
                change: onChange,
              }}
              style={{ border: "2px solid black" }}
            />
          </Col>
        </Row> */}

        {/* <Row className="ml-5 mr-5">
          <Col>
            <Input
              type="textarea"
              rows="8"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{ border: "1px solid black" }}
            />
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
export default Email12;
