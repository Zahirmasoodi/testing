import React, { Component } from "react";
import validator from "validator";
import {
  Card,
  CardBody,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  CustomInput,
  Progress,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
// import countries from "../../countries";
// import countries_ from "../../countries_";
import countriesArray from "../../countriesArray";
import countriesArray_ from "../../countriesArray_";

import { jsPDF } from "jspdf";
// import myFont from "./jspdfArabic";
// import myFont_ from "./jspdfArabic";
import Swal from "sweetalert2";

// import Select from "react-select";
// import { generatePath } from "react-router-dom";

export class FormUserDetails extends Component {
  state = {
    direction: "",
    alertClaimantName: false,
    // alertClaimantUserName: false,
    // alertClaimantUserName2: false,
    alertClaimantAddress: false,
    alertClaimantEmail: "",
    alertClaimantNationality: false,
    alertClaimantPhone: "",
    alertClaimantName2: false,
    alertClaimantAddress2: false,
    alertClaimantEmail2: "",
    alertClaimantNationality2: false,
    alertClaimantPhone2: "",
    alertLegalAuthRepresentativeName: false,
    alertLegalAuthFirmName: false,
    alertlegalAuthAddress: false,
    alertLegalAuthNationality: false,
    alertLegalAuthPhone: false,
    alertlegalAuthFirmEmail: false,
    alertLegalAuthRepresentativeName2: false,
    alertLegalAuthFirmName2: false,
    alertlegalAuthAddress2: false,
    alertLegalAuthNationality2: false,
    alertLegalAuthPhone2: false,
    alertlegalAuthFirmEmail2: false,
    alertPOA: false,
    alertPOA2: false,
    doc: new jsPDF(),
  };

  sendPdfToServer = () => {
    this.state.doc.rect(10, 10, 190, 275);
    this.state.doc.setFontSize(15);
    let reliefLine = 20;
    this.state.doc.text(
      "IN THE MATTER OF AN ARBITRATION UNDER THE RULES OF THE",
      105,
      reliefLine,
      "center"
    );
    this.state.doc.text(
      "INTERNATIONAL ISLAMIC CENTRE FOR RECONCILIATION AND ",
      105,
      (reliefLine += 5),
      "center"
    );
    this.state.doc.text("ARBITRATION", 105, (reliefLine += 5), "center");
    this.state.doc.setFontSize(12);
    this.state.doc.text(
      "REQUEST FOR ARBITRATION (RFA)",
      105,
      (reliefLine += 10),
      "center"
    );
    this.state.doc.line(70, (reliefLine += 2), 143, reliefLine);

    //claimant
    this.state.doc.setFontSize(12);
    this.state.doc.text("I. Claimant", 20, (reliefLine += 25));
    this.state.doc.setFontSize(10);
    this.state.doc.text("Name of the Claimant: ", 28, (reliefLine += 5));

    let name = "ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let newName = name.match(/.{1,40}/g);

    newName.map((na, index) => {
      if (index == 0) {
        this.state.doc.text(na, 100, reliefLine, "left");
      } else this.state.doc.text(na, 100, (reliefLine += 5), "left");
    });

    this.state.doc.text("Nationality", 28, (reliefLine += 5));
    this.state.doc.text(this.props.values.claimantNationality, 100, reliefLine);
    this.state.doc.text("Address", 28, (reliefLine += 5));
    this.state.doc.text(this.props.values.claimantAddress, 100, reliefLine);
    this.state.doc.text("P.O. Box", 28, (reliefLine += 5));
    this.state.doc.text(this.props.values.claimantPOBox, 100, reliefLine);
    this.state.doc.text("Phone", 28, (reliefLine += 5));
    this.state.doc.text(this.props.values.claimantPhone, 100, reliefLine);
    this.state.doc.text("Fax", 28, (reliefLine += 5));
    this.state.doc.text(this.props.values.claimantFax, 100, reliefLine);
    this.state.doc.text("Email", 28, (reliefLine += 5));
    this.state.doc.text(this.props.values.claimantEmail, 100, reliefLine);
    this.state.doc.text(
      "Herein referred as 'Claimant(s)'",
      28,
      (reliefLine += 5)
    );

    if (this.props.values.legalAuthEmail) {
      //Legal Representative

      this.state.doc.setFontSize(10);
      this.state.doc.text(
        "Name of the Representative: ",
        28,
        (reliefLine += 10)
      );
      this.state.doc.text(
        this.props.values.legalAuthRepresentativeName,
        100,
        reliefLine
      );
      this.state.doc.text(
        "Name of the Representative Firm : ",
        28,
        (reliefLine += 5)
      );
      this.state.doc.text(this.props.values.legalAuthFirmName, 100, reliefLine);
      this.state.doc.text("Nationality", 28, (reliefLine += 5));
      this.state.doc.text(
        this.props.values.legalAuthNationality,
        100,
        reliefLine
      );
      this.state.doc.text("Address", 28, (reliefLine += 5));
      this.state.doc.text(this.props.values.legalAuthAddress, 100, reliefLine);
      this.state.doc.text("P.O. Box", 28, (reliefLine += 5));
      this.state.doc.text(this.props.values.legalAuthPOBox, 100, reliefLine);
      this.state.doc.text("Phone", 28, (reliefLine += 5));
      this.state.doc.text(this.props.values.legalAuthPhone, 100, reliefLine);
      this.state.doc.text("Fax", 28, (reliefLine += 5));
      this.state.doc.text(this.props.values.legalAuthFax, 100, reliefLine);
      this.state.doc.text("Email", 28, (reliefLine += 5));
      this.state.doc.text(this.props.values.legalAuthEmail, 100, reliefLine);

      if (this.props.values.legalAuthRegistration) {
        this.state.doc.text("Commercial Registration Number", 28, 155);
        this.state.doc.text(
          this.props.values.legalAuthRegistration,
          100,
          reliefLine
        );
      }
    }
    if (reliefLine > 250) {
      this.state.doc.addPage();
      this.state.doc.rect(10, 10, 190, 275);
      reliefLine = 15;
    }
    //Respondent
    this.state.doc.setFontSize(12);
    this.state.doc.text("II. Respondent", 20, (reliefLine += 10));
    this.state.doc.setFontSize(10);
    this.state.doc.text("Name of the Respondent: ", 28, (reliefLine += 5));
    this.state.doc.text(this.props.values.respondentName, 100, reliefLine);
    this.state.doc.text("Nationality", 28, (reliefLine += 5));
    this.state.doc.text(
      this.props.values.respondentNationality,
      100,
      reliefLine
    );
    this.state.doc.text("Address", 28, (reliefLine += 5));
    this.state.doc.text(this.props.values.respondentAddress, 100, reliefLine);
    this.state.doc.text("P.O. Box", 28, (reliefLine += 5));
    this.state.doc.text(this.props.values.respondentPOBox, 100, reliefLine);
    this.state.doc.text("Phone", 28, (reliefLine += 5));
    this.state.doc.text(this.props.values.respondentPhone, 100, reliefLine);
    this.state.doc.text("Fax", 28, (reliefLine += 5));
    this.state.doc.text(this.props.values.respondentFax, 100, reliefLine);
    this.state.doc.text("Email", 28, (reliefLine += 5));
    this.state.doc.text(this.props.values.respondentEmail, 100, reliefLine);
    if (reliefLine > 270) {
      this.state.doc.addPage();
      this.state.doc.rect(10, 10, 190, 275);
      reliefLine = 15;
    }
    //Dispute
    this.state.doc.setFontSize(12);
    this.state.doc.text("III. Dispute Details", 20, (reliefLine += 10));
    this.state.doc.setFontSize(10);
    this.state.doc.text("i. Nature of Dispute", 28, (reliefLine += 10));
    this.state.doc.line(20, (reliefLine += 5), 190, reliefLine);
    let natureOfDisputeRaw = this.props.values.natureOfDispute;

    let natureOfDisputeCook = `Lorem   1.         Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;

    natureOfDisputeCook = natureOfDisputeCook
      .replace(/\s+/g, " ")
      .trim()
      .match(/.{1,100}/g);
    // natureOfDisputeCook = natureOfDisputeCook.match(/.{1,100}/g);

    console.log(natureOfDisputeCook, " SET");

    natureOfDisputeCook.map((con) => {
      if (reliefLine > 275) {
        this.state.doc.addPage();
        this.state.doc.rect(10, 10, 190, 275);
        reliefLine = 15;
      } else {
        this.state.doc.text(con, 28, (reliefLine += 5), "left");
      }
    });

    if (reliefLine > 270) {
      this.state.doc.addPage();
      this.state.doc.rect(10, 10, 190, 275);
      reliefLine = 15;
    }
    this.state.doc.text("ii. Value of Dispute", 28, (reliefLine += 10));
    this.state.doc.line(20, (reliefLine += 5), 190, reliefLine);
    let valueOfDisputeRaw = this.props.values.valueOfDispute;

    let valueOfDisputeCook = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;
    valueOfDisputeCook = valueOfDisputeCook.match(/.{1,100}/g);

    valueOfDisputeCook.map((con) => {
      if (reliefLine > 275) {
        this.state.doc.addPage();
        this.state.doc.rect(10, 10, 190, 275);
        reliefLine = 15;
      } else {
        this.state.doc.text(con, 28, (reliefLine += 5), "left");
      }
    });
    //Dispute Next Page
    if (reliefLine > 270) {
      this.state.doc.addPage();
      this.state.doc.rect(10, 10, 190, 275);
      reliefLine = 15;
    }
    this.state.doc.text("iii. Recitals", 28, (reliefLine += 10));
    this.state.doc.line(20, (reliefLine += 5), 190, reliefLine);

    let recitalsRaw = this.props.values.recitals;

    let recitalsCook = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;
    recitalsCook = recitalsCook.match(/.{1,100}/g);

    recitalsCook.map((con) => {
      if (reliefLine > 275) {
        this.state.doc.addPage();
        this.state.doc.rect(10, 10, 190, 275);
        reliefLine = 15;
      } else {
        this.state.doc.text(con, 28, (reliefLine += 5), "left");
      }
    });
    if (reliefLine > 270) {
      this.state.doc.addPage();
      this.state.doc.rect(10, 10, 190, 275);
      reliefLine = 15;
    }
    this.state.doc.text("iv. Legal Grounds", 28, (reliefLine += 10));
    this.state.doc.line(20, (reliefLine += 5), 190, reliefLine);

    let legalGroundsRaw = this.props.values.legalGrounds;

    let legalGroundsCook = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;
    legalGroundsCook = legalGroundsCook.match(/.{1,100}/g);

    legalGroundsCook.map((con) => {
      if (reliefLine > 275) {
        this.state.doc.addPage();
        this.state.doc.rect(10, 10, 190, 275);
        reliefLine = 15;
      } else {
        this.state.doc.text(con, 28, (reliefLine += 5), "left");
      }
    });
    if (reliefLine > 270) {
      this.state.doc.addPage();
      this.state.doc.rect(10, 10, 190, 275);
      reliefLine = 15;
    }
    this.state.doc.text("v. Relief Sought", 28, (reliefLine += 10));
    this.state.doc.line(20, (reliefLine += 5), 190, reliefLine);

    let reliefSoughtRaw = this.props.values.reliefSought;

    let reliefSoughtCook = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;
    reliefSoughtCook = reliefSoughtCook.match(/.{1,100}/g);

    reliefSoughtCook.map((con) => {
      if (reliefLine > 275) {
        this.state.doc.addPage();
        this.state.doc.rect(10, 10, 190, 275);
        reliefLine = 15;
      } else {
        this.state.doc.text(con, 28, (reliefLine += 5), "left");
      }
    });

    if (reliefLine > 250) {
      this.state.doc.addPage();
      this.state.doc.rect(10, 10, 190, 275);
      reliefLine = 15;
    }
    this.state.doc.setFontSize(12);
    this.state.doc.text(
      "IV. Nomination of Sole Arbitrator or Co-Arbitrator(s)",
      20,
      (reliefLine += 10)
    );

    this.state.doc.setFontSize(10);
    this.state.doc.text("Name of the Arbitrator: ", 28, (reliefLine += 5));
    this.state.doc.text(this.props.values.arbitratorName, 100, reliefLine);
    this.state.doc.text("Nationality", 28, (reliefLine += 5));
    this.state.doc.text(
      this.props.values.arbitratorNationality,
      100,
      reliefLine
    );
    this.state.doc.text("Address", 28, (reliefLine += 5));
    this.state.doc.text(this.props.values.arbitratorAddress, 100, reliefLine);
    this.state.doc.text("P.O. Box", 28, (reliefLine += 5));
    this.state.doc.text(this.props.values.arbitratorPOBox, 100, reliefLine);
    this.state.doc.text("Phone", 28, (reliefLine += 5));
    this.state.doc.text(this.props.values.arbitratorPhone, 100, reliefLine);
    this.state.doc.text("Fax", 28, (reliefLine += 5));
    this.state.doc.text(this.props.values.arbitratorFax, 100, reliefLine);
    this.state.doc.text("Email", 28, (reliefLine += 5));
    this.state.doc.text(this.props.values.arbitratorEmail, 100, reliefLine);
    if (reliefLine > 250) {
      this.state.doc.addPage();
      this.state.doc.rect(10, 10, 190, 275);
      reliefLine = 15;
    }
    this.state.doc.text(
      "Failure to make such nomination of the Arbitrator by either Party in the Request for Arbitration (RFA)",
      24,
      (reliefLine += 10),
      "left"
    );
    this.state.doc.text(
      "and the reply memorandum within the specified time limits for its submission, or if IICRA issues a reasoned",
      24,
      (reliefLine += 5),
      "left"
    );
    this.state.doc.text(
      "decision declining the appointment of the Arbitrator proposed by any party, IICRA may request the",
      24,
      (reliefLine += 5),
      "left"
    );
    this.state.doc.text(
      "concerned party to nominate an alternate arbitrator within five (5) working days from the date of receipt",
      24,
      (reliefLine += 5),
      "left"
    );
    this.state.doc.text(
      "of IICRA request in this regard.",
      24,
      (reliefLine += 5),
      "left"
    );
    this.state.doc.setFontSize(12);

    if (reliefLine > 260) {
      this.state.doc.addPage();
      this.state.doc.rect(10, 10, 190, 275);
      reliefLine = 15;
    }

    this.state.doc.setFontSize(12);
    this.state.doc.text("V. Other Suggestions", 20, (reliefLine += 10));
    this.state.doc.setFontSize(10);
    this.state.doc.text("i. Language of Arbitration", 28, (reliefLine += 5));
    this.state.doc.text(
      this.props.values.arbitrationLanguage,
      32,
      (reliefLine += 5)
    );
    this.state.doc.text("ii. Place of Arbitration", 28, (reliefLine += 5));
    this.state.doc.text(
      this.props.values.placeOfArbitration,
      32,
      (reliefLine += 5)
    );
    this.state.doc.text(
      "iii. Governing Law (excluding the clauses which contradict the Provisions of Islamic Shari'ah)",
      28,
      (reliefLine += 5)
    );
    this.state.doc.text(this.props.values.governingLaw, 32, (reliefLine += 5));
    this.state.doc.text(
      "iv. Number of Arbitrators as per the arbitration agreement or arbitration clause",
      28,
      (reliefLine += 5)
    );
    this.state.doc.text(
      this.props.values.numberOfArbitrators,
      32,
      (reliefLine += 5)
    );
    if (this.props.values.otherRequests) {
      this.state.doc.text("v. Other Request If Any", 28, (reliefLine += 5));
      this.state.doc.text(
        this.props.values.otherRequests,
        32,
        (reliefLine += 5)
      );
    }
    this.state.doc.text(
      "Hence, based on what has been mentioned above, the Claimant hereby requests IICRA to conduct the",
      28,
      (reliefLine += 10)
    );
    this.state.doc.text(
      "Arbitration proceedings to settle the dispute under IICRA Arbitration Rules.",
      28,
      (reliefLine += 5)
    );

    if (reliefLine > 260) {
      this.state.doc.addPage();
      this.state.doc.rect(10, 10, 190, 275);
      reliefLine = 15;
    }
    this.state.doc.setFontSize(12);
    this.state.doc.text("VI. Undertaking", 20, (reliefLine += 10));
    this.state.doc.setFontSize(10);
    this.state.doc.text(
      "I/We hereby declare that all the information provided herein, and the attachments thereto are true",
      28,
      (reliefLine += 10)
    );
    this.state.doc.text(
      "and accurate and to the best of my knowledge and belief. If there is any change in the information",
      28,
      (reliefLine += 5)
    );
    this.state.doc.text(
      "provided, I agree to promptly notify IICRA of the same.",
      28,
      (reliefLine += 5)
    );
    if (reliefLine > 270) {
      this.state.doc.addPage();
      this.state.doc.rect(10, 10, 190, 275);
      reliefLine = 15;
    }
    this.state.doc.text(
      "I/We Pursuant to this RFA, pledge to settle the dispute under IICRA in accordance with its Rules",
      28,
      (reliefLine += 10)
    );
    this.state.doc.text(
      "without any objection or procrastination.",
      28,
      (reliefLine += 5)
    );
    if (reliefLine > 265) {
      this.state.doc.addPage();
      this.state.doc.rect(10, 10, 190, 275);
      reliefLine = 15;
    }
    this.state.doc.text(
      "I/We shall pay the registration fees and the Arbitration expenses determined by IICRA once the ",
      28,
      (reliefLine += 10)
    );
    this.state.doc.text(
      "Request for Arbitration (RFA) is accepted.",
      28,
      (reliefLine += 5)
    );
    if (reliefLine > 265) {
      this.state.doc.addPage();
      this.state.doc.rect(10, 10, 190, 275);
      reliefLine = 15;
    }
    this.state.doc.text(
      "For the purposes of communication and reporting in this Arbitration Case, I/We acknowledge the",
      28,
      (reliefLine += 10)
    );

    this.state.doc.text(
      "usage of IICRA e-mail and its Arbitration platform along with any other means of communication",
      28,
      (reliefLine += 5)
    );
    this.state.doc.text("adopted by IICRA.", 28, (reliefLine += 5));
    if (reliefLine > 270) {
      this.state.doc.addPage();
      this.state.doc.rect(10, 10, 190, 275);
      reliefLine = 15;
    }
    this.state.doc.text(
      "I/We hereby authorize IICRA to use the above- mentioned details for communication purposes.",
      28,
      (reliefLine += 10)
    );
    if (reliefLine > 265) {
      this.state.doc.addPage();
      this.state.doc.rect(10, 10, 190, 275);
      reliefLine = 15;
    }
    this.state.doc.text(
      "I/We hereby confirm that I have uploaded all the relevant documents related to the dispute such as",
      28,
      (reliefLine += 10)
    );
    this.state.doc.text(
      "the contract of dispute and arbitration agreement or arbitration clause. ",
      28,
      (reliefLine += 5)
    );
    if (reliefLine > 275) {
      this.state.doc.addPage();
      this.state.doc.rect(10, 10, 190, 275);
      reliefLine = 15;
    }
    this.state.doc.text(
      "The parties will receive an official letter initiating this proceeding once all filing requirements have been satisfied.",
      24,
      (reliefLine += 10)
    );

    if (reliefLine > 230) {
      this.state.doc.addPage();
      this.state.doc.rect(10, 10, 190, 275);
      reliefLine = 15;
    }

    this.state.doc.setFontSize(12);
    this.state.doc.text("VII. E-Signature & Payment", 20, (reliefLine += 10));
    this.state.doc.setFontSize(10);
    this.state.doc.text("Name of the Applicant", 28, (reliefLine += 10));
    this.state.doc.text(
      this.props.values.eSignatureName,
      32,
      (reliefLine += 5)
    );
    this.state.doc.text("E-Signature", 28, (reliefLine += 10));
    // this.state.doc.addImage(
    //   this.state.trimmedDataURL,
    //   "jpeg",
    //   28,
    //   (reliefLine += 2),
    //   50,
    //   24
    // );
    this.state.doc.setFontSize(14);
    this.state.doc.text("Successfully Submitted", 80, (reliefLine += 28));
    this.state.doc.setFontSize(10);
    this.state.doc.text(
      "Your request has been submitted successfully and IICRA shall notify the status of your request within three (3)",
      105,
      (reliefLine += 10),
      "center"
    );
    this.state.doc.text("working days.", 105, (reliefLine += 5), "center");
    this.state.doc.save();
  };

  componentDidMount() {
    window.scrollTo(0, 0);

    if (localStorage.getItem("lang") == "ar") {
      document.dir = "rtl";
    } else {
      document.dir = "ltr";
      localStorage.setItem("lang", "en");
    }
  }

  aquaticCreatures = [
    { label: "Shark", value: "Shark" },
    { label: "Dolphin", value: "Dolphin" },
    { label: "Whale", value: "Whale" },
    { label: "Octopus", value: "Octopus" },
    { label: "Crab", value: "Crab" },
    { label: "Lobster", value: "Lobster" },
  ];

  // toggle = () => this.setState({ modal: false });

  // continue = (e) => {
  //   e.preventDefault();
  //   const {
  //     claimantName,
  //     claimantUserName,
  //     claimantAddress,
  //     claimantEmail,
  //     claimantNationality,
  //     claimantPhone,
  //     claimantName2,
  //     claimantUserName2,
  //     claimantAddress2,
  //     claimantEmail2,
  //     claimantNationality2,
  //     claimantPhone2,
  //     legalAuthNationality,
  //     legalAuthAddress,
  //     legalAuthRepresentativeName,
  //     legalAuthPhone,
  //     legalAuthEmail,
  //     legalAuthNationality2,
  //     legalAuthAddress2,
  //     legalAuthRepresentativeName2,
  //     legalAuthPhone2,
  //     legalAuthEmail2,
  //     powerOfAttorney,
  //     powerOfAttorney2,
  //   } = this.props.values;

  //   //CLaimant Validation
  //   if (validator.isEmpty(claimantName) || claimantName == "") {
  //     this.setState({ alertClaimantName: true });
  //   } else if (validator.isEmpty(claimantUserName) || claimantUserName == "") {
  //     this.setState({ alertClaimantUserName: true });
  //   } else if (
  //     validator.isEmpty(claimantNationality) ||
  //     claimantNationality == ""
  //   ) {
  //     this.setState({ alertClaimantNationality: true });
  //   } else if (validator.isEmpty(claimantAddress) || claimantAddress == "") {
  //     this.setState({ alertClaimantAddress: true });
  //   } else if (validator.isEmpty(claimantPhone) || claimantPhone == "") {
  //     this.setState({
  //       alertClaimantPhone:
  //         document.dir == "ltr"
  //           ? " phone number is required "
  //           : " رقم الهاتف مطلوب ",
  //     });
  //   } else if (!validator.isMobilePhone(claimantPhone)) {
  //     this.setState({
  //       alertClaimantPhone:
  //         document.dir == "ltr"
  //           ? " invalid phone number "
  //           : " رقم الهاتف غير صحيح ",
  //     });
  //   } else if (validator.isEmpty(claimantEmail) || claimantEmail == "") {
  //     this.setState({
  //       alertClaimantEmail:
  //         document.dir == "ltr"
  //           ? " email address is required "
  //           : " عنوان البريد الإلكتروني مطلوب ",
  //     });
  //   } else if (!validator.isEmail(claimantEmail)) {
  //     this.setState({
  //       alertClaimantEmail:
  //         document.dir == "ltr"
  //           ? " invalid email address "
  //           : " عنوان البريد الإلكتروني غير صالح ",
  //     });
  //   }

  //   //Legal Representative Validation
  //   else if (this.state.legalPerson) {
  //     if (
  //       validator.isEmpty(legalAuthRepresentativeName) ||
  //       legalAuthRepresentativeName == " "
  //     ) {
  //       this.setState({ alertLegalAuthRepresentativeName: true });
  //     } else if (
  //       validator.isEmpty(legalAuthAddress) ||
  //       legalAuthAddress == " "
  //     ) {
  //       this.setState({ alertlegalAuthAddress: true });
  //     } else if (!validator.isEmail(legalAuthEmail)) {
  //       this.setState({
  //         alertlegalAuthFirmEmail:
  //           document.dir == "ltr"
  //             ? " invalid email address "
  //             : " عنوان البريد الإلكتروني غير صالح  ",
  //       });
  //     } else if (validator.isEmpty(legalAuthEmail) || legalAuthEmail == " ") {
  //       this.setState({
  //         alertlegalAuthFirmEmail:
  //           document.dir == "ltr"
  //             ? " email address is required "
  //             : " عنوان البريد الإلكتروني مطلوب ",
  //       });
  //     } else if (
  //       validator.isEmpty(legalAuthNationality) ||
  //       legalAuthNationality == " "
  //     ) {
  //       this.setState({ alertLegalAuthNationality: true });
  //     } else if (!validator.isMobilePhone(legalAuthPhone)) {
  //       this.setState({
  //         alertLegalAuthPhone:
  //           document.dir == "ltr"
  //             ? " invalid phone number "
  //             : " رقم الهاتف غير صحيح ",
  //       });
  //     } else if (validator.isEmpty(legalAuthPhone) || legalAuthPhone == " ") {
  //       this.setState({
  //         alertLegalAuthPhone:
  //           document.dir == "ltr"
  //             ? " phone number is required "
  //             : " رقم الهاتف مطلوب ",
  //       });
  //     } else if (powerOfAttorney == null) {
  //       this.setState({ alertPOA: true });
  //     } else if (this.state.additionalClaimant) {
  //       if (validator.isEmpty(claimantName2) || claimantName2 == "") {
  //         this.setState({ alertClaimantName2: true });
  //       } else if (
  //         validator.isEmpty(claimantUserName2) ||
  //         claimantUserName2 == ""
  //       ) {
  //         this.setState({ alertClaimantUserName2: true });
  //       } else if (
  //         validator.isEmpty(claimantNationality2) ||
  //         claimantNationality2 == " "
  //       ) {
  //         this.setState({ alertClaimantNationality2: true });
  //       } else if (
  //         validator.isEmpty(claimantAddress2) ||
  //         claimantAddress2 == ""
  //       ) {
  //         this.setState({ alertClaimantAddress2: true });
  //       } else if (validator.isEmpty(claimantPhone2) || claimantPhone2 == "") {
  //         this.setState({
  //           alertClaimantPhone2:
  //             document.dir == "ltr"
  //               ? " phone number is required "
  //               : " رقم الهاتف مطلوب ",
  //         });
  //       } else if (!validator.isMobilePhone(claimantPhone2)) {
  //         this.setState({
  //           alertClaimantPhone2:
  //             document.dir == "ltr"
  //               ? " invalid phone number "
  //               : " رقم الهاتف غير صحيح ",
  //         });
  //       } else if (validator.isEmpty(claimantEmail2) || claimantEmail2 == " ") {
  //         this.setState({
  //           alertClaimantEmail2:
  //             document.dir == "ltr"
  //               ? " email address is required "
  //               : " عنوان البريد الإلكتروني مطلوب ",
  //         });
  //       } else this.props.nextStep();
  //     } else if (!validator.isEmail(claimantEmail2)) {
  //       this.setState({
  //         alertClaimantEmail2:
  //           document.dir == "ltr"
  //             ? " invalid email address "
  //             : " عنوان البريد الإلكتروني غير صالح  ",
  //       });
  //     } else {
  //       this.props.nextStep();
  //     }
  //   }

  //   //Additonal Claimant Validation
  //   else if (this.state.additionalClaimant) {
  //     if (validator.isEmpty(claimantName2) || claimantName2 == "") {
  //       this.setState({ alertClaimantName2: true });
  //     } else if (
  //       validator.isEmpty(claimantUserName2) ||
  //       claimantUserName2 == ""
  //     ) {
  //       this.setState({ alertClaimantUserName2: true });
  //     } else if (
  //       validator.isEmpty(claimantNationality2) ||
  //       claimantNationality2 == ""
  //     ) {
  //       this.setState({ alertClaimantNationality2: true });
  //     } else if (
  //       validator.isEmpty(claimantAddress2) ||
  //       claimantAddress2 == ""
  //     ) {
  //       this.setState({ alertClaimantAddress2: true });
  //     } else if (validator.isEmpty(claimantPhone2) || claimantPhone2 == "") {
  //       this.setState({
  //         alertClaimantPhone2:
  //           document.dir == "ltr"
  //             ? " phone number is required "
  //             : " رقم الهاتف مطلوب ",
  //       });
  //     } else if (!validator.isMobilePhone(claimantPhone2)) {
  //       this.setState({
  //         alertClaimantPhone2:
  //           document.dir == "ltr"
  //             ? " invalid phone number "
  //             : " رقم الهاتف غير صحيح ",
  //       });
  //     } else if (validator.isEmpty(claimantEmail2) || claimantEmail2 == "") {
  //       this.setState({
  //         alertClaimantEmail2:
  //           document.dir == "ltr"
  //             ? " email address is required "
  //             : " عنوان البريد الإلكتروني مطلوب ",
  //       });
  //     } else if (!validator.isEmail(claimantEmail2)) {
  //       this.setState({
  //         alertClaimantEmail2:
  //           document.dir == "ltr"
  //             ? " invalid email address "
  //             : " عنوان البريد الإلكتروني غير صالح  ",
  //       });
  //     } else if (this.state.legalPerson) {
  //       if (
  //         validator.isEmpty(legalAuthRepresentativeName) ||
  //         legalAuthRepresentativeName == ""
  //       ) {
  //         this.setState({ alertLegalAuthRepresentativeName: true });
  //       } else if (
  //         validator.isEmpty(legalAuthAddress) ||
  //         legalAuthAddress == ""
  //       ) {
  //         this.setState({ alertlegalAuthAddress: true });
  //       } else if (!validator.isEmail(legalAuthEmail)) {
  //         this.setState({
  //           alertlegalAuthFirmEmail:
  //             document.dir == "ltr"
  //               ? " invalid email address "
  //               : " عنوان البريد الإلكتروني غير صالح  ",
  //         });
  //       } else if (validator.isEmpty(legalAuthEmail) || legalAuthEmail == "") {
  //         this.setState({
  //           alertlegalAuthFirmEmail:
  //             document.dir == "ltr"
  //               ? " email address is required "
  //               : " عنوان البريد الإلكتروني مطلوب ",
  //         });
  //       } else if (
  //         validator.isEmpty(legalAuthNationality) ||
  //         legalAuthNationality == ""
  //       ) {
  //         this.setState({ alertLegalAuthNationality: true });
  //       } else if (!validator.isMobilePhone(legalAuthPhone)) {
  //         this.setState({
  //           alertLegalAuthPhone:
  //             document.dir == "ltr"
  //               ? " invalid phone number "
  //               : " رقم الهاتف غير صحيح ",
  //         });
  //       } else if (validator.isEmpty(legalAuthPhone) || legalAuthPhone == "") {
  //         this.setState({
  //           alertLegalAuthPhone:
  //             document.dir == "ltr"
  //               ? " phone number is required "
  //               : " رقم الهاتف مطلوب ",
  //         });
  //       } else this.props.nextStep();
  //     } else this.props.nextStep();
  //   }

  //   //Additional Claimant Legal Representative Validation
  //   else if (this.state.legalPerson2) {
  //     if (
  //       validator.isEmpty(legalAuthRepresentativeName2) ||
  //       legalAuthRepresentativeName2 == ""
  //     ) {
  //       this.setState({ alertLegalAuthRepresentativeName2: true });
  //     } else if (
  //       validator.isEmpty(legalAuthAddress2) ||
  //       legalAuthAddress2 == ""
  //     ) {
  //       this.setState({ alertlegalAuthAddress2: true });
  //     } else if (!validator.isEmail(legalAuthEmail2)) {
  //       this.setState({
  //         alertLegalAuthEmail2:
  //           document.dir == "ltr"
  //             ? " invalid email address "
  //             : " عنوان البريد الإلكتروني غير صالح  ",
  //       });
  //     } else if (validator.isEmpty(legalAuthEmail2) || legalAuthEmail2 == " ") {
  //       this.setState({
  //         alertLegalAuthEmail2:
  //           document.dir == "ltr"
  //             ? " email address is required "
  //             : " عنوان البريد الإلكتروني مطلوب ",
  //       });
  //     } else if (
  //       validator.isEmpty(legalAuthNationality2) ||
  //       legalAuthNationality2 == ""
  //     ) {
  //       this.setState({ alertLegalAuthNationality2: true });
  //     } else if (!validator.isMobilePhone(legalAuthPhone2)) {
  //       this.setState({
  //         alertLegalAuthPhone2:
  //           document.dir == "ltr"
  //             ? " invalid phone number "
  //             : " رقم الهاتف غير صحيح ",
  //       });
  //     } else if (validator.isEmpty(legalAuthPhone2) || legalAuthPhone2 == "") {
  //       this.setState({
  //         alertLegalAuthPhone2:
  //           document.dir == "ltr"
  //             ? " phone number is required "
  //             : " رقم الهاتف مطلوب ",
  //       });
  //     } else if (powerOfAttorney2 == null) {
  //       this.setState({ alertPOA2: true });
  //     } else this.props.nextStep();
  //   } else {
  //     this.props.nextStep();
  //   }
  // };

  continue = (e) => {
    e.preventDefault();
    const {
      additionalClaimant,
      legalPerson,
      legalPerson2,

      claimantName,
      // claimantUserName,
      claimantAddress,
      claimantEmail,
      claimantNationality,
      claimantPhone,
      claimantName2,
      // claimantUserName2,
      claimantAddress2,
      claimantEmail2,
      claimantNationality2,
      claimantPhone2,
      legalAuthNationality,
      legalAuthAddress,
      legalAuthRepresentativeName,
      legalAuthPhone,
      legalAuthEmail,
      legalAuthNationality2,
      legalAuthAddress2,
      legalAuthRepresentativeName2,
      legalAuthPhone2,
      legalAuthEmail2,
      powerOfAttorney,
      powerOfAttorney2,
    } = this.props.values;

    //TEST
    if (legalPerson && additionalClaimant && legalPerson2) {
      if (validator.isEmpty(claimantName) || claimantName == "") {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The name of the first Claimant is Missing"
              : "لا يوجد إسم المحتكم الأول",
          icon: "info",
        });
      }
      // else if (
      //   validator.isEmpty(claimantUserName) ||
      //   claimantUserName == ""
      // ) {
      //   Swal.fire({
      //     title:
      //       document.dir == "ltr"
      //         ? "The username of the first Claimant is Missing"
      //         : "لا يوجد إسم المستخدم للمحتكم الأول",
      //     icon: "info",
      //   });
      // }
      else if (
        validator.isEmpty(claimantNationality) ||
        claimantNationality == ""
      ) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The nationality of the first Claimant is Missing"
              : "لا يوجد الجنسية للمحتكم الأول",
          icon: "info",
        });
      } else if (validator.isEmpty(claimantAddress) || claimantAddress == "") {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The address of the first Claimant is Missing"
              : "لا يوجد العنوان للمحتكم الأول",
          icon: "info",
        });
      } else if (validator.isEmpty(claimantPhone) || claimantPhone == "") {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The mobile number of the first Claimant is Missing"
              : "لا يوجد رقم متحرك للمحتكم الأول",
          icon: "info",
        });
      } else if (!validator.isMobilePhone(claimantPhone)) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The mobile number of the first Claimant is inavlid"
              : "رقم متحرك للمحتكم الأول غير صالح",
          icon: "info",
        });
      } else if (validator.isEmpty(claimantEmail) || claimantEmail == "") {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The email address of the first Claimant is Missing"
              : "لا يوجد البريد الإلكتروني للمحتكم الأول",
          icon: "info",
        });
      } else if (!validator.isEmail(claimantEmail)) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The email address of the first Claimant is invalid"
              : "البريد الإلكتروني للمحتكم الأول غير صالح",
          icon: "info",
        });
      } else if (validator.isEmpty(claimantName2) || claimantName2 == "") {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The name of the second Claimant is Missing"
              : "لا يوجد إسم المحتكم الثاني",
          icon: "info",
        });
      }
      //  else if (
      //   validator.isEmpty(claimantUserName2) ||
      //   claimantUserName2 == ""
      // ) {
      //   Swal.fire({
      //     title:
      //       document.dir == "ltr"
      //         ? "The username of the second Claimant is Missing"
      //         : "لم يتم إدخال إسم المستخدم للمحتكم الثاني",
      //     icon: "info",
      //   });
      // }
      else if (
        validator.isEmpty(claimantNationality2) ||
        claimantNationality2 == ""
      ) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The nationality of the second Claimant is Missing"
              : "لم يتم إدخال جنسية المحتكم الثاني",
          icon: "info",
        });
      } else if (
        validator.isEmpty(claimantAddress2) ||
        claimantAddress2 == ""
      ) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The address of the second Claimant is Missing"
              : "لم يتم إدخال عنوان المحتكم الثاني",
          icon: "info",
        });
      } else if (validator.isEmpty(claimantPhone2) || claimantPhone2 == "") {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The mobile number of the second Claimant is Missing"
              : "لم يتم إدخال رقم متحرك للمحتكم الثاني",
          icon: "info",
        });
      } else if (!validator.isMobilePhone(claimantPhone2)) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The mobile number of the second Claimant is invalid"
              : "رقم متحرك للمحتكم الثاني غير صالح",
          icon: "info",
        });
      } else if (validator.isEmpty(claimantEmail2) || claimantEmail2 == "") {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The email address of the second Claimant is Missing"
              : "لم يتم إدخال عنوان البريد الإلكتروني للمحتكم الثاني",
          icon: "info",
        });
      } else if (!validator.isEmail(claimantEmail2)) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The email address  of the second Claimant is invalid"
              : "عنوان البريد الإلكتروني للمحتكم الثاني غير صالح",
          icon: "info",
        });
      } else if (
        validator.isEmpty(legalAuthRepresentativeName) ||
        legalAuthRepresentativeName == ""
      ) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The name of the first Claimant's Legal Representative is Missing"
              : "لم يتم إدخال إسم الممثل القانوني للمحتكم الأول",
          icon: "info",
        });
      } else if (
        validator.isEmpty(legalAuthNationality) ||
        legalAuthNationality == ""
      ) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The nationality of the first Claimant's Legal Representative is Missing"
              : "لم يتم إدخال جنسية الممثل القانوني للمحتكم الأول",
          icon: "info",
        });
      } else if (
        validator.isEmpty(legalAuthAddress) ||
        legalAuthAddress == ""
      ) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The address of the first Claimant's Legal Representative is Missing"
              : "لم يتم إدخال عنوان الممثل القانوني للمحتكم الأول",
          icon: "info",
        });
      } else if (validator.isEmpty(legalAuthPhone) || legalAuthPhone == "") {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The mobile number of the first Claimant's Legal Representative is Missing"
              : "لم يتم إدخال رقم متحرك الممثل القانوني للمحتكم الأول",
          icon: "info",
        });
      } else if (!validator.isMobilePhone(legalAuthPhone)) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The mobile number of the first Claimant's Legal Representative is invalid"
              : "رقم متحرك الممثل القانوني للمحتكم الأول غير صالح",
          icon: "info",
        });
      } else if (validator.isEmpty(legalAuthEmail) || legalAuthEmail == "") {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The email address of the first Claimant's Legal Representative is Missing"
              : "لم يتم إدخال عنوان البريد الإلكتروني الممثل القانوني للمحتكم الأول",
          icon: "info",
        });
      } else if (!validator.isEmail(legalAuthEmail)) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The email address  of the first Claimant's Legal Representative is invalid"
              : "عنوان البريد الإلكتروني الممثل القانوني للمحتكم الأول غير صالح",
          icon: "info",
        });
      } else if (powerOfAttorney == null) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The Power of Attorney of the first Claimant's Legal Representative is missing"
              : "لم يتم إدخال وكالة قانونية لممثل المحتكم الأول",
          icon: "info",
        });
      } else if (
        validator.isEmpty(legalAuthRepresentativeName2) ||
        legalAuthRepresentativeName2 == ""
      ) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The name of the second Claimant's Legal Representative is Missing"
              : "لم يتم إدخال إسم المستخدم للمحتكم الثاني",
          icon: "info",
        });
      } else if (
        validator.isEmpty(legalAuthNationality2) ||
        legalAuthNationality2 == ""
      ) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The nationality of the second Claimant's Legal Representative is Missing"
              : "لم يتم إدخال جنسية المحتكم الثاني",
          icon: "info",
        });
      } else if (
        validator.isEmpty(legalAuthAddress2) ||
        legalAuthAddress2 == ""
      ) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The address of the second Claimant's Legal Representative is Missing"
              : "لم يتم إدخال عنوان المحتكم الثاني",
          icon: "info",
        });
      } else if (validator.isEmpty(legalAuthPhone2) || legalAuthPhone2 == "") {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The mobile number of the second Claimant's Legal Representative is Missing"
              : "لم يتم إدخال رقم متحرك للمحتكم الثاني",
          icon: "info",
        });
      } else if (!validator.isMobilePhone(legalAuthPhone2)) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The mobile number of the second Claimant's Legal Representativeis invalid"
              : "رقم متحرك للمحتكم الثاني غير صالح",
          icon: "info",
        });
      } else if (validator.isEmpty(legalAuthEmail2) || legalAuthEmail2 == "") {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The email address of the second Claimant's Legal Representative is Missing"
              : "لم يتم إدخال عنوان البريد الإلكتروني للمحتكم الثاني",
          icon: "info",
        });
      } else if (!validator.isEmail(legalAuthEmail2)) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The email address  of the second Claimant's Legal Representative is invalid"
              : "عنوان البريد الإلكتروني للمحتكم الثاني غير صالح",
          icon: "info",
        });
      } else if (powerOfAttorney2 == null) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The Power of Attorney of the second Claimant's Legal Representative is missing"
              : "لم يتم إدخال وكالة قانونية لممثل المحتكم الثاني",
          icon: "info",
        });
      } else {
        this.props.nextStep();
      }
    }
    //CLAIMANT 1, CLAIMANT 2 & LEGAL REP 1
    else if (legalPerson && additionalClaimant) {
      if (validator.isEmpty(claimantName) || claimantName == "") {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The name of the first Claimant is Missing"
              : "لا يوجد إسم المحتكم الأول",
          icon: "info",
        });
      }
      //  else if (
      //   validator.isEmpty(claimantUserName) ||
      //   claimantUserName == ""
      // ) {
      //   Swal.fire({
      //     title:
      //       document.dir == "ltr"
      //         ? "The username of the first Claimant is Missing"
      //         : "لا يوجد إسم المستخدم للمحتكم الأول",
      //     icon: "info",
      //   });
      // }
      else if (
        validator.isEmpty(claimantNationality) ||
        claimantNationality == ""
      ) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The nationality of the first Claimant is Missing"
              : "لا يوجد الجنسية للمحتكم الأول",
          icon: "info",
        });
      } else if (validator.isEmpty(claimantAddress) || claimantAddress == "") {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The address of the first Claimant is Missing"
              : "لا يوجد العنوان للمحتكم الأول",
          icon: "info",
        });
      } else if (validator.isEmpty(claimantPhone) || claimantPhone == "") {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The mobile number of the first Claimant is Missing"
              : "لا يوجد رقم متحرك للمحتكم الأول",
          icon: "info",
        });
      } else if (!validator.isMobilePhone(claimantPhone)) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The mobile number of the first Claimant is invalid"
              : "رقم متحرك للمحتكم الأول غير صالح",
          icon: "info",
        });
      } else if (validator.isEmpty(claimantEmail) || claimantEmail == "") {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The email address of the first Claimant is Missing"
              : "لا يوجد البريد الإلكتروني للمحتكم الأول",
          icon: "info",
        });
      } else if (!validator.isEmail(claimantEmail)) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The email address  of the first Claimant is invalid"
              : "البريد الإلكتروني للمحتكم الأول غير صالح",
          icon: "info",
        });
      } else if (validator.isEmpty(claimantName2) || claimantName2 == "") {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The name of the second Claimant is Missing"
              : "لا يوجد إسم المحتكم الثاني",
          icon: "info",
        });
      }
      //  else if (
      //   validator.isEmpty(claimantUserName2) ||
      //   claimantUserName2 == ""
      // ) {
      //   Swal.fire({
      //     title:
      //       document.dir == "ltr"
      //         ? "The username of the second Claimant is Missing"
      //         : "لم يتم إدخال إسم المستخدم للمحتكم الثاني",
      //     icon: "info",
      //   });
      // }
      else if (
        validator.isEmpty(claimantNationality2) ||
        claimantNationality2 == ""
      ) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The nationality of the second Claimant is Missing"
              : "لم يتم إدخال جنسية المحتكم الثاني",
          icon: "info",
        });
      } else if (
        validator.isEmpty(claimantAddress2) ||
        claimantAddress2 == ""
      ) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The address of the second Claimant is Missing"
              : "لم يتم إدخال عنوان المحتكم الثاني",
          icon: "info",
        });
      } else if (validator.isEmpty(claimantPhone2) || claimantPhone2 == "") {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The mobile number of the second Claimant is Missing"
              : "لم يتم إدخال رقم متحرك للمحتكم الثاني",
          icon: "info",
        });
      } else if (!validator.isMobilePhone(claimantPhone2)) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The mobile number of the second Claimant is invalid"
              : "رقم متحرك للمحتكم الثاني غير صالح",
          icon: "info",
        });
      } else if (validator.isEmpty(claimantEmail2) || claimantEmail2 == "") {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The email address of the second Claimant is Missing"
              : "لم يتم إدخال عنوان البريد الإلكتروني للمحتكم الثاني",
          icon: "info",
          icon: "info",
        });
      } else if (!validator.isEmail(claimantEmail2)) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The email address  of the second Claimant is invalid"
              : "عنوان البريد الإلكتروني للمحتكم الثاني غير صالح",
          icon: "info",
        });
      } else if (
        validator.isEmpty(legalAuthRepresentativeName) ||
        legalAuthRepresentativeName == ""
      ) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The name of the first Claimant's Legal Representative is Missing"
              : "لم يتم إدخال إسم الممثل القانوني للمحتكم الأول",
          icon: "info",
        });
      } else if (
        validator.isEmpty(legalAuthNationality) ||
        legalAuthNationality == ""
      ) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The nationality of the first Claimant's Legal Representative is Missing"
              : "لم يتم إدخال جنسية الممثل القانوني للمحتكم الأول",
          icon: "info",
        });
      } else if (
        validator.isEmpty(legalAuthAddress) ||
        legalAuthAddress == ""
      ) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The address of the first Claimant's Legal Representative is Missing"
              : "لم يتم إدخال عنوان الممثل القانوني للمحتكم الأول",
          icon: "info",
        });
      } else if (validator.isEmpty(legalAuthPhone) || legalAuthPhone == "") {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The mobile number of the first Claimant's Legal Representative is Missing"
              : "لم يتم إدخال رقم متحرك الممثل القانوني للمحتكم الأول",
          icon: "info",
        });
      } else if (!validator.isMobilePhone(legalAuthPhone)) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The mobile number of the first Claimant's Legal Representative is invalid"
              : "رقم متحرك الممثل القانوني للمحتكم الأول غير صالح",
          icon: "info",
        });
      } else if (validator.isEmpty(legalAuthEmail) || legalAuthEmail == "") {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The email address of the first Claimant's Legal Representative is Missing"
              : "لم يتم إدخال عنوان البريد الإلكتروني الممثل القانوني للمحتكم الأول",
          icon: "info",
        });
      } else if (!validator.isEmail(legalAuthEmail)) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The email address  of the first Claimant's Legal Representative is invalid"
              : "عنوان البريد الإلكتروني الممثل القانوني للمحتكم الأول غير صالح",
          icon: "info",
        });
      } else if (powerOfAttorney == null) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The Power of Attorney of the first Claimant's Legal Representative is missing"
              : "لم يتم إدخال وكالة قانونية لممثل المحتكم الأول",
          icon: "info",
        });
      } else {
        this.props.nextStep();
      }
    }
    //TEST
    else if (legalPerson2 && additionalClaimant) {
      if (validator.isEmpty(claimantName) || claimantName == "") {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The name of the first Claimant is Missing"
              : "لا يوجد إسم المحتكم الأول",
          icon: "info",
        });
      }
      //  else if (
      //   validator.isEmpty(claimantUserName) ||
      //   claimantUserName == ""
      // ) {
      //   Swal.fire({
      //     title:
      //       document.dir == "ltr"
      //         ? "The username of the first Claimant is Missing"
      //         : "AR",
      //     icon: "info",
      //   });
      // }
      else if (
        validator.isEmpty(claimantNationality) ||
        claimantNationality == ""
      ) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The nationality of the first Claimant is Missing"
              : "AR",
          icon: "info",
        });
      } else if (validator.isEmpty(claimantAddress) || claimantAddress == "") {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The address of the first Claimant is Missing"
              : "AR",
          icon: "info",
        });
      } else if (validator.isEmpty(claimantPhone) || claimantPhone == "") {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The mobile number of the first Claimant is Missing"
              : "AR",
          icon: "info",
        });
      } else if (!validator.isMobilePhone(claimantPhone)) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The mobile number of the first Claimant is invalid"
              : "AR",
          icon: "info",
        });
      } else if (validator.isEmpty(claimantEmail) || claimantEmail == "") {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The email address of the first Claimant is Missing"
              : "AR",
          icon: "info",
        });
      } else if (!validator.isEmail(claimantEmail)) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The email address  of the first Claimant is invalid"
              : "AR",
          icon: "info",
        });
      } else if (validator.isEmpty(claimantName2) || claimantName2 == "") {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The name of the second Claimant is Missing"
              : "AR",
          icon: "info",
        });
      }
      //  else if (
      //   validator.isEmpty(claimantUserName2) ||
      //   claimantUserName2 == ""
      // ) {
      //   Swal.fire({
      //     title:
      //       document.dir == "ltr"
      //         ? "The username of the second Claimant is Missing"
      //         : "لم يتم إدخال إسم المستخدم للمحتكم الثاني  ",
      //     icon: "info",
      //   });
      // }
      else if (
        validator.isEmpty(claimantNationality2) ||
        claimantNationality2 == ""
      ) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The nationality of the second Claimant is Missing"
              : "لم يتم إدخال جنسية المحتكم الثاني",
          icon: "info",
        });
      } else if (
        validator.isEmpty(claimantAddress2) ||
        claimantAddress2 == ""
      ) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The address of the second Claimant is Missing"
              : "لم يتم إدخال عنوان المحتكم الثاني",
          icon: "info",
        });
      } else if (validator.isEmpty(claimantPhone2) || claimantPhone2 == "") {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The mobile number of the second Claimant is Missing"
              : "لم يتم إدخال رقم متحرك للمحتكم الثاني",
          icon: "info",
        });
      } else if (!validator.isMobilePhone(claimantPhone2)) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The mobile number of the second Claimant is invalid"
              : "رقم متحرك للمحتكم الثاني غير صالح",
          icon: "info",
        });
      } else if (validator.isEmpty(claimantEmail2) || claimantEmail2 == "") {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The email address of the second Claimant is Missing"
              : "لم يتم إدخال عنوان البريد الإلكتروني للمحتكم الثاني",
          icon: "info",
        });
      } else if (!validator.isEmail(claimantEmail2)) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The email address  of the second Claimant is invalid"
              : "عنوان البريد الإلكتروني للمحتكم الثاني غير صالح",
          icon: "info",
        });
      } else if (
        validator.isEmpty(legalAuthRepresentativeName2) ||
        legalAuthRepresentativeName2 == ""
      ) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The name of the second Claimant's Legal Representative is Missing"
              : "لم يتم إدخال إسم المستخدم للمحتكم الثاني",
          icon: "info",
        });
      } else if (
        validator.isEmpty(legalAuthNationality2) ||
        legalAuthNationality2 == ""
      ) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The nationality of the second Claimant's Legal Representative is Missing"
              : "لم يتم إدخال جنسية المحتكم الثاني",
          icon: "info",
        });
      } else if (
        validator.isEmpty(legalAuthAddress2) ||
        legalAuthAddress2 == ""
      ) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The address of the second Claimant's Legal Representative is Missing"
              : "لم يتم إدخال عنوان المحتكم الثاني",
          icon: "info",
        });
      } else if (validator.isEmpty(legalAuthPhone2) || legalAuthPhone2 == "") {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The mobile number of the second Claimant's Legal Representative is Missing"
              : "لم يتم إدخال رقم متحرك للمحتكم الثاني",
          icon: "info",
        });
      } else if (!validator.isMobilePhone(legalAuthPhone2)) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The mobile number of the second Claimant's Legal Representativeis invalid"
              : "رقم متحرك للمحتكم الثاني غير صالح",
          icon: "info",
        });
      } else if (validator.isEmpty(legalAuthEmail2) || legalAuthEmail2 == "") {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The email address of the second Claimant's Legal Representative is Missing"
              : "لم يتم إدخال عنوان البريد الإلكتروني للمحتكم الثاني",
          icon: "info",
        });
      } else if (!validator.isEmail(legalAuthEmail2)) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The email address  of the second Claimant's Legal Representative is invalid"
              : "عنوان البريد الإلكتروني للمحتكم الثاني غير صالح",
          icon: "info",
        });
      } else if (powerOfAttorney2 == null) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The Power of Attorney of the second Claimant's Legal Representative is missing"
              : "لم يتم إدخال وكالة قانونية لممثل المحتكم الثاني",
          icon: "info",
        });
      } else {
        this.props.nextStep();
      }
    }
    //TWO CLAIMANTS
    else if (additionalClaimant) {
      if (validator.isEmpty(claimantName) || claimantName == "") {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The name of the first Claimant is Missing"
              : "لا يوجد إسم المحتكم الأول",
          icon: "info",
        });
      }
      //  else if (
      //   validator.isEmpty(claimantUserName) ||
      //   claimantUserName == ""
      // ) {
      //   Swal.fire({
      //     title:
      //       document.dir == "ltr"
      //         ? "The username of the first Claimant is Missing"
      //         : "لا يوجد إسم المستخدم للمحتكم الأول",
      //     icon: "info",
      //   });
      // }
      else if (
        validator.isEmpty(claimantNationality) ||
        claimantNationality == ""
      ) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The nationality of the first Claimant is Missing"
              : "لا يوجد الجنسية للمحتكم الأول",
          icon: "info",
        });
      } else if (validator.isEmpty(claimantAddress) || claimantAddress == "") {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The address of the first Claimant is Missing"
              : "لا يوجد العنوان للمحتكم الأول",
          icon: "info",
        });
      } else if (validator.isEmpty(claimantPhone) || claimantPhone == "") {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The mobile number of the first Claimant is Missing"
              : "لا يوجد رقم متحرك للمحتكم الأول",
          icon: "info",
        });
      } else if (!validator.isMobilePhone(claimantPhone)) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The mobile number of the first Claimant is invalid"
              : "رقم متحرك للمحتكم الأول غير صالح",
          icon: "info",
        });
      } else if (validator.isEmpty(claimantEmail) || claimantEmail == "") {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The email address of the first Claimant is Missing"
              : "لا يوجد البريد الإلكتروني للمحتكم الأول",
          icon: "info",
        });
      } else if (!validator.isEmail(claimantEmail)) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The email address  of the first Claimant is invalid"
              : "البريد الإلكتروني للمحتكم الأول غير صالح",
          icon: "info",
        });
      } else if (validator.isEmpty(claimantName2) || claimantName2 == "") {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The name of the second Claimant is Missing"
              : "لا يوجد إسم المحتكم الثاني",
          icon: "info",
        });
      }
      //  else if (
      //   validator.isEmpty(claimantUserName2) ||
      //   claimantUserName2 == ""
      // ) {
      //   Swal.fire({
      //     title:
      //       document.dir == "ltr"
      //         ? "The username of the second Claimant is Missing"
      //         : "لم يتم إدخال إسم المستخدم للمحتكم الثاني",
      //     icon: "info",
      //   });
      // }
      else if (
        validator.isEmpty(claimantNationality2) ||
        claimantNationality2 == ""
      ) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The nationality of the second Claimant is Missing"
              : "لم يتم إدخال جنسية المحتكم الثاني",
          icon: "info",
        });
      } else if (
        validator.isEmpty(claimantAddress2) ||
        claimantAddress2 == ""
      ) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The address of the second Claimant is Missing"
              : "لم يتم إدخال عنوان المحتكم الثاني",
          icon: "info",
        });
      } else if (validator.isEmpty(claimantPhone2) || claimantPhone2 == "") {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The mobile number of the second Claimant is Missing"
              : "لم يتم إدخال رقم متحرك للمحتكم الثاني",
          icon: "info",
        });
      } else if (!validator.isMobilePhone(claimantPhone2)) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The mobile number of the second Claimant is invalid"
              : "رقم متحرك للمحتكم الثاني غير صالح",
          icon: "info",
        });
      } else if (validator.isEmpty(claimantEmail2) || claimantEmail2 == "") {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The email address of the second Claimant is Missing"
              : "لم يتم إدخال عنوان البريد الإلكتروني للمحتكم الثاني",
          icon: "info",
        });
      } else if (!validator.isEmail(claimantEmail2)) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The email address  of the second Claimant is invalid"
              : "عنوان البريد الإلكتروني للمحتكم الثاني غير صالح",
          icon: "info",
        });
      } else {
        this.props.nextStep();
      }
    }

    // FIRST CLAIMANT AND HIS LEGAL REP
    else if (legalPerson) {
      if (validator.isEmpty(claimantName) || claimantName == "") {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The name of the first Claimant is Missing"
              : "لا يوجد إسم المحتكم الأول",
          icon: "info",
        });
      }
      //  else if (
      //   validator.isEmpty(claimantUserName) ||
      //   claimantUserName == ""
      // ) {
      //   Swal.fire({
      //     title:
      //       document.dir == "ltr"
      //         ? "The username of the first Claimant is Missing"
      //         : "لا يوجد إسم المستخدم للمحتكم الأول",
      //     icon: "info",
      //   });
      // }
      else if (
        validator.isEmpty(claimantNationality) ||
        claimantNationality == ""
      ) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The nationality of the first Claimant is Missing"
              : "لا يوجد الجنسية للمحتكم الأول",
          icon: "info",
        });
      } else if (validator.isEmpty(claimantAddress) || claimantAddress == "") {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The address of the first Claimant is Missing"
              : "لا يوجد العنوان للمحتكم الأول",
          icon: "info",
        });
      } else if (validator.isEmpty(claimantPhone) || claimantPhone == "") {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The mobile number of the first Claimant is Missing"
              : "لا يوجد رقم متحرك للمحتكم الأول",
          icon: "info",
        });
      } else if (!validator.isMobilePhone(claimantPhone)) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The mobile number of the first Claimant is invalid"
              : "رقم متحرك للمحتكم الأول غير صالح",
          icon: "info",
        });
      } else if (validator.isEmpty(claimantEmail) || claimantEmail == "") {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The email address of the first Claimant is Missing"
              : "لا يوجد البريد الإلكتروني للمحتكم الأول",
          icon: "info",
        });
      } else if (!validator.isEmail(claimantEmail)) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The email address  of the first Claimant is invalid"
              : "البريد الإلكتروني للمحتكم الأول غير صالح",
          icon: "info",
        });
      } else if (
        validator.isEmpty(legalAuthRepresentativeName) ||
        legalAuthRepresentativeName == ""
      ) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The name of the first Claimant's Legal Representative is Missing"
              : "لم يتم إدخال إسم الممثل القانوني للمحتكم الأول",
          icon: "info",
        });
      } else if (
        validator.isEmpty(legalAuthNationality) ||
        legalAuthNationality == ""
      ) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The nationality of the first Claimant's Legal Representative is Missing"
              : "لم يتم إدخال جنسية الممثل القانوني للمحتكم الأول",
          icon: "info",
        });
      } else if (
        validator.isEmpty(legalAuthAddress) ||
        legalAuthAddress == ""
      ) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The address of the first Claimant's Legal Representative is Missing"
              : "لم يتم إدخال عنوان الممثل القانوني للمحتكم الأول",
          icon: "info",
        });
      } else if (validator.isEmpty(legalAuthPhone) || legalAuthPhone == "") {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The mobile number of the first Claimant's Legal Representative is Missing"
              : "لم يتم إدخال رقم متحرك الممثل القانوني للمحتكم الأول",
          icon: "info",
        });
      } else if (!validator.isMobilePhone(legalAuthPhone)) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The mobile number of the first Claimant's Legal Representative is invalid"
              : "رقم متحرك الممثل القانوني للمحتكم الأول غير صالح",
          icon: "info",
        });
      } else if (validator.isEmpty(legalAuthEmail) || legalAuthEmail == "") {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The email address of the first Claimant's Legal Representative is Missing"
              : "لم يتم إدخال عنوان البريد الإلكتروني الممثل القانوني للمحتكم الأول",
          icon: "info",
        });
      } else if (!validator.isEmail(legalAuthEmail)) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The email address  of the first Claimant's Legal Representative is invalid"
              : "عنوان البريد الإلكتروني الممثل القانوني للمحتكم الأول غير صالح",
          icon: "info",
        });
      } else if (powerOfAttorney == null) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The Power of Attorney of the first Claimant's Legal Representative is missing"
              : "لم يتم إدخال وكالة قانونية لممثل المحتكم الأول",
          icon: "info",
        });
      } else {
        this.props.nextStep();
      }
    }
    //ONLY ONE CLAIMANT
    else {
      if (validator.isEmpty(claimantName) || claimantName == "") {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The name of the first Claimant is Missing"
              : "لا يوجد إسم المحتكم الأول",
          icon: "info",
        });
      }
      //  else if (
      //   validator.isEmpty(claimantUserName) ||
      //   claimantUserName == ""
      // ) {
      //   Swal.fire({
      //     title:
      //       document.dir == "ltr"
      //         ? "The username of the first Claimant is Missing"
      //         : "لا يوجد إسم المستخدم للمحتكم الأول",
      //     icon: "info",
      //   });
      // }
      else if (
        validator.isEmpty(claimantNationality) ||
        claimantNationality == ""
      ) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The nationality of the first Claimant is Missing"
              : "لا يوجد الجنسية للمحتكم الأول",
          icon: "info",
        });
      } else if (validator.isEmpty(claimantAddress) || claimantAddress == "") {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The address of the first Claimant is Missing"
              : "لا يوجد العنوان للمحتكم الأول",
          icon: "info",
        });
      } else if (validator.isEmpty(claimantPhone) || claimantPhone == "") {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The mobile number of the first Claimant is Missing"
              : "لا يوجد رقم متحرك للمحتكم الأول",
          icon: "info",
        });
      } else if (!validator.isMobilePhone(claimantPhone)) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The mobile number of the first Claimant is invalid"
              : "رقم متحرك للمحتكم الأول غير صالح",
          icon: "info",
        });
      } else if (validator.isEmpty(claimantEmail) || claimantEmail == "") {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The email address of the first Claimant is Missing"
              : "لا يوجد البريد الإلكتروني للمحتكم الأول",
          icon: "info",
        });
      } else if (!validator.isEmail(claimantEmail)) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The email address  of the first Claimant is invalid"
              : "البريد الإلكتروني للمحتكم الأول غير صالح",
          icon: "info",
        });
      } else {
        this.props.nextStep();
      }
    }
  };

  labelStyle = {
    float: document.dir == "ltr" ? "left" : "right",
  };

  render() {
    const labelStyle = {
      float: document.dir == "ltr" ? "left" : "right",
    };

    const {
      values,
      handleChange,
      handleAdditionalPerson,
      handleLegalPerson,
      handleLegalPerson2,
      handleModalInstructions,
    } = this.props;

    const { legalPerson, legalPerson2, additionalClaimant, modalInstructions } =
      this.props.values;
    const {
      alertClaimantName,
      // alertClaimantUserName,
      // alertClaimantUserName2,
      alertClaimantAddress,
      alertClaimantEmail,
      alertClaimantNationality,
      alertClaimantPhone,

      alertClaimantName2,
      alertClaimantAddress2,
      alertClaimantEmail2,
      alertClaimantNationality2,
      alertClaimantPhone2,
    } = this.state;

    // Legal Representative

    const legalBlock = () => {
      const { values, handleChange, handleFileChange } = this.props;
      return (
        <Card style={styles.cardBgSecondary} className="shadow mb-5">
          <h6 style={styles.center}>
            {document.dir == "ltr" ? "Legal Representative" : "الممثل القانوني"}
          </h6>
          <CardBody>
            <Row>
              <Col xl={6} lg={6} md={6} sm={12}>
                <FormGroup>
                  <Label style={labelStyle} for="legalAuthRepresentativeName">
                    {document.dir == "ltr"
                      ? "Full Name of the Representative ( official )"
                      : "اسم الممثل القانوني"}
                  </Label>
                  {this.state.alertLegalAuthRepresentativeName ? (
                    <span style={styles.warning}> name is required</span>
                  ) : (
                    <span style={styles.red}> *</span>
                  )}
                  <Input
                    type="text"
                    name="name"
                    id="legalAuthRepresentativeName"
                    onChange={handleChange("legalAuthRepresentativeName")}
                    defaultValue={values.legalAuthRepresentativeName}
                    required
                  />
                </FormGroup>
              </Col>
              <Col xl={6} lg={6} md={6} sm={12}>
                <FormGroup>
                  <Label style={labelStyle} for="legalAuthFirmName">
                    {document.dir == "ltr"
                      ? "Name of the Representative Firm"
                      : "اسم مكتب المحلماة"}
                  </Label>{" "}
                  <Input
                    type="text"
                    name="legalAuthFirmName"
                    id="legalAuthFirmName"
                    onChange={handleChange("legalAuthFirmName")}
                    defaultValue={values.legalAuthFirmName}
                  />
                </FormGroup>
              </Col>
              <Col xl={6} lg={6} md={6} sm={12}>
                <FormGroup>
                  <Label style={labelStyle} for="legalAuthNationality">
                    {document.dir == "ltr" ? "Nationality" : " الجنسية "}
                  </Label>
                  {this.state.alertLegalAuthNationality ? (
                    <span style={styles.warning}> nationality is required</span>
                  ) : (
                    <span style={styles.red}> *</span>
                  )}
                  {/* <Input
                    className="selectpicker"
                    type="select"
                    name="legalAuthNationality"
                    id="legalAuthNationality"
                    onChange={handleChange("legalAuthNationality")}
                    defaultValue={values.legalAuthNationality}
                  >
                    {document.dir == "ltr" ? countries() : countries_()}
                  </Input> */}
                  <Input
                    type="text"
                    list="data1"
                    value={values.legalAuthNationality}
                    onChange={handleChange("legalAuthNationality")}
                  />
                  {document.dir == "ltr" ? (
                    <datalist id="data1">
                      {countriesArray.map((item, index) => (
                        <option key={index} value={item.value} />
                      ))}
                    </datalist>
                  ) : (
                    <datalist id="data1">
                      {countriesArray_.map((item, index) => (
                        <option key={index} value={item.value} />
                      ))}
                    </datalist>
                  )}
                </FormGroup>
              </Col>

              <Col xl={6} lg={6} md={6} sm={12}>
                <FormGroup>
                  <Label style={labelStyle} for="legalAuthAddress">
                    {document.dir == "ltr" ? "Full Address" : "العنوان الكامل"}
                  </Label>
                  {this.state.alertlegalAuthAddress ? (
                    <span style={styles.warning}>address is required</span>
                  ) : (
                    <span style={styles.red}> *</span>
                  )}
                  <Input
                    type="text"
                    name="legalAuthAddress"
                    id="legalAuthAddress"
                    onChange={handleChange("legalAuthAddress")}
                    defaultValue={values.legalAuthAddress}
                  />
                </FormGroup>
              </Col>
              <Col xl={6} lg={6} md={6} sm={12}>
                <FormGroup>
                  <Label style={labelStyle} for="legalAuthPOBox">
                    {document.dir == "ltr" ? "P.O.Box" : "الصندوق البريدي"}
                  </Label>

                  <Input
                    type="text"
                    name="legalAuthPOBox"
                    id="legalAuthPOBox"
                    onChange={handleChange("legalAuthPOBox")}
                    defaultValue={values.legalAuthPOBox}
                  />
                </FormGroup>
              </Col>

              <Col xl={6} lg={6} md={6} sm={12}>
                <FormGroup>
                  <Label style={labelStyle} for="legalAuthPhone">
                    {document.dir == "ltr" ? "Phone" : "رقم الهاتف"}
                  </Label>
                  {this.state.alertLegalAuthPhone ? (
                    <span style={styles.warning}>
                      {this.state.alertLegalAuthPhone}
                    </span>
                  ) : (
                    <span style={styles.red}> *</span>
                  )}
                  <Input
                    type="text"
                    name="legalAuthPhone"
                    id="legalAuthPhone"
                    onChange={handleChange("legalAuthPhone")}
                    defaultValue={values.legalAuthPhone}
                  />
                </FormGroup>
              </Col>
              <Col xl={6} lg={6} md={6} sm={12}>
                <FormGroup>
                  <Label style={labelStyle} for="legalAuthFax">
                    {document.dir == "ltr" ? "Fax" : "فاكس"}
                  </Label>
                  <Input
                    type="text"
                    name="legalAuthFax"
                    id="legalAuthFax"
                    onChange={handleChange("legalAuthFax")}
                    defaultValue={values.legalAuthFax}
                  />
                </FormGroup>
              </Col>

              <Col xl={6} lg={6} md={6} sm={12}>
                <FormGroup>
                  <Label style={labelStyle} for="legalAuthEmail">
                    {document.dir == "ltr" ? "E-mail" : "البريد الإكترونى"}
                  </Label>
                  {this.state.alertlegalAuthFirmEmail ? (
                    <span style={styles.warning}> email is required</span>
                  ) : (
                    <span style={styles.red}> *</span>
                  )}
                  <Input
                    type="email"
                    name="legalAuthEmail"
                    id="legalAuthEmail"
                    onChange={handleChange("legalAuthEmail")}
                    defaultValue={values.legalAuthEmail}
                  />
                </FormGroup>
              </Col>
              <Col xl={6} lg={6} md={6} sm={12}>
                <FormGroup>
                  <Label style={labelStyle} for="legalAuthRegistration">
                    {document.dir == "ltr"
                      ? "Commercial Registration Number"
                      : "رقم السجل التجاري"}
                  </Label>

                  <Input
                    type="text"
                    name="legalAuthRegistration"
                    id="legalAuthRegistration"
                    onChange={handleChange("legalAuthRegistration")}
                    defaultValue={values.legalAuthRegistration}
                  />
                </FormGroup>
              </Col>

              <Col xl={6} lg={6} md={6} sm={12}>
                <FormGroup>
                  <Label style={labelStyle} for="powerOfAttorney">
                    {document.dir == "ltr" ? "Power Of Attorney" : "التوكيل"}
                  </Label>{" "}
                  {this.state.alertPOA ? (
                    <span style={styles.warning}>
                      {document.dir == "ltr"
                        ? " Power of Attorney is required "
                        : " توكيل خاص بالقضايا مطلوب "}
                    </span>
                  ) : (
                    <span style={styles.red}> *</span>
                  )}
                  <CustomInput
                    type="file"
                    id="powerOfAttorney"
                    name="powerOfAttorney"
                    style={{
                      overflow: "hidden",
                      backgroundColor: "white",
                      border: "none",
                    }}
                    label={
                      document.dir == "ltr" ? "Upload a File" : "تحميل الملف"
                    }
                    onChange={handleFileChange}
                  />
                </FormGroup>
              </Col>
            </Row>
          </CardBody>
        </Card>
      );
    };

    const legalBlock2 = () => {
      const { values, handleChange, handleFileChange } = this.props;
      return (
        <Card style={styles.cardBgSecondary} className="shadow mb-5">
          <h6 style={styles.center}>
            {document.dir == "ltr" ? "Legal Representative" : "الممثل القانوني"}
          </h6>
          <CardBody>
            <Row>
              <Col xl={6} lg={6} md={6} sm={12}>
                <FormGroup>
                  <Label style={labelStyle} for="legalAuthRepresentativeName2">
                    {document.dir == "ltr"
                      ? "Full Name of the Representative ( official )"
                      : "اسم الممثل القانوني"}
                  </Label>
                  {this.state.alertLegalAuthRepresentativeName2 ? (
                    <span style={styles.warning}> name is required</span>
                  ) : (
                    <span style={styles.red}> *</span>
                  )}
                  <Input
                    type="text"
                    name="name2"
                    id="legalAuthRepresentativeName2"
                    onChange={handleChange("legalAuthRepresentativeName2")}
                    defaultValue={values.legalAuthRepresentativeName2}
                    required
                  />
                </FormGroup>
              </Col>
              <Col xl={6} lg={6} md={6} sm={12}>
                <FormGroup>
                  <Label style={labelStyle} for="legalAuthFirmName2">
                    {document.dir == "ltr"
                      ? "Name of the Representative Firm"
                      : "اسم مكتب المحلماة"}
                  </Label>{" "}
                  {this.state.alertLegalAuthFirmName2 ? (
                    <span style={styles.warning}> name is required</span>
                  ) : (
                    <span style={styles.red}> *</span>
                  )}
                  <Input
                    type="text"
                    name="legalAuthFirmName2"
                    id="legalAuthFirmName2"
                    onChange={handleChange("legalAuthFirmName2")}
                    defaultValue={values.legalAuthFirmName2}
                  />
                </FormGroup>
              </Col>
              <Col xl={6} lg={6} md={6} sm={12}>
                <FormGroup>
                  <Label style={labelStyle} for="legalAuthNationality2">
                    {document.dir == "ltr" ? "Nationality" : " الجنسية "}
                  </Label>
                  {this.state.alertLegalAuthNationality2 ? (
                    <span style={styles.warning}> nationality is required</span>
                  ) : (
                    <span style={styles.red}> *</span>
                  )}{" "}
                  {/* <Input
                    type="select"
                    name="legalAuthNationality2"
                    id="legalAuthNationality2"
                    onChange={handleChange("legalAuthNationality2")}
                    defaultValue={values.legalAuthNationality2}
                  >
                    {document.dir == "ltr" ? countries() : countries_()}
                  </Input> */}
                  <Input
                    type="text"
                    list="data2"
                    value={values.legalAuthNationality2}
                    onChange={handleChange("legalAuthNationality2")}
                  />
                  {document.dir == "ltr" ? (
                    <datalist id="data2">
                      {countriesArray.map((item, index) => (
                        <option key={index} value={item.value} />
                      ))}
                    </datalist>
                  ) : (
                    <datalist id="data2">
                      {countriesArray_.map((item, index) => (
                        <option key={index} value={item.value} />
                      ))}
                    </datalist>
                  )}
                </FormGroup>
              </Col>

              <Col xl={6} lg={6} md={6} sm={12}>
                <FormGroup>
                  <Label style={labelStyle} for="legalAuthAddress2">
                    {document.dir == "ltr" ? "Full Address" : "العنوان الكامل"}
                  </Label>
                  {this.state.alertlegalAuthAddress2 ? (
                    <span style={styles.warning}>address is required</span>
                  ) : (
                    <span style={styles.red}> *</span>
                  )}
                  <Input
                    type="text"
                    name="legalAuthAddress2"
                    id="legalAuthAddress2"
                    onChange={handleChange("legalAuthAddress2")}
                    defaultValue={values.legalAuthAddress2}
                  />
                </FormGroup>
              </Col>
              <Col xl={6} lg={6} md={6} sm={12}>
                <FormGroup>
                  <Label style={labelStyle} for="legalAuthPOBox2">
                    {document.dir == "ltr" ? "P.O.Box" : "الصندوق البريدي"}
                  </Label>
                  <Input
                    type="text"
                    name="legalAuthPOBox2"
                    id="legalAuthPOBox2"
                    onChange={handleChange("legalAuthPOBox2")}
                    defaultValue={values.legalAuthPOBox2}
                  />
                </FormGroup>
              </Col>

              <Col xl={6} lg={6} md={6} sm={12}>
                <FormGroup>
                  <Label style={labelStyle} for="legalAuthPhone2">
                    {document.dir == "ltr" ? "Phone" : "رقم الهاتف"}
                  </Label>
                  {this.state.alertLegalAuthPhone2 ? (
                    <span style={styles.warning}>
                      {this.state.alertLegalAuthPhone2}
                    </span>
                  ) : (
                    <span style={styles.red}> *</span>
                  )}
                  <Input
                    type="text"
                    name="legalAuthPhone2"
                    id="legalAuthPhone2"
                    onChange={handleChange("legalAuthPhone2")}
                    defaultValue={values.legalAuthPhone2}
                  />
                </FormGroup>
              </Col>
              <Col xl={6} lg={6} md={6} sm={12}>
                <FormGroup>
                  <Label style={labelStyle} for="legalAuthFax">
                    {document.dir == "ltr" ? "Fax" : "فاكس"}
                  </Label>
                  <Input
                    type="text"
                    name="legalAuthFax2"
                    id="legalAuthFax2"
                    onChange={handleChange("legalAuthFax2")}
                    defaultValue={values.legalAuthFax2}
                  />
                </FormGroup>
              </Col>

              <Col xl={6} lg={6} md={6} sm={12}>
                <FormGroup>
                  <Label style={labelStyle} for="legalAuthEmail2">
                    {document.dir == "ltr" ? "E-mail" : "البريد الإكترونى"}
                  </Label>
                  {this.state.alertlegalAuthFirmEmail2 ? (
                    <span style={styles.warning}> email is required</span>
                  ) : (
                    <span style={styles.red}> *</span>
                  )}
                  <Input
                    type="email"
                    name="legalAuthEmail2"
                    id="legalAuthEmail2"
                    onChange={handleChange("legalAuthEmail2")}
                    defaultValue={values.legalAuthEmail2}
                  />
                </FormGroup>
              </Col>
              <Col xl={6} lg={6} md={6} sm={12}>
                <FormGroup>
                  <Label style={labelStyle} for="legalAuthRegistration2">
                    {document.dir == "ltr"
                      ? "Commercial Registration Number"
                      : "رقم السجل التجاري"}
                  </Label>

                  <Input
                    type="text"
                    name="legalAuthRegistration2"
                    id="legalAuthRegistration2"
                    onChange={handleChange("legalAuthRegistration2")}
                    defaultValue={values.legalAuthRegistration2}
                  />
                </FormGroup>
              </Col>

              <Col xl={6} lg={6} md={6} sm={12}>
                <FormGroup>
                  <Label style={labelStyle} for="powerOfAttorney2">
                    {document.dir == "ltr" ? "Power Of Attorney" : "التوكيل"}
                  </Label>
                  {this.state.alertPOA2 ? (
                    <span style={styles.warning}>
                      {document.dir == "ltr"
                        ? " Power of Attorney is required "
                        : " توكيل خاص بالقضايا مطلوب "}
                    </span>
                  ) : (
                    <span style={styles.red}> *</span>
                  )}
                  <CustomInput
                    type="file"
                    name="powerOfAttorney2"
                    style={{
                      overflow: "hidden",
                      backgroundColor: "white",
                      border: "none",
                    }}
                    label={
                      document.dir == "ltr" ? "Upload a File" : "تحميل الملف"
                    }
                    onChange={handleFileChange}
                  />
                </FormGroup>
              </Col>
            </Row>
          </CardBody>
        </Card>
      );
    };

    return modalInstructions ? (
      <div>
        <Modal
          isOpen={modalInstructions}
          // toggle={this.toggle}
          className="shadow-lg"
          style={{
            marginTop: "10vh",
            textAlign: document.dir == "ltr" ? "left" : "right",
          }}
        >
          <ModalHeader>
            <b>{document.dir == "ltr" ? "Instructions" : "تعليمات"}</b>
          </ModalHeader>
          <ModalBody style={{ fontSize: "16px" }}>
            <ol
              style={{
                listStyle: document.dir == "ltr" ? "" : "arabic-indic",
              }}
            >
              <li>
                {document.dir == "ltr"
                  ? "Write the name of the Applicant as mentioned on his identity card or passport."
                  : "يكتب إسم طالب التحكيم كما هو مذكور في بطاقة هويته أو جواز سفره."}
              </li>

              <li>
                {document.dir == "ltr"
                  ? "Provide the address of the applicant and his/her email and do not leave any spaces."
                  : "يتم إدخال العنوان الخاص بطالب التحكيم بما فيه عنوان البريد الإلكتروني، ولا تترك الفراغات."}
              </li>

              <li>
                {document.dir == "ltr"
                  ? "While uploading or downloading the files on e-platform, make sure that the size is less than 15 Megabyte (MB). You can also compress the files using either "
                  : "عند إدخال أو تحميل ملفات على المنصة الإلكترونية تأكد بأن حجمها أقل من ١٥ ميغابايت، ويمكنك استخدام لضغط الملف على غرار"}
                <a href="https://ilovepdf.com/" target="_blank">
                  <i>
                    <b>{document.dir == "ltr" ? "Program 1" : "برنامج ١"}</b>
                  </i>
                </a>
                {document.dir == "ltr" ? " or " : " أو "}
                <a href="https://smallpdf.com/" target="_blank">
                  <i>
                    <b>{document.dir == "ltr" ? "Program 2" : "برنامج 2"}</b>
                  </i>
                </a>
              </li>

              <li>
                {document.dir == "ltr"
                  ? "For any inquiries about usage of e-platform, please contact on +971 42949292 or email at info@iicra.com."
                  : "لأي استفسارات حول استخدام المنصة الإلكترونية، يرجى التواصل على  رقم الهاتف  42949292 971+ أو عبر البريد الإلكتروني"}
                <a href="mailto:info@iicra.com">
                  <i>info@iicra.com</i>
                </a>
              </li>
            </ol>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={handleModalInstructions}>
              {document.dir == "ltr" ? "I agree" : "أنا أوافق"}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    ) : (
      <Container style={styles.formUserContainer} className="shadow-lg">
        <Row>
          <Col style={styles.progress}>
            <ul style={{ padding: 0 }}>
              <Row style={{ textAlign: "center" }}>
                <Col>
                  <li
                    id="claimant"
                    style={{
                      color: "lightgray",
                      display: "inline",
                      fontSize: "15px",
                      lineHeight: "45px",
                      background: "green",
                      borderRadius: "50%",
                      padding: "2vh 17%",
                    }}
                  >
                    <strong>{document.dir == "ltr" ? "1" : "١"}</strong>
                  </li>
                </Col>
                <Col>
                  <li
                    id="respondent"
                    style={{
                      color: "black",
                      display: "inline",
                      fontSize: "15px",
                      lineHeight: "45px",
                      background: "lightgray",
                      borderRadius: "50%",
                      padding: "2vh 17%",
                    }}
                  >
                    <strong>{document.dir == "ltr" ? "2" : "٢"}</strong>
                  </li>
                </Col>
                <Col>
                  <li
                    id="dispute"
                    style={{
                      color: "black",
                      display: "inline",
                      fontSize: "15px",
                      lineHeight: "45px",
                      background: "lightgray",
                      borderRadius: "50%",
                      padding: "2vh 17%",
                    }}
                  >
                    <strong>{document.dir == "ltr" ? "3" : "٣"}</strong>
                  </li>
                </Col>
                <Col>
                  <li
                    id="arbitrator"
                    style={{
                      color: "black",
                      display: "inline",
                      fontSize: "15px",
                      lineHeight: "45px",
                      background: "lightgray",
                      borderRadius: "50%",
                      padding: "2vh 17%",
                    }}
                  >
                    <strong> {document.dir == "ltr" ? "4" : "٤"}</strong>
                  </li>
                </Col>
                <Col>
                  <li
                    id="suggestion"
                    style={{
                      color: "black",
                      display: "inline",
                      fontSize: "15px",
                      lineHeight: "45px",
                      background: "lightgray",
                      borderRadius: "50%",
                      padding: "2vh 17%",
                    }}
                  >
                    <strong> {document.dir == "ltr" ? "5" : "٥"}</strong>
                  </li>
                </Col>
                <Col>
                  <li
                    id="Undertakings"
                    style={{
                      color: "black",
                      display: "inline",
                      fontSize: "15px",
                      lineHeight: "45px",
                      background: "lightgray",
                      borderRadius: "50%",
                      padding: "2vh 17%",
                    }}
                  >
                    <strong> {document.dir == "ltr" ? "6" : "٦"}</strong>
                  </li>
                </Col>
                <Col>
                  <li
                    id="eSignature"
                    style={{
                      color: "black",
                      display: "inline",
                      fontSize: "15px",
                      lineHeight: "45px",
                      background: "lightgray",
                      borderRadius: "50%",
                      padding: "2vh 17%",
                    }}
                  >
                    <strong> {document.dir == "ltr" ? "7" : "٧"}</strong>
                  </li>
                </Col>
              </Row>
            </ul>
            <div style={{ marginTop: "-37px", backgroundColor: "green" }}>
              <hr style={{ border: "1.2px solid green" }} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col style={styles.progress}>
            <Progress
              color="success"
              value="12.5"
              style={{ textAlign: "right", borderRadius: "50px" }}
            />
          </Col>
        </Row>

        <h6 style={styles.center} onClick={this.sendPdfToServer}>
          {document.dir == "ltr" ? "Claimant Details" : "المحتكم"}
        </h6>
        <Card style={styles.cardBg}>
          <CardBody>
            <Form>
              <Row>
                <Col xl={6} lg={6} md={6} sm={12}>
                  <FormGroup>
                    <Label style={labelStyle} for="claimantName">
                      {document.dir == "ltr"
                        ? "Full Name ( official )"
                        : "الإسم حسب الرخصة التجارية"}
                    </Label>
                    {alertClaimantName ? (
                      <span style={styles.warning}>
                        {document.dir == "ltr"
                          ? " name is required "
                          : " الإسم مطلوب "}
                      </span>
                    ) : (
                      <span style={styles.red}> *</span>
                    )}
                    <Input
                      type="text"
                      name="claimantName"
                      id="claimantName"
                      onChange={handleChange("claimantName")}
                      defaultValue={values.claimantName}
                      required
                    />
                  </FormGroup>
                </Col>
                {/* <Col xl={6} lg={6} md={6} sm={12}>
                  <FormGroup>
                    <Label style={labelStyle} for="claimantUserName">
                      {document.dir == "ltr"
                        ? "User Name ( as per trade license )"
                        : "حسب الرخصة التجارية"}
                    </Label>
                    {alertClaimantUserName ? (
                      <span style={styles.warning}>
                        {document.dir == "ltr"
                          ? " user name is required "
                          : " إسم المستخدم مطلوب "}
                      </span>
                    ) : (
                      <span style={styles.red}> *</span>
                    )}
                    <Input
                      type="text"
                      name="claimantUserName"
                      id="claimantUserName"
                      onChange={handleChange("claimantUserName")}
                      defaultValue={values.claimantUserName}
                      required
                    />
                  </FormGroup>
                </Col> */}
                <Col xl={6} lg={6} md={6} sm={12}>
                  <FormGroup>
                    <Label
                      style={labelStyle}
                      for="claimantNationality"
                      onClick={() => alert(values.claimantNationality)}
                    >
                      {document.dir == "ltr" ? "Nationality" : "الجنسية"}
                    </Label>
                    {alertClaimantNationality ? (
                      <span style={styles.warning}>
                        {document.dir == "ltr"
                          ? "nationality is required"
                          : " الجنسية مطلوبة "}
                      </span>
                    ) : (
                      <span style={styles.red}> *</span>
                    )}
                    {/* <Input
                      type="select"
                      name="claimantNationality"
                      id="claimantNationality"
                      onChange={handleChange("claimantNationality")}
                      defaultValue={values.claimantNationality}
                    >
                      {document.dir == "ltr" ? countries() : countries_()}
                    </Input> */}
                    <Input
                      type="text"
                      list="data3"
                      value={values.claimantNationality}
                      onChange={handleChange("claimantNationality")}
                    />
                    {document.dir == "ltr" ? (
                      <datalist id="data3">
                        {countriesArray.map((item, index) => (
                          <option key={index} value={item.value} />
                        ))}
                      </datalist>
                    ) : (
                      <datalist id="data3">
                        {countriesArray_.map((item, index) => (
                          <option key={index} value={item.value} />
                        ))}
                      </datalist>
                    )}
                  </FormGroup>
                </Col>
                {/* </Row>
              <Row> */}
                <Col xl={6} lg={6} md={6} sm={12}>
                  <FormGroup>
                    <Label style={labelStyle} for="claimantAddress">
                      {document.dir == "ltr"
                        ? "Full Address"
                        : "العنوان الكامل"}
                    </Label>
                    {alertClaimantAddress ? (
                      <span style={styles.warning}>
                        {document.dir == "ltr"
                          ? " address is required "
                          : " العنوان مطلوب "}
                      </span>
                    ) : (
                      <span style={styles.red}> *</span>
                    )}
                    <Input
                      type="text"
                      name="claimantAddress"
                      id="claimantAddress"
                      onChange={handleChange("claimantAddress")}
                      defaultValue={values.claimantAddress}
                    />
                  </FormGroup>
                </Col>
                <Col xl={6} lg={6} md={6} sm={12}>
                  <FormGroup>
                    <Label style={labelStyle} for="claimantPOBox">
                      {document.dir == "ltr" ? "P.O.Box" : "الصندوق البريدي"}
                    </Label>

                    <Input
                      type="text"
                      name="claimantPOBox"
                      id="claimantPOBox"
                      onChange={handleChange("claimantPOBox")}
                      defaultValue={values.claimantPOBox}
                    />
                  </FormGroup>
                </Col>
                {/* </Row>
              <Row> */}
                <Col xl={6} lg={6} md={6} sm={12}>
                  <FormGroup>
                    <Label style={labelStyle} for="claimantPhone">
                      {document.dir == "ltr" ? "Phone" : "رقم الهاتف"}
                    </Label>
                    {alertClaimantPhone ? (
                      <span style={styles.warning}>{alertClaimantPhone}</span>
                    ) : (
                      <span style={styles.red}> *</span>
                    )}
                    <Input
                      type="text"
                      name="claimantPhone"
                      id="claimantPhone"
                      onChange={handleChange("claimantPhone")}
                      defaultValue={values.claimantPhone}
                    />
                  </FormGroup>
                </Col>
                <Col xl={6} lg={6} md={6} sm={12}>
                  <FormGroup>
                    <Label style={labelStyle} for="claimantFax">
                      {document.dir == "ltr" ? "Fax" : "فاكس"}
                    </Label>
                    <Input
                      type="text"
                      name="claimantFax"
                      id="claimantFax"
                      onChange={handleChange("claimantFax")}
                      defaultValue={values.claimantFax}
                    />
                  </FormGroup>
                </Col>
                {/* </Row>
              <Row> */}
                <Col xl={6} lg={6} md={6} sm={12}>
                  <FormGroup>
                    <Label style={labelStyle} for="claimantEmail">
                      {document.dir == "ltr" ? "E-mail" : "البريد الإكترونى"}
                    </Label>
                    {alertClaimantEmail ? (
                      <span style={styles.warning}>{alertClaimantEmail}</span>
                    ) : (
                      <span style={styles.red}> *</span>
                    )}
                    <Input
                      type="email"
                      name="claimantEmail"
                      id="claimantEmail"
                      onChange={handleChange("claimantEmail")}
                      defaultValue={values.claimantEmail}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <FormGroup
                style={{
                  textAlign: document.dir == "ltr" ? "left" : "right",
                }}
              >
                <div>
                  <CustomInput
                    type="switch"
                    id="legal"
                    name="legal"
                    label={
                      document.dir == "ltr"
                        ? "Legal Representative"
                        : "الممثل القانوني"
                    }
                    value={legalPerson}
                    onChange={handleLegalPerson}
                  />
                </div>
              </FormGroup>
              {legalPerson ? legalBlock() : null}

              <FormGroup
                style={{
                  textAlign: document.dir == "ltr" ? "left" : "right",
                }}
              >
                <div>
                  <CustomInput
                    type="switch"
                    id="additional"
                    name="additional"
                    label={
                      document.dir == "ltr"
                        ? "Additional Claimant"
                        : "المحتكم الثاني"
                    }
                    value={additionalClaimant}
                    onChange={handleAdditionalPerson}
                  />
                </div>
              </FormGroup>

              {additionalClaimant ? (
                <>
                  <Card style={styles.cardBgSecondary} className="shadow">
                    <h6 style={styles.center}>
                      {document.dir == "ltr"
                        ? "Additional Claimant Details"
                        : "المحتكم الإضافي"}
                    </h6>
                    <CardBody>
                      <Row>
                        <Col xl={6} lg={6} md={6} sm={12}>
                          <FormGroup>
                            <Label style={labelStyle} for="claimantName2">
                              {document.dir == "ltr"
                                ? "Full Name ( official )"
                                : "الإسم حسب الرخصة التجارية"}
                            </Label>
                            {alertClaimantName2 ? (
                              <span style={styles.warning}>
                                name is required
                              </span>
                            ) : (
                              <span style={styles.red}> *</span>
                            )}
                            <Input
                              type="text"
                              name="claimantName2"
                              id="claimantName2"
                              onChange={handleChange("claimantName2")}
                              defaultValue={values.claimantName2}
                              required
                            />
                          </FormGroup>
                        </Col>
                        {/* <Col xl={6} lg={6} md={6} sm={12}>
                          <FormGroup>
                            <Label style={labelStyle} for="claimantName">
                              {document.dir == "ltr"
                                ? "User Name ( as per trade license )"
                                : "حسب الرخصة التجارية"}
                            </Label>
                            {alertClaimantUserName2 ? (
                              <span style={styles.warning}>
                                {document.dir == "ltr"
                                  ? " user name is required "
                                  : " إسم المستخدم مطلوب "}
                              </span>
                            ) : (
                              <span style={styles.red}> *</span>
                            )}
                            <Input
                              type="text"
                              name="claimantUserName2"
                              id="claimantUserName2"
                              onChange={handleChange("claimantUserName2")}
                              defaultValue={values.claimantUserName2}
                              required
                            />
                          </FormGroup>
                        </Col> */}
                        <Col xl={6} lg={6} md={6} sm={12}>
                          <FormGroup>
                            <Label style={labelStyle} for="claimantNationality">
                              {document.dir == "ltr"
                                ? "Nationality"
                                : "جنسية المحتكم"}
                            </Label>
                            {alertClaimantNationality2 ? (
                              <span style={styles.warning}>
                                nationality is required
                              </span>
                            ) : (
                              <span style={styles.red}> *</span>
                            )}{" "}
                            {/* <Input
                              type="select"
                              name="claimantNationality2"
                              id="claimantNationality2"
                              onChange={handleChange("claimantNationality2")}
                              defaultValue={values.claimantNationality2}
                            >
                              {document.dir == "ltr"
                                ? countries()
                                : countries_()}
                            </Input> */}
                            <Input
                              type="text"
                              list="data4"
                              value={values.claimantNationality2}
                              onChange={handleChange("claimantNationality2")}
                            />
                            {document.dir == "ltr" ? (
                              <datalist id="data4">
                                {countriesArray.map((item, index) => (
                                  <option key={index} value={item.value} />
                                ))}
                              </datalist>
                            ) : (
                              <datalist id="data4">
                                {countriesArray_.map((item, index) => (
                                  <option key={index} value={item.value} />
                                ))}
                              </datalist>
                            )}
                          </FormGroup>
                        </Col>
                        {/* </Row>
                      <Row> */}
                        <Col xl={6} lg={6} md={6} sm={12}>
                          <FormGroup>
                            <Label style={labelStyle} for="claimantAddress2">
                              {document.dir == "ltr"
                                ? "Full Address"
                                : "العنوان الكامل"}
                            </Label>
                            {alertClaimantAddress2 ? (
                              <span style={styles.warning}>
                                {" "}
                                address is required
                              </span>
                            ) : (
                              <span style={styles.red}> *</span>
                            )}{" "}
                            <Input
                              type="text"
                              name="claimantAddress2"
                              id="claimantAddress2"
                              onChange={handleChange("claimantAddress2")}
                              defaultValue={values.claimantAddress2}
                            />
                          </FormGroup>
                        </Col>
                        <Col xl={6} lg={6} md={6} sm={12}>
                          <FormGroup>
                            <Label style={labelStyle} for="claimantPOBox2">
                              {document.dir == "ltr"
                                ? "P.O.Box"
                                : "الصندوق البريدي"}
                            </Label>
                            <Input
                              type="text"
                              name="claimantPOBox2"
                              id="claimantPOBox2"
                              onChange={handleChange("claimantPOBox2")}
                              defaultValue={values.claimantPOBox2}
                            />
                          </FormGroup>
                        </Col>
                        {/* </Row>
                      <Row> */}
                        <Col xl={6} lg={6} md={6} sm={12}>
                          <FormGroup>
                            <Label style={labelStyle} for="claimantPhone2">
                              {document.dir == "ltr" ? "Phone" : "رقم الهاتف"}
                            </Label>
                            {alertClaimantPhone2 ? (
                              <span style={styles.warning}>
                                {alertClaimantPhone}
                              </span>
                            ) : (
                              <span style={styles.red}> *</span>
                            )}{" "}
                            <Input
                              type="text"
                              name="claimantPhone2"
                              id="claimantPhone2"
                              onChange={handleChange("claimantPhone2")}
                              defaultValue={values.claimantPhone2}
                            />
                          </FormGroup>
                        </Col>
                        <Col xl={6} lg={6} md={6} sm={12}>
                          <FormGroup>
                            <Label style={labelStyle} for="claimantFax2">
                              {document.dir == "ltr" ? "Fax" : "فاكس"}
                            </Label>
                            <Input
                              type="text"
                              name="claimantFax2"
                              id="claimantFax2"
                              onChange={handleChange("claimantFax2")}
                              defaultValue={values.claimantFax2}
                            />
                          </FormGroup>
                        </Col>
                        {/* </Row>
                      <Row> */}
                        <Col xl={6} lg={6} md={6} sm={12}>
                          <FormGroup>
                            <Label style={labelStyle} for="claimantEmail2">
                              {document.dir == "ltr"
                                ? "E-mail"
                                : "البريد الإكترونى"}
                            </Label>
                            {alertClaimantEmail2 ? (
                              <span style={styles.warning}>
                                {alertClaimantEmail}
                              </span>
                            ) : (
                              <span style={styles.red}> *</span>
                            )}{" "}
                            <Input
                              type="email"
                              name="claimantEmail2"
                              id="claimantEmail2"
                              onChange={handleChange("claimantEmail2")}
                              defaultValue={values.claimantEmail2}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <FormGroup
                        style={{
                          textAlign: document.dir == "ltr" ? "left" : "right",
                        }}
                      >
                        <div>
                          <CustomInput
                            type="switch"
                            id="legal2"
                            name="legal2"
                            label={
                              document.dir == "ltr"
                                ? "Legal Representative"
                                : "الممثل القانوني"
                            }
                            value={legalPerson2}
                            onChange={handleLegalPerson2}
                          />
                        </div>
                      </FormGroup>
                    </CardBody>
                  </Card>
                  {legalPerson2 ? legalBlock2() : null}
                </>
              ) : null}

              <Button style={styles.button} onClick={this.continue}>
                {document.dir == "ltr" ? "Continue" : "استمر"}
              </Button>
            </Form>
          </CardBody>
        </Card>
      </Container>
    );
  }
}

const styles = {
  center: {
    color: "white",
    textAlign: "center",
    backgroundColor: "#008f53",
    paddingTop: "1vh",
    paddingBottom: "1vh",
    borderRadius: "10px",
    cursor: "not-allowed",
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
    borderRadius: "10px",
  },
  modal: {
    marginTop: "10vh",
    paddingTop: "5vh",
    paddingBottom: "3vh",
    backgroundColor: "#f6f6f6",
    minHeight: "100vh",
  },
  cardBg: {
    backgroundColor: "#f6f6f6",
    border: "none",
  },
  cardBgSecondary: {
    backgroundColor: "#f6f6f6",
    marginTop: "3vh",
  },
  progress: {
    marginBottom: "4vh",
  },
  warning: {
    color: "red",
    textAlign: "left",
  },
  red: {
    color: "red",
    fontWeight: "bolder",
  },
};

export default FormUserDetails;
