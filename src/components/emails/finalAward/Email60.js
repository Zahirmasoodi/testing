import React, { useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Container,
  Input,
  Row,
  Col,
  Label,
  FormGroup,
  Table,
  Form,
} from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "../containers/Header";
import { getEnvironment } from "../../../config";
import pad from "../../../pad";
import jsPDF from "jspdf";
import sakkalMajalla from "../../../Majalli";
import stamp from "../../../assets/stamp.png";

const EmailDraftFinalAwardTribunal = (props) => {
  const baseURL = getEnvironment().apiUrl;

  const [state, setState] = useState({
    first: "",
    second: "",
    third: "",
    doc: new jsPDF(),
  });

  const [dates, setDates] = useState({
    issuanceDateHijri: "",
    issuanceDate: "",
    duration: "",
  });

  const [content, setContent] = useState({
    contentClosure: "1",
    contentComposeTribunal: "2",
    contentCorrespondence: "3",
    contentFacts: "4",
    contentReasoning: "5",
    contentSessions: "6",
    contentAdditional: "7",
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleDates = (e) => {
    setDates({
      ...dates,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (data) => {
    generatePdf(props.location.state);

    const pdf = new File([state.doc.output("blob")], "finalAward.pdf", {
      type: "application/pdf",
    });

    const formData = new FormData();
    formData.append("respondentEmail", data.respondentEmail);
    formData.append("respondentName", data.respondentName);
    formData.append("claimantEmail", data.claimantEmail);
    formData.append("claimantName", data.claimantName);
    formData.append("respondentEmail2", data.respondentEmail2);
    formData.append("respondentName2", data.respondentName2);
    formData.append("claimantEmail2", data.claimantEmail2);
    formData.append("claimantName2", data.claimantName2);
    formData.append("order", state.order);
    formData.append("date", dates.issuanceDate);
    formData.append("pdf", pdf);

    axios
      .post(`${baseURL}/email/finalAward`, formData)
      .then(() => {
        Swal.fire({
          title: "SENT",
          icon: "success",
        });
        // props.history.push({
        //   pathname: "/email/award",
        //   state: props.location.state,
        // });
      })
      .catch(() =>
        Swal.fire({
          title: "Something went Wrong",
          icon: "error",
        })
      );
  };

  const generatePdf = (data) => {
    state.doc.rect(5, 5, 200, 285);
    state.doc.setFontSize(15);
    let lineCount = 20;
    state.doc.text("Final Arbitration Award", 105, lineCount, "center");
    state.doc.text(
      `In Arbitral Case No. ARB${data.createdAt.split("-")[0]}-${
        data.caseNumber
      }`,
      105,
      (lineCount += 7),
      "center"
    );
    state.doc.setFontSize(12);
    state.doc.text(
      "Registered Under the International Islamic Center for Reconciliation and Arbitration",
      105,
      (lineCount += 7),
      "center"
    );
    state.doc.text(
      `Issued on ${dates.issuanceDate} corresponding to ${dates.issuanceDateHijri} Hijri`,
      105,
      (lineCount += 7),
      "center"
    );
    state.doc.text(
      `First: the parties and their representatives:`,
      15,
      (lineCount += 10)
    );
    state.doc.setFontSize(10);
    state.doc.text("Name of the Claimant: ", 20, (lineCount += 10));
    state.doc.text(data.claimantName, 80, lineCount);
    state.doc.text("Nationality", 20, (lineCount += 5));
    state.doc.text(data.claimantNationality, 80, lineCount);
    state.doc.text("Address", 20, (lineCount += 5));
    state.doc.text(data.claimantAddress, 80, lineCount);
    state.doc.text("Phone", 20, (lineCount += 5));
    state.doc.text(data.claimantPhone, 80, lineCount);
    state.doc.text("Email", 20, (lineCount += 5));
    state.doc.text(data.claimantEmail, 80, lineCount);

    if (data.claimantEmail2) {
      state.doc.text("Name of the Additional Claimant: ", 20, (lineCount += 5));
      state.doc.text(data.claimantName2, 80, lineCount);
      state.doc.text("Nationality", 20, (lineCount += 5));
      state.doc.text(data.claimantNationality2, 80, lineCount);
      state.doc.text("Address", 20, (lineCount += 5));
      state.doc.text(data.claimantAddress2, 80, lineCount);
      state.doc.text("Phone", 20, (lineCount += 5));
      state.doc.text(data.claimantPhone2, 80, lineCount);
      state.doc.text("Email", 20, (lineCount += 5));
      state.doc.text(data.claimantEmail2, 80, lineCount);
    }
    state.doc.text(
      `Hereinafter referred to as "The Claimant".`,
      20,
      (lineCount += 5)
    );
    state.doc.text("VS", 105, (lineCount += 7), "center");
    state.doc.setFontSize(10);
    state.doc.text("Name of the Respondent: ", 20, (lineCount += 7));
    state.doc.text(data.respondentName, 80, lineCount);
    state.doc.text("Nationality", 20, (lineCount += 5));
    state.doc.text(data.respondentNationality, 80, lineCount);
    state.doc.text("Address", 20, (lineCount += 5));
    state.doc.text(data.respondentAddress, 80, lineCount);
    state.doc.text("Phone", 20, (lineCount += 5));
    state.doc.text(data.respondentPhone, 80, lineCount);
    state.doc.text("Email", 20, (lineCount += 5));
    state.doc.text(data.respondentEmail, 80, lineCount);

    if (data.respondentEmail2) {
      state.doc.text(
        "Name of the Additional Respondent: ",
        20,
        (lineCount += 5)
      );
      state.doc.text(data.respondentName2, 80, lineCount);
      state.doc.text("Nationality", 20, (lineCount += 5));
      state.doc.text(data.respondentNationality2, 80, lineCount);
      state.doc.text("Address", 20, (lineCount += 5));
      state.doc.text(data.respondentAddress2, 80, lineCount);
      state.doc.text("Phone", 20, (lineCount += 5));
      state.doc.text(data.respondentPhone2, 80, lineCount);
      state.doc.text("Email", 20, (lineCount += 5));
      state.doc.text(data.respondentEmail2, 80, lineCount);
    }
    state.doc.text(
      `Hereinafter referred to as "The Respondent"`,
      20,
      (lineCount += 5)
    );
    state.doc.text(
      `The Claimant & the Respondent, both are referred to as (the “Parties”).`,
      20,
      (lineCount += 7)
    );
    if (lineCount > 260) {
      state.doc.addPage();
      state.doc.rect(5, 5, 200, 285);
      lineCount = 10;
    }
    state.doc.setFontSize(12);
    state.doc.text(`Second: The Arbitral Tribunal:`, 15, (lineCount += 10));
    state.doc.setFontSize(10);
    state.doc.text(
      `The Arbitral Tribunal was constituted in accordance with IICRA Rules by:`,
      20,
      (lineCount += 10)
    );

    data.arbitrators.map((arb) => {
      if (lineCount > 250) {
        state.doc.addPage();
        state.doc.rect(5, 5, 200, 285);
        lineCount = 10;
      }
      state.doc.text(`Arbitrator's Name`, 20, (lineCount += 7));
      state.doc.text(arb.name, 80, lineCount);
      state.doc.text(`Arbitrator's Email`, 20, (lineCount += 5));
      state.doc.text(arb.email, 80, lineCount);
      state.doc.text(`Arbitrator's Address`, 20, (lineCount += 5));
      state.doc.text(arb.address, 80, lineCount);
      state.doc.text(`Arbitrator's Nationality`, 20, (lineCount += 5));
      state.doc.text(`${arb.nationality}`, 80, lineCount);
    });
    if (lineCount > 250) {
      state.doc.addPage();
      state.doc.rect(5, 5, 200, 285);
      lineCount = 10;
    }
    if (data.rapporteurEmail) {
      state.doc.text(
        `Arbitral Tribunal Secretary’s Name`,
        20,
        (lineCount += 10)
      );
      state.doc.text(data.rapporteurName, 80, lineCount);
      state.doc.text(
        `Arbitral Tribunal Secretary’s Email`,
        20,
        (lineCount += 5)
      );
      state.doc.text(data.rapporteurEmail, 80, lineCount);
      state.doc.text(
        `Arbitral Tribunal Secretary’s Address`,
        20,
        (lineCount += 5)
      );
      state.doc.text(data.rapporteurAddress, 80, lineCount);
      state.doc.text(
        `Arbitral Tribunal Secretary’s Nationality`,
        20,
        (lineCount += 5)
      );
      state.doc.text(data.rapporteurNationality, 80, lineCount);
    }
    state.doc.setFontSize(12);
    if (lineCount > 255) {
      state.doc.addPage();
      state.doc.rect(5, 5, 200, 285);
      lineCount = 10;
    }
    state.doc.text(`Third: Facts of Arbitration Case:`, 20, (lineCount += 10));
    state.doc.setFontSize(10);
    state.doc.text(
      `After reviewing the Request for Arbitration and documents attached thereto related to the present Arbitration case, and after verifying the expiration of the time-limit granted to the Respondent to submit their defenses and arguments in the case, as follows:`,
      20,
      (lineCount += 10),
      { align: "justify", maxWidth: 175 }
    );
    // lineCount += 15;
    // let test = state.doc.getTextWidth(content.contentFacts);
    // state.doc.text(`${test}`, 20, (lineCount += 5));
    // state.doc.text(content.contentFacts, 20, (lineCount += 5), {
    //   maxWidth: 180,
    //   align: "justify",
    // });
    // state.doc.text("Sample", 20, (lineCount = lineCount + (test / 180) * 5));

    // state.doc.text(`${test / 110}`, 20, (lineCount += 5));
    // state.doc.text(content.contentFacts, 20, (lineCount += 5), {
    //   maxWidth: 180,
    //   align: "justify",
    // });
    // state.doc.text("Sample", 20, (lineCount = lineCount + (test / 180) * 5));

    lineCount += 10;
    let facts_ = content.contentFacts.match(/.{1,110}/g);
    facts_.map((fct) => {
      if (lineCount > 270) {
        state.doc.addPage();
        state.doc.rect(5, 5, 200, 285);
        lineCount = 10;
      } else {
        state.doc.text(fct, 20, (lineCount += 5));
      }
    });
    state.doc.setFontSize(12);
    state.doc.text(`Fourth: Arbitral Proceedings:`, 15, (lineCount += 10));
    state.doc.setFontSize(10);
    state.doc.text(`1. Request for Arbitration:`, 20, (lineCount += 5));
    let reliefSought_ = data.reliefSought.match(/.{1,110}/g);
    reliefSought_.map((rs) => {
      if (lineCount > 270) {
        state.doc.addPage();
        state.doc.rect(5, 5, 200, 285);
        lineCount = 10;
      } else {
        state.doc.text(rs, 20, (lineCount += 5));
      }
    });
    state.doc.text(
      `2. Registration of the Request for Arbitration:`,
      20,
      (lineCount += 5)
    );
    state.doc.text(data.createdAt.split("T")[0], 20, (lineCount += 5));
    state.doc.text(
      `3. Composition of the Arbitral Tribunal:`,
      20,
      (lineCount += 5)
    );
    let contentComposeTribunal_ =
      content.contentComposeTribunal.match(/.{1,110}/g);
    contentComposeTribunal_.map((ct) => {
      if (lineCount > 270) {
        state.doc.addPage();
        state.doc.rect(5, 5, 200, 285);
        lineCount = 10;
      } else {
        state.doc.text(ct, 20, (lineCount += 5));
      }
    });
    state.doc.text(
      `4. Arbitration Clause or Arbitration Agreement:`,
      20,
      (lineCount += 5)
    );

    let arbitrationAgreement_ = data.arbitrationAgreement.match(/.{1,110}/g);
    arbitrationAgreement_.map((aa) => {
      if (lineCount > 270) {
        state.doc.addPage();
        state.doc.rect(5, 5, 200, 285);
        lineCount = 10;
      } else {
        state.doc.text(aa, 20, (lineCount += 5));
      }
    });
    state.doc.text(`5. Language of Arbitration:`, 20, (lineCount += 5));
    state.doc.text(data.arbitrationLanguage, 20, (lineCount += 5));

    state.doc.text(`6. Place of arbitration:`, 20, (lineCount += 5));
    state.doc.text(data.placeOfArbitration, 20, (lineCount += 5));
    if (lineCount > 270) {
      state.doc.addPage();
      state.doc.rect(5, 5, 200, 285);
      lineCount = 10;
    }
    state.doc.text(
      `7. The applicable substantive and procedural law:`,
      20,
      (lineCount += 5)
    );
    state.doc.text(data.governingLaw, 20, (lineCount += 5));
    state.doc.text(`8. Duration of Arbitration:`, 20, (lineCount += 5));
    state.doc.text(`${dates.duration}`, 20, (lineCount += 5));
    if (lineCount > 270) {
      state.doc.addPage();
      state.doc.rect(5, 5, 200, 285);
      lineCount = 10;
    }
    state.doc.text(
      `9. Holding Preliminary Meeting and exchanging Correspondence:`,
      20,
      (lineCount += 5)
    );

    let contentCorrespondence_ =
      content.contentCorrespondence.match(/.{1,110}/g);
    contentCorrespondence_.map((cc) => {
      if (lineCount > 270) {
        state.doc.addPage();
        state.doc.rect(5, 5, 200, 285);
        lineCount = 10;
      } else state.doc.text(cc, 20, (lineCount += 5));
    });
    state.doc.text(`10. Arbitration sessions:`, 20, (lineCount += 5));
    let contentSessions_ = content.contentSessions.match(/.{1,110}/g);
    contentSessions_.map((cs) => {
      if (lineCount > 270) {
        state.doc.addPage();
        state.doc.rect(5, 5, 200, 285);
        lineCount = 10;
      } else state.doc.text(cs, 20, (lineCount += 5));
    });
    state.doc.text(
      `11. Additional procedures (Appointment of Experts, Hearing Witnesses, & Examination):`,
      20,
      (lineCount += 5)
    );
    let contentAdditional_ = content.contentAdditional.match(/.{1,110}/g);
    contentAdditional_.map((ca) => {
      if (lineCount > 270) {
        state.doc.addPage();
        state.doc.rect(5, 5, 200, 285);
        lineCount = 10;
      } else state.doc.text(ca, 20, (lineCount += 5));
    });
    state.doc.text(
      `12. Final Submission & Closing of Proceedings:`,
      20,
      (lineCount += 5)
    );
    let contentClosure_ = content.contentClosure.match(/.{1,110}/g);
    contentClosure_.map((cc) => {
      if (lineCount > 270) {
        state.doc.addPage();
        state.doc.rect(5, 5, 200, 285);
        lineCount = 10;
      } else state.doc.text(cc, 20, (lineCount += 5));
    });
    state.doc.text(
      `The Arbitral Tribunal ensured that the parties were given sufficient and appropriate time periods to present their arguments and defenses, and accordingly decided on …/…/….to close the Arbitral proceedings and reserve the Case for the issuance of final Arbitral Award.`,
      20,
      (lineCount += 5),
      { align: "justify", maxWidth: 175 }
    );
    // state.doc.text(
    //   `arguments and defenses, and accordingly decided on …/…/….to close the Arbitral proceedings and reserve the`,
    //   20,
    //   (lineCount += 5),
    //   { align: "justify", maxWidth: 175 }
    // );
    // state.doc.text(
    //   `Case for the issuance of final Arbitral Award.`,
    //   20,
    //   (lineCount += 5),
    //   { align: "justify", maxWidth: 175 }
    // );
    if (lineCount > 270) {
      state.doc.addPage();
      state.doc.rect(5, 5, 200, 285);
      lineCount = 10;
    }
    state.doc.setFontSize(12);
    state.doc.text(`Fifthly: Reasoning of the Award:`, 15, (lineCount += 15));
    state.doc.setFontSize(10);
    let contentReasoning_ = content.contentReasoning.match(/.{1,110}/g);
    contentReasoning_.map((cr) => {
      if (lineCount > 270) {
        state.doc.addPage();
        state.doc.rect(5, 5, 200, 285);
        lineCount = 10;
      } else state.doc.text(cr, 20, (lineCount += 5));
    });
    if (lineCount > 260) {
      state.doc.addPage();
      state.doc.rect(5, 5, 200, 285);
      lineCount = 10;
    }
    state.doc.text(`FINAL ARBITRAL AWARD`, 20, (lineCount += 10));

    state.doc.text(
      `After reviewing the arbitration case file and all the documents attached thereto, and after careful consideration and deliberation of the Tribunal on all the available date and information in light of the applicable law to the dispute, which is (…… ..............), the Arbitration Rules under the International Islamic Center for Reconciliation and Arbitration, and the Shari’a Provisions for financial the transaction, the tribunal determines the following:`,
      20,
      (lineCount += 5),
      { align: "justify", maxWidth: 175 }
    );
    // state.doc.text(
    //   `deliberation of the Tribunal on all the available date and information in light of the applicable law to the dispute,`,
    //   20,
    //   (lineCount += 5),
    //   { align: "justify", maxWidth: 175 }
    // );
    // state.doc.text(
    //   `which is (…… ..............), the Arbitration Rules under the International Islamic Center for Reconciliation and`,
    //   20,
    //   (lineCount += 5),
    //   { align: "justify", maxWidth: 175 }
    // );
    // state.doc.text(
    //   `Arbitration, and the Shari’a Provisions for financial the transaction, the tribunal determines the following:`,
    //   20,
    //   (lineCount += 5),
    //   { align: "justify", maxWidth: 175 }
    // );
    state.doc.text(`First: `, 20, (lineCount += 20));
    let first_ = state.first.match(/.{1,110}/g);
    first_.map((fst) => {
      if (lineCount > 270) {
        state.doc.addPage();
        state.doc.rect(5, 5, 200, 285);
        lineCount = 10;
      } else state.doc.text(fst, 24, (lineCount += 5));
    });
    state.doc.text(`Second: `, 20, (lineCount += 5));
    let second_ = state.second.match(/.{1,110}/g);
    second_.map((snd) => {
      if (lineCount > 270) {
        state.doc.addPage();
        state.doc.rect(5, 5, 200, 285);
        lineCount = 10;
      } else state.doc.text(snd, 24, (lineCount += 5));
    });
    state.doc.text(`Third: `, 20, (lineCount += 5));
    let third_ = state.third.match(/.{1,110}/g);
    third_.map((trd) => {
      if (lineCount > 270) {
        state.doc.addPage();
        state.doc.rect(5, 5, 200, 285);
        lineCount = 10;
      } else state.doc.text(trd, 24, (lineCount += 5));
    });
    state.doc.text(`Signature:`, 20, (lineCount += 5));
    state.doc.addImage(stamp, "jpeg", 70, (lineCount += 5), 50, 24);

    state.doc.save();
    setState({ ...state, doc: new jsPDF() });
  };

  const generatePdfArabic = (data) => {
    state.doc.addFileToVFS("MyFont.ttf", sakkalMajalla);
    state.doc.addFont("MyFont.ttf", "MyFont", "normal");
    state.doc.setFont("MyFont");

    state.doc.rect(5, 5, 200, 285);
    state.doc.setFontSize(15);
    let lineCount = 20;
    state.doc.text("حكم التحكيم النهائي", 105, lineCount, "center");
    state.doc.text(
      `ARB${data.createdAt.split("-")[0]}-${
        data.caseNumber
      } :في الدعوى التحكيمية رقم`,
      105,
      (lineCount += 7),
      "center"
    );
    state.doc.setFontSize(12);
    state.doc.text(
      "المقيدة لدى المركز الاسلامي الدولي للصلح والتحكيم (المركز)",
      105,
      (lineCount += 7),
      "center"
    );
    state.doc.text(
      `صدر في بتاريخ  ${dates.issuanceDate} هجري الموافق ${dates.issuanceDateHijri} ميلادي`,
      105,
      (lineCount += 7),
      "center"
    );
    state.doc.text(`أولاً: الأطراف وممثيلهم:`, 195, (lineCount += 10), "right");
    state.doc.setFontSize(10);
    state.doc.text("المتحكم", 190, (lineCount += 10), "right");
    state.doc.text(data.claimantName, 80, lineCount, "right");
    state.doc.text("جنسية", 190, (lineCount += 5), "right");
    state.doc.text(data.claimantNationality, 80, lineCount, "right");
    state.doc.text("عنوان", 190, (lineCount += 5), "right");
    state.doc.text(data.claimantAddress, 80, lineCount, "right");
    state.doc.text("رقم الهاتف", 190, (lineCount += 5), "right");
    state.doc.text(data.claimantPhone, 80, lineCount, "right");
    state.doc.text("بريد إلكتروني", 190, (lineCount += 5), "right");
    state.doc.text(data.claimantEmail, 80, lineCount, "right");

    if (data.claimantEmail2) {
      state.doc.text("المتحكم ثانيا", 190, (lineCount += 5), "right");
      state.doc.text(data.claimantName2, 80, lineCount, "right");
      state.doc.text("جنسية", 190, (lineCount += 5), "right");
      state.doc.text(data.claimantNationality2, 80, lineCount, "right");
      state.doc.text("عنوان", 190, (lineCount += 5), "right");
      state.doc.text(data.claimantAddress2, 80, lineCount, "right");
      state.doc.text("رقم الهاتف", 190, (lineCount += 5), "right");
      state.doc.text(data.claimantPhone2, 80, lineCount, "right");
      state.doc.text("بريد إلكتروني", 190, (lineCount += 5), "right");
      state.doc.text(data.claimantEmail2, 80, lineCount, "right");
    }
    state.doc.text(
      `يشار اليه  فيما يلي بـــ"المحتكم"`,
      190,
      (lineCount += 5),
      "right"
    );
    state.doc.text("ضد", 105, (lineCount += 7), "center");
    state.doc.setFontSize(10);
    state.doc.text("المحتكم ضده", 190, (lineCount += 7), "right");
    state.doc.text(data.respondentName, 80, lineCount, "right");
    state.doc.text("جنسية", 190, (lineCount += 5), "right");
    state.doc.text(data.respondentNationality, 80, lineCount, "right");
    state.doc.text("عنوان", 190, (lineCount += 5), "right");
    state.doc.text(data.respondentAddress, 80, lineCount, "right");
    state.doc.text("رقم الهاتف", 190, (lineCount += 5), "right");
    state.doc.text(data.respondentPhone, 80, lineCount, "right");
    state.doc.text("بريد إلكتروني", 190, (lineCount += 5), "right");
    state.doc.text(data.respondentEmail, 80, lineCount, "right");

    if (data.respondentEmail2) {
      state.doc.text("المحتكم ضده ثانيا", 190, (lineCount += 5), "right");
      state.doc.text(data.respondentName2, 80, lineCount, "right");
      state.doc.text("جنسية", 190, (lineCount += 5), "right");
      state.doc.text(data.respondentNationality2, 80, lineCount, "right");
      state.doc.text("عنوان", 190, (lineCount += 5), "right");
      state.doc.text(data.respondentAddress2, 80, lineCount, "right");
      state.doc.text("رقم الهاتف", 190, (lineCount += 5), "right");
      state.doc.text(data.respondentPhone2, 80, lineCount, "right");
      state.doc.text("بريد إلكتروني", 190, (lineCount += 5), "right");
      state.doc.text(data.respondentEmail2, 80, lineCount, "right");
    }
    state.doc.text(
      `السادة/ يشار اليها  فيما يلي بـــ "المحتكم ضده"`,
      190,
      (lineCount += 5),
      "right"
    );
    state.doc.text(
      `يشار للمحتكم والمحتكم ضده بـــــ "الأطراف".`,
      190,
      (lineCount += 7),
      "right"
    );
    if (lineCount > 260) {
      state.doc.addPage();
      state.doc.rect(5, 5, 200, 285);
      lineCount = 10;
    }
    state.doc.setFontSize(12);
    state.doc.text(`:ثانيًا: هيئة التحكيم`, 195, (lineCount += 10), "right");
    state.doc.setFontSize(10);
    state.doc.text(
      `شكلت هيئة التحكيم وفق قواعد المركز من:`,
      190,
      (lineCount += 10),
      "right"
    );

    data.arbitrators.map((arb) => {
      if (lineCount > 250) {
        state.doc.addPage();
        state.doc.rect(5, 5, 200, 285);
        lineCount = 10;
      }
      state.doc.text(`اسم المحكم`, 190, (lineCount += 7), "right");
      state.doc.text(arb.name, 80, lineCount, "right");
      state.doc.text(`بريد إلكتروني`, 190, (lineCount += 5), "right");
      state.doc.text(arb.email, 80, lineCount, "right");
      state.doc.text(`عنوان`, 190, (lineCount += 5), "right");
      state.doc.text(arb.address, 80, lineCount, "right");
      state.doc.text(`جنسية`, 190, (lineCount += 5), "right");
      state.doc.text(`${arb.nationality}`, 80, lineCount, "right");
    });
    if (lineCount > 250) {
      state.doc.addPage();
      state.doc.rect(5, 5, 200, 285);
      lineCount = 10;
    }
    if (data.rapporteurEmail) {
      state.doc.text(`أمين سر هيئة التحكيم`, 190, (lineCount += 10), "right");
      state.doc.text(data.rapporteurName, 80, lineCount, "right");
      state.doc.text(`بريد الكتروني`, 190, (lineCount += 5), "right");
      state.doc.text(data.rapporteurEmail, 80, lineCount, "right");
      state.doc.text(`عنوان`, 190, (lineCount += 5), "right");
      state.doc.text(data.rapporteurAddress, 80, lineCount, "right");
      state.doc.text(`الجنسية`, 190, (lineCount += 5), "right");
      state.doc.text(data.rapporteurNationality, 80, lineCount, "right");
    }
    state.doc.setFontSize(12);
    if (lineCount > 255) {
      state.doc.addPage();
      state.doc.rect(5, 5, 200, 285);
      lineCount = 10;
    }
    state.doc.text(
      `:ثالثًا: وقائع الدعوى التحكيمية`,
      195,
      (lineCount += 10),
      "right"
    );
    state.doc.setFontSize(10);
    state.doc.text(
      `بعد الاطلاع على طلب التحكيم وما أرفق به من مستندات متعلقة بالدعوى التحكيمية الماثلة، وبعد التحقق من نفاذ الآجل الممنوح للمحتكم ضدهما لتقديم دفوعهما`,
      190,
      (lineCount += 10),
      "right"
    );

    state.doc.text(
      `:ومستنداتهما على الدعوى الماثلة، على النحو التالي`,
      190,
      (lineCount += 5),
      "right"
    );

    let facts_ = content.contentFacts.match(/.{1,110}/g);
    facts_.map((fct) => {
      if (lineCount > 270) {
        state.doc.addPage();
        state.doc.rect(5, 5, 200, 285);
        lineCount = 10;
      } else {
        state.doc.text(fct, 190, (lineCount += 5), "right");
      }
    });
    state.doc.setFontSize(12);
    state.doc.text(`:رابعًا: إجراءات التحكيم`, 195, (lineCount += 10), "right");
    state.doc.setFontSize(10);
    state.doc.text(`:١. طلب التحكيم`, 190, (lineCount += 5), "right");
    let reliefSought_ = data.reliefSought.match(/.{1,110}/g);
    reliefSought_.map((rs) => {
      if (lineCount > 270) {
        state.doc.addPage();
        state.doc.rect(5, 5, 200, 285);
        lineCount = 10;
      } else {
        state.doc.text(rs, 187, (lineCount += 5), "right");
      }
    });
    state.doc.text(`:٢. قيد طلب التحكيم`, 190, (lineCount += 5), "right");
    state.doc.text(data.createdAt.split("T")[0], 80, (lineCount += 5), "right");
    state.doc.text(`:٣. تشكيل هيئة التحكيم`, 190, (lineCount += 5), "right");
    let contentComposeTribunal_ =
      content.contentComposeTribunal.match(/.{1,110}/g);
    contentComposeTribunal_.map((ct) => {
      if (lineCount > 270) {
        state.doc.addPage();
        state.doc.rect(5, 5, 200, 285);
        lineCount = 10;
      } else {
        state.doc.text(ct, 187, (lineCount += 5), "right");
      }
    });
    state.doc.text(
      `:٤. شرط التحكيم أو مشارطة التحكيم`,
      190,
      (lineCount += 5),
      "right"
    );

    let arbitrationAgreement_ = data.arbitrationAgreement.match(/.{1,110}/g);
    arbitrationAgreement_.map((aa) => {
      if (lineCount > 270) {
        state.doc.addPage();
        state.doc.rect(5, 5, 200, 285);
        lineCount = 10;
      } else {
        state.doc.text(aa, 187, (lineCount += 5), "right");
      }
    });
    state.doc.text(`:٥. لغة التحكيم`, 190, (lineCount += 5), "right");
    state.doc.text(data.arbitrationLanguage, 80, (lineCount += 5), "right");

    state.doc.text(`:٦. مكان التحكيم`, 190, (lineCount += 5), "right");
    state.doc.text(data.placeOfArbitration, 80, (lineCount += 5), "right");
    if (lineCount > 270) {
      state.doc.addPage();
      state.doc.rect(5, 5, 200, 285);
      lineCount = 10;
    }
    state.doc.text(
      `:٧. القانون الموضوعي والاجرائي الواجب التطبيق`,
      190,
      (lineCount += 5),
      "right"
    );
    state.doc.text(data.governingLaw, 80, (lineCount += 5), "right");
    state.doc.text(`:٨. مدة التحكيم`, 190, (lineCount += 5), "right");
    state.doc.text(`${dates.duration}`, 80, (lineCount += 5), "right");
    if (lineCount > 270) {
      state.doc.addPage();
      state.doc.rect(5, 5, 200, 285);
      lineCount = 10;
    }
    state.doc.text(
      `:٩. عقد الاجتماع التمهيدي وتبادل المذكرات`,
      190,
      (lineCount += 5),
      "right"
    );

    let contentCorrespondence_ =
      content.contentCorrespondence.match(/.{1,110}/g);
    contentCorrespondence_.map((cc) => {
      if (lineCount > 270) {
        state.doc.addPage();
        state.doc.rect(5, 5, 200, 285);
        lineCount = 10;
      } else state.doc.text(cc, 190, (lineCount += 5), "right");
    });
    state.doc.text(`:١٠. عقد جلسات تحكيم`, 190, (lineCount += 5), "right");
    let contentSessions_ = content.contentSessions.match(/.{1,110}/g);
    contentSessions_.map((cs) => {
      if (lineCount > 270) {
        state.doc.addPage();
        state.doc.rect(5, 5, 200, 285);
        lineCount = 10;
      } else state.doc.text(cs, 190, (lineCount += 5), "right");
    });
    state.doc.text(
      `:١١. إجراءات إضافية (تعيين خبرة، سماع شهود، معاينة)`,
      190,
      (lineCount += 5),
      "right"
    );
    let contentAdditional_ = content.contentAdditional.match(/.{1,110}/g);
    contentAdditional_.map((ca) => {
      if (lineCount > 270) {
        state.doc.addPage();
        state.doc.rect(5, 5, 200, 285);
        lineCount = 10;
      } else state.doc.text(ca, 190, (lineCount += 5), "right");
    });
    state.doc.text(
      `:١٢. المذكرات الختامية، وغلق باب المرافعة`,
      190,
      (lineCount += 5),
      "right"
    );
    let contentClosure_ = content.contentClosure.match(/.{1,110}/g);
    contentClosure_.map((cc) => {
      if (lineCount > 270) {
        state.doc.addPage();
        state.doc.rect(5, 5, 200, 285);
        lineCount = 10;
      } else state.doc.text(cc, 190, (lineCount += 5), "right");
    });
    state.doc.text(
      `تأكدت هيئة التحكيم من منح الأطراف المهل الكافية واللازمة لتقديم حججهم ودفوعهم، وعليه قررت بتاريخ............................... غلق باب المرافعة وحجز الدعوى للحكم.`,
      190,
      (lineCount += 5),
      "right"
    );
    if (lineCount > 270) {
      state.doc.addPage();
      state.doc.rect(5, 5, 200, 285);
      lineCount = 10;
    }
    state.doc.setFontSize(12);
    state.doc.text(`خامسًا: تعليل الحكم:`, 195, (lineCount += 10), "right");
    state.doc.setFontSize(10);
    let contentReasoning_ = content.contentReasoning.match(/.{1,110}/g);
    contentReasoning_.map((cr) => {
      if (lineCount > 270) {
        state.doc.addPage();
        state.doc.rect(5, 5, 200, 285);
        lineCount = 10;
      } else state.doc.text(cr, 190, (lineCount += 5), "right");
    });
    if (lineCount > 260) {
      state.doc.addPage();
      state.doc.rect(5, 5, 200, 285);
      lineCount = 10;
    }
    state.doc.text(`منطوق الحكم:`, 190, (lineCount += 10), "right");

    state.doc.text(
      `بعد الاطلاع على ملف الدعوى التحكيمية وكافة مستنداتها، وبعد دراسة وتدقيق هيئة التحكيم لكافة معطياتها في ضوء القانون واجب التطبيق على النزاع وهو، وقواعد`,
      190,
      (lineCount += 5),
      "right"
    );
    state.doc.text(
      `:التحكيم المعتمدة لدى المركز الاسلامي الدولي للصلح والتحكيم، والأحكام الشرعية للمعاملة، صدر الحكم التالي`,
      190,
      (lineCount += 5),
      "right"
    );
    state.doc.text(`أولاً:`, 190, (lineCount += 10), "right");
    let first_ = state.first.match(/.{1,110}/g);
    first_.map((fst) => {
      if (lineCount > 270) {
        state.doc.addPage();
        state.doc.rect(5, 5, 200, 285);
        lineCount = 10;
      } else state.doc.text(fst, 190, (lineCount += 5), "right");
    });
    state.doc.text(`ثانيًا:`, 190, (lineCount += 10), "right");
    let second_ = state.second.match(/.{1,110}/g);
    second_.map((scd) => {
      if (lineCount > 270) {
        state.doc.addPage();
        state.doc.rect(5, 5, 200, 285);
        lineCount = 10;
      } else state.doc.text(scd, 190, (lineCount += 5), "right");
    });
    state.doc.text(`ثالثًا:`, 190, (lineCount += 10), "right");
    let third_ = state.third.match(/.{1,110}/g);
    third_.map((trd) => {
      if (lineCount > 270) {
        state.doc.addPage();
        state.doc.rect(5, 5, 200, 285);
        lineCount = 10;
      } else state.doc.text(trd, 190, (lineCount += 5), "right");
    });
    state.doc.text(`توقيع:`, 190, (lineCount += 10), "right");

    state.doc.save();
    setState({ ...state, doc: new jsPDF() });
  };

  return (
    <>
      <Header
        data={props.location.state}
        stepName="Issuance of Final Award"
        stepPathPrev="issuance"
        stepPath="award"
        name="Provide the Shari'ah Committee a Draft Final Award - Arbitral Tribunal"
      />
      <Container fluid style={styles.formUserContainer}>
        <h6
          style={styles.center}
          onClick={() => generatePdf(props.location.state)}
        >
          {document.dir == "ltr"
            ? "Final Arbitration Award"
            : "حكم التحكيم النهائي"}
        </h6>

        <Row className="ml-5 mr-5 mt-3 mb-3 ">
          <Col>
            <Card className="shadow">
              <CardBody className="text-center">
                <h5>
                  In Arbitral Case No ARB
                  {props.location.state.createdAt.split("-")[0]}-
                  {pad(props.location.state.caseNumber)}
                </h5>
                <h6>
                  Registered Under the International Islamic Center for
                  Reconciliation and Arbitration (the Center) Issued on .......
                  2021 corresponding to ----- AD
                </h6>
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
            <Label>Issued on</Label>
            <Input
              type="date"
              name="issuanceDate"
              value={dates.issuanceDate}
              onChange={handleDates}
            />
          </Col>
          <Col>
            <Label>Issued on (Hijri)</Label>
            <Input
              type="text"
              name="issuanceDateHijri"
              value={dates.issuanceDateHijri}
              onChange={handleDates}
            />
          </Col>

          <Col>
            <Label>Duration</Label>
            <Input
              type="select"
              name="duration"
              value={dates.duration}
              onChange={handleDates}
            >
              <option>3 Months</option>
              <option>4 Months</option>
              <option>5 Months</option>
              <option>6 Months</option>
            </Input>
          </Col>

          <Col style={{ textAlign: "right" }}>
            <br />
            <Button
              color="success"
              onClick={() => handleSubmit(props.location.state)}
            >
              Submit
            </Button>
          </Col>
        </Row>
        <Row className="m-5">
          <Col>
            <Label>Facts:</Label>
            <Input
              type="textarea"
              className="shadow"
              name="contentFacts"
              value={content.contentFacts}
              onChange={(e) =>
                setContent({ ...content, contentFacts: e.target.value })
              }
              className="shadow-lg"
              rows="8"
            />
          </Col>
          <Col>
            <Label>Composition of the Arbitral Tribunal:</Label>
            <Input
              type="textarea"
              className="shadow"
              name="contentComposeTribunal"
              value={content.contentComposeTribunal}
              onChange={(e) =>
                setContent({
                  ...content,
                  contentComposeTribunal: e.target.value,
                })
              }
              className="shadow-lg"
              rows="8"
            />
          </Col>
        </Row>
        <hr />

        <Row className="m-5">
          <Col>
            <Label>
              Holding Preliminary Meeting and exchanging Correspondence:
            </Label>
            <Input
              type="textarea"
              className="shadow"
              name="contentCorrespondence"
              value={content.contentCorrespondence}
              onChange={(e) =>
                setContent({
                  ...content,
                  contentCorrespondence: e.target.value,
                })
              }
              className="shadow-lg"
              rows="8"
            />
          </Col>
          <Col>
            <Label>Arbitration Sessions:</Label>
            <Input
              type="textarea"
              className="shadow"
              name="contentSessions"
              value={content.contentSessions}
              onChange={(e) =>
                setContent({
                  ...content,
                  contentSessions: e.target.value,
                })
              }
              className="shadow-lg"
              rows="8"
            />
          </Col>
        </Row>
        <hr />

        <Row className="m-5">
          <Col>
            <Label>Additional procedures:</Label>
            <Input
              type="textarea"
              className="shadow"
              name="contentAdditional"
              value={content.contentAdditional}
              onChange={(e) =>
                setContent({
                  ...content,
                  contentAdditional: e.target.value,
                })
              }
              className="shadow-lg"
              rows="8"
            />
          </Col>
          <Col>
            <Label>Final Submission & Closing of Proceedings:</Label>
            <Input
              type="textarea"
              className="shadow"
              name="contentClosure"
              value={content.contentClosure}
              onChange={(e) =>
                setContent({
                  ...content,
                  contentClosure: e.target.value,
                })
              }
              className="shadow-lg"
              rows="8"
            />
          </Col>
        </Row>
        <hr />
        <Row className="m-5">
          <Col>
            <Label>Reasoning of the Award:</Label>
            <Input
              type="textarea"
              className="shadow"
              name="contentReasoning"
              value={content.contentReasoning}
              onChange={(e) =>
                setContent({
                  ...content,
                  contentReasoning: e.target.value,
                })
              }
              className="shadow-lg"
              rows="8"
            />
          </Col>
        </Row>
        <hr />

        <Row className="m-5">
          <Col>
            <Form>
              <Row>
                <Col sm={12}>
                  <FormGroup>
                    <Label>First</Label>
                    <Input
                      type="textarea"
                      rows="5"
                      className="shadow"
                      name="first"
                      value={state.first}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col sm={12}>
                  <FormGroup>
                    <Label>Second</Label>
                    <Input
                      type="textarea"
                      rows="5"
                      className="shadow"
                      name="second"
                      value={state.second}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col sm={12}>
                  <FormGroup>
                    <Label>Third</Label>
                    <Input
                      type="textarea"
                      rows="5"
                      className="shadow"
                      name="third"
                      value={state.third}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <Row className="ml-5 mr-5 pb-3" style={{ textAlign: "right" }}>
          <Col>
            <Button onClick={() => handleSubmit(props.location.state)}>
              Submit
            </Button>
          </Col>
        </Row>
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
    marginTop: "5vh",
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
export default EmailDraftFinalAwardTribunal;
