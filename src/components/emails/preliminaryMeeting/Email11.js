import React, { useState } from "react";
import { Card, CardBody, CardHeader, Button, Container } from "reactstrap";
import axios from "axios";
import { jsPDF } from "jspdf";
import header from "../../../assets/letterHead.png";
import Swal from "sweetalert2";
import Header from "../containers/Header";
import { getEnvironment } from "../../../config";

const Email11 = (props) => {
  const baseURL = getEnvironment().apiUrl;

  const [state, setState] = useState({
    allCases: [],
    resEmail: "",
    claEmail: "",
    filingDate: "",
    notes: "",
    date: "",
    time: "",
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
    formData.append("date", state.date);
    formData.append("time", state.time);

    axios
      .post(`${baseURL}/email/nominateSoleArbitrator`, formData)
      .then(() => {
        Swal.fire({
          title: "SENT",
          icon: "success",
        });
        props.history.push({
          pathname: "/email/meeting",
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

  const pad = (num) => {
    if (num < 10) {
      return "00" + num;
    } else if (num > 9 && num < 100) {
      return "0" + num;
    } else return num;
  };

  return (
    <>
      <Header
        data={props.location.state}
        stepName="Preliminary Meeting"
        stepPathPrev="meeting"
        stepPath="preMeeting"
        name="Virtual Minutes of Preliminary Meeting - Sole Arbitrator"
      />
      <Container style={styles.formUserContainer} className="shadow-lg">
        <Card style={styles.cardBg}>
          <CardHeader style={styles.letterContainer}>
            <h6 style={styles.center} onClick={() => generatePdf()}>
              Minutes of Preliminary Meeting
            </h6>
          </CardHeader>
          <CardBody>
            <h5 style={{ textAlign: "center" }}>
              Arbitration Case No:{" "}
              {`ARB${props.location.state.createdAt.split("-")[0]}-${pad(
                props.location.state.caseNumber
              )} `}
            </h5>
            <br />
            <p>
              Preliminary Meeting,{" "}
              <input type="date" value={state.date} onChange={handleText} />{" "}
              &amp;{" "}
              <input type="time" value={state.time} onChange={handleText} />{" "}
              &amp; at IICRA – Dubai at IICRA – Dubai
            </p>
            <p>
              Claimant
              <br />
              Nationality
              <br />
              Address
              <br />
              E-mail Address
              <br />
              Contact No.
            </p>
            <p>
              • Claimant's Legal Representative(s)
              <br />
              Address
              <br />
              E-mail Address
              <br />
              Contact No.
            </p>
            <p>
              Respondent
              <br />
              Nationality
              <br />
              Address
              <br />
              E-mail Address
              <br />
              Contact No.
            </p>
            <p>
              • Respondent's Legal Representative(s)
              <br />
              Address
              <br />
              E-mail Address
              <br />
              Contact No.
            </p>
            <p>
              Sole Arbitrator:
              <br />• Name of Sole Arbitrator:
            </p>
            <p>1. The meeting started at (Time) via webinar. </p>
            <p>
              2. The attendees are:
              <br />• The Sole Arbitrator. •
              <br /> Claimant_____________________________________. •
              <br /> Respondent(s)_________________________________. •
              <br /> Rapporteur_________________.
            </p>
            <p>
              3. Claimant is legally represented by _____________ and Power of
              Attorney (PoA) from the Claimant represented by _____________has
              been provided by ______________Claimant’s
              Representative____________ and it was duly approved by the Sole
              Arbitrator.
            </p>
            <p>
              4. It is agreed that the following addresses are only the accepted
              addresses for all communications between the Sole Arbitrator,
              Parties and Rapporteur.
            </p>
            <p>The addresses are:</p>
            <p>
              • Sole Arbitrator:_________________ <br />
              Address:________________ <br />
              Email:_________________ <br />
              Contact No.:_________________
            </p>
            <p>
              • Claimant:_________________ <br />
              Address:________________ <br />
              Email:_________________ <br />
              Contact No.:_________________
            </p>
            <p>
              • Claimant’s Legal Representative:_________________ <br />
              Address:________________ <br />
              Email:_________________ <br />
              Contact No.:_________________
            </p>
            <p>
              Respondent:_________________ <br />
              Address:________________ <br />
              Email:_________________ <br />
              Contact No.:_________________
            </p>
            <p>
              • Respondent’s Legal Representative:_________________ <br />
              Address:________________ <br />
              Email:_________________ <br />
              Contact No.:_________________
            </p>
            <p>
              • Rapporteur:_________________ <br />
              Address:________________ <br />
              Email:_________________ <br />
              Contact No.:_________________
            </p>
            <p>
              5. IICRA has received the Request for Arbitration (RFA) submitted
              by the Claimant dated___________ and after reviewing the, IICRA
              accepted the RFA and filed the Case as Case no _____/ 2020.
            </p>
            <p>
              6. IICRA has sent the Request for Arbitration (RFA) to the
              addresses provided by the Claimant where it was received by
              Mr./Ms________Designation____________.
            </p>
            <p>
              7. The Attendees have confirmed that they are satisfied with the
              way the procedure was conducted and confirmed and they have no
              objections in this respect.
            </p>
            <p>
              8. Basically, it is recommended to communicate by e-mail and fax.
              The electronic emails from and to the addresses listed herein
              unless Sole Arbitrator is provided with new e-mail addresses are
              considered as part of this Arbitration Procedures.
            </p>
            <p>
              9. The Arbitration shall be conducted under the Rules of the
              International Islamic Centre for Reconciliation &amp; Arbitration
              (IICRA) as per the Arbitration Clause/Arbitration Agreement.
            </p>
            <p>
              10. The Sole Arbitrator at any time, may carry out assessment and
              order any party to produce necessary documents (electronic or
              original) within a specific period and proceedings.
            </p>
            <p>
              11. The party/parties must provide full details of their statement
              of claims, set offs as well as counterclaims if any by supporting
              documents.
            </p>
            <p>
              12. The Sole Arbitrator has prepared Draft Terms of Reference
              (TOR) and forwarded it to the Parties to receive their feedbacks
              and comments.
            </p>
            <p>
              13. The Party/Parties are requested to review and comment on the
              Draft Terms of Reference (ToR) (attached) and to provide brief of
              their statement of claim, counterclaims if any to be incorporated
              to the Terms of Reference (ToR).
            </p>
            <p>14. Summing up the Schedule of proceedings as follows:</p>
            <table style={{ border: "1px solid black" }}>
              <thead style={{ border: "1px solid black" }}>
                <tr>
                  <th style={{ border: "1px solid black", padding: "2px" }}>
                    S No.
                  </th>
                  <th style={{ border: "1px solid black", padding: "2px" }}>
                    ACTION
                  </th>
                  <th style={{ border: "1px solid black", padding: "2px" }}>
                    DESCRIPTION
                  </th>
                  <th style={{ border: "1px solid black", padding: "2px" }}>
                    DATE
                  </th>
                </tr>
              </thead>
              <tbody style={{ border: "1px solid black" }}>
                <tr>
                  <td style={{ border: "1px solid black", padding: "2px" }}>
                    01
                  </td>
                  <td style={{ border: "1px solid black", padding: "2px" }}>
                    The Claimant had to submit details
                  </td>
                  <td style={{ border: "1px solid black", padding: "2px" }}>
                    Documents advised by the Sole Arbitrator
                  </td>
                  <td style={{ border: "1px solid black", padding: "2px" }}>
                    {Date.now()}
                  </td>
                </tr>
                <tr>
                  <td style={{ border: "1px solid black", padding: "2px" }}>
                    02
                  </td>
                  <td style={{ border: "1px solid black", padding: "2px" }}>
                    Sole Arbitrator
                  </td>
                  <td style={{ border: "1px solid black", padding: "2px" }}>
                    Provided the parties the Draft Terms of Reference and
                    deadline for Respondents to submit their response to
                    Claimant’s submissions
                  </td>
                  <td style={{ border: "1px solid black", padding: "2px" }}>
                    {Date.now()}
                  </td>
                </tr>
                <tr>
                  <td style={{ border: "1px solid black", padding: "2px" }}>
                    04
                  </td>
                  <td style={{ border: "1px solid black", padding: "2px" }}>
                    RSole Arbitrator &amp; Both Parties
                  </td>
                  <td style={{ border: "1px solid black", padding: "2px" }}>
                    Main Hearing
                  </td>
                  <td style={{ border: "1px solid black", padding: "2px" }}>
                    {Date.now()}
                  </td>
                </tr>
              </tbody>
            </table>
            <p>
              N: B If either party wishes to introduce witnesses, it shall do so
              in line with the Rules and it is agreed that the witnesses shall
              be heard, and cross examined in the Main Hearing. Further, all
              witness’ statements shall be in Arabic/English/French. If a
              witness is not proficient in English, the party shall arrange a
              Sworn-in Certified Interpreter / Translator to attend the Main
              Hearing.
            </p>
            <h5 style={{ textAlign: "center" }}>Orders of Sole Arbitrator</h5>
            <p>
              <b> Order 01:</b> The Sole Arbitrator has decided to close the
              Preliminary meeting as it is and instructed the Rapporteur to
              provide this Minutes to the Respondents on the existing addresses
              provided by the Claimant.
            </p>
            <p>
              <b> Order 02:</b>The Sole Arbitrator instructed the parties to
              comply with the Schedule of the Proceedings as mentioned above in
              …………………………...
            </p>
            <p>
              <b> Order 03:</b>
              ___________________________________________________________________________________
              ___________________________________________________________________________________________________________________________________________________________________________________.
            </p>
            <p>
              The Sole Arbitrator closed the session and Meeting adjourned at
              (Time) and Minutes was signed by the Parties, Sole Arbitrator and
              Rapporteur.
            </p>
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
export default Email11;
