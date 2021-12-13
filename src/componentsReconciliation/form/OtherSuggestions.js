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
  CustomInput,
  Progress,
} from "reactstrap";
import tick from "../../assets/tick.png";

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

  continue = (e) => {
    e.preventDefault();

    const {
      arbitrationLanguage,
      governingLaw,
      numberOfArbitrators,
    } = this.props.values;

    if (validator.isEmpty(arbitrationLanguage) || arbitrationLanguage == " ") {
      this.setState({
        alertArbitrationLanguage: true,
      });
    } else if (validator.isEmpty(governingLaw) || governingLaw == " ") {
      this.setState({
        alertGoverningLaw: true,
      });
    } else if (
      validator.isEmpty(numberOfArbitrators) ||
      numberOfArbitrators == " "
    ) {
      this.setState({
        alertNumberOfArbitrators: true,
      });
    } else {
      this.props.nextStep();
    }

    // this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
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
            <ul

            // style={{
            //   marginBottom: "30px",
            //   overflow: "hidden",
            //   color: "lightgrey",
            // }}
            >
              <li
                id="claimant"
                style={{
                  display: "inline",
                  listStyleType: "none",
                  fontSize: "15px",
                  width: "50px",
                  height: "50px",
                  lineHeight: "45px",
                  background: "green",
                  borderRadius: "50%",
                  margin: "0vw 3.6vw 0vw 3.6vw",
                  padding: "2vh 2vh",
                }}
              >
                <img
                  src={tick}
                  style={{ height: "3vh", width: "3vh" }}
                  alt="step finished"
                />
              </li>
              <li
                id="respondent"
                style={{
                  display: "inline",

                  listStyleType: "none",
                  fontSize: "15px",
                  width: "50px",
                  height: "50px",
                  lineHeight: "45px",
                  background: "green",
                  borderRadius: "50%",
                  margin: "0vw 3.6vw 0vw 3.6vw",
                  padding: "2vh 2vh",
                }}
              >
                <img
                  src={tick}
                  style={{ height: "3vh", width: "3vh" }}
                  alt="step finished"
                />
              </li>
              <li
                id="dispute"
                style={{
                  display: "inline",

                  listStyleType: "none",
                  fontSize: "15px",
                  width: "50px",
                  height: "50px",
                  lineHeight: "45px",
                  background: "green",
                  borderRadius: "50%",
                  margin: "0vw 3.6vw 0vw 3.6vw",
                  padding: "2vh 2vh",
                }}
              >
                <img
                  src={tick}
                  style={{ height: "3vh", width: "3vh" }}
                  alt="step finished"
                />
              </li>
              <li
                id="arbitrator"
                style={{
                  display: "inline",
                  listStyleType: "none",
                  fontSize: "15px",
                  width: "50px",
                  height: "50px",
                  lineHeight: "45px",
                  background: "green",
                  borderRadius: "50%",
                  margin: "0vw 3.6vw 0vw 3.6vw",
                  padding: "2vh 2vh",
                }}
              >
                <img
                  src={tick}
                  style={{ height: "3vh", width: "3vh" }}
                  alt="step finished"
                />
              </li>
              <li
                id="suggestion"
                style={{
                  display: "inline",
                  color: "lightgray",
                  listStyleType: "none",
                  fontSize: "15px",
                  width: "50px",
                  height: "50px",
                  lineHeight: "45px",
                  background: "green",
                  borderRadius: "50%",
                  margin: "0vw 3.6vw 0vw 3.6vw",
                  padding: "2vh 3.2vh",
                }}
              >
                <strong>5</strong>
              </li>
              <li
                id="Undertakings"
                style={{
                  display: "inline",
                  color: "black",
                  listStyleType: "none",
                  fontSize: "15px",
                  width: "50px",
                  height: "50px",
                  lineHeight: "45px",
                  background: "lightgray",
                  borderRadius: "50%",
                  margin: "0vw 3.6vw 0vw 3.6vw",
                  padding: "2vh 3.2vh",
                }}
              >
                <strong>6</strong>
              </li>
              <li
                id="eSignature"
                style={{
                  display: "inline",
                  color: "black",
                  listStyleType: "none",
                  fontSize: "15px",
                  width: "50px",
                  height: "50px",
                  lineHeight: "45px",
                  background: "lightgray",
                  borderRadius: "50%",
                  margin: "0vw 3.6vw 0vw 3.6vw",
                  padding: "2vh 3.2vh",
                }}
              >
                <strong>7</strong>
              </li>
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
        <h3 style={styles.center}>Other Suggestions</h3>
        <Card style={styles.cardBg}>
          <CardBody>
            <Form>
              <Row>
                <Col xl={12} lg={12} md={12} sm={12}>
                  <FormGroup>
                    <Label for="arbitrationLanguage">
                      Language of Arbitration
                    </Label>
                    {alertArbitrationLanguage ? (
                      <span style={styles.warning}>
                        {" "}
                        This field cannot be empty
                      </span>
                    ) : (
                      <span style={styles.red}> *</span>
                    )}
                    <Input
                      type="select"
                      name="arbitrationLanguage"
                      id="arbitrationLanguage"
                      placeholder="language"
                      onChange={handleChange("arbitrationLanguage")}
                      defaultValue={values.arbitrationLanguage}
                    >
                      <option></option>
                      <option value="Afrikaans">Afrikaans</option>
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
                      <option value="Xhosa">Xhosa</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xl={12} lg={12} md={12} sm={12}>
                  <FormGroup>
                    <Label for="placeOfArbitration">Place of Arbitartion</Label>
                    {alertPlaceOfArbitration ? (
                      <span style={styles.warning}>
                        {" "}
                        This field cannot be empty
                      </span>
                    ) : (
                      <span style={styles.red}> *</span>
                    )}{" "}
                    <Input
                      type="text"
                      name="placeOfArbitration"
                      id="placeOfArbitration"
                      placeholder="place of arbitration"
                      onChange={handleChange("placeOfArbitration")}
                      defaultValue={values.placeOfArbitration}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xl={12} lg={12} md={12} sm={12}>
                  <FormGroup>
                    <Label for="governingLaw">
                      Governing Law (
                      <i>
                        excluding the clauses which contradict the Provisions of
                        Islamic Shari'ah
                      </i>
                      )
                    </Label>
                    {alertGoverningLaw ? (
                      <span style={styles.warning}>
                        {" "}
                        This field cannot be empty
                      </span>
                    ) : (
                      <span style={styles.red}> *</span>
                    )}{" "}
                    <Input
                      type="text"
                      name="governingLaw"
                      id="governingLaw"
                      placeholder="law"
                      onChange={handleChange("governingLaw")}
                      defaultValue={values.governingLaw}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xl={12} lg={12} md={12} sm={12}>
                  <FormGroup>
                    <Label for="numberOfArbitrators">
                      Select the Number of Arbitrator(s) as per the Arbitration
                      Agreement or Arbitration Clause.
                    </Label>
                    {alertNumberOfArbitrators ? (
                      <span style={styles.warning}>
                        {" "}
                        This field cannot be empty
                      </span>
                    ) : (
                      <span style={styles.red}> *</span>
                    )}
                    <Input
                      type="select"
                      name="numberOfArbitrators"
                      id="numberOfArbitrators"
                      placeholder="no. of arbitrators"
                      onChange={handleChange("numberOfArbitrators")}
                      defaultValue={values.numberOfArbitrators}
                    >
                      <option></option>
                      <option>1</option>
                      <option>3</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="otherRequests">Other Request If Any</Label>
                    <Input
                      type="textarea"
                      name="otherRequests"
                      id="otherRequests"
                      placeholder="other requests"
                      onChange={handleChange("otherRequests")}
                      defaultValue={values.otherRequests}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col style={styles.text}>
                  <i>
                    Hence, based on what has been mentioned above, the Claimant
                    hereby requests IICRA to conduct the Arbitration proceedings
                    to settle the dispute under IICRA Arbitration Rules.{" "}
                  </i>
                </Col>
              </Row>
              <Button style={styles.buttonBack} onClick={this.back}>
                Back
              </Button>
              <Button style={styles.button} onClick={this.continue}>
                Continue
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
