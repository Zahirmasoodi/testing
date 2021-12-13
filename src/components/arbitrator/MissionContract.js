import React, { useState } from "react";
import { Card, CardBody, CardHeader, Button, Container } from "reactstrap";
import axios from "axios";
import { jsPDF } from "jspdf";
import header from "../../assets/letterHead.png";
import { getEnvironment } from "../../config";

const MissionContract = (props) => {
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
      .post(`${baseURL}/email/nominateSoleArbitrator`, formData)
      .then(() => console.log("sent"))
      .catch(() => console.log("error"));
  };

  const generatePdf = () => {
    state.doc.rect(10, 10, 190, 275);
    state.doc.setFontSize(15);
    state.doc.text("Mission Contract", 87, 20);
    state.doc.setFontSize(10);
    state.doc.text("This contract was approved on (Date), between:", 20, 30);
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
      "2 - Second Party: A Sole Arbitrator / A Member of the Arbitral Tribunal, respectively:",
      20,
      55
    );
    state.doc.text("Arbitrator Full Name: ", 30, 60);
    state.doc.text("demo", 100, 60);
    state.doc.text("Nationality", 30, 65);
    state.doc.text("demo", 100, 65);
    state.doc.text("Address", 30, 70);
    state.doc.text("demo", 100, 70);
    state.doc.text("Phone", 30, 75);
    state.doc.text("demo", 100, 75);
    state.doc.text("Email", 30, 80);
    state.doc.text("demo", 100, 80);
    state.doc.text("Herein referred as 'Arbitrator'", 30, 85);

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

  return (
    <Container style={styles.formUserContainer} className="shadow-lg">
      <Card style={styles.cardBg}>
        <CardHeader style={styles.letterContainer}>
          <h3 style={styles.center} onClick={() => generatePdf()}>
            Mission Contract
          </h3>
          <img style={styles.header} src={header} alt="header" />
        </CardHeader>
        <CardBody>
          <p>This contract was approved on (Date), between: </p>
          <p>
            <b>1 - First Party:</b> International Islamic Centre for
            Reconciliation and Arbitration "IICRA" - an international non-profit
            institution represented by Mr. Rami Sulaiman as the Chief Executive
            Officer. Herein referred as “IICRA”
          </p>
          <p>
            <b>2 - Second Party:</b> A Sole Arbitrator/ A Member of the Arbitral
            Tribunal, respectively:
          </p>
          <p>
            Arbitrator Name
            <br />
            Nationality
            <br />
            Address
            <br />
            E-mail Address
            <br />
            Contact No.
            <br />
            Herein referred as “Arbitrator”
          </p>
          <h3 style={{ textAlign: "center" }}>Preamble</h3>
          <p>
            <b>Whereas,</b> the IICRA is an independent international non-profit
            organization dedicated to support the financial industry in general
            and Islamic financial industry in particular, through the
            performance of Arbitration and Reconciliation procedures according
            to its Rules.
          </p>
          <p>
            <b>Whereas,</b> the Arbitrator appointed for the Arbitration Case
            No. ______ confirmed, accepted with all capacity to take over the
            task.
          </p>
          <p>
            <b>Whereas,</b> the mission of the Arbitrator shall be conducted
            according to IICRA Rules and Provisions with regards to this
            contract. The Arbitral proceedings and all communications of the
            Sole Arbitrator or Arbitral Tribunal, and orders thereof shall be
            made in Arabic, English, or any other languages as may be agreed by
            the Parties and the Arbitrator. Meanwhile, the Final Award shall be
            issued in English language along with the translation in Arabic
            language.
          </p>
          <h6>NOW, THEREFORE, THE PARTIES HERETO AGREE AS FOLLOWS:</h6>
          <p>
            <b>
              <u>Article I: The Objective of Contracting </u>
            </b>
          </p>
          <p>
            The Arbitrator undertakes to assume its task efficiently and
            professionally to settle the dispute in Arbitration Case No.
            _______. The Arbitrator will consider and apply the applicable
            Rules, including the IICRA Rules in managing and adjudicating this
            case along with Professional, Shari’ah, Ethics and Code of Conduct
            for Arbitrators and Conditions of Registration for IICRA List of
            Arbitrators.
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
            iii. Maintain an equal distance from the parties to the conflict
            with required transparency and professionalism.
          </p>
          <p>
            <b>
              <u>Article III: Avoiding Procrastination</u>
            </b>
          </p>
          <p>
            The IICRA aims at resolving the disputes with efficiency and
            professionalism. A large part of this commitment is borne by the
            Arbitrator that had to respect the deadlines of Arbitration
            procedures including the time limit in order to issue the Award or
            any extension thereof, in accordance with the procedures related
            thereto.
          </p>
          <p>
            <b>
              <u>Article IV: Confidentiality</u>
            </b>
            <p>
              During the settlement of dispute, the Arbitrator is strictly
              obliged to respect secrecy adopted by IICRA in order to protect
              the parties by maintaining the documentary date submitted to its
              consideration during the settlement of the dispute until the Final
              Award is issued and executed.
            </p>
            <p>
              This commitment of confidentiality shall be maintained after the
              issuance of the Arbitration Award as well. If the need is required
              or is sought to use the Award as jurisprudence, a prior permission
              emanating from IICRA is required.
            </p>
            <p>
              The IICRA shall strictly maintain the confidentiality of the name
              (and identities) of the Arbitrator (except for the parties and
              their counsel) and it must not divulge the terms of the
              Arbitrator’s appointment contained in this Mission Contract to
              anyone without all the Arbitrator’s individual written permission,
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
            task of the Arbitrator as remitted by the parties to IICRA within
            due date.
            <br />
            ii. Provide instruction and guidance for Arbitration procedure to
            directly communicate with the Arbitrator. <br />
            iii. Provide a professional appropriate environment to the
            Arbitrator through necessary facilities such as provision(s) of
            transportation and places of hearings. <br />
            iv. Requiring the parties to pay the due amount to the Arbitrator
            (as determined by IICRA according to its Rules and schedule of
            fees).
            <br /> v. According to IICRA Rules in particular for additional
            expenses, IICRA guarantees to shall pay the additional expenses are
            as follows.
            <br />
            <p className="ml-3">
              • Expenses of any expert/adviser engaged (if need be), by the
              Arbitrator.
              <br /> • Transportation and travel fees, accommodation and
              subsistence costs in relation to meetings/hearings.
              <br /> • Office expenses such as photocopying, printing and
              courier.
            </p>
          </p>
          <p>
            <b>
              <u>Article VI: The Arbitrator Fee</u>
            </b>
          </p>
          <p>
            The Arbitrator fee in Arbitration Case No. _____ calculated based on
            IICRA schedule, and taking into consideration the neutral of case,
            the Arbitraor Fee fixed at AED/USD (Amount in words) as decided by
            the Chief Executive Officer (CEO) in the light of IICRA’s Rules.
            Taking into account that the aforementioned amount is subject to the
            Arbitral Proceeding.
          </p>
          <p>
            As for the payment terms, IICRA shall pay 50% Arbitrator fees during
            the Preliminary Meeting, and the additional 50% payment will be
            issued after the Final Award.
          </p>
          <p>
            If a meeting or hearing is cancelled or adjourned without sufficient
            notice to the Arbitrator, IICRA shall compensate the Arbitrator for
            his/her preparation time in connection with such meetings or
            hearings as may be deemed appropriate. Any termination or
            cancellation occurs, IICRA shall pay 50% Arbitrator fees during the
            Preliminary meeting and additional 25% for the final Arbitrator
            fees.
          </p>
          <h6>
            <u>General Provisions:</u>
          </h6>
          <p>
            <b>Article VII</b> - The provisions of this agreement are
            enforceable once it’s signed. If the Arbitrator is subject to
            objection (challenged) or dismissed (revoked) and all commitments
            are transferred to the substitute Arbitrator, including alternative
            financial liabilities where IICRA shall estimate the size of the
            effort made by the Arbitrator. A final settlement with the
            Arbitrator will be made by a final decision of the Chief Executive
            Officer of IICRA.
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
            • International Islamic Centre for Reconciliation and Arbitration:
            <br /> P.O. Box: 182222 Dubai - UAE.
            <br />
            E-mail: info@iicra.com <br />
            Contact No. : +971 4 294 9292{" "}
          </p>
          <p className="ml-3">
            • Arbitrator Name : <br />
            Address : <br />
            E-mail Address : <br />
            Contact No. :
          </p>
          <p>
            In witness whereof, the parties hereto have/ had to sign this
            contract on the date written above.
          </p>
          <Button onClick={() => handleSend(props.location.state)}>Send</Button>
        </CardBody>
      </Card>
    </Container>
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
export default MissionContract;
