import React, { Component } from "react";
import validator from "validator";
import {
  Card,
  CardBody,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  CustomInput,
  Progress,
} from "reactstrap";

export class FormUserDetails extends Component {
  state = {
    legalPerson: false,
    legalPerson2: false,
    additionalClaimant: false,
    alertClaimantName: false,
    alertClaimantAddress: false,
    alertClaimantEmail: "",
    alertClaimantNationality: false,
    alertClaimantPhone: "",
    alertClaimantName2: false,
    alertClaimantAddress2: false,
    alertClaimantEmail2: "",
    alertClaimantNationality2: false,
    alertClaimantPhone2: "",
    alertLegalAuthRepresentativeName: false,
    alertLegalAuthFirmName: false,
    alertlegalAuthAddress: false,
    alertLegalAuthNationality: false,
    alertLegalAuthPhone: false,
    alertlegalAuthFirmEmail: false,
    alertLegalAuthRepresentativeName2: false,
    alertLegalAuthFirmName2: false,
    alertlegalAuthAddress2: false,
    alertLegalAuthNationality2: false,
    alertLegalAuthPhone2: false,
    alertlegalAuthFirmEmail2: false,
    alertPOA: false,
    alertPOA2: false,

    //media query
    matches: window.matchMedia("(min-width: 1024px)").matches,
  };

  continue = (e) => {
    e.preventDefault();
    const {
      claimantName,
      claimantAddress,
      claimantEmail,
      claimantNationality,
      claimantPhone,
      claimantName2,
      claimantAddress2,
      claimantEmail2,
      claimantNationality2,
      claimantPhone2,
      legalAuthNationality,
      legalAuthAddress,
      legalAuthRepresentativeName,
      legalAuthPhone,
      legalAuthEmail,
      legalAuthNationality2,
      legalAuthAddress2,
      legalAuthRepresentativeName2,
      legalAuthPhone2,
      legalAuthEmail2,
      powerOfAttorney,
      powerOfAttorney2,
    } = this.props.values;

    //CLaimant Validation
    if (validator.isEmpty(claimantName) || claimantName == " ") {
      this.setState({ alertClaimantName: true });
    } else if (validator.isEmpty(claimantAddress) || claimantAddress == " ") {
      this.setState({ alertClaimantAddress: true });
    } else if (!validator.isEmail(claimantEmail)) {
      this.setState({ alertClaimantEmail: " invalid email address" });
    } else if (validator.isEmpty(claimantEmail) || claimantEmail == " ") {
      this.setState({ alertClaimantEmail: " email address is required" });
    } else if (
      validator.isEmpty(claimantNationality) ||
      claimantNationality == " "
    ) {
      this.setState({ alertClaimantNationality: true });
    } else if (!validator.isMobilePhone(claimantPhone)) {
      this.setState({ alertClaimantPhone: " invalid phone number" });
    } else if (validator.isEmpty(claimantPhone) || claimantPhone == " ") {
      this.setState({ alertClaimantPhone: " phone number is required" });
    }

    //Legal Representative Validation
    else if (this.state.legalPerson) {
      if (
        validator.isEmpty(legalAuthRepresentativeName) ||
        legalAuthRepresentativeName == " "
      ) {
        this.setState({ alertLegalAuthRepresentativeName: true });
      } else if (
        validator.isEmpty(legalAuthAddress) ||
        legalAuthAddress == " "
      ) {
        this.setState({ alertlegalAuthAddress: true });
      } else if (!validator.isEmail(legalAuthEmail)) {
        this.setState({ alertlegalAuthFirmEmail: " invalid email address" });
      } else if (validator.isEmpty(legalAuthEmail) || legalAuthEmail == " ") {
        this.setState({
          alertlegalAuthFirmEmail: " email address is required",
        });
      } else if (
        validator.isEmpty(legalAuthNationality) ||
        legalAuthNationality == " "
      ) {
        this.setState({ alertLegalAuthNationality: true });
      } else if (!validator.isMobilePhone(legalAuthPhone)) {
        this.setState({ alertLegalAuthPhone: " invalid phone number" });
      } else if (validator.isEmpty(legalAuthPhone) || legalAuthPhone == " ") {
        this.setState({ alertLegalAuthPhone: " phone number is required" });
      } else if (powerOfAttorney == null) {
        this.setState({ alertPOA: true });
      } else if (this.state.additionalClaimant) {
        if (validator.isEmpty(claimantName2) || claimantName2 == " ") {
          this.setState({ alertClaimantName2: true });
        } else if (
          validator.isEmpty(claimantAddress2) ||
          claimantAddress2 == " "
        ) {
          this.setState({ alertClaimantAddress2: true });
        } else if (!validator.isEmail(claimantEmail2)) {
          this.setState({ alertClaimantEmail2: " invalid email address" });
        } else if (validator.isEmpty(claimantEmail2) || claimantEmail2 == " ") {
          this.setState({ alertClaimantEmail2: " email address is required" });
        } else if (
          validator.isEmpty(claimantNationality2) ||
          claimantNationality2 == " "
        ) {
          this.setState({ alertClaimantNationality2: true });
        } else if (!validator.isMobilePhone(claimantPhone2)) {
          this.setState({ alertClaimantPhone2: " invalid phone number" });
        } else if (validator.isEmpty(claimantPhone2) || claimantPhone2 == " ") {
          this.setState({ alertClaimantPhone2: " phone number is required" });
        } else this.props.nextStep();
      } else {
        this.props.nextStep();
      }
    }

    //Additonal Claimant Validation
    else if (this.state.additionalClaimant) {
      alert("additinal");
      if (validator.isEmpty(claimantName2) || claimantName2 == " ") {
        this.setState({ alertClaimantName2: true });
      } else if (
        validator.isEmpty(claimantAddress2) ||
        claimantAddress2 == " "
      ) {
        this.setState({ alertClaimantAddress2: true });
      } else if (!validator.isEmail(claimantEmail2)) {
        this.setState({ alertClaimantEmail2: " invalid email address" });
      } else if (validator.isEmpty(claimantEmail2) || claimantEmail2 == " ") {
        this.setState({ alertClaimantEmail2: " email address is required" });
      } else if (
        validator.isEmpty(claimantNationality2) ||
        claimantNationality2 == " "
      ) {
        this.setState({ alertClaimantNationality2: true });
      } else if (!validator.isMobilePhone(claimantPhone2)) {
        this.setState({ alertClaimantPhone2: " invalid phone number" });
      } else if (validator.isEmpty(claimantPhone2) || claimantPhone2 == " ") {
        this.setState({ alertClaimantPhone2: " phone number is required" });
      } else if (this.state.legalPerson) {
        if (
          validator.isEmpty(legalAuthRepresentativeName) ||
          legalAuthRepresentativeName == " "
        ) {
          this.setState({ alertLegalAuthRepresentativeName: true });
        } else if (
          validator.isEmpty(legalAuthAddress) ||
          legalAuthAddress == " "
        ) {
          this.setState({ alertlegalAuthAddress: true });
        } else if (!validator.isEmail(legalAuthEmail)) {
          this.setState({ alertlegalAuthFirmEmail: " invalid email address" });
        } else if (validator.isEmpty(legalAuthEmail) || legalAuthEmail == " ") {
          this.setState({
            alertlegalAuthFirmEmail: " email address is required",
          });
        } else if (
          validator.isEmpty(legalAuthNationality) ||
          legalAuthNationality == " "
        ) {
          this.setState({ alertLegalAuthNationality: true });
        } else if (!validator.isMobilePhone(legalAuthPhone)) {
          this.setState({ alertLegalAuthPhone: " invalid phone number" });
        } else if (validator.isEmpty(legalAuthPhone) || legalAuthPhone == " ") {
          this.setState({ alertLegalAuthPhone: " phone number is required" });
        } else this.props.nextStep();
      } else this.props.nextStep();
    }

    //Additional Claimant Legal Representative Validation
    else if (this.state.legalPerson2) {
      if (
        validator.isEmpty(legalAuthRepresentativeName2) ||
        legalAuthRepresentativeName2 == " "
      ) {
        this.setState({ alertLegalAuthRepresentativeName2: true });
      } else if (
        validator.isEmpty(legalAuthAddress2) ||
        legalAuthAddress2 == " "
      ) {
        this.setState({ alertlegalAuthAddress2: true });
      } else if (!validator.isEmail(legalAuthEmail2)) {
        this.setState({ alertLegalAuthEmail2: " invalid email address" });
      } else if (validator.isEmpty(legalAuthEmail2) || legalAuthEmail2 == " ") {
        this.setState({ alertLegalAuthEmail2: " email address is required" });
      } else if (
        validator.isEmpty(legalAuthNationality2) ||
        legalAuthNationality2 == " "
      ) {
        this.setState({ alertLegalAuthNationality2: true });
      } else if (!validator.isMobilePhone(legalAuthPhone2)) {
        this.setState({ alertLegalAuthPhone2: " invalid phone number" });
      } else if (validator.isEmpty(legalAuthPhone2) || legalAuthPhone2 == " ") {
        this.setState({ alertLegalAuthPhone2: " phone number is required" });
      } else if (powerOfAttorney2 == null) {
        this.setState({ alertPOA2: true });
      } else this.props.nextStep();
    } else {
      this.props.nextStep();
    }
  };

  handleLegalPerson = () => {
    this.setState({
      legalPerson: !this.state.legalPerson,
    });
  };

  handleLegalPerson2 = () => {
    this.setState({
      legalPerson2: !this.state.legalPerson2,
    });
  };

  handleAdditionalPerson = () => {
    this.setState({
      additionalClaimant: !this.state.additionalClaimant,
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

  legalBlock = () => {
    const { values, handleChange, handleFileChange } = this.props;
    return (
      <Card style={styles.cardBgSecondary} className="shadow mb-5">
        <h6 style={styles.center}>Legal Representative</h6>
        <CardBody>
          <Row>
            <Col xl={6} lg={6} md={6} sm={12}>
              <FormGroup>
                <Label for="legalAuthRepresentativeName">
                  Full Name of the Representative
                  <i style={{ color: "gray" }}>( official )</i>
                </Label>
                {this.state.alertLegalAuthRepresentativeName ? (
                  <span style={styles.warning}> name is required</span>
                ) : (
                  <span style={styles.red}> *</span>
                )}
                <Input
                  type="text"
                  name="name"
                  id="legalAuthRepresentativeName"
                  placeholder="representative name"
                  onChange={handleChange("legalAuthRepresentativeName")}
                  defaultValue={values.legalAuthRepresentativeName}
                  required
                />
              </FormGroup>
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <FormGroup>
                <Label for="legalAuthFirmName">
                  Name of the Representative Firm
                </Label>{" "}
                <Input
                  type="text"
                  name="legalAuthFirmName"
                  id="legalAuthFirmName"
                  placeholder="firm name"
                  onChange={handleChange("legalAuthFirmName")}
                  defaultValue={values.legalAuthFirmName}
                />
              </FormGroup>
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <FormGroup>
                <Label for="legalAuthNationality">Nationality</Label>{" "}
                {this.state.alertLegalAuthNationality ? (
                  <span style={styles.warning}> nationality is required</span>
                ) : (
                  <span style={styles.red}> *</span>
                )}
                <Input
                  className="selectpicker"
                  data-live-search="true"
                  type="select"
                  name="legalAuthNationality"
                  id="legalAuthNationality"
                  placeholder="nationality"
                  onChange={handleChange("legalAuthNationality")}
                  defaultValue={values.legalAuthNationality}
                >
                  {this.countries()}
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xl={6} lg={6} md={6} sm={12}>
              <FormGroup>
                <Label for="legalAuthAddress">Full Address</Label>
                {this.state.alertlegalAuthAddress ? (
                  <span style={styles.warning}>address is required</span>
                ) : (
                  <span style={styles.red}> *</span>
                )}
                <Input
                  type="text"
                  name="legalAuthAddress"
                  id="legalAuthAddress"
                  placeholder="address"
                  onChange={handleChange("legalAuthAddress")}
                  defaultValue={values.legalAuthAddress}
                />
              </FormGroup>
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <FormGroup>
                <Label for="legalAuthPOBox">P.O.Box</Label>

                <Input
                  type="text"
                  name="legalAuthPOBox"
                  id="legalAuthPOBox"
                  placeholder="P.O.Box"
                  onChange={handleChange("legalAuthPOBox")}
                  defaultValue={values.legalAuthPOBox}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xl={6} lg={6} md={6} sm={12}>
              <FormGroup>
                <Label for="legalAuthPhone">Phone</Label>
                {this.state.alertLegalAuthPhone ? (
                  <span style={styles.warning}> phone number is required</span>
                ) : (
                  <span style={styles.red}> *</span>
                )}
                <Input
                  type="text"
                  name="legalAuthPhone"
                  id="legalAuthPhone"
                  placeholder="phone"
                  onChange={handleChange("legalAuthPhone")}
                  defaultValue={values.legalAuthPhone}
                />
              </FormGroup>
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <FormGroup>
                <Label for="legalAuthFax">Fax</Label>
                <Input
                  type="text"
                  name="legalAuthFax"
                  id="legalAuthFax"
                  placeholder="FAX"
                  onChange={handleChange("legalAuthFax")}
                  defaultValue={values.legalAuthFax}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xl={6} lg={6} md={6} sm={12}>
              <FormGroup>
                <Label for="legalAuthEmail">E-mail</Label>
                {this.state.alertlegalAuthFirmEmail ? (
                  <span style={styles.warning}> email is required</span>
                ) : (
                  <span style={styles.red}> *</span>
                )}
                <Input
                  type="email"
                  name="legalAuthEmail"
                  id="legalAuthEmail"
                  placeholder="email"
                  onChange={handleChange("legalAuthEmail")}
                  defaultValue={values.legalAuthEmail}
                />
              </FormGroup>
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <FormGroup>
                <Label for="legalAuthRegistration">
                  Commercial Register Number
                </Label>

                <Input
                  type="text"
                  name="legalAuthRegistration"
                  id="legalAuthRegistration"
                  placeholder="Registration"
                  onChange={handleChange("legalAuthRegistration")}
                  defaultValue={values.legalAuthRegistration}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xl={6} lg={6} md={6} sm={12}>
              <FormGroup>
                <Label for="powerOfAttorney">Power Of Attorney</Label>{" "}
                {this.state.alertPOA ? (
                  <span style={styles.warning}>
                    Power of Attorney is required
                  </span>
                ) : (
                  <span style={styles.red}> *</span>
                )}
                <Input
                  type="file"
                  id="powerOfAttorney"
                  name="powerOfAttorney"
                  onChange={handleFileChange}
                  defaultValue={values.powerOfAttorney}
                />
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  };

  legalBlock2 = () => {
    const { values, handleChange, handleFileChange } = this.props;
    return (
      <Card style={styles.cardBgSecondary} className="shadow mb-5">
        <h6 style={styles.center}>Legal Representative</h6>
        <CardBody>
          <Row>
            <Col xl={6} lg={6} md={6} sm={12}>
              <FormGroup>
                <Label for="legalAuthRepresentativeName2">
                  Full Name of the Representative
                  <i style={{ color: "gray" }}>( official )</i>
                </Label>
                {this.state.alertLegalAuthRepresentativeName2 ? (
                  <span style={styles.warning}> name is required</span>
                ) : (
                  <span style={styles.red}> *</span>
                )}
                <Input
                  type="text"
                  name="name2"
                  id="legalAuthRepresentativeName2"
                  placeholder="representative name"
                  onChange={handleChange("legalAuthRepresentativeName2")}
                  defaultValue={values.legalAuthRepresentativeName2}
                  required
                />
              </FormGroup>
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <FormGroup>
                <Label for="legalAuthFirmName2">
                  Name of the Representative Firm
                </Label>{" "}
                {this.state.alertLegalAuthFirmName2 ? (
                  <span style={styles.warning}> name is required</span>
                ) : (
                  <span style={styles.red}> *</span>
                )}
                <Input
                  type="text"
                  name="legalAuthFirmName2"
                  id="legalAuthFirmName2"
                  placeholder="firm name"
                  onChange={handleChange("legalAuthFirmName2")}
                  defaultValue={values.legalAuthFirmName2}
                />
              </FormGroup>
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <FormGroup>
                <Label for="legalAuthNationality2">Nationality</Label>
                {this.state.alertLegalAuthNationality2 ? (
                  <span style={styles.warning}> nationality is required</span>
                ) : (
                  <span style={styles.red}> *</span>
                )}{" "}
                <Input
                  type="select"
                  name="legalAuthNationality2"
                  id="legalAuthNationality2"
                  placeholder="nationality"
                  onChange={handleChange("legalAuthNationality2")}
                  defaultValue={values.legalAuthNationality2}
                >
                  {this.countries()}
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xl={6} lg={6} md={6} sm={12}>
              <FormGroup>
                <Label for="legalAuthAddress2">Address</Label>
                {this.state.alertlegalAuthAddress2 ? (
                  <span style={styles.warning}>address is required</span>
                ) : (
                  <span style={styles.red}> *</span>
                )}
                <Input
                  type="text"
                  name="legalAuthAddress2"
                  id="legalAuthAddress2"
                  placeholder="address"
                  onChange={handleChange("legalAuthAddress2")}
                  defaultValue={values.legalAuthAddress2}
                />
              </FormGroup>
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <FormGroup>
                <Label for="legalAuthPOBox2">P.O.Box</Label>
                <Input
                  type="text"
                  name="legalAuthPOBox2"
                  id="legalAuthPOBox2"
                  placeholder="P.O.Box"
                  onChange={handleChange("legalAuthPOBox2")}
                  defaultValue={values.legalAuthPOBox2}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xl={6} lg={6} md={6} sm={12}>
              <FormGroup>
                <Label for="legalAuthPhone2">Phone</Label>
                {this.state.alertLegalAuthPhone2 ? (
                  <span style={styles.warning}>
                    phone number is required is required
                  </span>
                ) : (
                  <span style={styles.red}> *</span>
                )}
                <Input
                  type="text"
                  name="legalAuthPhone2"
                  id="legalAuthPhone2"
                  placeholder="phone"
                  onChange={handleChange("legalAuthPhone2")}
                  defaultValue={values.legalAuthPhone2}
                />
              </FormGroup>
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <FormGroup>
                <Label for="legalAuthFax">Fax</Label>
                <Input
                  type="text"
                  name="legalAuthFax2"
                  id="legalAuthFax2"
                  placeholder="FAX"
                  onChange={handleChange("legalAuthFax2")}
                  defaultValue={values.legalAuthFax2}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xl={6} lg={6} md={6} sm={12}>
              <FormGroup>
                <Label for="legalAuthEmail2">E-mail</Label>
                {this.state.alertlegalAuthFirmEmail2 ? (
                  <span style={styles.warning}> email is required</span>
                ) : (
                  <span style={styles.red}> *</span>
                )}
                <Input
                  type="email"
                  name="legalAuthEmail2"
                  id="legalAuthEmail2"
                  placeholder="email"
                  onChange={handleChange("legalAuthEmail2")}
                  defaultValue={values.legalAuthEmail2}
                />
              </FormGroup>
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <FormGroup>
                <Label for="legalAuthRegistration2">
                  Commercial Registration Number
                </Label>

                <Input
                  type="text"
                  name="legalAuthRegistration2"
                  id="legalAuthRegistration2"
                  placeholder="email"
                  onChange={handleChange("legalAuthRegistration2")}
                  defaultValue={values.legalAuthRegistration2}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xl={6} lg={6} md={6} sm={12}>
              <FormGroup>
                <Label for="powerOfAttorney2">Power Of Attorney</Label>
                {this.state.alertPOA2 ? (
                  <span style={styles.warning}>
                    Power of Attorney is required
                  </span>
                ) : (
                  <span style={styles.red}> *</span>
                )}
                <Input
                  type="file"
                  name="powerOfAttorney2"
                  onChange={handleFileChange}
                  defaultValue={values.powerOfAttorney2}
                />
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  };

  render() {
    const { values, handleChange } = this.props;
    const {
      legalPerson,
      legalPerson2,
      additionalClaimant,

      alertClaimantName,
      alertClaimantAddress,
      alertClaimantEmail,
      alertClaimantNationality,
      alertClaimantPhone,

      alertClaimantName2,
      alertClaimantAddress2,
      alertClaimantEmail2,
      alertClaimantNationality2,
      alertClaimantPhone2,
    } = this.state;

    // Legal Representative

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
                      color: "lightgray",
                      fontSize: "15px",
                      background: "green",
                      borderRadius: "50%",
                      padding: "2vh 14%",
                      lineHeight: "45px",
                    }}
                  >
                    <strong>1 </strong>
                  </li>
                </Col>
                <Col>
                  <li
                    id="respondent"
                    style={{
                      display: "inline",
                      color: "black",
                      fontSize: "15px",
                      borderRadius: "50%",
                      padding: "2vh 14%",
                      background: "lightgray",
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
                      borderRadius: "50%",
                      padding: "2vh 14%",
                      background: "lightgray",
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
                      borderRadius: "50%",
                      padding: "2vh 14%",
                      background: "lightgray",
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
                      borderRadius: "50%",
                      padding: "2vh 14%",
                      background: "lightgray",
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
                      borderRadius: "50%",
                      padding: "2vh 14%",
                      background: "lightgray",
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
              value="12.5"
              style={{ textAlign: "right", borderRadius: "50px" }}
            />
          </Col>
        </Row>

        <h6 style={styles.center}>Party 1st</h6>

        <Card style={styles.cardBg}>
          <CardBody>
            <Form>
              <Row>
                <Col xl={6} lg={6} md={6} sm={12}>
                  <FormGroup>
                    <Label for="claimantName">
                      Full Name <i style={{ color: "gray" }}>( official )</i>
                    </Label>
                    {alertClaimantName ? (
                      <span style={styles.warning}> name is required</span>
                    ) : (
                      <span style={styles.red}> *</span>
                    )}
                    <Input
                      type="text"
                      name="claimantName"
                      id="claimantName"
                      onChange={handleChange("claimantName")}
                      defaultValue={values.claimantName}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col xl={6} lg={6} md={6} sm={12}>
                  <FormGroup>
                    <Label for="claimantNationality">Nationality</Label>{" "}
                    {alertClaimantNationality ? (
                      <span style={styles.warning}>
                        nationality is required
                      </span>
                    ) : (
                      <span style={styles.red}> *</span>
                    )}
                    <Input
                      type="select"
                      name="claimantNationality"
                      id="claimantNationality"
                      onChange={handleChange("claimantNationality")}
                      defaultValue={values.claimantNationality}
                    >
                      {this.countries()}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xl={6} lg={6} md={6} sm={12}>
                  <FormGroup>
                    <Label for="claimantAddress">Full Address</Label>
                    {alertClaimantAddress ? (
                      <span style={styles.warning}> address is required</span>
                    ) : (
                      <span style={styles.red}> *</span>
                    )}
                    <Input
                      type="text"
                      name="claimantAddress"
                      id="claimantAddress"
                      onChange={handleChange("claimantAddress")}
                      defaultValue={values.claimantAddress}
                    />
                  </FormGroup>
                </Col>
                <Col xl={6} lg={6} md={6} sm={12}>
                  <FormGroup>
                    <Label for="claimantPOBox">P.O.Box</Label>

                    <Input
                      type="text"
                      name="claimantPOBox"
                      id="claimantPOBox"
                      onChange={handleChange("claimantPOBox")}
                      defaultValue={values.claimantPOBox}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xl={6} lg={6} md={6} sm={12}>
                  <FormGroup>
                    <Label for="claimantPhone">Phone</Label>
                    {alertClaimantPhone ? (
                      <span style={styles.warning}>{alertClaimantPhone}</span>
                    ) : (
                      <span style={styles.red}> *</span>
                    )}
                    <Input
                      type="text"
                      name="claimantPhone"
                      id="claimantPhone"
                      onChange={handleChange("claimantPhone")}
                      defaultValue={values.claimantPhone}
                    />
                  </FormGroup>
                </Col>
                <Col xl={6} lg={6} md={6} sm={12}>
                  <FormGroup>
                    <Label for="claimantFax">Fax</Label>
                    <Input
                      type="text"
                      name="claimantFax"
                      id="claimantFax"
                      onChange={handleChange("claimantFax")}
                      defaultValue={values.claimantFax}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xl={6} lg={6} md={6} sm={12}>
                  <FormGroup>
                    <Label for="claimantEmail">E-mail</Label>
                    {alertClaimantEmail ? (
                      <span style={styles.warning}>{alertClaimantEmail}</span>
                    ) : (
                      <span style={styles.red}> *</span>
                    )}
                    <Input
                      type="email"
                      name="claimantEmail"
                      id="claimantEmail"
                      onChange={handleChange("claimantEmail")}
                      defaultValue={values.claimantEmail}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <FormGroup>
                <div>
                  <CustomInput
                    type="switch"
                    id="legal"
                    name="legal"
                    label="Legal Representative"
                    value={this.state.legalPerson}
                    onChange={this.handleLegalPerson}
                  />
                </div>
              </FormGroup>
              {legalPerson ? this.legalBlock() : null}

              <FormGroup>
                <div>
                  <CustomInput
                    type="switch"
                    id="additional"
                    name="additional"
                    label="Additional Applicant"
                    value={this.state.additionalClaimant}
                    onChange={this.handleAdditionalPerson}
                  />
                </div>
              </FormGroup>

              {additionalClaimant ? (
                <>
                  <Card style={styles.cardBgSecondary} className="shadow">
                    <h6 style={styles.center}> Additional Claimant</h6>
                    <CardBody>
                      <Row>
                        <Col xl={6} lg={6} md={6} sm={12}>
                          <FormGroup>
                            <Label for="claimantName2">
                              <i style={{ color: "gray" }}>( official )</i>
                            </Label>{" "}
                            {alertClaimantName2 ? (
                              <span style={styles.warning}>
                                {" "}
                                name is required
                              </span>
                            ) : (
                              <span style={styles.red}> *</span>
                            )}
                            <Input
                              type="text"
                              name="claimantName2"
                              id="claimantName2"
                              placeholder="name"
                              onChange={handleChange("claimantName2")}
                              defaultValue={values.claimantName2}
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col xl={6} lg={6} md={6} sm={12}>
                          <FormGroup>
                            <Label for="claimantNationality">Nationality</Label>
                            {alertClaimantNationality2 ? (
                              <span style={styles.warning}>
                                nationality is required
                              </span>
                            ) : (
                              <span style={styles.red}> *</span>
                            )}{" "}
                            <Input
                              type="text"
                              name="claimantNationality2"
                              id="claimantNationality2"
                              placeholder="nationality"
                              onChange={handleChange("claimantNationality2")}
                              defaultValue={values.claimantNationality2}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col xl={6} lg={6} md={6} sm={12}>
                          <FormGroup>
                            <Label for="claimantAddress2">Full Address</Label>
                            {alertClaimantAddress2 ? (
                              <span style={styles.warning}>
                                {" "}
                                address is required
                              </span>
                            ) : (
                              <span style={styles.red}> *</span>
                            )}{" "}
                            <Input
                              type="text"
                              name="claimantAddress2"
                              id="claimantAddress2"
                              placeholder="address"
                              onChange={handleChange("claimantAddress2")}
                              defaultValue={values.claimantAddress2}
                            />
                          </FormGroup>
                        </Col>
                        <Col xl={6} lg={6} md={6} sm={12}>
                          <FormGroup>
                            <Label for="claimantPOBox2">P.O.Box</Label>
                            <Input
                              type="text"
                              name="claimantPOBox2"
                              id="claimantPOBox2"
                              placeholder="P.O.Box"
                              onChange={handleChange("claimantPOBox2")}
                              defaultValue={values.claimantPOBox2}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col xl={6} lg={6} md={6} sm={12}>
                          <FormGroup>
                            <Label for="claimantPhone2">Phone</Label>
                            {alertClaimantPhone2 ? (
                              <span style={styles.warning}>
                                {alertClaimantPhone}
                              </span>
                            ) : (
                              <span style={styles.red}> *</span>
                            )}{" "}
                            <Input
                              type="text"
                              name="claimantPhone2"
                              id="claimantPhone2"
                              placeholder="phone"
                              onChange={handleChange("claimantPhone2")}
                              defaultValue={values.claimantPhone2}
                            />
                          </FormGroup>
                        </Col>
                        <Col xl={6} lg={6} md={6} sm={12}>
                          <FormGroup>
                            <Label for="claimantFax2">Fax</Label>
                            <Input
                              type="text"
                              name="claimantFax2"
                              id="claimantFax2"
                              placeholder="FAX"
                              onChange={handleChange("claimantFax2")}
                              defaultValue={values.claimantFax2}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col xl={6} lg={6} md={6} sm={12}>
                          <FormGroup>
                            <Label for="claimantEmail2">E-mail</Label>
                            {alertClaimantEmail2 ? (
                              <span style={styles.warning}>
                                {alertClaimantEmail}
                              </span>
                            ) : (
                              <span style={styles.red}> *</span>
                            )}{" "}
                            <Input
                              type="email"
                              name="claimantEmail2"
                              id="claimantEmail2"
                              placeholder="email"
                              onChange={handleChange("claimantEmail2")}
                              defaultValue={values.claimantEmail2}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <FormGroup>
                        <div>
                          <CustomInput
                            type="switch"
                            id="legal2"
                            name="legal2"
                            label="Legal Representative"
                            value={this.state.legalPerson2}
                            onChange={this.handleLegalPerson2}
                          />
                        </div>
                      </FormGroup>
                    </CardBody>
                  </Card>
                  {legalPerson2 ? this.legalBlock2() : null}
                </>
              ) : null}

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
    borderRadius: "10px",
  },
  button: {
    margin: 15,
    backgroundColor: "#008f53",
  },
  formUserContainer: {
    marginTop: "5vh",
    paddingTop: "5vh",
    paddingBottom: "3vh",
    backgroundColor: "#f6f6f6",
    borderRadius: "10px",
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
  link: {
    display: "inline",
    color: "black",
    listStyleType: "none",
    fontSize: "15px",
    width: "50px",
    height: "50px",
    lineHeight: "45px",
    background: "lightgray",
    borderRadius: "50%",
    margin: "0vw 4.9vw 0vw 4.9vw",
    padding: "2vh 3.2vh",
  },
};

export default FormUserDetails;
