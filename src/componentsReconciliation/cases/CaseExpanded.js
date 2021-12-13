import React, { useState, useEffect } from "react";
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
} from "reactstrap";
import axios from "axios";
import { jsPDF } from "jspdf";
import Swal from "sweetalert2";
import { getEnvironment } from "../../config";
// import UserContext from "../../context/UserContext";
// import Notification from "../form/Notification";

const CaseExpanded = (props) => {
  const baseURL = getEnvironment().apiUrl;

  // const { userData } = useContext(UserContext);

  const [state, setState] = useState({
    doc: new jsPDF(),
    valid: "",
    user: "",
    cases: [],
    attachment: [],
    timeline: [],
    approved: false,
    modal: false,
    modal1: false,
    modal2: false,
    modal3: false,
    modal4: false,
    id: "",
    claimantName: "",
    additionalClaimant: "",
    claimantNationality: "",
    claimantAddress: "",
    claimantPOBox: "",
    claimantPhone: "",
    claimantFax: "",
    claimantEmail: "",
    legalAuthRepresentativeName: "",
    legalAuthFirmName: "",
    legalAuthNationality: "",
    legalAuthAddress: "",
    legalAuthPOBox: "",
    legalAuthPhone: "",
    legalAuthFax: "",
    legalAuthEmail: "",
    legalAuthRegistratiom: "",
    respondentName: "",
    additionalRespondent: "",
    respondentNationality: "",
    respondentAddress: "",
    respondentPOBox: "",
    respondentPhone: "",
    respondentFax: "",
    respondentEmail: "",
    natureOfDispute: "",
    valueOfDispute: "",
    recitals: "",
    legalGrounds: "",
    reliefSought: "",
    arbitratorName: "",
    arbitratorNationality: "",
    arbitratorAddress: "",
    arbitratorPOBox: "",
    arbitratorPhone: "",
    arbitratorFax: "",
    arbitratorEmail: "",
    requestIicraArbitrator: "",
    mandateIicraArbitrator: "",
    arbitrationLanguage: "",
    governingLaw: "",
    proceduralLaw: "",
    numberOfArbitrators: "",
    otherRequests: "",
    acknowledge: "",
    eSignatureName: "",
    powerOfAttorney: "",
    disputeDocuments: "",
    arbitrationAgreement: "",
    cvOfArbitrator: "",
    eSignature: "",
    autoPdf: "",
    step: "",
    //
  });

  const [color, setColor] = useState("#008F53");
  const [approved, setApproved] = useState(true);
  const [witness, setWitness] = useState({
    name: "",
    address: "",
    phone: "",
    company: "",
    designation: "",
    email: "",
    password: "",
    nationality: "",
    pOBox: "",
    fax: "",
  });

  useEffect(() => {
    axios
      .get(`${baseURL}/formReconciliation/approve/${props.location.state._id}`)
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

    axios
      .get(`${baseURL}/notify/notification/${props.location.state._id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  const role = localStorage.getItem("iicra-token");

  const handleNavigation = (data) => {
    props.history.push({
      pathname: "/cases_/timeline_",
      state: data,
    });
  };

  const handleApprove = () => {
    const data = new FormData();
    data.append("approved", true);
    axios
      .post(
        `${baseURL}/formReconciliation/approve/${props.location.state._id}`,
        data
      )
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          title: res.data,
          icon: "success",
        });
      })
      .then(() =>
        props.history.push({
          pathname: "/cases_/expanded_",
          state: props.location.state,
        })
      )
      .catch((err) => {
        Swal.fire({
          title: err,
          icon: "warning",
        });
      });
  };

  const toggle2 = () => setState({ ...state, modal2: !state.modal2 });

  const handleChange = (e) => {
    setWitness({ ...witness, [e.target.name]: e.target.value });
  };

  const handleInterpretor = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("claimantEmail", props.location.state.claimantEmail);
    form.append("name", witness.name);
    form.append("address", witness.address);
    form.append("phone", witness.phone);
    form.append("company", witness.company);
    form.append("designation", witness.designation);
    form.append("email", witness.email);
    form.append("password", witness.password);
    axios
      .post(`${baseURL}/formReconciliation/interpretor`, form)
      .then((res) => {
        if (res.data.success) {
          Swal.fire({
            title: res.data.success,
            icon: "success",
          });
        } else if (res.data.fail) {
          Swal.fire({
            title: res.data.fail,
            icon: "warning",
          });
        } else {
          Swal.fire({
            title: res.data,
            icon: "error",
          });
        }
      })
      .catch((err) =>
        Swal.fire({
          title: err,
          icon: "error",
        })
      );
  };

  const pad = (num) => {
    if (num < 10) {
      return "00" + num;
    } else if (num > 9 && num < 100) {
      return "0" + num;
    } else return num;
  };

  return (
    <>
      <Container fluid style={styles.crumbContainer}>
        <Row>
          <Col>
            {JSON.parse(role) == "admin" ? (
              <Breadcrumb>
                <BreadcrumbItem
                  onClick={() =>
                    props.history.push({
                      pathname: "/dashboard",
                    })
                  }
                  style={styles.crumbTabs}
                >
                  Dashboard
                </BreadcrumbItem>
                <BreadcrumbItem
                  onClick={() =>
                    props.history.push({
                      pathname: "/cases_",
                    })
                  }
                  style={styles.crumbTabs}
                >
                  Cases
                </BreadcrumbItem>
                <BreadcrumbItem style={styles.crumb}>
                  Details -{" "}
                  {props.location.state.caseNumber
                    ? `REC${props.location.state.createdAt.split("-")[0]}-${pad(
                        props.location.state.caseNumber
                      )}`
                    : "CASE/REC"}
                </BreadcrumbItem>
              </Breadcrumb>
            ) : null}
            {JSON.parse(role) == "first" ||
            JSON.parse(role) == "second" ||
            JSON.parse(role) == "concil" ||
            JSON.parse(role) == "interpretor" ? (
              <Breadcrumb>
                <BreadcrumbItem
                  onClick={() =>
                    props.history.push({
                      pathname: `/${role.split(`"`)[1]}`,
                    })
                  }
                  style={styles.crumbTabs}
                >
                  Cases
                </BreadcrumbItem>
                <BreadcrumbItem style={styles.crumb}>
                  Details -{" "}
                  {props.location.state.caseNumberRec
                    ? `REC${props.location.state.createdAt.split("-")[0]}-${pad(
                        props.location.state.caseNumberRec
                      )}`
                    : "CASE/REC"}
                </BreadcrumbItem>
              </Breadcrumb>
            ) : null}
          </Col>
        </Row>
      </Container>
      <Container style={styles.formUserContainer} className="shadow">
        <Modal isOpen={state.modal2} toggle={toggle2}>
          <ModalHeader
            toggle={toggle2}
            style={{ color: "#008F53", fontWeight: "bolder" }}
          >
            Add an Interpretor
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col>
                <Form>
                  <FormGroup>
                    <Label for="name">Full Name</Label>
                    <Input
                      bsSize="sm"
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
                      bsSize="sm"
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
                      bsSize="sm"
                      type="text"
                      name="address"
                      id="address"
                      onChange={handleChange}
                      defaultValue={state.address}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="designation">Designation</Label>
                    <Input
                      bsSize="sm"
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
                      bsSize="sm"
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
                      bsSize="sm"
                      type="email"
                      name="email"
                      id="email"
                      onChange={handleChange}
                      defaultValue={state.email}
                    />
                  </FormGroup>
                </Form>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button className="btn btn-success" onClick={handleInterpretor}>
              Submit
            </Button>
            <Button className="btn btn-danger" onClick={toggle2}>
              Cancel
            </Button>
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
                Case Information{" "}
                {JSON.parse(role) == "admin" ? (
                  approved ? null : (
                    <span>
                      <b>
                        <a
                          className="ml-1"
                          onClick={handleApprove}
                          style={{ cursor: "pointer" }}
                        >
                          Approve
                        </a>
                      </b>
                    </span>
                  )
                ) : null}
              </h6>
              <CardBody>
                {JSON.parse(role) == "admin" ? (
                  <Table>
                    <thead>
                      <tr
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <td>
                          <Button
                            style={{ fontSize: "12px" }}
                            onClick={() => toggle2()}
                            className="btn btn-warning"
                          >
                            Add Interpreter
                          </Button>
                        </td>
                      </tr>
                    </thead>
                  </Table>
                ) : null}
                <Table bordered hover>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Case Number</th>
                      <td>
                        {props.location.state.caseNumberRec
                          ? `REC${
                              props.location.state.createdAt.split("-")[0]
                            }-${pad(props.location.state.caseNumberRec)}`
                          : "CASE/REC"}
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
    </>
  );
};

const styles = {
  center: {
    color: "white",
    textAlign: "right",
    backgroundColor: "#008f53",
    padding: "1vh",
    borderRadius: "5px",
    cursor: "not-allowed",
  },
  formUserContainer: {
    marginTop: "10vh",
    paddingTop: "5vh",
    paddingBottom: "3vh",
    backgroundColor: "#f6f6f6",
    minHeight: "100vh",
  },
  cardBg: {
    backgroundColor: "#f6f6f6",
  },
  crumbContainer: {
    width: "100vw",
    position: "fixed",
    top: "8vh",
    paddingLeft: "0px",
    paddingRight: "0px",
    zIndex: 9,
  },
  crumb: { color: "green", cursor: "not-allowed" },
  crumbTabs: {
    cursor: "pointer",
  },
};
export default CaseExpanded;
