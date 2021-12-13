import React, { Component } from "react";
import ClaimantDetails from "./ClaimantDetails";
import RespondentDetails from "./RespondentDetails";
import DisputeNature from "./DisputeNature";
import Success from "./Success";
import NominationOfArbitrator from "./NominationOfArbitrator";
import OtherSuggestions from "./OtherSuggestions";
import Undertakings from "./Undertakings";
import ESignature from "./ESignature";

export class UserForm extends Component {
  state = {
    step: 1,

    //claimant 1
    claimantName: "",
    claimantNationality: "",
    claimantAddress: "",
    claimantPOBox: " ",
    claimantPhone: "",
    claimantFax: " ",
    claimantEmail: "",

    //claimant 2
    claimantName2: "",
    claimantNationality2: "",
    claimantAddress2: "",
    claimantPOBox2: " ",
    claimantPhone2: "",
    claimantFax2: " ",
    claimantEmail2: "",

    //legal representative 1
    legalAuthRepresentativeName: " ",
    legalAuthFirmName: " ",
    legalAuthNationality: " ",
    legalAuthAddress: " ",
    legalAuthPOBox: " ",
    legalAuthPhone: " ",
    legalAuthFax: " ",
    legalAuthEmail: " ",
    legalAuthRegistration: " ",

    //legal representative 2
    legalAuthRepresentativeName2: " ",
    legalAuthFirmName2: " ",
    legalAuthNationality2: " ",
    legalAuthAddress2: " ",
    legalAuthPOBox2: " ",
    legalAuthPhone2: " ",
    legalAuthFax2: " ",
    legalAuthEmail2: " ",
    legalAuthRegistration2: " ",

    //respondent 1
    respondentName: "",
    respondentNationality: "",
    respondentAddress: "",
    respondentPOBox: " ",
    respondentPhone: "",
    respondentFax: " ",
    respondentEmail: "",

    //respondent 2
    respondentName2: " ",
    additionalRespondent2: " ",
    respondentNationality2: " ",
    respondentAddress2: " ",
    respondentPOBox2: " ",
    respondentPhone2: " ",
    respondentFax2: " ",
    respondentEmail2: " ",

    //dispute details
    conciliationClauses: "",
    natureOfDispute: "",
    otherDocuments: "",
    valueOfDispute: "",
    recitals: "",
    legalGrounds: "",
    reliefSought: "",

    //sole arbitrator
    requestIicraArbitrator: false,
    mandateIicraArbitrator: false,
    arbitratorName: " ",
    arbitratorNationality: " ",
    arbitratorAddress: " ",
    arbitratorPOBox: " ",
    arbitratorPhone: " ",
    arbitratorFax: " ",
    arbitratorEmail: " ",

    //other details
    arbitrationLanguage: "",
    governingLaw: "",
    placeOfArbitration: "",
    numberOfArbitrators: "",
    otherRequests: " ",
    eSignatureName: "",

    // attachments
    powerOfAttorney: null,
    powerOfAttorney2: null,
    disputeDocuments: null,
    arbitrationAgreement: null,
    cvOfArbitrator: null,
    eSignature: null,
  };

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
    console.log(e.target.value);
  };

  handleFileChange = (e) => {
    this.setState({
      [e.target.name]: e.target.files[0],
    });
  };

  render() {
    //Destructuring State
    const {
      step,
      //
      claimantName,
      additionalClaimant,
      claimantNationality,
      claimantAddress,
      claimantPOBox,
      claimantPhone,
      claimantFax,
      claimantEmail,
      //
      claimantName2,
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
      additionalRespondent,
      respondentNationality,
      respondentAddress,
      respondentPOBox,
      respondentPhone,
      respondentFax,
      respondentEmail,
      //
      respondentName2,
      additionalRespondent2,
      respondentNationality2,
      respondentAddress2,
      respondentPOBox2,
      respondentPhone2,
      respondentFax2,
      respondentEmail2,
      //
      conciliationClauses,
      natureOfDispute,
      otherDocuments,
      valueOfDispute,
      recitals,
      legalGrounds,
      reliefSought,

      //
      requestIicraArbitrator,
      mandateIicraArbitrator,
      arbitratorName,
      arbitratorNationality,
      arbitratorAddress,
      arbitratorPOBox,
      arbitratorPhone,
      arbitratorFax,
      arbitratorEmail,
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

    //Sending as props
    const values = {
      step,

      claimantName,
      additionalClaimant,
      claimantNationality,
      claimantAddress,
      claimantPOBox,
      claimantPhone,
      claimantFax,
      claimantEmail,
      //
      claimantName2,
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
      additionalRespondent,
      respondentNationality,
      respondentAddress,
      respondentPOBox,
      respondentPhone,
      respondentFax,
      respondentEmail,
      //
      respondentName2,
      additionalRespondent2,
      respondentNationality2,
      respondentAddress2,
      respondentPOBox2,
      respondentPhone2,
      respondentFax2,
      respondentEmail2,
      //
      conciliationClauses,
      natureOfDispute,
      otherDocuments,
      valueOfDispute,
      recitals,
      legalGrounds,
      reliefSought,
      //
      requestIicraArbitrator,
      mandateIicraArbitrator,
      arbitratorName,
      arbitratorNationality,
      arbitratorAddress,
      arbitratorPOBox,
      arbitratorPhone,
      arbitratorFax,
      arbitratorEmail,
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
            values={values}
          />
        );
      case 2:
        return (
          <RespondentDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
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
          />
        );
      // case 5:
      //   return (
      //     <OtherSuggestions
      //       nextStep={this.nextStep}
      //       prevStep={this.prevStep}
      //       handleChange={this.handleChange}
      //       values={values}
      //     />
      //   );
      case 5:
        return (
          <Undertakings
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 6:
        return (
          <ESignature
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            handleFileChange={this.handleFileChange}
            values={values}
          />
        );
      case 7:
        return <Success />;
    }
  }
}

export default UserForm;
