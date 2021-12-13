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
  CustomInput,
  Progress,
} from "reactstrap";
import tick from "../../assets/tick.png";
import countries_ from "../../countries_";
import countries from "../../countries";
import countriesArray from "../../countriesArray";
import countriesArray_ from "../../countriesArray_";

import Swal from "sweetalert2";

export class FormPersonalDetails extends Component {
  state = {
    additionalRespondent: false,
    alertRespondentName: false,
    // alertRespondentUserName: false,
    alertRespondentAddress: false,
    alertRespondentEmail: "",
    alertRespondentNationality: false,
    alertRespondentPhone: "",
    additionalRespondent2: false,
    alertRespondentName2: false,
    // alertRespondentUserName2: false,
    alertRespondentAddress2: false,
    alertRespondentEmail2: "",
    alertRespondentNationality2: false,
    alertRespondentPhone2: "",
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  continue = (e) => {
    e.preventDefault();

    const {
      respondentName,
      // respondentUserName,
      respondentAddress,
      respondentEmail,
      respondentNationality,
      respondentPhone,
      respondentName2,
      // respondentUserName2,
      respondentAddress2,
      respondentEmail2,
      respondentNationality2,
      respondentPhone2,
    } = this.props.values;

    if (validator.isEmpty(respondentName) || respondentName == "") {
      Swal.fire({
        title:
          document.dir == "ltr"
            ? "The name of the first Respondent is Missing"
            : "لم يتم إدخال إسم المحتكم ضده الأول",
        icon: "info",
      });
    }
    // else if (
    //   validator.isEmpty(respondentUserName) ||
    //   respondentUserName == ""
    // ) {
    //   Swal.fire({
    //     title:
    //       document.dir == "ltr"
    //         ? "The username of the first Respondent is Missing"
    //         : "لم يتم إدخال إسم المستخدم للمحتكم ضده الأول",
    //     icon: "info",
    //   });
    // }
    else if (
      validator.isEmpty(respondentNationality) ||
      respondentNationality == ""
    ) {
      Swal.fire({
        title:
          document.dir == "ltr"
            ? "The nationality of the first Respondent is Missing"
            : "لم يتم إدخال جنسية المحتكم ضده الأول",
        icon: "info",
      });
    } else if (
      validator.isEmpty(respondentAddress) ||
      respondentAddress == ""
    ) {
      Swal.fire({
        title:
          document.dir == "ltr"
            ? "The address of the first Respondent is Missing"
            : "لم يتم إدخال عنوان المحتكم ضده الأول",
        icon: "info",
      });
    } else if (validator.isEmpty(respondentPhone) || respondentPhone == "") {
      Swal.fire({
        title:
          document.dir == "ltr"
            ? "The mobile number of the first Respondent is Missing"
            : "لم يتم إدخال رقم متحرك للمحتكم ضده الأول",
        icon: "info",
      });
    } else if (!validator.isMobilePhone(respondentPhone)) {
      Swal.fire({
        title:
          document.dir == "ltr"
            ? "The mobile number of the first Respondent is invalid"
            : "رقم متحرك للمحتكم ضده الأول غير صالح",
        icon: "info",
      });
    } else if (validator.isEmpty(respondentEmail) || respondentEmail == "") {
      Swal.fire({
        title:
          document.dir == "ltr"
            ? "The email address of the first Respondent is Missing"
            : "لم يتم إدخال عنوان البريد الإلكتروني للمحتكم ضده الأول",
        icon: "info",
      });
    } else if (!validator.isEmail(respondentEmail)) {
      Swal.fire({
        title:
          document.dir == "ltr"
            ? "The email address of the first Respondent is invalid"
            : "عنوان البريد الإلكتروني للمحتكم ضده الأول غير صالح",
        icon: "info",
      });
    } else if (this.state.additionalRespondent) {
      if (validator.isEmpty(respondentName2) || respondentName2 == "") {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The name of the second Respondent is Missing"
              : "لم يتم إدخال إسم المحتكم ضده الثاني",
          icon: "info",
        });
      }
      //  else if (
      //   validator.isEmpty(respondentUserName2) ||
      //   respondentUserName2 == ""
      // ) {
      //   Swal.fire({
      //     title:
      //       document.dir == "ltr"
      //         ? "The username of the second Respondent is Missing"
      //         : "لم يتم إدخال إسم المستخدم للمحتكم ضده الثاني",
      //     icon: "info",
      //   });
      // }
      else if (
        validator.isEmpty(respondentNationality2) ||
        respondentNationality2 == ""
      ) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The nationality of the second Respondent is Missing"
              : "لم يتم إدخال جنسية المحتكم ضده الثاني",
          icon: "info",
        });
      } else if (
        validator.isEmpty(respondentAddress2) ||
        respondentAddress2 == ""
      ) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The address of the second Respondent is Missing"
              : "لم يتم إدخال عنوان المحتكم ضده الثاني",
          icon: "info",
        });
      } else if (
        validator.isEmpty(respondentPhone2) ||
        respondentPhone2 == ""
      ) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The mobile number of the second Respondent is Missing"
              : "لم يتم إدخال رقم متحرك للمحتكم ضده الثاني",
          icon: "info",
        });
      } else if (!validator.isMobilePhone(respondentPhone2)) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The mobile number of the second Respondent is invalid"
              : "رقم متحرك للمحتكم ضده الثاني غير صالح",
          icon: "info",
        });
      } else if (
        validator.isEmpty(respondentEmail2) ||
        respondentEmail2 == ""
      ) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The email address of the second Respondent is Missing"
              : "لم يتم إدخال عنوان البريد الإلكتروني للمحتكم ضده الثاني",
          icon: "info",
        });
      } else if (!validator.isEmail(respondentEmail2)) {
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "The email address of the second Respondent is invalid"
              : "عنوان البريد الإلكتروني للمحتكم ضده الثاني غير صالح",
          icon: "info",
        });
      } else {
        this.props.nextStep();
      }
    } else {
      this.props.nextStep();
    }
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  handleAdditionalPerson = () => {
    this.setState({
      additionalRespondent: !this.state.additionalRespondent,
    });
  };

  render() {
    const labelStyle = {
      float: document.dir == "ltr" ? "left" : "right",
    };
    const { values, handleChange } = this.props;

    const {
      additionalRespondent,
      alertRespondentName,
      // alertRespondentUserName,
      alertRespondentAddress,
      alertRespondentEmail,
      alertRespondentNationality,
      alertRespondentPhone,
      alertRespondentName2,
      // alertRespondentUserName2,
      alertRespondentAddress2,
      alertRespondentEmail2,
      alertRespondentNationality2,
      alertRespondentPhone2,
    } = this.state;

    return (
      <Container style={styles.formUserContainer} className="shadow-lg">
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
                      color: "lightgray",
                      display: "inline",
                      fontSize: "15px",
                      lineHeight: "45px",
                      background: "green",
                      borderRadius: "50%",
                      padding: "2vh 17%",
                    }}
                  >
                    <strong>{document.dir == "ltr" ? "2" : "٢"}</strong>
                  </li>
                </Col>
                <Col>
                  <li
                    id="dispute"
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
                    <strong> {document.dir == "ltr" ? "3" : "٣"}</strong>
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
                    <strong> {document.dir == "ltr" ? "5" : "٥"}</strong>
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
              value="25"
              style={{ textAlign: "right", borderRadius: "50px" }}
            />
          </Col>
        </Row>
        <h6 style={styles.center}>
          {document.dir == "ltr" ? "Respondent Details" : "المحتكم ضده"}
        </h6>

        <Card style={styles.cardBg}>
          <CardBody>
            <Form>
              <Row>
                <Col xl={6} lg={6} md={6} sm={12}>
                  <FormGroup>
                    <Label style={labelStyle} for="respondentName">
                      {document.dir == "ltr"
                        ? "Full Name ( official )"
                        : "الإسم الكامل"}
                    </Label>
                    {alertRespondentName ? (
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
                      name="respondentName"
                      id="respondentName"
                      onChange={handleChange("respondentName")}
                      defaultValue={values.respondentName}
                      required
                    />
                  </FormGroup>
                </Col>
                {/* <Col xl={6} lg={6} md={6} sm={12}>
                  <FormGroup>
                    <Label style={labelStyle} for="respondentUserName">
                      {document.dir == "ltr"
                        ? "User Name ( as per trade license )"
                        : "حسب الرخصة التجارية"}
                    </Label>
                    {alertRespondentUserName ? (
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
                      name="respondentUserName"
                      id="respondentUserName"
                      onChange={handleChange("respondentUserName")}
                      defaultValue={values.respondentUserName}
                      required
                    />
                  </FormGroup>
                </Col> */}
                <Col xl={6} lg={6} md={6} sm={12}>
                  <FormGroup>
                    <Label style={labelStyle} for="respondentNationality">
                      {document.dir == "ltr" ? "Nationality" : "الجنسية"}
                    </Label>
                    {alertRespondentNationality ? (
                      <span style={styles.warning}>
                        {document.dir == "ltr"
                          ? "nationality is required"
                          : " الجنسية مطلوبة "}
                      </span>
                    ) : (
                      <span style={styles.red}> *</span>
                    )}
                    {/* <Input
                      type="select"
                      name="respondentNationality"
                      id="respondentNationality"
                      onChange={handleChange("respondentNationality")}
                      defaultValue={values.respondentNationality}
                    >
                      {document.dir == "ltr" ? countries() : countries_()}
                    </Input> */}
                    <Input
                      type="text"
                      list="data1"
                      value={values.respondentNationality}
                      onChange={handleChange("respondentNationality")}
                    />
                    {document.dir == "ltr" ? (
                      <datalist id="data1">
                        {countriesArray.map((item, index) => (
                          <option key={index} value={item.value} />
                        ))}
                      </datalist>
                    ) : (
                      <datalist id="data1">
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
                    <Label style={labelStyle} for="respondentAddress">
                      {document.dir == "ltr"
                        ? "Full Address"
                        : "العنوان الكامل"}
                    </Label>
                    {alertRespondentAddress ? (
                      <span style={styles.warning}>
                        {document.dir == "ltr"
                          ? " address is required "
                          : " العنوان مطلوب "}
                      </span>
                    ) : (
                      <span style={styles.red}> *</span>
                    )}
                    <Input
                      type="text"
                      name="respondentAddress"
                      id="respondentAddress"
                      onChange={handleChange("respondentAddress")}
                      defaultValue={values.respondentAddress}
                    />
                  </FormGroup>
                </Col>
                <Col xl={6} lg={6} md={6} sm={12}>
                  <FormGroup>
                    <Label style={labelStyle} for="claimantPOBox">
                      {document.dir == "ltr" ? "P.O.Box" : "الصندوق البريدي"}
                    </Label>
                    <Input
                      type="text"
                      name="respondentPOBox"
                      id="respondentPOBox"
                      onChange={handleChange("respondentPOBox")}
                      defaultValue={values.respondentPOBox}
                    />
                  </FormGroup>
                </Col>
                {/* </Row>
              <Row> */}
                <Col xl={6} lg={6} md={6} sm={12}>
                  <FormGroup>
                    <Label style={labelStyle} for="respondentPhone">
                      {document.dir == "ltr" ? "Phone" : "رقم الهاتف"}
                    </Label>
                    {alertRespondentPhone ? (
                      <span style={styles.warning}>
                        {this.state.alertRespondentPhone}
                      </span>
                    ) : (
                      <span style={styles.red}> *</span>
                    )}
                    <Input
                      type="text"
                      name="respondentPhone"
                      id="respondentPhone"
                      onChange={handleChange("respondentPhone")}
                      defaultValue={values.respondentPhone}
                    />
                  </FormGroup>
                </Col>
                <Col xl={6} lg={6} md={6} sm={12}>
                  <FormGroup>
                    <Label style={labelStyle} for="respondentFax">
                      {document.dir == "ltr" ? "Fax" : "فاكس"}
                    </Label>
                    <Input
                      type="text"
                      name="respondentFax"
                      id="respondentFax"
                      onChange={handleChange("respondentFax")}
                      defaultValue={values.respondentFax}
                    />
                  </FormGroup>
                </Col>
                {/* </Row>
              <Row> */}
                <Col xl={6} lg={6} md={6} sm={12}>
                  <FormGroup>
                    <Label style={labelStyle} for="respondentEmail">
                      {document.dir == "ltr" ? "E-mail" : "البريد الإكترونى"}
                    </Label>
                    {alertRespondentEmail ? (
                      <span style={styles.warning}>
                        {this.state.alertRespondentEmail}
                      </span>
                    ) : (
                      <span style={styles.red}> *</span>
                    )}
                    <Input
                      type="email"
                      name="respondentEmail"
                      id="respondentEmail"
                      onChange={handleChange("respondentEmail")}
                      defaultValue={values.respondentEmail}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <FormGroup
                style={{
                  textAlign: document.dir == "ltr" ? "left" : "right",
                }}
              >
                <div>
                  <CustomInput
                    type="switch"
                    id="additional"
                    name="legal"
                    label={
                      document.dir == "ltr"
                        ? "Additional Respondent"
                        : "المحتكم ضده الثاني"
                    }
                    value={this.state.additionalRespondent}
                    onChange={this.handleAdditionalPerson}
                  />
                </div>
              </FormGroup>

              {additionalRespondent ? (
                <Card style={styles.cardBgSecondary} className="shadow">
                  <h6 style={styles.center}>
                    {document.dir == "ltr"
                      ? "Additional Respondent"
                      : "المحتكم ضده الثاني"}
                  </h6>
                  <CardBody>
                    <Row>
                      <Col xl={6} lg={6} md={6} sm={12}>
                        <FormGroup>
                          <Label style={labelStyle} for="respondentName">
                            {document.dir == "ltr"
                              ? "Full Name ( official )"
                              : "الإسم الكامل"}
                          </Label>{" "}
                          {alertRespondentName2 ? (
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
                            name="respondentName2"
                            id="respondentName2"
                            onChange={handleChange("respondentName2")}
                            defaultValue={values.respondentName2}
                            required
                          />
                        </FormGroup>
                      </Col>
                      {/* <Col xl={6} lg={6} md={6} sm={12}>
                        <FormGroup>
                          <Label style={labelStyle} for="respondentUserName">
                            {document.dir == "ltr"
                              ? "User Name ( as per trade license )"
                              : "حسب الرخصة التجارية"}
                          </Label>
                          {alertRespondentUserName2 ? (
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
                            name="respondentUserName2"
                            id="respondentUserName2"
                            onChange={handleChange("respondentUserName2")}
                            defaultValue={values.respondentUserName2}
                            required
                          />
                        </FormGroup>
                      </Col> */}
                      <Col xl={6} lg={6} md={6} sm={12}>
                        <FormGroup>
                          <Label
                            style={labelStyle}
                            for="respondentNationality2"
                          >
                            {document.dir == "ltr" ? "Nationality" : "الجنسية"}
                          </Label>
                          {alertRespondentNationality2 ? (
                            <span style={styles.warning}>
                              {document.dir == "ltr"
                                ? "nationality is required"
                                : " الجنسية مطلوبة "}
                            </span>
                          ) : (
                            <span style={styles.red}> *</span>
                          )}
                          {/* <Input
                            type="select"
                            name="respondentNationality2"
                            id="respondentNationality2"
                            onChange={handleChange("respondentNationality2")}
                            defaultValue={values.respondentNationality2}
                          >
                            {document.dir == "ltr" ? countries() : countries_()}
                          </Input> */}
                          <Input
                            type="text"
                            list="data"
                            value={values.respondentNationality2}
                            onChange={handleChange("respondentNationality2")}
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
                          <Label style={labelStyle} for="respondentAddress">
                            {document.dir == "ltr"
                              ? "Full Address"
                              : "العنوان الكامل"}
                          </Label>{" "}
                          {alertRespondentAddress2 ? (
                            <span style={styles.warning}>
                              {document.dir == "ltr"
                                ? " address is required "
                                : " العنوان مطلوب "}
                            </span>
                          ) : (
                            <span style={styles.red}> *</span>
                          )}
                          <Input
                            type="text"
                            name="respondentAddress2"
                            id="respondentAddress2"
                            onChange={handleChange("respondentAddress2")}
                            defaultValue={values.respondentAddress2}
                          />
                        </FormGroup>
                      </Col>
                      <Col xl={6} lg={6} md={6} sm={12}>
                        <FormGroup>
                          <Label style={labelStyle} for="claimantPOBox">
                            {document.dir == "ltr"
                              ? "P.O.Box"
                              : "الصندوق البريدي"}
                          </Label>
                          <Input
                            type="text"
                            name="respondentPOBox2"
                            id="respondentPOBox2"
                            onChange={handleChange("respondentPOBox2")}
                            defaultValue={values.respondentPOBox2}
                          />
                        </FormGroup>
                      </Col>
                      {/* </Row>
                    <Row> */}
                      <Col xl={6} lg={6} md={6} sm={12}>
                        <FormGroup>
                          <Label style={labelStyle} for="respondentPhone2">
                            {document.dir == "ltr" ? "Phone" : "رقم الهاتف"}
                          </Label>{" "}
                          {alertRespondentPhone2 ? (
                            <span style={styles.warning}>
                              {this.state.alertRespondentPhone2}
                            </span>
                          ) : (
                            <span style={styles.red}> *</span>
                          )}
                          <Input
                            type="text"
                            name="respondentPhone2"
                            id="respondentPhone2"
                            onChange={handleChange("respondentPhone2")}
                            defaultValue={values.respondentPhone2}
                          />
                        </FormGroup>
                      </Col>
                      <Col xl={6} lg={6} md={6} sm={12}>
                        <FormGroup>
                          <Label style={labelStyle} for="respondentFax2">
                            {document.dir == "ltr" ? "Fax" : "فاكس"}
                          </Label>
                          <Input
                            type="text"
                            name="respondentFax2"
                            id="respondentFax2"
                            onChange={handleChange("respondentFax2")}
                            defaultValue={values.respondentFax2}
                          />
                        </FormGroup>
                      </Col>
                      {/* </Row>
                    <Row> */}
                      <Col xl={6} lg={6} md={6} sm={12}>
                        <FormGroup>
                          <Label style={labelStyle} for="respondentEmail2">
                            {document.dir == "ltr"
                              ? "E-mail"
                              : "البريد الإكترونى"}
                          </Label>{" "}
                          {alertRespondentEmail2 ? (
                            <span style={styles.warning}>
                              {this.state.alertRespondentEmail2}
                            </span>
                          ) : (
                            <span style={styles.red}> *</span>
                          )}
                          <Input
                            type="email"
                            name="respondentEmail2"
                            id="respondentEmail2"
                            onChange={handleChange("respondentEmail2")}
                            defaultValue={values.respondentEmail2}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              ) : null}
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

export default FormPersonalDetails;
