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

export class FormPersonalDetails extends Component {
  state = {
    additionalRespondent: false,
    alertRespondentName: false,
    alertRespondentAddress: false,
    alertRespondentEmail: "",
    alertRespondentNationality: false,
    alertRespondentPhone: "",
    additionalRespondent2: false,
    alertRespondentName2: false,
    alertRespondentAddress2: false,
    alertRespondentEmail2: "",
    alertRespondentNationality2: false,
    alertRespondentPhone2: "",
  };

  continue = (e) => {
    e.preventDefault();

    const {
      respondentName,
      respondentAddress,
      respondentEmail,
      respondentNationality,
      respondentPhone,
    } = this.props.values;

    if (validator.isEmpty(respondentName) || respondentName == " ") {
      this.setState({ alertRespondentName: true });
    } else if (
      validator.isEmpty(respondentAddress) ||
      respondentAddress == " "
    ) {
      this.setState({ alertRespondentAddress: true });
    } else if (!validator.isEmail(respondentEmail)) {
      this.setState({ alertRespondentEmail: " invalid email address" });
    } else if (validator.isEmpty(respondentEmail) || respondentEmail == " ") {
      this.setState({ alertRespondentEmail: " email address is required" });
    } else if (
      validator.isEmpty(respondentNationality) ||
      respondentNationality == " "
    ) {
      this.setState({ alertRespondentNationality: true });
    } else if (!validator.isMobilePhone(respondentPhone)) {
      this.setState({ alertRespondentPhone: " invalid phone number" });
    } else if (validator.isEmpty(respondentPhone) || respondentPhone == " ") {
      this.setState({ alertRespondentPhone: " phone number is required" });
    } else {
      this.props.nextStep();
    }
    // this.props.nextStep();
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

  countries = () => {
    return (
      <>
        <option></option>
        <option value="United Arab Emirates">United Arab Emirates</option>
        <option value="Afghanistan">Afghanistan</option>
        <option value="Åland Islands">Åland Islands</option>
        <option value="Albania">Albania</option>
        <option value="Algeria">Algeria</option>
        <option value="American Samoa">American Samoa</option>
        <option value="Andorra">Andorra</option>
        <option value="Angola">Angola</option>
        <option value="Anguilla">Anguilla</option>
        <option value="Antarctica">Antarctica</option>
        <option value="Antigua and Barbuda">Antigua and Barbuda</option>
        <option value="Argentina">Argentina</option>
        <option value="Armenia">Armenia</option>
        <option value="Aruba">Aruba</option>
        <option value="Australia">Australia</option>
        <option value="Austria">Austria</option>
        <option value="Azerbaijan">Azerbaijan</option>
        <option value="Bahamas">Bahamas</option>
        <option value="Bahrain">Bahrain</option>
        <option value="Bangladesh">Bangladesh</option>
        <option value="Barbados">Barbados</option>
        <option value="Belarus">Belarus</option>
        <option value="Belgium">Belgium</option>
        <option value="Belize">Belize</option>
        <option value="Benin">Benin</option>
        <option value="Bermuda">Bermuda</option>
        <option value="Bhutan">Bhutan</option>
        <option value="Bolivia">Bolivia</option>
        <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
        <option value="Botswana">Botswana</option>
        <option value="Bouvet Island">Bouvet Island</option>
        <option value="Brazil">Brazil</option>
        <option value="British Indian Ocean Territory">
          British Indian Ocean Territory
        </option>
        <option value="Brunei Darussalam">Brunei Darussalam</option>
        <option value="Bulgaria">Bulgaria</option>
        <option value="Burkina Faso">Burkina Faso</option>
        <option value="Burundi">Burundi</option>
        <option value="Cambodia">Cambodia</option>
        <option value="Cameroon">Cameroon</option>
        <option value="Canada">Canada</option>
        <option value="Cape Verde">Cape Verde</option>
        <option value="Cayman Islands">Cayman Islands</option>
        <option value="Central African Republic">
          Central African Republic
        </option>
        <option value="Chad">Chad</option>
        <option value="Chile">Chile</option>
        <option value="China">China</option>
        <option value="Christmas Island">Christmas Island</option>
        <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
        <option value="Colombia">Colombia</option>
        <option value="Comoros">Comoros</option>
        <option value="Congo">Congo</option>
        <option value="Congo, The Democratic Republic of The">
          Congo, The Democratic Republic of The
        </option>
        <option value="Cook Islands">Cook Islands</option>
        <option value="Costa Rica">Costa Rica</option>
        <option value="Cote D'ivoire">Cote D'ivoire</option>
        <option value="Croatia">Croatia</option>
        <option value="Cuba">Cuba</option>
        <option value="Cyprus">Cyprus</option>
        <option value="Czech Republic">Czech Republic</option>
        <option value="Denmark">Denmark</option>
        <option value="Djibouti">Djibouti</option>
        <option value="Dominica">Dominica</option>
        <option value="Dominican Republic">Dominican Republic</option>
        <option value="Ecuador">Ecuador</option>
        <option value="Egypt">Egypt</option>
        <option value="El Salvador">El Salvador</option>
        <option value="Equatorial Guinea">Equatorial Guinea</option>
        <option value="Eritrea">Eritrea</option>
        <option value="Estonia">Estonia</option>
        <option value="Ethiopia">Ethiopia</option>
        <option value="Falkland Islands (Malvinas)">
          Falkland Islands (Malvinas)
        </option>
        <option value="Faroe Islands">Faroe Islands</option>
        <option value="Fiji">Fiji</option>
        <option value="Finland">Finland</option>
        <option value="France">France</option>
        <option value="French Guiana">French Guiana</option>
        <option value="French Polynesia">French Polynesia</option>
        <option value="French Southern Territories">
          French Southern Territories
        </option>
        <option value="Gabon">Gabon</option>
        <option value="Gambia">Gambia</option>
        <option value="Georgia">Georgia</option>
        <option value="Germany">Germany</option>
        <option value="Ghana">Ghana</option>
        <option value="Gibraltar">Gibraltar</option>
        <option value="Greece">Greece</option>
        <option value="Greenland">Greenland</option>
        <option value="Grenada">Grenada</option>
        <option value="Guadeloupe">Guadeloupe</option>
        <option value="Guam">Guam</option>
        <option value="Guatemala">Guatemala</option>
        <option value="Guernsey">Guernsey</option>
        <option value="Guinea">Guinea</option>
        <option value="Guinea-bissau">Guinea-bissau</option>
        <option value="Guyana">Guyana</option>
        <option value="Haiti">Haiti</option>
        <option value="Heard Island and Mcdonald Islands">
          Heard Island and Mcdonald Islands
        </option>
        <option value="Holy See (Vatican City State)">
          Holy See (Vatican City State)
        </option>
        <option value="Honduras">Honduras</option>
        <option value="Hong Kong">Hong Kong</option>
        <option value="Hungary">Hungary</option>
        <option value="Iceland">Iceland</option>
        <option value="India">India</option>
        <option value="Indonesia">Indonesia</option>
        <option value="Iran, Islamic Republic of">
          Iran, Islamic Republic of
        </option>
        <option value="Iraq">Iraq</option>
        <option value="Ireland">Ireland</option>
        <option value="Isle of Man">Isle of Man</option>
        <option value="Israel">Israel</option>
        <option value="Italy">Italy</option>
        <option value="Jamaica">Jamaica</option>
        <option value="Japan">Japan</option>
        <option value="Jersey">Jersey</option>
        <option value="Jordan">Jordan</option>
        <option value="Kazakhstan">Kazakhstan</option>
        <option value="Kenya">Kenya</option>
        <option value="Kiribati">Kiribati</option>
        <option value="Korea, Democratic People's Republic of">
          Korea, Democratic People's Republic of
        </option>
        <option value="Korea, Republic of">Korea, Republic of</option>
        <option value="Kuwait">Kuwait</option>
        <option value="Kyrgyzstan">Kyrgyzstan</option>
        <option value="Lao People's Democratic Republic">
          Lao People's Democratic Republic
        </option>
        <option value="Latvia">Latvia</option>
        <option value="Lebanon">Lebanon</option>
        <option value="Lesotho">Lesotho</option>
        <option value="Liberia">Liberia</option>
        <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
        <option value="Liechtenstein">Liechtenstein</option>
        <option value="Lithuania">Lithuania</option>
        <option value="Luxembourg">Luxembourg</option>
        <option value="Macao">Macao</option>
        <option value="Macedonia, The Former Yugoslav Republic of">
          Macedonia, The Former Yugoslav Republic of
        </option>
        <option value="Madagascar">Madagascar</option>
        <option value="Malawi">Malawi</option>
        <option value="Malaysia">Malaysia</option>
        <option value="Maldives">Maldives</option>
        <option value="Mali">Mali</option>
        <option value="Malta">Malta</option>
        <option value="Marshall Islands">Marshall Islands</option>
        <option value="Martinique">Martinique</option>
        <option value="Mauritania">Mauritania</option>
        <option value="Mauritius">Mauritius</option>
        <option value="Mayotte">Mayotte</option>
        <option value="Mexico">Mexico</option>
        <option value="Micronesia, Federated States of">
          Micronesia, Federated States of
        </option>
        <option value="Moldova, Republic of">Moldova, Republic of</option>
        <option value="Monaco">Monaco</option>
        <option value="Mongolia">Mongolia</option>
        <option value="Montenegro">Montenegro</option>
        <option value="Montserrat">Montserrat</option>
        <option value="Morocco">Morocco</option>
        <option value="Mozambique">Mozambique</option>
        <option value="Myanmar">Myanmar</option>
        <option value="Namibia">Namibia</option>
        <option value="Nauru">Nauru</option>
        <option value="Nepal">Nepal</option>
        <option value="Netherlands">Netherlands</option>
        <option value="Netherlands Antilles">Netherlands Antilles</option>
        <option value="New Caledonia">New Caledonia</option>
        <option value="New Zealand">New Zealand</option>
        <option value="Nicaragua">Nicaragua</option>
        <option value="Niger">Niger</option>
        <option value="Nigeria">Nigeria</option>
        <option value="Niue">Niue</option>
        <option value="Norfolk Island">Norfolk Island</option>
        <option value="Northern Mariana Islands">
          Northern Mariana Islands
        </option>
        <option value="Norway">Norway</option>
        <option value="Oman">Oman</option>
        <option value="Pakistan">Pakistan</option>
        <option value="Palau">Palau</option>
        <option value="Palestinian Territory, Occupied">
          Palestinian Territory, Occupied
        </option>
        <option value="Panama">Panama</option>
        <option value="Papua New Guinea">Papua New Guinea</option>
        <option value="Paraguay">Paraguay</option>
        <option value="Peru">Peru</option>
        <option value="Philippines">Philippines</option>
        <option value="Pitcairn">Pitcairn</option>
        <option value="Poland">Poland</option>
        <option value="Portugal">Portugal</option>
        <option value="Puerto Rico">Puerto Rico</option>
        <option value="Qatar">Qatar</option>
        <option value="Reunion">Reunion</option>
        <option value="Romania">Romania</option>
        <option value="Russian Federation">Russian Federation</option>
        <option value="Rwanda">Rwanda</option>
        <option value="Saint Helena">Saint Helena</option>
        <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
        <option value="Saint Lucia">Saint Lucia</option>
        <option value="Saint Pierre and Miquelon">
          Saint Pierre and Miquelon
        </option>
        <option value="Saint Vincent and The Grenadines">
          Saint Vincent and The Grenadines
        </option>
        <option value="Samoa">Samoa</option>
        <option value="San Marino">San Marino</option>
        <option value="Sao Tome and Principe">Sao Tome and Principe</option>
        <option value="Saudi Arabia">Saudi Arabia</option>
        <option value="Senegal">Senegal</option>
        <option value="Serbia">Serbia</option>
        <option value="Seychelles">Seychelles</option>
        <option value="Sierra Leone">Sierra Leone</option>
        <option value="Singapore">Singapore</option>
        <option value="Slovakia">Slovakia</option>
        <option value="Slovenia">Slovenia</option>
        <option value="Solomon Islands">Solomon Islands</option>
        <option value="Somalia">Somalia</option>
        <option value="South Africa">South Africa</option>
        <option value="South Georgia and The South Sandwich Islands">
          South Georgia and The South Sandwich Islands
        </option>
        <option value="Spain">Spain</option>
        <option value="Sri Lanka">Sri Lanka</option>
        <option value="Sudan">Sudan</option>
        <option value="Suriname">Suriname</option>
        <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
        <option value="Swaziland">Swaziland</option>
        <option value="Sweden">Sweden</option>
        <option value="Switzerland">Switzerland</option>
        <option value="Syrian Arab Republic">Syrian Arab Republic</option>
        <option value="Taiwan, Province of China">
          Taiwan, Province of China
        </option>
        <option value="Tajikistan">Tajikistan</option>
        <option value="Tanzania, United Republic of">
          Tanzania, United Republic of
        </option>
        <option value="Thailand">Thailand</option>
        <option value="Timor-leste">Timor-leste</option>
        <option value="Togo">Togo</option>
        <option value="Tokelau">Tokelau</option>
        <option value="Tonga">Tonga</option>
        <option value="Trinidad and Tobago">Trinidad and Tobago</option>
        <option value="Tunisia">Tunisia</option>
        <option value="Turkey">Turkey</option>
        <option value="Turkmenistan">Turkmenistan</option>
        <option value="Turks and Caicos Islands">
          Turks and Caicos Islands
        </option>
        <option value="Tuvalu">Tuvalu</option>
        <option value="Uganda">Uganda</option>
        <option value="Ukraine">Ukraine</option>
        <option value="United Kingdom">United Kingdom</option>
        <option value="United States">United States</option>
        <option value="United States Minor Outlying Islands">
          United States Minor Outlying Islands
        </option>
        <option value="Uruguay">Uruguay</option>
        <option value="Uzbekistan">Uzbekistan</option>
        <option value="Vanuatu">Vanuatu</option>
        <option value="Venezuela">Venezuela</option>
        <option value="Viet Nam">Viet Nam</option>
        <option value="Virgin Islands, British">Virgin Islands, British</option>
        <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
        <option value="Wallis and Futuna">Wallis and Futuna</option>
        <option value="Western Sahara">Western Sahara</option>
        <option value="Yemen">Yemen</option>
        <option value="Zambia">Zambia</option>
        <option value="Zimbabwe">Zimbabwe</option>
      </>
    );
  };

  render() {
    const { values, handleChange } = this.props;

    const {
      additionalRespondent,
      alertRespondentName,
      alertRespondentAddress,
      alertRespondentEmail,
      alertRespondentNationality,
      alertRespondentPhone,
      alertRespondentName2,
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
                      color: "lightgray",
                      fontSize: "15px",
                      background: "green",
                      borderRadius: "50%",
                      padding: "2vh 14%",
                      lineHeight: "45px",
                    }}
                  >
                    <strong>2</strong>
                  </li>
                </Col>
                <Col>
                  <li
                    id="dispute"
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
              value="25"
              style={{ textAlign: "right", borderRadius: "50px" }}
            />
          </Col>
        </Row>
        <h6 style={styles.center}>Party Second</h6>
        <Card style={styles.cardBg}>
          <CardBody>
            <Form>
              <Row>
                <Col xl={6} lg={6} md={6} sm={12}>
                  <FormGroup>
                    <Label for="respondentName">
                      Full Name
                      <i style={{ color: "gray" }}>( official )</i>
                    </Label>
                    {alertRespondentName ? (
                      <span style={styles.warning}> name is required</span>
                    ) : (
                      <span style={styles.red}> *</span>
                    )}
                    <Input
                      type="text"
                      name="respondentName"
                      id="respondentName"
                      placeholder="name"
                      onChange={handleChange("respondentName")}
                      defaultValue={values.respondentName}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col xl={6} lg={6} md={6} sm={12}>
                  <FormGroup>
                    <Label for="respondentNationality">Nationality</Label>
                    {alertRespondentNationality ? (
                      <span style={styles.warning}>
                        {" "}
                        nationality is required
                      </span>
                    ) : (
                      <span style={styles.red}> *</span>
                    )}
                    <Input
                      type="select"
                      name="respondentNationality"
                      id="respondentNationality"
                      placeholder="nationality"
                      onChange={handleChange("respondentNationality")}
                      defaultValue={values.respondentNationality}
                    >
                      {this.countries()}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xl={6} lg={6} md={6} sm={12}>
                  <FormGroup>
                    <Label for="respondentAddress">Full Address</Label>
                    {alertRespondentAddress ? (
                      <span style={styles.warning}> address is required</span>
                    ) : (
                      <span style={styles.red}> *</span>
                    )}
                    <Input
                      type="text"
                      name="respondentAddress"
                      id="respondentAddress"
                      placeholder="address"
                      onChange={handleChange("respondentAddress")}
                      defaultValue={values.respondentAddress}
                    />
                  </FormGroup>
                </Col>
                <Col xl={6} lg={6} md={6} sm={12}>
                  <FormGroup>
                    <Label for="claimantPOBox">P.O.Box</Label>
                    <Input
                      type="text"
                      name="respondentPOBox"
                      id="respondentPOBox"
                      placeholder="P.O.Box"
                      onChange={handleChange("respondentPOBox")}
                      defaultValue={values.respondentPOBox}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xl={6} lg={6} md={6} sm={12}>
                  <FormGroup>
                    <Label for="respondentPhone">Phone</Label>
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
                      placeholder="phone"
                      onChange={handleChange("respondentPhone")}
                      defaultValue={values.respondentPhone}
                    />
                  </FormGroup>
                </Col>
                <Col xl={6} lg={6} md={6} sm={12}>
                  <FormGroup>
                    <Label for="respondentFax">Fax</Label>
                    <Input
                      type="text"
                      name="respondentFax"
                      id="respondentFax"
                      placeholder="FAX"
                      onChange={handleChange("respondentFax")}
                      defaultValue={values.respondentFax}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xl={6} lg={6} md={6} sm={12}>
                  <FormGroup>
                    <Label for="respondentEmail">E-mail</Label>
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
                      placeholder="email"
                      onChange={handleChange("respondentEmail")}
                      defaultValue={values.respondentEmail}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <FormGroup>
                <div>
                  <CustomInput
                    type="switch"
                    id="additional"
                    name="legal"
                    label="Additional Respondent"
                    value={this.state.additionalRespondent}
                    onChange={this.handleAdditionalPerson}
                  />
                </div>
              </FormGroup>

              {additionalRespondent ? (
                <Card style={styles.cardBgSecondary} className="shadow">
                  <h6 style={styles.center}>Additional Respondent</h6>
                  <CardBody>
                    <Row>
                      <Col xl={6} lg={6} md={6} sm={12}>
                        <FormGroup>
                          <Label for="respondentName">
                            Full Name
                            <i style={{ color: "gray" }}>( official )</i>
                          </Label>{" "}
                          {alertRespondentName2 ? (
                            <span style={styles.warning}>
                              {" "}
                              name is required
                            </span>
                          ) : (
                            <span style={styles.red}> *</span>
                          )}
                          <Input
                            type="text"
                            name="respondentName2"
                            id="respondentName2"
                            placeholder="name"
                            onChange={handleChange("respondentName2")}
                            defaultValue={values.respondentName2}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col xl={6} lg={6} md={6} sm={12}>
                        <FormGroup>
                          <Label for="respondentNationality2">
                            Nationality
                          </Label>
                          {alertRespondentNationality2 ? (
                            <span style={styles.warning}>
                              {" "}
                              nationality is required
                            </span>
                          ) : (
                            <span style={styles.red}> *</span>
                          )}
                          <Input
                            type="text"
                            name="respondentNationality2"
                            id="respondentNationality2"
                            placeholder="nationality2"
                            onChange={handleChange("respondentNationality2")}
                            defaultValue={values.respondentNationality2}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xl={6} lg={6} md={6} sm={12}>
                        <FormGroup>
                          <Label for="respondentAddress">Full Address</Label>{" "}
                          {alertRespondentAddress2 ? (
                            <span style={styles.warning}>
                              {" "}
                              address is required
                            </span>
                          ) : (
                            <span style={styles.red}> *</span>
                          )}
                          <Input
                            type="text"
                            name="respondentAddress2"
                            id="respondentAddress2"
                            placeholder="address"
                            onChange={handleChange("respondentAddress2")}
                            defaultValue={values.respondentAddress2}
                          />
                        </FormGroup>
                      </Col>
                      <Col xl={6} lg={6} md={6} sm={12}>
                        <FormGroup>
                          <Label for="claimantPOBox">P.O.Box</Label>
                          <Input
                            type="text"
                            name="respondentPOBox2"
                            id="respondentPOBox2"
                            placeholder="P.O.Box"
                            onChange={handleChange("respondentPOBox2")}
                            defaultValue={values.respondentPOBox2}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xl={6} lg={6} md={6} sm={12}>
                        <FormGroup>
                          <Label for="respondentPhone2">Phone</Label>{" "}
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
                            placeholder="phone"
                            onChange={handleChange("respondentPhone2")}
                            defaultValue={values.respondentPhone2}
                          />
                        </FormGroup>
                      </Col>
                      <Col xl={6} lg={6} md={6} sm={12}>
                        <FormGroup>
                          <Label for="respondentFax2">Fax</Label>
                          <Input
                            type="text"
                            name="respondentFax2"
                            id="respondentFax2"
                            placeholder="FAX"
                            onChange={handleChange("respondentFax2")}
                            defaultValue={values.respondentFax2}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xl={6} lg={6} md={6} sm={12}>
                        <FormGroup>
                          <Label for="respondentEmail2">E-mail</Label>{" "}
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
                            placeholder="email"
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
