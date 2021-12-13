import React, { Component } from "react";
import validator from "validator";
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
import tick from "../../assets/tick.png";
import Swal from "sweetalert2";

export class OtherSuggestions extends Component {
  state = {
    alertArbitrationLanguage: false,
    alertGoverningLaw: false,
    alertNumberOfArbitrators: false,
    alertOtherRequests: false,
    alertPlaceOfArbitration: false,
  };

  handleproceduralLaw = () => {
    this.setState({
      proceduralLaw: !this.state.proceduralLaw,
    });
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  continue = (e) => {
    e.preventDefault();

    const {
      arbitrationLanguage,
      governingLaw,
      numberOfArbitrators,
      placeOfArbitration,
    } = this.props.values;

    if (validator.isEmpty(arbitrationLanguage) || arbitrationLanguage == "") {
      Swal.fire({
        title:
          document.dir == "ltr"
            ? "The Arbitration Language is Missing"
            : "لغة التحكيم غير محددة",
        icon: "info",
      });
    } else if (
      validator.isEmpty(placeOfArbitration) ||
      placeOfArbitration == ""
    ) {
      Swal.fire({
        title:
          document.dir == "ltr"
            ? "The Place of Arbitration is Missing"
            : "مكان التحكيم غير محددة",
        icon: "info",
      });
    } else if (validator.isEmpty(governingLaw) || governingLaw == "") {
      Swal.fire({
        title:
          document.dir == "ltr"
            ? "The Governing Law is Missing"
            : "القانون الواجب التطبيق غير محددة",
        icon: "info",
      });
    }
    // else if (
    //   validator.isEmpty(numberOfArbitrators) ||
    //   numberOfArbitrators == ""
    // ) {
    //   Swal.fire({
    //     title:
    //       document.dir == "ltr"
    //         ? "The number of Arbitrators is Missing"
    //         : "عدد المحكمين غير محددة",
    //     icon: "info",
    //   });
    // }
    else {
      this.props.nextStep();
    }
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const labelStyle = {
      float: document.dir == "ltr" ? "left" : "right",
    };

    const { values, handleChange } = this.props;

    const {
      alertArbitrationLanguage,
      alertGoverningLaw,
      alertNumberOfArbitrators,
      alertPlaceOfArbitration,
    } = this.state;

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
                      color: "lightgray",
                      display: "inline",
                      fontSize: "15px",
                      lineHeight: "45px",
                      background: "green",
                      borderRadius: "50%",
                      padding: "2vh 17%",
                    }}
                  >
                    <strong>{document.dir == "ltr" ? "5" : "٥"}</strong>
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
              value="62.5"
              style={{ textAlign: "right" }}
            />
          </Col>
        </Row>
        <h6 style={styles.center}>
          {document.dir == "ltr" ? "Other Suggestions" : "اقتراحات أخرى"}
        </h6>
        <Card style={styles.cardBg}>
          <CardBody>
            <Form>
              <Row>
                <Col xl={12} lg={12} md={12} sm={12}>
                  <FormGroup>
                    <Label style={labelStyle} for="arbitrationLanguage">
                      {document.dir == "ltr"
                        ? "Language of Arbitration"
                        : "لغة التحكيم"}
                    </Label>
                    {alertArbitrationLanguage ? (
                      <span style={styles.warning}>
                        {document.dir == "ltr"
                          ? " This field cannot be empty "
                          : " إملاء هذه المساحة إلزامي "}
                      </span>
                    ) : (
                      <span
                        style={{
                          float: document.dir == "ltr" ? "left" : "right",
                          color: "red",
                          fontWeight: "bold",
                        }}
                      >
                        {" "}
                        *{" "}
                      </span>
                    )}
                    <Input
                      type="select"
                      name="arbitrationLanguage"
                      id="arbitrationLanguage"
                      onChange={handleChange("arbitrationLanguage")}
                      defaultValue={values.arbitrationLanguage}
                    >
                      <option></option>
                      <option>العربية</option>
                      <option>English</option>
                      <option>اردو</option>
                      <option>español</option>
                      <option>français</option>
                      <option>čeština</option>
                      <option>dansk</option>
                      <option>Deutsch</option>
                      <option>eesti(Eesti)</option>
                      <option>Indonesia</option>
                      <option>italiano</option>
                      <option>latviešu</option>
                      <option>lietuvių</option>
                      <option>magyar</option>
                      <option>Nederlands</option>
                      <option>norsk bokmål</option>
                      <option>polski</option>
                      <option>português </option>
                      <option>română</option>
                      <option>slovenčina</option>
                      <option>srpski</option>
                      <option>suomi</option>
                      <option>svenska</option>
                      <option>Tiếng Việt</option>
                      <option>Türkçe</option>
                      <option>Ελληνικά</option>
                      <option>български</option>
                      <option>русский</option>
                      <option>українська</option>
                      <option>עברית</option>
                      <option>ไทย</option>
                      <option>한국어</option>
                      <option>中文</option>
                      <option>日本語</option>
                      {/* <option value="Afrikaans">Afrikaans</option>
                      <option value="Albanian">Albanian</option>
                      <option value="Arabic">Arabic</option>
                      <option value="Armenian">Armenian</option>
                      <option value="Basque">Basque</option>
                      <option value="Bengali">Bengali</option>
                      <option value="Bulgarian">Bulgarian</option>
                      <option value="Catalan">Catalan</option>
                      <option value="Cambodian">Cambodian</option>
                      <option value="Chinese (Mandarin)">
                        Chinese (Mandarin)
                      </option>
                      <option value="Croatian">Croatian</option>
                      <option value="Czech">Czech</option>
                      <option value="Danish">Danish</option>
                      <option value="Dutch">Dutch</option>
                      <option value="English">English</option>
                      <option value="Estonian">Estonian</option>
                      <option value="Fiji">Fiji</option>
                      <option value="Finnish">Finnish</option>
                      <option value="French">French</option>
                      <option value="Georgian">Georgian</option>
                      <option value="German">German</option>
                      <option value="Greek">Greek</option>
                      <option value="Gujarati">Gujarati</option>
                      <option value="Hebrew">Hebrew</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Hungarian">Hungarian</option>
                      <option value="Icelandic">Icelandic</option>
                      <option value="Indonesian">Indonesian</option>
                      <option value="Irish">Irish</option>
                      <option value="Italian">Italian</option>
                      <option value="Japanese">Japanese</option>
                      <option value="Javanese">Javanese</option>
                      <option value="Korean">Korean</option>
                      <option value="Latin">Latin</option>
                      <option value="Latvian">Latvian</option>
                      <option value="Lithuanian">Lithuanian</option>
                      <option value="Macedonian">Macedonian</option>
                      <option value="Malay">Malay</option>
                      <option value="Malayalam">Malayalam</option>
                      <option value="Maltese">Maltese</option>
                      <option value="Maori">Maori</option>
                      <option value="Marathi">Marathi</option>
                      <option value="Mongolian">Mongolian</option>
                      <option value="Nepali">Nepali</option>
                      <option value="Norwegian">Norwegian</option>
                      <option value="Persian">Persian</option>
                      <option value="Polish">Polish</option>
                      <option value="Portuguese">Portuguese</option>
                      <option value="Punjabi">Punjabi</option>
                      <option value="Quechua">Quechua</option>
                      <option value="Romanian">Romanian</option>
                      <option value="Russian">Russian</option>
                      <option value="Samoan">Samoan</option>
                      <option value="Serbian">Serbian</option>
                      <option value="Slovak">Slovak</option>
                      <option value="Slovenian">Slovenian</option>
                      <option value="Spanish">Spanish</option>
                      <option value="Swahili">Swahili</option>
                      <option value="Swedish ">Swedish </option>
                      <option value="Tamil">Tamil</option>
                      <option value="Tatar">Tatar</option>
                      <option value="Telugu">Telugu</option>
                      <option value="Thai">Thai</option>
                      <option value="Tibetan">Tibetan</option>
                      <option value="Tonga">Tonga</option>
                      <option value="Turkish">Turkish</option>
                      <option value="Ukrainian">Ukrainian</option>
                      <option value="Urdu">Urdu</option>
                      <option value="Uzbek">Uzbek</option>
                      <option value="Vietnamese">Vietnamese</option>
                      <option value="Welsh">Welsh</option>
                      <option value="Xhosa">Xhosa</option> */}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xl={12} lg={12} md={12} sm={12}>
                  <FormGroup>
                    <Label style={labelStyle} for="placeOfArbitration">
                      {document.dir == "ltr"
                        ? "Place of Arbitartion"
                        : "مكان التحكيم"}
                    </Label>
                    {alertPlaceOfArbitration ? (
                      <span style={styles.warning}>
                        {document.dir == "ltr"
                          ? " This field cannot be empty "
                          : " إملاء هذه المساحة إلزامي "}
                      </span>
                    ) : (
                      <span
                        style={{
                          float: document.dir == "ltr" ? "left" : "right",
                          color: "red",
                          fontWeight: "bold",
                        }}
                      >
                        {" "}
                        *{" "}
                      </span>
                    )}{" "}
                    <Input
                      type="text"
                      name="placeOfArbitration"
                      id="placeOfArbitration"
                      onChange={handleChange("placeOfArbitration")}
                      defaultValue={values.placeOfArbitration}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xl={12} lg={12} md={12} sm={12}>
                  <FormGroup>
                    <Label style={labelStyle} for="governingLaw">
                      {document.dir == "ltr"
                        ? ` Governing Law (
                        excluding the clauses which conflict with the Provisions of
                        Islamic Shari'ah )
                      `
                        : "القانون الحاكم"}
                    </Label>
                    {alertGoverningLaw ? (
                      <span style={styles.warning}>
                        {document.dir == "ltr"
                          ? " This field cannot be empty "
                          : " إملاء هذه المساحة إلزامي "}
                      </span>
                    ) : (
                      <span
                        style={{
                          float: document.dir == "ltr" ? "left" : "right",
                          color: "red",
                          fontWeight: "bold",
                        }}
                      >
                        {" "}
                        *{" "}
                      </span>
                    )}{" "}
                    <Input
                      type="text"
                      name="governingLaw"
                      id="governingLaw"
                      onChange={handleChange("governingLaw")}
                      defaultValue={values.governingLaw}
                    />
                  </FormGroup>
                </Col>
              </Row>
              {/* <Row>
                <Col xl={12} lg={12} md={12} sm={12}>
                  <FormGroup>
                    <Label style={labelStyle} for="numberOfArbitrators">
                      {document.dir == "ltr"
                        ? `Select the Number of Arbitrator(s) as per the Arbitration
                      Agreement or Arbitration Clause.`
                        : "عدد المحكمين لسير إجراءات التحكيم"}
                    </Label>
                    {alertNumberOfArbitrators ? (
                      <span style={styles.warning}>
                        {document.dir == "ltr"
                          ? " This field cannot be empty "
                          : " إملاء هذه المساحة إلزامي "}
                      </span>
                    ) : (
                      <span
                        //  style={styles.red}
                        style={{
                          float: document.dir == "ltr" ? "left" : "right",
                          color: "red",
                          fontWeight: "bold",
                        }}
                      >
                        {" "}
                        *{" "}
                      </span>
                    )}
                    <Input
                      type="select"
                      name="numberOfArbitrators"
                      id="numberOfArbitrators"
                      onChange={handleChange("numberOfArbitrators")}
                      defaultValue={values.numberOfArbitrators}
                    >
                      <option></option>
                      <option>{document.dir == "ltr" ? "1" : "١"}</option>
                      <option>{document.dir == "ltr" ? "3" : "٣"}</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row> */}
              <Row>
                <Col>
                  <FormGroup>
                    <Label style={labelStyle} for="otherRequests">
                      {document.dir == "ltr"
                        ? "Other Request (If Any)"
                        : "رفع ملف إضافي آخر"}
                    </Label>
                    <Input
                      type="textarea"
                      name="otherRequests"
                      id="otherRequests"
                      onChange={handleChange("otherRequests")}
                      defaultValue={values.otherRequests}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row
                style={{ textAlign: document.dir == "ltr" ? "left" : "right" }}
              >
                <Col style={styles.text}>
                  <i>
                    {document.dir == "ltr"
                      ? `Hence, based on what has been mentioned above, the Claimant
                    hereby requests IICRA to conduct the Arbitration proceedings
                    to settle the dispute under IICRA Arbitration Rules.`
                      : `وعليه، بناءً على ما ذكر أعلاه، يتقدم المحتكم بطلب سير إجراءات التحكيم من المركز لتسوية النزاع بتحقيق العدالة بموجب قواعد التحكيم لدى المركز.`}
                  </i>
                </Col>
              </Row>
              <Button style={styles.buttonBack} onClick={this.back}>
                {document.dir == "ltr" ? "Back" : "ارجع"}
              </Button>
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

export default OtherSuggestions;
