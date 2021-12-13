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
// import Notification from "../form/Notification";
import axios from "axios";
import { jsPDF } from "jspdf";
import Swal from "sweetalert2";
import { getEnvironment } from "../../config";
import UserContext from "../../context/UserContext";
import pad from "../../pad";
import countriesArray from "../../countriesArray";
import countriesArray_ from "../../countriesArray_";

const CaseExpanded = (props) => {
  // const { userData } = useContext(UserContext);
  const baseURL = getEnvironment().apiUrl;
  const { userData } = useContext(UserContext);
  const [state, setState] = useState({
    doc: new jsPDF(),
    signature: "",
    valid: "",
    user: "",
    cases: [],
    attachment: [],
    timeline: [],
    approved: false,
    modal: false,
  });

  const [color, setColor] = useState("#008F53");
  const [approved, setApproved] = useState(true);
  const [selected, setSelected] = useState("");
  const [person, setPerson] = useState({
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

  const handleFile = (e) => {
    setState({ ...state, signature: e.target.files[0] });
    const token = localStorage.getItem("x-auth-token");
    const formData = new FormData();
    formData.append("role", JSON.parse(role));
    formData.append("signature", state.signature);
    console.log(state.signature);
    console.log(e.target.files);

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
      })
      .catch((err) => {
        Swal.fire({
          text: "Seomething went Wrong",
          icon: "error",
          timer: "4000",
        });
        console.log(err);
      });
  };

  useEffect(() => {
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

    axios
      .get(`${baseURL}/notify/notification/${props.location.state._id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  const role = localStorage.getItem("iicra-token");

  const handleNavigation = (data) => {
    props.history.push({
      pathname: "/cases/timeline",
      state: data,
    });
  };

  const handleApprove = () => {
    const data = new FormData();
    data.append("approved", true);
    axios
      .post(`${baseURL}/form/approve/${props.location.state._id}`, data)
      .then((res) => {
        Swal.fire({
          title: res.data,
          icon: "success",
        });
      })
      .then(() =>
        props.history.push({
          pathname: "/cases/expanded",
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

  const toggle = () => setState({ ...state, modal: !state.modal });

  const handleChange = (e) => {
    setPerson({ ...person, [e.target.name]: e.target.value });
  };

  const handlePerson = (e) => {
    e.preventDefault();
    if (!person.name) {
      Swal.fire({ text: "Name is required!", icon: "warning" });
    } else if (!person.nationality) {
      Swal.fire({ text: "Nationality is required!", icon: "warning" });
    } else if (!person.phone) {
      Swal.fire({ text: "Phone Number is required!", icon: "warning" });
    } else if (!person.email) {
      Swal.fire({ text: "Email Address is required!", icon: "warning" });
    } else if (!person.address) {
      Swal.fire({ text: "Address is required!", icon: "warning" });
    } else {
      const form = new FormData();

      form.append("id", props.location.state._id);
      form.append("name", person.name);
      form.append("address", person.address);
      form.append("phone", person.phone);
      form.append("company", person.company);
      form.append("designation", person.designation);
      form.append("email", person.email);
      form.append("password", "qwert54321");
      form.append("nationality", person.nationality);
      form.append("pOBox", person.pOBox);
      form.append("fax", person.fax);
      form.append("selected", selected);
      alert(selected);

      axios
        .post(`${baseURL}/form/addPersonToCase`, form)
        .then((res) => {
          if (res.data) {
            Swal.fire({
              title: res.data,
              icon: "sucess",
            });
          } else {
            Swal.fire({
              title: res.data,
              icon: "error",
            });
          }
        })
        .catch((err) => {
          Swal.fire({
            title: err,
            icon: "error",
          });
        });
    }
  };

  // axios.post(`${baseURL}/form/rapporteur`, form)
  // axios.post(`${baseURL}/form/witness`, form)
  // axios.post(`${baseURL}/form/interpretor`, form)
  // axios.post(`${baseURL}/form/expert`, form)

  return (
    <>
      <Container
        fluid
        style={styles.crumbContainer}
        className={document.dir == "ltr" ? "text-left" : "text-right"}
      >
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
                  {document.dir == "ltr" ? "Dashboard" : " لوحة القيادة"}
                </BreadcrumbItem>
                <BreadcrumbItem
                  onClick={() =>
                    props.history.push({
                      pathname: "/cases",
                    })
                  }
                  style={styles.crumbTabs}
                >
                  {document.dir == "ltr" ? "Cases" : " حالات"}
                </BreadcrumbItem>
                <BreadcrumbItem style={styles.crumb}>
                  {document.dir == "ltr" ? "Details" : " تفاصيل"}- ARB
                  {props.location.state.createdAt.split("-")[0]}-
                  {pad(props.location.state.caseNumber)}
                </BreadcrumbItem>
              </Breadcrumb>
            ) : null}
            {JSON.parse(role) == "claimant" ||
            JSON.parse(role) == "respondent" ||
            JSON.parse(role) == "arbitrator" ||
            JSON.parse(role) == "rapporteur" ||
            JSON.parse(role) == "expert" ||
            JSON.parse(role) == "witness" ? (
              <Breadcrumb>
                <BreadcrumbItem
                  onClick={() =>
                    props.history.push({
                      pathname: `/${role.split(`"`)[1]}`,
                    })
                  }
                  style={styles.crumbTabs}
                >
                  {document.dir == "ltr" ? "Cases" : " حالات"}
                </BreadcrumbItem>
                <BreadcrumbItem style={styles.crumb}>
                  {document.dir == "ltr" ? "Details" : " تفاصيل"} - ARB
                  {props.location.state.createdAt.split("-")[0]}-
                  {pad(props.location.state.caseNumber)}
                </BreadcrumbItem>
              </Breadcrumb>
            ) : null}
          </Col>
        </Row>
      </Container>
      <Container style={styles.formUserContainer} className="shadow">
        <Modal isOpen={state.modal} toggle={toggle}>
          <ModalHeader
            toggle={toggle}
            style={{ color: "#008F53", fontWeight: "bolder" }}
          >
            {document.dir == "ltr"
              ? `Add Person to Case`
              : "إضافة شخص إلى قضية التحكيم"}
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col>
                <Form>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label for="name">
                          {document.dir == "ltr"
                            ? "Full Name"
                            : "الاسم بالكامل"}
                        </Label>
                        <Input
                          bsSize="sm"
                          type="text"
                          name="name"
                          id="name"
                          onChange={handleChange}
                          defaultValue={person.name}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label for="name">
                          {document.dir == "ltr" ? "Nationality" : "جنسية"}
                        </Label>
                        {/* <Input
                          bsSize="sm"
                          type="text"
                          name="nationality"
                          id="nationality"
                          onChange={handleChange}
                          defaultValue={person.nationality}
                        /> */}

                        <Input
                          name="nationality"
                          id="nationality"
                          type="text"
                          list="data1"
                          value={person.nationality}
                          onChange={handleChange}
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
                  </Row>

                  <Row>
                    <Col>
                      <FormGroup>
                        <Label for="company">
                          {document.dir == "ltr"
                            ? "Company/Organisation"
                            : "منظمة"}
                        </Label>
                        <Input
                          bsSize="sm"
                          type="text"
                          name="company"
                          id="company"
                          onChange={handleChange}
                          defaultValue={person.company}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label for="email">
                          {document.dir == "ltr" ? "P O Box" : "صندوق البريد"}
                        </Label>
                        <Input
                          bsSize="sm"
                          type="text"
                          name="pOBox"
                          id="pOBox"
                          onChange={handleChange}
                          defaultValue={person.pOBox}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <FormGroup>
                        <Label for="designation">
                          {document.dir == "ltr" ? "Designation" : "تعيين"}
                        </Label>
                        <Input
                          bsSize="sm"
                          type="text"
                          name="designation"
                          id="designation"
                          onChange={handleChange}
                          defaultValue={person.designation}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label for="phone">
                          {document.dir == "ltr" ? "Phone" : "هاتف"}
                        </Label>
                        <Input
                          bsSize="sm"
                          type="text"
                          name="phone"
                          id="phone"
                          onChange={handleChange}
                          defaultValue={person.phone}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label for="email">
                          {document.dir == "ltr"
                            ? "E-mail"
                            : "البريد الإلكتروني"}
                        </Label>
                        <Input
                          bsSize="sm"
                          type="email"
                          name="email"
                          id="email"
                          onChange={handleChange}
                          defaultValue={person.email}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label for="email">
                          {document.dir == "ltr" ? "Fax" : "فاكس"}
                        </Label>
                        <Input
                          bsSize="sm"
                          type="text"
                          name="fax"
                          id="fax"
                          onChange={handleChange}
                          defaultValue={person.fax}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <FormGroup>
                    <Label for="address">
                      {document.dir == "ltr" ? "Address" : "عنوان"}
                    </Label>
                    <Input
                      bsSize="sm"
                      type="text"
                      name="address"
                      id="address"
                      onChange={handleChange}
                      defaultValue={person.address}
                    />
                  </FormGroup>
                </Form>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button className="btn btn-success" onClick={handlePerson}>
              {document.dir == "ltr" ? "Submit" : "إرسال"}
            </Button>
            <Button className="btn btn-danger" onClick={toggle}>
              {document.dir == "ltr" ? "Cancel" : "يلغي"}
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
                {document.dir == "ltr" ? "Case Information" : "معلومات الحالة"}{" "}
                {JSON.parse(role) == "admin" ? (
                  approved ? null : (
                    <span>
                      <b>
                        <a
                          className="ml-1"
                          onClick={handleApprove}
                          style={{ cursor: "pointer" }}
                        >
                          {document.dir == "ltr" ? "Approve" : "يوافق"}
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
                      <tr>
                        <Row>
                          <Col className="text-center pb-1">
                            <Button
                              style={{
                                fontSize: "12px",
                                backgroundColor: "#AD8D61",
                              }}
                              onClick={() => {
                                setSelected("witness");
                                toggle();
                              }}
                            >
                              {document.dir == "ltr" ? "Witness" : "أضف شاهد"}
                            </Button>
                          </Col>
                          <Col className="text-center pb-1">
                            <Button
                              style={{
                                fontSize: "12px",
                                backgroundColor: "#AD8D61",
                              }}
                              onClick={() => {
                                setSelected("expert");
                                toggle();
                              }}
                            >
                              {document.dir == "ltr" ? "Expert" : "إضافة خبير"}
                            </Button>
                          </Col>
                          <Col className="text-center pb-1">
                            <Button
                              style={{
                                fontSize: "12px",
                                backgroundColor: "#AD8D61",
                              }}
                              onClick={() => {
                                setSelected("interpretor");
                                toggle();
                              }}
                            >
                              {document.dir == "ltr"
                                ? "Interpreter"
                                : "إضافة مترجم"}
                            </Button>
                          </Col>
                          <Col className="text-center pb-1">
                            <Button
                              style={{
                                fontSize: "12px",
                                backgroundColor: "#AD8D61",
                              }}
                              onClick={() => {
                                setSelected("arbitrator");
                                toggle();
                              }}
                            >
                              {document.dir == "ltr"
                                ? "Arbitrator"
                                : "اضافة محكم"}
                            </Button>
                          </Col>
                          <Col className="text-center pb-1">
                            <Button
                              style={{
                                fontSize: "12px",
                                backgroundColor: "#AD8D61",
                              }}
                              onClick={() => {
                                setSelected("rapporteur");
                                toggle();
                              }}
                            >
                              {document.dir == "ltr"
                                ? "Rapporteur"
                                : "إضافة مقرر"}
                            </Button>
                          </Col>
                        </Row>
                      </tr>
                    </thead>
                  </Table>
                ) : null}
                <Row>
                  <Col>
                    {JSON.parse(role) == "respondent" &&
                    !props.location.state.respondentResponse ? (
                      <Button
                        className="mb-2"
                        color="primary"
                        onClick={() => {
                          props.history.push({
                            pathname: "/respondent/reviewDetails",
                            state: props.location.state,
                          });
                        }}
                      >
                        {document.dir == "ltr"
                          ? "Confirm Details"
                          : "تأكيد التفاصيل"}
                      </Button>
                    ) : null}
                  </Col>
                </Row>
                <Table bordered hover>
                  <thead>
                    <tr>
                      <th>{document.dir == "ltr" ? "Title" : "لقب"}</th>
                      <th>{document.dir == "ltr" ? "Details" : "تفاصيل"}</th>
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
                    {/* <tr>
                      <td>
                        <img
                          src={`${baseURL}/${props.location.state.claimantSign}`}
                        />
                      </td>
                    </tr> */}
                    <tr>
                      <th scope="row">
                        {document.dir == "ltr" ? "Case Number" : "رقم القضية"}
                      </th>
                      <td>
                        ARB{props.location.state.createdAt.split("-")[0]}-
                        {pad(props.location.state.caseNumber)}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        {document.dir == "ltr"
                          ? "Submission Date"
                          : "تاريخ التقديم"}
                      </th>
                      <td>{props.location.state.createdAt.split("T")[0]}</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        {document.dir == "ltr"
                          ? "Dispute Title"
                          : "عنوان النزاع"}
                      </th>
                      <td>{props.location.state.natureOfDispute}</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        {document.dir == "ltr"
                          ? "Dispute Value"
                          : "قيمة النزاع"}
                      </th>
                      <td>{props.location.state.valueOfDispute}</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        {document.dir == "ltr"
                          ? " Registration Fee"
                          : "رسوم التسجيل"}
                      </th>
                      <td>FEE</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        {document.dir == "ltr" ? "Action" : "عمل"}
                      </th>
                      <td
                        onClick={() => handleNavigation(props.location.state)}
                        style={{ cursor: "pointer", color: "green" }}
                      >
                        <button className="btn btn-success">
                          {document.dir == "ltr"
                            ? "Timeline Report (Click)"
                            : "تقرير الجدول الزمني"}
                        </button>
                      </td>
                    </tr>
                    {/* <tr>
                      <th scope="row">
                        {document.dir == "ltr"
                          ? "Arbitration Fee"
                          : "رسوم التحكيم"}
                      </th>
                      <td>FEE</td>
                    </tr> */}
                    <tr>
                      <th scope="row">
                        {document.dir == "ltr"
                          ? "Closing Date"
                          : "الموعد النهائي"}
                      </th>
                      <td></td>
                    </tr>
                    <tr>
                      <th scope="row">
                        {document.dir == "ltr"
                          ? "Name of the Claimant"
                          : "اسم المدعي"}
                      </th>
                      <td>{props.location.state.claimantName}</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        {document.dir == "ltr" ? "Company" : "شركة"}
                      </th>
                      <td></td>
                    </tr>
                    <tr>
                      <th scope="row">
                        {document.dir == "ltr"
                          ? "Mobile/ Telephone No."
                          : "رقم هاتف"}
                      </th>
                      <td>{props.location.state.claimantPhone}</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        {document.dir == "ltr" ? "Fax No." : "فاكس"}
                      </th>
                      <td>{props.location.state.claimantFax}</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        {document.dir == "ltr" ? "Email" : "بريد إلكتروني"}
                      </th>
                      <td>{props.location.state.claimantEmail}</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        {document.dir == "ltr" ? "Address" : "عنوان"}
                      </th>
                      <td>{props.location.state.claimantAddress}</td>
                    </tr>
                    {props.location.state.legalAuthEmail && (
                      <>
                        <tr>
                          <th scope="row">
                            {document.dir == "ltr"
                              ? "Claimant's Legal Representative"
                              : "الممثل القانوني للمدعي"}
                          </th>
                          <td>
                            {props.location.state.legalAuthRepresentativeName}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            {document.dir == "ltr" ? "Company" : "شركة"}
                          </th>
                          <td>{props.location.state.legalAuthFirmName}</td>
                        </tr>
                        <tr>
                          <th scope="row">
                            {document.dir == "ltr"
                              ? "Mobile/ Telephone No."
                              : "رقم هاتف"}
                          </th>
                          <td>{props.location.state.legalAuthPhone}</td>
                        </tr>
                        <tr>
                          <th scope="row">
                            {document.dir == "ltr" ? "Fax No." : "فاكس"}
                          </th>
                          <td>{props.location.state.legalAuthFax}</td>
                        </tr>
                        <tr>
                          <th scope="row">
                            {document.dir == "ltr" ? "Email" : "بريد إلكتروني"}
                          </th>
                          <td>{props.location.state.legalAuthEmail}</td>
                        </tr>
                        <tr>
                          <th scope="row">
                            {document.dir == "ltr" ? "Address" : "عنوان"}
                          </th>
                          <td>{props.location.state.legalAuthAddress}</td>
                        </tr>
                      </>
                    )}
                    {props.location.state.claimantEmail2 && (
                      <>
                        <tr>
                          <th scope="row">
                            {document.dir == "ltr"
                              ? "Name of the Claimant"
                              : "اسم المدعي"}
                          </th>
                          <td>{props.location.state.claimantName2}</td>
                        </tr>
                        <tr>
                          <th scope="row">
                            {document.dir == "ltr" ? "Company" : "شركة"}
                          </th>
                          <td></td>
                        </tr>
                        <tr>
                          <th scope="row">
                            {document.dir == "ltr"
                              ? "Mobile/ Telephone No."
                              : "رقم هاتف"}
                          </th>
                          <td>{props.location.state.claimantPhone2}</td>
                        </tr>
                        <tr>
                          <th scope="row">
                            {document.dir == "ltr" ? "Fax No." : "فاكس"}
                          </th>
                          <td>{props.location.state.claimantFax2}</td>
                        </tr>
                        <tr>
                          <th scope="row">
                            {document.dir == "ltr" ? "Email" : "بريد إلكتروني"}
                          </th>
                          <td>{props.location.state.claimantEmail2}</td>
                        </tr>
                        <tr>
                          <th scope="row">
                            {document.dir == "ltr" ? "Address" : "عنوان"}
                          </th>
                          <td>{props.location.state.claimantAddress2}</td>
                        </tr>

                        {props.location.state.legalAuthEmail2 && (
                          <>
                            <tr>
                              <th scope="row">
                                {document.dir == "ltr"
                                  ? "Claimant's Legal Representative"
                                  : "الممثل القانوني للمدعي"}
                              </th>
                              <td>
                                {
                                  props.location.state
                                    .legalAuthRepresentativeName2
                                }
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">
                                {document.dir == "ltr" ? "Company" : "شركة"}
                              </th>
                              <td>{props.location.state.legalAuthFirmName2}</td>
                            </tr>
                            <tr>
                              <th scope="row">
                                {document.dir == "ltr"
                                  ? "Mobile/ Telephone No."
                                  : "رقم هاتف"}
                              </th>
                              <td>{props.location.state.legalAuthPhone2}</td>
                            </tr>
                            <tr>
                              <th scope="row">
                                {document.dir == "ltr" ? "Fax No." : "فاكس"}
                              </th>
                              <td>{props.location.state.legalAuthFax2}</td>
                            </tr>
                            <tr>
                              <th scope="row">
                                {document.dir == "ltr"
                                  ? "Email"
                                  : "بريد إلكتروني"}
                              </th>
                              <td>{props.location.state.legalAuthEmail2}</td>
                            </tr>
                            <tr>
                              <th scope="row">
                                {document.dir == "ltr" ? "Address" : "عنوان"}
                              </th>
                              <td>{props.location.state.legalAuthAddress2}</td>
                            </tr>
                          </>
                        )}
                      </>
                    )}
                    <tr>
                      <th scope="row">
                        {document.dir == "ltr"
                          ? "Name of the Respondent"
                          : "المحتكم ضده"}
                      </th>
                      <td>{props.location.state.respondentName}</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        {document.dir == "ltr" ? "Company" : "منظمة"}
                      </th>
                      <td></td>
                    </tr>
                    <tr>
                      <th scope="row">
                        {document.dir == "ltr"
                          ? "Mobile/ Telephone No."
                          : "رقم الهاتف"}
                      </th>
                      <td>{props.location.state.respondentPhone}</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        {document.dir == "ltr" ? "Fax" : "فاكس"}
                      </th>
                      <td>{props.location.state.respondentFax}</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        {document.dir == "ltr" ? "Email" : "بريد إلكتروني"}
                      </th>
                      <td>{props.location.state.respondentEmail}</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        {document.dir == "ltr" ? "Address" : "عنوان"}
                      </th>
                      <td>{props.location.state.respondentAddress}</td>
                    </tr>
                    {props.location.state.respondentEmail2 && (
                      <>
                        <tr>
                          <th scope="row">
                            {document.dir == "ltr"
                              ? "Name of the Respondent"
                              : "المحتكم ضده"}
                          </th>
                          <td>{props.location.state.respondentName2}</td>
                        </tr>
                        <tr>
                          <th scope="row">
                            {document.dir == "ltr" ? "Company" : "منظمة"}
                          </th>
                          <td></td>
                        </tr>
                        <tr>
                          <th scope="row">
                            {document.dir == "ltr"
                              ? "Mobile/ Telephone No."
                              : "رقم الهاتف"}
                          </th>
                          <td>{props.location.state.respondentPhone2}</td>
                        </tr>
                        <tr>
                          <th scope="row">
                            {document.dir == "ltr" ? "Fax" : "فاكس"}
                          </th>
                          <td>{props.location.state.respondentFax2}</td>
                        </tr>
                        <tr>
                          <th scope="row">
                            {document.dir == "ltr" ? "Email" : "بريد إلكتروني"}
                          </th>
                          <td>{props.location.state.respondentEmail2}</td>
                        </tr>
                        <tr>
                          <th scope="row">
                            {document.dir == "ltr" ? "Address" : "عنوان"}
                          </th>
                          <td>{props.location.state.respondentAddress2}</td>
                        </tr>
                      </>
                    )}
                    {props.location.state.arbitrators.length > 0 &&
                      // props.location.state.arbitrators.length
                      props.location.state.arbitrators.map((arb) => {
                        return (
                          <>
                            <tr>
                              <th scope="row">
                                {document.dir == "ltr"
                                  ? "Name of the Arbitrator"
                                  : "Name of the Arbitrator"}
                              </th>
                              <td>{arb.name}</td>
                            </tr>
                            <tr>
                              <th scope="row">
                                {document.dir == "ltr"
                                  ? "Nationality"
                                  : "Nationality"}
                              </th>
                              <td>{arb.nationality}</td>
                            </tr>
                            <tr>
                              <th scope="row">
                                {document.dir == "ltr" ? "Address" : "Address"}
                              </th>
                              <td>{arb.address}</td>
                            </tr>
                            <tr>
                              <th scope="row">
                                {document.dir == "ltr"
                                  ? "Mobile/ Telephone No."
                                  : "Mobile/ Telephone No."}
                              </th>
                              <td>{arb.phone}</td>
                            </tr>
                            <tr>
                              <th scope="row">
                                {document.dir == "ltr" ? "Email" : "Email"}
                              </th>
                              <td>{arb.email}</td>
                            </tr>
                          </>
                        );
                      })}
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
