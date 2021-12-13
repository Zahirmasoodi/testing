import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Progress,
} from "reactstrap";
import axios from "axios";
import { jsPDF } from "jspdf";
import SignatureCanvas from "react-signature-canvas";
import validator from "validator";
import tick from "../../assets/tick.png";
import { getEnvironment } from "../../config";

export class ESignature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proceduralLaw: false,
      doc: new jsPDF(),
      trimmedDataURL: "",
      alertESignatureName: false,
      alertESignature: false,
      //
      sellerId: "250393908830",
      publishableKey: "663D7BE5-F91B-4D6E-A4F2-779ED2E6A70C",
      ccNo: "",
      expMonth: "",
      expYear: "",
      cvv: "",
      //
    };
  }

  baseURL = getEnvironment().apiUrl;

  change = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = () => {
    console.log(this.state);
    var payWithCard = (data) => {
      console.log("RESPONSE", data.response.token.token);
    };

    var error = (error) => {
      console.log("ERROR", error);
    };

    window.TCO.loadPubKey("production", () => {
      window.TCO.requestToken(payWithCard, error, "tcoCCForm");
    });
  };

  card = () => {
    return (
      <Form id="tcoCCForm">
        <Input id="sellerId" type="hidden" value={this.state.sellerId} />
        <Input
          id="publishableKey"
          type="hidden"
          value={this.state.publishableKey}
        />
        <Row style={styles.card} className="mb-4">
          <Col sm={12} md={6} lg={4} xl={2}>
            <Label>
              <span>Card Number</span>
            </Label>
          </Col>

          <Col sm={12} md={6} lg={5} xl={4}>
            <Input
              id="ccNo"
              name="ccNo"
              type="text"
              size="20"
              value={this.state.ccNo}
              onChange={(e) => this.change(e)}
              autocomplete="off"
              required
            />
          </Col>
        </Row>
        <Row style={styles.card}>
          <Col sm={12} md={6} lg={4} xl={2}>
            <Label>
              <span>Expiration Date (MM/YYYY)</span>
            </Label>
          </Col>
          <Col sm={6} md={3} lg={2} xl={2}>
            <Input
              type="text"
              size="2"
              id="expMonth"
              name="expMonth"
              value={this.state.expMonth}
              onChange={(e) => this.change(e)}
              required
            />
          </Col>
          <Col sm={6} md={3} lg={2} xl={2}>
            <Input
              type="text"
              size="2"
              id="expYear"
              name="expYear"
              value={this.state.expYear}
              onChange={(e) => this.change(e)}
              required
            />
          </Col>
        </Row>
        <Row style={styles.card}>
          <Col sm={6} md={6} lg={4} xl={2}>
            <Label>
              <span>CVV</span>
            </Label>
          </Col>

          <Col sm={6} md={4} lg={3} xl={2}>
            <Input
              id="cvv"
              name="cvv"
              size="4"
              type="text"
              value={this.state.cvv}
              onChange={(e) => this.change(e)}
              autocomplete="off"
              required
            />
          </Col>
        </Row>
        <Button type="button" onClick={() => this.onSubmit()}>
          Submit
        </Button>
      </Form>
    );
  };

  // sendPdfToServer = () => {
  //   this.state.doc.rect(10, 10, 185, 100);
  //   this.state.doc.setFontSize(15);
  //   this.state.doc.text(
  //     "IN THE MATTER OF AN ARBITRATION UNDER THE RULES OF THE",
  //     20,
  //     20
  //   );
  //   this.state.doc.text(
  //     "INTERNATIONAL ISLAMIC CENTRE FOR RECONCILIATION AND ",
  //     23,
  //     25
  //   );
  //   this.state.doc.text("ARBITRATION", 90, 30);
  //   this.state.doc.setFontSize(12);
  //   this.state.doc.text("REQUEST FOR ARBITRATION (RFA)", 70, 40);
  //   this.state.doc.line(70, 41, 143, 41);
  //   this.state.doc.setFontSize(11);

  //   this.state.doc.text("BETWEEN", 20, 65);
  //   this.state.doc.setFontSize(9);
  //   this.state.doc.text(
  //     "If you are an individual and representing yourself, you are hereby requested to put in details below",
  //     20,
  //     70
  //   );

  //   this.state.doc.setFontSize(10);
  //   this.state.doc.text("Name of the Claimant: ", 30, 80);
  //   this.state.doc.text(this.props.values.claimantName, 100, 80);
  //   this.state.doc.text("Nationality", 30, 85);
  //   this.state.doc.text(this.props.values.claimantNationality, 100, 85);
  //   this.state.doc.text("Address", 30, 90);
  //   this.state.doc.text(this.props.values.claimantAddress, 100, 90);
  //   this.state.doc.text("P.O. Box", 30, 95);
  //   this.state.doc.text(this.props.values.claimantPOBox, 100, 95);
  //   this.state.doc.text("Phone", 30, 100);
  //   this.state.doc.text(this.props.values.claimantPhone, 100, 100);
  //   this.state.doc.text("Fax", 30, 105);
  //   this.state.doc.text(this.props.values.claimantFax, 100, 105);
  //   this.state.doc.text("Email", 30, 110);
  //   this.state.doc.text(this.props.values.claimantEmail, 100, 110);
  //   this.state.doc.text("Herein referred as 'Claimant(s)'", 30, 118);
  //   //Legal Representative
  //   this.state.doc.rect(10, 125, 185, 65);
  //   this.state.doc.setFontSize(11);
  //   this.state.doc.text("(Optional)", 20, 130);
  //   this.state.doc.setFontSize(10);
  //   this.state.doc.text("Name of the Representative: ", 30, 135);
  //   // // this.state.doc.text(this.props.values.legalAuthRepresentativeName, 100, 135);
  //   this.state.doc.text("Name of the Representative Firm : ", 30, 140);
  //   // // this.state.doc.text(this.props.values.legalAuthFirmName, 100, 140);
  //   this.state.doc.text("Nationality", 30, 145);
  //   // // this.state.doc.text(this.props.values.legalAuthNationality, 100, 145);
  //   this.state.doc.text("Address", 30, 150);
  //   // // this.state.doc.text(this.props.values.legalAuthAddress, 100, 150);
  //   this.state.doc.text("P.O. Box", 30, 155);
  //   // // this.state.doc.text(this.props.values.legalAuthPOBox, 100, 155);
  //   this.state.doc.text("Phone", 30, 160);
  //   // // this.state.doc.text(this.props.values.legalAuthPhone, 100, 160);
  //   this.state.doc.text("Fax", 30, 165);
  //   // // this.state.doc.text(this.props.values.legalAuthFax, 100, 165);
  //   this.state.doc.text("Email", 30, 170);
  //   // // this.state.doc.text(this.props.values.legalAuthEmail, 100, 170);
  //   this.state.doc.text("Commercial Registration Number", 30, 175);
  //   // // this.state.doc.text(this.props.values.legalAuthRegistratiom, 100, 175);
  //   this.state.doc.text(
  //     "Herein referred as the 'Legal Representative of the Claimant'",
  //     30,
  //     183
  //   );
  //   //Respondent
  //   this.state.doc.text("Name of the Respondent: ", 30, 205);
  //   this.state.doc.text(this.props.values.respondentName, 100, 205);
  //   this.state.doc.text("Nationality", 30, 210);
  //   this.state.doc.text(this.props.values.respondentNationality, 100, 210);
  //   this.state.doc.text("Address", 30, 215);
  //   this.state.doc.text(this.props.values.respondentAddress, 100, 215);
  //   this.state.doc.text("P.O. Box", 30, 220);
  //   this.state.doc.text(this.props.values.respondentPOBox, 100, 220);
  //   this.state.doc.text("Phone", 30, 225);
  //   this.state.doc.text(this.props.values.respondentPhone, 100, 225);
  //   this.state.doc.text("Fax", 30, 230);
  //   this.state.doc.text(this.props.values.respondentFax, 100, 230);
  //   this.state.doc.text("Email", 30, 235);
  //   this.state.doc.text(this.props.values.respondentEmail, 100, 235);
  //   this.state.doc.text("Herein referred as 'Respondent(s)'", 30, 243);
  //   //Dispute
  //   this.state.doc.addPage();
  //   this.state.doc.setFontSize(12);
  //   this.state.doc.text("Dispute Details", 20, 20);
  //   this.state.doc.setFontSize(11);
  //   this.state.doc.text("I. Nature of Dispute", 30, 30);
  //   this.state.doc.setFontSize(10);
  //   this.state.doc.text(this.props.values.natureOfDispute, 35, 35);
  //   this.state.doc.text("Value of Dispute", 30, 40);
  //   this.state.doc.text(this.props.values.valueOfDispute, 35, 45);
  //   this.state.doc.text("Number of Arbitrators", 30, 50);
  //   this.state.doc.text(this.props.values.numberOfArbitrators, 35, 55);
  //   this.state.doc.setFontSize(11);
  //   this.state.doc.text("II. Recitals", 30, 60);
  //   this.state.doc.setFontSize(10);
  //   this.state.doc.text(this.props.values.recitals, 35, 65);
  //   this.state.doc.setFontSize(11);
  //   this.state.doc.text("III. Legal Grounds", 30, 75);
  //   this.state.doc.setFontSize(10);
  //   this.state.doc.text(this.props.values.legalGrounds, 35, 80);
  //   this.state.doc.setFontSize(11);
  //   this.state.doc.text("IV. Relief Sought", 30, 90);
  //   this.state.doc.setFontSize(10);
  //   this.state.doc.text(this.props.values.reliefSought, 35, 95);
  //   this.state.doc.setFontSize(11);
  //   this.state.doc.text(
  //     "V. Nomination of Sole Arbitrator or Co-Arbitrator(s)",
  //     30,
  //     105
  //   );
  //   this.state.doc.setFontSize(10);
  //   this.state.doc.text("Name of the Arbitrator: ", 35, 115);
  //   this.state.doc.text(this.props.values.arbitratorName, 100, 115);
  //   this.state.doc.text("Nationality", 35, 120);
  //   this.state.doc.text(this.props.values.arbitratorNationality, 100, 120);
  //   this.state.doc.text("Address", 35, 125);
  //   this.state.doc.text(this.props.values.arbitratorAddress, 100, 125);
  //   this.state.doc.text("P.O. Box", 35, 130);
  //   this.state.doc.text(this.props.values.arbitratorPOBox, 100, 130);
  //   this.state.doc.text("Phone", 35, 135);
  //   this.state.doc.text(this.props.values.arbitratorPhone, 100, 135);
  //   this.state.doc.text("Fax", 35, 140);
  //   this.state.doc.text(this.props.values.arbitratorFax, 100, 140);
  //   this.state.doc.text("Email", 35, 145);
  //   this.state.doc.text(this.props.values.arbitratorEmail, 100, 145);
  //   this.state.doc.setFontSize(11);
  //   this.state.doc.text("VI. Other Suggestions", 30, 155);
  //   this.state.doc.setFontSize(10);
  //   this.state.doc.text("Language of Arbitration", 30, 160);
  //   this.state.doc.text(this.props.values.arbitrationLanguage, 100, 160);
  //   this.state.doc.text("Governing Law", 30, 170);
  //   this.state.doc.text(this.props.values.governingLaw, 100, 170);
  //   this.state.doc.text("Procedural Law along with IICRA rules", 30, 180);
  //   // this.state.doc.text(this.props.values.proceduralLaw, 100, 180);
  //   this.state.doc.text("Number of Arbitrators", 30, 190);
  //   this.state.doc.text(this.props.values.numberOfArbitrators, 100, 190);
  //   this.state.doc.setFontSize(11);
  //   this.state.doc.text("VII. Other Request If Any", 30, 200);
  //   this.state.doc.setFontSize(10);
  //   this.state.doc.text(this.props.values.otherRequests, 35, 205);

  //   this.state.doc.addImage(this.state.trimmedDataURL, "jpeg", 20, 210, 50, 50);
  //   this.state.doc.save("IICRA-RFA");

  //   // const pdf = this.state.doc.output("blob");
  //   // let data = new FormData();
  //   // data.append("autoPdf", pdf);
  //   // // data.append("email", this.props.values.claimantEmail);
  //   // data.append("email", "zahir.linkinpark@gmail.com");

  //   // axios
  //   //   .post("http://localhost:5000/form/pdfGeneration", data)
  //   //   .then(() => console.log("OK"))
  //   //   .catch((err) => console.log(err));
  // };

  sendPdfToServer = () => {
    this.state.doc.rect(10, 10, 190, 275);
    this.state.doc.setFontSize(15);
    this.state.doc.text(
      "IN THE MATTER OF AN ARBITRATION UNDER THE RULES OF THE",
      20,
      20
    );
    this.state.doc.text(
      "INTERNATIONAL ISLAMIC CENTRE FOR RECONCILIATION AND ",
      23,
      25
    );
    this.state.doc.text("ARBITRATION", 90, 30);
    this.state.doc.setFontSize(12);
    this.state.doc.text("REQUEST FOR ARBITRATION (RFA)", 70, 40);
    this.state.doc.line(70, 41, 143, 41);

    //claimant
    this.state.doc.setFontSize(12);
    this.state.doc.text("I. Claimant", 20, 65);
    this.state.doc.setFontSize(10);
    this.state.doc.text("Name of the Claimant: ", 28, 70);
    this.state.doc.text(this.props.values.claimantName, 100, 70);
    this.state.doc.text("Nationality", 28, 75);
    this.state.doc.text(this.props.values.claimantNationality, 100, 75);
    this.state.doc.text("Address", 28, 80);
    this.state.doc.text(this.props.values.claimantAddress, 100, 80);
    this.state.doc.text("P.O. Box", 28, 85);
    this.state.doc.text(this.props.values.claimantPOBox, 100, 85);
    this.state.doc.text("Phone", 28, 90);
    this.state.doc.text(this.props.values.claimantPhone, 100, 90);
    this.state.doc.text("Fax", 28, 95);
    this.state.doc.text(this.props.values.claimantFax, 100, 95);
    this.state.doc.text("Email", 28, 100);
    this.state.doc.text(this.props.values.claimantEmail, 100, 100);
    this.state.doc.text("Herein referred as 'Claimant(s)'", 28, 105);

    if (false) {
      //Legal Representative

      this.state.doc.setFontSize(10);
      this.state.doc.text("Name of the Representative: ", 28, 115);
      // // this.state.doc.text(this.props.values.legalAuthRepresentativeName, 100, 115);
      this.state.doc.text("Name of the Representative Firm : ", 28, 120);
      // // this.state.doc.text(this.props.values.legalAuthFirmName, 100, 120);
      this.state.doc.text("Nationality", 28, 125);
      // // this.state.doc.text(this.props.values.legalAuthNationality, 100, 125);
      this.state.doc.text("Address", 28, 130);
      // // this.state.doc.text(this.props.values.legalAuthAddress, 100, 130);
      this.state.doc.text("P.O. Box", 28, 135);
      // // this.state.doc.text(this.props.values.legalAuthPOBox, 100, 135);
      this.state.doc.text("Phone", 28, 140);
      // // this.state.doc.text(this.props.values.legalAuthPhone, 100, 140);
      this.state.doc.text("Fax", 28, 145);
      // // this.state.doc.text(this.props.values.legalAuthFax, 100, 145);
      this.state.doc.text("Email", 28, 150);
      // // this.state.doc.text(this.props.values.legalAuthEmail, 100, 150);
      this.state.doc.text("Commercial Registration Number", 28, 155);
      // // this.state.doc.text(this.props.values.legalAuthRegistratiom, 100, 155);
    }

    //Respondent
    this.state.doc.setFontSize(12);
    this.state.doc.text("II. Respondent", 20, 120);
    this.state.doc.setFontSize(10);
    this.state.doc.text("Name of the Respondent: ", 28, 125);
    this.state.doc.text(this.props.values.respondentName, 100, 125);
    this.state.doc.text("Nationality", 28, 130);
    this.state.doc.text(this.props.values.respondentNationality, 100, 130);
    this.state.doc.text("Address", 28, 135);
    this.state.doc.text(this.props.values.respondentAddress, 100, 135);
    this.state.doc.text("P.O. Box", 28, 140);
    this.state.doc.text(this.props.values.respondentPOBox, 100, 140);
    this.state.doc.text("Phone", 28, 145);
    this.state.doc.text(this.props.values.respondentPhone, 100, 145);
    this.state.doc.text("Fax", 28, 150);
    this.state.doc.text(this.props.values.respondentFax, 100, 150);
    this.state.doc.text("Email", 28, 155);
    this.state.doc.text(this.props.values.respondentEmail, 100, 155);

    //Dispute
    this.state.doc.setFontSize(12);
    this.state.doc.text("III. Dispute Details", 20, 170);
    this.state.doc.setFontSize(10);
    this.state.doc.text("i. Nature of Dispute", 28, 175);
    this.state.doc.rect(28, 180, 153, 35);
    this.state.doc.text(this.props.values.natureOfDispute, 32, 185);
    this.state.doc.text("ii. Value of Dispute", 28, 225);
    this.state.doc.rect(28, 230, 153, 35);
    this.state.doc.text(this.props.values.valueOfDispute, 32, 235);

    //Dispute Next Page
    this.state.doc.addPage();
    this.state.doc.rect(10, 10, 190, 275);
    this.state.doc.text("iii. Recitals", 28, 20);
    this.state.doc.rect(28, 25, 153, 35);
    this.state.doc.text(this.props.values.recitals, 32, 30);
    this.state.doc.text("iv. Legal Grounds", 28, 70);
    this.state.doc.rect(28, 75, 153, 35);
    this.state.doc.text(this.props.values.legalGrounds, 32, 80);
    this.state.doc.text("v. Relief Sought", 28, 120);
    this.state.doc.rect(28, 125, 153, 35);
    this.state.doc.text(this.props.values.reliefSought, 32, 130);
    this.state.doc.setFontSize(12);
    this.state.doc.text(
      "IV. Nomination of Sole Arbitrator or Co-Arbitrator(s)",
      20,
      175
    );
    this.state.doc.setFontSize(10);
    this.state.doc.text("Name of the Arbitrator: ", 28, 180);
    this.state.doc.text(this.props.values.arbitratorName, 100, 180);
    this.state.doc.text("Nationality", 28, 185);
    this.state.doc.text(this.props.values.arbitratorNationality, 100, 185);
    this.state.doc.text("Address", 28, 190);
    this.state.doc.text(this.props.values.arbitratorAddress, 100, 190);
    this.state.doc.text("P.O. Box", 28, 195);
    this.state.doc.text(this.props.values.arbitratorPOBox, 100, 195);
    this.state.doc.text("Phone", 28, 200);
    this.state.doc.text(this.props.values.arbitratorPhone, 100, 200);
    this.state.doc.text("Fax", 28, 205);
    this.state.doc.text(this.props.values.arbitratorFax, 100, 205);
    this.state.doc.text("Email", 28, 210);
    this.state.doc.text(this.props.values.arbitratorEmail, 100, 210);

    this.state.doc.text(
      "Failure to make such nomination of the Arbitrator by either Party in the Request for Arbitration (RFA)",
      28,
      230
    );
    this.state.doc.text(
      "and the reply memorandum within the specified time limits for its submission, or if IICRA issues a reasoned",
      28,
      235
    );
    this.state.doc.text(
      "decision declining the appointment of the Arbitrator proposed by any party, IICRA may request the",
      28,
      240
    );
    this.state.doc.text(
      "concerned party to nominate an alternate arbitrator within five (5) working days from the date of receipt",
      28,
      245
    );
    this.state.doc.text("of IICRA request in this regard.", 28, 250);
    this.state.doc.setFontSize(12);

    this.state.doc.addPage();
    this.state.doc.rect(10, 10, 190, 275);
    this.state.doc.setFontSize(12);
    this.state.doc.text("VI. Other Suggestions", 20, 20);
    this.state.doc.setFontSize(10);
    this.state.doc.text("i. Language of Arbitration", 28, 25);
    this.state.doc.text(this.props.values.arbitrationLanguage, 32, 30);
    this.state.doc.text("ii. Place of Arbitration", 28, 35);
    this.state.doc.text("DUBAI", 32, 40);
    this.state.doc.text(
      "iii. Governing Law (excluding the clauses which contradict the Provisions of Islamic Shari'ah)",
      28,
      45
    );
    this.state.doc.text(this.props.values.governingLaw, 32, 50);
    this.state.doc.text(
      "iv. Number of Arbitrators as per the arbitration agreement or arbitration clause",
      28,
      55
    );
    this.state.doc.text(this.props.values.numberOfArbitrators, 32, 60);
    this.state.doc.text("v. Other Request If Any", 28, 65);
    this.state.doc.text(this.props.values.otherRequests, 32, 70);
    this.state.doc.text(
      "Hence, based on what has been mentioned above, the Claimant hereby requests IICRA to conduct the",
      28,
      80
    );
    this.state.doc.text(
      "Arbitration proceedings to settle the dispute under IICRA Arbitration Rules.",
      28,
      85
    );
    this.state.doc.setFontSize(12);
    this.state.doc.text("VI. Other Suggestions", 20, 100);
    this.state.doc.setFontSize(10);
    this.state.doc.text(
      "I/We hereby declare that all the information provided herein, and the attachments thereto are true",
      28,
      105
    );
    this.state.doc.text(
      "and accurate and to the best of my knowledge and belief. If there is any change in the information",
      28,
      110
    );
    this.state.doc.text(
      "provided, I agree to promptly notify IICRA of the same.",
      28,
      115
    );
    this.state.doc.text(
      "I/We Pursuant to this RFA, pledge to settle the dispute under IICRA in accordance with its Rules",
      28,
      125
    );
    this.state.doc.text("without any objection or procrastination.", 28, 130);

    this.state.doc.text(
      "I/We shall pay the registration fees and the Arbitration expenses determined by IICRA once the ",
      28,
      140
    );
    this.state.doc.text("Request for Arbitration (RFA) is accepted.", 28, 145);
    this.state.doc.text(
      "For the purposes of communication and reporting in this Arbitration Case, I/We acknowledge the",
      28,
      155
    );

    this.state.doc.text(
      "usage of IICRA e-mail and its Arbitration platform along with any other means of communication",
      28,
      160
    );
    this.state.doc.text("adopted by IICRA.", 28, 165);
    this.state.doc.text(
      "I/We hereby authorize IICRA to use the above- mentioned details for communication purposes.",
      28,
      175
    );
    this.state.doc.text(
      "I/We hereby confirm that I have uploaded all the relevant documents related to the dispute such as",
      28,
      185
    );
    this.state.doc.text(
      "the contract of dispute and arbitration agreement or arbitration clause. ",
      28,
      190
    );
    this.state.doc.text(
      "The parties will receive an official letter initiating this proceeding once all filing requirements have been satisfied.",
      20,
      205
    );

    this.state.doc.setFontSize(12);
    this.state.doc.text("VII. E-Signature & Payment", 20, 220);
    this.state.doc.setFontSize(10);
    this.state.doc.text("Name of the Applicant", 28, 230);
    this.state.doc.text(this.props.values.eSignatureName, 32, 235);
    this.state.doc.text("E-Signature", 28, 245);
    this.state.doc.addImage(this.state.trimmedDataURL, "jpeg", 28, 247, 50, 24);
    this.state.doc.setFontSize(14);
    this.state.doc.text("Successfully Submitted", 80, 265);
    this.state.doc.setFontSize(10);
    this.state.doc.text(
      "Your request has been submitted successfully and IICRA shall notify the status of your request within three (3)",
      20,
      275
    );
    this.state.doc.text("working days.", 95, 280);
    this.state.doc.save();
    // const pdf = state.doc.output("blob");
    // let data = new FormData();
    // data.append("autoPdf", pdf);
    // // data.append("email", state.claimantEmail);
    // data.append("email", "zahir.linkinpark@gmail.com");

    // axios
    //   .post("http://localhost:5000/form/pdfGeneration", data)
    //   .then(() => console.log("OK"))
    //   .catch((err) => console.log(err));
  };

  generatePdf = async () => {
    this.state.doc.save();
  };

  continue = (e) => {
    e.preventDefault();

    this.sendPdfToServer();

    const {
      claimantName,

      claimantNationality,
      claimantAddress,
      claimantPOBox,
      claimantPhone,
      claimantFax,
      claimantEmail,
      //
      claimantName2,
      claimantNationality2,
      claimantAddress2,
      claimantPOBox2,
      claimantPhone2,
      claimantFax2,
      claimantEmail2,
      //
      legalAuthRepresentativeName,
      legalAuthFirmName,
      legalAuthNationality,
      legalAuthAddress,
      legalAuthPOBox,
      legalAuthPhone,
      legalAuthFax,
      legalAuthEmail,
      legalAuthRegistration,
      //
      legalAuthRepresentativeName2,
      legalAuthFirmName2,
      legalAuthNationality2,
      legalAuthAddress2,
      legalAuthPOBox2,
      legalAuthPhone2,
      legalAuthFax2,
      legalAuthEmail2,
      legalAuthRegistration2,
      //
      respondentName,
      respondentNationality,
      respondentAddress,
      respondentPOBox,
      respondentPhone,
      respondentFax,
      respondentEmail,
      //
      respondentName2,
      additionalRespondent2,
      respondentNationality2,
      respondentAddress2,
      respondentPOBox2,
      respondentPhone2,
      respondentFax2,
      respondentEmail2,
      //
      conciliationClauses,
      natureOfDispute,
      otherDocuments,
      valueOfDispute,
      //

      arbitratorName,
      arbitratorNationality,
      arbitratorAddress,
      arbitratorPOBox,
      arbitratorPhone,
      arbitratorFax,
      arbitratorEmail,
      //
      arbitrationLanguage,

      numberOfArbitrators,
      otherRequests,
      eSignatureName,
      ///////
      powerOfAttorney,
      powerOfAttorney2,
      disputeDocuments,
      arbitrationAgreement,
      cvOfArbitrator,
      eSignature,
    } = this.props.values;

    if (validator.isEmpty(eSignatureName) || eSignatureName == " ") {
      this.setState({
        alertESignatureName: true,
      });
    } else if (
      eSignature == null &&
      validator.isEmpty(this.state.trimmedDataURL)
    ) {
      this.setState({
        alertESignature: true,
      });
    } else {
      const pdf = this.state.doc.output("blob");

      let formData = new FormData();

      // formData.append("id", this.props.id);
      formData.append("claimantName", claimantName);
      formData.append("claimantAddress", claimantAddress);
      formData.append("claimantEmail", claimantEmail);
      formData.append("claimantPOBox", claimantPOBox);
      formData.append("claimantNationality", claimantNationality);
      formData.append("claimantFax", claimantFax);
      formData.append("claimantPhone", claimantPhone);

      //
      formData.append("respondentName", respondentName);
      formData.append("respondentAddress", respondentAddress);
      formData.append("respondentEmail", respondentEmail);
      formData.append("respondentPOBox", respondentPOBox);
      formData.append("respondentNationality", respondentNationality);
      formData.append("respondentFax", respondentFax);
      formData.append("respondentPhone", respondentPhone);

      //
      formData.append("arbitratorName", arbitratorName);
      formData.append("arbitratorAddress", arbitratorAddress);
      formData.append("arbitratorEmail", arbitratorEmail);
      formData.append("arbitratorPOBox", arbitratorPOBox);
      formData.append("arbitratorNationality", arbitratorNationality);
      formData.append("arbitratorFax", arbitratorFax);
      formData.append("arbitratorPhone", arbitratorPhone);
      //

      formData.append("arbitrationLanguage", arbitrationLanguage);
      formData.append("numberOfArbitrators", numberOfArbitrators);
      formData.append("otherRequests", otherRequests);
      formData.append("eSignatureName", eSignatureName);

      //

      formData.append("natureOfDispute", natureOfDispute);
      formData.append("conciliationClauses", conciliationClauses);
      formData.append("otherDocuments", otherDocuments);
      formData.append("valueOfDispute", valueOfDispute);

      formData.append("powerOfAttorney", powerOfAttorney);
      formData.append("disputeDocuments", disputeDocuments);
      formData.append("arbitrationAgreement", arbitrationAgreement);
      formData.append("cvOfArbitrator", cvOfArbitrator);
      formData.append("eSignature", eSignature);
      formData.append("autoPdf", pdf);

      axios
        .post(`${this.baseURL}/formReconciliation/api`, formData)
        .then((res) => {
          this.props.nextStep();
        })
        .then(() => axios.post(`${this.baseURL}/email/accepted_`, formData))
        .catch((err) => console.log(err));
    }

    //API call
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  sigPad = {};

  clearSig = () => {
    this.sigPad.clear();
    console.log("on click:", this.state.trimmedDataURL);
  };

  trim = () => {
    this.setState({
      trimmedDataURL: this.sigPad.toDataURL(),
    });
    // let data = this.sigPad.toDataURL();
    // this.sigPad.clear();
    // setTimeout(function () {
    //   window.open(data);
    //   this.sigPad.fromDataURL(data);
    // }, 1000);
  };

  render() {
    const { values, handleChange, handleFileChange } = this.props;

    return (
      <Container style={styles.formUserContainer} className="shadow">
        <Row>
          <Col style={styles.progress}>
            <ul style={{ padding: 0 }}>
              <Row style={{ textAlign: "center" }}>
                <Col>
                  <li
                    id="claimant"
                    style={{
                      display: "inline",
                      fontSize: "15px",
                      background: "green",
                      borderRadius: "50%",
                      padding: "2vh 9%",
                      lineHeight: "45px",
                    }}
                  >
                    <img
                      src={tick}
                      style={{ height: "3.8vh", width: "3.8vh" }}
                      alt="step finished"
                    />
                  </li>
                </Col>
                <Col>
                  <li
                    id="respondent"
                    style={{
                      display: "inline",
                      fontSize: "15px",
                      background: "green",
                      borderRadius: "50%",
                      padding: "2vh 9%",
                      lineHeight: "45px",
                    }}
                  >
                    <img
                      src={tick}
                      style={{ height: "3.8vh", width: "3.8vh" }}
                      alt="step finished"
                    />
                  </li>
                </Col>
                <Col>
                  <li
                    id="dispute"
                    style={{
                      display: "inline",
                      fontSize: "15px",
                      background: "green",
                      borderRadius: "50%",
                      padding: "2vh 9%",
                      lineHeight: "45px",
                    }}
                  >
                    <img
                      src={tick}
                      style={{ height: "3.8vh", width: "3.8vh" }}
                      alt="step finished"
                    />
                  </li>
                </Col>
                <Col>
                  <li
                    id="arbitrator"
                    style={{
                      display: "inline",
                      fontSize: "15px",
                      background: "green",
                      borderRadius: "50%",
                      padding: "2vh 9%",
                      lineHeight: "45px",
                    }}
                  >
                    <img
                      src={tick}
                      style={{ height: "3.8vh", width: "3.8vh" }}
                      alt="step finished"
                    />
                  </li>
                </Col>
                <Col>
                  <li
                    id="Undertakings"
                    style={{
                      display: "inline",
                      fontSize: "15px",
                      background: "green",
                      borderRadius: "50%",
                      padding: "2vh 9%",
                      lineHeight: "45px",
                    }}
                  >
                    <img
                      src={tick}
                      style={{ height: "3.8vh", width: "3.8vh" }}
                      alt="step finished"
                    />
                  </li>
                </Col>
                <Col>
                  <li
                    id="eSignature"
                    style={{
                      display: "inline",
                      color: "lightgray",
                      fontSize: "15px",
                      background: "green",
                      borderRadius: "50%",
                      padding: "2vh 14%",
                      lineHeight: "45px",
                    }}
                  >
                    <strong>6</strong>
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
              value="87.5"
              style={{ textAlign: "right" }}
            />
          </Col>
        </Row>
        <h3 style={styles.center}>E-Signature</h3>
        <Card style={styles.cardBg}>
          <CardBody>
            <Form>
              <Row style={styles.top}>
                <Col xl={12} lg={12} md={12} sm={12}>
                  <FormGroup>
                    <Label for="eSignatureName">
                      Respectfully Submitted by: (Name)
                    </Label>{" "}
                    {this.state.alertESignatureName ? (
                      <span style={styles.warning}> name is required</span>
                    ) : (
                      <span style={styles.red}> *</span>
                    )}
                    <Input
                      type="text"
                      name="eSignatureName"
                      id="eSignatureName"
                      placeholder="name"
                      onChange={handleChange("eSignatureName")}
                      defaultValue={values.eSignatureName}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label
                      for="eSignature"
                      className="mr-3"
                      onClick={this.trim}
                    >
                      E-Sign
                    </Label>
                    {this.state.alertESignature ? (
                      <span style={styles.warning}>
                        e-Signature is required
                      </span>
                    ) : (
                      <span style={styles.red}>*</span>
                    )}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xl={12} lg={12} md={12} sm={12}>
                  <FormGroup>
                    <Input
                      id="eSignature"
                      name="eSignature"
                      type="file"
                      onChange={handleFileChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <SignatureCanvas
                    penColor="red"
                    backgroundColor="white"
                    canvasProps={{
                      width: 400,
                      height: 200,
                      className: "sigCanvas",
                    }}
                    ref={(ref) => {
                      this.sigPad = ref;
                    }}
                  />
                  {this.state.alertESignature ? (
                    <span style={styles.warning}>e-Signature is required</span>
                  ) : null}{" "}
                </Col>
              </Row>{" "}
              <Button
                onClick={() => {
                  this.setState({
                    trimmedDataURL: this.sigPad
                      .getCanvas()
                      .toDataURL("image/png"),
                  });
                  alert(this.state.trimmedDataURL);
                }}
              >
                Upload Signature
              </Button>
              <Row className="mt-1">
                <Col xl={12} lg={12} md={12} sm={12}>
                  <Card>
                    <CardBody>
                      <FormGroup>
                        <Label>
                          Pursuant to IICRA Rules, the registration fee is
                          non-refundable.
                        </Label>
                        <Label className="ml-1">
                          Registration Fee :{" "}
                          <span style={{ color: "blue", fontWeight: "bolder" }}>
                            USD 1000.00
                          </span>
                          {/* <a href="https://www.paypal.com">(PAY NOW)</a> */}
                        </Label>
                      </FormGroup>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col>
                  <Card>
                    <CardBody> {this.card()}</CardBody>
                  </Card>
                </Col>
              </Row>
              <Button style={styles.buttonBack} onClick={this.back}>
                Back
              </Button>
              <Button style={styles.button} onClick={this.continue}>
                Submit
              </Button>
            </Form>
          </CardBody>
          <Row>
            <Col style={styles.footer}>
              <a>Privacy Policy</a> | <a>Report Abuse</a>
            </Col>
          </Row>
        </Card>
      </Container>
    );
  }
}

const styles = {
  top: {
    marginTop: "3vh",
  },
  footer: {
    textAlign: "center",
    textWeight: "bold",
  },
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
  buttonBack: {
    margin: 15,
  },
  formUserContainer: {
    marginTop: "5vh",
    paddingTop: "5vh",
    paddingBottom: "3vh",
    backgroundColor: "#f6f6f6",
  },
  cardBg: {
    backgroundColor: "#f6f6f6",
    border: "none",
  },
  text: {
    paddingTop: "5vh",
  },
  progress: {
    marginBottom: "4vh",
  },
  warning: {
    color: "red",
    textAlign: "right",
  },
  red: {
    color: "red",
    fontWeight: "bolder",
  },
};

export default ESignature;
