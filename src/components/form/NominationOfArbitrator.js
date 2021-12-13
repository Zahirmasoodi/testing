import React, { Component } from "react";
import validator from "validator";
import {
  Row,
  Card,
  CardBody,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  CardHeader,
  CustomInput,
  Progress,
} from "reactstrap";
import tick from "../../assets/tick.png";
import countries from "../../countries";
import countries_ from "../../countries_";
import countriesArray from "../../countriesArray";
import countriesArray_ from "../../countriesArray_";
import Swal from "sweetalert2";

export class NominationOfArbitrator extends Component {
  state = {
    iicraArbitrator: false,
    mandateIicraArbitrator: false,
    nominateArbitrator: false,
    form: false,

    enable1: false,
    enable2: false,
    enable3: false,

    alertArbitratorName: false,
    alertArbitratorUserName: false,
    alertArbitratorAddress: false,
    alertArbitratorEmail: "",
    alertArbitratorNationality: false,
    alertArbitratorPhone: "",
    alertCvOfArbitrator: false,
  };

  handleIicraArbitrator = () => {
    this.setState({
      mandateIicraArbitrator: false,
      nominateArbitrator: false,
      iicraArbitrator: !this.state.iicraArbitrator,
      enable1: !this.state.enable1,
      enable2: false,
      enable3: false,
      form: false,
    });
    this.props.handleArbitrator("iicra");
  };

  handleMandateIicraArbitrator = () => {
    this.setState({
      iicraArbitrator: false,
      nominateArbitrator: false,
      mandateIicraArbitrator: !this.state.mandateIicraArbitrator,
      enable1: false,
      enable2: !this.state.enable2,
      enable3: false,
      form: false,
    });
    this.props.handleArbitrator("mandate");
  };

  handleNominateArbitrator = () => {
    this.setState({
      mandateIicraArbitrator: false,
      iicraArbitrator: false,
      nominateArbitrator: !this.state.nominateArbitrator,
      enable1: false,
      enable2: false,
      enable3: !this.state.enable3,
      form: !this.state.form,
    });
    this.props.handleArbitrator("nominate");
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  continue = (e) => {
    e.preventDefault();

    if (!this.state.enable1 && !this.state.enable2 && !this.state.enable3) {
      Swal.fire({
        title: "Please Select an Option to Proceed!",
        icon: "warning",
      });
    }

    const {
      arbitratorName,
      arbitratorUserName,
      arbitratorAddress,
      arbitratorEmail,
      arbitratorNationality,
      arbitratorPhone,
      cvOfArbitrator,
    } = this.props.values;

    if (this.state.enable3) {
      if (validator.isEmpty(arbitratorName) || arbitratorName == "") {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The name of the Arbitrator is Missing"
              : "لا يوجد إسم المحكم",
          icon: "info",
        });
      } else if (
        validator.isEmpty(arbitratorUserName) ||
        arbitratorUserName == ""
      ) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The username of the Arbitrator is Missing"
              : "لا يوجد إسم المستخدم للمحكم",
          icon: "info",
        });
      } else if (
        validator.isEmpty(arbitratorNationality) ||
        arbitratorNationality == ""
      ) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The nationality of the Arbitrator is Missing"
              : "لا توجد جنسية المحكم",
          icon: "info",
        });
      } else if (
        validator.isEmpty(arbitratorAddress) ||
        arbitratorAddress == "لا يوجد عنوان المحكم"
      ) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The address of the Arbitrator is Missing"
              : "لا يوجد عنوان المحكم",
          icon: "info",
        });
      } else if (validator.isEmpty(arbitratorPhone) || arbitratorPhone == "") {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The mobile number of the Arbitrator is Missing"
              : "لا يوجد رقم هاتف للمحكم",
          icon: "info",
        });
      } else if (!validator.isMobilePhone(arbitratorPhone)) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The mobile number of the Arbitrator is invalid"
              : "رقم هاتف للمحكم غير صالح",
          icon: "info",
        });
      } else if (validator.isEmpty(arbitratorEmail) || arbitratorEmail == "") {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The email address of the Arbitrator is Missing"
              : "لا يوجد عنوان البريد الإلكتروني للمحكم",
          icon: "info",
        });
      } else if (!validator.isEmail(arbitratorEmail)) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The email address of the Arbitrator is invalid"
              : "عنوان البريد الإلكتروني للمحكم غير صالح",
          icon: "info",
        });
      } else if (cvOfArbitrator == null) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The CV address of the Arbitrator is Missing"
              : "لا توجد السيرة الذاتية للمحكم",
          icon: "info",
        });
      } else {
        this.props.nextStep();
      }
    } else {
      if (this.state.enable1) {
        this.props.nextStep();
      }
      if (this.state.enable2) {
        this.props.nextStep();
      }
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

    const { values, handleChange, handleFileChange } = this.props;

    const {
      alertArbitratorName,
      alertArbitratorUserName,
      alertArbitratorAddress,
      alertArbitratorEmail,
      alertArbitratorNationality,
      alertArbitratorPhone,
      alertCvOfArbitrator,
      enable1,
      enable2,
      enable3,
      form,
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
                      color: "lightgray",
                      display: "inline",
                      fontSize: "15px",
                      lineHeight: "45px",
                      background: "green",
                      borderRadius: "50%",
                      padding: "2vh 17%",
                    }}
                  >
                    <strong>{document.dir == "ltr" ? "4" : "٤"}</strong>
                  </li>
                </Col>
                <Col>
                  <li
                    id="suggestion"
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
                    <strong>{document.dir == "ltr" ? "6" : "٦"}</strong>
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
              value="50"
              style={{ textAlign: "right" }}
            />
          </Col>
        </Row>
        <h6 style={styles.center}>
          {document.dir == "ltr" ? "Nomination of Arbitrator" : "تسمية المحكم"}
        </h6>
        <Card style={styles.cardBg}>
          <CardBody>
            <Form>
              <Card style={styles.cardBgSecondary} className="shadow">
                <CardBody>
                  <FormGroup>
                    <div
                      style={{
                        textAlign: document.dir == "ltr" ? "left" : "right",
                      }}
                    >
                      <Label>
                        {document.dir == "ltr"
                          ? `I/We hereby mandate IICRA to nominate an Arbitrator on
                        my/our behalf to adjudicate the dispute.`
                          : "فإنني أفوض/ فإننا نفوض المركز لترشيح المحكم بالنيابة عني/ بالنيابة عنا للحكم في القضية."}
                      </Label>
                      <CustomInput
                        checked={enable2}
                        type="switch"
                        id="mandateIicraArbitrator"
                        name="nominateArbitrator"
                        value={this.state.mandateIicraArbitrator}
                        onChange={this.handleMandateIicraArbitrator}
                      />
                    </div>
                  </FormGroup>
                </CardBody>
              </Card>

              <Card style={styles.cardBgSecondary} className="shadow">
                <CardBody>
                  <FormGroup>
                    <div
                      style={{
                        textAlign: document.dir == "ltr" ? "left" : "right",
                      }}
                    >
                      <Label>
                        {document.dir == "ltr"
                          ? `I/We hereby request IICRA to recommend us an Arbitrator
                        Candidate to settle the dispute.`
                          : "فإنني أطلب/ فإننا نطلب من المركز لتوصية بمرشح محكم مناسب لتسوية النزاع"}
                      </Label>
                      <CustomInput
                        checked={enable1}
                        type="switch"
                        id="iicraArbitrator"
                        name="nominateArbitrator"
                        value={this.state.iicraArbitrator}
                        onChange={this.handleIicraArbitrator}
                      />
                    </div>
                  </FormGroup>
                </CardBody>
              </Card>

              <Card style={styles.cardBgSecondary} className="shadow">
                <CardBody>
                  <FormGroup>
                    <div
                      style={{
                        textAlign: document.dir == "ltr" ? "left" : "right",
                      }}
                    >
                      <Label>
                        {document.dir == "ltr"
                          ? "Nominate an Arbitrator."
                          : "قم بتسمية المحكم"}
                      </Label>
                      <CustomInput
                        checked={enable3}
                        type="switch"
                        id="nominateArbitrator"
                        name="nominateArbitrator"
                        value={this.state.nominateArbitrator}
                        onChange={this.handleNominateArbitrator}
                      />
                    </div>
                  </FormGroup>
                </CardBody>
              </Card>

              {form ? (
                <Card style={styles.cardBgSecondary}>
                  <CardHeader>
                    <h6 style={styles.center}>
                      {document.dir == "ltr"
                        ? "Arbitrator Details"
                        : "تفاصيل المحكم"}
                    </h6>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col xl={6} lg={6} md={6} sm={12}>
                        <FormGroup>
                          <Label style={labelStyle} for="arbitratorName">
                            {document.dir == "ltr"
                              ? "Full Name ( official )"
                              : "الإسم الكامل"}
                          </Label>
                          {alertArbitratorName ? (
                            <span style={styles.warning}>
                              {document.dir == "ltr"
                                ? " name is required "
                                : " الإسم مطلوب "}
                            </span>
                          ) : (
                            <span style={styles.red}> *</span>
                          )}
                          <Input
                            type="text"
                            name="arbitratorName"
                            id="arbitratorName"
                            onChange={handleChange("arbitratorName")}
                            defaultValue={values.arbitratorName}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col xl={6} lg={6} md={6} sm={12}>
                        <FormGroup>
                          <Label style={labelStyle} for="arbitratorUserName">
                            {document.dir == "ltr"
                              ? "User Name ( as per trade license )"
                              : "حسب الرخصة التجارية"}
                          </Label>
                          {alertArbitratorUserName ? (
                            <span style={styles.warning}>
                              {document.dir == "ltr"
                                ? " user name is required "
                                : " إسم المستخدم مطلوب "}
                            </span>
                          ) : (
                            <span style={styles.red}> *</span>
                          )}
                          <Input
                            type="text"
                            name="arbitratorUserName"
                            id="arbitratorUserName"
                            onChange={handleChange("arbitratorUserName")}
                            defaultValue={values.arbitratorUserName}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col xl={6} lg={6} md={6} sm={12}>
                        <FormGroup>
                          <Label style={labelStyle} for="arbitratorNationality">
                            {document.dir == "ltr" ? "Nationality" : "الجنسية"}
                          </Label>
                          {alertArbitratorNationality ? (
                            <span style={styles.warning}>
                              {document.dir == "ltr"
                                ? "nationality is required"
                                : " الجنسية مطلوبة "}
                            </span>
                          ) : (
                            <span style={styles.red}> *</span>
                          )}{" "}
                          {/* <Input
                            type="select"
                            name="arbitratorNationality"
                            id="arbitratorNationality"
                            onChange={handleChange("arbitratorNationality")}
                            defaultValue={values.arbitratorNationality}
                          >
                            {document.dir == "ltr" ? countries() : countries_()}
                          </Input> */}
                          <Input
                            type="text"
                            list="data"
                            value={values.arbitratorNationality}
                            onChange={handleChange("arbitratorNationality")}
                          />
                          {document.dir == "ltr" ? (
                            <datalist id="data">
                              {countriesArray.map((item, index) => (
                                <option key={index} value={item.value} />
                              ))}
                            </datalist>
                          ) : (
                            <datalist id="data">
                              {countriesArray_.map((item, index) => (
                                <option key={index} value={item.value} />
                              ))}
                            </datalist>
                          )}
                        </FormGroup>
                      </Col>
                      {/* </Row>
                    <Row> */}
                      <Col xl={6} lg={6} md={6} sm={12}>
                        <FormGroup>
                          <Label style={labelStyle} for="arbitratorAddress">
                            {document.dir == "ltr"
                              ? "Full Address"
                              : "العنوان الكامل"}
                          </Label>
                          {alertArbitratorAddress ? (
                            <span style={styles.warning}>
                              {document.dir == "ltr"
                                ? " address is required "
                                : " العنوان مطلوب "}
                            </span>
                          ) : (
                            <span style={styles.red}> *</span>
                          )}{" "}
                          <Input
                            type="text"
                            name="arbitratorAddress"
                            id="arbitratorAddress"
                            onChange={handleChange("arbitratorAddress")}
                            defaultValue={values.arbitratorAddress}
                          />
                        </FormGroup>
                      </Col>
                      <Col xl={6} lg={6} md={6} sm={12}>
                        <FormGroup>
                          <Label style={labelStyle} for="arbitratorPOBox">
                            {document.dir == "ltr"
                              ? "P.O.Box"
                              : "الصندوق البريدي"}
                          </Label>
                          <Input
                            type="text"
                            name="arbitratorPOBox"
                            id="arbitratorPOBox"
                            onChange={handleChange("arbitratorPOBox")}
                            defaultValue={values.arbitratorPOBox}
                          />
                        </FormGroup>
                      </Col>
                      {/* </Row>
                    <Row> */}
                      <Col xl={6} lg={6} md={6} sm={12}>
                        <FormGroup>
                          <Label style={labelStyle} for="arbitratorPhone">
                            {document.dir == "ltr" ? "Phone" : "رقم الهاتف"}
                          </Label>
                          {alertArbitratorPhone ? (
                            <span style={styles.warning}>
                              {" "}
                              {alertArbitratorPhone}
                            </span>
                          ) : (
                            <span style={styles.red}> *</span>
                          )}{" "}
                          <Input
                            type="text"
                            name="arbitratorPhone"
                            id="arbitratorPhone"
                            onChange={handleChange("arbitratorPhone")}
                            defaultValue={values.arbitratorPhone}
                          />
                        </FormGroup>
                      </Col>
                      <Col xl={6} lg={6} md={6} sm={12}>
                        <FormGroup>
                          <Label style={labelStyle} for="arbitratorFax">
                            {document.dir == "ltr" ? "Fax" : "فاكس"}
                          </Label>
                          <Input
                            type="text"
                            name="arbitratorFax"
                            id="arbitratorFax"
                            onChange={handleChange("arbitratorFax")}
                            defaultValue={values.arbitratorFax}
                          />
                        </FormGroup>
                      </Col>
                      {/* </Row>
                    <Row> */}
                      <Col xl={6} lg={6} md={6} sm={12}>
                        <FormGroup>
                          <Label style={labelStyle} for="arbitratorEmail">
                            {document.dir == "ltr"
                              ? "E-mail"
                              : "البريد الإكترونى"}
                          </Label>
                          {alertArbitratorEmail ? (
                            <span style={styles.warning}>
                              {alertArbitratorEmail}
                            </span>
                          ) : (
                            <span style={styles.red}> *</span>
                          )}{" "}
                          <Input
                            type="email"
                            name="arbitratorEmail"
                            id="arbitratorEmail"
                            onChange={handleChange("arbitratorEmail")}
                            defaultValue={values.arbitratorEmail}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col xl={12} lg={12} md={12} sm={12}>
                        <FormGroup>
                          <Label style={labelStyle} for="cvOfArbitrator">
                            {document.dir == "ltr"
                              ? "CV of Arbitrator"
                              : "يرجى إرفاق نموذج طلب ترشيح المحكم* "}
                          </Label>{" "}
                          {alertCvOfArbitrator ? (
                            <span style={styles.warning}>
                              {document.dir == "ltr"
                                ? " This field cannot be empty "
                                : " إملاء هذه المساحة إلزامي "}
                            </span>
                          ) : (
                            <span style={styles.red}> *</span>
                          )}
                          <CustomInput
                            type="file"
                            name="cvOfArbitrator"
                            id="cvOfArbitrator"
                            style={{
                              overflow: "hidden",
                              backgroundColor: "white",
                              border: "none",
                            }}
                            type="file"
                            label={
                              document.dir == "ltr"
                                ? "Upload a File"
                                : "تحميل الملف"
                            }
                            onChange={handleFileChange}
                            defaultValue={values.cvOfArbitrator}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              ) : null}
              <Row>
                <Col>
                  <Card
                    style={{
                      marginTop: "3vh",
                      backgroundColor: "#f6f6f6",
                      border: "1px dashed black",
                    }}
                  >
                    <CardBody
                      style={{
                        textAlign: document.dir == "ltr" ? "left" : "right",
                      }}
                    >
                      <Label>
                        {document.dir == "ltr"
                          ? `Failure to make such nomination of the Arbitrator by
                        either Party in the Request for Arbitration (RFA) and
                        the reply memorandum within the specified time limits
                        for its submission, or if IICRA issues a reasoned
                        decision declining the appointment of the Arbitrator
                        proposed by any party, IICRA may request the concerned
                        party to nominate an alternate arbitrator within five
                        (5) working days from the date of receipt of IICRA
                        request in this regard.`
                          : `وفي حال عدم القيام بتسمية المحكم من قبل أي طرف في طلب التحكيم أو صحيفة الرد على طلب التحكيم خلال المدد والآجال التنظيمية المحددة لها للتقديم،
                          أو في حال صدور القرار المسبب من قبل المركز برفض تعيين المحكم المقترح من أي طرف، فيجوز للمركز أن يطلب من الطرف المعني ترشيح محكم بديل في غضون خمسة (5) أيام عمل من تاريخ استلام طلب  المركز في هذا الصدد.`}
                      </Label>
                    </CardBody>
                  </Card>
                </Col>
              </Row>

              <Button style={styles.buttonBack} onClick={this.back}>
                {document.dir == "ltr" ? "Back" : "ارجع"}
              </Button>
              <Button
                color="primary"
                style={styles.button}
                onClick={this.continue}
              >
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
  cardBgSecondary: {
    backgroundColor: "#f6f6f6",
    marginTop: "3vh",
  },
  subHead: {
    backgroundColor: "#008f53",
    color: "white",
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

export default NominationOfArbitrator;
