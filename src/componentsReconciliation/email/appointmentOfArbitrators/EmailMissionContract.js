import React, { useState } from "react";
import { Card, CardBody, CardHeader, Button, Container } from "reactstrap";
import axios from "axios";
import { jsPDF } from "jspdf";
import header from "../../../assets/letterHead.png";
import Header from "../containers/Header";
import SignatureCanvas from "react-signature-canvas";
import { getEnvironment } from "../../../config";

const EmailMissionContract = (props) => {
  const baseURL = getEnvironment().apiUrl;

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

  const pad = (num) => {
    if (num < 10) {
      return "00" + num;
    } else if (num > 9 && num < 100) {
      return "0" + num;
    } else return num;
  };

  const handleSend = (data) => {
    generatePdf();
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

    const pdf = state.doc.output("blob");
    formData.append("autoPdf", pdf);

    axios
      .post(`${baseURL}/formReconciliation/pdfMissionContract`, formData)
      .then((res) => alert("sent", res.data))
      .catch(() => console.log("error"));
  };

  const generatePdf = () => {
    const date = new Date();
    state.doc.rect(10, 10, 190, 275);
    state.doc.setFontSize(15);
    state.doc.text("Mission Contract", 87, 20);
    state.doc.setFontSize(10);
    state.doc.text(
      `This contract was approved on ${date.toDateString()}, between:`,
      20,
      30
    );
    state.doc.text(
      "1 - First Party: International Islamic Centre for Reconciliation and Arbitration 'IICRA' - an international non-profit",
      20,
      40
    );
    state.doc.text(
      "institution represented by Mr. Rami Sulaiman as the Chief Executive Officer. Herein referred as 'IICRA'",
      20,
      45
    );
    state.doc.text(
      "2 - The name of the Conciliator designated to reconcile between the two Parties to the dispute in this Case is/are:",
      20,
      55
    );
    state.doc.text("Conciliator Full Name: ", 30, 60);
    state.doc.text(props.location.state.arbitratorName, 100, 60);
    state.doc.text("Nationality", 30, 65);
    state.doc.text(props.location.state.arbitratorNationality, 100, 65);
    state.doc.text("Address", 30, 70);
    state.doc.text(props.location.state.arbitratorAddress, 100, 70);
    state.doc.text("Phone", 30, 75);
    state.doc.text(props.location.state.arbitratorPhone, 100, 75);
    state.doc.text("Email", 30, 80);
    state.doc.text(props.location.state.arbitratorEmail, 100, 80);
    state.doc.text("Herein referred as 'Conciliator'", 30, 85);

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
      "Whereas, the Conciliator was appointed by IICRA for the Conciliation between the two Parties in Case No.",
      20,
      125
    );
    state.doc.text(
      `REC${props.location.state.createdAt.split("-")[0]}-${pad(
        props.location.state.caseNumberRec
      )} and confirmed his acceptance and his capacity to take over this task.`,
      20,
      130
    );
    state.doc.text(
      "Whereas, the mission of the Conciliator shall be conducted according to IICRA Rules and Provisions with regards ",
      20,
      140
    );
    state.doc.text(
      "to this contract. The Conciliation process and all communications of the Conciliator, and orders thereof",
      20,
      145
    );
    state.doc.text(
      "shall be made in Arabic, English, or any other languages as may be agreed by the Parties and the Conciliator.",
      20,
      150
    );
    state.doc.text(
      "Meanwhile, the Final Agreement shall be issued in English language along with the translation in Arabic language.",
      20,
      155
    );
    state.doc.text("", 20, 160);
    state.doc.setFontSize(12);
    state.doc.text(
      "NOW, THEREFORE, THE PARTIES HERETO AGREE AS FOLLOWS:",
      20,
      170
    );

    state.doc.text("Article I: The Objective of Contracting", 20, 180);
    state.doc.setFontSize(10);
    state.doc.text(
      "The Conciliator undertakes to perform his task efficiently and professionally in order to resolve their disputes",
      25,
      185
    );
    state.doc.text(
      `between the two Parties amicably in Conciliation Case No.  REC${
        props.location.state.createdAt.split("-")[0]
      }-${pad(
        props.location.state.caseNumberRec
      )} before commencing the Conciliation`,
      20,
      190
    );
    state.doc.text(
      "process. The Conciliator shall consider and apply the applicable Rules, including the IICRA Rules in managing",
      20,
      195
    );
    state.doc.text("and reconciling this case.", 20, 200);
    state.doc.setFontSize(12);
    state.doc.text("Article II: Independence of the Conciliator", 20, 210);
    state.doc.setFontSize(10);
    state.doc.text(
      "The Conciliator during the course of Conciliation process confirms the following:",
      25,
      215
    );
    state.doc.text(
      "i. Perform his duty with due care, personally, independently, and impartially before taking up the task of",
      25,
      220
    );
    state.doc.text("Conciliator.", 28, 225);
    state.doc.text(
      "ii. Maintain this independence during the course of Conciliation process till the Final Agreement is issued.",
      25,
      230
    );
    state.doc.text(
      "iii. Maintain an equal distance from the Parties to the dispute with required transparency and professionalism.",
      25,
      235
    );
    state.doc.setFontSize(12);
    state.doc.text("Article III: Avoiding Procrastination", 20, 245);
    state.doc.setFontSize(10);
    state.doc.text(
      "IICRA aims at resolving the disputes with efficiency and professionalism. A large part of this commitment is",
      25,
      250
    );
    state.doc.text(
      "borne by the Conciliator who had to respect the deadlines for the Conciliation procedures including the time",
      20,
      255
    );
    state.doc.text(
      "limit in order to issue the Final Agreement or any extension thereof, in accordance with the related procedures.",
      20,
      260
    );

    state.doc.addPage();
    state.doc.rect(10, 10, 190, 275);
    state.doc.setFontSize(12);
    state.doc.text("Article IV: Confidentiality", 20, 20);
    state.doc.setFontSize(10);
    state.doc.text(
      "In conducting the settlement of dispute, the Conciliator strictly obliged to respect the secrecy adopted by ",
      25,
      25
    );
    state.doc.text(
      "IICRA in order to protect the two Parties to the dispute by maintaining the documentary date submitted to his/their",
      20,
      30
    );
    state.doc.text(
      "consideration during the settlement of the dispute until the Final Agreement is issued and agreed on. ",
      20,
      35
    );
    state.doc.text(
      "This commitment of confidentiality shall be maintained after the issuance of the Final Agreement as well. If",
      25,
      45
    );
    state.doc.text(
      "the need is required or sought to use the Final Agreement as jurisprudence, a prior permission emanating from",
      20,
      50
    );
    state.doc.text("IICRA is required.", 20, 55);

    state.doc.text(
      "The IICRA shall strictly maintain the confidentiality of the names (and identities) of the Conciliator (except for",
      25,
      65
    );
    state.doc.text(
      "the parties and their counsel) and it shall not divulge the terms of the Conciliator's appointment  contained in this ",
      20,
      70
    );
    state.doc.text(
      "Mission Contract to anyone or anybody without Conciliator's written permission, or except for any legal reason.",
      20,
      75
    );
    state.doc.text("", 20, 80);

    state.doc.setFontSize(12);
    state.doc.text("Article V: Obligations of the IICRA", 20, 90);
    state.doc.setFontSize(10);
    state.doc.text(
      "In order to achieve the purpose of this contract, the IICRA is committed to perform the followings:",
      25,
      95
    );
    state.doc.text(
      "i. The submission of necessary documentary proof and data for the task of the Conciliator as remitted by the ",
      25,
      100
    );
    state.doc.text("parties to IICRA within due date.", 28, 105);

    state.doc.text(
      "ii. Provide instruction and guidance for Conciliation procedure to directly communicate with the Conciliator.",
      25,
      110
    );
    state.doc.text(
      "iii. Provide a professional appropriate environment to the Conciliator through necessary facilities such as ",
      25,
      115
    );
    state.doc.text(
      "provision(s) of transportation and places of Meetings.",
      28,
      120
    );
    state.doc.text(
      "iv. Requiring the parties to pay the due amount to the Conciliator (as determined by IICRA according to its",
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
      "- Expenses of any expert/adviser engaged (if need be), by the Conciliator.",
      30,
      145
    );
    state.doc.text(
      "- Transportation and travel fees, accommodation and subsistence costs in relation to meetings.",
      30,
      150
    );
    state.doc.text(
      "- Office expenses such as photocopying, printing and courier.",
      30,
      155
    );
    state.doc.setFontSize(12);
    state.doc.text("Article VI: The Conciliator Fee", 20, 165);
    state.doc.setFontSize(10);
    state.doc.text(
      `The Conciliator's fee in Conciliation Case No.  REC${
        props.location.state.createdAt.split("-")[0]
      }-${pad(
        props.location.state.caseNumberRec
      )}  calculated based on IICRA schedule, and`,
      25,
      170
    );
    state.doc.text(
      "taking into consideration the neutral of case, the Conciliator's Fee fixed at AED/USD (Amount in words) as decided",
      20,
      175
    );
    state.doc.text(
      "by the Chief Executive Officer (CEO) in the light of IICRA's Rules. Taking into account that the aforementioned",
      20,
      180
    );
    state.doc.text("amount is subject to the Arbitral Proceeding.", 20, 185);

    state.doc.text(
      "As for the payment terms, IICRA shall pay 50% Conciliator's fees during the First Meeting, and the",
      25,
      195
    );
    state.doc.text(
      "additional 50% payment will be issued after the issuance of Final Agreement.",
      20,
      200
    );
    state.doc.text(
      "If a meeting is cancelled or adjourned without sufficient notice to the Conciliator, IICRA shall",
      25,
      210
    );
    state.doc.text(
      "compensate the Conciliator for his/her preparation time in connection with such meetings or hearings as may be",
      20,
      215
    );
    state.doc.text(
      "deemed appropriate. Any termination or cancellation occurs, IICRA shall pay 50% Conciliator's fee during the",
      20,
      220
    );

    state.doc.text(
      "First meeting and additional 25% for the final Conciliator's fee.",
      20,
      225
    );

    state.doc.setFontSize(12);
    state.doc.text("General Provisions:", 20, 235);
    state.doc.setFontSize(10);
    state.doc.text(
      "Article VII - The provisions of this agreement are enforceable once it's signed. If the Conciliator is subject",
      25,
      240
    );
    state.doc.text(
      "to objection (challenged) or dismissed (revoked) and all commitments are transferred to the substitute Conciliator,",
      20,
      245
    );
    state.doc.text(
      "including alternative financial liabilities where IICRA shall estimate the size of the effort made by the Conciliator.",
      20,
      250
    );
    state.doc.text(
      "A final settlement with the Conciliator will be made by a final decision of the Chief Executive Officer of IICRA.",
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
      "Article IX - Any letters and correspondence relevant to the task of the Conciliator shall be sent to the ",
      25,
      20
    );
    state.doc.text(
      "accredited address to each party as described as follows, or any amendment to this address as specified in the",
      20,
      25
    );
    state.doc.text("Minutes of Conciliation Meetings:", 20, 30);
    state.doc.text(
      "- International Islamic Centre for Reconciliation and Arbitration:",
      25,
      40
    );
    state.doc.text("P.O. Box: 182222 Dubai - UAE.", 30, 45);
    state.doc.text("E-mail: info@iicra.com", 30, 50);
    state.doc.text("Contact No. : +971 4 294 9292", 30, 55);
    state.doc.text("- Conciliator Name :", 25, 65);
    state.doc.text(props.location.state.arbitratorName, 100, 65);
    state.doc.text("Address :", 30, 70);
    state.doc.text(props.location.state.arbitratorAddress, 100, 70);
    state.doc.text("E-mail Address :", 30, 75);
    state.doc.text(props.location.state.arbitratorEmail, 100, 75);
    state.doc.text("Contact No. :", 30, 80);
    state.doc.text(props.location.state.arbitratorPhone, 100, 80);
    state.doc.text("E-Signature", 28, 95);
    state.doc.addImage(trimmedDataURL, "jpeg", 28, 100, 50, 24);
    state.doc.setFontSize(14);

    state.doc.text(
      "In witness whereof, the parties hereto have/ had to sign this contract on the date written above.",
      20,
      90
    );

    // state.doc.save();
  };

  const [trimmedDataURL, setTrimmedDataURL] = useState("");

  let sigPad = {};

  let clearSig = () => {
    sigPad.clear();
    console.log("on click:", this.state.trimmedDataURL);
  };

  let trim = () => {
    // setTrimmedDataURL(sigPad.toDataURL());
    setTrimmedDataURL(sigPad.getCanvas().toDataURL("image/png"));
  };

  return (
    <>
      <Header
        data={props.location.state}
        stepName="Nomination and Appointment of Arbitrator(s)"
        stepPathPrev="nomination"
        stepPath="nominateArb"
        name="Mission Contract of Conciliator "
      />
      <Container style={styles.formUserContainer} className="shadow-lg">
        <Card style={styles.cardBg}>
          <CardHeader style={styles.letterContainer}>
            <h6
              style={styles.center}
              onClick={() => {
                generatePdf();
                state.doc.save();
              }}
            >
              Mission Contract of Conciliator Case No:{" "}
              {`REC2020-${props.location.state.caseNumberRec}`}.
            </h6>
            <img style={styles.header} src={header} alt="header" />
          </CardHeader>
          <CardBody style={{ border: "2px solid green" }}>
            <p>
              This contract was approved on {Date.now()} in Dubai, between:{" "}
            </p>
            <p>
              <b>1 - First Party:</b> International Islamic Centre for
              Reconciliation and Arbitration "IICRA" - an international
              non-profit institution represented by Mr. Rami Sulaiman as the
              Chief Executive Officer. <br />
              Herein referred as “IICRA”
            </p>
            <p>
              <b>2 - Second Party:</b> The name of the Conciliator designated to
              reconcile between the two Parties to the dispute in this Case
              is/are as follows:
            </p>
            <p>
              Conciliator Name : {props.location.state.arbitratorName}
              <br />
              Nationality: {props.location.state.arbitratorNationality}
              <br />
              Address : {props.location.state.arbitratorAddress}
              <br />
              E-mail Address : {props.location.state.arbitratorEmail}
              <br />
              Contact No. : {props.location.state.arbitratorPhone}
              <br />
              Herein referred as “Arbitrator”
            </p>
            <h3 style={{ textAlign: "center" }}>Preamble</h3>
            <p>
              <b>Whereas,</b> the IICRA is an independent international
              non-profit organization dedicated to support the financial
              industry in general and Islamic financial industry in particular,
              through the performance of Arbitration and Reconciliation
              procedures according to its Rules.
            </p>
            <p>
              <b>Whereas,</b> the Conciliator was appointed by IICRA for the
              Conciliation between the two Parties in Case No{" "}
              {`REC2020-${props.location.state.caseNumberRec}`} and confirmed
              his acceptance and his capacity to take over this task.
            </p>
            <p>
              <b>Whereas,</b> the mission of the Conciliator shall be conducted
              according to IICRA Rules and Provisions with regards to this
              contract. The conciliation process and all communications of the
              Conciliator, and his orders shall be made in the English language
              or any other language as may be agreed by the two Parties and the
              Conciliator. Meanwhile, the Final Agreement shall be issued in
              English language along with the translation in Arabic language.
            </p>
            <h6>NOW, THEREFORE, THE PARTIES HERETO AGREE AS FOLLOWS:</h6>
            <p>
              <b>
                <u>Article I: The Objective of Contracting </u>
              </b>
            </p>
            <p>
              The Conciliator undertakes to perform his task efficiently and
              professionally in order to resolve their disputes between the two
              Parties amicably in Conciliation Case No.{" "}
              {`REC2020-${props.location.state.caseNumberRec}`} before
              commencing the Conciliation process. The Conciliator shall
              consider and apply the applicable Rules, including the IICRA Rules
              in managing and reconciling this case.
            </p>
            <p>
              <b>
                <u>Article II: Independence of the Conciliator</u>
              </b>
            </p>
            <p>The Conciliator confirms: </p>
            <p className="ml-3">
              i. Perform his duty with due care, personally, independently, and
              impartially before taking up the task of Conciliator.
              <br />
              ii. Maintain this independence during the course of Conciliation
              process until the Final Agreement is issued.
              <br />
              iii. Maintain an equal distance from the two Parties to the
              dispute with required transparency and professionalism.
            </p>
            <p>
              <b>
                <u>Article III: Avoiding Procrastination</u>
              </b>
            </p>
            <p>
              IICRA aims at resolving the disputes with efficiency and
              professionalism. A large part of this commitment is borne by the
              Conciliator who had to respect the deadlines for the Conciliation
              procedures including the time limit in order to issue the Final
              Agreement or any extension thereof, in accordance with the related
              procedures.
            </p>
            <p>
              <b>
                <u>Article IV: Confidentiality</u>
              </b>
              <p>
                In conducting the settlement of dispute, the Conciliator
                strictly obliged to respect the secrecy adopted by IICRA in
                order to protect the two Parties to the dispute by maintaining
                the documentary date submitted to his/their consideration during
                the settlement of the dispute until the Final Agreement is
                issued and agreed on.
              </p>
              <p>
                This commitment of confidentiality shall be maintained after the
                issuance of the Final Agreement as well. If the need is required
                or sought to use the Final Agreement as jurisprudence, a prior
                permission emanating from IICRA is required.
              </p>
              <p>
                The IICRA shall strictly maintain the confidentiality of the
                names (and identities) of the Conciliator (except for the
                parties and their counsel) and it shall not divulge the terms of
                the Conciliator’s appointment contained in this Mission Contract
                to anyone or anybody without Conciliator’s written permission,
                or except for any legal reason.
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
              i. The submission of necessary documentary proof and data for the
              task of the Conciliator as remitted by the parties to IICRA within
              due date.
              <br />
              ii. Provide instruction and guidance for Arbitration procedure to
              directly communicate with the Conciliator. <br />
              iii. Provide a professional appropriate environment to the
              Conciliator through necessary facilities such as provision(s) of
              transportation and places of hearings. <br />
              iv. Requiring the parties to pay the due amount to the Conciliator
              (as determined by IICRA according to its Rules and schedule of
              fees).
              <br /> v. According to IICRA Rules in particular for additional
              expenses, IICRA guarantees to shall pay the additional expenses
              are as follows.
              <br />
              <p className="ml-3">
                • Expenses of any expert/adviser engaged (if need be), by the
                Conciliator.
                <br /> • Transportation and travel fees, accommodation and
                subsistence costs in relation to meetings/hearings.
                <br /> • Office expenses such as photocopying, printing and
                courier.
              </p>
            </p>
            <p>
              <b>
                <u>Article VI: The Conciliator Fee</u>
              </b>
            </p>
            <p>
              The Conciliator’s fees in Conciliation Case No……….calculated based
              on IICRA schedule, and taking into consideration the neutral of
              case, the Conciliator’s Fees is fixed at 00,000 AED (………………………..
              Dirhams) as decided by Mr. Rami Sulaiman, the IICRA’s Chief
              Executive Officer in the light of IICRA’s Rules.
            </p>
            <p>
              As for the payment terms, IICRA shall pay the 50% Conciliator’s
              fees during the Preliminary meeting, and the additional 50%
              payment will be issued after the Final Agreement is issued.
            </p>
            <p>
              If a meeting or hearing is cancelled or adjourned without
              sufficient notice to the Conciliator, IICRA shall compensate the
              Conciliator for his preparation time in connection with such
              meetings or hearings as may be deemed appropriate. Any termination
              or cancellation occurs, IICRA shall pay 50% of the Conciliator’s
              fees during the First Meeting and additional 25% for the
              Conciliator’s fees.
            </p>
            <h6>
              <u>General Provisions:</u>
            </h6>
            <p>
              <b>Article VII</b> - The provisions of this agreement are
              enforceable once it is signed. In case the Conciliator is subject
              to objection (challenged) or dismissed (revoked) and all
              commitments are transferred to the substitute Conciliator,
              including alternative financial liabilities where IICRA shall
              estimate the size of the effort made by the Conciliator. A final
              settlement with the Conciliator will be made by a final decision
              of the Chief Executive Officer of IICRA.
            </p>
            <p>
              <b>Article VIII</b> - IICRA provides necessary clarifications to
              remove any ambiguity to be raised in this Contract, and these
              clarifications are explicit and binding.
            </p>
            <p>
              <b>Article IX</b> - Any letters and correspondence relevant to the
              task of the Conciliator shall be sent to the accredited address to
              each party as described as follows, or any amendment to this
              address as specified in the Minutes of Conciliation Meetings:
            </p>
            <p className="ml-3">
              • International Islamic Centre for Reconciliation and Arbitration:
              <br /> P.O. Box: 182222 Dubai - UAE.
              <br />
              E-mail: info@iicra.com <br />
              Contact No. : +971 4 294 9292{" "}
            </p>
            <p className="ml-3">
              • Conciliator Name : {props.location.state.arbitratorName}
              <br />
              Address : {props.location.state.arbitratorAddress}
              <br />
              E-mail Address : {props.location.state.arbitratorEmail}
              <br />
              Contact No. : {props.location.state.arbitratorPhone}
            </p>
            <p>
              Nominating a Rapporteur{" "}
              <span>
                <b style={{ color: "red" }}>*</b>
              </span>
              <br />
              Requesting IICRA to Appoint A Rapporteur{" "}
              <span>
                <b style={{ color: "red" }}>*</b>
              </span>
            </p>
            <p>
              In witness whereof, the parties hereto have/ had to sign this
              contract on the date written above.
            </p>

            <div>
              <SignatureCanvas
                penColor="red"
                backgroundColor="white"
                canvasProps={{
                  width: 400,
                  height: 200,
                  className: "sigCanvas",
                }}
                ref={(ref) => {
                  sigPad = ref;
                }}
              />
              <button
                onClick={() =>
                  setTrimmedDataURL(sigPad.getCanvas().toDataURL("image/png"))
                }
              >
                Add
              </button>
            </div>
            <Button
              onClick={() => {
                handleSend(props.location.state);
              }}
            >
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
    border: "none",
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
export default EmailMissionContract;
