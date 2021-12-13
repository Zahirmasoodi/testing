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
  CustomInput,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import info from "../../assets/info.png";
import tick from "../../assets/tick.png";
import Swal from "sweetalert2";

export class Confirm extends Component {
  state = {
    alertNatureOfDispute: false,
    alertValueOfDispute: false,
    alertRecitals: false,
    alertLegalGrounds: false,
    alertReliefSought: false,
    alertDisputeDocuments: false,
    alertArbitrationAgreement: false,
    nodHelp: false,
    nodDisp: false,
    recitalsHelp: false,
    recitalsDisp: false,
    legalHelp: false,
    legalDisp: false,
    reliefHelp: false,
    reliefDisp: false,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }
  continue = (e) => {
    e.preventDefault();

    const {
      natureOfDispute,
      // numberOfArbitrators,
      valueOfDispute,
      recitals,
      legalGrounds,
      reliefSought,
      disputeDocuments,
      arbitrationAgreement,
    } = this.props.values;

    if (validator.isEmpty(natureOfDispute) || natureOfDispute == "") {
      Swal.fire({
        title:
          document.dir == "ltr"
            ? "The nature of Dispute is Missing"
            : "طبيعة النزاع مفقودة",
        icon: "info",
      });
    } else if (validator.isEmpty(valueOfDispute) || valueOfDispute == "") {
      Swal.fire({
        title:
          document.dir == "ltr"
            ? "The value of Dispute is Missing"
            : "قيمة النزاع مفقودة",
        icon: "info",
      });
    } else if (validator.isEmpty(recitals) || recitals == "") {
      Swal.fire({
        title:
          document.dir == "ltr"
            ? "The recitals are Missing"
            : "الحيثيات مفقودة",
        icon: "info",
      });
    } else if (validator.isEmpty(legalGrounds) || legalGrounds == "") {
      Swal.fire({
        title:
          document.dir == "ltr"
            ? "The Legal Grounds are Missing"
            : "الأسس القانونية مفقودة",
        icon: "info",
      });
    } else if (validator.isEmpty(reliefSought) || reliefSought == "") {
      Swal.fire({
        title:
          document.dir == "ltr"
            ? "The Relief Sought is Missing"
            : "الطلبات  مفقودة",
        icon: "info",
      });
    } else if (disputeDocuments == null) {
      Swal.fire({
        title:
          document.dir == "ltr"
            ? "The Dispute Documnets are Missing"
            : "وثائق النزاع مفقودة",
        icon: "info",
      });
    } else if (arbitrationAgreement == null) {
      Swal.fire({
        title:
          document.dir == "ltr"
            ? "The Arbitrtaion Agreement is Missing"
            : "وثائق اتفاقية التحكيم مفقودة",
        icon: "info",
      });
    } else {
      this.props.nextStep();
    }
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  // toggle = () => {
  //   this.setState({
  //     toolTip: !this.state.toolTip,
  //   });
  // };

  handleChangeNod = () => {
    this.setState({
      nodDisp: !this.state.nodDisp,
    });
  };

  handleChangeRelief = () => {
    this.setState({
      reliefDisp: !this.state.reliefDisp,
    });
  };
  handleChangeRecitals = () => {
    this.setState({
      recitalsDisp: !this.state.recitalsDisp,
    });
  };
  handleChangeLegal = () => {
    this.setState({
      legalDisp: !this.state.legalDisp,
    });
  };

  render() {
    const labelStyle = {
      float: document.dir == "ltr" ? "left" : "right",
    };
    const { values, handleChange, handleFileChange } = this.props;

    const {
      alertNatureOfDispute,
      alertValueOfDispute,
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
                      color: "lightgray",
                      display: "inline",
                      fontSize: "15px",
                      lineHeight: "45px",
                      background: "green",
                      borderRadius: "50%",
                      padding: "2vh 17%",
                    }}
                  >
                    <strong>{document.dir == "ltr" ? "3" : "٣"}</strong>
                  </li>
                </Col>
                <Col>
                  <li
                    id="arbitrator"
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
              value="37.5"
              style={{ textAlign: "right", borderRadius: "50px" }}
            />
          </Col>
        </Row>
        <h6 style={styles.center}>
          {document.dir == "ltr" ? "Nature of Dispute" : "طبيعة النزاع "}
        </h6>
        <Card style={styles.cardBg}>
          <CardBody>
            <Form>
              <Row>
                <Col xl={12} lg={12} md={12} sm={12}>
                  <FormGroup>
                    <Label
                      style={{
                        textAlign: document.dir == "ltr" ? "left" : "right",
                      }}
                      for="natureOfDispute"
                      lg={11}
                      md={11}
                    >
                      {document.dir == "ltr"
                        ? "Subject of Dispute"
                        : "موضوع النزاع"}
                      <span style={styles.red}> *</span>
                    </Label>
                    <Label
                      lg={1}
                      md={1}
                      style={{
                        textAlign: document.dir == "ltr" ? "right" : "left",
                      }}
                    >
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
                        {document.dir == "ltr"
                          ? " This field cannot be empty "
                          : " إملاء هذه المساحة إلزامي "}
                      </span>
                    ) : null}
                    {this.state.nodHelp ? (
                      <div style={{ textAlign: "center" }}>
                        <i style={styles.toolTip}>
                          {document.dir == "ltr"
                            ? `Please describe the factual background of the dispute,
                          the relation between the parties whether contractual
                          or non-contractual, and the legal position of the
                          parties.`
                            : `يرجى وصف النزاع متضمنا الوقائع المتعاقة به، وتحديد طبيعة العلاقة بين الأطراف، هل هي تعاقدية أو غير تعاقدية، والوضع القانوني للأطراف.`}
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
                    <span
                      onClick={this.handleChangeNod}
                      className="ml-2"
                      style={{
                        color: "green",
                        wordSpacing: "50px",
                        cursor: "pointer",
                      }}
                    >
                      {document.dir == "ltr" ? <b>Review</b> : <b>مراجعة</b>}
                    </span>
                  </FormGroup>
                  <div>
                    <Modal
                      isOpen={this.state.nodDisp}
                      toggle={this.handleChangeNod}
                      className="shadow-lg"
                      style={{ marginTop: "8vh", minWidth: "80vw" }}
                    >
                      <ModalHeader>
                        <b>Nature of Dispute</b>
                      </ModalHeader>
                      <ModalBody style={{ fontSize: "16px" }}>
                        <Input
                          type="textarea"
                          name="natureOfDispute_"
                          id="natureOfDispute_"
                          rows="10"
                          onChange={handleChange("natureOfDispute")}
                          defaultValue={values.natureOfDispute}
                        />
                      </ModalBody>
                      <ModalFooter>
                        <Button color="success" onClick={this.handleChangeNod}>
                          Continue with Form
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </div>
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
                      <option>{document.dir == "ltr" ? "5" : "٥"}</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row> */}
              <Row>
                <Col xl={12} lg={12} md={12} sm={12}>
                  <FormGroup>
                    <Label
                      style={{
                        textAlign: document.dir == "ltr" ? "left" : "right",
                      }}
                      for="valueOfDispute"
                      lg={12}
                      md={12}
                    >
                      {document.dir == "ltr"
                        ? "Value of Dispute"
                        : "قيمة النزاع "}{" "}
                      ${" "}
                      <i style={{ color: "gray" }}>
                        ( {document.dir == "ltr" ? "USD" : "دولار أمريكي"} )
                      </i>
                      <span style={styles.red}> *</span>
                    </Label>
                    {alertValueOfDispute ? (
                      <span style={styles.warning}>
                        {document.dir == "ltr"
                          ? " This field cannot be empty "
                          : " إملاء هذه المساحة إلزامي "}
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
                    <Label
                      style={{
                        textAlign: document.dir == "ltr" ? "left" : "right",
                      }}
                      for="recitals"
                      lg={11}
                      md={11}
                    >
                      {document.dir == "ltr" ? "Recitals" : "الحيثيــات"}
                      <span style={styles.red}> *</span>
                    </Label>
                    <Label
                      lg={1}
                      md={1}
                      style={{
                        textAlign: document.dir == "ltr" ? "left" : "right",
                      }}
                    >
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
                        {document.dir == "ltr"
                          ? " This field cannot be empty "
                          : " إملاء هذه المساحة إلزامي "}
                      </span>
                    ) : null}
                    {this.state.recitalsHelp ? (
                      <div style={{ textAlign: "center" }}>
                        <i style={styles.toolTip}>
                          {document.dir == "ltr"
                            ? `Please address few key points of the agreement, for
                          example , the purpose for
                          entering into the agreement.`
                            : `يرجى وصف بعض الخصائص الرئيسية للاتفاقية، مثلا من هم الأطراف، وأغراضهم لإبرام الاتفاقية.`}
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
                    <span
                      onClick={this.handleChangeRecitals}
                      className="ml-2"
                      style={{
                        color: "green",
                        wordSpacing: "50px",
                        cursor: "pointer",
                      }}
                    >
                      {document.dir == "ltr" ? <b>Review</b> : <b>مراجعة</b>}
                    </span>
                  </FormGroup>
                  <div>
                    <Modal
                      isOpen={this.state.recitalsDisp}
                      toggle={this.handleChangeRecitals}
                      className="shadow-lg"
                      style={{ marginTop: "8vh", minWidth: "80vw" }}
                    >
                      <ModalHeader>
                        <b>Recitals</b>
                      </ModalHeader>
                      <ModalBody style={{ fontSize: "16px" }}>
                        <Input
                          type="textarea"
                          name="recitals_"
                          id="recitals_"
                          rows="10"
                          onChange={handleChange("recitals")}
                          defaultValue={values.recitals}
                        />
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="success"
                          onClick={this.handleChangeRecitals}
                        >
                          Continue with Form
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xl={12} lg={12} md={12} sm={12}>
                  <FormGroup>
                    <Label style={labelStyle} for="disputeDocuments">
                      {document.dir == "ltr"
                        ? "Dispute Documents"
                        : "يرجي إرفاق مستندات النزاع"}
                    </Label>{" "}
                    {alertDisputeDocuments ? (
                      <span style={styles.warning}>
                        {document.dir == "ltr"
                          ? " This field cannot be empty "
                          : " إملاء هذه المساحة إلزامي "}
                      </span>
                    ) : (
                      <span style={styles.red}> *</span>
                    )}
                    <CustomInput
                      id="disputeDocuments"
                      name="disputeDocuments"
                      style={{
                        overflow: "hidden",
                        backgroundColor: "white",
                        border: "none",
                      }}
                      type="file"
                      multiple
                      label={
                        document.dir == "ltr" ? "Upload a File" : "تحميل الملف"
                      }
                      onChange={handleFileChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xl={12} lg={12} md={12} sm={12}>
                  <FormGroup>
                    <Label
                      style={{
                        textAlign: document.dir == "ltr" ? "left" : "right",
                      }}
                      for="legalGrounds"
                      lg={11}
                      md={11}
                    >
                      {document.dir == "ltr"
                        ? "Legal Grounds"
                        : "الأســس القانونيــة"}
                      <span style={styles.red}> *</span>
                    </Label>
                    <Label
                      lg={1}
                      md={1}
                      style={{
                        textAlign: document.dir == "ltr" ? "left" : "right",
                      }}
                    >
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
                        {document.dir == "ltr"
                          ? " This field cannot be empty "
                          : " إملاء هذه المساحة إلزامي "}
                      </span>
                    ) : null}
                    {this.state.legalHelp ? (
                      <div style={{ textAlign: "center" }}>
                        <i style={styles.toolTip}>
                          {document.dir == "ltr"
                            ? `From the Governing Law of the dispute, please specify the articles and sections that set forth the obligation, statements and promises.`
                            : `يرجى وصف الأقسام والنقاط الرئيسية التي تحدد البيانات، والتصريحت، والوعود التي تعتمد عليها الأطراف المعنية في إبرام الاتفاقية.`}
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
                    <span
                      onClick={this.handleChangeLegal}
                      className="ml-2"
                      style={{
                        color: "green",
                        wordSpacing: "50px",
                        cursor: "pointer",
                      }}
                    >
                      {document.dir == "ltr" ? <b>Review</b> : <b>مراجعة</b>}
                    </span>
                  </FormGroup>
                  <div>
                    <Modal
                      isOpen={this.state.legalDisp}
                      toggle={this.handleChangeLegal}
                      className="shadow-lg"
                      style={{ marginTop: "8vh", minWidth: "80vw" }}
                    >
                      <ModalHeader>
                        <b>Legal Grounds</b>
                      </ModalHeader>
                      <ModalBody style={{ fontSize: "16px" }}>
                        <Input
                          type="textarea"
                          name="legalGrounds_"
                          id="legalGrounds_"
                          rows="10"
                          onChange={handleChange("legalGrounds")}
                          defaultValue={values.legalGrounds}
                        />
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="success"
                          onClick={this.handleChangeLegal}
                        >
                          Continue with Form
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xl={12} lg={12} md={12} sm={12}>
                  <FormGroup>
                    <Label style={labelStyle} for="arbitrationAgreement">
                      {document.dir == "ltr"
                        ? "Arbitration Agreement / Arbitration Clause"
                        : "يرجى إرفاق شرط التحكيم/اتفاقية التحكيم"}
                    </Label>{" "}
                    {alertArbitrationAgreement ? (
                      <span style={styles.warning}>
                        {document.dir == "ltr"
                          ? " This field cannot be empty "
                          : " إملاء هذه المساحة إلزامي "}
                      </span>
                    ) : (
                      <span style={styles.red}> *</span>
                    )}
                    <CustomInput
                      id="arbitrationAgreement"
                      name="arbitrationAgreement"
                      type="file"
                      style={{
                        overflow: "hidden",
                        backgroundColor: "white",
                        border: "none",
                      }}
                      type="file"
                      label={
                        document.dir == "ltr" ? "Upload a File" : "تحميل الملف"
                      }
                      onChange={handleFileChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xl={12} lg={12} md={12} sm={12}>
                  <FormGroup>
                    <Label
                      style={{
                        textAlign: document.dir == "ltr" ? "left" : "right",
                      }}
                      for="reliefSought"
                      lg={11}
                      md={11}
                    >
                      {document.dir == "ltr" ? "Relief Sought" : "الطلبات"}{" "}
                      <span style={styles.red}> *</span>
                    </Label>
                    <Label lg={1} md={1}>
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
                        <b className="ml-5">
                          <img src={info} alt="info" style={styles.toolTip} />
                        </b>
                      </span>
                    </Label>
                    {alertReliefSought ? (
                      <span style={styles.warning}>
                        {document.dir == "ltr"
                          ? " This field cannot be empty "
                          : " إملاء هذه المساحة إلزامي "}
                      </span>
                    ) : null}
                    {this.state.reliefHelp ? (
                      <div style={{ textAlign: "center" }}>
                        <i style={styles.toolTip}>
                          {document.dir == "ltr"
                            ? `The Claimant requests to initiate the Arbitration
                          Proceedings for rendering the following.`
                            : "وعليه، في حالة حدوث خرق من جانب الطرف الآخر، يتقدم المحتكم بطلب  بدء سير إجراءات التحكيم لإصدار ما يلــي"}
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
                    <span
                      onClick={this.handleChangeRelief}
                      className="ml-2"
                      style={{
                        color: "green",
                        wordSpacing: "50px",
                        cursor: "pointer",
                      }}
                    >
                      {document.dir == "ltr" ? <b>Review</b> : <b>مراجعة</b>}
                    </span>
                  </FormGroup>
                  <div>
                    <Modal
                      isOpen={this.state.reliefDisp}
                      toggle={this.handleChangeRelief}
                      className="shadow-lg"
                      style={{ marginTop: "8vh", minWidth: "80vw" }}
                    >
                      <ModalHeader>
                        <b>Relief Sought</b>
                      </ModalHeader>
                      <ModalBody style={{ fontSize: "16px" }}>
                        <Input
                          type="textarea"
                          name="reliefSought_"
                          id="reliefSought_"
                          rows="10"
                          onChange={handleChange("reliefSought")}
                          defaultValue={values.reliefSought}
                        />
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="success"
                          onClick={this.handleChangeRelief}
                        >
                          Continue with Form
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </div>
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
    borderRadius: "10px",
    cursor: "not-allowed",
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
