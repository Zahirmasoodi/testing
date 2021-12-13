import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Container,
  Input,
  Label,
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
import stampSign from "../../../assets/stampSign.png";

const EmailMinutesOfTransfer = (props) => {
  const baseURL = getEnvironment().apiUrl;

  const role = JSON.parse(localStorage.getItem("iicra-token"));

  const [state, setState] = useState({
    allCases: [],
    resEmail: "",
    claEmail: "",
    filingDate: "",
    notes: "",
    doc: new jsPDF(),
  });

  const [arbitDetails, setArbitDetails] = useState({
    name: "",
    nationality: "",
    address: "",
    pOBox: "",
    phone: "",
    fax: "",
    email: "",
  });

  const [arbName, setArbName] = useState("");
  const [rapName, setRapName] = useState("");
  const [rapPhone, setRapPhone] = useState("");

  const [roleEmail, setRoleEmail] = useState();

  useEffect(() => {
    setRoleEmail(JSON.stringify(localStorage.getItem("arbitratorEmail")));
  }, []);

  const [rapporteur, setRapporteur] = useState("");

  const handleSend = (data) => {
    document.dir == "ltr" ? generatePdf() : generatePdfArabic();

    const pdf = new File([state.doc.output("blob")], "test.pdf", {
      type: "application/pdf",
    });

    const formData = new FormData();
    formData.append("email", props.location.state.claimantEmail);
    formData.append("arbit", pdf);
    formData.append("email", JSON.parse(roleEmail));
    formData.append("author", JSON.parse(roleEmail));
    formData.append("type", "timelineOfProceeding");

    axios
      .post(`${baseURL}/form/upload/${props.location.state._id}`, formData)

      .then(() => {
        Swal.fire({
          title: "Sent",
          icon: "success",
        });
        props.history.push({
          pathname:
            role == "admin" ? "/email/transmission" : "/arbitrator/case",
          state: props.location.state,
        });
      })
      .then(() => {
        const formData = new FormData();
        formData.append("email", JSON.parse(roleEmail));

        axios.post(
          `${baseURL}/form/arbitrator-handover/${props.location.state._id}`,
          formData
        );
      })
      .catch(() =>
        Swal.fire({
          title: "Something went Wrong",
          icon: "error",
        })
      );
  };

  const generatePdf = (data) => {
    state.doc.addFileToVFS("MyFont.ttf", myFont);
    state.doc.addFont("MyFont.ttf", "MyFont", "normal");

    state.doc.rect(10, 10, 190, 275);
    state.doc.setFontSize(15);
    let lineCount = 20;

    let today = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    state.doc.text(
      "Minutes of Meeting to Handover the Arbitration File",
      105,
      lineCount,
      "center"
    );
    state.doc.text(
      `Arbitration Case No: ARB${
        props.location.state.createdAt.split("-")[0]
      }-${pad(props.location.state.caseNumber)}`,
      105,
      (lineCount += 5),
      "center"
    );
    state.doc.text(
      `${today.toLocaleDateString()} at IICRA – Dubai`,
      105,
      (lineCount += 5),
      "center"
    );
    state.doc.setFontSize(10);
    state.doc.text(`Between`, 105, (lineCount += 10), "center");

    state.doc.text(
      `${props.location.state.claimantName}`,
      105,
      (lineCount += 5),
      "center"
    );
    state.doc.text(`and`, 105, (lineCount += 5), "center");
    state.doc.text(
      `${props.location.state.respondentName}, ${props.location.state.respondentName2}`,
      105,
      (lineCount += 5),
      "center"
    );

    state.doc.text("Arbitrator", 20, (lineCount += 10));

    state.doc.text("Name", 24, (lineCount += 5));
    state.doc.text(rapporteur, 24, (lineCount += 5));

    state.doc.text("Mobile", 24, (lineCount += 5));
    state.doc.text(rapPhone, 24, (lineCount += 5));

    state.doc.text(
      "1. This meeting was held virtually via _________ on (Date & Time), in order to hand over the file of Arbitration",
      20,
      (lineCount += 10)
    );
    state.doc.text("Case to the Arbitral Tribunal.", 24, (lineCount += 5));
    state.doc.text("2. The Attendees are:", 20, (lineCount += 10));
    state.doc.text("Arbitrator", 24, (lineCount += 5));
    state.doc.text(
      "Chief Executive of IICRA: Mr. Rami Sulaiman",
      24,
      (lineCount += 5)
    );
    state.doc.text("Rapporteur", 24, (lineCount += 5));
    state.doc.text(
      "3. In accordance with Article 15 of IICRA Rules, one (1) copy of file case was handed over to each Arbitrator",
      20,
      (lineCount += 10)
    );
    state.doc.text(
      "along with IICRA Rules and Mission Contract was signed as well.",
      24,
      (lineCount += 5)
    );
    state.doc.text(
      "4. It is agreed that the Arbitral Tribunal has appointed (Name) as a Rapporteur in the Arbitration Case.",
      20,
      (lineCount += 10)
    );
    state.doc.text(
      "5. It is agreed that the Arbitral Tribunal shall call the parties in order to attend the Preliminary Meeting within",
      20,
      (lineCount += 10)
    );
    state.doc.text(
      "fifteen (15) days from today onwards.",
      24,
      (lineCount += 5)
    );
    state.doc.text(
      "6. Pursuant to Article 30 of IICRA Rules, the Arbitration Award must be issued within a period of not more than",
      20,
      (lineCount += 10)
    );
    state.doc.text(
      "six (6) Months from the day of submission of Arbitration Case to the Arbitral Tribunal, i.e., (maximum date of",
      24,
      (lineCount += 5)
    );
    state.doc.text(
      "submission), unless otherwise the Arbitral Tribunal decides to extend that period.",
      24,
      (lineCount += 5)
    );
    state.doc.text(
      "7. The Arbitral Tribunal confirmed that any objection on the jurisdiction should be submitted by the representative’s",
      20,
      (lineCount += 10)
    );
    state.doc.text(
      "party at the date of preliminary meeting, otherwise the Arbitral Tribunal shall not consider such objection later on.",
      24,
      (lineCount += 5)
    );
    state.doc.save();
  };

  const generatePdfArabic = (data) => {
    // state.doc.addFileToVFS("MyFont.ttf", myFont);
    state.doc.addFileToVFS("MyFont.ttf", myFont);
    state.doc.addFileToVFS("MyFontBold.ttf", font);
    state.doc.addFont("MyFont.ttf", "MyFont", "normal");
    state.doc.addFont("MyFontBold.ttf", "MyFontBold", "normal");
    state.doc.setFont("MyFontBold");
    state.doc.rect(10, 10, 190, 275);
    let lineCount = 20;

    let today = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    state.doc.setFontSize(15);
    state.doc.text(
      "محضـر اجتمـاع تسليم ملـف التحكيـم ",
      105,
      lineCount,
      "center"
    );
    state.doc.setFont("MyFont");
    state.doc.line(73, (lineCount += 2), 135, lineCount);
    state.doc.setFontSize(10);
    state.doc.text(
      `ARB${props.location.state.createdAt.split("-")[0]}-${pad(
        props.location.state.caseNumber
      )} في القضية التحكيمية رقم`,
      190,
      (lineCount += 10),
      "right"
    );
    state.doc.text(
      `انعقد بتاريخ ${today.toLocaleDateString(
        "ar-EG",
        options
      )} بمقر المركز بإمارة دبي، اجتماع تسليم مستندات الدعوى التحكيمية لهيئة التحكيم في القضية التحكيمية الماثلة`,
      190,
      (lineCount += 10),
      "right"
    );
    state.doc.text(
      ":التحكيم في القضية التحكيمية الماثلة، وحضر الاجتماع كل من",
      190,
      (lineCount += 6),
      "right"
    );
    state.doc.text(
      "الأستاذ / رامي سليمان إبراهيم -",
      190,
      (lineCount += 10),
      "right"
    );

    state.doc.text(
      ".بصفته المدير التنفيذي للمركز يمارس صلاحيات الأمين العام -",
      120,
      lineCount,
      "right"
    );
    state.doc.text(arbName, 190, (lineCount += 6), "right");
    state.doc.text(".محكمًا فردًا -", 120, lineCount, "right");
    state.doc.text(
      "افتتح المدير التنفيذي للمركز الجلسة بالترحيب بالمحكم الفرد الذي رشح من قبل المركز ووجد ذلك الترشيح موافقة ضمنية من الطرفين ، وبالتالي تم",
      190,
      (lineCount += 10),
      "right"
    );
    state.doc.text(
      "(هيئة التحكيم أصولاً لنظر القضية التحكيمية الماثلة، شاكرًا إياه قبوله مهمة الفصل في هذا النزاع وتوقيعه العقد المخصص لذلك ) تعيين مرفق عقد قبول",
      190,
      (lineCount += 6),
      "right"
    );
    state.doc.text(
      `،المهمة ملتزمًا بنظم ولوائح المركز وعليه`,
      190,
      (lineCount += 6),
      "right"
    );
    state.doc.text(
      `ARB${props.location.state.createdAt.split("-")[0]}-${pad(
        props.location.state.caseNumber
      )} وفق نص المادة 25 من قواعد التحكيم فقد سلم المدير التنفيذي للمحكم الفرد نسخة من المستندات الخاصة بالدعوى التحكيمية رقم`,
      190,
      (lineCount += 10),
      "right"
    );
    state.doc.text(
      ":ليباشر المهمة التي عين من أجلها. وقد عين المركز الأستاذ/ نضال حسني كأمين سر لهيئة التحكيم، وبياناته كالتالي",
      190,
      (lineCount += 6),
      "right"
    );
    state.doc.text(`:بريد الكتروني  -`, 190, (lineCount += 6), "right");
    state.doc.text(rapName, 150, lineCount, "right");

    // state.doc.setFontSize(15);
    state.doc.text(":هاتف -", 190, (lineCount += 6), "right");
    state.doc.text(rapPhone, 150, lineCount, "right");

    // state.doc.setFontSize(10);
    state.doc.text(
      ".هذا وسيقوم المحكم الفرد خلال 10 أيام من تاريخ هذا المحضر بدعوة الأطراف لحضور الاجتماع التمهيدي عملًا بأحكام المادة 30 من قواعد التحكيم",
      190,
      (lineCount += 10),
      "right"
    );
    state.doc.text(rapporteur, 190, (lineCount += 10), "right");
    state.doc.text(
      `...وقد تم الإقرار بما جاء في هذا المحضر وعليه تم التوقيع`,
      190,
      (lineCount += 10),
      "right"
    );
    state.doc.setFont("MyFontBold");
    state.doc.text(
      "المدير التنفيذي / رامي سليمان إبراهيم",
      190,
      (lineCount += 20),
      "right"
    );
    state.doc.text("الدكتور/ خالد الجناحي", 105, lineCount, "right");
    state.doc.addImage(trimmedDataURL, "jpeg", 68, (lineCount += 10), 50, 24);
    state.doc.addImage(stamp, "jpeg", 140, lineCount, 50, 24);
    state.doc.addImage(stampSign, "jpeg", 140, (lineCount += 15), 50, 24);

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
        </p>

        <div>
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
        </div>
        <Button
          onClick={() =>
            setTrimmedDataURL(sigPad.getCanvas().toDataURL("image/png"))
          }
          className="mr-3 mt-3"
          color="primary"
        >
          Confirm Signature
        </Button>
      </section>
    );
  };

  const ar = () => {
    let today = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return (
      <section style={{ fontSize: "18px", textAlign: "right" }}>
        <p dir="rtl">
          <p style={{ textAlign: "center", fontWeight: "bold" }}>
            محضـر اجتمـاع تسليم ملـف التحكيـم
          </p>
          <u>
            في القضية التحكيمية رقم ARB
            {props.location.state.createdAt.split("-")[0]}-
            {pad(props.location.state.caseNumber)} <br />
          </u>
          <br />
          انعقد بتاريخ {today.toLocaleDateString("ar-EG", options)} بمقر المركز
          بإمارة دبي، اجتماع تسليم مستندات الدعوى التحكيمية لهيئة التحكيم في
          القضية التحكيمية الماثلة، وحضر الاجتماع كل من: <br />
          - الأستاذ / رامي سليمان إبراهيم <br />
          <br /> بصفته المدير التنفيذي للمركز يمارس صلاحيات الأمين العام. <br />
          محكمًا فردًا :
          <Input
            type="text"
            value={arbName}
            onChange={(e) => setArbName(e.target.value)}
            style={{ display: "inline" }}
          />{" "}
          <br /> <br />
          افتتح المدير التنفيذي للمركز الجلسة بالترحيب بالمحكم الفرد الذي رشح من
          قبل المركز ووجد ذلك الترشيح موافقة ضمنية من الطرفين، وبالتالي تم تعيين
          هيئة التحكيم أصولاً لنظر القضية التحكيمية الماثلة، شاكرًا إياه قبوله
          مهمة الفصل في هذا النزاع وتوقيعه العقد المخصص لذلك (مرفق عقد قبول
          المهمة) ملتزمًا بنظم ولوائح المركز. وعليه،
          <br /> <br />
          وفق نص المادة 25 من قواعد التحكيم فقد سلم المدير التنفيذي للمحكم الفرد
          نسخة من المستندات الخاصة بالدعوى التحكيمية رقم ARB
          {props.location.state.createdAt.split("-")[0]}-
          {pad(props.location.state.caseNumber)}، ليباشر المهمة التي عين من
          أجلها. وقد عين المركز الأستاذ/ نضال حسني كأمين سر لهيئة التحكيم،
          وبياناته كالتالي:
          <br /> <br />- بريد الكتروني :{" "}
          <Input
            type="text"
            value={rapName}
            onChange={(e) => setRapName(e.target.value)}
          />{" "}
          <br />
          هاتف :{" "}
          <Input
            type="text"
            value={rapPhone}
            onChange={(e) => setRapPhone(e.target.value)}
          />
          <br />
          هذا وسيقوم المحكم الفرد خلال 10 أيام من تاريخ هذا المحضر بدعوة الأطراف
          لحضور الاجتماع <br /> التمهيدي عملًا بأحكام المادة 30 من قواعد
          التحكيم. <br />
          <br />
          وقد تم الإقرار بما جاء في هذا المحضر وعليه تم التوقيع،،،
          <br />
          المدير التنفيذي / رامي سليمان إبراهيم <br /> {arbName}
          <br />
        </p>
        <p>
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
        </p>

        <div>
          <SignatureCanvas
            penColor="blue"
            backgroundColor="white"
            canvasProps={{
              width: 400,
              height: 200,
              className: "sigCanvas shadow-lg",
              border: "1px solid green",
            }}
            ref={(ref) => {
              sigPad = ref;
            }}
          />
        </div>
        <Button
          onClick={() =>
            setTrimmedDataURL(sigPad.getCanvas().toDataURL("image/png"))
          }
          className="mr-3 mt-3"
          color="primary"
        >
          Confirm Signature
        </Button>
      </section>
    );
  };

  return (
    <>
      {role == "admin" ? (
        <Header
          data={props.location.state}
          stepName="Transmission of Files to Arbitrator(s)"
          stepPathPrev="nominateArb"
          stepPath="transmission"
          name="Minutes of Handover"
        />
      ) : null}
      <Container style={styles.formUserContainer} className="shadow-lg">
        <Card style={styles.cardBg}>
          <CardHeader style={styles.letterContainer}>
            <h6 style={styles.center} onClick={() => generatePdfArabic()}>
              محضـر اجتمـاع تسليم ملـف التحكيـم
            </h6>
            <img style={styles.header} src={header} alt="header" />
          </CardHeader>
          <CardBody style={{ lineHeight: "30px" }}>
            {document.dir == "ltr" ? en() : ar()}
            <Button onClick={handleSend} className="mt-3">
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
export default EmailMinutesOfTransfer;
