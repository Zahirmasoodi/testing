import React, { Component, Fragment } from "react";
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
  Tooltip,
} from "reactstrap";
import info from "../../assets/info.png";
import tick from "../../assets/tick.png";

export class Confirm extends Component {
  state = {
    alertNatureOfDispute: false,
    alertNumberOfArbitrators: false,
    alertValueOfDispute: false,
    alertArbitrationLanguage: false,
    alertRecitals: false,
    alertLegalGrounds: false,
    alertReliefSought: false,
    alertDisputeDocuments: false,
    alertArbitrationAgreement: false,
    nodHelp: false,
    recitalsHelp: false,
    legalHelp: false,
    reliefHelp: false,
  };

  continue = (e) => {
    e.preventDefault();

    const {
      natureOfDispute,
      valueOfDispute,
      arbitrationLanguage,
      numberOfArbitrators,
      otherRequests,
      recitals,
      legalGrounds,
      reliefSought,
      disputeDocuments,
      arbitrationAgreement,
    } = this.props.values;

    if (validator.isEmpty(natureOfDispute) || natureOfDispute == " ") {
      this.setState({
        alertNatureOfDispute: true,
      });
    } else if (validator.isEmpty(valueOfDispute) || valueOfDispute == " ") {
      this.setState({
        alertValueOfDispute: true,
      });
    } else if (
      validator.isEmpty(arbitrationLanguage) ||
      arbitrationLanguage == " "
    ) {
      this.setState({
        alertArbitrationLanguage: true,
      });
    } else if (
      validator.isEmpty(numberOfArbitrators) ||
      numberOfArbitrators == " "
    ) {
      this.setState({
        alertNumberOfArbitrators: true,
      });
    } else if (disputeDocuments == null) {
      this.setState({
        alertDisputeDocuments: true,
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

  toggle = () => {
    this.setState({
      toolTip: !this.state.toolTip,
    });
  };

  render() {
    const { values, handleChange, handleFileChange } = this.props;

    const {
      alertNatureOfDispute,
      alertValueOfDispute,
      alertArbitrationLanguage,
      alertNumberOfArbitrators,
      alertRecitals,
      alertLegalGrounds,
      alertReliefSought,
      alertArbitrationAgreement,
      alertDisputeDocuments,
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
                      color: "lightgray",
                      fontSize: "15px",
                      background: "green",
                      borderRadius: "50%",
                      padding: "2vh 14%",
                      lineHeight: "45px",
                    }}
                  >
                    <strong>3</strong>
                  </li>
                </Col>
                <Col>
                  <li
                    id="arbitrator"
                    style={{
                      display: "inline",
                      color: "black",
                      fontSize: "15px",
                      background: "lightgray",
                      borderRadius: "50%",
                      padding: "2vh 14%",
                      lineHeight: "45px",
                    }}
                  >
                    <strong>4</strong>
                  </li>
                </Col>
                <Col>
                  <li
                    id="Undertakings"
                    style={{
                      display: "inline",
                      color: "black",
                      fontSize: "15px",
                      background: "lightgray",
                      borderRadius: "50%",
                      padding: "2vh 14%",
                      lineHeight: "45px",
                    }}
                  >
                    <strong>5</strong>
                  </li>
                </Col>
                <Col>
                  <li
                    id="eSignature"
                    style={{
                      display: "inline",
                      color: "black",
                      fontSize: "15px",
                      background: "lightgray",
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
              value="37.5"
              style={{ textAlign: "right", borderRadius: "50px" }}
            />
          </Col>
        </Row>
        <h6 style={styles.center}>Nature of Dispute</h6>
        <Card style={styles.cardBg}>
          <CardBody>
            <Form>
              <Row>
                <Col xl={12} lg={12} md={12} sm={12}>
                  <FormGroup>
                    <Label for="natureOfDispute" lg={10} md={10}>
                      Nature of Dispute <span style={styles.red}> *</span>
                    </Label>
                    <Label lg={2} md={2} style={{ textAlign: "right" }}>
                      <span
                        onMouseOver={() =>
                          this.setState({
                            nodHelp: true,
                          })
                        }
                        onMouseOut={() =>
                          this.setState({
                            nodHelp: false,
                          })
                        }
                      >
                        <b className="ml-5" style={styles.toolTip}>
                          <img src={info} alt="info" style={styles.toolTip} />
                        </b>
                      </span>
                    </Label>
                    {alertNatureOfDispute ? (
                      <span style={styles.warning}>
                        This field cannot be empty
                      </span>
                    ) : null}
                    {this.state.nodHelp ? (
                      <div>
                        <i style={styles.toolTip}>
                          Please describe the factual background of the dispute,
                          the relation between the parties whether contractual
                          or non-contractual, and the legal position of the
                          parties.
                        </i>
                      </div>
                    ) : null}
                    <Input
                      type="textarea"
                      name="natureOfDispute"
                      id="natureOfDispute"
                      onChange={handleChange("natureOfDispute")}
                      defaultValue={values.natureOfDispute}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xl={12} lg={12} md={12} sm={12}>
                  <FormGroup>
                    <Label for="valueOfDispute" lg={12} md={12}>
                      Approximate Value of Dispute ${" "}
                      <i style={{ color: "gray" }}>( USD )</i>
                      <span style={styles.red}> *</span>
                    </Label>
                    {alertValueOfDispute ? (
                      <span style={styles.warning}>
                        This field cannot be empty
                      </span>
                    ) : null}
                    <Input
                      type="number"
                      name="valueOfDispute"
                      id="valueOfDispute"
                      onChange={handleChange("valueOfDispute")}
                      defaultValue={values.valueOfDispute}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xl={12} lg={12} md={12} sm={12}>
                  <FormGroup>
                    <Label for="arbitrationLanguage">
                      Language of Reconciliation
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
                    <Label for="numberOfArbitrators">
                      Select the Number of Conciliator(s) to conduct the
                      Conciliation Proceedings:
                    </Label>
                    {alertNumberOfArbitrators ? (
                      <span style={styles.warning}>
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
                <Col xl={12} lg={12} md={12} sm={12}>
                  <FormGroup>
                    <Label for="disputeDocuments">Dispute Documents</Label>{" "}
                    {alertDisputeDocuments ? (
                      <span style={styles.warning}>
                        This field cannot be empty
                      </span>
                    ) : (
                      <span style={styles.red}> *</span>
                    )}
                    <Input
                      id="disputeDocuments"
                      name="disputeDocuments"
                      type="file"
                      onChange={handleFileChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xl={12} lg={12} md={12} sm={12}>
                  <FormGroup>
                    <Label for="conciliationClauses">
                      Conciliation Clauses
                    </Label>
                    <Input
                      id="conciliationClauses"
                      name="conciliationClauses"
                      type="file"
                      // onChange={handleChange("arbitrationAgreement")}
                      onChange={handleFileChange}
                      // defaultValue={values.arbitrationAgreement}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xl={12} lg={12} md={12} sm={12}>
                  <FormGroup>
                    <Label for="otherDocuments">Other Documents</Label>
                    <Input
                      id="otherDocuments"
                      name="otherDocuments"
                      type="file"
                      // onChange={handleChange("arbitrationAgreement")}
                      onChange={handleFileChange}
                      // defaultValue={values.arbitrationAgreement}
                    />
                  </FormGroup>
                </Col>
              </Row>{" "}
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
              {/* <Row>
                <Col xl={12} lg={12} md={12} sm={12}>
                  <FormGroup>
                    <Label for="recitals" lg={10} md={10}>
                      Recitals<span style={styles.red}> *</span>
                    </Label>
                    <Label lg={2} md={2} style={{ textAlign: "right" }}>
                      <span
                        onMouseOver={() =>
                          this.setState({
                            recitalsHelp: true,
                          })
                        }
                        onMouseOut={() =>
                          this.setState({
                            recitalsHelp: false,
                          })
                        }
                      >
                        <b className="ml-5" style={styles.toolTip}>
                          <img src={info} alt="info" style={styles.toolTip} />
                        </b>
                      </span>
                    </Label>
                    {alertRecitals ? (
                      <span style={styles.warning}>
                        This field cannot be empty
                      </span>
                    ) : null}
                    {this.state.recitalsHelp ? (
                      <div>
                        <i style={styles.toolTip}>
                          Please address few key points of the agreement, for
                          example , who the parties are, and their purpose for
                          entering into the agreement.
                        </i>
                      </div>
                    ) : null}
                    <Input
                      type="textarea"
                      name="recitals"
                      id="recitals"
                      onChange={handleChange("recitals")}
                      defaultValue={values.recitals}
                    />
                  </FormGroup>
                </Col>
              </Row> */}
              {/* <Row>
                <Col xl={12} lg={12} md={12} sm={12}>
                  <FormGroup>
                    <Label for="legalGrounds" lg={10} md={10}>
                      Legal Grounds<span style={styles.red}> *</span>
                    </Label>
                    <Label lg={2} md={2} style={{ textAlign: "right" }}>
                      <span
                        onMouseOver={() =>
                          this.setState({
                            legalHelp: true,
                          })
                        }
                        onMouseOut={() =>
                          this.setState({
                            legalHelp: false,
                          })
                        }
                      >
                        <b className="ml-5" style={styles.toolTip}>
                          <img src={info} alt="info" style={styles.toolTip} />
                        </b>
                      </span>
                    </Label>
                    {alertLegalGrounds ? (
                      <span style={styles.warning}>
                        {" "}
                        This field cannot be empty
                      </span>
                    ) : null}
                    {this.state.legalHelp ? (
                      <div>
                        <i style={styles.toolTip}>
                          Please specify the sections that set forth the
                          obligation, statements and promises, which the
                          respective parties rely upon entering into the
                          agreement.
                        </i>
                      </div>
                    ) : null}
                    <Input
                      type="textarea"
                      name="legalGrounds"
                      id="legalGrounds"
                      onChange={handleChange("legalGrounds")}
                      defaultValue={values.legalGrounds}
                    />
                  </FormGroup>
                </Col>
              </Row> */}
              {/* <Row>
                <Col xl={12} lg={12} md={12} sm={12}>
                  <FormGroup>
                    <Label for="reliefSought" lg={10} md={10}>
                      Relief Sought <span style={styles.red}> *</span>
                    </Label>
                    <Label lg={2} md={2} style={{ textAlign: "right" }}>
                      <span
                        onMouseOver={() =>
                          this.setState({
                            reliefHelp: true,
                          })
                        }
                        onMouseOut={() =>
                          this.setState({
                            reliefHelp: false,
                          })
                        }
                      >
                        <b className="ml-5" style={styles.toolTip}>
                          <img src={info} alt="info" style={styles.toolTip} />
                        </b>
                      </span>
                    </Label>
                    {alertReliefSought ? (
                      <span style={styles.warning}>
                        {" "}
                        This field cannot be empty
                      </span>
                    ) : null}
                    {this.state.reliefHelp ? (
                      <div>
                        <i style={styles.toolTip}>
                          The Claimant requests to initiate the Arbitration
                          Proceedings for rendering the following.
                        </i>
                      </div>
                    ) : null}
                    <Input
                      type="textarea"
                      name="reliefSought"
                      id="reliefSought"
                      onChange={handleChange("reliefSought")}
                      defaultValue={values.reliefSought}
                    />
                  </FormGroup>
                </Col>
              </Row> */}
              <Button style={styles.buttonBack} onClick={this.back}>
                Back
              </Button>
              <Button
                color="primary"
                style={styles.button}
                onClick={this.continue}
              >
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
    borderRadius: "10px",
  },
  cardBg: {
    backgroundColor: "#f6f6f6",
    border: "none",
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
    paddingBottom: "5vh",
    backgroundColor: "#f6f6f6",
  },
  progress: {
    marginBottom: "4vh",
  },
  warning: {
    color: "red",
    textAlign: "right",
  },
  toolTip: {
    height: "3vh",
    color: "blue",
  },
  red: {
    color: "red",
    fontWeight: "bolder",
  },
};

export default Confirm;
