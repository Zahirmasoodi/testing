import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Table,
  Card,
  CardBody,
  Button,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
// import CKEditor from "react-ckeditor-component";

import jsPDF from "jspdf";
import logo from "../../assets/logo.png";

const Minutes = (props) => {
  const [state, setState] = useState({
    placeOfMeeting: "Dubai",
    orderFile: "",
    //
    typeOfOrder: "",
    order: "",
    recipient: "",
    //
    typeOfOrder1: "",
    order1: "",
    recipient1: "",
    //
    typeOfOrder2: "",
    order2: "",
    recipient2: "",
    //
    chairmanAttendance: "",
    arbitratorAttendance: "",
    arbitratorAttendance1: "",
    arbitratorAttendance2: "",
    rapporteurAttendance: "",
    claimantAttendance: "",
    respondentAttendance: "",
    expertAttendance: "",
    witnessAttendance: "",
    interpretorAttendance: "",
    //
    tribunal: "1",
    doc: new jsPDF(),
  });

  const role = JSON.parse(localStorage.getItem("iicra-token"));

  const [count, setCount] = useState(1);
  const [content, setContent] = useState("");

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const updateContent = (newContent) => {
    setContent(newContent);
  };

  const onChange = (evt) => {
    console.log(evt);
    var newContent = evt.editor.getData();
    setContent(newContent);
    console.log("CONTENT :: ", evt.editor);
  };

  const onBlur = (evt) => {
    console.log("onBlur event called with event info: ", evt);
  };

  const afterPaste = (evt) => {
    console.log("afterPaste event called with event info: ", evt);
  };

  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();

  const generatePdf = () => {
    const notes = content.match(/.{1,110}/g);
    state.doc.rect(5, 5, 200, 287);
    state.doc.addImage(logo, "png", 90, 10, 28, 25);
    state.doc.setFontSize(14);
    state.doc.text("Minutes of Arbitration Hearing No. ___", 65, 45);
    state.doc.text("Arbitration Case No:---------", 75, 50);
    state.doc.text(
      `Arbitration Hearing, ${date}, ${time} at ${state.placeOfMeeting}`,
      45,
      55
    );
    state.doc.setFontSize(10);
    state.doc.text("Name of the Claimant: ", 20, 70);
    state.doc.text(props.location.state.claimantName, 100, 70);
    state.doc.text("Nationality", 20, 75);
    state.doc.text(props.location.state.claimantNationality, 100, 75);
    state.doc.text("Address", 20, 80);
    state.doc.text(props.location.state.claimantAddress, 100, 80);
    state.doc.text("Phone", 20, 85);
    state.doc.text(props.location.state.claimantPhone, 100, 85);
    state.doc.text("Email", 20, 90);
    state.doc.text(props.location.state.claimantEmail, 100, 90);

    state.doc.text("Name of the Respondent: ", 20, 100);
    state.doc.text(props.location.state.respondentName, 100, 100);
    state.doc.text("Nationality", 20, 105);
    state.doc.text(props.location.state.respondentNationality, 100, 105);
    state.doc.text("Address", 20, 110);
    state.doc.text(props.location.state.respondentAddress, 100, 110);
    state.doc.text("Phone", 20, 115);
    state.doc.text(props.location.state.respondentPhone, 100, 115);
    state.doc.text("Email", 20, 120);
    state.doc.text(props.location.state.respondentEmail, 100, 120);
    state.doc.text("Arbitrator", 20, 130);
    state.doc.text(props.location.state.arbitratorName, 100, 130);
    state.doc.text(
      "Praise be to Allah almighty, the Lord of the worlds, and prayers and peace be upon the most honorable",
      20,
      140
    );
    state.doc.text(
      "messengers, our master Muhammad, his family and all his companions.",
      20,
      145
    );
    state.doc.text(
      `With reference to CASE _______ between ${props.location.state.claimantName} and ${props.location.state.respondentName}. `,
      20,
      150
    );
    state.doc.text(
      `Based on IICRA Arbitration rules, the hearing is being held on ${now.toLocaleDateString()} at ${now.toLocaleTimeString()} in ${
        state.placeOfMeeting
      }`,
      20,
      155
    );
    let attendies = 165;
    if (state.tribunal == "3") {
      state.doc.text("Chairman", 20, attendies);
      state.doc.text(state.chairmanAttendance, 100, attendies);
      state.doc.text("Co-Arbitrator", 20, attendies + 5);
      state.doc.text(state.arbitratorAttendance1, 100, attendies + 5);
      state.doc.text("Co-Arbitrator", 20, attendies + 10);
      state.doc.text(state.arbitratorAttendance2, 100, attendies + 10);
      attendies += 15;
    } else if (state.tribunal == "1") {
      state.doc.text("Arbitrator", 20, attendies);
      state.doc.text(state.arbitratorAttendance2, 100, attendies);
      attendies += 5;
    }
    state.doc.text("Rapporteur", 20, attendies);
    state.doc.text(state.rapporteurAttendance, 100, attendies);

    state.doc.text("Claimant", 20, attendies + 10);
    state.doc.text(state.chairmanAttendance, 100, attendies + 10);

    state.doc.text("Respondent", 20, attendies + 15);
    state.doc.text(state.respondentAttendance, 100, attendies + 15);

    state.doc.text("Expert", 20, attendies + 20);
    state.doc.text(state.expertAttendance, 100, attendies + 20);

    state.doc.text("Witness", 20, attendies + 25);
    state.doc.text(state.witnessAttendance, 100, attendies + 25);

    state.doc.text("Interpreter", 20, attendies + 30);
    state.doc.text(state.interpretorAttendance, 100, attendies + 30);

    let length = attendies + 40;
    state.doc.text("Procedural Hearing", 20, length);
    notes.map((note) => {
      length += 5;
      state.doc.text(note, 20, length);
    });

    state.doc.text("Order Type", 20, length + 10);
    state.doc.text(state.typeOfOrder, 80, length + 10);

    state.doc.text("Recipient", 20, length + 15);
    state.doc.text(state.recipient, 80, length + 15);

    state.doc.text("Order", 20, length + 20);
    state.doc.text(state.order, 80, length + 20);

    if (!state.order1 == "" || !state.order1 == null) {
      state.doc.text("Order Type", 20, length + 30);
      state.doc.text(state.typeOfOrder1, 80, length + 30);

      state.doc.text("Recipient", 20, length + 35);
      state.doc.text(state.recipient1, 80, length + 35);

      state.doc.text("Order", 20, length + 40);
      state.doc.text(state.order1, 80, length + 40);
      state.doc.text(
        `The Sole Arbitrator closed the session and Meeting adjourned at ${time} and Minutes was signed by the`,
        20,
        length + 50
      );
      state.doc.text(
        `Parties, Sole Arbitrator and Rapporteur.`,
        20,
        length + 55
      );
    } else {
      state.doc.text(
        `The Sole Arbitrator closed the session and Meeting adjourned at ${time} and Minutes was signed by the`,
        20,
        length + 30
      );
      state.doc.text(
        `Parties, Sole Arbitrator and Rapporteur.`,
        20,
        length + 35
      );
    }

    // state.doc.text(`${content.length}`, 20, 145);
    state.doc.save("new");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generatePdf();
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
            {role == "admin" ? (
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
                      pathname: "/cases",
                    })
                  }
                  style={styles.crumbTabs}
                >
                  Cases
                </BreadcrumbItem>
                <BreadcrumbItem
                  onClick={() =>
                    props.history.push({
                      pathname: "/cases/expanded",
                      state: props.location.state,
                    })
                  }
                  style={styles.crumbTabs}
                >
                  Details
                </BreadcrumbItem>
                <BreadcrumbItem
                  onClick={() =>
                    props.history.push({
                      pathname: "/cases/timeline",
                      state: props.location.state,
                    })
                  }
                  style={styles.crumbTabs}
                >
                  Timeline
                </BreadcrumbItem>
                <BreadcrumbItem
                  onClick={() =>
                    props.history.push({
                      pathname: "/cases/hearing",
                      state: props.location.state,
                    })
                  }
                  style={styles.crumbTabs}
                >
                  Hearing(s)
                </BreadcrumbItem>
                <BreadcrumbItem style={styles.crumb}>
                  Minutes -{" "}
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
      <Container fluid style={styles.formUserContainer}>
        <h6 style={styles.center}>Minutes of Meeting</h6>

        <Row className="ml-5 mr-5 mt-3 mb-3 ">
          <Col>
            <Card className="shadow">
              <CardBody>
                Praise be to Allah almighty, the Lord of the worlds, and prayers
                and peace be upon the most honorable messengers, our master
                Muhammad, his family and all his companions.
                <br />
                With reference to CASE{" "}
                {props.location.state.caseNumberRec
                  ? `REC${props.location.state.createdAt.split("-")[0]}-${pad(
                      props.location.state.caseNumberRec
                    )}`
                  : "CASE/REC"}{" "}
                between {props.location.state.claimantName} and{" "}
                {props.location.state.respondentName}. Based on IICRA
                Reconciliation rules, the hearing is being held on{" "}
                {now.toLocaleDateString()} at {now.toLocaleTimeString()} in{" "}
                <Label>
                  <Input
                    type="text"
                    id="placeOfMeeting"
                    name="placeOfMeeting"
                    value={state.placeOfMeeting}
                    onChange={handleChange}
                  />
                </Label>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row className="ml-5 mr-5">
          <Col>
            <Table bordered hover style={styles.table}>
              <tbody>
                <tr>
                  <td>Conciliators</td>
                  <td style={styles.td2}>
                    <FormGroup check style={styles.radio}>
                      <Label check>
                        <Input
                          type="select"
                          name="tribunal"
                          value={state.tribunal}
                          style={styles.tribunal}
                          onChange={handleChange}
                        >
                          <option>1</option>
                          <option>3</option>
                        </Input>
                      </Label>
                    </FormGroup>
                  </td>
                </tr>
                {state.tribunal == "3" ? (
                  <tr>
                    <td>Conciliator</td>
                    <td style={styles.td2}>
                      <FormGroup check style={styles.radio}>
                        <Label check>
                          <Input
                            type="radio"
                            name="chairmanAttendance"
                            style={styles.pointer}
                            value="Present"
                            onChange={handleChange}
                          />
                          Present
                        </Label>
                      </FormGroup>
                      <FormGroup check style={styles.radio}>
                        <Label check>
                          <Input
                            type="radio"
                            name="chairmanAttendance"
                            style={styles.pointer}
                            value="Absent"
                            onChange={handleChange}
                          />{" "}
                          Absent
                        </Label>
                      </FormGroup>
                      <FormGroup check style={styles.radio}>
                        <Label check>
                          <Input
                            type="radio"
                            name="chairmanAttendance"
                            style={styles.pointer}
                            value="N/A"
                            onChange={handleChange}
                          />{" "}
                          N/A
                        </Label>
                      </FormGroup>
                    </td>
                  </tr>
                ) : null}
                {state.tribunal == "3" ? (
                  <>
                    <tr>
                      <td>Conciliator</td>
                      <td style={styles.td2}>
                        <FormGroup check style={styles.radio}>
                          <Label check>
                            <Input
                              type="radio"
                              name="arbitratorAttendance1"
                              style={styles.pointer}
                              value="Present"
                              onChange={handleChange}
                            />{" "}
                            Present
                          </Label>
                        </FormGroup>
                        <FormGroup check style={styles.radio}>
                          <Label check>
                            <Input
                              type="radio"
                              name="arbitratorAttendance1"
                              style={styles.pointer}
                              value="Absent"
                              onChange={handleChange}
                            />{" "}
                            Absent
                          </Label>
                        </FormGroup>
                        <FormGroup check style={styles.radio}>
                          <Label check>
                            <Input
                              type="radio"
                              name="arbitratorAttendance1"
                              style={styles.pointer}
                              value="N/A"
                              onChange={handleChange}
                            />{" "}
                            N/A
                          </Label>
                        </FormGroup>
                      </td>
                    </tr>
                    <tr>
                      <td>Conciliator</td>
                      <td style={styles.td2}>
                        <FormGroup check style={styles.radio}>
                          <Label check>
                            <Input
                              type="radio"
                              name="arbitratorAttendance2"
                              style={styles.pointer}
                              value="Present"
                              onChange={handleChange}
                            />{" "}
                            Present
                          </Label>
                        </FormGroup>
                        <FormGroup check style={styles.radio}>
                          <Label check>
                            <Input
                              type="radio"
                              name="arbitratorAttendance2"
                              style={styles.pointer}
                              value="Absent"
                              onChange={handleChange}
                            />{" "}
                            Absent
                          </Label>
                        </FormGroup>
                        <FormGroup check style={styles.radio}>
                          <Label check>
                            <Input
                              type="radio"
                              name="arbitratorAttendance2"
                              style={styles.pointer}
                              value="N/A"
                              onChange={handleChange}
                            />{" "}
                            N/A
                          </Label>
                        </FormGroup>
                      </td>
                    </tr>
                  </>
                ) : null}
                {state.tribunal == "1" ? (
                  <tr>
                    <td>Conciliator</td>
                    <td style={styles.td2}>
                      <FormGroup check style={styles.radio}>
                        <Label check>
                          <Input
                            type="radio"
                            name="arbitratorAttendance"
                            style={styles.pointer}
                            value="Present"
                            onChange={handleChange}
                          />{" "}
                          Present
                        </Label>
                      </FormGroup>
                      <FormGroup check style={styles.radio}>
                        <Label check>
                          <Input
                            type="radio"
                            name="arbitratorAttendance"
                            style={styles.pointer}
                            value="Absent"
                            onChange={handleChange}
                          />{" "}
                          Absent
                        </Label>
                      </FormGroup>
                      <FormGroup check style={styles.radio}>
                        <Label check>
                          <Input
                            type="radio"
                            name="arbitratorAttendance"
                            style={styles.pointer}
                            value="N/A"
                            onChange={handleChange}
                          />{" "}
                          N/A
                        </Label>
                      </FormGroup>
                    </td>
                  </tr>
                ) : null}

                <tr>
                  <td>First Party</td>
                  <td style={styles.td2}>
                    <FormGroup check style={styles.radio}>
                      <Label check>
                        <Input
                          type="radio"
                          name="claimantAttendance"
                          style={styles.pointer}
                          value="Present"
                          onChange={handleChange}
                        />{" "}
                        Present
                      </Label>
                    </FormGroup>
                    <FormGroup check style={styles.radio}>
                      <Label check>
                        <Input
                          type="radio"
                          name="claimantAttendance"
                          style={styles.pointer}
                          value="Absent"
                          onChange={handleChange}
                        />{" "}
                        Absent
                      </Label>
                    </FormGroup>
                    <FormGroup check style={styles.radio}>
                      <Label check>
                        <Input
                          type="radio"
                          name="claimantAttendance"
                          style={styles.pointer}
                          value="N/A"
                          onChange={handleChange}
                        />{" "}
                        N/A
                      </Label>
                    </FormGroup>
                  </td>
                </tr>
                <tr>
                  <td>Second Party</td>
                  <td style={styles.td2}>
                    <FormGroup check style={styles.radio}>
                      <Label check>
                        <Input
                          type="radio"
                          name="respondentAttendance"
                          style={styles.pointer}
                          value="Present"
                          onChange={handleChange}
                        />{" "}
                        Present
                      </Label>
                    </FormGroup>
                    <FormGroup check style={styles.radio}>
                      <Label check>
                        <Input
                          type="radio"
                          name="respondentAttendance"
                          style={styles.pointer}
                          value="Absent"
                          onChange={handleChange}
                        />{" "}
                        Absent
                      </Label>
                    </FormGroup>
                    <FormGroup check style={styles.radio}>
                      <Label check>
                        <Input
                          type="radio"
                          name="respondentAttendance"
                          style={styles.pointer}
                          value="N/A"
                          onChange={handleChange}
                        />{" "}
                        N/A
                      </Label>
                    </FormGroup>
                  </td>
                </tr>
                <tr>
                  <td>Interpreter</td>
                  <td style={styles.td2}>
                    <FormGroup check style={styles.radio}>
                      <Label check>
                        <Input
                          type="radio"
                          name="interpretorAttendance"
                          style={styles.pointer}
                          value="Present"
                          onChange={handleChange}
                        />{" "}
                        Present
                      </Label>
                    </FormGroup>
                    <FormGroup check style={styles.radio}>
                      <Label check>
                        <Input
                          type="radio"
                          name="interpretorAttendance"
                          style={styles.pointer}
                          value="Absent"
                          onChange={handleChange}
                        />{" "}
                        Absent
                      </Label>
                    </FormGroup>
                    <FormGroup check style={styles.radio}>
                      <Label check>
                        <Input
                          type="radio"
                          name="interpretorAttendance"
                          style={styles.pointer}
                          value="N/A"
                          onChange={handleChange}
                        />{" "}
                        N/A
                      </Label>
                    </FormGroup>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        {/* <Row className=" ml-5 mr-5">
          <Col>
            <CKEditor
              activeClass="p10"
              content={content}
              events={{
                blur: onBlur,
                afterPaste: afterPaste,
                change: onChange,
              }}
              style={{ border: "2px solid black" }}
            />
          </Col>
        </Row> */}
        <Row className="ml-5 mr-5">
          <Col>
            <Form>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>Order </Label>
                    <Input
                      type="textarea"
                      id="order"
                      name="order"
                      value={state.order}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>Type of Order </Label>
                    <Input
                      type="select"
                      id="typeOfOrder"
                      name="typeOfOrder"
                      value={state.typeOfOrder}
                      onChange={handleChange}
                    >
                      <option></option>
                      <option>First Order</option>
                      <option>Reserved Order</option>
                      <option>Temporary Order</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>Recipient</Label>
                    <Input
                      type="select"
                      id="recipient"
                      name="recipient"
                      value={state.recipient}
                      onChange={handleChange}
                    >
                      <option></option>
                      <option>Fisrt Party</option>
                      <option>Second Party</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              {count == "2" ? (
                <Row>
                  <Col>
                    <FormGroup>
                      <Label>Order </Label>
                      <Input
                        type="textarea"
                        id="order1"
                        name="order1"
                        value={state.order1}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label>Type of Order </Label>
                      <Input
                        type="select"
                        id="typeOfOrder1"
                        name="typeOfOrder1"
                        value={state.typeOfOrder1}
                        onChange={handleChange}
                      >
                        <option></option>
                        <option>First Order</option>
                        <option>Reserved Order</option>
                        <option>Temporary Order</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label>Recipient</Label>
                      <Input
                        type="select"
                        id="recipient1"
                        name="recipient1"
                        value={state.recipient1}
                        onChange={handleChange}
                      >
                        <option></option>
                        <option>First Party</option>
                        <option>Second Party</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
              ) : null}
              {count >= "3" ? (
                <>
                  {" "}
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>Order </Label>
                        <Input
                          type="textarea"
                          id="order1"
                          name="order1"
                          value={state.order1}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>Type of Order </Label>
                        <Input
                          type="select"
                          id="typeOfOrder1"
                          name="typeOfOrder1"
                          value={state.typeOfOrder1}
                          onChange={handleChange}
                        >
                          <option></option>
                          <option>First Order</option>
                          <option>Reserved Order</option>
                          <option>Temporary Order</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>Recipient</Label>
                        <Input
                          type="select"
                          id="recipient1"
                          name="recipient1"
                          value={state.recipient1}
                          onChange={handleChange}
                        >
                          <option></option>
                          <option>First Party</option>
                          <option>Second Party</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>Order </Label>
                        <Input
                          type="textarea"
                          id="order2"
                          name="order2"
                          value={state.order2}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>Type of Order </Label>
                        <Input
                          type="select"
                          id="typeOfOrder2"
                          name="typeOfOrder2"
                          value={state.typeOfOrder2}
                          onChange={handleChange}
                        >
                          <option></option>
                          <option>First Order</option>
                          <option>Reserved Order</option>
                          <option>Temporary Order</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>Recipient</Label>
                        <Input
                          type="select"
                          id="recipient2"
                          name="recipient2"
                          value={state.recipient2}
                          onChange={handleChange}
                        >
                          <option></option>
                          <option>First Party</option>
                          <option>Second Party</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                </>
              ) : null}
              <Button onClick={() => setCount(count + 1)}>Add Order</Button>
            </Form>
          </Col>
        </Row>
        <Row className="ml-5 mr-5 pb-3" style={{ textAlign: "right" }}>
          <Col>
            <Button onClick={handleSubmit}>Submit</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
const styles = {
  formUserContainer: {
    marginTop: "5vh",
    paddingTop: "5vh",
    backgroundColor: "#f6f6f6",
    minHeight: "100vh",
  },
  radio: {
    display: "inline",
    marginRight: "10vh",
  },
  table: {
    backgroundColor: "white",
    borderRadius: "5px",
  },
  td2: {
    textAlign: "right",
  },
  center: {
    color: "white",
    textAlign: "center",
    backgroundColor: "#008f53",
    padding: "1vh",
    borderRadius: "5px",
    cursor: "not-allowed",
  },
  pointer: {
    cursor: "pointer",
    transform: "scale(1.2)",
    backgroundColor: "green",
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
export default Minutes;
