import React, { Component } from "react";
import ClaimantDetails from "./ClaimantDetails";
import RespondentDetails from "./RespondentDetails";
import DisputeNature from "./DisputeNature";
import Success from "./Success";
import NominationOfArbitrator from "./NominationOfArbitrator";
import OtherSuggestions from "./OtherSuggestions";
import Undertakings from "./Undertakings";
import ESignature from "./ESignature";
import Swal from "sweetalert2";

export class UserForm extends Component {
  state = {
    direction: "",
    step: 1,
    id: "",

    //claimant 1
    claimantName: "",
    claimantUserName: "",
    claimantNationality: "",
    claimantAddress: "",
    claimantPOBox: "",
    claimantPhone: "",
    claimantFax: "",
    claimantEmail: "",

    //claimant 2
    claimantName2: "",
    claimantUserName2: "",
    claimantNationality2: "",
    claimantAddress2: "",
    claimantPOBox2: "",
    claimantPhone2: "",
    claimantFax2: "",
    claimantEmail2: "",

    //legal representative 1
    legalAuthRepresentativeName: "",
    legalAuthFirmName: "",
    legalAuthNationality: "",
    legalAuthAddress: "",
    legalAuthPOBox: "",
    legalAuthPhone: "",
    legalAuthFax: "",
    legalAuthEmail: "",
    legalAuthRegistration: "",

    //legal representative 2
    legalAuthRepresentativeName2: "",
    legalAuthFirmName2: "",
    legalAuthNationality2: "",
    legalAuthAddress2: "",
    legalAuthPOBox2: "",
    legalAuthPhone2: "",
    legalAuthFax2: "",
    legalAuthEmail2: "",
    legalAuthRegistration2: "",

    //respondent 1
    respondentName: "",
    respondentUserName: "",
    respondentNationality: "",
    respondentAddress: "",
    respondentPOBox: "",
    respondentPhone: "",
    respondentFax: "",
    respondentEmail: "",

    //respondent 2
    respondentName2: "",
    respondentUserName2: "",
    additionalRespondent2: "",
    respondentNationality2: "",
    respondentAddress2: "",
    respondentPOBox2: "",
    respondentPhone2: "",
    respondentFax2: "",
    respondentEmail2: "",

    //dispute details
    natureOfDispute: "",
    valueOfDispute: "",
    recitals: "",
    legalGrounds: "",
    reliefSought: "",

    //sole arbitrator
    requestIicraArbitrator: false,
    mandateIicraArbitrator: false,
    arbitratorName: "",
    arbitratorUserName: "",
    arbitratorNationality: "",
    arbitratorAddress: "",
    arbitratorPOBox: "",
    arbitratorPhone: "",
    arbitratorFax: "",
    arbitratorEmail: "",
    nominateArbitrator: "",

    //other details
    arbitrationLanguage: "",
    governingLaw: "",
    placeOfArbitration: "",
    numberOfArbitrators: "",
    otherRequests: "",
    eSignatureName: "",

    // attachments
    powerOfAttorney: null,
    powerOfAttorney2: null,
    disputeDocuments: null,
    arbitrationAgreement: null,
    cvOfArbitrator: null,
    eSignature: null,

    legalPerson: false,
    legalPerson2: false,
    additionalClaimant: false,
    modalInstructions: true,
  };

  componentDidMount() {
    if (localStorage.getItem("lang") == "ar") {
      document.dir = "rtl";
      this.setState({ direction: "rtl" });
    } else {
      document.dir = "ltr";
      this.setState({ direction: "ltr" });
      localStorage.setItem("lang", "en");
    }

    if (window.location.pathname == "/respondent/reviewDetails") {
      alert(this.props.location.state._id);

      if (this.props.location.state._id) {
        this.setState({
          id: this.props.location.state._id,
        });
      }
    }
  }

  //procede to the next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  };

  //go back to previous step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
  };

  //handle fields change
  handleChange = (input) => (e) => {
    this.setState({
      [input]: e.target.value,
    });
  };

  handleFileChange = (e) => {
    if (e.target.name == "eSignature") {
      const check = e.target.files[0].type;
      if (
        check != "image/jpeg" &&
        check != "image/png" &&
        check != "image/gif"
      ) {
        Swal.fire({ text: "Please upload an image!", icon: "question" });
      } else {
        this.setState({
          [e.target.name]: e.target.files[0],
        });
      }
    } else {
      this.setState({
        [e.target.name]: e.target.files[0],
      });
    }
  };

  handleArbitrator = (flag) => {
    this.setState({
      nominateArbitrator: flag,
    });
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

  handleModalInstructions = () => {
    this.setState({
      modalInstructions: !this.state.modalInstructions,
    });
  };

  render() {
    //Destructuring State
    const {
      step,
      additionalClaimant,
      legalPerson,
      legalPerson2,
      modalInstructions,
      //
      claimantName,
      claimantUserName,
      claimantNationality,
      claimantAddress,
      claimantPOBox,
      claimantPhone,
      claimantFax,
      claimantEmail,
      //
      claimantName2,
      claimantUserName2,
      claimantNationality2,
      claimantAddress2,
      claimantPOBox2,
      claimantPhone2,
      claimantFax2,
      claimantEmail2,
      //
      legalAuthRepresentativeName,
      legalAuthFirmName,
      legalAuthNationality,
      legalAuthAddress,
      legalAuthPOBox,
      legalAuthPhone,
      legalAuthFax,
      legalAuthEmail,
      legalAuthRegistration,
      //
      legalAuthRepresentativeName2,
      legalAuthFirmName2,
      legalAuthNationality2,
      legalAuthAddress2,
      legalAuthPOBox2,
      legalAuthPhone2,
      legalAuthFax2,
      legalAuthEmail2,
      legalAuthRegistration2,
      //
      respondentName,
      respondentUserName,
      additionalRespondent,
      respondentNationality,
      respondentAddress,
      respondentPOBox,
      respondentPhone,
      respondentFax,
      respondentEmail,
      //
      respondentName2,
      respondentUserName2,
      additionalRespondent2,
      respondentNationality2,
      respondentAddress2,
      respondentPOBox2,
      respondentPhone2,
      respondentFax2,
      respondentEmail2,
      //
      natureOfDispute,
      valueOfDispute,
      recitals,
      legalGrounds,
      reliefSought,

      //
      requestIicraArbitrator,
      mandateIicraArbitrator,
      arbitratorName,
      arbitratorUserName,
      arbitratorNationality,
      arbitratorAddress,
      arbitratorPOBox,
      arbitratorPhone,
      arbitratorFax,
      arbitratorEmail,
      nominateArbitrator,
      //

      arbitrationLanguage,
      governingLaw,
      placeOfArbitration,
      numberOfArbitrators,
      otherRequests,
      eSignatureName,
      //
      powerOfAttorney,
      powerOfAttorney2,
      disputeDocuments,
      arbitrationAgreement,
      cvOfArbitrator,
      eSignature,
    } = this.state;

    //Sending the destructured state as props to components
    const values = {
      step,
      additionalClaimant,
      legalPerson,
      legalPerson2,
      modalInstructions,

      claimantName,
      claimantUserName,
      claimantNationality,
      claimantAddress,
      claimantPOBox,
      claimantPhone,
      claimantFax,
      claimantEmail,
      //
      claimantName2,
      claimantUserName2,
      claimantNationality2,
      claimantAddress2,
      claimantPOBox2,
      claimantPhone2,
      claimantFax2,
      claimantEmail2,
      //
      legalAuthRepresentativeName,
      legalAuthFirmName,
      legalAuthNationality,
      legalAuthAddress,
      legalAuthPOBox,
      legalAuthPhone,
      legalAuthFax,
      legalAuthEmail,
      legalAuthRegistration,
      //
      legalAuthRepresentativeName2,
      legalAuthFirmName2,
      legalAuthNationality2,
      legalAuthAddress2,
      legalAuthPOBox2,
      legalAuthPhone2,
      legalAuthFax2,
      legalAuthEmail2,
      legalAuthRegistration2,
      //
      respondentName,
      respondentUserName,
      additionalRespondent,
      respondentNationality,
      respondentAddress,
      respondentPOBox,
      respondentPhone,
      respondentFax,
      respondentEmail,
      //
      respondentName2,
      respondentUserName2,
      additionalRespondent2,
      respondentNationality2,
      respondentAddress2,
      respondentPOBox2,
      respondentPhone2,
      respondentFax2,
      respondentEmail2,
      //
      natureOfDispute,
      valueOfDispute,
      recitals,
      legalGrounds,
      reliefSought,
      //
      requestIicraArbitrator,
      mandateIicraArbitrator,
      arbitratorName,
      arbitratorUserName,
      arbitratorNationality,
      arbitratorAddress,
      arbitratorPOBox,
      arbitratorPhone,
      arbitratorFax,
      arbitratorEmail,
      nominateArbitrator,
      //
      arbitrationLanguage,
      governingLaw,
      placeOfArbitration,
      numberOfArbitrators,
      otherRequests,
      eSignatureName,
      ///////
      powerOfAttorney,
      powerOfAttorney2,
      disputeDocuments,
      arbitrationAgreement,
      cvOfArbitrator,
      eSignature,
    };

    switch (step) {
      case 1:
        return (
          <ClaimantDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            handleFileChange={this.handleFileChange}
            handleAdditionalPerson={this.handleAdditionalPerson}
            handleLegalPerson={this.handleLegalPerson}
            handleLegalPerson2={this.handleLegalPerson2}
            handleModalInstructions={this.handleModalInstructions}
            values={values}
            direction={this.state.direction}
          />
        );
      case 2:
        return (
          <RespondentDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
            direction={this.state.direction}
          />
        );
      case 3:
        return (
          <DisputeNature
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            handleFileChange={this.handleFileChange}
            values={values}
            direction={this.state.direction}
          />
        );
      case 4:
        return (
          <NominationOfArbitrator
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            handleFileChange={this.handleFileChange}
            values={values}
            direction={this.state.direction}
            handleArbitrator={this.handleArbitrator}
          />
        );
      case 5:
        return (
          <OtherSuggestions
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
            direction={this.state.direction}
          />
        );
      case 6:
        return (
          <Undertakings
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
            direction={this.state.direction}
          />
        );
      case 7:
        return (
          <ESignature
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            handleFileChange={this.handleFileChange}
            values={values}
            direction={this.state.direction}
            id={this.state.id}
          />
        );
      case 8:
        return <Success direction={this.state.direction} />;
    }
  }
}

export default UserForm;
