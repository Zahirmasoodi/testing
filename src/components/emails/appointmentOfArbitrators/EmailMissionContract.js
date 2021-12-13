import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Container,
  Input,
  CustomInput,
  Row,
  Col,
  FormGroup,
} from "reactstrap";
import axios from "axios";
import { jsPDF } from "jspdf";
import header from "../../../assets/letterHead.png";
import Swal from "sweetalert2";
import Header from "../containers/Header";
import { getEnvironment } from "../../../config";
import SignatureCanvas from "react-signature-canvas";
import myFont from "../../form/jspdfArabic";
import font from "../../../Amiri-Bold-normal";
import stamp from "../../../assets/stamp.png";

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
  const [sign, setSign] = useState("");
  const [date, setDate] = useState("");

  const [arbitDetails, setArbitDetails] = useState({
    name: "",
    nationality: "",
    address: "",
    pOBox: "",
    phone: "",
    fax: "",
    email: "",
  });

  let today = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // const [rapporteur, setRapporteur] = useState();

  // const handleChange = (e) => {
  //   setState({ ...state, [e.target.name]: e.target.value });
  // };

  const handleChangeArb = (e) => {
    setArbitDetails({ ...arbitDetails, [e.target.name]: e.target.value });
  };

  const handleSend = (data) => {
    document.dir == "ltr" ? generatePdf() : generatePdfArabic();

    const pdf = new File([state.doc.output("blob")], "test.pdf", {
      type: "application/pdf",
    });

    const formData = new FormData();

    formData.append("email", props.location.state.claimantEmail);
    formData.append("autoPdf", pdf);

    axios
      .post(`${baseURL}/form/pdfMissionContract`, formData)
      .then(() => {
        Swal.fire({
          title: "SENT",
          icon: "success",
        });
        props.history.push({
          pathname: "/email/nominateArb",
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
      "1 - First Party: International Islamic Centre for Reconciliation and Arbitration 'IICRA' - an international non-profit",
      20,
      (lineCount += 10)
    );
    state.doc.text(
      "institution represented by Mr. Rami Sulaiman as the Chief Executive Officer. Herein referred as 'IICRA'",
      20,
      (lineCount += 5)
    );
    state.doc.text(
      "2 - Second Party: A Sole Arbitrator / A Member of the Arbitral Tribunal, respectively:",
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

    state.doc.setFontSize(15);
    state.doc.text("Preamble", 105, (lineCount += 10), "center");

    state.doc.setFontSize(10);
    state.doc.text(
      "Whereas, the IICRA is an independent international non-profit organization dedicated to support the financial",
      20,
      (lineCount += 10)
    );

    state.doc.text(
      "industry in general and Islamic financial industry in particular, through the performance of Arbitration and",
      20,
      (lineCount += 5)
    );
    state.doc.text(
      "Reconciliation procedures according to its Rules.",
      20,
      (lineCount += 5)
    );
    state.doc.text(
      `Whereas, the Arbitrator appointed for the Arbitration Case No. ARB${
        props.location.state.createdAt.split("-")[0]
      }${pad(props.location.state.caseNumber)} confirmed, accepted with all`,
      20,
      (lineCount += 10)
    );
    state.doc.text("capacity to take over the task", 20, (lineCount += 5));
    state.doc.text(
      "Whereas, the mission of the Arbitrator shall be conducted according to IICRA Rules and Provisions with regards ",
      20,
      (lineCount += 10)
    );
    state.doc.text(
      "o this contract. The Arbitral proceedings and all communications of the Sole Arbitrator or Arbitral Tribunal, ",
      20,
      (lineCount += 5)
    );
    state.doc.text(
      "nd orders thereof shall be made in Arabic, English, or any other languages as may be agreed by the Parties ",
      20,
      (lineCount += 5)
    );
    state.doc.text(
      "and the Arbitrator. Meanwhile, the Final Award shall be issued in English language along with the translation in",
      20,
      (lineCount += 5)
    );
    state.doc.text("Arabic language.", 20, (lineCount += 5));
    state.doc.setFontSize(12);
    state.doc.text(
      "NOW, THEREFORE, THE PARTIES HERETO AGREE AS FOLLOWS:",
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

  const generatePdfArabic = (data) => {
    // state.doc.addFileToVFS("MyFont.ttf", myFont);
    state.doc.addFileToVFS("MyFont.ttf", myFont);
    state.doc.addFont("MyFont.ttf", "MyFont", "normal");
    state.doc.addFileToVFS("MyFontBold.ttf", font);
    state.doc.addFont("MyFontBold.ttf", "MyFontBold", "normal");
    state.doc.setFont("MyFontBold");
    state.doc.rect(10, 10, 190, 275);
    let lineCount = 17;

    state.doc.setFontSize(11);
    state.doc.text("عقد مهمة محكم", 105, lineCount, "center");
    state.doc.line(93, (lineCount += 2), 117, lineCount);
    state.doc.setFont("MyFont");
    state.doc.setFontSize(10);

    const dateNow = new Date(date);
    state.doc.text(
      `:تم توقيع هذا العقد بتاريخ  ${dateNow.toLocaleDateString(
        "ar-EG",
        options
      )} في مقر المركز بدبي- الإمارات العربية المتحدة، بين كل من`,
      190,
      (lineCount += 6),
      "right"
    );
    state.doc.text(
      `١- الطرف الأول: المركز الإسلامي الدولي للصلح والتحكيم - مؤسسة دوليـة غير ربحية يمثله الرئيس التنفيذي - مقره الرئيسي في دبي. ويشار إليه فيما يلي بـ`,
      190,
      (lineCount += 9),
      "right"
    );
    state.doc.text(`"المركز".`, 187, (lineCount += 6), "right");
    // state.doc.text(
    //   `(مؤسسة دوليـة مستقلة، يمثله الرئيس التنفيذي - مقره الرئيسي في دبي. ويشار إليه فيما يلي بـ )المركز -`,
    //   190,
    //   (lineCount += 6),
    //   "right"
    // );
    state.doc.text(":  ٢- الطرف الثاني", 190, (lineCount += 9), "right");
    props.location.state.arbitrators.length > 0 &&
      props.location.state.arbitrators.map((arb) => {
        state.doc.text("إسم محكم فرد -", 188, (lineCount += 6), "right");
        state.doc.text(arb.name, 160, lineCount, "right");
        state.doc.text("الجنسية -", 188, (lineCount += 6), "right");
        state.doc.text(arb.nationality, 160, lineCount, "right");
        state.doc.text("العنوان -", 188, (lineCount += 6), "right");
        state.doc.text(arb.address, 160, lineCount, "right");
        state.doc.text("البريد الإلكتروني -", 188, (lineCount += 6), "right");
        state.doc.text(arb.email, 160, lineCount, "right");
        state.doc.text("رقم متحرك -", 188, (lineCount += 6), "right");
        state.doc.text(arb.phone, 160, lineCount, "right");
      });
    state.doc.text(
      `"ويشار إليه فيما يلي بـ "المحكم`,
      187,
      (lineCount += 6),
      "right"
    );

    // state.doc.setFontSize(15);
    state.doc.setFont("MyFontBold");
    state.doc.text("تمهـيــد", 105, (lineCount += 6), "center");
    state.doc.line(101, (lineCount += 2), 109, lineCount);
    // state.doc.setFontSize(10);
    state.doc.setFont("MyFont");
    state.doc.text(
      "حيث أن المركز مؤسسة دولية مستقلة غير ربحية تهدف إلى دعم الصناعة المالية بشكل عام والإسلامية منها بشكل خاص من خلال إدارة الدعاوى -",
      190,
      (lineCount += 9),
      "right"
    );

    state.doc.text(".التحكيمية وإدارة ملفات", 188, (lineCount += 6), "right");
    state.doc.text(
      `وقد تأكد المحكم من مدى أهليته القانونية لتولى ARB${
        props.location.state.createdAt.split("-")[0]
      }-${pad(
        props.location.state.caseNumber
      )} وحيث عُرض على المحكم بأن يكون محكمًا فرد في الدعوى التحكيمية رقم -`,
      190,
      (lineCount += 6),
      "right"
    );
    state.doc.text(".هذه المهمة", 188, (lineCount += 6), "right");
    state.doc.text(
      "وحيث يعد المحكم أحد المحكمين المعتمدين لدى المركز ضمن قوائم خبرائه ومحكميه ، إذ يتم الاستعانة به في فض النزاعات -",
      190,
      (lineCount += 6),
      "right"
    );
    state.doc.text(".وفق قواعد التحكيم والصلح", 188, (lineCount += 6), "right");
    // state.doc.setFontSize(15);
    state.doc.text(
      ":وبتلاقي إرادة الطرفين إيجابًا وقبولًا تم الاتفاق على ما يلي",
      190,
      (lineCount += 9),
      "right"
    );
    // state.doc.setFontSize(12);
    state.doc.setFont("MyFontBold");
    state.doc.text(
      "المادة الأولى: موضوع عقد المهمة ",
      105,
      (lineCount += 6),
      "center"
    );
    state.doc.line(84, (lineCount += 2), 125, lineCount);
    // state.doc.setFontSize(10);
    state.doc.setFont("MyFont");
    state.doc.text(
      `ARB${props.location.state.createdAt.split("-")[0]}-${pad(
        props.location.state.caseNumber
      )} :يقوم المحكم بالعمل بجد وفعالية سواء بمفرده أو في إطار هيئة التحكيم لفصل النزاع موضوع الدعوى التحكيمية رقم -`,
      190,
      (lineCount += 9),
      "right"
    );
    state.doc.text(
      ".ملتزماً بقواعد المركز، والتقيد بما جاء في هذا العقد، من أجل تحقيق العدالة",
      190,
      (lineCount += 6),
      "right"
    );
    // state.doc.setFontSize(12);
    state.doc.setFont("MyFontBold");
    state.doc.text(
      "المـادة الثانيـة : تعهدات المحكم",
      105,
      (lineCount += 9),
      "center"
    );
    state.doc.line(86, (lineCount += 2), 124, lineCount);
    // state.doc.setFontSize(10);
    state.doc.setFont("MyFont");
    state.doc.text(
      `١- يتعهد المحكم بشكل كامل وتام بقواعد المركز كما هي معتمدة بمرفقاتها وملاحقها بما فيها ميثاق عمل المحكم ، ويتعهد بتحمل كامل المسؤولية `,
      190,
      (lineCount += 9),
      "right"
    );
    state.doc.text(`.القانونية`, 187, (lineCount += 6), "right");

    state.doc.text(
      `٢- يعلن بأنه يوافق على التصرف كمحكم عملًا بقواعد التحكيم ، وميثاق عمل المحكمين ، وضوابط السلوك الأخلاقي والشرعي والمهني ويؤكد رغبته في`,
      190,
      (lineCount += 6),
      "right"
    );
    state.doc.text(
      `أداء مهمته مقابل الأتعاب المحدودة من قبل المركز إضافة إلى ذلك ، يؤكد، على صحة المعلومات الخاصة به، وأنه بإمكانه تخصيص الوقت اللازم`,
      187,
      (lineCount += 6),
      "right"
    );
    state.doc.text(
      `.لسير إجراءات التحكيم في الدعوى التحكيمية الماثلة بجدية وكفاءة ووفقًا للآجال الزمنية الواردة في قواعد التحكيم`,
      187,
      (lineCount += 6),
      "right"
    );
    state.doc.text(
      `".٣- يقر بأنه لا يوافق على التصرف كمحكم في الدعوى التحكيمية موضوع النزاع. "إذا كنت ترغب في توضيح الأسباب ، يرجى التوضيح في ورقة منفصلة`,
      190,
      (lineCount += 6),
      "right"
    );
    state.doc.text(
      `٤- يقر بأن يكون محايدًا ومستقلًا عن كل طرف من الأطراف ، ويعتزم على حد علمه أن يظل كذلك ، لا توجد ظروف ، في الماضي أو الحاضر من`,
      190,
      (lineCount += 6),
      "right"
    );
    state.doc.text(
      `المحتمل أن تثير شكوكًا لها ما يبررها بشأن حياده أو استقلاليته. ويتعهّد هنا بأن يبلِّغ الأطراف والمحكّمين الآخرين على وجه السرعة بأي علاقات أو`,
      187,
      (lineCount += 6),
      "right"
    );
    state.doc.text(
      `.ظروف أخرى من هذا القبيل قد يفطن إليها لاحقا أثناء إجراءات التحكيم`,
      187,
      (lineCount += 6),
      "right"
    );
    state.doc.text(
      `٥- يؤكد بأننه سيقوم بالتقيد بالآجال الزمنية المنصوص عليها في قواعد التحكيم لدى المركزمن خلال معالجة الدعوى التحكيمية والسير في إجراءات`,
      190,
      (lineCount += 6),
      "right"
    );
    state.doc.text(
      `.التحكيم بجدية وسرعة وكفاءة، مع مراعاة أي مهل وتمديدات عملًا بقواعد التحكيم`,
      187,
      (lineCount += 6),
      "right"
    );
    // state.doc.setFontSize(12);
    state.doc.setFont("MyFontBold");
    state.doc.text(
      "المـادة الثـالثـة : التزامـات المركـز",
      105,
      (lineCount += 9),
      "center"
    );
    state.doc.line(86, (lineCount += 2), 123, lineCount);
    state.doc.setFont("MyFont");
    // state.doc.setFontSize(10);
    state.doc.text(
      ":يلتزم المركز في سبيل تحقيق الغرض من هذا العقد بما يلي -",
      190,
      (lineCount += 9),
      "right"
    );
    state.doc.text(
      ".١. تقديم الوثائق والبيانات اللازمة لعمل المحكم والتي يحصل عليها من قبل أطراف التحكيم وذلك بالسرعة والمهنية المطلوبة ",
      188,
      (lineCount += 6),
      "right"
    );
    state.doc.text(
      `٢. تقديم تعليمات إرشادية وأخرى إلزامية للمحكم حول إجراءات التحكيم وآجاله التنظيمية وذلك بشكل مباشر أو من خلال هيئة التحكيم`,
      188,
      (lineCount += 6),
      "right"
    );
    state.doc.text(`التي يكون عضواً فيها.`, 186, (lineCount += 6), "right");

    // state.doc.setFontSize(12);
    state.doc.addPage();
    state.doc.rect(10, 10, 190, 275);
    lineCount = 10;
    state.doc.text(
      "٣. توفير البيئة المهنية الملائمة للمحكم من خلال توفير الآليات والإمكانيات اللازمة كتوفير وسائل التنقل وأماكن عقد الجلسات أو من خلال المنصة",
      188,
      (lineCount += 6),
      "right"
    );
    state.doc.text(".الإلكترونية للمركز", 186, (lineCount += 6), "right");

    state.doc.text(
      ".٤. مطالبة الأطراف بسداد المبالغ المالية المتوجبة لأمين سر هيئة التحكيم نظير أتعابه والتي يحددها المركز وفق جدول سداد نفقات التحكيم",
      188,
      (lineCount += 6),
      "right"
    );
    state.doc.text(
      ":٥. وفقًا لقواعد المركز الخاصة بالنفقات الإضافية، يضمن المركز دفع النفقات الإضافية المعززة بفواتير وذلك على النحو التالي",
      188,
      (lineCount += 6),
      "right"
    );
    state.doc.text(
      ".أ. الرسوم والنفقات المهنية لأي خبير أو مستشار تم تعيينه )إذا دعت الحاجة( من قبل المحكم الفرد ",
      186,
      (lineCount += 6),
      "right"
    );

    state.doc.text(
      ".ب. نفقات النقل والسفر وتكاليف الإقامة الخاصة بالاجتماعات وجلسات الاستماع",
      186,
      (lineCount += 6),
      "right"
    );
    state.doc.text(
      ".ج. مصاريف المكتب مثل نسخ التصوير وصندوق البريد",
      186,
      (lineCount += 6),
      "right"
    );
    state.doc.text("صفحة: 1", 10, 290);
    state.doc.setFont("MyFontBold");
    state.doc.text(
      "المـادة الرابعــــــة: أتعاب المحكم ",
      105,
      (lineCount += 9),
      "center"
    );
    state.doc.line(87, (lineCount += 2), 122, lineCount);
    state.doc.setFont("MyFont");
    // state.doc.setFontSize(10);

    state.doc.text(
      `على أساس جدول نفقات التحكيم المعتمدة لدى المركز، حيث قدر  ARB${
        props.location.state.createdAt.split("-")[0]
      }-${pad(
        props.location.state.caseNumber
      )} ١. يتم احتساب رسوم المحكم في الدعوى التحكيمية رقم`,
      190,
      (lineCount += 9),
      "right"
    );
    state.doc.text(
      `المركز أتعاب المحكم الفرد بمبلغ قدره........دولارًا أمريكيًا )المبلغ بالكلمات( في ضوء جدول أتعاب المحكمين مع الأخذ في عين الاعتبار أن نفقات`,
      188,
      (lineCount += 6),
      "right"
    );
    state.doc.text(
      `.أتعاب المحكم تخضع لسير إجراءات التحكيم`,
      188,
      (lineCount += 6),
      "right"
    );
    // state.doc.text("يخضع لسير إجراءات التحكيم", 190, (lineCount += 6), "right");
    state.doc.text(
      "٢. بالنسبة لشروط وأحكام سداد أتعاب المحكم الفرد، يتعين على المركز سداد أتعاب المحكم الفرد بنسبة 50٪ خلال الاجتماع التمهيدي، ويتم سداد",
      190,
      (lineCount += 6),
      "right"
    );
    state.doc.text(
      ".نسبة 50% المتبقية بعد إصدار الحكم النهائي وانتهاء فترة التصحيح والتفسير",
      188,
      (lineCount += 6),
      "right"
    );

    // state.doc.setFontSize(12);
    state.doc.setFont("MyFontBold");
    state.doc.text(
      "المـادة الخامسة: جزاءات احترازية",
      105,
      (lineCount += 9),
      "center"
    );
    state.doc.line(85, (lineCount += 2), 125, lineCount);
    // state.doc.setFontSize(10);
    state.doc.setFont("MyFont");

    state.doc.text(
      "في حال تجاوز المحكم حدود مهمته ، أو لم يتقيد ببنود هذا العقد وخاصة تلك الإلتزامات التي تؤثر سلباً على العملية التحكيمية، وتسبب بضرر عن سوء -",
      190,
      (lineCount += 6),
      "right"
    );
    state.doc.text(
      "نية منه لأي من أطراف التحكيم أو للمركز بشكل مباشر أو غير مباشر، فيحق للمركز استرجاع كافة المبالغ المالية المدفوعة له وحرمانه من تلك التي لم",
      188,
      (lineCount += 6),
      "right"
    );
    state.doc.text(
      ".تدفع بعد، كما يحق للمركز مسائلة المحكم مدنياً وجزائياً عبر ملاحقته القضائية لجبر أي تعدي قد يحدث من قبله وبسوء نية",
      190,
      (lineCount += 6),
      "right"
    );

    // state.doc.setFontSize(15);
    state.doc.setFont("MyFontBold");
    state.doc.text(`أحكــام عامــة:`, 105, (lineCount += 9), "center");
    // state.doc.setFontSize(12);
    state.doc.text(
      "المـادة السادسة: أحكــام عامــة",
      105,
      (lineCount += 6),
      "center"
    );
    state.doc.line(88, (lineCount += 2), 122, lineCount);
    // state.doc.setFontSize(10);
    state.doc.setFont("MyFont");

    state.doc.text(
      "تسري أحكام هذا العقد بمجرد توقيعه ، ويستمر العمل بموجبه لحين صدور حكم التحكيم النهائي ، وفي حال تم رد المحكم أو عزله تنتقل إلى المحكم -",
      190,
      (lineCount += 9),
      "right"
    );
    state.doc.text(
      ".البديل الإلتزامات المالية حيث يقدر المركز حجم الجهد الذي بذله المحكم ويتم التسوية معه بقرار نهائي من قبل المركز",
      188,
      (lineCount += 6),
      "right"
    );

    // state.doc.setFontSize(12);
    state.doc.setFont("MyFontBold");
    state.doc.text("المـادة السابعة", 105, (lineCount += 9), "center");
    state.doc.line(96, (lineCount += 2), 114, lineCount);
    // state.doc.setFontSize(10);
    state.doc.setFont("MyFont");
    state.doc.text(
      ".يقدم المركز التوضيحات اللازمة لإزالة أي غموض قد يثيره هذا العقد، وعلى أن تكون تلك التوضيحات صريحة وملزمة -",
      190,
      (lineCount += 9),
      "right"
    );
    // state.doc.setFontSize(12);
    state.doc.setFont("MyFontBold");
    state.doc.text("المـادة الثامنة", 105, (lineCount += 9), "center");
    state.doc.line(97, (lineCount += 2), 114, lineCount);
    // state.doc.setFontSize(10);
    state.doc.setFont("MyFont");

    state.doc.text(
      ":ترسل الخطابات والمراسلات ذات الشأن بمهمة المحكم الفرد إلى المقر المعتمد لدى كل طرف كما هو موضح كالآتي -",
      190,
      (lineCount += 9),
      "right"
    );
    // state.doc.setFontSize(10);
    state.doc.setFont("MyFontBold");
    state.doc.text("توقيع الأطراف", 105, (lineCount += 9), "center");
    state.doc.line(95, (lineCount += 2), 114, lineCount);
    state.doc.setFont("MyFont");
    state.doc.text(
      "المركز الإسلامي الدولي للصلح والتحكيم -",
      190,
      (lineCount += 6),
      "right"
    );

    state.doc.text("+97142949292 - تليفون -", 188, (lineCount += 6), "right");
    state.doc.text("+97142959540 - فاكس -", 188, (lineCount += 6), "right");
    state.doc.text(
      "info@iicra.com :البريد الإلكتروني -",
      188,
      (lineCount += 6),
      "right"
    );
    state.doc.text(
      "ص.ب: 182222  دبـي – الإمارات العربية المتحدة -",
      188,
      (lineCount += 6),
      "right"
    );
    state.doc.addImage(stamp, "jpeg", 70, 210, 50, 24);
    // state.doc.addImage(stampSign, "jpeg", 50, 215, 50, 24);

    state.doc.text("المحكم/ الأستاذ -", 188, (lineCount += 9), "right");

    // state.doc.text("E-Signature", 28, (lineCount += 5));
    var signature = new Image();
    if (sign) {
      var src = URL.createObjectURL(sign);
      signature.src = src;
    }
    state.doc.addImage(
      sign ? signature : "No Sign Detected",
      "jpeg",
      70,
      (lineCount += 5),
      50,
      24
    );

    lineCount -= 5;

    props.location.state.arbitrators.length > 0 &&
      props.location.state.arbitrators.map((arb) => {
        state.doc.text("إسم محكم فرد -", 188, (lineCount += 6), "right");
        state.doc.text(arb.name, 160, lineCount, "right");
        state.doc.text("الجنسية -", 188, (lineCount += 6), "right");
        state.doc.text(arb.nationality, 160, lineCount, "right");
        state.doc.text("العنوان -", 188, (lineCount += 6), "right");
        state.doc.text(arb.address, 160, lineCount, "right");
        state.doc.text("البريد الإلكتروني -", 188, (lineCount += 6), "right");
        state.doc.text(arb.email, 160, lineCount, "right");
        state.doc.text("رقم متحرك -", 188, (lineCount += 6), "right");
        state.doc.text(arb.phone, 160, lineCount, "right");
      });

    state.doc.text("صفحة: 2", 10, 290);

    state.doc.save();

    setState({ ...state, doc: new jsPDF() });
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

  const pad = (num) => {
    if (num < 10) {
      return "00" + num;
    } else if (num > 9 && num < 100) {
      return "0" + num;
    } else return num;
  };

  const en = () => {
    const { state } = props.location;
    return (
      <section style={{ fontSize: "14px" }}>
        <p>
          This contract was approved on{" "}
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />{" "}
          in {state.placeOfArbitration}
          between:{" "}
        </p>
        <p>
          <b>1 - First Party:</b> International Islamic Centre for
          Reconciliation and Arbitration (IICRA) is an international,
          independent non-profit organization, represented by the Chief
          Executive Officer (CEO) of IICRA Mr. Rami Sulaiman. <br />
          Herein referred as “IICRA”
        </p>
        <p>
          <b>2 - Second Party:</b> A Sole Arbitrator/ A Member of the Arbitral
          Tribunal, respectively:
        </p>

        {props.location.state.arbitrators.length > 0
          ? props.location.state.arbitrators.map((arb) => {
              return (
                <>
                  Name of Arbitrator : {arb.name}
                  <br />
                  Nationality : {arb.nationality}
                  <br />
                  Address : {arb.address}
                  <br />
                  E-mail Address : {arb.email}
                  <br />
                  Contact No. : {arb.phone}
                </>
              );
            })
          : "Nothing Found!"}

        <h6 style={{ textAlign: "center" }}>
          <b>Preamble</b>
        </h6>
        <p>
          <b>Whereas,</b> the IICRA is an independent international non-profit
          organization dedicated to support the financial industry in general
          and Islamic financial industry in particular, through the performance
          of Arbitration and Reconciliation procedures according to its Rules.
        </p>
        <p>
          <b>Whereas,</b> the Arbitrator appointed for the Arbitration Case No.
          ARB{props.location.state.createdAt.split("-")[0]}-
          {pad(props.location.state.caseNumber)} is confirmed, accepted with all
          capacity to carry out the assigned task.
        </p>
        <p>
          <b>Whereas,</b> the mission of the Arbitrator shall be conducted
          according to IICRA Rules and Provisions with regards to this contract.
          The Arbitral proceedings and all communications of the{" "}
          <u>Sole Arbitrator or Arbitral Tribunal</u>, and orders thereof shall
          be made in Arabic and English, or any other languages as may be agreed
          by the Parties and the appointed Arbitrator. Meanwhile, the Final
          Award shall be issued in Arabic language along with the translation in
          English language.
        </p>
        <h6>
          <b>
            NOW, THEREFORE, THE PARTIES HEREBY AGREE ON THE FOLLOWING TERMS &
            CONDITIONS:
          </b>
        </h6>
        <p>
          <b>
            <u>Article I: The Objective of Contracting </u>
          </b>
        </p>
        <p>
          The Arbitrator hereby undertakes to assume the assigned task
          efficiently and professionally to settle the dispute in Arbitration
          Case No. ARB{props.location.state.createdAt.split("-")[0]}-
          {pad(props.location.state.caseNumber)}. The Arbitrator will also
          consider and apply the applicable Rules, including the IICRA Rules to
          adjudicate the dispute by adhering to the Professional, Shari’ah, and
          legal Codes of ethics for Arbitrators and Rules of Registration for
          IICRA List of Arbitrators.
        </p>
        <p>
          <b>
            <u>Article II: Independence of the Arbitrator</u>
          </b>
        </p>
        <p>The Arbitrator hereby pledges to undertake the following: </p>
        <p className="ml-3">
          i. Act independently of any party to the arbitration before taking
          over the task of Arbitration.
          <br />
          ii. Maintain this independence during the course of Arbitral
          proceedings until the Final and Binding Award is issued.
          <br />
          iii. Maintain an equal distance from the disputing parties with
          required transparency and professionalism.
          <p>
            Further, the Arbitrator shall immediately express to IICRA in
            writing any doubts or circumstances that may affect his independence
            and he shall also undertake to disclose directly to IICRA any
            circumstances that he may realize later or that may occur during the
            consideration of the dispute.
          </p>
        </p>
        <p>
          <b>
            <u>Article III: Avoiding Procrastination</u>
          </b>
        </p>
        <p>
          IICRA aims at resolving the disputes with efficiency and
          professionalism. A large part of this commitment is borne by the
          Arbitrator who had to respect the deadlines of Arbitration procedures
          including the time limit in order to issue the Award or any extension
          thereof, in accordance with the procedures related thereto.
        </p>
        <p>
          <b>
            <u>Article IV: Confidentiality</u>
          </b>
          <p>
            During the course of Arbitral proceedings, Arbitrator is strictly
            obliged to respect secrecy adopted by IICRA in order to protect the
            parties’ privacy by maintaining the integrity and confidentiality of
            necessary documents submitted for his consideration and deliberation
            during the settlement of the dispute until the Final Award is issued
            and executed.
          </p>
          <p>
            This commitment of confidentiality shall also be maintained after
            the issuance of the Award as Final Arbitral Award as well. If the
            need arises to use the Award as jurisprudence, a prior permission
            emanating from IICRA shall be required.
          </p>
          <p>
            IICRA shall strictly maintain the confidentiality of the name (and
            identities) of the Arbitrator (except for the parties and their
            counsel) and it must not divulge the terms of the Arbitrator’s
            appointment contained in this Mission Contract to anyone without
            Arbitrator’s individual written permission, or except for any legal
            reason.
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
          i. Submission of necessary documentary proof and data for the task of
          Arbitrator as remitted by the parties to IICRA within due date.
          <br />
          ii. Provision of instructions and guidelines for Arbitral proceedings
          in order to directly communicate with the Arbitrator.
          <br />
          iii. Provision of professional appropriate environment to the
          Arbitrator through necessary facilities such as provision(s) of
          transportation and places of hearings. <br />
          iv. Requiring the parties to pay the due amount to the Arbitrator (as
          determined by IICRA according to its Rules and schedule of fees).
          <br /> v. According to IICRA Rules in particular for additional
          expenses, IICRA guarantees to pay the additional expenses are as
          follows.
          <br />
          <p className="ml-3">
            • Professional fess/expenses of any expert/adviser engaged or
            designated (if need arises) by the Arbitrator.
            <br /> • Transportation and travel fees, accommodation, and
            subsistence costs in relation to meetings/hearings.
            <br /> • Office expenses such as photocopying, printing and courier.
          </p>
        </p>
        <p>
          <b>
            <u>Article VI: The Arbitrator's Fee</u>
          </b>
        </p>
        <p>
          The Arbitrator fee in Arbitration Case No. ARB
          {props.location.state.createdAt.split("-")[0]}-
          {pad(props.location.state.caseNumber)} is calculated based on IICRA
          schedule, and taking into consideration the neutrality of case, the
          Arbitrator Fee fixed at <u>AED/USD (Amount in words)</u> as decided by
          the Chief Executive Officer (CEO) in the light of IICRA’s Rules taking
          into account that the aforementioned amount is subject to the Arbitral
          Proceedings.
        </p>
        <p>
          As for the payment terms and conditions, IICRA shall pay 50%
          Arbitrator’s fee during the Preliminary Meeting, and the remaining 50%
          payment shall be made post issuance of the final and binding Award.
        </p>
        <p>
          If any termination or cancellation occurs during the course of
          Arbitral proceeding, IICRA shall pay only 75% of Arbitrator’s fee, 50%
          of which during the Preliminary meeting and the remaining 25% once the
          cancelation of Arbitral proceedings is confirmed by both parties to
          the dispute.
        </p>
        <p>
          If a meeting or hearing is cancelled or adjourned without sufficient
          notice advanced towards the Arbitrator, IICRA shall compensate the
          Arbitrator for his/her preparation and efforts in connection with such
          meetings or hearings as may be deemed appropriate.{" "}
        </p>
        <p>
          <b>
            <u>Article VII: Preemptive Actions:</u>
          </b>
        </p>
        <p>
          In the event that the arbitrator exceeds his limit or does not adhere
          to the terms and condition of this contract, particularly those
          obligations that negatively affect the arbitration process, and cause
          damage in bad faith directly or indirectly to any of the parties or
          IICRA, then IICRA reserves the right to recover all sums of money paid
          to him and deprive him of remaining sum. Likewise, IICRA has the right
          to hold him accountable by pursuing him to redress any infringement
          that may occur.
        </p>
        <h6>
          <u>General Provisions:</u>
        </h6>
        <p>
          <b>Article VIII</b> - The provisions of this contract are enforceable
          once it is signed and stamped. If the appointment of Arbitrator is
          subject to any objection (challenged) or if he/she is revoked
          (dismissed), all commitments shall be designated to a substitute
          Arbitrator or replacement Arbitrator, including alternative financial
          liabilities where IICRA shall estimate the efforts made by the
          Arbitrator. A final settlement with dismissed or challenged Arbitrator
          shall be made by the Chief Executive Officer (CEO) of IICRA.
        </p>
        <p>
          <b>Article IX</b> - IICRA shall provide necessary clarifications to
          remove any ambiguity to be raised in this Contract, and these
          clarifications shall be explicit and binding.
        </p>
        <p>
          <b>Article X</b> - Any letters and correspondence relevant to the
          designated task of the Arbitrator should be delivered to the
          accredited address to each party as described below, or any amendment
          to this address as specified in the Minutes of Arbitration Meetings:
        </p>
        <p className="ml-3">
          • International Islamic Centre for Reconciliation and Arbitration:
          <br /> P.O. Box: 182222 Dubai - UAE.
          <br />
          E-mail: info@iicra.com <br />
          Contact No. : +971 4 294 9292{" "}
        </p>
        <p className="ml-3">
          {props.location.state.arbitrators.length > 0
            ? props.location.state.arbitrators.map((arb) => {
                return (
                  <>
                    Name of Arbitrator : {arb.name}
                    <br />
                    Nationality : {arb.nationality}
                    <br />
                    Address : {arb.address}
                    <br />
                    E-mail Address : {arb.email}
                    <br />
                    Contact No. : {arb.phone}
                  </>
                );
              })
            : "Nothing Found!"}
        </p>
        {/* <p>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="radio1"
                value={rapporteur}
                onChange={() => setRapporteur("selfRap")}
              />
              Nominating a Rapporteur{" "}
              <span>
                <b style={{ color: "red" }}>*</b>
              </span>
            </Label>
          </FormGroup>

          <br />
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="radio1"
                value={rapporteur}
                onChange={() => setRapporteur("iicraRap")}
              />
              Requesting IICRA to Appoint A Rapporteur{" "}
              <span>
                <b style={{ color: "red" }}>*</b>
              </span>
            </Label>
          </FormGroup>
        </p> */}
        <p>
          In witness whereof, the parties hereto have/ had to sign this contract
          on the date written above.
        </p>
        {/* <div>
          <SignatureCanvas
            penColor="blue"
            backgroundColor="white"
            canvasProps={{
              width: 400,
              height: 200,
              className: "sigCanvas shadow",
            }}
            ref={(ref) => {
              sigPad = ref;
            }}
          />
        </div> */}
        <Row>
          <Col>
            <FormGroup>
              <CustomInput
                id="signature"
                name="signature"
                style={{
                  overflow: "hidden",
                  backgroundColor: "white",
                  border: "none",
                }}
                type="file"
                accept="image/jpeg, image/jpg, image/png, image/gif"
                label={
                  document.dir == "ltr" ? "Upload a Signature" : "تحميل الملف"
                }
                type="file"
                onChange={(e) => setSign(e.target.files[0])}
              />
            </FormGroup>
          </Col>
        </Row>

        {/* <Button
          onClick={() =>
            setTrimmedDataURL(sigPad.getCanvas().toDataURL("image/png"))
          }
          className="mr-3 mt-3"
          color="primary"
        >
          Confirm Signature
        </Button> */}
      </section>
    );
  };

  const ar = () => {
    return (
      <section style={{ fontSize: "16px", textAlign: "right" }}>
        <p>
          تم توقيع هذا العقد بتاريخ
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          في مقر المركز بدبي- الإمارات العربية المتحدة، بين كل من:
        </p>
        <p>
          <b>1- الطرف الأول:</b>
          المركز الإسلامي الدولي للصلح والتحكيم - مؤسسة دوليـة غير ربحية يمثله
          الرئيس التنفيذي - مقره الرئيسي في دبي. ويشار إليه فيما يلي بـ "المركز"
        </p>
        <p>
          <b>2- الطرف الثاني: </b>
        </p>

        <p>
          {props.location.state.arbitrators.length > 0
            ? props.location.state.arbitrators.map((arb) => {
                return (
                  <>
                    إسم محكم: {arb.name}
                    <br />
                    الجنسية: {arb.nationality}
                    <br />
                    العنوان: {arb.address}
                    <br />
                    البريد الإلكتروني: {arb.email}
                    <br />
                    رقم متحرك: {arb.phone}
                  </>
                );
              })
            : "Nothing Found!"}
        </p>
        <p>ويشار إليه فيما يلي بـ "المحكم".</p>
        <h6 style={{ textAlign: "center" }}>تمهـيــد</h6>
        <p>
          - حيث أن المركز مؤسسة دولية مستقلة غير ربحية تهدف إلى دعم الصناعة
          المالية بشكل عام والإسلامية منها بشكل خاص من خلال إدارة الدعاوى
          التحكيمية وإدارة ملفات.
        </p>
        <p>
          - وحيث عُرض على المحكم بأن يكون محكمًا فردًا في الدعوى التحكيمية رقم
          ARB{props.location.state.createdAt.split("-")[0]}-
          {pad(props.location.state.caseNumber)}
          وقد تأكد المحكم من مدى أهليته القانونية لتولى هذه المهمة.
        </p>
        <p>
          - وحيث يعد المحكم أحد المحكمين المعتمدين لدى المركز في قائمة خبرائه
          ومحكميه، إذ يتم الاستعانة به في فض النزاعات عن طريق الصلح والتحكيم وفق
          قواعد التحكيم والصلح.
        </p>
        <h6>وبتلاقي إرادة الطرفين إيجابًا وقبولًا تم الاتفاق على ما يلي:</h6>
        <p>
          <b>
            <u>المادة الأولى: الهـدف الأسـاس</u>
          </b>
        </p>
        <p>
          يقوم المحكم بالعمل بجد وفعالية سواء بمفرده أو في إطار هيئة التحكيم،
          لفصل النزاع المذكور موضوع الدعوى التحكيمية رقم ARB
          {props.location.state.createdAt.split("-")[0]}-
          {pad(props.location.state.caseNumber)}
          ملتزماً بقواعد المركز، والتقيد بما جاء في هذه المذكرة وذلك في سبيل
          تحقيق العدالة.
        </p>
        <p>
          <b>
            <u>المـادة الثانيـة: تعهدات المحكم</u>
          </b>
        </p>

        <p className="mr-3">
          1. يتعهد المحكم بشكل كامل وتام بقواعد المركز كما هي معتمدة بمرفقاتها
          وملاحقها بما فيها ميثاق عمل المحكم، ويتعهد بتحمل كامل المسؤولية
          القانونية.
        </p>

        <p className="mr-3">
          2. يعلن بأنه يوافق على التصرف كمحكم عملًا بقواعد التحكيم، وميثاق عمل
          المحكمين، وضوابط السلوك الأخلاقي والشرعي والمهني ويؤكد رغبته في أداء
          مهمته مقابل الأتعاب المحدودة من قبل المركز إضافة إلى ذلك، يؤكد، على
          صحة المعلومات الخاصة به، وأنه بإمكانه تخصيص الوقت اللازم لسير إجراءات
          التحكيم في الدعوى التحكيمية الماثلة بجدية وكفاءة ووفقًا للآجال الزمنية
          الواردة في قواعد التحكيم.
        </p>

        <p className="mr-3">
          3. يقر بأنه لا يوافق على التصرف كمحكم في الدعوى التحكيمية موضوع
          النزاع. (إذا كنت ترغب في توضيح الأسباب ، يرجى التوضيح في ورقة منفصلة).
        </p>

        <p className="mr-3">
          4. يقر بأن يكون محايدًا ومستقلًا عن كل طرف من الأطراف، ويعتزم على حد
          علمه أن يظل كذلك، لا توجد ظروف، في الماضي أو الحاضر من المحتمل أن تثير
          شكوكًا لها ما يبررها بشأن حياده أو استقلاليته. ويتعهّد هنا بأن يبلِّغ
          الأطراف والمحكّمين الآخرين على وجه السرعة بأي علاقات أو ظروف أخرى من
          هذا القبيل قد يفطن إليها لاحقا أثناء إجراءات التحكيم.
        </p>

        <p className="mr-3">
          5. يؤكد بأننه سيقوم بالتقيد بالآجال الزمنية المنصوص عليها في قواعد
          التحكيم لدى المركزمن خلال معالجة الدعوى التحكيمية والسير في إجراءات
          التحكيم بجدية وسرعة وكفاءة، مع مراعاة أي مهل وتمديدات عملًا بقواعد
          التحكيم.
        </p>

        <p>
          <b>
            <u>المـادة الثـالثـة: التزامـات المركـز </u>
          </b>
        </p>
        <p>يلتزم المركز في سبيل تحقيق الغرض من هذا العقد بما يلي:</p>
        <p>
          1. تقديم الوثائق والبيانات اللازمة لعمل المحكم والتي يحصل عليها من قبل
          أطراف التحكيم وذلك بالسرعة والمهنية المطلوبة.
        </p>
        <p>
          2. تقديم تعليمات إرشادية وأخرى إلزامية للمحكم حول إجراءات التحكيم
          وإجراءاته وآجاله التنظيمية وذلك بشكل مباشر أو من خلال الهيئة التحكيمية
          التي يكون عضواً فيها.
        </p>
        <p>
          3. توفير البيئة المهنية الملائمة للمحكم من خلال توفير الآليات
          والإمكانيات اللازمة كتوفير وسائل التنقل وأماكن عقد الجلسات أو من خلال
          المنصة الإلكترونية للمركز
        </p>
        <p>
          4. مطالبة الأطراف بسداد المبالغ المالية المتوجبة لأمين سر التحكيم نظير
          أتعابه والتي يحددها المركز وفق جدول سداد نفقات التحكيم.
        </p>
        <p>
          5. وفقًا لقواعد المركز الخاصة بالنفقات الإضافية، يضمن المركز دفع
          النفقات الإضافية المعززة بفواتير وذلك على النحو التالي:
          <br />- الرسوم والنفقات المهنية لأي خبير أو مستشار تم تعيينه (إذا دعت
          الحاجة) من قبل المحكم.
          <br />- نفقات النقل والسفر وتكاليف الإقامة الخاصة بالاجتماعات وجلسات
          الاستماع.
          <br />- مصاريف المكتب مثل نسخ التصوير وصندوق البريد.
        </p>
        <p>
          <b>
            <u>المـادة الرابعــــــة: أتعاب المحكم</u>
          </b>
        </p>
        <p>
          1. يتم احتساب رسوم المحكم في الدعوى التحكيمية رقم ARB
          {props.location.state.createdAt.split("-")[0]}-
          {pad(props.location.state.caseNumber)}
          (..../.....) على أساس جدول نفقات التحكيم المعتمدة لدى المركز، حيث قدر
          المركز أتعاب المحكم الفرد بمبلغ قدره........دولارًا أمريكيًا (المبلغ
          بالكلمات) في ضوء جدول أتعاب المحكمين مع الأخذ في عين الاعتبار أن نفقات
          أتعاب المحكم تخضع لسير إجراءات التحكيم.
        </p>
        <p>
          2. بالنسبة لشروط وأحكام لسداد الرسوم، يتعين على المركز سداد أتعاب
          المحكم بنسبة 50٪ خلال الاجتماع التمهيدي، ويتم سداد نسبة 50٪ المتبقية
          بعد إصدار الحكم النهائي وانتهاء فترة التصحيح والتغيير.
        </p>

        <p>
          <b>
            <u>المـادة الخامسة: جزاءات احترازية</u>
          </b>
        </p>
        <p>
          في حال تجاوز المحكم حدود مهمته، أو لم يتقيد ببنود هذا العقد وخاصة تلك
          الإلتزامات التي تؤثر سلباً على العملية التحكيمية، وتسبب بضرر عن سوء
          نية منه لأي من أطراف التحكيم أو للمركز بشكل مباشر أو غير مباشر، فيحق
          للمركز إسترجاع كافة المبالغ المالية المدفوعة له وحرمانه من تلك التي لم
          تدفع بعد، كما يحق للمركز مسائلة المحكم مدنياً وجزائياً عبر ملاحقته
          القضائية لجبر أي تعدي قد يحدث من قبله وبسوء نية.
        </p>

        <h6>
          <u>أحكــام عامــة:</u>
        </h6>

        <p>
          <b>
            <u>المـادة السادسة</u>
          </b>
        </p>
        <p>
          تسري أحكام هذا العقد بمجرد توقيعها ويستمر العمل بموجبها لحين صدور حكم
          التحكيم النهائي، وفي حال تم رد المحكم أو عزله يتم انتقال جميع هذه
          الالتزامات إلى المحكم البديل بما فيها الإلتزامات المالية حيث يقدر
          المركز حجم الجهد الذي بذله المحكم ويتم التسوية معه بقرار نهائي من قبل
          المركز.
        </p>
        <p>
          <b>
            <u>المـادة السابعة</u>
          </b>
        </p>
        <p>
          يقدم المركز التوضيحات اللازمة لإزالة أي غموض قد يثيره هذا العقد، وتكون
          هذه التوضيحات صريحة وملزمة.
        </p>

        <p>
          <b>
            <u>المـادة الثامنة</u>
          </b>
        </p>

        <p className="mr-3">
          ترسل الخطابات والمراسلات ذات الشأن بمهمة المحكم إلى المقر المعتمد لدى
          كل طرف كما هو موضح كالآتي:
          <br />
          • المركز الإسلامي الدولي للصلح والتحكيم:
          <br />
          تليفون: 97142949292+
          <br />
          فاكس: 97142959540+
          <br />
          البريد الإلكتروني: info@iicra.com
          <br />
          ص.ب: 182222 دبـي – الإمارات العربية المتحدة
        </p>

        <p className="mr-3">
          {props.location.state.arbitrators.length > 0
            ? props.location.state.arbitrators.map((arb) => {
                return (
                  <>
                    إسم محكم: {arb.name}
                    <br />
                    الجنسية: {arb.nationality}
                    <br />
                    العنوان: {arb.address}
                    <br />
                    البريد الإلكتروني: {arb.email}
                    <br />
                    رقم متحرك: {arb.phone}
                  </>
                );
              })
            : "Nothing Found!"}
        </p>

        {/* <p>
          <FormGroup check>
            <Label check>
              <h5>
                أقوم بتعيين أمين سر هيئة التحكيم
                <Input
                  className="mr-3"
                  type="radio"
                  name="radio1"
                  value={rapporteur}
                  onChange={() =>
                    setRapporteur("أقوم بتعيين أمين سر هيئة التحكيم -")
                  }
                />
                <span>
                  <b style={{ color: "red" }}>*</b>
                </span>
              </h5>
            </Label>
          </FormGroup>

          <br />
          <FormGroup check>
            <Label check>
              <h5>
                أفوض المركز لتعيين أمين سر هيئة التحكيم
                <Input
                  className="mr-3"
                  type="radio"
                  name="radio1"
                  value={rapporteur}
                  onChange={() =>
                    setRapporteur("أفوض المركز لتعيين أمين سر هيئة التحكيم -")
                  }
                />
                <span>
                  <b style={{ color: "red" }}>*</b>
                </span>
              </h5>
            </Label>
          </FormGroup>
        </p> */}

        <h6>
          <u>وإثباتًا لذلك، تم التوقيع على هذا العقد للعما بموجبه.</u>
        </h6>

        <p>
          بمجرد التوقيع على هذا العقد، سيرسل للمحكم عبر المنصة الإلكترونية ملف
          النزاع بما فيه طلب التحكيم، والمستندات التعاقدية وغيرها من الوثائق.
        </p>
        <br />
        <p>تقدم الآن</p>
        {/* <div>
          <SignatureCanvas
            penColor="blue"
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
        </div> */}
        <Row>
          <Col>
            <FormGroup>
              <CustomInput
                id="signature"
                name="signature"
                style={{
                  overflow: "hidden",
                  backgroundColor: "white",
                  border: "none",
                }}
                type="file"
                accept="image/jpeg, image/jpg, image/png, image/gif"
                label={
                  document.dir == "ltr" ? "Upload a Signature" : "تحميل الملف"
                }
                type="file"
                onChange={(e) => setSign(e.target.files[0])}
              />
            </FormGroup>
          </Col>
        </Row>
        {/* <Button
          onClick={() =>
            setTrimmedDataURL(sigPad.getCanvas().toDataURL("image/png"))
          }
          className="mr-3 mt-3"
          color="primary"
        >
          Confirm Signature
        </Button> */}
      </section>
    );
  };

  return (
    <>
      <Header
        data={props.location.state}
        stepName="Nomination and Appointment of Arbitrator(s)"
        stepPathPrev="nomination"
        stepPath="nominateArb"
        name="Mission Contract of Arbitrator"
      />
      <Container style={styles.formUserContainer} className="shadow-lg">
        <Card style={styles.cardBg}>
          <CardHeader style={styles.letterContainer}>
            <h6 style={styles.center} onClick={() => generatePdfArabic()}>
              {document.dir === "ltr" ? "Mission Contract" : "عقد مهمة محكم"}
            </h6>
            <img style={styles.header} src={header} alt="header" />
          </CardHeader>
          <CardBody>
            {document.dir == "ltr" ? en() : ar()}
            <Button
              onClick={() => {
                sign
                  ? handleSend(props.location.state)
                  : Swal.fire({
                      title: "Signature is Missing",
                      icon: "warning",
                    });
              }}
              className="mt-3"
            >
              Upload
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
export default EmailMissionContract;
