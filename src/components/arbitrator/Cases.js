import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  FormGroup,
  Form,
  Breadcrumb,
  BreadcrumbItem,
  CustomInput,
} from "reactstrap";
// import UserContext from "../../context/UserContext";
import axios from "axios";
import { jsPDF } from "jspdf";
import { getEnvironment } from "../../config";
import Swal from "sweetalert2";

const CaseExpanded = (props) => {
  // const { userData } = useContext(UserContext);

  const baseURL = getEnvironment().apiUrl;
  const [handoverTrue, setHandoverTrue] = useState(false);

  const [state, setState] = useState({
    doc: new jsPDF(),
    handover: true,
    valid: "",
    user: "",
    cases: [],
    attachment: [],
    arbitrators: [],
    approved: false,
    color: "orange",
    modal: false,
    id: "",
    claimantName: " ",
    additionalClaimant: " ",
    claimantNationality: " ",
    claimantAddress: " ",
    claimantPOBox: " ",
    claimantPhone: " ",
    claimantFax: " ",
    claimantEmail: " ",
    legalAuthRepresentativeName: " ",
    legalAuthFirmName: " ",
    legalAuthNationality: " ",
    legalAuthAddress: " ",
    legalAuthPOBox: " ",
    legalAuthPhone: " ",
    legalAuthFax: " ",
    legalAuthEmail: " ",
    legalAuthRegistratiom: " ",
    respondentName: " ",
    additionalRespondent: " ",
    respondentNationality: " ",
    respondentAddress: " ",
    respondentPOBox: " ",
    respondentPhone: " ",
    respondentFax: " ",
    respondentEmail: " ",
    natureOfDispute: " ",
    valueOfDispute: " ",
    recitals: " ",
    legalGrounds: " ",
    reliefSought: " ",
    arbitratorName: " ",
    arbitratorNationality: " ",
    arbitratorAddress: " ",
    arbitratorPOBox: " ",
    arbitratorPhone: " ",
    arbitratorFax: " ",
    arbitratorEmail: " ",
    requestIicraArbitrator: " ",
    mandateIicraArbitrator: " ",
    arbitrationLanguage: " ",
    governingLaw: " ",
    proceduralLaw: " ",
    numberOfArbitrators: " ",
    otherRequests: " ",
    acknowledge: " ",
    eSignatureName: " ",
    powerOfAttorney: "",
    disputeDocuments: "",
    arbitrationAgreement: "",
    cvOfArbitrator: "",
    eSignature: "",
    autoPdf: "",
  });

  const [color, setColor] = useState("#008F53");
  const [approved, setApproved] = useState(true);

  useEffect(() => {
    // axios
    //   .get(`${baseURL}/form/approve/${props.location.state}`)
    //   .then((res) => {
    //     if (res.data.approved) {
    //       setState({ ...state, color: "green" });
    //     }
    //     setState({
    //       ...state,
    //       cases: res.data,
    //       arbitrators: res.data.arbitrators,
    //       approved: res.data.approved,
    //       createdAt: res.data.createdAt,
    //       claimantName: res.data.claimantName,
    //       additionalClaimant: res.data.additionalClaimant,
    //       claimantNationality: res.data.claimantNationality,
    //       claimantAddress: res.data.claimantAddress,
    //       claimantPOBox: res.data.claimantPOBox,
    //       claimantPhone: res.data.claimantPhone,
    //       claimantFax: res.data.claimantFax,
    //       claimantEmail: res.data.claimantEmail,
    //       legalAuthRepresentativeName: res.data.legalAuthRepresentativeName,
    //       legalAuthFirmName: res.data.legalAuthFirmName,
    //       legalAuthNationality: res.data.legalAuthNationality,
    //       legalAuthAddress: res.data.legalAuthAddress,
    //       legalAuthPOBox: res.data.legalAuthPOBox,
    //       legalAuthPhone: res.data.legalAuthPhone,
    //       legalAuthFax: res.data.legalAuthFax,
    //       legalAuthEmail: res.data.legalAuthEmail,
    //       legalAuthRegistratiom: res.data.legalAuthRegistratiom,
    //       respondentName: res.data.respondentName,
    //       additionalRespondent: res.data.additionalRespondent,
    //       respondentNationality: res.data.respondentNationality,
    //       respondentAddress: res.data.respondentAddress,
    //       respondentPOBox: res.data.respondentPOBox,
    //       respondentPhone: res.data.respondentPhone,
    //       respondentFax: res.data.respondentFax,
    //       respondentEmail: res.data.respondentEmail,
    //       natureOfDispute: res.data.natureOfDispute,
    //       valueOfDispute: res.data.valueOfDispute,
    //       recitals: res.data.recitals,
    //       legalGrounds: res.data.legalGrounds,
    //       reliefSought: res.data.reliefSought,
    //       arbitratorName: res.data.arbitratorName,
    //       arbitratorNationality: res.data.arbitratorNationality,
    //       arbitratorAddress: res.data.arbitratorAddress,
    //       arbitratorPOBox: res.data.arbitratorPOBox,
    //       arbitratorPhone: res.data.arbitratorPhone,
    //       arbitratorFax: res.data.arbitratorFax,
    //       arbitratorEmail: res.data.arbitratorEmail,
    //       requestIicraArbitrator: res.data.requestIicraArbitrator,
    //       mandateIicraArbitrator: res.data.mandateIicraArbitrator,
    //       arbitrationLanguage: res.data.arbitrationLanguage,
    //       governingLaw: res.data.governingLaw,
    //       proceduralLaw: res.data.proceduralLaw,
    //       numberOfArbitrators: res.data.numberOfArbitrators,
    //       otherRequests: res.data.otherRequests,
    //       eSignatureName: res.data.eSignatureName,
    //       powerOfAttorney: res.data.powerOfAttorney,
    //       disputeDocuments: res.data.disputeDocuments,
    //       arbitrationAgreement: res.data.arbitrationAgreement,
    //       cvOfArbitrator: res.data.cvOfArbitrator,
    //       acknowledge: res.data.acknowledge,
    //       eSignature: res.data.eSignature,
    //       autoPdf: res.data.autoPdf,
    //       attachment: res.data.attachments,
    //     });
    //   })
    //   .catch((err) => console.log(err, "Here"));

    axios
      .get(`${baseURL}/form/approve/${props.location.state._id}`)
      .then((res) => {
        if (res.data) {
          setColor("#008F53");
          setApproved(true);
        } else {
          setColor("orange");
          setApproved(false);
        }
      })
      .catch((err) => console.log(err));

    const currentArbitratorEmail = localStorage.getItem("arbitratorEmail");
    console.log(currentArbitratorEmail, 1);

    props.location.state.arbitrators.map((currentArbitrator) => {
      console.log(currentArbitratorEmail, 2);

      if (currentArbitrator.email == currentArbitratorEmail) {
        if (
          currentArbitrator.handover == undefined ||
          currentArbitrator.handover == false
        ) {
          setHandoverTrue(false); //test
        } else {
          setHandoverTrue(true);
        }
      }
    });
  }, []);

  const role = localStorage.getItem("iicra-token");

  const handleNavigation = (data) => {
    props.history.push({
      pathname: "/cases/timeline",
      state: data,
    });
  };

  const handleFile = (e) => {
    setState({ ...state, signature: e.target.files[0] });
    const token = localStorage.getItem("x-auth-token");
    const formData = new FormData();
    formData.append("role", JSON.parse(role));
    formData.append("signature", state.signature);

    axios
      .post(`${baseURL}/form/signature/${props.location.state._id}`, formData, {
        headers: { "x-auth-token": token },
      })
      .then(() => {
        Swal.fire({
          text: "Signature Uploaded",
          icon: "success",
          timer: "2000",
        });
      });
  };
  const pad = (num) => {
    if (num < 10) {
      return "00" + num;
    } else if (num > 9 && num < 100) {
      return "0" + num;
    } else return num;
  };

  const toggle = () => setState({ ...state, modal: !state.modal });

  const handleChange = (e) =>
    setState({ ...state, [e.target.name]: e.target.value });

  return (
    <>
      <Row>
        <Col>
          <Breadcrumb>
            <BreadcrumbItem
              onClick={() =>
                props.history.push({
                  pathname: "/arbitrator",
                })
              }
              style={styles.crumbTabs}
            >
              Home
            </BreadcrumbItem>
            <BreadcrumbItem style={styles.crumb}>
              Details -{" "}
              {props.location.state.caseNumber
                ? `ARB${props.location.state.createdAt.split("-")[0]}-${pad(
                    props.location.state.caseNumber
                  )}`
                : "CASE/ARB"}
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>

      {handoverTrue ? (
        <Container style={styles.formUserContainer} className="shadow">
          <Modal isOpen={state.modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Modal title</ModalHeader>
            <ModalBody>
              <Row>
                <Form>
                  <FormGroup>
                    <Label for="name">Full Name</Label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      onChange={handleChange}
                      defaultValue={state.name}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="company">Company/Organisation</Label>
                    <Input
                      type="text"
                      name="company"
                      id="company"
                      onChange={handleChange}
                      defaultValue={state.company}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="address">Address</Label>
                    <Input
                      type="text"
                      name="address"
                      id="address"
                      onChange={handleChange}
                      defaultValue={state.address}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="designation">Name</Label>
                    <Input
                      type="text"
                      name="designation"
                      id="designation"
                      onChange={handleChange}
                      defaultValue={state.designation}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="phone">Phone</Label>
                    <Input
                      type="text"
                      name="phone"
                      id="phone"
                      onChange={handleChange}
                      defaultValue={state.phone}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="email">E-mail</Label>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      onChange={handleChange}
                      defaultValue={state.email}
                    />
                  </FormGroup>
                </Form>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button>Do Something</Button> <Button>Cancel</Button>
            </ModalFooter>
          </Modal>
          <Row>
            <Col>
              <Card style={styles.cardBg}>
                <h6
                  className="pr-2"
                  style={{
                    color: "white",
                    textAlign: "right",
                    backgroundColor: color,
                    padding: "1vh",
                    borderRadius: "5px",
                  }}
                >
                  <span style={{ float: "left" }}>
                    {approved ? "Approved" : "Pending"}
                  </span>
                  Case Information
                </h6>

                <CardBody>
                  <Table bordered hover>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">
                          {document.dir == "ltr" ? "Signature" : "التوقيع"}
                        </th>
                        <td>
                          <Row>
                            <Col xl={12} lg={12} md={12} sm={12}>
                              <FormGroup>
                                <CustomInput
                                  id="eSignature"
                                  name="eSignature"
                                  style={{
                                    overflow: "hidden",
                                    backgroundColor: "white",
                                    border: "none",
                                  }}
                                  type="file"
                                  accept="image/jpeg, image/jpg, image/png, image/gif"
                                  label={
                                    document.dir == "ltr"
                                      ? "Upload a File"
                                      : "تحميل الملف"
                                  }
                                  type="file"
                                  onChange={handleFile}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Case Number</th>
                        <td>
                          ARB{props.location.state.createdAt.split("-")[0]}-
                          {pad(props.location.state.caseNumber)}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Submission Date</th>
                        <td>{props.location.state.createdAt.split("T")[0]}</td>
                      </tr>
                      <tr>
                        <th scope="row">Dispute Title</th>
                        <td>{props.location.state.natureOfDispute}</td>
                      </tr>
                      <tr>
                        <th scope="row">Dispute Value</th>
                        <td>{props.location.state.valueOfDispute}</td>
                      </tr>
                      <tr>
                        <th scope="row">Registration Fee</th>
                        <td>FEE</td>
                      </tr>
                      <tr>
                        <th scope="row">Action</th>
                        <td
                          onClick={() => handleNavigation(props.location.state)}
                          style={{ cursor: "pointer", color: "green" }}
                        >
                          <button className="btn btn-success">
                            Timeline Report (Click)
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Arbitration Fee</th>
                        <td>FEE</td>
                      </tr>
                      <tr>
                        <th scope="row">Closing Date</th>
                        <td></td>
                      </tr>
                      <tr>
                        <th scope="row">Name of the Claimant</th>
                        <td>{props.location.state.claimantName}</td>
                      </tr>
                      <tr>
                        <th scope="row">Company</th>
                        <td></td>
                      </tr>
                      <tr>
                        <th scope="row">Mobile/ Telephone No.</th>
                        <td>{props.location.state.claimantPhone}</td>
                      </tr>
                      <tr>
                        <th scope="row">Fax No.</th>
                        <td>{props.location.state.claimantFax}</td>
                      </tr>
                      <tr>
                        <th scope="row">Email</th>
                        <td>{props.location.state.claimantEmail}</td>
                      </tr>
                      <tr>
                        <th scope="row">Address</th>
                        <td>{props.location.state.claimantAddress}</td>
                      </tr>
                      <tr>
                        <th scope="row">Claimant's Legal Representative</th>
                        <td>
                          {props.location.state.legalAuthRepresentativeName}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Company</th>
                        <td>{props.location.state.legalAuthFirmName}</td>
                      </tr>
                      <tr>
                        <th scope="row">Mobile/ Telephone No.:</th>
                        <td>{props.location.state.legalAuthPhone}</td>
                      </tr>
                      <tr>
                        <th scope="row">Fax</th>
                        <td>{props.location.state.legalAuthFax}</td>
                      </tr>
                      <tr>
                        <th scope="row">Email</th>
                        <td>{props.location.state.legalAuthEmail}</td>
                      </tr>
                      <tr>
                        <th scope="row">Address</th>
                        <td>{props.location.state.legalAuthAddress}</td>
                      </tr>
                      <tr>
                        <th scope="row">Name of the Respondent</th>
                        <td>{props.location.state.respondentName}</td>
                      </tr>
                      <tr>
                        <th scope="row">Company</th>
                        <td></td>
                      </tr>
                      <tr>
                        <th scope="row">Mobile/ Telephone No.</th>
                        <td>{props.location.state.respondentPhone}</td>
                      </tr>
                      <tr>
                        <th scope="row">Fax</th>
                        <td>{props.location.state.respondentFax}</td>
                      </tr>
                      <tr>
                        <th scope="row">Email</th>
                        <td>{props.location.state.respondentEmail}</td>
                      </tr>
                      <tr>
                        <th scope="row">Address</th>
                        <td>{props.location.state.respondentAddress}</td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      ) : (
        <Row style={{ textAlign: "center", marginTop: "10vh" }}>
          <Col></Col>
          <Col>
            <h2
              onClick={() =>
                props.history.push({
                  pathname: "/email/transmission/transferMinutes",
                  state: props.location.state,
                })
              }
              style={{
                color: "blue",
                cursor: "pointer",
                backgroundColor: "white",
                borderRadius: "5px",
                border: "1px solid green",
              }}
            >
              Proceed to Handover
            </h2>
          </Col>
          <Col></Col>
        </Row>
      )}
    </>
  );
};

const styles = {
  center: {
    color: "white",
    textAlign: "center",
    backgroundColor: "#008f53",
    paddingTop: "1vh",
    paddingBottom: "1vh",
  },
  formUserContainer: {
    marginTop: "5vh",
    paddingTop: "5vh",
    paddingBottom: "3vh",
    backgroundColor: "#f6f6f6",
    minHeight: "100vh",
  },
  cardBg: {
    backgroundColor: "#f6f6f6",
  },
  crumb: { color: "green", cursor: "not-allowed" },
  crumbTabs: {
    cursor: "pointer",
  },
};
export default CaseExpanded;
