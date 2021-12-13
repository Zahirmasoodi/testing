import React, { useState } from "react";
import { Card, CardBody, CardHeader, Button, Container } from "reactstrap";
import axios from "axios";
import { jsPDF } from "jspdf";
import header from "../../../assets/letterHead.png";
import { getEnvironment } from "../../../config";
import Swal from "sweetalert2";
import myFont from "../../form/jspdfArabic";
import Header from "../containers/Header";
import pad from "../../../pad";
import stamp from "../../../assets/stamp.png";

const EmailMissionContractRapSole = (props) => {
  const baseURL = getEnvironment().apiUrl;
  const [sign, setSign] = useState("");
  const [date, setDate] = useState("");
  const [state, setState] = useState({
    allCases: [],
    resEmail: "",
    claEmail: "",
    filingDate: "",
    notes: "",
    doc: new jsPDF(),
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleText = (e) => {
    setState({ ...state, notes: e.target.value });
  };

  const handleSend = (data) => {
    const formData = new FormData();
    formData.append("respondentEmail", data.respondentEmail);
    formData.append("respondentName", data.respondentName);
    formData.append("respondentAddress", data.respondentAddress);
    formData.append("respondentPhone", data.respondentPhone);
    formData.append("claimantEmail", data.claimantEmail);
    formData.append("claimantName", data.claimantName);
    formData.append("createdAt", data.createdAt);
    formData.append("natureOfDispute", data.natureOfDispute);
    formData.append("notes", state.notes);

    axios
      .post(`${baseURL}/email/`, formData)
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

  const generatePdf = (data) => {
    state.doc.rect(10, 10, 190, 275);
    state.doc.setFontSize(15);
    let lineCount = 20;
    state.doc.text("Mission Contract", 105, lineCount, "center");
    state.doc.setFontSize(10);
    state.doc.text(
      `This contract was approved on ${date} between:`,
      20,
      (lineCount += 10)
    );
    state.doc.text(
      "1 - First Party: A Member of the Arbitral Tribunal, respectively: ",
      20,
      (lineCount += 10)
    );
    {
      props.location.state.arbitrators.length > 0 &&
        props.location.state.arbitrators.map((arb) => {
          state.doc.text("Arbitrator Full Name: ", 30, (lineCount += 5));
          state.doc.text(arb.name, 100, lineCount);
          state.doc.text("Nationality", 30, (lineCount += 5));
          state.doc.text(arb.nationality, 100, lineCount);
          state.doc.text("Address", 30, (lineCount += 5));
          state.doc.text(arb.address, 100, lineCount);
          state.doc.text("Phone", 30, (lineCount += 5));
          state.doc.text(arb.phone, 100, lineCount);
          state.doc.text("Email", 30, (lineCount += 5));
          state.doc.text(arb.email, 100, lineCount);
          state.doc.text(
            "Herein referred as 'Arbitrator'",
            30,
            (lineCount += 5)
          );
        });
    }

    state.doc.text(
      "2 - Second Party: A Rapporteur, respectively: ",
      20,
      (lineCount += 10)
    );

    state.doc.setFontSize(15);
    state.doc.text("Preamble", 105, (lineCount += 10), "center");

    state.doc.setFontSize(10);
    state.doc.text(
      `Whereas the Arbitral Tribunal appointed for the Arbitration Case No. ______ is confirmed, accepted with all capacity to take over the task.`,
      20,
      (lineCount += 10)
    );
    state.doc.text(
      `Whereas the Rapporteur appointed for the Arbitration Case No. ______ is confirmed, accepted with all capacity to carry out the assigned duties and responsibilities.`,
      20,
      (lineCount += 10)
    );
    state.doc.text(
      `Whereas the mission of the Arbitral Tribunal and Rapporteur shall be conducted according to IICRA Rules and Provisions with regards to this contract. The Arbitral proceedings and all communications of the Arbitral Tribunal and Rapporteur, and orders thereof shall be made in Arabic and English, or any other languages as agreed by the Parties and Arbitral Tribunal. Meanwhile, the Final Award shall be issued in English language along with the translation in Arabic language as agreed by the parties to the disputes.`,
      20,
      (lineCount += 5)
    );

    state.doc.setFontSize(12);
    state.doc.text(
      "NOW, THEREFORE, THE PARTIES HERETO AGREE AS FOLLOWING TERMS & CONDITIONS:",
      20,
      (lineCount += 10)
    );

    state.doc.text(
      "Article I: The Objective of Contracting",
      20,
      (lineCount += 10)
    );
    state.doc.setFontSize(10);
    state.doc.text(
      "The Arbitrator undertakes to assume its task efficiently and professionally to settle the dispute in Arbitration",
      25,
      (lineCount += 5)
    );
    state.doc.text(
      `Case No. ARB${props.location.state.createdAt.split("-")[0]}${pad(
        props.location.state.caseNumber
      )}. The Arbitrator will consider and apply the applicable Rules, including the IICRA Rules `,
      20,
      (lineCount += 5)
    );
    state.doc.text(
      "in managing and adjudicating this case along with Professional, Shari'ah, Ethics and Code of Conduct for ",
      20,
      (lineCount += 5)
    );
    state.doc.text(
      "Arbitrators and Conditions of Registration for IICRA List of Arbitrators.",
      20,
      (lineCount += 5)
    );
    state.doc.setFontSize(12);
    state.doc.text(
      "Article II: Independence of the Arbitrator",
      20,
      (lineCount += 10)
    );
    state.doc.setFontSize(10);
    state.doc.text("The Arbitrator confirms:", 25, (lineCount += 5));
    state.doc.text(
      "i. Total independence and acts independently of the any party to arbitration before taking up the task of",
      25,
      (lineCount += 5)
    );
    state.doc.text("Arbitration.", 28, (lineCount += 5));
    state.doc.text(
      "ii. Maintain this independence during the course of Arbitration Case till the Final and Binding Award is issued.",
      25,
      (lineCount += 5)
    );
    state.doc.text(
      "iii. Maintain an equal distance from the parties to the conflict with required transparency and professionalism.",
      25,
      (lineCount += 5)
    );
    state.doc.setFontSize(12);
    state.doc.text(
      "Article III: Avoiding Procrastination",
      20,
      (lineCount += 10)
    );
    state.doc.setFontSize(10);
    state.doc.text(
      "The IICRA aims at resolving the disputes with efficiency and professionalism. A large part of this commitment",
      25,
      (lineCount += 5)
    );
    state.doc.text(
      "is borne by the Arbitrator that had to respect the deadlines of Arbitration procedures including the time limit in",
      20,
      (lineCount += 5)
    );
    state.doc.text(
      "order to issue the Award or any extension thereof, in accordance with the procedures related thereto.",
      20,
      (lineCount += 5)
    );

    state.doc.addPage();
    state.doc.rect(10, 10, 190, 275);
    lineCount = 20;
    state.doc.setFontSize(12);
    state.doc.text("Article IV: Confidentiality", 20, lineCount);
    state.doc.setFontSize(10);
    state.doc.text(
      "During the settlement of dispute, the Arbitrator is strictly obliged to respect secrecy adopted by IICRA in order",
      25,
      (lineCount += 5)
    );
    state.doc.text(
      "to protect the parties by maintaining the documentary date submitted to its consideration during the settlement",
      20,
      (lineCount += 5)
    );
    state.doc.text(
      "of the dispute until the Final Award is issued and executed.",
      20,
      (lineCount += 5)
    );
    state.doc.text(
      "This commitment of confidentiality shall be maintained after the issuance of the Arbitration Award as well. If",
      25,
      (lineCount += 5)
    );
    state.doc.text(
      "the need is required or is sought to use the Award as jurisprudence, a prior permission emanating from IICRA",
      20,
      (lineCount += 5)
    );
    state.doc.text("is required", 20, (lineCount += 5));

    state.doc.text(
      "The IICRA shall strictly maintain the confidentiality of the name (and identities) of the Arbitrator (except",
      25,
      (lineCount += 10)
    );
    state.doc.text(
      "for the parties and their counsel) and it must not divulge the terms of the Arbitrator's appointment contained in",
      20,
      (lineCount += 5)
    );
    state.doc.text(
      "this Mission Contract to anyone without all the Arbitrator's individual written permission, or except for any",
      20,
      (lineCount += 5)
    );
    state.doc.text("legal reason", 20, (lineCount += 5));

    state.doc.setFontSize(12);
    state.doc.text(
      "Article V: Obligations of the IICRA",
      20,
      (lineCount += 10)
    );
    state.doc.setFontSize(10);
    state.doc.text(
      "In order to achieve the purpose of this contract, the IICRA is committed to perform the followings:",
      25,
      (lineCount += 5)
    );
    state.doc.text(
      "i. The submission of necessary documentary proof and data for the task of the Arbitrator as remitted by the ",
      25,
      (lineCount += 5)
    );
    state.doc.text("parties to IICRA within due date.", 28, (lineCount += 5));

    state.doc.text(
      "ii. Provide instruction and guidance for Arbitration procedure to directly communicate with the Arbitrator.",
      25,
      (lineCount += 5)
    );
    state.doc.text(
      "iii. Provide a professional appropriate environment to the Arbitrator through necessary facilities such as ",
      25,
      (lineCount += 5)
    );
    state.doc.text(
      "provision(s) of transportation and places of hearings.",
      28,
      (lineCount += 5)
    );
    state.doc.text(
      "iv. Requiring the parties to pay the due amount to the Arbitrator (as determined by IICRA according to its",
      25,
      (lineCount += 5)
    );

    state.doc.text("Rules and schedule of fees).", 25, (lineCount += 5));
    state.doc.text(
      "v. According to IICRA Rules in particular for additional expenses, IICRA guarantees to shall pay the additional",
      25,
      (lineCount += 5)
    );
    state.doc.text("expenses are as follows.", 28, (lineCount += 5));

    state.doc.text(
      "- Expenses of any expert/adviser engaged (if need be), by the Arbitrator.",
      30,
      (lineCount += 5)
    );
    state.doc.text(
      "- Transportation and travel fees, accommodation and subsistence costs in relation to meetings/hearings.",
      30,
      (lineCount += 5)
    );
    state.doc.text(
      "- Office expenses such as photocopying, printing and courier.",
      30,
      (lineCount += 5)
    );
    state.doc.setFontSize(12);
    state.doc.text("Article VI: The Arbitrator Fee", 20, (lineCount += 10));
    state.doc.setFontSize(10);
    state.doc.text(
      `The Arbitrator fee in Arbitration Case No. ARB${
        props.location.state.createdAt.split("-")[0]
      } ${pad(
        props.location.state.caseNumber
      )} calculated based on IICRA schedule, and taking into`,
      25,
      (lineCount += 5)
    );
    state.doc.text(
      "consideration the neutral of case, the Arbitraor Fee fixed at AED/USD (Amount in words) as decided by the Chief",
      20,
      (lineCount += 5)
    );
    state.doc.text(
      "Executive Officer (CEO) in the light of IICRA's Rules. Taking into account that the aforementioned amount is",
      20,
      (lineCount += 5)
    );
    state.doc.text("subject to the Arbitral Proceeding.", 20, (lineCount += 5));

    state.doc.text(
      "As for the payment terms, IICRA shall pay 50% Arbitrator fees during the Preliminary Meeting, and the",
      25,
      (lineCount += 10)
    );
    state.doc.text(
      " additional 50% payment will be issued after the Final Award.",
      20,
      (lineCount += 5)
    );
    state.doc.text(
      "If a meeting or hearing is cancelled or adjourned without sufficient notice to the Arbitrator, IICRA shall",
      25,
      (lineCount += 10)
    );
    state.doc.text(
      "compensate the Arbitrator for his/her preparation time in connection with such meetings or hearings as may be",
      20,
      (lineCount += 5)
    );
    state.doc.text(
      "deemed appropriate. Any termination or cancellation occurs, IICRA shall pay 50% Arbitrator fees during the",
      20,
      (lineCount += 5)
    );

    state.doc.text(
      "Preliminary meeting and additional 25% for the final Arbitrator fees.",
      20,
      (lineCount += 5)
    );

    state.doc.setFontSize(12);
    state.doc.text("General Provisions:", 20, (lineCount += 10));
    state.doc.setFontSize(10);
    state.doc.text(
      "Article VII - The provisions of this agreement are enforceable once it's signed. If the Arbitrator is subject",
      25,
      (lineCount += 5)
    );
    state.doc.text(
      "to objection (challenged) or dismissed (revoked) and all commitments are transferred to the substitute Arbitrator,",
      20,
      (lineCount += 5)
    );
    state.doc.text(
      "including alternative financial liabilities where IICRA shall estimate the size of the effort made by the Arbitrator.",
      20,
      (lineCount += 5)
    );
    state.doc.text(
      "A final settlement with the Arbitrator will be made by a final decision of the Chief Executive Officer of IICRA.",
      20,
      (lineCount += 5)
    );
    state.doc.text(
      "Article VIII - IICRA provides necessary clarifications to remove any ambiguity to be raised in this Contract, and",
      25,
      (lineCount += 10)
    );
    state.doc.text(
      "these clarifications are explicit and binding.",
      20,
      (lineCount += 5)
    );

    state.doc.addPage();
    state.doc.rect(10, 10, 190, 275);
    lineCount = 20;
    state.doc.setFontSize(10);
    state.doc.text(
      "Article IX - Any letters and correspondence relevant to the task of the Arbitrator should be delivered to the ",
      25,
      lineCount
    );
    state.doc.text(
      "taccredited address to each party as described as follows, or any amendment to this address as specified in the",
      20,
      (lineCount += 5)
    );
    state.doc.text("Minutes of Arbitration Meetings:", 20, (lineCount += 5));
    state.doc.text(
      "- International Islamic Centre for Reconciliation and Arbitration:",
      25,
      (lineCount += 10)
    );
    state.doc.text("P.O. Box: 182222 Dubai - UAE.", 30, (lineCount += 5));
    state.doc.text(
      "E-mail: info@iicra.com",

      30,
      (lineCount += 5)
    );
    state.doc.text("Contact No. : +971 4 294 9292", 30, (lineCount += 5));
    state.doc.addImage(stamp, "jpeg", 28, (lineCount += 3), 50, 24);
    // state.doc.addImage(stampSign, "jpeg", 28, (lineCount += 11), 50, 24);
    props.location.state.arbitrators.length > 0 &&
      props.location.state.arbitrators.map((arb) => {
        state.doc.text("- Arbitrator Name :", 25, (lineCount += 35));
        state.doc.text(arb.name, 100, lineCount);
        state.doc.text("Address :", 30, (lineCount += 5));
        state.doc.text(arb.address, 100, lineCount);
        state.doc.text("E-mail Address :", 30, (lineCount += 5));
        state.doc.text(arb.email, 100, lineCount);
        state.doc.text("Contact No. :", 30, (lineCount += 5));
        state.doc.text(arb.phone, 100, lineCount);
      });

    state.doc.text("E-Signature", 28, (lineCount += 10));
    var signature = new Image();
    if (sign) {
      var src = URL.createObjectURL(sign);
      signature.src = src;
    }
    state.doc.addImage(
      sign ? signature : "No Sign Detected",
      "jpeg",
      28,
      (lineCount += 5),
      50,
      24
    );

    state.doc.text(
      "In witness whereof, the parties hereto have/ had to sign this contract on the date written above.",
      105,
      (lineCount += 45),
      "center"
    );
    state.doc.setFontSize(14);
    state.doc.save();

    setState({ ...state, doc: new jsPDF() });
  };

  const generatePdf1 = (data) => {
    state.doc.rect(10, 10, 190, 275);
    state.doc.setFontSize(15);
    state.doc.text("Mission Contract", 87, 20);
    state.doc.setFontSize(10);
    state.doc.text("This contract was approved on (Date), between:", 20, 30);
    state.doc.text(
      "1 - First Party: A Member of the Arbitral Tribunal, respectively: ",
      20,
      40
    );
    {
      props.location.state.arbitrators.length > 0 &&
        props.location.state.arbitrators.map((arb) => {
          state.doc.text("Arbitrator Full Name: ", 30, 60);
          state.doc.text(arb.name, 100, 60);
          state.doc.text("Nationality", 30, 65);
          state.doc.text(arb.nationality, 100, 65);
          state.doc.text("Address", 30, 70);
          state.doc.text(arb.address, 100, 70);
          state.doc.text("Phone", 30, 75);
          state.doc.text(arb.phone, 100, 75);
          state.doc.text("Email", 30, 80);
          state.doc.text(arb.email, 100, 80);
          state.doc.text("Herein referred as 'Arbitrator'", 30, 85);
        });
    }

    state.doc.setFontSize(15);
    state.doc.text("Preamble", 97, 95);

    state.doc.setFontSize(10);
    state.doc.text(
      "Whereas, the IICRA is an independent international non-profit organization dedicated to support the financial",
      20,
      105
    );

    state.doc.text(
      "industry in general and Islamic financial industry in particular, through the performance of Arbitration and",
      20,
      110
    );
    state.doc.text(
      "Reconciliation procedures according to its Rules.",
      20,
      115
    );
    state.doc.text(
      "Whereas, the Arbitrator appointed for the Arbitration Case No. ______ confirmed, accepted with all",
      20,
      125
    );
    state.doc.text("capacity to take over the task", 20, 130);
    state.doc.text(
      "Whereas, the mission of the Arbitrator shall be conducted according to IICRA Rules and Provisions with regards ",
      20,
      140
    );
    state.doc.text(
      "o this contract. The Arbitral proceedings and all communications of the Sole Arbitrator or Arbitral Tribunal, ",
      20,
      145
    );
    state.doc.text(
      "nd orders thereof shall be made in Arabic, English, or any other languages as may be agreed by the Parties ",
      20,
      150
    );
    state.doc.text(
      "and the Arbitrator. Meanwhile, the Final Award shall be issued in English language along with the translation in",
      20,
      155
    );
    state.doc.text("Arabic language.", 20, 160);
    state.doc.setFontSize(12);
    state.doc.text(
      "NOW, THEREFORE, THE PARTIES HERETO AGREE AS FOLLOWS:",
      20,
      170
    );

    state.doc.text("Article I: The Objective of Contracting", 20, 180);
    state.doc.setFontSize(10);
    state.doc.text(
      "The Arbitrator undertakes to assume its task efficiently and professionally to settle the dispute in Arbitration",
      25,
      185
    );
    state.doc.text(
      "Case No. _______. The Arbitrator will consider and apply the applicable Rules, including the IICRA Rules ",
      20,
      190
    );
    state.doc.text(
      "in managing and adjudicating this case along with Professional, Shari'ah, Ethics and Code of Conduct for ",
      20,
      195
    );
    state.doc.text(
      "Arbitrators and Conditions of Registration for IICRA List of Arbitrators.",
      20,
      200
    );
    state.doc.setFontSize(12);
    state.doc.text("Article II: Independence of the Arbitrator", 20, 210);
    state.doc.setFontSize(10);
    state.doc.text("The Arbitrator confirms:", 25, 215);
    state.doc.text(
      "i. Total independence and acts independently of the any party to arbitration before taking up the task of",
      25,
      220
    );
    state.doc.text("Arbitration.", 28, 225);
    state.doc.text(
      "ii. Maintain this independence during the course of Arbitration Case till the Final and Binding Award is issued.",
      25,
      230
    );
    state.doc.text(
      "iii. Maintain an equal distance from the parties to the conflict with required transparency and professionalism.",
      25,
      235
    );
    state.doc.setFontSize(12);
    state.doc.text("Article III: Avoiding Procrastination", 20, 245);
    state.doc.setFontSize(10);
    state.doc.text(
      "The IICRA aims at resolving the disputes with efficiency and professionalism. A large part of this commitment",
      25,
      250
    );
    state.doc.text(
      "is borne by the Arbitrator that had to respect the deadlines of Arbitration procedures including the time limit in",
      20,
      255
    );
    state.doc.text(
      "order to issue the Award or any extension thereof, in accordance with the procedures related thereto.",
      20,
      260
    );

    state.doc.addPage();
    state.doc.rect(10, 10, 190, 275);
    state.doc.setFontSize(12);
    state.doc.text("Article IV: Confidentiality", 20, 20);
    state.doc.setFontSize(10);
    state.doc.text(
      "During the settlement of dispute, the Arbitrator is strictly obliged to respect secrecy adopted by IICRA in order",
      25,
      25
    );
    state.doc.text(
      "to protect the parties by maintaining the documentary date submitted to its consideration during the settlement",
      20,
      30
    );
    state.doc.text(
      "of the dispute until the Final Award is issued and executed.",
      20,
      35
    );
    state.doc.text(
      "This commitment of confidentiality shall be maintained after the issuance of the Arbitration Award as well. If",
      25,
      45
    );
    state.doc.text(
      "the need is required or is sought to use the Award as jurisprudence, a prior permission emanating from IICRA",
      20,
      50
    );
    state.doc.text("is required", 20, 55);

    state.doc.text(
      "The IICRA shall strictly maintain the confidentiality of the name (and identities) of the Arbitrator (except",
      25,
      65
    );
    state.doc.text(
      "for the parties and their counsel) and it must not divulge the terms of the Arbitrator's appointment contained in",
      20,
      70
    );
    state.doc.text(
      "this Mission Contract to anyone without all the Arbitrator's individual written permission, or except for any",
      20,
      75
    );
    state.doc.text("legal reason", 20, 80);

    state.doc.setFontSize(12);
    state.doc.text("Article V: Obligations of the IICRA", 20, 90);
    state.doc.setFontSize(10);
    state.doc.text(
      "In order to achieve the purpose of this contract, the IICRA is committed to perform the followings:",
      25,
      95
    );
    state.doc.text(
      "i. The submission of necessary documentary proof and data for the task of the Arbitrator as remitted by the ",
      25,
      100
    );
    state.doc.text("parties to IICRA within due date.", 28, 105);

    state.doc.text(
      "ii. Provide instruction and guidance for Arbitration procedure to directly communicate with the Arbitrator.",
      25,
      110
    );
    state.doc.text(
      "iii. Provide a professional appropriate environment to the Arbitrator through necessary facilities such as ",
      25,
      115
    );
    state.doc.text(
      "provision(s) of transportation and places of hearings.",
      28,
      120
    );
    state.doc.text(
      "iv. Requiring the parties to pay the due amount to the Arbitrator (as determined by IICRA according to its",
      25,
      125
    );

    state.doc.text("Rules and schedule of fees).", 25, 130);
    state.doc.text(
      "v. According to IICRA Rules in particular for additional expenses, IICRA guarantees to shall pay the additional",
      25,
      135
    );
    state.doc.text("expenses are as follows.", 28, 140);

    state.doc.text(
      "- Expenses of any expert/adviser engaged (if need be), by the Arbitrator.",
      30,
      145
    );
    state.doc.text(
      "- Transportation and travel fees, accommodation and subsistence costs in relation to meetings/hearings.",
      30,
      150
    );
    state.doc.text(
      "- Office expenses such as photocopying, printing and courier.",
      30,
      155
    );
    state.doc.setFontSize(12);
    state.doc.text("Article VI: The Arbitrator Fee", 20, 165);
    state.doc.setFontSize(10);
    state.doc.text(
      "The Arbitrator fee in Arbitration Case No. _____ calculated based on IICRA schedule, and taking into",
      25,
      170
    );
    state.doc.text(
      "consideration the neutral of case, the Arbitraor Fee fixed at AED/USD (Amount in words) as decided by the Chief",
      20,
      175
    );
    state.doc.text(
      "Executive Officer (CEO) in the light of IICRA's Rules. Taking into account that the aforementioned amount is",
      20,
      180
    );
    state.doc.text("subject to the Arbitral Proceeding.", 20, 185);

    state.doc.text(
      "As for the payment terms, IICRA shall pay 50% Arbitrator fees during the Preliminary Meeting, and the",
      25,
      195
    );
    state.doc.text(
      " additional 50% payment will be issued after the Final Award.",
      20,
      200
    );
    state.doc.text(
      "If a meeting or hearing is cancelled or adjourned without sufficient notice to the Arbitrator, IICRA shall",
      25,
      210
    );
    state.doc.text(
      "compensate the Arbitrator for his/her preparation time in connection with such meetings or hearings as may be",
      20,
      215
    );
    state.doc.text(
      "deemed appropriate. Any termination or cancellation occurs, IICRA shall pay 50% Arbitrator fees during the",
      20,
      220
    );

    state.doc.text(
      "Preliminary meeting and additional 25% for the final Arbitrator fees.",
      20,
      225
    );

    state.doc.setFontSize(12);
    state.doc.text("General Provisions:", 20, 235);
    state.doc.setFontSize(10);
    state.doc.text(
      "Article VII - The provisions of this agreement are enforceable once it's signed. If the Arbitrator is subject",
      25,
      240
    );
    state.doc.text(
      "to objection (challenged) or dismissed (revoked) and all commitments are transferred to the substitute Arbitrator,",
      20,
      245
    );
    state.doc.text(
      "including alternative financial liabilities where IICRA shall estimate the size of the effort made by the Arbitrator.",
      20,
      250
    );
    state.doc.text(
      "A final settlement with the Arbitrator will be made by a final decision of the Chief Executive Officer of IICRA.",
      20,
      255
    );
    state.doc.text(
      "Article VIII - IICRA provides necessary clarifications to remove any ambiguity to be raised in this Contract, and",
      25,
      265
    );
    state.doc.text("these clarifications are explicit and binding.", 20, 270);

    state.doc.addPage();
    state.doc.rect(10, 10, 190, 275);
    state.doc.setFontSize(10);
    state.doc.text(
      "Article IX - Any letters and correspondence relevant to the task of the Arbitrator should be delivered to the ",
      25,
      20
    );
    state.doc.text(
      "taccredited address to each party as described as follows, or any amendment to this address as specified in the",
      20,
      25
    );
    state.doc.text("Minutes of Arbitration Meetings:", 20, 30);
    state.doc.text(
      "- International Islamic Centre for Reconciliation and Arbitration:",
      25,
      40
    );
    state.doc.text("P.O. Box: 182222 Dubai - UAE.", 30, 45);
    state.doc.text(
      "E-mail: info@iicra.com",

      30,
      50
    );
    state.doc.text("Contact No. : +971 4 294 9292", 30, 55);
    state.doc.text("- Arbitrator Name :", 25, 65);
    state.doc.text("Address :", 30, 70);
    state.doc.text("E-mail Address :", 30, 75);
    state.doc.text("Contact No. :", 30, 80);

    state.doc.save();
  };

  const generatePdfArabic = (data) => {
    state.doc.addFileToVFS("MyFont.ttf", myFont);
    state.doc.addFont("MyFont.ttf", "MyFont", "normal");
    state.doc.setFont("MyFont");
    state.doc.rect(10, 10, 190, 275);
    state.doc.setFontSize(15);
    let lineCount = 20;
    state.doc.text("عقد مهام هيئة التحكيم", 105, lineCount, "center");
    state.doc.setFontSize(10);
    state.doc.text(
      `تم توقيع هذا العقد بتاريخ  ${Date.now()}  في ........ الإمارات العربية المتحدة، بين كل من:`,
      190,
      (lineCount += 10),
      "right"
    );
    state.doc.text(
      "الطرف الأول: المركز الإسلامي الدولي للصلح والتحكيم - مؤسسة دوليـة غير ربحية يمثله الرئيس التنفيذي - مقره الرئيسي  في دبي. ويشار إليه فيما ",
      190,
      (lineCount += 10),
      "right"
    );
    state.doc.text("يلي بـ المركز", 190, (lineCount += 10), "right");
    state.doc.text(`الطرف الثاني`, 190, (lineCount += 5), "right");
    state.doc.text(`إسم رئيس هيئة التحكيم`, 190, (lineCount += 5), "right");
    state.doc.text(`الجنسية`, 190, (lineCount += 5), "right");
    state.doc.text(`العنوان`, 190, (lineCount += 5), "right");
    state.doc.text(`البريد الإلكتروني`, 190, (lineCount += 5), "right");
    state.doc.text(`رقم متحرك`, 190, (lineCount += 5), "right");
    state.doc.text(
      `يشار إليه فيما يلي بـ "رئييس هيئة التحكيم".`,
      190,
      (lineCount += 5),
      "right"
    );
    state.doc.text(`إسم المحكم الأول`, 190, (lineCount += 10), "right");
    state.doc.text(`الجنسية`, 190, (lineCount += 5), "right");
    state.doc.text(`العنوان`, 190, (lineCount += 5), "right");
    state.doc.text(`البريد الإلكتروني`, 190, (lineCount += 5), "right");
    state.doc.text(`رقم متحرك`, 190, (lineCount += 5), "right");
    state.doc.text(
      `يشار إليه فيما يلي بـ "المحكم الأول".`,
      190,
      (lineCount += 5),
      "right"
    );
    state.doc.text(`إسم المحكم الثاني`, 190, (lineCount += 10), "right");
    state.doc.text(`الجنسية`, 190, (lineCount += 5), "right");
    state.doc.text(`العنوان`, 190, (lineCount += 5), "right");
    state.doc.text(`البريد الإلكتروني`, 190, (lineCount += 5), "right");
    state.doc.text(`رقم متحرك`, 190, (lineCount += 5), "right");
    state.doc.text(
      `يشار إليه فيما يلي بـ "المحكم الثاني".`,
      190,
      (lineCount += 5),
      "right"
    );
    state.doc.text(
      ` ويشار إليهم فيما يلي بـ "هيئة التحكيم".`,
      190,
      (lineCount += 10),
      "right"
    );
    state.doc.text(`تمهـيــد`, 105, (lineCount += 10), "center");
    state.doc.text(
      `حيث أن المركز مؤسسة دولية مستقلة غير ربحية تهدف إلى دعم الصناعة المالية بشكل عام والإسلامية منها بشكل خاص من خلال إدارة الدعاوى .`,
      185,
      (lineCount += 10),
      "right"
    );
    state.doc.text(`التحكيمية وإدارة ملفات`, 185, (lineCount += 5), "right");
    state.doc.text(
      `وحيث عُرض على هيئة التحكيم بأن بتولى مهمة التحكيم في الدعوى التحكيمية رقم _____ وقد تأكدت هيئة التحكيم من مدى أهليتها القانونية .`,
      185,
      (lineCount += 10),
      "right"
    );
    state.doc.text(`لتولى هذه المهمة`, 185, (lineCount += 5), "right");
    state.doc.setFontSize(12);
    state.doc.text(
      `وبتلاقي إرادة الأطراف إيجابًا وقبولًا تم الاتفاق على ما يلي:`,
      105,
      (lineCount += 10),
      "center"
    );
    state.doc.setFontSize(10);

    state.doc.text(
      `تقوم هيئة التحكيم بالعمل بجد وفعالية لفصل النزاع المذكور موضوع الدعوى التحكيمية (.../...) ملتزمة بقواعد المركز، والتقيد بما جاء في هذا العقد . `,
      190,
      (lineCount += 10),
      "right"
    );
    state.doc.text(
      `وذلك في سبيل تحقيق العدالة`,
      190,
      (lineCount += 10),
      "right"
    );
    state.doc.text(
      `المـادة الثانيـة: تعهدات الهيئة
    `,
      105,
      (lineCount += 10),
      "center"
    );
    state.doc.text(
      `تتعهد هيئة التحكيم بشكل كامل وتام بقواعد المركز كما هي معتمدة بمرفقاتها وملاحقتها بما فيها ميثاق عمل المحكم، وتتعهد بتحمل كامل المسؤولية.`,
      190,
      (lineCount += 10),
      "right"
    );
    state.doc.text(
      ` القانونية عن أي خرق لتلك القواعد والأحكام`,
      190,
      (lineCount += 5),
      "right"
    );
    state.doc.addPage();
    state.doc.rect(10, 10, 190, 275);
    lineCount = 20;

    state.doc.text(
      `المـادة الثـالثـة: التزامـات المركـز`,
      105,
      (lineCount += 10),
      "center"
    );
    state.doc.text(
      `يلتزم المركز في سبيل تحقيق الغرض من هذا العقد بما يلي`,
      190,
      (lineCount += 10),
      "right"
    );
    state.doc.text(
      `تقديم الوثائق والبيانات اللازمة لعمل المحكم والتي يحصل عليها من قبل أطراف التحكيم وذلك بالسرعة والمهنية المطلوبة.`,
      190,
      (lineCount += 10),
      "right"
    );
    state.doc.text(
      `تقديم تعليمات إرشادية وأخرى إلزامية حول إجراءات التحكيم وإجراءاته وآجاله التنظيمية وذلك بشكل مباشر أو من خلال الهيئة التحكيمية التي يكون .`,
      190,
      (lineCount += 10),
      "right"
    );
    state.doc.text(`عضواً فيها`, 190, (lineCount += 5), "right");
    state.doc.text(
      "توفير البيئة المهنية الملائمة لهيئة التحكيم من خلال توفير الآليات والإمكانيات اللازمة كتوفير وسائل التنقل وأماكن عقد الجلسات أو من خلال المنصة.",
      190,
      (lineCount += 10),
      "right"
    );
    state.doc.text(` الإلكترونية للمركز`, 190, (lineCount += 5), "right");
    state.doc.text(
      `مطالبة الأطراف بسداد المبالغ المالية المتوجبة لهيئة التحكيم نظير أتعابها والتي يحددها المركز وفق جدول سداد نفقات التحكيم.`,
      190,
      (lineCount += 10),
      "right"
    );
    state.doc.text(
      "وفقًا لقواعد المركز الخاصة بالنفقات الإضافية، يضمن المركز دفع النفقات الإضافية المعززة بفواتير وذلك على النحو التالي",
      190,
      (lineCount += 10),
      "right"
    );
    state.doc.text(
      `الرسوم والنفقات المهنية لأي خبير أو مستشار تم تعيينه (إذا دعت الحاجة) من قبل هيئة التحكيم.`,
      185,
      (lineCount += 7),
      "right"
    );
    state.doc.text(
      `نفقات النقل والسفر وتكاليف الإقامة الخاصة بالاجتماعات وجلسات الاستماع.`,
      185,
      (lineCount += 7),
      "right"
    );
    state.doc.text(
      `مصاريف المكتب مثل نسخ التصوير وصندوق البريد.`,
      185,
      (lineCount += 7),
      "right"
    );
    state.doc.text(
      `المـادة الرابعــــــة: أتعاب الهيئة`,
      105,
      (lineCount += 10),
      "center"
    );
    state.doc.text(
      `يتم احتساب أتعاب هيئة التحكيم في الدعوى التحكيم رقم _____ على أساس جدول نفقات التحكيم لدى المركز، حيث قدر المركز أتعاب هيئة.`,
      190,
      (lineCount += 10),
      "right"
    );
    state.doc.text(
      `التحكيم بمبلغ قدره ____ دولارًا أمريكيًا (المبلغ بالكلمات) في ضوء جدول أتعاب المحكمين مع الأخذ في عين الاعتبار أن نفقات أتعاب `,
      190,
      (lineCount += 5),
      "right"
    );
    state.doc.text(
      `هيئة التحكيم تخضع لسير إجراءات التحكيم`,
      190,
      (lineCount += 5),
      "right"
    );
    state.doc.text(
      `يتعين على المركز سداد أتعاب هيئة التحكيم وفق الآلية التالية`,
      190,
      (lineCount += 10),
      "right"
    );
    state.doc.text(
      `	بنسبة 50٪ خلال الاجتماع التمهيدي`,
      185,
      (lineCount += 7),
      "right"
    );
    state.doc.text(
      `	بنسبة 50٪ المتبقية تسدد بعد إصدار الحكم النهائي وانتهاء فترة التغيير والتصحيح`,
      185,
      (lineCount += 7),
      "right"
    );
    state.doc.text(
      `المـادة الخامسة: جزاءات احترازية`,
      105,
      (lineCount += 10),
      "center"
    );
    state.doc.text(
      `في حال تجاوز أي محكم من أعضاء هيئة التحكيم حدود مهمته، أو لم يتقيد ببنود هذا العقد وخاصة تلك الالتزامات التي تؤثر سلباً على العملية . `,
      190,
      (lineCount += 10),
      "right"
    );
    state.doc.text(
      `التحكيمية، وتسبب بضرر عن سوء نية منه لأي من أطراف التحكيم أو للمركز بشكل مباشر أو غير مباشر، فيحق للمركز استرجاع كافة المبالغ`,
      190,
      (lineCount += 5),
      "right"
    );
    state.doc.text(
      ` المالية المدفوعة له وحرمانه من تلك التي لم تدفع بعد، كما يحق للمركز مسائلة المحكم مدنياً وجزائياً عبر ملاحقته القضائية لجبر أي تعدي قد يحدث`,
      190,
      (lineCount += 5),
      "right"
    );
    state.doc.text(`من قبله وبسوء نية`, 190, (lineCount += 5), "right");
    state.doc.text(`أحكــام عامــة : `, 190, (lineCount += 10), "right");
    state.doc.text(`المـادة السادسة`, 105, (lineCount += 10), "center");
    // state.doc.text(
    //   `تسري أحكام هذه المذكرة بمجرد توقيعها ويستمر العمل بموجبها لحين صدور حكم التحكيم النهائي، وفي حال تم رد أي محكم من أعضاء هيئة التحكيم `,
    //   190,
    //   (lineCount += 10),
    //   "right"
    // );
    // state.doc.text(
    //   `أو عزله يتم انتقال جميع هذه الالتزامات إلى المحكم البديل بما فيها الالتزامات المالية حيث يقدر المركز حجم الجهد الذي بذله المحكم ويتم التسوية . `,
    //   190,
    //   (lineCount += 5),
    //   "right"
    // );
    state.doc.text(
      `معه بقرار نهائي من قبل المركز`,
      190,
      (lineCount += 5),
      "right"
    );
    state.doc.text(`المـادة السابعة`, 105, (lineCount += 10), "center");
    state.doc.text(
      `يقدم المركز التوضيحات اللازمة لإزالة أي غموض قد تثيره هذا العقد، وتكون هذه التوضيحات صريحة وملزمة.`,
      190,
      (lineCount += 10),
      "right"
    );
    state.doc.addPage();
    state.doc.rect(10, 10, 190, 275);
    lineCount = 20;
    state.doc.text(`المـادة الثامنة`, 105, lineCount, "center");
    state.doc.text(
      `ترسل الخطابات والمراسلات ذات الشأن بمهمة هيئة التحكيم إلى المقر المعتمد لدى كل طرف كما هو موضح كالآتي:`,
      190,
      (lineCount += 10),
      "right"
    );
    state.doc.text(
      `المركز الإسلامي الدولي للصلح والتحكيم:`,
      190,
      (lineCount += 10),
      "right"
    );
    state.doc.text(`تليفون: 97142949292+`, 190, (lineCount += 5), "right");
    state.doc.text(`فاكس: 97142959540+`, 190, (lineCount += 5), "right");
    state.doc.text(
      `البريد الإلكتروني:  info@iicra.com`,
      190,
      (lineCount += 5),
      "right"
    );
    state.doc.text(
      `ص.ب: 182222  دبـي – الإمارات العربية المتحدة`,
      190,
      (lineCount += 5),
      "right"
    );
    state.doc.text(`إسم رئيس هيئة التحكيم`, 190, (lineCount += 10), "right");
    state.doc.text(`الجنسية`, 190, (lineCount += 5), "right");
    state.doc.text(`العنوان`, 190, (lineCount += 5), "right");
    state.doc.text(`البريد الإلكتروني`, 190, (lineCount += 5), "right");
    state.doc.text(`رقم متحرك`, 190, (lineCount += 5), "right");

    state.doc.text(`إسم المحكم الأول`, 190, (lineCount += 10), "right");
    state.doc.text(`الجنسية`, 190, (lineCount += 5), "right");
    state.doc.text(`العنوان`, 190, (lineCount += 5), "right");
    state.doc.text(`البريد الإلكتروني`, 190, (lineCount += 5), "right");
    state.doc.text(`رقم متحرك`, 190, (lineCount += 5), "right");

    state.doc.text(`إسم المحكم الثاني`, 190, (lineCount += 10), "right");
    state.doc.text(`الجنسية`, 190, (lineCount += 5), "right");
    state.doc.text(`العنوان`, 190, (lineCount += 5), "right");
    state.doc.text(`البريد الإلكتروني`, 190, (lineCount += 5), "right");
    state.doc.text(`رقم متحرك`, 190, (lineCount += 5), "right");
    state.doc.text(``, 190, (lineCount += 10), "right");
    state.doc.text(``, 190, (lineCount += 10), "right");
    state.doc.text(``, 190, (lineCount += 10), "right");
    state.doc.text(``, 190, (lineCount += 10), "right");
    state.doc.text(``, 190, (lineCount += 10), "right");
    state.doc.text(``, 190, (lineCount += 10), "right");
    state.doc.text(``, 190, (lineCount += 10), "right");
    state.doc.text(``, 190, (lineCount += 10), "right");

    state.doc.save();
  };

  const en = () => {
    return (
      <>
        <p>
          This contract was approved on{" "}
          {props.location.state.createdAt.split("T")[0]}, in{" "}
          {props.location.state.placeOfArbitration} between:
        </p>
        <p>
          <b>1 - First Party:</b> A Sole Arbitrator, respectively:{" "}
          {props.location.state.arbitrators.length > 0 &&
            props.location.state.arbitrators.map((arb) => {
              return (
                <>
                  <br />
                  Arbitrator’s Name: {arb.name}
                  <br />
                  Nationality: {arb.nationality}
                  <br />
                  Address: {arb.address}
                  <br />
                  E-mail: {arb.email}
                  <br />
                  Address: {arb.address}
                  <br />
                  Contact No.: {arb.phone} <br />
                </>
              );
            })}
          Herein referred as “Sole Arbitrator”
        </p>
        <p>
          <b>2 - Second Party:</b>A Rapporteur, respectively:
        </p>
        <p>
          Rapporteur’s Name
          <br />
          Nationality
          <br />
          Address
          <br />
          E-mail Address
          <br />
          Contact No.
          <br />
          Herein referred as "Rapporteur’s"
        </p>
        <h6 style={{ textAlign: "center" }}>Preamble</h6>
        <p>
          <b>Whereas,</b> the IICRA is an independent international non-profit
          organization dedicated to support the financial industry in general
          and Islamic financial industry in particular, through the performance
          of Arbitration and Reconciliation procedures according to its Rules.
        </p>
        <p>
          <b>Whereas,</b> the Arbitrator appointed for the Arbitration Case No.
          ______ confirmed, accepted with all capacity to take over the task.
        </p>
        <p>
          <b>Whereas,</b> the mission of the Arbitrator shall be conducted
          according to IICRA Rules and Provisions with regards to this contract.
          The Arbitral proceedings and all communications of the Sole Arbitrator
          or Arbitral Tribunal, and orders thereof shall be made in Arabic,
          English, or any other languages as may be agreed by the Parties and
          the Arbitrator. Meanwhile, the Final Award shall be issued in English
          language along with the translation in Arabic language.
        </p>
        <h6>NOW, THEREFORE, THE PARTIES HERETO AGREE AS FOLLOWS:</h6>
        <p>
          <b>
            <u>Article I: The Objective of Contracting </u>
          </b>
        </p>
        <p>
          The Arbitrator undertakes to assume its task efficiently and
          professionally to settle the dispute in Arbitration Case No. _______.
          The Arbitrator will consider and apply the applicable Rules, including
          the IICRA Rules in managing and adjudicating this case along with
          Professional, Shari’ah, Ethics and Code of Conduct for Arbitrators and
          Conditions of Registration for IICRA List of Arbitrators.
        </p>
        <p>
          <b>
            <u>Article II: Independence of the Arbitrator</u>
          </b>
        </p>
        <p>The Arbitrator confirms: </p>
        <p className="ml-3">
          i. Total independence and acts independently of the any party to
          arbitration before taking up the task of Arbitration.
          <br />
          ii. Maintain this independence during the course of Arbitration Case
          till the Final and Binding Award is issued.
          <br />
          iii. Maintain an equal distance from the parties to the conflict with
          required transparency and professionalism.
        </p>
        <p>
          <b>
            <u>Article III: Avoiding Procrastination</u>
          </b>
        </p>
        <p>
          The IICRA aims at resolving the disputes with efficiency and
          professionalism. A large part of this commitment is borne by the
          Arbitrator that had to respect the deadlines of Arbitration procedures
          including the time limit in order to issue the Award or any extension
          thereof, in accordance with the procedures related thereto.
        </p>
        <p>
          <b>
            <u>Article IV: Confidentiality</u>
          </b>
          <p>
            During the settlement of dispute, the Arbitrator is strictly obliged
            to respect secrecy adopted by IICRA in order to protect the parties
            by maintaining the documentary date submitted to its consideration
            during the settlement of the dispute until the Final Award is issued
            and executed.
          </p>
          <p>
            This commitment of confidentiality shall be maintained after the
            issuance of the Arbitration Award as well. If the need is required
            or is sought to use the Award as jurisprudence, a prior permission
            emanating from IICRA is required.
          </p>
          <p>
            The IICRA shall strictly maintain the confidentiality of the name
            (and identities) of the Arbitrator (except for the parties and their
            counsel) and it must not divulge the terms of the Arbitrator’s
            appointment contained in this Mission Contract to anyone without all
            the Arbitrator’s individual written permission, or except for any
            legal reason.
          </p>
        </p>
        <p>
          <b>
            <u>Article V: Obligations of the IICRA</u>
          </b>
        </p>
        <p>
          In order to achieve the purpose of this contract, the IICRA is
          committed to perform the followings:
        </p>
        <p className="ml-3">
          i. The submission of necessary documentary proof and data for the task
          of the Arbitrator as remitted by the parties to IICRA within due date.
          <br />
          ii. Provide instruction and guidance for Arbitration procedure to
          directly communicate with the Arbitrator. <br />
          iii. Provide a professional appropriate environment to the Arbitrator
          through necessary facilities such as provision(s) of transportation
          and places of hearings. <br />
          iv. Requiring the parties to pay the due amount to the Arbitrator (as
          determined by IICRA according to its Rules and schedule of fees).
          <br /> v. According to IICRA Rules in particular for additional
          expenses, IICRA guarantees to shall pay the additional expenses are as
          follows.
          <br />
          <p className="ml-3">
            • Expenses of any expert/adviser engaged (if need be), by the
            Arbitrator.
            <br /> • Transportation and travel fees, accommodation and
            subsistence costs in relation to meetings/hearings.
            <br /> • Office expenses such as photocopying, printing and courier.
          </p>
        </p>
        <p>
          <b>
            <u>Article VI: The Arbitrator Fee</u>
          </b>
        </p>
        <p>
          The Arbitrator fee in Arbitration Case No. _____ calculated based on
          IICRA schedule, and taking into consideration the neutral of case, the
          Arbitraor Fee fixed at AED/USD (Amount in words) as decided by the
          Chief Executive Officer (CEO) in the light of IICRA’s Rules. Taking
          into account that the aforementioned amount is subject to the Arbitral
          Proceeding.
        </p>
        <p>
          As for the payment terms, IICRA shall pay 50% Arbitrator fees during
          the Preliminary Meeting, and the additional 50% payment will be issued
          after the Final Award.
        </p>
        <p>
          If a meeting or hearing is cancelled or adjourned without sufficient
          notice to the Arbitrator, IICRA shall compensate the Arbitrator for
          his/her preparation time in connection with such meetings or hearings
          as may be deemed appropriate. Any termination or cancellation occurs,
          IICRA shall pay 50% Arbitrator fees during the Preliminary meeting and
          additional 25% for the final Arbitrator fees.
        </p>
        <h6>
          <u>General Provisions:</u>
        </h6>
        <p>
          <b>Article VII</b> - The provisions of this agreement are enforceable
          once it’s signed. If the Arbitrator is subject to objection
          (challenged) or dismissed (revoked) and all commitments are
          transferred to the substitute Arbitrator, including alternative
          financial liabilities where IICRA shall estimate the size of the
          effort made by the Arbitrator. A final settlement with the Arbitrator
          will be made by a final decision of the Chief Executive Officer of
          IICRA.
        </p>
        <p>
          <b>Article VIII</b> - IICRA provides necessary clarifications to
          remove any ambiguity to be raised in this Contract, and these
          clarifications are explicit and binding.
        </p>
        <p>
          <b>Article IX</b> - Any letters and correspondence relevant to the
          task of the Arbitrator should be delivered to the accredited address
          to each party as described as follows, or any amendment to this
          address as specified in the Minutes of Arbitration Meetings:
        </p>
        <p className="ml-3">
          • Arbitrator Name : <br />
          Address : <br />
          E-mail Address : <br />
          Contact No. :
        </p>
        <p className="ml-3">
          • Rapporteur Name : <br />
          Address : <br />
          E-mail Address : <br />
          Contact No. :
        </p>
        <p>
          In witness whereof, the parties hereto have/ had to sign this contract
          on the date written above.
        </p>
      </>
    );
  };

  const ar = () => {
    return (
      <>
        <p>
          تم توقيع هذا العقد بتاريخ .../...../..... في مقر المركز بدبي- الإمارات
          العربية المتحدة، بين كل من
        </p>
        <p>
          <b>1- الطرف الأول: </b> A Sole Arbitrator, respectively:
          <br />
          Arbitrator’s Name
          <br />
          Nationality
          <br />
          Address
          <br />
          E-mail Address
          <br />
          Contact No.
          <br />
          Herein referred as “Sole Arbitrator”
        </p>
        <p>
          <b>2 - Second Party:</b>A Rapporteur, respectively:
        </p>
        <p>
          Rapporteur’s Name
          <br />
          Nationality
          <br />
          Address
          <br />
          E-mail Address
          <br />
          Contact No.
          <br />
          Herein referred as "Rapporteur’s"
        </p>
        <h6 style={{ textAlign: "center" }}>Preamble</h6>
        <p>
          <b>Whereas,</b> the IICRA is an independent international non-profit
          organization dedicated to support the financial industry in general
          and Islamic financial industry in particular, through the performance
          of Arbitration and Reconciliation procedures according to its Rules.
        </p>
        <p>
          <b>Whereas,</b> the Arbitrator appointed for the Arbitration Case No.
          ______ confirmed, accepted with all capacity to take over the task.
        </p>
        <p>
          <b>Whereas,</b> the mission of the Arbitrator shall be conducted
          according to IICRA Rules and Provisions with regards to this contract.
          The Arbitral proceedings and all communications of the Sole Arbitrator
          or Arbitral Tribunal, and orders thereof shall be made in Arabic,
          English, or any other languages as may be agreed by the Parties and
          the Arbitrator. Meanwhile, the Final Award shall be issued in English
          language along with the translation in Arabic language.
        </p>
        <h6>NOW, THEREFORE, THE PARTIES HERETO AGREE AS FOLLOWS:</h6>
        <p>
          <b>
            <u>Article I: The Objective of Contracting </u>
          </b>
        </p>
        <p>
          The Arbitrator undertakes to assume its task efficiently and
          professionally to settle the dispute in Arbitration Case No. _______.
          The Arbitrator will consider and apply the applicable Rules, including
          the IICRA Rules in managing and adjudicating this case along with
          Professional, Shari’ah, Ethics and Code of Conduct for Arbitrators and
          Conditions of Registration for IICRA List of Arbitrators.
        </p>
        <p>
          <b>
            <u>Article II: Independence of the Arbitrator</u>
          </b>
        </p>
        <p>The Arbitrator confirms: </p>
        <p className="ml-3">
          i. Total independence and acts independently of the any party to
          arbitration before taking up the task of Arbitration.
          <br />
          ii. Maintain this independence during the course of Arbitration Case
          till the Final and Binding Award is issued.
          <br />
          iii. Maintain an equal distance from the parties to the conflict with
          required transparency and professionalism.
        </p>
        <p>
          <b>
            <u>Article III: Avoiding Procrastination</u>
          </b>
        </p>
        <p>
          The IICRA aims at resolving the disputes with efficiency and
          professionalism. A large part of this commitment is borne by the
          Arbitrator that had to respect the deadlines of Arbitration procedures
          including the time limit in order to issue the Award or any extension
          thereof, in accordance with the procedures related thereto.
        </p>
        <p>
          <b>
            <u>Article IV: Confidentiality</u>
          </b>
          <p>
            During the settlement of dispute, the Arbitrator is strictly obliged
            to respect secrecy adopted by IICRA in order to protect the parties
            by maintaining the documentary date submitted to its consideration
            during the settlement of the dispute until the Final Award is issued
            and executed.
          </p>
          <p>
            This commitment of confidentiality shall be maintained after the
            issuance of the Arbitration Award as well. If the need is required
            or is sought to use the Award as jurisprudence, a prior permission
            emanating from IICRA is required.
          </p>
          <p>
            The IICRA shall strictly maintain the confidentiality of the name
            (and identities) of the Arbitrator (except for the parties and their
            counsel) and it must not divulge the terms of the Arbitrator’s
            appointment contained in this Mission Contract to anyone without all
            the Arbitrator’s individual written permission, or except for any
            legal reason.
          </p>
        </p>
        <p>
          <b>
            <u>Article V: Obligations of the IICRA</u>
          </b>
        </p>
        <p>
          In order to achieve the purpose of this contract, the IICRA is
          committed to perform the followings:
        </p>
        <p className="ml-3">
          i. The submission of necessary documentary proof and data for the task
          of the Arbitrator as remitted by the parties to IICRA within due date.
          <br />
          ii. Provide instruction and guidance for Arbitration procedure to
          directly communicate with the Arbitrator. <br />
          iii. Provide a professional appropriate environment to the Arbitrator
          through necessary facilities such as provision(s) of transportation
          and places of hearings. <br />
          iv. Requiring the parties to pay the due amount to the Arbitrator (as
          determined by IICRA according to its Rules and schedule of fees).
          <br /> v. According to IICRA Rules in particular for additional
          expenses, IICRA guarantees to shall pay the additional expenses are as
          follows.
          <br />
          <p className="ml-3">
            • Expenses of any expert/adviser engaged (if need be), by the
            Arbitrator.
            <br /> • Transportation and travel fees, accommodation and
            subsistence costs in relation to meetings/hearings.
            <br /> • Office expenses such as photocopying, printing and courier.
          </p>
        </p>
        <p>
          <b>
            <u>Article VI: The Arbitrator Fee</u>
          </b>
        </p>
        <p>
          The Arbitrator fee in Arbitration Case No. _____ calculated based on
          IICRA schedule, and taking into consideration the neutral of case, the
          Arbitraor Fee fixed at AED/USD (Amount in words) as decided by the
          Chief Executive Officer (CEO) in the light of IICRA’s Rules. Taking
          into account that the aforementioned amount is subject to the Arbitral
          Proceeding.
        </p>
        <p>
          As for the payment terms, IICRA shall pay 50% Arbitrator fees during
          the Preliminary Meeting, and the additional 50% payment will be issued
          after the Final Award.
        </p>
        <p>
          If a meeting or hearing is cancelled or adjourned without sufficient
          notice to the Arbitrator, IICRA shall compensate the Arbitrator for
          his/her preparation time in connection with such meetings or hearings
          as may be deemed appropriate. Any termination or cancellation occurs,
          IICRA shall pay 50% Arbitrator fees during the Preliminary meeting and
          additional 25% for the final Arbitrator fees.
        </p>
        <h6>
          <u>General Provisions:</u>
        </h6>
        <p>
          <b>Article VII</b> - The provisions of this agreement are enforceable
          once it’s signed. If the Arbitrator is subject to objection
          (challenged) or dismissed (revoked) and all commitments are
          transferred to the substitute Arbitrator, including alternative
          financial liabilities where IICRA shall estimate the size of the
          effort made by the Arbitrator. A final settlement with the Arbitrator
          will be made by a final decision of the Chief Executive Officer of
          IICRA.
        </p>
        <p>
          <b>Article VIII</b> - IICRA provides necessary clarifications to
          remove any ambiguity to be raised in this Contract, and these
          clarifications are explicit and binding.
        </p>
        <p>
          <b>Article IX</b> - Any letters and correspondence relevant to the
          task of the Arbitrator should be delivered to the accredited address
          to each party as described as follows, or any amendment to this
          address as specified in the Minutes of Arbitration Meetings:
        </p>
        <p className="ml-3">
          • Arbitrator Name : <br />
          Address : <br />
          E-mail Address : <br />
          Contact No. :
        </p>
        <p className="ml-3">
          • Rapporteur Name : <br />
          Address : <br />
          E-mail Address : <br />
          Contact No. :
        </p>
        <p>
          In witness whereof, the parties hereto have/ had to sign this contract
          on the date written above.
        </p>
      </>
    );
  };

  return (
    <>
      <Header
        data={props.location.state}
        stepName="Nomination and Appointment of Arbitrator(s)"
        stepPathPrev="nomination"
        stepPath="nominateArb"
        name="Mission Contract of Rapportuer - Sole Arbitrator"
      />
      <Container style={styles.formUserContainer} className="shadow-lg">
        <Card style={styles.cardBg}>
          <CardHeader style={styles.letterContainer}>
            <h6 style={styles.center} onClick={() => generatePdfArabic()}>
              Mission Contract
            </h6>
            <img style={styles.header} src={header} alt="header" />
          </CardHeader>
          <CardBody>
            {/* {document.dir == "ltr" ? en() : ar()} */}
            {en()}
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
export default EmailMissionContractRapSole;
