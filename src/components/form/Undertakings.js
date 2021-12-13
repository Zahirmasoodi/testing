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
  Input,
  Progress,
} from "reactstrap";
import tick from "../../assets/tick.png";
import Swal from "sweetalert2";

export class Undertakings extends Component {
  state = {
    ackCorrectInfo: false,
  };

  handleAckCorrectInfo = (e) => {
    this.setState({
      [e.target.name]: !this.state.ackCorrectInfo,
    });
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  continue = (e) => {
    e.preventDefault();
    if (this.state.ackCorrectInfo) {
      this.props.nextStep();
    } else {
      Swal.fire({
        title:
          document.dir == "ltr"
            ? "You need to Accept our Terms & Conditions"
            : "انت تحتاج إلى قبول الشروط والأحكام الخاصة بنا",
        icon: "error",
      });
    }
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
                    id="Undertakings"
                    style={{
                      display: "inline",
                      color: "lightgray",
                      fontSize: "15px",
                      lineHeight: "45px",
                      background: "green",
                      borderRadius: "50%",
                      padding: "2vh 17%",
                    }}
                  >
                    <strong>{document.dir == "ltr" ? "6" : "٦"}</strong>
                  </li>
                </Col>
                <Col>
                  <li
                    id="eSignature"
                    style={{
                      display: "inline",
                      color: "black",
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
              value="75"
              style={{ textAlign: "right" }}
            />
          </Col>
        </Row>
        <h6 style={styles.center}>
          {document.dir == "ltr" ? "Undertakings" : "تعهدات"}
        </h6>
        <Card style={styles.cardBg}>
          <CardBody>
            <Form>
              <Row>
                <Col>
                  <FormGroup>
                    <Label
                      style={{
                        float: document.dir == "ltr" ? "left" : "right",
                      }}
                    >
                      <ul>
                        <li>
                          {document.dir == "ltr"
                            ? `I/We hereby declare that all the information provided
                          herein, and the attachments thereto are true and
                          accurate to the best of my knowledge and belief. If
                          there is any change in the information provided, I
                          agree to promptly notify IICRA of the same.`
                            : `المعلومات الواردة هنا، وأي مرفقات، صحيحة ودقيقة على حد علمي واعتقادي. وإذا طرأ أي تغيير على المعلومات المقدمة، فإني أتعهد بإخطار المركز على الفور.`}
                          <span style={styles.red}>
                            <b> *</b>
                          </span>
                        </li>
                      </ul>
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label
                      style={{
                        float: document.dir == "ltr" ? "left" : "right",
                      }}
                    >
                      <ul>
                        <li>
                          {document.dir == "ltr"
                            ? `I/We Pursuant to this RFA, pledge to settle the
                          dispute under IICRA in accordance with its Rules
                          without any objection or procrastination.
                       `
                            : `بمقتضى هذا الطلب، أتعهد بفض النزاع الماثل لدى المركز وفق قواعده دون أي اعتراض أو مماطلة.`}{" "}
                          <span style={styles.red}>
                            <b> *</b>
                          </span>
                        </li>
                      </ul>
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label
                      style={{
                        float: document.dir == "ltr" ? "left" : "right",
                      }}
                    >
                      <ul>
                        <li>
                          {document.dir == "ltr"
                            ? ` I/We shall pay the registration fees and the
                          Arbitration expenses determined by IICRA once the
                          Request for Arbitration (RFA) is accepted.`
                            : `سأقوم بسداد رسوم تسجيل الدعوى التحكيمية ونفقات التحكيمية التي يحددها المركز بمجرد قبول الطلب`}
                          <span style={styles.red}>
                            <b> *</b>
                          </span>
                        </li>
                      </ul>
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label
                      style={{
                        float: document.dir == "ltr" ? "left" : "right",
                      }}
                    >
                      <ul>
                        <li>
                          {document.dir == "ltr"
                            ? `For the purposes of communication and reporting in
                          this Arbitration Case, I/We acknowledge the usage of
                          IICRA e-mail and its Arbitration platform along with
                          any other means of communication adopted by IICRA.`
                            : `لغايات التواصل والإبلاغ في الدعوى التحكيمية الماثلة، أقر باستخدام البريد الإلكتروني ومنصة التحكيم الخاصة بالمركز إضافة إلى أي وسائل تبليغ أخرى يعتمدها الركز `}
                          <span style={styles.red}>
                            <b> *</b>
                          </span>
                        </li>
                      </ul>
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label
                      style={{
                        float: document.dir == "ltr" ? "left" : "right",
                      }}
                    >
                      <ul>
                        <li>
                          {document.dir == "ltr"
                            ? `I/We hereby authorize IICRA to use the above-
                          mentioned details for communication purposes.`
                            : `أسمح للمركز باستخدام المعلومات المقدمة في هذا النموذج لأغراض تبليغية`}
                          <span style={styles.red}>
                            <b> *</b>
                          </span>
                        </li>
                      </ul>
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label
                      style={{
                        float: document.dir == "ltr" ? "left" : "right",
                      }}
                    >
                      <ul>
                        <li>
                          {document.dir == "ltr"
                            ? `  I hereby confirm that I have uploaded all the relevant
                          documents related to the dispute such as the contract
                          of dispute and arbitration agreement or arbitration
                          clause.`
                            : `أؤكد بأنني قمت بتحميل العقد بما في ذلك شرط التحكيم أو مشارطة التحكيم، عند الاقتضاء`}
                          <span style={styles.red}>
                            <b> *</b>
                          </span>
                        </li>
                      </ul>
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col style={{ textAlign: "center" }}>
                  <FormGroup>
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
                      <span style={styles.text} className="ml-2 mr-4">
                        {document.dir == "ltr" ? "I Agree" : "أنا أوافق"}
                      </span>
                      <br />
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
              <Row className="mb-4">
                <Col style={{ textAlign: "center" }}>
                  <i>
                    {document.dir == "ltr"
                      ? `The parties will receive an official letter initiating this
                    proceeding once all filing requirements have been satisfied.`
                      : "سيتلقى الأطراف رسالة رسمية لسير إجراءات التحكيم بمجرد استيفاء جميع المتطلبات الأساسية الموضَّحة أعلاه."}
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
