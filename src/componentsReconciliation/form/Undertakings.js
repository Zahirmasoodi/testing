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
  Container,
  CustomInput,
  Input,
  Progress,
} from "reactstrap";
import tick from "../../assets/tick.png";

export class Undertakings extends Component {
  state = {
    ackCorrectInfo: false,
  };

  handleAckCorrectInfo = (e) => {
    this.setState({
      [e.target.name]: !this.state.ackCorrectInfo,
    });
  };

  continue = (e) => {
    e.preventDefault();
    if (this.state.ackCorrectInfo) this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
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
                    id="arbitrator"
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
                    id="Undertakings"
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
              value="75"
              style={{ textAlign: "right" }}
            />
          </Col>
        </Row>
        <h3 style={styles.center}>Undertakings</h3>
        <Card style={styles.cardBg}>
          <CardBody>
            <Form>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>
                      <ul>
                        <li>
                          I/We hereby declare that all the information provided
                          herein, and the attachments thereto are true and
                          accurate and to the best of my knowledge and belief.
                          If there is any change in the information provided, I
                          agree to promptly notify IICRA of the same.
                          <span style={styles.red}>
                            <b> *</b>
                          </span>
                        </li>
                      </ul>
                    </Label>
                    {/* <CustomInput
                      type="switch"
                      id="ackCorrectInfo"
                      name="ackCorrectInfo"
                      label=""
                      value={this.state.ackCorrectInfo}
                      onChange={this.handleAckCorrectInfo}
                    /> */}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>
                      <ul>
                        <li>
                          /We Pursuant to this RFC, pledge to settle the dispute
                          under IICRA in accordance with its Rules without any
                          objection or procrastination.
                          <span style={styles.red}>
                            <b> *</b>
                          </span>
                        </li>
                      </ul>
                    </Label>
                    {/* <CustomInput
                      type="switch"
                      id="ackPledge"
                      name="ackPledge"
                      label=""
                      value={this.state.ackPledge}
                      onChange={this.handleAckPledge}
                    /> */}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>
                      <ul>
                        <li>
                          For the purposes of communication and reporting in
                          this Conciliation proceeding, I/We acknowledge the
                          usage of IICRA e-mail and its Conciliation platform
                          along with any other means of communication adopted by
                          IICRA.
                          <span style={styles.red}>
                            <b> *</b>
                          </span>
                        </li>
                      </ul>
                    </Label>
                    {/* <CustomInput
                      type="switch"
                      id="ackRegistrationFee"
                      name="ackRegistrationFee"
                      label=""
                      value={this.state.ackRegistrationFee}
                      onChange={this.handleAckRegistrationFee}
                    /> */}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>
                      <ul>
                        <li>
                          I/We hereby authorize IICRA to use the above-
                          mentioned details for communication purposes.
                          <span style={styles.red}>
                            <b> *</b>
                          </span>
                        </li>
                      </ul>
                    </Label>
                    {/* <CustomInput
                      type="switch"
                      id="ackEmailIicra"
                      name="ackEmailIicra"
                      label=""
                      value={this.state.ackEmailIicra}
                      onChange={this.ackEmailIicra}
                    /> */}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>
                      <ul>
                        <li>
                          I confirm that I have uploaded the contract including
                          the conciliation clause.
                          <span style={styles.red}>
                            <b> *</b>
                          </span>
                        </li>
                      </ul>
                    </Label>
                    {/* <CustomInput
                      type="switch"
                      id="ackAuthIicraCommunication"
                      name="ackAuthIicraCommunication"
                      label=""
                      value={this.state.ackAuthIicraCommunication}
                      onChange={this.handleAckAuthIicraCommunication}
                    /> */}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>
                      <ul>
                        <li>
                          Where applicable, I confirm that I have uploaded a
                          Power of Attorney.
                          <span style={styles.red}>
                            <b> *</b>
                          </span>
                        </li>
                      </ul>
                    </Label>
                    {/* <CustomInput
                      type="switch"
                      id="ackUploadContractAndAuth"
                      name="ackUploadContractAndAuth"
                      label=""
                      value={this.state.ackUploadContractAndAuth}
                      onChange={this.handleAckUploadContractAndAuth}
                    /> */}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col style={{ textAlign: "center" }}>
                  <FormGroup>
                    {/* <CustomInput
                      type="checkbox"
                      id="ackCorrectInfo"
                      name="ackCorrectInfo"
                      label=""
                      value={this.state.ackCorrectInfo}
                      onChange={this.handleAckCorrectInfo}
                    /> */}
                    <Label check>
                      <Input
                        type="checkbox"
                        id="ackCorrectInfo"
                        name="ackCorrectInfo"
                        label=""
                        value={this.state.ackCorrectInfo}
                        onChange={this.handleAckCorrectInfo}
                        style={{
                          transform: "scale(1.7)",
                        }}
                      />
                      <span style={styles.text} className="ml-2">
                        Review and Submit
                      </span>
                      <br />
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
              <Row className="mb-4">
                <Col style={{ textAlign: "center" }}>
                  {/* <span style={styles.text}>Review and Submit:</span> <br />
                  <br /> */}
                  <i>
                    The parties will receive an official letter initiating this
                    proceeding once all filing requirements have been satisfied.
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
    fontWeight: "bold",
  },
  top: {
    paddingTop: "5vh",
  },
  red: {
    color: "red",
    fontWeight: "bolder",
  },
  progress: {
    marginBottom: "4vh",
  },
};

export default Undertakings;
