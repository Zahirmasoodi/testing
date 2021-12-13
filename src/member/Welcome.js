import axios from "axios";
import { Container, Row, Col, Button, Input } from "reactstrap";
import iicraLogo from "../assets/logo.png";
import { getEnvironment } from "../config";
import { useState } from "react";
import Swal from "sweetalert2";

const Welcome = (props) => {
  const baseURL = getEnvironment().apiUrl;
  const [memberLogo, setMemberLogo] = useState("");
  const [libararyLink, setLibararyLink] = useState("");

  const handleChange = (path) => {
    props.history.push({ pathname: path, state: props.location.state.content });
  };
  return (
    <Container style={styles.formUserContainer} className="shadow-lg">
      <Row className="text-center">
        <Col lg={3} md={2} onClick={() => console.log(props)}>
          <img
            className="mb-2"
            src={`${baseURL}/${props.location.state.content.logo}`}
            alt="member logo"
            style={styles.image}
          />
          {/* <br />

          <label>
            <Input
              style={{ display: "none" }}
              id="member-logo"
              type="file"
              value={memberLogo}
              onChange={(e) => {
                const form = new FormData();
                form.append("email", props.location.state.email);
                form.append("logo", e.target.files[0]);
                axios
                  .post(`${baseURL}/form/member-logo`, form)
                  .then((res) => Swal.fire("Changed"))
                  .catch((err) => Swal.fire(err.response.data));
              }}
            />
            <span className="shadow border p-1" style={{ color: "#008F53" }}>
              {document.dir == "ltr" ? "Change Picture" : "تغيير الصورة"}
            </span>
          </label> */}
        </Col>
        <Col lg={6} md={8}>
          <Row>
            <Col>
              <p>
                <h6>
                  {document.dir == "ltr"
                    ? "Allah, Peace, Mercy and Blessing upon you."
                    : "السلام عليكم ورحمة الله وبركاته،"}
                </h6>
              </p>
              <p>
                <h5>
                  {document.dir == "ltr"
                    ? "E-gate for the services of the International Islamic Centre for Reconciliation and Arbitration"
                    : "البوابة الإلكترونية لخدمات المركز الإسلامي الدولي للصلح والتحكيم"}
                </h5>
              </p>
              <h4>
                <b>{props.location.state.content.name}</b>
              </h4>
            </Col>
          </Row>
        </Col>
        <Col lg={3} md={2}>
          <img src={iicraLogo} alt="iicra logo" style={styles.image} />
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <h6>
            {document.dir == "ltr"
              ? "Warm Greetings from the International Islamic Centre for Reconciliation and Arbitration (IICRA)"
              : "يهديكم المركز الإسلامي الدولي للصلح والتحكيم (المركز) أطيب التحية، "}
          </h6>
          <p>
            {document.dir == "ltr"
              ? ` IICRA welcomes you to your e-gate in order to benefit from it’s
            services, as IICRA was established in 2005 under international
            conventions to become one of the most important infrastructure
            institutions of Islamic economy and establish an international
            platform for disputes resolution in accordance with the provisions
            of Islamic Shari’ah under IICRA Arbitration and Reconciliation
            Rules. For more information about the IICRA establishment, visit `
              : "يشكل المنصة الدولية التي تتيح فض النزاعات بما لا يخالف أحكام الشريعة الإسلامية عبر قواعد الصلح وقواعد التحكيم المعتمدة لدى المركز.  ......  لمزيد معلومات"}
            {document.dir == "ltr" ? (
              <a href="https://www.iicra.com/">IICRA's Website</a>
            ) : (
              <a href="https://www.iicra.com/ar">المركز</a>
            )}
          </p>
          <p>
            {document.dir == "ltr"
              ? `IICRA provides support for the Islamic economy, the most prominent
            of which is the dispute resolution through Reconciliation and
            Arbitration:`
              : "يقدم المركز خدمات مساندة للاقتصاد الإسلامي، على رأسها فض النزاعات عبر الصلح والتحكيم:"}
          </p>
        </Col>
      </Row>
      <Row className="text-center mt-3">
        <Col>
          <Button
            style={{ backgroundColor: "#008F53" }}
            onClick={() => handleChange("/arbitration")}
          >
            {document.dir == "ltr"
              ? "Submit New Arbitration Request"
              : "قدم طلب تحكيم جديد"}
          </Button>
        </Col>
        <Col>
          <Button
            style={{ backgroundColor: "#008F53" }}
            onClick={() => handleChange("/memberCases")}
          >
            {document.dir == "ltr"
              ? "Follow Existing Arbitration Cases"
              : "تابع دعوى تحكيمية مقيدة"}
          </Button>
        </Col>
        <Col>
          <Button
            style={{ backgroundColor: "#AD8D61" }}
            onClick={() => handleChange("/reconciliation")}
          >
            {document.dir == "ltr"
              ? "Submit New Reconciliation Request"
              : "قدم طلب صلح جديد"}
          </Button>
        </Col>
        <Col>
          <Button
            style={{ backgroundColor: "#AD8D61" }}
            onClick={() => handleChange("/cases_")}
          >
            {document.dir == "ltr"
              ? "Follow Existing Reconciliation Cases"
              : "تابع بحث مساعي الصلح"}
          </Button>
        </Col>
      </Row>
      <Row className="text-center mt-5">
        <Col>
          <p className="mb-5">
            <a href="https://www.iicra.com/library/" target="blank">
              <h6>
                <b className="shadow" style={{ color: "#008F53" }}>
                  {document.dir == "ltr"
                    ? "Download and Read Arbitration Rules"
                    : "اطلع على قواعد التحكيم"}
                </b>
              </h6>
            </a>
          </p>
          <p>
            <a
              href="https://www.portal.iicra.com/arbitration-calculator/"
              target="blank"
            >
              <h6>
                <b className="shadow" style={{ color: "#008F53" }}>
                  {document.dir == "ltr"
                    ? "Calculate the Arbitration Expenses"
                    : "لحساب نفقات التحكيم"}
                </b>
              </h6>
            </a>
          </p>
        </Col>
        <Col>
          <p className="mb-5">
            <a href="https://www.iicra.com/library/" target="blank">
              <h6>
                <b className="shadow" style={{ color: "#AD8D61" }}>
                  {document.dir == "ltr"
                    ? "Download and Read Reconciliation Rules"
                    : "اطلع على قواعد الصلح"}
                </b>
              </h6>
            </a>
          </p>
          <p>
            <a
              href="https://www.portal.iicra.com/arbitration-calculator/"
              target="blank"
            >
              <h6>
                <b className="shadow" style={{ color: "#AD8D61" }}>
                  {document.dir == "ltr"
                    ? "Calculate the Reconciliation Expenses"
                    : "لحساب نفقات بحث مساعي الصلح"}
                </b>
              </h6>
            </a>
          </p>
        </Col>
      </Row>
      <Row
        className="mt-2"
        style={{ textAlign: document.dir == "ltr" ? "left" : "right" }}
      >
        <Col>
          <a href="https://www.iicra.com/faq/" target="blank">
            <b style={{ color: "#AD8D61" }}>
              {document.dir == "ltr"
                ? "Frequently Asked Questions (FAQs)"
                : "أكثر الاسئلة شيوعًا"}
            </b>
          </a>
        </Col>
      </Row>
      <Row
        className="mt-2"
        style={{ textAlign: document.dir == "ltr" ? "left" : "right" }}
      >
        <Col>
          {props.location.state.content.libraryLink && (
            <a
              href={`${props.location.state.content.libraryLink}`}
              target="blank"
            >
              <b style={{ color: "#AD8D61" }}>
                {props.location.state.content.name}{" "}
                {document.dir == "ltr" ? "Library" : "مكتبة"}{" "}
              </b>
            </a>
          )}
          {/* <label>
            {document.dir == "ltr"
              ? "Upload Link to Library"
              : "رابط التحميل إلى المكتبة"}
          </label>
          {"  "}
          <input
            id="member-library"
            type="text"
            value={libararyLink}
            onChange={(e) => {
              setLibararyLink(e.target.value);
            }}
          />
          <button
            onClick={() => {
              const form = new FormData();
              form.append("email", props.location.state.email);
              form.append("libraryLink", libararyLink);
              axios
                .post(`${baseURL}/form/member-library`, form)
                .then((res) => console.log(res))
                .catch((err) => console.log(err.response.data));
            }}
          >
            {document.dir == "ltr" ? "upload" : "تحميل"}
          </button> */}
        </Col>
      </Row>
      <Row
        className="mt-2"
        style={{ textAlign: document.dir == "ltr" ? "left" : "right" }}
      >
        <Col>
          <a href="mailto:info@iicra.com">
            <b style={{ color: "#AD8D61" }}>
              {document.dir == "ltr" ? "Contact IICRA" : "تواصل مع المركز"}
            </b>
          </a>
        </Col>
      </Row>
      <Row
        className="mt-2"
        style={{ textAlign: document.dir == "ltr" ? "left" : "right" }}
      >
        <Col>
          <input
            id="member-library"
            type="text"
            value={libararyLink}
            placeholder={
              document.dir == "ltr"
                ? "Upload Link to Library"
                : "رابط التحميل إلى المكتبة"
            }
            onChange={(e) => {
              setLibararyLink(e.target.value);
            }}
          />
          <button
            onClick={() => {
              const form = new FormData();
              form.append("email", props.location.state.email);
              form.append("libraryLink", libararyLink);
              axios
                .post(`${baseURL}/form/member-library`, form)
                .then((res) => Swal.fire("Link Uploaded"))
                .catch((err) => Swal.fire(err.response.data));
            }}
          >
            {document.dir == "ltr" ? "upload" : "تحميل"}
          </button>{" "}
        </Col>
      </Row>
    </Container>
  );
};

const styles = {
  formUserContainer: {
    // position: "absolute",
    // top: "50%",
    // left: "50%",
    // mozTransform: "translateX(-50%) translateY(-50%)",
    // webkitTransform: "translateX(-50%) translateY(-50%)",
    // transform: "textDecorationThickness",
    // backgroundColor: "#f6f6f6",
    // minHeight: "80vh",
    // marginTop: "5vh",
    // paddingTop: "5vh",
    // // marginBottom: "5vh",
    // // paddingBottom: "5vh",
    // border: "2px solid green",
    // borderRadius: "5px",
    marginTop: "5vh",
    paddingTop: "5vh",
    backgroundColor: "#f6f6f6",
    minHeight: "80vh",
    paddingBottom: "5vh",
  },
  image: {
    height: "100px",
    border: "50px",
  },
};

export default Welcome;
