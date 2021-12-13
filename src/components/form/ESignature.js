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
  CustomInput,
  Modal,
  ModalBody,
} from "reactstrap";
import axios from "axios";
import { jsPDF } from "jspdf";
import SignatureCanvas from "react-signature-canvas";
import validator from "validator";
import HashLoader from "react-spinners/HashLoader";
import tick from "../../assets/tick.png";
import sakkalMajalla from "../../Majalli";
import Swal from "sweetalert2";
import { getEnvironment } from "../../config";
// import signature from "../../assets/test.png";

export class ESignature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proceduralLaw: false,
      doc: new jsPDF(),
      trimmedDataURL: "",
      alertESignatureName: false,
      alertESignature: false,
      digitalSignature: false,
      //
      sellerId: "250393908830",
      publishableKey: "663D7BE5-F91B-4D6E-A4F2-779ED2E6A70C",
      ccNo: "",
      expMonth: "",
      expYear: "",
      cvv: "",
      //
      loading: false,
      color: "green",
    };
  }

  // componentDidMount() {
  //   alert(this.props.id);
  //   console.log(this.props.id);
  // }

  baseURL = getEnvironment().apiUrl;

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  change = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = () => {
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
        <Row style={styles.card}>
          <Col sm={12} md={6} lg={4} xl={2}>
            <Label>
              <span>
                {document.dir == "ltr" ? "Card Number" : "رقم البطاقة"}
              </span>
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
        <Row style={styles.card} className="mt-3">
          <Col sm={12} md={6} lg={4} xl={2}>
            <Label>
              <span>
                {document.dir == "ltr"
                  ? "Expiration Date (MM/YYYY)"
                  : "(..../..) تاريخ انتهاء الصلاحية"}
              </span>
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
        <Row className="mt-3" style={styles.card}>
          <Col sm={6} md={6} lg={4} xl={2}>
            <Label>
              <span>{document.dir == "ltr" ? "CVV" : "(cvv) سي في في"}</span>
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
        {/* <Button type="button" onClick={() => this.onSubmit()}>
          Submit
        </Button> */}
      </Form>
    );
  };

  sendPdfToServer = () => {
    this.state.doc.rect(5, 5, 200, 285);
    this.state.doc.setFontSize(15);
    let reliefLine = 20;
    let pageCount = this.state.doc.internal.getNumberOfPages();

    for (let i = 0; i < pageCount; i++) {
      const pageNo = this.state.doc.internal.getCurrentPageInfo().pageNumber;
      this.state.doc.text(`${pageNo}`, 105, 294, "center");
    }
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
    this.state.doc.text(this.props.values.claimantName, 95, reliefLine);
    this.state.doc.text("Nationality", 28, (reliefLine += 5));
    this.state.doc.text(this.props.values.claimantNationality, 95, reliefLine);
    this.state.doc.text("Address", 28, (reliefLine += 5));
    this.state.doc.text(this.props.values.claimantAddress, 95, reliefLine);
    this.state.doc.text("P.O. Box", 28, (reliefLine += 5));
    this.state.doc.text(this.props.values.claimantPOBox, 95, reliefLine);
    this.state.doc.text("Phone", 28, (reliefLine += 5));
    this.state.doc.text(this.props.values.claimantPhone, 95, reliefLine);
    this.state.doc.text("Fax", 28, (reliefLine += 5));
    this.state.doc.text(this.props.values.claimantFax, 95, reliefLine);
    this.state.doc.text("Email", 28, (reliefLine += 5));
    this.state.doc.text(this.props.values.claimantEmail, 95, reliefLine);
    if (this.props.values.claimantEmail2) {
      this.state.doc.text("Additional Claimant", 20, (reliefLine += 25));
      this.state.doc.setFontSize(10);
      this.state.doc.text("Name of the Claimant: ", 28, (reliefLine += 5));
      this.state.doc.text(this.props.values.claimantName2, 95, reliefLine);
      this.state.doc.text("Nationality", 28, (reliefLine += 5));
      this.state.doc.text(
        this.props.values.claimantNationality2,
        95,
        reliefLine
      );
      this.state.doc.text("Address", 28, (reliefLine += 5));
      this.state.doc.text(this.props.values.claimantAddress2, 95, reliefLine);
      this.state.doc.text("P.O. Box", 28, (reliefLine += 5));
      this.state.doc.text(this.props.values.claimantPOBox2, 95, reliefLine);
      this.state.doc.text("Phone", 28, (reliefLine += 5));
      this.state.doc.text(this.props.values.claimantPhone2, 95, reliefLine);
      this.state.doc.text("Fax", 28, (reliefLine += 5));
      this.state.doc.text(this.props.values.claimantFax2, 95, reliefLine);
      this.state.doc.text("Email", 28, (reliefLine += 5));
      this.state.doc.text(this.props.values.claimantEmail2, 95, reliefLine);
    }
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
        95,
        reliefLine
      );
      this.state.doc.text(
        "Name of the Representative Firm : ",
        28,
        (reliefLine += 5)
      );
      this.state.doc.text(this.props.values.legalAuthFirmName, 95, reliefLine);
      this.state.doc.text("Nationality", 28, (reliefLine += 5));
      this.state.doc.text(
        this.props.values.legalAuthNationality,
        95,
        reliefLine
      );
      this.state.doc.text("Address", 28, (reliefLine += 5));
      this.state.doc.text(this.props.values.legalAuthAddress, 95, reliefLine);
      this.state.doc.text("P.O. Box", 28, (reliefLine += 5));
      this.state.doc.text(this.props.values.legalAuthPOBox, 95, reliefLine);
      this.state.doc.text("Phone", 28, (reliefLine += 5));
      this.state.doc.text(this.props.values.legalAuthPhone, 95, reliefLine);
      this.state.doc.text("Fax", 28, (reliefLine += 5));
      this.state.doc.text(this.props.values.legalAuthFax, 95, reliefLine);
      this.state.doc.text("Email", 28, (reliefLine += 5));
      this.state.doc.text(this.props.values.legalAuthEmail, 95, reliefLine);

      if (this.props.values.legalAuthRegistration) {
        this.state.doc.text(
          "Commercial Registration Number",
          28,
          (reliefLine += 5)
        );
        this.state.doc.text(
          this.props.values.legalAuthRegistration,
          95,
          reliefLine
        );
      }
    }
    if (reliefLine > 250) {
      this.state.doc.addPage();
      this.state.doc.rect(5, 5, 200, 285);
      reliefLine = 15;
      for (let i = 0; i < pageCount; i++) {
        const pageNo = this.state.doc.internal.getCurrentPageInfo().pageNumber;
        this.state.doc.text(`${pageNo}`, 105, 294, "center");
      }
    }
    if (this.props.values.legalAuthEmail2) {
      //Legal Representative

      this.state.doc.setFontSize(10);
      this.state.doc.text(
        "Name of the second Representative: ",
        28,
        (reliefLine += 10)
      );
      this.state.doc.text(
        this.props.values.legalAuthRepresentativeName2,
        95,
        reliefLine
      );
      this.state.doc.text(
        "Name of the Representative Firm : ",
        28,
        (reliefLine += 5)
      );
      this.state.doc.text(this.props.values.legalAuthFirmName2, 95, reliefLine);
      this.state.doc.text("Nationality", 28, (reliefLine += 5));
      this.state.doc.text(
        this.props.values.legalAuthNationality2,
        95,
        reliefLine
      );

      this.state.doc.text("Address", 28, (reliefLine += 5));
      this.state.doc.text(this.props.values.legalAuthAddress2, 95, reliefLine);
      this.state.doc.text("P.O. Box", 28, (reliefLine += 5));
      this.state.doc.text(this.props.values.legalAuthPOBox2, 95, reliefLine);
      this.state.doc.text("Phone", 28, (reliefLine += 5));
      this.state.doc.text(this.props.values.legalAuthPhone2, 95, reliefLine);
      this.state.doc.text("Fax", 28, (reliefLine += 5));
      this.state.doc.text(this.props.values.legalAuthFax2, 95, reliefLine);
      this.state.doc.text("Email", 28, (reliefLine += 5));
      this.state.doc.text(this.props.values.legalAuthEmail2, 95, reliefLine);

      if (this.props.values.legalAuthRegistration2) {
        this.state.doc.text("Commercial Registration Number", 28, 155);
        this.state.doc.text(
          this.props.values.legalAuthRegistration2,
          95,
          reliefLine
        );
      }
    }
    if (reliefLine > 250) {
      this.state.doc.addPage();
      this.state.doc.rect(5, 5, 200, 285);
      reliefLine = 15;
      for (let i = 0; i < pageCount; i++) {
        const pageNo = this.state.doc.internal.getCurrentPageInfo().pageNumber;
        this.state.doc.text(`${pageNo}`, 105, 294, "center");
      }
    }
    //Respondent
    this.state.doc.setFontSize(12);
    this.state.doc.text("II. Respondent", 20, (reliefLine += 10));
    this.state.doc.setFontSize(10);
    this.state.doc.text("Name of the Respondent: ", 28, (reliefLine += 5));
    this.state.doc.text(this.props.values.respondentName, 95, reliefLine);
    this.state.doc.text("Nationality", 28, (reliefLine += 5));
    this.state.doc.text(
      this.props.values.respondentNationality,
      95,
      reliefLine
    );
    this.state.doc.text("Address", 28, (reliefLine += 5));
    this.state.doc.text(this.props.values.respondentAddress, 95, reliefLine);
    this.state.doc.text("P.O. Box", 28, (reliefLine += 5));
    this.state.doc.text(this.props.values.respondentPOBox, 95, reliefLine);
    this.state.doc.text("Phone", 28, (reliefLine += 5));
    this.state.doc.text(this.props.values.respondentPhone, 95, reliefLine);
    this.state.doc.text("Fax", 28, (reliefLine += 5));
    this.state.doc.text(this.props.values.respondentFax, 95, reliefLine);
    this.state.doc.text("Email", 28, (reliefLine += 5));
    this.state.doc.text(this.props.values.respondentEmail, 95, reliefLine);
    if (reliefLine > 270) {
      this.state.doc.addPage();
      this.state.doc.rect(5, 5, 200, 285);
      reliefLine = 15;
      for (let i = 0; i < pageCount; i++) {
        const pageNo = this.state.doc.internal.getCurrentPageInfo().pageNumber;
        this.state.doc.text(`${pageNo}`, 105, 294, "center");
      }
    }

    if (this.props.values.respondentEmail2) {
      this.state.doc.text("Additional Respondent", 20, (reliefLine += 10));
      this.state.doc.setFontSize(10);
      this.state.doc.text("Name of the Respondent: ", 28, (reliefLine += 5));
      this.state.doc.text(this.props.values.respondentName2, 95, reliefLine);
      this.state.doc.text("Nationality", 28, (reliefLine += 5));
      this.state.doc.text(
        this.props.values.respondentNationality2,
        95,
        reliefLine
      );
      this.state.doc.text("Address", 28, (reliefLine += 5));
      this.state.doc.text(this.props.values.respondentAddress2, 95, reliefLine);
      this.state.doc.text("P.O. Box", 28, (reliefLine += 5));
      this.state.doc.text(this.props.values.respondentPOBox2, 95, reliefLine);
      this.state.doc.text("Phone", 28, (reliefLine += 5));
      this.state.doc.text(this.props.values.respondentPhone2, 95, reliefLine);
      this.state.doc.text("Fax", 28, (reliefLine += 5));
      this.state.doc.text(this.props.values.respondentFax2, 95, reliefLine);
      this.state.doc.text("Email", 28, (reliefLine += 5));
      this.state.doc.text(this.props.values.respondentEmail2, 95, reliefLine);
    }
    if (reliefLine > 270) {
      this.state.doc.addPage();
      this.state.doc.rect(5, 5, 200, 285);
      reliefLine = 15;
      for (let i = 0; i < pageCount; i++) {
        const pageNo = this.state.doc.internal.getCurrentPageInfo().pageNumber;
        this.state.doc.text(`${pageNo}`, 105, 294, "center");
      }
    }
    //Dispute
    this.state.doc.setFontSize(12);
    this.state.doc.text("III. Dispute Details", 20, (reliefLine += 10));
    this.state.doc.setFontSize(10);
    this.state.doc.text("i. Nature of Dispute", 28, (reliefLine += 10));
    this.state.doc.line(20, (reliefLine += 5), 190, reliefLine);
    let natureOfDisputeRaw = this.props.values.natureOfDispute;

    let natureOfDisputeCook = natureOfDisputeRaw.match(/.{1,90}/g);

    natureOfDisputeCook.map((con) => {
      if (reliefLine > 275) {
        this.state.doc.addPage();
        this.state.doc.rect(5, 5, 200, 285);
        reliefLine = 15;
        for (let i = 0; i < pageCount; i++) {
          const pageNo =
            this.state.doc.internal.getCurrentPageInfo().pageNumber;
          this.state.doc.text(`${pageNo}`, 105, 294, "center");
        }
      } else {
        this.state.doc.text(con, 28, (reliefLine += 5), "left");
      }
    });

    if (reliefLine > 270) {
      this.state.doc.addPage();
      this.state.doc.rect(5, 5, 200, 285);
      reliefLine = 15;
      for (let i = 0; i < pageCount; i++) {
        const pageNo = this.state.doc.internal.getCurrentPageInfo().pageNumber;
        this.state.doc.text(`${pageNo}`, 105, 294, "center");
      }
    }
    this.state.doc.text("ii. Value of Dispute", 28, (reliefLine += 10));
    this.state.doc.line(20, (reliefLine += 5), 190, reliefLine);
    let valueOfDisputeRaw = this.props.values.valueOfDispute;

    let valueOfDisputeCook = valueOfDisputeRaw.match(/.{1,90}/g);

    valueOfDisputeCook.map((con) => {
      if (reliefLine > 275) {
        this.state.doc.addPage();
        this.state.doc.rect(5, 5, 200, 285);
        reliefLine = 15;
        for (let i = 0; i < pageCount; i++) {
          const pageNo =
            this.state.doc.internal.getCurrentPageInfo().pageNumber;
          this.state.doc.text(`${pageNo}`, 105, 294, "center");
        }
      } else {
        this.state.doc.text(con, 28, (reliefLine += 5), "left");
      }
    });

    //Dispute Next Page
    if (reliefLine > 270) {
      this.state.doc.addPage();
      this.state.doc.rect(5, 5, 200, 285);
      reliefLine = 15;
      for (let i = 0; i < pageCount; i++) {
        const pageNo = this.state.doc.internal.getCurrentPageInfo().pageNumber;
        this.state.doc.text(`${pageNo}`, 105, 294, "center");
      }
    }
    this.state.doc.text("iii. Recitals", 28, (reliefLine += 10));
    this.state.doc.line(20, (reliefLine += 5), 190, reliefLine);

    let recitalsRaw = this.props.values.recitals;

    let recitalsCook = recitalsRaw.match(/.{1,90}/g);

    recitalsCook.map((con) => {
      if (reliefLine > 275) {
        this.state.doc.addPage();
        this.state.doc.rect(5, 5, 200, 285);
        reliefLine = 15;
        for (let i = 0; i < pageCount; i++) {
          const pageNo =
            this.state.doc.internal.getCurrentPageInfo().pageNumber;
          this.state.doc.text(`${pageNo}`, 105, 294, "center");
        }
      } else {
        this.state.doc.text(con, 28, (reliefLine += 5), "left");
      }
    });

    if (reliefLine > 270) {
      this.state.doc.addPage();
      this.state.doc.rect(5, 5, 200, 285);
      reliefLine = 15;
      for (let i = 0; i < pageCount; i++) {
        const pageNo = this.state.doc.internal.getCurrentPageInfo().pageNumber;
        this.state.doc.text(`${pageNo}`, 105, 294, "center");
      }
    }
    this.state.doc.text("iv. Legal Grounds", 28, (reliefLine += 10));
    this.state.doc.line(20, (reliefLine += 5), 190, reliefLine);

    let legalGroundsRaw = this.props.values.legalGrounds;

    let legalGroundsCook = legalGroundsRaw.match(/.{1,90}/g);

    legalGroundsCook.map((con) => {
      if (reliefLine > 275) {
        this.state.doc.addPage();
        this.state.doc.rect(5, 5, 200, 285);
        reliefLine = 15;
        for (let i = 0; i < pageCount; i++) {
          const pageNo =
            this.state.doc.internal.getCurrentPageInfo().pageNumber;
          this.state.doc.text(`${pageNo}`, 105, 294, "center");
        }
      } else {
        this.state.doc.text(con, 28, (reliefLine += 5), "left");
      }
    });

    if (reliefLine > 270) {
      this.state.doc.addPage();
      this.state.doc.rect(5, 5, 200, 285);
      reliefLine = 15;
      for (let i = 0; i < pageCount; i++) {
        const pageNo = this.state.doc.internal.getCurrentPageInfo().pageNumber;
        this.state.doc.text(`${pageNo}`, 105, 294, "center");
      }
    }
    this.state.doc.text("v. Relief Sought", 28, (reliefLine += 10));
    this.state.doc.line(20, (reliefLine += 5), 190, reliefLine);

    let reliefSoughtRaw = this.props.values.reliefSought;

    let reliefSoughtCook = reliefSoughtRaw.match(/.{1,90}/g);

    reliefSoughtCook.map((con) => {
      if (reliefLine > 275) {
        this.state.doc.addPage();
        this.state.doc.rect(5, 5, 200, 285);
        reliefLine = 15;
        for (let i = 0; i < pageCount; i++) {
          const pageNo =
            this.state.doc.internal.getCurrentPageInfo().pageNumber;
          this.state.doc.text(`${pageNo}`, 105, 294, "center");
        }
      } else {
        this.state.doc.text(con, 28, (reliefLine += 5), "left");
      }
    });

    if (reliefLine > 250) {
      this.state.doc.addPage();
      this.state.doc.rect(5, 5, 200, 285);
      reliefLine = 15;
      for (let i = 0; i < pageCount; i++) {
        const pageNo = this.state.doc.internal.getCurrentPageInfo().pageNumber;
        this.state.doc.text(`${pageNo}`, 105, 294, "center");
      }
    }
    this.state.doc.setFontSize(12);
    this.state.doc.text(
      "IV. Nomination of Sole Arbitrator or Co-Arbitrator(s)",
      20,
      (reliefLine += 10)
    );

    this.state.doc.setFontSize(10);
    this.state.doc.text("Name of the Arbitrator: ", 28, (reliefLine += 5));
    this.state.doc.text(this.props.values.arbitratorName, 95, reliefLine);
    this.state.doc.text("Nationality", 28, (reliefLine += 5));
    this.state.doc.text(
      this.props.values.arbitratorNationality,
      95,
      reliefLine
    );
    this.state.doc.text("Address", 28, (reliefLine += 5));
    this.state.doc.text(this.props.values.arbitratorAddress, 95, reliefLine);
    this.state.doc.text("P.O. Box", 28, (reliefLine += 5));
    this.state.doc.text(this.props.values.arbitratorPOBox, 95, reliefLine);
    this.state.doc.text("Phone", 28, (reliefLine += 5));
    this.state.doc.text(this.props.values.arbitratorPhone, 95, reliefLine);
    this.state.doc.text("Fax", 28, (reliefLine += 5));
    this.state.doc.text(this.props.values.arbitratorFax, 95, reliefLine);
    this.state.doc.text("Email", 28, (reliefLine += 5));
    this.state.doc.text(this.props.values.arbitratorEmail, 95, reliefLine);
    if (reliefLine > 250) {
      this.state.doc.addPage();
      this.state.doc.rect(5, 5, 200, 285);
      reliefLine = 5;
      for (let i = 0; i < pageCount; i++) {
        const pageNo = this.state.doc.internal.getCurrentPageInfo().pageNumber;
        this.state.doc.text(`${pageNo}`, 105, 294, "center");
      }
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
      this.state.doc.rect(5, 5, 200, 285);
      reliefLine = 15;
      for (let i = 0; i < pageCount; i++) {
        const pageNo = this.state.doc.internal.getCurrentPageInfo().pageNumber;
        this.state.doc.text(`${pageNo}`, 105, 294, "center");
      }
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
      this.state.doc.rect(5, 5, 200, 285);
      reliefLine = 15;
      for (let i = 0; i < pageCount; i++) {
        const pageNo = this.state.doc.internal.getCurrentPageInfo().pageNumber;
        this.state.doc.text(`${pageNo}`, 105, 294, "center");
      }
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
      this.state.doc.rect(5, 5, 200, 285);
      reliefLine = 15;
      for (let i = 0; i < pageCount; i++) {
        const pageNo = this.state.doc.internal.getCurrentPageInfo().pageNumber;
        this.state.doc.text(`${pageNo}`, 105, 294, "center");
      }
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
      this.state.doc.rect(5, 5, 200, 285);
      reliefLine = 15;
      for (let i = 0; i < pageCount; i++) {
        const pageNo = this.state.doc.internal.getCurrentPageInfo().pageNumber;
        this.state.doc.text(`${pageNo}`, 105, 294, "center");
      }
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
      this.state.doc.rect(5, 5, 200, 285);
      reliefLine = 15;
      for (let i = 0; i < pageCount; i++) {
        const pageNo = this.state.doc.internal.getCurrentPageInfo().pageNumber;
        this.state.doc.text(`${pageNo}`, 105, 294, "center");
      }
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
      this.state.doc.rect(5, 5, 200, 285);
      reliefLine = 15;
      for (let i = 0; i < pageCount; i++) {
        const pageNo = this.state.doc.internal.getCurrentPageInfo().pageNumber;
        this.state.doc.text(`${pageNo}`, 105, 294, "center");
      }
    }
    this.state.doc.text(
      "I/We hereby authorize IICRA to use the above- mentioned details for communication purposes.",
      28,
      (reliefLine += 10)
    );
    if (reliefLine > 265) {
      this.state.doc.addPage();
      this.state.doc.rect(5, 5, 200, 285);
      reliefLine = 15;
      for (let i = 0; i < pageCount; i++) {
        const pageNo = this.state.doc.internal.getCurrentPageInfo().pageNumber;
        this.state.doc.text(`${pageNo}`, 105, 294, "center");
      }
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
      this.state.doc.rect(5, 5, 200, 285);
      reliefLine = 15;
      for (let i = 0; i < pageCount; i++) {
        const pageNo = this.state.doc.internal.getCurrentPageInfo().pageNumber;
        this.state.doc.text(`${pageNo}`, 105, 294, "center");
      }
    }
    this.state.doc.text(
      "The parties will receive an official letter initiating this proceeding once all filing requirements have been satisfied.",
      24,
      (reliefLine += 10)
    );

    if (reliefLine > 230) {
      this.state.doc.addPage();
      this.state.doc.rect(5, 5, 200, 285);
      reliefLine = 15;
      for (let i = 0; i < pageCount; i++) {
        const pageNo = this.state.doc.internal.getCurrentPageInfo().pageNumber;
        this.state.doc.text(`${pageNo}`, 105, 294, "center");
      }
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

    var signature = new Image();
    if (!this.state.digitalSignature) {
      var src = URL.createObjectURL(this.props.values.eSignature);
      signature.src = src;
    }

    this.state.doc.addImage(
      this.state.digitalSignature ? this.state.trimmedDataURL : signature,
      "jpeg",
      28,
      (reliefLine += 2),
      50,
      24
    );

    this.state.doc.setFontSize(15);
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

  genrate = () => {
    const now = new Date();
    const date = now.toLocaleDateString();

    this.state.doc.addFileToVFS("MyFont.ttf", sakkalMajalla);
    this.state.doc.addFont("MyFont.ttf", "MyFont", "normal");
    this.state.doc.setFont("MyFont");
    this.state.doc.rect(5, 5, 200, 285);
    this.state.doc.setFontSize(20);
    let reliefLine = 20;
    let pageCount = this.state.doc.internal.getNumberOfPages();

    this.state.doc.text(
      `لدى المركز الإسلامي الدولي للصلح  والتحكيم`,
      105,
      reliefLine,
      "center"
    );
    this.state.doc.text(" طلب التحكيم ", 105, (reliefLine += 10), "center");

    // //claimant
    this.state.doc.setFontSize(17);
    this.state.doc.text("١۔", 200, (reliefLine += 10), "right");

    this.state.doc.text(": الأطراف", 195, reliefLine, "right");
    this.state.doc.text(`:في تاريخ`, 50, reliefLine);
    this.state.doc.text(date, 20, reliefLine);
    this.state.doc.line(182, (reliefLine += 2), 195, reliefLine);
    this.state.doc.setFontSize(14);

    this.state.doc.text(":المحتكم", 190, (reliefLine += 10), "right");
    this.state.doc.setFontSize(12);
    for (let i = 0; i < pageCount; i++) {
      const pageNo = this.state.doc.internal.getCurrentPageInfo().pageNumber;
      this.state.doc.text(`${pageNo}`, 105, 294, "center");
    }
    this.state.doc.text(" الإسم الكامل -", 188, (reliefLine += 5), "right");

    this.state.doc.text(
      this.props.values.claimantName,
      120,
      reliefLine,
      "right"
    );
    this.state.doc.text("الجنسية -", 190, (reliefLine += 5), "right");

    this.state.doc.text(
      this.props.values.claimantNationality,
      120,
      reliefLine,
      "right"
    );
    this.state.doc.text("العنوان الكامل -", 190, (reliefLine += 5), "right");

    // this.state.doc.text(
    //   this.props.values.claimantAddress,
    //   120,
    //   reliefLine,
    //   "right"
    // );

    reliefLine -= 5;
    const claimantAddressPro =
      this.props.values.claimantAddress.match(/.{1,65}/g);
    claimantAddressPro.map((inform) => {
      this.state.doc.text(inform, 120, (reliefLine += 5), "right");
    });

    this.state.doc.text("الصندوق البريدي -", 190, (reliefLine += 5), "right");

    this.state.doc.text(
      this.props.values.claimantPOBox,
      120,
      reliefLine,
      "right"
    );
    this.state.doc.text("رقم الهاتف -", 190, (reliefLine += 5), "right");

    this.state.doc.text(
      this.props.values.claimantPhone,
      120,
      reliefLine,
      "right"
    );
    this.state.doc.text("فاكس -", 190, (reliefLine += 5), "right");

    this.state.doc.text(
      this.props.values.claimantFax,
      120,
      reliefLine,
      "right"
    );
    this.state.doc.text(
      "(العنوان الالكتروني المختار )البريد الإلكتروني -",
      190,
      (reliefLine += 5),
      "right"
    );
    this.state.doc.text(
      this.props.values.claimantEmail,
      120,
      reliefLine,
      "right"
    );

    if (this.props.values.legalPerson) {
      // this.state.doc.setFontSize(14);
      // this.state.doc.text("اختياري", 200, (reliefLine += 10), "right");
      this.state.doc.setFontSize(12);
      this.state.doc.text(
        "- اسم الممثل القانوني",
        190,
        (reliefLine += 10),
        "right"
      );
      this.state.doc.text(
        this.props.values.legalAuthRepresentativeName,
        120,
        reliefLine,
        "right"
      );
      this.state.doc.text(
        "- اسم مكتب المحلماة",
        190,
        (reliefLine += 5),
        "right"
      );
      this.state.doc.text(
        this.props.values.legalAuthFirmName,
        120,
        reliefLine,
        "right"
      );
      this.state.doc.text("- الجنسية", 190, (reliefLine += 5), "right");
      this.state.doc.text(
        this.props.values.legalAuthNationality,
        120,
        reliefLine,
        "right"
      );
      this.state.doc.text("- العنوان الكامل", 190, (reliefLine += 5), "right");

      reliefLine -= 5;
      const legalAuthAddressPro =
        this.props.values.legalAuthAddress.match(/.{1,65}/g);
      legalAuthAddressPro.map((inform) => {
        this.state.doc.text(inform, 120, (reliefLine += 5), "right");
      });
      this.state.doc.text("- الصندوق البريدي", 190, (reliefLine += 5), "right");
      this.state.doc.text(
        this.props.values.legalAuthPOBox,
        120,
        reliefLine,
        "right"
      );
      this.state.doc.text("- رقم الهاتف", 190, (reliefLine += 5), "right");
      this.state.doc.text(
        this.props.values.legalAuthPhone,
        120,
        reliefLine,
        "right"
      );
      this.state.doc.text("- فاكس", 190, (reliefLine += 5), "right");
      this.state.doc.text(
        this.props.values.legalAuthFax,
        120,
        reliefLine,
        "right"
      );
      this.state.doc.text(
        "(العنوان الالكتروني المختار) البريد الإلكتروني -",
        190,
        (reliefLine += 5),
        "right"
      );
      this.state.doc.text(
        this.props.values.legalAuthEmail,
        120,
        reliefLine,
        "right"
      );
      this.state.doc.text(
        "- رقم السجل التجاري",
        190,
        (reliefLine += 5),
        "right"
      );
      this.state.doc.text(
        this.props.values.legalAuthRegistration,
        120,
        reliefLine,
        "right"
      );
    }

    if (this.props.values.claimantEmail2) {
      this.state.doc.setFontSize(14);
      this.state.doc.text(":المحتكم الثاني", 190, (reliefLine += 13), "right");
      this.state.doc.setFontSize(12);
      this.state.doc.text(" الإسم الكامل -", 190, (reliefLine += 5), "right");

      this.state.doc.text(
        this.props.values.claimantName2,
        120,
        reliefLine,
        "right"
      );
      this.state.doc.text("الجنسية -", 190, (reliefLine += 5), "right");

      this.state.doc.text(
        this.props.values.claimantNationality2,
        120,
        reliefLine,
        "right"
      );
      this.state.doc.text("العنوان الكامل -", 190, (reliefLine += 5), "right");

      reliefLine -= 5;
      const claimantAddress2Pro =
        this.props.values.claimantAddress2.match(/.{1,65}/g);
      claimantAddress2Pro.map((inform) => {
        this.state.doc.text(inform, 120, (reliefLine += 5), "right");
      });

      this.state.doc.text("الصندوق البريدي -", 190, (reliefLine += 5), "right");

      this.state.doc.text(
        this.props.values.claimantPOBox2,
        120,
        reliefLine,
        "right"
      );
      this.state.doc.text("رقم الهاتف -", 190, (reliefLine += 5), "right");

      this.state.doc.text(
        this.props.values.claimantPhone2,
        120,
        reliefLine,
        "right"
      );
      this.state.doc.text("فاكس -", 190, (reliefLine += 5), "right");

      this.state.doc.text(
        this.props.values.claimantFax2,
        120,
        reliefLine,
        "right"
      );
      this.state.doc.text(
        "(العنوان الالكتروني المختار) البريد الإلكتروني -",
        190,
        (reliefLine += 5),
        "right"
      );

      this.state.doc.text(
        this.props.values.claimantEmail2,
        120,
        reliefLine,
        "right"
      );
    }

    if (this.props.values.legalAuthEmail2) {
      // this.state.doc.setFontSize(14);
      // this.state.doc.text("اختياري", 200, (reliefLine += 10), "right");

      this.state.doc.setFontSize(12);
      this.state.doc.text(
        "- اسم الممثل القانوني",
        190,
        (reliefLine += 10),
        "right"
      );
      this.state.doc.text(
        this.props.values.legalAuthRepresentativeName2,
        120,
        reliefLine,
        "right"
      );
      this.state.doc.text(
        "- اسم مكتب المحلماة",
        190,
        (reliefLine += 5),
        "right"
      );
      this.state.doc.text(
        this.props.values.legalAuthFirmName2,
        120,
        reliefLine,
        "right"
      );
      this.state.doc.text("- الجنسية", 190, (reliefLine += 5), "right");
      this.state.doc.text(
        this.props.values.legalAuthNationality2,
        120,
        reliefLine,
        "right"
      );
      this.state.doc.text("- العنوان الكامل ", 190, (reliefLine += 5), "right");
      this.state.doc.text(
        this.props.values.legalAuthAddress2,
        120,
        reliefLine,
        "right"
      );

      reliefLine -= 5;
      const legalAuthAddress2Pro =
        this.props.values.legalAuthAddress2.match(/.{1,65}/g);
      legalAuthAddress2Pro.map((inform) => {
        this.state.doc.text(inform, 120, (reliefLine += 5), "right");
      });

      this.state.doc.text("- الصندوق البريدي", 190, (reliefLine += 5), "right");
      this.state.doc.text(
        this.props.values.legalAuthPOBox2,
        120,
        reliefLine,
        "right"
      );
      this.state.doc.text("- رقم الهاتف", 190, (reliefLine += 5), "right");
      this.state.doc.text(
        this.props.values.legalAuthPhone2,
        120,
        reliefLine,
        "right"
      );
      this.state.doc.text("- فاكس", 190, (reliefLine += 5), "right");
      this.state.doc.text(
        this.props.values.legalAuthFax2,
        120,
        reliefLine,
        "right"
      );
      this.state.doc.text(
        "(العنوان الالكتروني المختار) البريد الإلكتروني -",
        190,
        (reliefLine += 5),
        "right"
      );
      this.state.doc.text(
        this.props.values.legalAuthEmail2,
        120,
        reliefLine,
        "right"
      );
      this.state.doc.text(
        "- رقم السجل التجاري",
        190,
        (reliefLine += 5),
        "right"
      );
      this.state.doc.text(
        this.props.values.legalAuthRegistration2,
        120,
        reliefLine,
        "right"
      );
    }

    if (reliefLine > 270) {
      this.state.doc.addPage();
      this.state.doc.rect(5, 5, 200, 285);
      reliefLine = 5;
      for (let i = 0; i < pageCount; i++) {
        const pageNo = this.state.doc.internal.getCurrentPageInfo().pageNumber;
        this.state.doc.text(`${pageNo}`, 105, 294, "center");
      }
    }

    // Respondent
    this.state.doc.setFontSize(14);
    this.state.doc.text(":المحتكم ضده", 190, (reliefLine += 10), "right");

    this.state.doc.setFontSize(12);
    this.state.doc.text("الإسم الكامل -", 190, (reliefLine += 5), "right");

    this.state.doc.text(
      this.props.values.respondentName,
      120,
      reliefLine,
      "right"
    );
    this.state.doc.text("الجنسية -", 190, (reliefLine += 5), "right");

    this.state.doc.text(
      this.props.values.respondentNationality,
      120,
      reliefLine,
      "right"
    );
    this.state.doc.text("العنوان الكامل -", 190, (reliefLine += 5), "right");

    reliefLine -= 5;
    const respondentAddressPro =
      this.props.values.respondentAddress.match(/.{1,65}/g);
    respondentAddressPro.map((inform) => {
      this.state.doc.text(inform, 120, (reliefLine += 5), "right");
    });

    this.state.doc.text("الصندوق البريدي -", 190, (reliefLine += 5), "right");

    this.state.doc.text(
      this.props.values.respondentPOBox,
      120,
      reliefLine,
      "right"
    );
    this.state.doc.text("رقم الهاتف -", 190, (reliefLine += 5), "right");

    this.state.doc.text(
      this.props.values.respondentPhone,
      120,
      reliefLine,
      "right"
    );
    this.state.doc.text("فاكس -", 190, (reliefLine += 5), "right");

    this.state.doc.text(
      this.props.values.respondentFax,
      120,
      reliefLine,
      "right"
    );
    this.state.doc.text(
      "(العنوان الالكتروني المختار) البريد الإلكتروني -",
      190,
      (reliefLine += 5),
      "right"
    );
    this.state.doc.text(
      this.props.values.respondentEmail,
      120,
      reliefLine,
      "right"
    );
    if (this.props.values.respondentEmail2) {
      this.state.doc.setFontSize(14);

      this.state.doc.text(
        ":المحتكم ضده الثاني",
        195,
        (reliefLine += 10),
        "right"
      );

      this.state.doc.setFontSize(12);
      this.state.doc.text("الإسم الكامل -", 190, (reliefLine += 10), "right");

      this.state.doc.text(
        this.props.values.respondentName2,
        120,
        reliefLine,
        "right"
      );
      this.state.doc.text("الجنسية -", 190, (reliefLine += 5), "right");

      this.state.doc.text(
        this.props.values.respondentNationality2,
        120,
        reliefLine,
        "right"
      );
      this.state.doc.text("العنوان الكامل -", 190, (reliefLine += 5), "right");

      reliefLine -= 5;
      const respondentAddress2Pro =
        this.props.values.respondentAddress2.match(/.{1,65}/g);
      respondentAddress2Pro.map((inform) => {
        this.state.doc.text(inform, 120, (reliefLine += 5), "right");
      });
      this.state.doc.text("الصندوق البريدي -", 190, (reliefLine += 5), "right");

      this.state.doc.text(
        this.props.values.respondentPOBox2,
        120,
        reliefLine,
        "right"
      );
      this.state.doc.text("رقم الهاتف -", 190, (reliefLine += 5), "right");

      this.state.doc.text(
        this.props.values.respondentPhone2,
        120,
        reliefLine,
        "right"
      );
      this.state.doc.text("فاكس -", 190, (reliefLine += 5), "right");

      this.state.doc.text(
        this.props.values.respondentFax2,
        120,
        reliefLine,
        "right"
      );
      this.state.doc.text(
        "(العنوان الالكتروني المختار) البريد الإلكتروني -",
        190,
        (reliefLine += 5),
        "right"
      );
      this.state.doc.text(
        this.props.values.respondentEmail2,
        120,
        reliefLine,
        "right"
      );
    }
    if (reliefLine > 270) {
      this.state.doc.addPage();
      this.state.doc.rect(5, 5, 200, 285);
      reliefLine = 5;
      for (let i = 0; i < pageCount; i++) {
        const pageNo = this.state.doc.internal.getCurrentPageInfo().pageNumber;
        this.state.doc.text(`${pageNo}`, 105, 294, "center");
      }
    }
    //Dispute
    this.state.doc.setFontSize(17);
    this.state.doc.text("٢۔", 200, (reliefLine += 10), "right");

    this.state.doc.text(": تفاصيل النزاع", 195, reliefLine, "right"); //un
    this.state.doc.line(168, (reliefLine += 2), 195, reliefLine);

    this.state.doc.setFontSize(14);
    this.state.doc.text(".أ", 195, (reliefLine += 10), "right");
    this.state.doc.text(":طبيعة النزاع", 190, reliefLine, "right");
    this.state.doc.setFontSize(12);

    let natureOfDisputeRaw = this.props.values.natureOfDispute;

    let natureOfDisputeCook = natureOfDisputeRaw.match(/.{1,125}/g);

    natureOfDisputeCook.map((con) => {
      if (reliefLine > 275) {
        this.state.doc.addPage();
        this.state.doc.rect(5, 5, 200, 285);
        reliefLine = 5;
        for (let i = 0; i < pageCount; i++) {
          const pageNo =
            this.state.doc.internal.getCurrentPageInfo().pageNumber;
          this.state.doc.text(`${pageNo}`, 105, 294, "center");
        }
      } else {
        this.state.doc.text(con, 190, (reliefLine += 5), "right");
      }
    });
    this.state.doc.line(20, (reliefLine += 5), 190, reliefLine);

    if (reliefLine > 270) {
      this.state.doc.addPage();
      this.state.doc.rect(5, 5, 200, 285);
      reliefLine = 5;
      for (let i = 0; i < pageCount; i++) {
        const pageNo = this.state.doc.internal.getCurrentPageInfo().pageNumber;
        this.state.doc.text(`${pageNo}`, 105, 294, "center");
      }
    }
    this.state.doc.setFontSize(14);

    this.state.doc.text(".ب", 195, (reliefLine += 10), "right");
    this.state.doc.text(":قيمة النزاع", 190, reliefLine, "right");
    this.state.doc.setFontSize(12);

    let valueOfDisputeRaw = this.props.values.valueOfDispute;

    let valueOfDisputeCook = valueOfDisputeRaw.match(/.{1,125}/g);

    valueOfDisputeCook.map((con) => {
      if (reliefLine > 275) {
        this.state.doc.addPage();
        this.state.doc.rect(5, 5, 200, 285);
        reliefLine = 5;
        for (let i = 0; i < pageCount; i++) {
          const pageNo =
            this.state.doc.internal.getCurrentPageInfo().pageNumber;
          this.state.doc.text(`${pageNo}`, 105, 294, "center");
        }
      } else {
        this.state.doc.text(con, 190, (reliefLine += 5), "right");
      }
    });
    this.state.doc.line(20, (reliefLine += 5), 190, reliefLine);

    if (reliefLine > 270) {
      this.state.doc.addPage();
      this.state.doc.rect(5, 5, 200, 285);
      reliefLine = 5;
      for (let i = 0; i < pageCount; i++) {
        const pageNo = this.state.doc.internal.getCurrentPageInfo().pageNumber;
        this.state.doc.text(`${pageNo}`, 105, 294, "center");
      }
    }
    this.state.doc.setFontSize(14);

    this.state.doc.text(".ج", 195, (reliefLine += 10), "right");
    this.state.doc.text(":الحيثيــات", 190, reliefLine, "right");
    this.state.doc.setFontSize(12);

    let recitalsRaw = this.props.values.recitals;

    let recitalsCook = recitalsRaw.match(/.{1,125}/g);

    recitalsCook.map((con) => {
      if (reliefLine > 275) {
        this.state.doc.addPage();
        this.state.doc.rect(5, 5, 200, 285);
        reliefLine = 5;
        for (let i = 0; i < pageCount; i++) {
          const pageNo =
            this.state.doc.internal.getCurrentPageInfo().pageNumber;
          this.state.doc.text(`${pageNo}`, 105, 294, "center");
        }
      } else {
        this.state.doc.text(con, 190, (reliefLine += 5), "right");
      }
    });

    this.state.doc.line(20, (reliefLine += 5), 190, reliefLine);

    if (reliefLine > 270) {
      this.state.doc.addPage();
      this.state.doc.rect(5, 5, 200, 285);
      reliefLine = 5;
      for (let i = 0; i < pageCount; i++) {
        const pageNo = this.state.doc.internal.getCurrentPageInfo().pageNumber;
        this.state.doc.text(`${pageNo}`, 105, 294, "center");
      }
    }
    this.state.doc.setFontSize(14);

    this.state.doc.text(".د", 195, (reliefLine += 10), "right");
    this.state.doc.text(":الأســس القانونيــة", 190, reliefLine, "right");
    this.state.doc.setFontSize(12);

    let legalGroundsRaw = this.props.values.legalGrounds;

    let legalGroundsCook = legalGroundsRaw.match(/.{1,125}/g);

    legalGroundsCook.map((con) => {
      if (reliefLine > 275) {
        this.state.doc.addPage();
        this.state.doc.rect(5, 5, 200, 285);
        reliefLine = 5;
        for (let i = 0; i < pageCount; i++) {
          const pageNo =
            this.state.doc.internal.getCurrentPageInfo().pageNumber;
          this.state.doc.text(`${pageNo}`, 105, 294, "center");
        }
      } else {
        this.state.doc.text(con, 190, (reliefLine += 5), "right");
      }
    });
    this.state.doc.line(20, (reliefLine += 5), 190, reliefLine);

    if (reliefLine > 270) {
      this.state.doc.addPage();
      this.state.doc.rect(5, 5, 200, 285);
      reliefLine = 5;
      for (let i = 0; i < pageCount; i++) {
        const pageNo = this.state.doc.internal.getCurrentPageInfo().pageNumber;
        this.state.doc.text(`${pageNo}`, 105, 294, "center");
      }
    }

    this.state.doc.setFontSize(17);
    this.state.doc.text("٣۔", 200, (reliefLine += 10), "right");

    this.state.doc.text(": الطلبات", 195, reliefLine, "right");
    this.state.doc.line(181, (reliefLine += 2), 195, reliefLine);
    reliefLine += 5;
    this.state.doc.setFontSize(12);
    let reliefSoughtRaw = this.props.values.reliefSought;

    let reliefSoughtCook = reliefSoughtRaw.match(/.{1,125}/g);

    reliefSoughtCook.map((con) => {
      if (reliefLine > 275) {
        this.state.doc.addPage();
        this.state.doc.rect(5, 5, 200, 285);
        reliefLine = 5;
        for (let i = 0; i < pageCount; i++) {
          const pageNo =
            this.state.doc.internal.getCurrentPageInfo().pageNumber;
          this.state.doc.text(`${pageNo}`, 105, 294, "center");
        }
      } else {
        this.state.doc.text(con, 190, (reliefLine += 5), "right");
      }
    });
    this.state.doc.line(20, (reliefLine += 5), 190, reliefLine);

    this.state.doc.setFontSize(17);

    if (reliefLine > 240) {
      this.state.doc.addPage();
      this.state.doc.rect(5, 5, 200, 285);
      reliefLine = 5;
      for (let i = 0; i < pageCount; i++) {
        const pageNo = this.state.doc.internal.getCurrentPageInfo().pageNumber;
        this.state.doc.text(`${pageNo}`, 105, 294, "center");
      }
    }
    this.state.doc.text("٤۔", 200, (reliefLine += 13), "right");
    this.state.doc.text(":تعيين هيئة التحكيم", 195, reliefLine, "right");
    this.state.doc.line(160, (reliefLine += 2), 195, reliefLine);

    this.state.doc.setFontSize(12);

    this.state.doc.text(
      ":عدد المحكمين لسير إجراءات التحكيم",
      190,
      (reliefLine += 8),
      "right"
    );
    // this.state.doc.text(
    //   this.props.values.numberOfArbitrators,
    //   105,
    //   reliefLine,
    //   "center"
    // );
    if (this.props.values.numberOfArbitrators == "١") {
      this.state.doc.text("محكم فرد", 125, reliefLine, "center");
    } else if (this.props.values.numberOfArbitrators == "٣") {
      this.state.doc.text(
        "هيئة التحكيم مكونة من ثلاث (3) محكمين",
        125,
        reliefLine,
        "center"
      );
    }

    if (this.props.values.numberOfArbitrators == "١") {
      this.state.doc.text(
        `عملا بأحكام المادة )21( فقرة )1( من قواعد التحكيم، فإنه يجوز للأطراف  الاتفاق على تسمية المحكم الفرد خلال سبعة )7( أيام من تاريخ تبليغ -`,
        190,
        (reliefLine += 10),
        "right"
      );
      this.state.doc.text(
        `المحتكم ضده بطلب التحكيم، وفي حالة عدم اتفاق الأطراف على تسمية المحكم خلال ذلك الأجل، أو في حال رغب أحد الأطراف تكليف المركز`,
        190,
        (reliefLine += 5),
        "right"
      );

      this.state.doc.text(
        `.بتسمية المحكم الفرد، يقوم المركز بذلك خلال الأيام الخمسة)5( التالية، ويبلغ الأطراف به، مرفقا بسيرته الذاتية`,
        190,
        (reliefLine += 5),
        "right"
      );
    } else if (this.props.values.numberOfArbitrators == "٣") {
      this.state.doc.text(
        `عملا بأحكام المادة)21( فقرة )2( من قواعد التحكيم، تكون سلطة التسمية للأطراف بحسب اتفاقهم كأن يقوم كل طرف بتسمية محكما من`,
        190,
        (reliefLine += 10),
        "right"
      );
      this.state.doc.text(
        `طرفه ، ويمنح المركز مهلة سبعة )7( أيام المحكمين المعينين لتسمية المحكم المرشح لرئاسة هيئة التحكيم، وفي حال عدم اتفاقهما خلال تلك`,
        190,
        (reliefLine += 5),
        "right"
      );
      this.state.doc.text(
        `.المهلة يقوم المركز بتسمية رئيس هيئة التحكيم خلال خمسة)5( أيام، ويبلغ الأطراف وبقية المحكمين بتسميته`,
        190,
        (reliefLine += 5),
        "right"
      );
    }

    if (this.props.values.nominateArbitrator == "nominate") {
      if (reliefLine > 250) {
        this.state.doc.addPage();
        this.state.doc.rect(5, 5, 200, 285);
        reliefLine = 5;
        for (let i = 0; i < pageCount; i++) {
          const pageNo =
            this.state.doc.internal.getCurrentPageInfo().pageNumber;
          this.state.doc.text(`${pageNo}`, 105, 294, "center");
        }
      }
      this.state.doc.text("الإسم الكامل -", 190, (reliefLine += 10), "right");

      this.state.doc.text(this.props.values.arbitratorName, 120, reliefLine);
      this.state.doc.text("الجنسية -", 190, (reliefLine += 5), "right");

      this.state.doc.text(
        this.props.values.arbitratorNationality,
        120,
        reliefLine
      );
      this.state.doc.text("العنوان مطلوب -", 190, (reliefLine += 5), "right");

      reliefLine -= 5;
      const arbitratorAddressPro =
        this.props.values.arbitratorAddress.match(/.{1,65}/g);
      arbitratorAddressPro.map((inform) => {
        this.state.doc.text(inform, 120, (reliefLine += 5), "right");
      });
      this.state.doc.text("الصندوق البريدي -", 190, (reliefLine += 5), "right");

      this.state.doc.text(this.props.values.arbitratorPOBox, 120, reliefLine);
      this.state.doc.text("رقم الهات -", 190, (reliefLine += 5), "right");

      this.state.doc.text(this.props.values.arbitratorPhone, 120, reliefLine);
      this.state.doc.text("فاكس -", 190, (reliefLine += 5), "right");

      this.state.doc.text(this.props.values.arbitratorFax, 120, reliefLine);
      this.state.doc.text(
        "البريد الإكترونى -",
        169,
        (reliefLine += 5),
        "right"
      );
      this.state.doc.text(this.props.values.arbitratorEmail, 120, reliefLine);
    } else if (this.props.values.nominateArbitrator == "mandate") {
      this.state.doc.text(
        `.فإنني أفوض/ فإننا نفوض المركز لترشيح المحكم بالنيابة عني/ بالنيابة عنا للحكم في القضية -`,
        190,
        (reliefLine += 10),
        "right"
      );
    } else if (this.props.values.nominateArbitrator == "iicra") {
      this.state.doc.text(
        `.فإنني أطلب/ فإننا نطلب من المركز لتوصية بمرشح محكم مناسب لتسوية النزاع -`,
        190,
        (reliefLine += 10),
        "right"
      );
    }

    if (reliefLine > 260) {
      this.state.doc.addPage();
      this.state.doc.rect(5, 5, 200, 285);
      reliefLine = 5;
      for (let i = 0; i < pageCount; i++) {
        const pageNo = this.state.doc.internal.getCurrentPageInfo().pageNumber;
        this.state.doc.text(`${pageNo}`, 105, 294, "center");
      }
    }

    this.state.doc.setFontSize(17);
    this.state.doc.text("٥۔", 200, (reliefLine += 13), "right");

    this.state.doc.text(": اقتراحات أخرى", 195, reliefLine, "right");
    this.state.doc.line(166, (reliefLine += 2), 195, reliefLine);

    this.state.doc.setFontSize(12);
    this.state.doc.text(".أ", 195, (reliefLine += 10), "right");
    this.state.doc.text(":لغة التحكيم", 190, reliefLine, "right");
    this.state.doc.text(
      this.props.values.arbitrationLanguage,
      165,
      reliefLine,
      "right"
    );
    this.state.doc.text(".ب", 195, (reliefLine += 10), "right");
    this.state.doc.text(":مكان التحكيم", 190, reliefLine, "right");
    this.state.doc.text(
      this.props.values.placeOfArbitration,
      165,
      reliefLine,
      "right"
    );
    if (reliefLine > 265) {
      this.state.doc.addPage();
      this.state.doc.rect(5, 5, 200, 285);
      reliefLine = 5;
      for (let i = 0; i < pageCount; i++) {
        const pageNo = this.state.doc.internal.getCurrentPageInfo().pageNumber;
        this.state.doc.text(`${pageNo}`, 105, 294, "center");
      }
    }
    this.state.doc.text(".ج", 195, (reliefLine += 10), "right");
    this.state.doc.text(
      ":القانون الحاكم (القانون الواجب التطبيق (باستثناء البنود التي تتعارض مع أحكام الشريعة الإسلامية)",
      190,
      reliefLine,
      "right"
    );

    this.state.doc.text("-", 190, (reliefLine += 10), "right");
    reliefLine -= 5;
    const governingLawPro = this.props.values.governingLaw.match(/.{1,90}/g);
    governingLawPro.map((inform) => {
      this.state.doc.text(inform, 188, (reliefLine += 5), "right");
    });

    // this.state.doc.text(".د", 195, (reliefLine += 10), "right");

    if (this.props.values.otherRequests) {
      this.state.doc.text(".ه", 195, (reliefLine += 10), "right");
      this.state.doc.text(":طلب آخر", 190, reliefLine, "right");
      const requests = this.props.values.otherRequests.match(/.{1,90}/g);
      this.state.doc.text(requests, 190, (reliefLine += 5), "right");
    }

    if (reliefLine > 280) {
      this.state.doc.addPage();
      this.state.doc.rect(5, 5, 200, 285);
      reliefLine = 5;
      for (let i = 0; i < pageCount; i++) {
        const pageNo = this.state.doc.internal.getCurrentPageInfo().pageNumber;
        this.state.doc.text(`${pageNo}`, 105, 294, "center");
      }
    }

    this.state.doc.text(
      ".وعليه، بناءً على ما ذكر أعلاه، يتقدم المحتكم بطلب سير إجراءات التحكيم لتسوية النزاع بموجب قواعد التحكيم المعتمدة لدى المركز",
      105,
      (reliefLine += 10),
      "center"
    );

    if (reliefLine > 260) {
      this.state.doc.addPage();
      this.state.doc.rect(5, 5, 200, 285);
      reliefLine = 5;
      for (let i = 0; i < pageCount; i++) {
        const pageNo = this.state.doc.internal.getCurrentPageInfo().pageNumber;
        this.state.doc.text(`${pageNo}`, 105, 294, "center");
      }
    }
    this.state.doc.setFontSize(17);
    this.state.doc.text("٦۔", 200, (reliefLine += 10), "right");

    this.state.doc.text(": تعهدات", 195, reliefLine, "right");
    this.state.doc.line(182, (reliefLine += 2), 195, reliefLine);

    if (reliefLine > 270) {
      this.state.doc.addPage();
      this.state.doc.rect(5, 5, 200, 285);
      reliefLine = 5;
      for (let i = 0; i < pageCount; i++) {
        const pageNo = this.state.doc.internal.getCurrentPageInfo().pageNumber;
        this.state.doc.text(`${pageNo}`, 105, 294, "center");
      }
    }
    this.state.doc.setFontSize(12);
    this.state.doc.text(
      "المعلومات الواردة هنا، وأي مرفقات ، صحيحة ودقيقة على حد علمي - واعتقادي. وإذا طرأ أي تغيير على المعلومات المقدمة، فإني أتعهد بإخطار -",
      190,
      (reliefLine += 10),
      "right"
    );
    this.state.doc.text(".المركز على الفور", 188, (reliefLine += 5), "right");
    this.state.doc.text(
      ".بمقتضى هذا الطلب، أتعهد بفض النزاع الماثل لدى المركز وفق - قواعده دون أي اعتراض أو مماطلة -",
      190,
      (reliefLine += 5),
      "right"
    );
    if (reliefLine > 270) {
      this.state.doc.addPage();
      this.state.doc.rect(5, 5, 200, 285);
      reliefLine = 5;
      for (let i = 0; i < pageCount; i++) {
        const pageNo = this.state.doc.internal.getCurrentPageInfo().pageNumber;
        this.state.doc.text(`${pageNo}`, 105, 294, "center");
      }
    }
    this.state.doc.text(
      ".سأقوم بسداد رسوم تسجيل الدعوى التحكيمية ونفقات التحكيمية التي يحددها المركز بمجرد قبول الطلب -",
      190,
      (reliefLine += 5),
      "right"
    );

    this.state.doc.text(
      "لغايات التواصل والإبلاغ في الدعوى التحكيمية الماثلة، أقر باستخدام البريد الإلكتروني ومنصة التحكيم الخاصة بالمركز إضافة إلى أي وسائل -",
      190,
      (reliefLine += 5),
      "right"
    );
    this.state.doc.text(
      ".تبليغ أخرى يعتمدها الركز",
      188,
      (reliefLine += 5),
      "right"
    );
    if (reliefLine > 270) {
      this.state.doc.addPage();
      this.state.doc.rect(5, 5, 200, 285);
      reliefLine = 5;
      for (let i = 0; i < pageCount; i++) {
        const pageNo = this.state.doc.internal.getCurrentPageInfo().pageNumber;
        this.state.doc.text(`${pageNo}`, 105, 294, "center");
      }
    }

    this.state.doc.text(
      ".أسمح للمركز باستخدام المعلومات المقدمة في هذا النموذج لأغراض السير في إجراءات التحكيم -",
      190,
      (reliefLine += 5),
      "right"
    );
    if (reliefLine > 270) {
      this.state.doc.addPage();
      this.state.doc.rect(5, 5, 200, 285);
      reliefLine = 5;
      for (let i = 0; i < pageCount; i++) {
        const pageNo = this.state.doc.internal.getCurrentPageInfo().pageNumber;
        this.state.doc.text(`${pageNo}`, 105, 294, "center");
      }
    }
    this.state.doc.text(
      ".أؤكد بأنني قمت بتحميل العقد موضوع النزاع بما في ذلك شرط التحكيم أو مشارطة التحكيم -",
      190,
      (reliefLine += 5),
      "right"
    );

    // this.state.doc.text(
    //   ".سيتلقى الطرفان رسالة رسمية لبدء إجراءات هذه القضية بمجرد استيفاء جميع المتطلبات الأساسية الموضَّحة أعلاه",
    //   190,
    //   (reliefLine += 10),
    //   "right"
    // );

    if (reliefLine > 250) {
      this.state.doc.addPage();
      this.state.doc.rect(5, 5, 200, 285);
      reliefLine = 5;
      for (let i = 0; i < pageCount; i++) {
        const pageNo = this.state.doc.internal.getCurrentPageInfo().pageNumber;
        this.state.doc.text(`${pageNo}`, 105, 294, "center");
      }
    }

    this.state.doc.setFontSize(14);
    this.state.doc.text(
      ":التوقيع الإلكتروني",
      193,
      (reliefLine += 15),
      "right"
    );
    this.state.doc.setFontSize(12);
    this.state.doc.text("إسم مقدم الطلب:", 190, (reliefLine += 10), "right");

    this.state.doc.text(
      this.props.values.eSignatureName,
      165,
      reliefLine,
      "right"
    );
    this.state.doc.text(
      ":التوقيع الإلكتروني",
      190,
      (reliefLine += 10),
      "right"
    );
    if (reliefLine > 255) {
      this.state.doc.addPage();
      this.state.doc.rect(5, 5, 200, 285);
      reliefLine = 5;
      for (let i = 0; i < pageCount; i++) {
        const pageNo = this.state.doc.internal.getCurrentPageInfo().pageNumber;
        this.state.doc.text(`${pageNo}`, 105, 294, "center");
      }
    }

    var signature = new Image();
    if (!this.state.digitalSignature) {
      var src = URL.createObjectURL(this.props.values.eSignature);
      signature.src = src;
    }

    this.state.doc.addImage(
      this.state.digitalSignature ? this.state.trimmedDataURL : signature,
      "jpeg",
      28,
      (reliefLine += 2),
      50,
      25
    );

    // this.state.doc.addImage(
    //   this.state.trimmedDataURL,
    //   "jpeg",
    //   135,
    //   (reliefLine += 2),
    //   50,
    //   25
    // );

    this.state.doc.setFontSize(14);
    this.state.doc.text(
      "تم تقديم الطلب بنجاح",
      105,
      (reliefLine += 30),
      "center"
    );
    this.state.doc.setFontSize(12);
    this.state.doc.text(
      ".تم تقديم الطلب بنجاح وسيقوم المركز تأكيد باستلام الطلب وإخطار طالب التحكيم بقبول الطلب أو برفضه في غضون ثلاثة )٣( أيام ",
      105,
      (reliefLine += 8),
      "center"
    );

    this.state.doc.save();
  };

  continue = (e) => {
    e.preventDefault();

    // document.dir == "ltr" ? this.sendPdfToServer() : this.genrate();

    const {
      claimantName,

      claimantNationality,
      claimantAddress,
      claimantPOBox,
      claimantPhone,
      claimantFax,
      claimantEmail,

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

      respondentName2,

      respondentNationality2,
      respondentAddress2,
      respondentPOBox2,
      respondentPhone2,
      respondentFax2,
      respondentEmail2,

      //
      natureOfDispute,
      valueOfDispute,
      recitals,
      legalGrounds,
      reliefSought,

      //
      arbitratorName,
      arbitratorNationality,
      arbitratorAddress,
      arbitratorPOBox,
      arbitratorPhone,
      arbitratorFax,
      arbitratorEmail,

      requestIicraArbitrator,
      mandateIicraArbitrator,

      arbitrationLanguage,
      governingLaw,
      placeOfArbitration,
      numberOfArbitrators,
      otherRequests,
      eSignatureName,

      //
      powerOfAttorney,
      disputeDocuments,
      arbitrationAgreement,
      cvOfArbitrator,
      eSignature,
    } = this.props.values;

    if (validator.isEmpty(eSignatureName) || eSignatureName == "") {
      Swal.fire({
        title:
          document.dir == "ltr"
            ? "The name of the Claimant as signatory is Missing"
            : "لا يوجد إسم المحتكم كموقع",
        icon: "info",
      });
    } else if (
      eSignature == null &&
      validator.isEmpty(this.state.trimmedDataURL)
    ) {
      Swal.fire({
        title:
          document.dir == "ltr" ? "Signature is Missing" : "لا يوجد التوقيع",
        icon: "info",
      });
    } else {
      // const pdf = this.state.doc.output("blob");
      document.dir == "ltr" ? this.sendPdfToServer() : this.genrate();

      const pdf = new File([this.state.doc.output("blob")], "test.pdf", {
        type: "application/pdf",
      });

      let formData = new FormData();

      formData.append("id", this.props.id);
      formData.append("claimantName", claimantName);
      formData.append("claimantUserName", claimantName);
      formData.append("claimantAddress", claimantAddress);
      formData.append("claimantEmail", claimantEmail);
      formData.append("claimantPOBox", claimantPOBox);
      formData.append("claimantNationality", claimantNationality);
      formData.append("claimantFax", claimantFax);
      formData.append("claimantPhone", claimantPhone);

      formData.append("claimantName2", claimantName2);
      formData.append("claimantUserName2", claimantName2);
      formData.append("claimantAddress2", claimantAddress2);
      formData.append("claimantEmail2", claimantEmail2);
      formData.append("claimantPOBox2", claimantPOBox2);
      formData.append("claimantNationality2", claimantNationality2);
      formData.append("claimantFax2", claimantFax2);
      formData.append("claimantPhone2", claimantPhone2);

      //

      formData.append(
        "legalAuthRepresentativeName",
        legalAuthRepresentativeName
      );
      formData.append("legalAuthFirmName", legalAuthFirmName);
      formData.append("legalAuthNationality", legalAuthNationality);
      formData.append("legalAuthAddress", legalAuthAddress);
      formData.append("legalAuthPOBox", legalAuthPOBox);
      formData.append("legalAuthPhone", legalAuthPhone);
      formData.append("legalAuthFax", legalAuthFax);
      formData.append("legalAuthEmail", legalAuthEmail);
      formData.append("legalAuthRegistration", legalAuthRegistration);

      formData.append(
        "legalAuthRepresentativeName2",
        legalAuthRepresentativeName2
      );
      formData.append("legalAuthFirmName2", legalAuthFirmName2);
      formData.append("legalAuthNationality2", legalAuthNationality2);
      formData.append("legalAuthAddress2", legalAuthAddress2);
      formData.append("legalAuthPOBox2", legalAuthPOBox2);
      formData.append("legalAuthPhone2", legalAuthPhone2);
      formData.append("legalAuthFax2", legalAuthFax2);
      formData.append("legalAuthEmail2", legalAuthEmail2);
      formData.append("legalAuthRegistration2", legalAuthRegistration2);

      //
      formData.append("respondentName", respondentName);
      formData.append("respondentUserName", respondentName);
      formData.append("respondentAddress", respondentAddress);
      formData.append("respondentEmail", respondentEmail);
      formData.append("respondentPOBox", respondentPOBox);
      formData.append("respondentNationality", respondentNationality);
      formData.append("respondentFax", respondentFax);
      formData.append("respondentPhone", respondentPhone);

      formData.append("respondentName2", respondentName2);
      formData.append("respondentUserName2", respondentName2);
      formData.append("respondentAddress2", respondentAddress2);
      formData.append("respondentEmail2", respondentEmail2);
      formData.append("respondentPOBox2", respondentPOBox2);
      formData.append("respondentNationality2", respondentNationality2);
      formData.append("respondentFax2", respondentFax2);
      formData.append("respondentPhone2", respondentPhone2);

      //
      formData.append("requestIicraArbitrator", requestIicraArbitrator);
      formData.append("mandateIicraArbitrator", mandateIicraArbitrator);

      formData.append("arbitratorName", arbitratorName);
      formData.append("arbitratorUserName", arbitratorName);
      formData.append("arbitratorAddress", arbitratorAddress);
      formData.append("arbitratorEmail", arbitratorEmail);
      formData.append("arbitratorPOBox", arbitratorPOBox);
      formData.append("arbitratorNationality", arbitratorNationality);
      formData.append("arbitratorFax", arbitratorFax);
      formData.append("arbitratorPhone", arbitratorPhone);

      //
      formData.append("arbitrationLanguage", arbitrationLanguage);
      formData.append("governingLaw", governingLaw);
      formData.append("placeOfArbitration", placeOfArbitration);
      formData.append("numberOfArbitrators", numberOfArbitrators);
      formData.append("otherRequests", otherRequests);
      formData.append("eSignatureName", eSignatureName);

      //
      formData.append("natureOfDispute", natureOfDispute);
      formData.append("valueOfDispute", valueOfDispute);
      formData.append("recitals", recitals);
      formData.append("legalGrounds", legalGrounds);
      formData.append("reliefSought", reliefSought);

      formData.append("powerOfAttorney", powerOfAttorney);
      formData.append("disputeDocuments", disputeDocuments);
      formData.append("arbitrationAgreement", arbitrationAgreement);
      formData.append("cvOfArbitrator", cvOfArbitrator);
      formData.append("eSignature", this.state.trimmedDataURL);
      // formData.append("autoPdf", pdf);
      formData.append("autoPdf", pdf);
      formData.append("language", document.dir == "ltr" ? "ltr" : "rtl");

      this.setState({
        loading: true,
      });

      if (window.location.pathname == "/respondent/reviewDetails") {
        axios
          .post(`${this.baseURL}/form/newCaseResponse`, formData)
          .then(() => {
            this.setState({
              loading: false,
            });
            this.props.nextStep();
          })
          .catch((err) => {
            this.setState({
              loading: false,
            });
            Swal.fire({ title: "Something went Wrong", icon: "error" });
            console.log(err.response);
          });
      } else {
        axios
          .post(`${this.baseURL}/form/newCase`, formData)
          .then(() => {
            this.setState({
              loading: false,
            });
            this.props.nextStep();
          })
          .then(() =>
            axios.post(`${this.baseURL}/email/accepted_`, claimantEmail)
          )
          .catch((err) => {
            this.setState({
              loading: false,
            });
            Swal.fire({ title: "Something went Wrong", icon: "error" });
          });
      }
    }
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

    // const { handleFileChange } = this.props;
  };

  render() {
    const labelStyle = {
      float: document.dir == "ltr" ? "left" : "right",
    };

    const { values, handleChange, handleFileChange } = this.props;

    return (
      <Container style={styles.formUserContainer} className="shadow">
        <Modal isOpen={this.state.loading} style={{ top: "20vh" }}>
          <ModalBody style={{ textAlign: "center", padding: "25vh" }}>
            <HashLoader
              color="green"
              loading={this.state.loading}
              // css={override}
              size={100}
            />
          </ModalBody>
        </Modal>
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
                      lineHeight: "45px",
                      background: "green",
                      borderRadius: "50%",
                      padding: "2vh 12%",
                    }}
                  >
                    <img
                      src={tick}
                      style={{ height: "3vh", width: "3vh" }}
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
                      lineHeight: "45px",
                      background: "green",
                      borderRadius: "50%",
                      padding: "2vh 12%",
                    }}
                  >
                    <img
                      src={tick}
                      style={{ height: "3vh", width: "3vh" }}
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
                      lineHeight: "45px",
                      background: "green",
                      borderRadius: "50%",
                      padding: "2vh 12%",
                    }}
                  >
                    <img
                      src={tick}
                      style={{ height: "3vh", width: "3vh" }}
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
                      lineHeight: "45px",
                      background: "green",
                      borderRadius: "50%",
                      padding: "2vh 12%",
                    }}
                  >
                    <img
                      src={tick}
                      style={{ height: "3vh", width: "3vh" }}
                      alt="step finished"
                    />
                  </li>
                </Col>
                <Col>
                  <li
                    id="suggestion"
                    style={{
                      display: "inline",
                      fontSize: "15px",
                      lineHeight: "45px",
                      background: "green",
                      borderRadius: "50%",
                      padding: "2vh 12%",
                    }}
                  >
                    <img
                      src={tick}
                      style={{ height: "3vh", width: "3vh" }}
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
                      lineHeight: "45px",
                      background: "green",
                      borderRadius: "50%",
                      padding: "2vh 12%",
                    }}
                  >
                    <img
                      src={tick}
                      style={{ height: "3vh", width: "3vh" }}
                      alt="step finished"
                    />
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
                      background: "green",
                      borderRadius: "50%",
                      padding: "2vh 17%",
                    }}
                  >
                    <strong>{document.dir == "ltr" ? "7" : "٧"}</strong>
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
        <h6 style={styles.center}>
          {document.dir == "ltr" ? "E-Signature" : "التوقيع الإلكتروني"}
        </h6>
        <Card style={styles.cardBg}>
          <CardBody>
            <Form>
              <Row style={styles.top}>
                <Col xl={12} lg={12} md={12} sm={12}>
                  <FormGroup>
                    <Label style={labelStyle} for="eSignatureName">
                      {document.dir == "ltr"
                        ? "Respectfully Submitted by: (Name)"
                        : "مقدم باحترام من"}
                    </Label>
                    {this.state.alertESignatureName ? (
                      <span style={styles.warning}> name is required</span>
                    ) : (
                      <span style={styles.red}> *</span>
                    )}
                    <Input
                      type="text"
                      name="eSignatureName"
                      id="eSignatureName"
                      onChange={handleChange("eSignatureName")}
                      defaultValue={values.eSignatureName}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup style={labelStyle}>
                    <Label
                      for="eSignature"
                      className="mr-3"
                      onClick={this.trim}
                    >
                      {document.dir == "ltr" ? "E-Sign" : "التوقيع الإلكتروني"}
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
                <Col>
                  <FormGroup>
                    <div
                      style={{
                        textAlign: document.dir == "ltr" ? "left" : "right",
                      }}
                    >
                      <Label className="text text-primary">
                        <h6
                          onClick={() =>
                            this.setState({
                              digitalSignature: !this.state.digitalSignature,
                            })
                          }
                          style={{ cursor: "pointer" }}
                        >
                          {document.dir == "ltr"
                            ? this.state.digitalSignature
                              ? `Upload a File`
                              : `Digital Signature Pad`
                            : this.state.digitalSignature
                            ? `تحميل ملف`
                            : `لوحة التوقيع الرقمي`}
                        </h6>
                      </Label>
                      <CustomInput
                        checked={this.state.digitalSignature}
                        type="switch"
                        value={this.state.digitalSignature}
                        id="digitalSignature"
                        onChange={() => {
                          this.setState({
                            digitalSignature: !this.state.digitalSignature,
                          });
                        }}
                      />
                    </div>
                  </FormGroup>
                </Col>
              </Row>

              {this.state.digitalSignature ? (
                <>
                  <Row className="mb-1">
                    <Col></Col>
                    <Col style={{ border: "2px solid green" }}>
                      <SignatureCanvas
                        penColor="blue"
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
                        <span style={styles.warning}>
                          e-Signature is required
                        </span>
                      ) : null}
                    </Col>{" "}
                    <Col></Col>
                  </Row>
                  <Row style={{ float: "center" }}>
                    <Col></Col>
                    <Button
                      color="success"
                      className="mr-1 ml-1"
                      onClick={() => {
                        this.setState({
                          trimmedDataURL: this.sigPad
                            .getCanvas()
                            .toDataURL("image/png"),
                        });
                        Swal.fire({
                          title: "Signature Uploaded",
                          icon: "success",
                        });
                      }}
                    >
                      {document.dir == "ltr"
                        ? " Upload Signature"
                        : "يرجى إرفاق التوقيع"}
                    </Button>
                    <Button
                      color="danger"
                      className="mr-1 ml-1"
                      onClick={() => this.clearSig()}
                    >
                      {document.dir == "ltr"
                        ? "Clear Signature"
                        : "إمسح التوقيع"}
                    </Button>{" "}
                    <Col></Col>
                  </Row>
                </>
              ) : (
                <Row>
                  <Col xl={12} lg={12} md={12} sm={12}>
                    <FormGroup>
                      <CustomInput
                        id="eSignature"
                        name="eSignature"
                        style={{
                          overflow: "hidden",
                          backgroundColor: "white",
                          border: "none",
                        }}
                        type="file"
                        accept="image/jpeg, image/jpg, image/png, image/gif"
                        label={
                          document.dir == "ltr"
                            ? "Upload a File"
                            : "تحميل الملف"
                        }
                        type="file"
                        onChange={handleFileChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              )}

              {/* <Row className="mt-3">
                <Col xl={12} lg={12} md={12} sm={12}>
                  <Card>
                    <CardBody>
                      <FormGroup style={labelStyle}>
                        <Label>
                          {document.dir == "ltr"
                            ? `Pursuant to IICRA Rules, the registration fee is
                          non-refundable.`
                            : "وفقًا لقواعد المركز، إن رسوم التسجيل هي غير قابل للاسترداد."}
                        </Label>
                        <Label className="ml-1">
                          {document.dir == "ltr"
                            ? "Registration Fee : "
                            : "رسوم التسجيل: "}{" "}
                          <span
                            style={{
                              color: "blue",
                              fontWeight: "bolder",
                            }}
                          >
                            {document.dir == "ltr"
                              ? "USD 1000.00"
                              : " ١٠٠٠ دولار أمريكي"}
                          </span>
                        </Label>
                      </FormGroup>
                    </CardBody>
                  </Card>
                </Col>
              </Row> */}
              {/* <Row className="mt-2">
                <Col>
                  <Card>
                    <CardBody> {this.card()}</CardBody>
                  </Card>
                </Col>
              </Row> */}
              <Button style={styles.buttonBack} onClick={this.back}>
                {document.dir == "ltr" ? "Back" : "ارجع"}
              </Button>
              <Button style={styles.button} onClick={this.continue}>
                {document.dir == "ltr" ? "Submit" : "تقديم"}
              </Button>
            </Form>
          </CardBody>
          <Row>
            <Col style={styles.footer}>
              <a>
                {document.dir == "ltr" ? "Privacy Policy" : "سياسة الخصوصية"}
              </a>{" "}
              |{" "}
              <a>
                {document.dir == "ltr" ? "Report Abuse" : "إبلاغ عن الإساءات"}
              </a>
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
    cursor: "not-allowed",
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
