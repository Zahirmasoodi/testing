import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Table,
  CustomInput,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";
import romanize from "../../roman";
import { getEnvironment } from "../../config";
import pad from "../../pad";

const SubmissionOfRfa = (props) => {
  const baseURL = getEnvironment().apiUrl;

  const { step } = props.location.state;

  const role = JSON.parse(localStorage.getItem("iicra-token"));

  const [footerNavLeft, setFooterNavLeft] = useState({
    cursor: "pointer",
    fontSize: "20px",
    color: "black",
    letterSpacing: "1px",
  });

  const [footerNavRight, setFooterNavRight] = useState({
    cursor: "pointer",
    fontSize: "20px",
    color: "black",
    letterSpacing: "1px",
  });

  const handleNavigation = (data) => {
    props.history.push({
      pathname: "/email/rfa",
      state: data,
    });
  };

  const enableNextStep = (id) => {
    const stepForm = new FormData();
    stepForm.append("step", 2);
    stepForm.append("stepName", "notice");
    axios
      .post(`${baseURL}/form/enableNextStep/${id}`, stepForm)
      .then((res) => {
        Swal.fire({
          title: res.data,
          icon: "success",
        }).then(() => {
          props.history.push({
            pathname: "/cases/notice",
            state: props.location.state,
          });
        });
      })
      .catch((err) =>
        Swal.fire({
          title: err,
          icon: "error",
        })
      );
  };

  const handleUpload = (file) => {
    const form = new FormData();
    form.append("arbit", file);
    form.append("author", role);
    form.append("type", "rfa");
    form.append("notification", "File uploaded to Submission of RFA");
    axios
      .post(`${baseURL}/form/upload/${props.location.state._id}`, form)
      .then(() =>
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "File has been uploaded successfully"
              : "???? ?????????? ?????????? ??????????",
          icon: "success",
        }).then(() =>
          props.history.push({
            pathname: "/cases/expanded",
            state: props.location.state,
          })
        )
      )
      .catch((err) =>
        Swal.fire({
          title: err,
          icon: "error",
        })
      );
  };

  let index = 3;

  const docs = () => {
    return props.location.state.attachments.map((attach) => {
      if (attach.type == "rfa") {
        index += 1;
        return (
          <tr key={attach._id}>
            <td>{romanize(index)}.</td>
            <td>
              <a href={`${baseURL}/${attach.name}`} target="_blank">
                {document.dir == "ltr" ? "File" : "??????"}-{index}
              </a>
            </td>
            <td>{attach.author}</td>
            <td>{attach.date.split("T")[0]}</td>
            <td>
              {attach.status
                ? document.dir == "ltr"
                  ? "Approved"
                  : "????????"
                : document.dir == "ltr"
                ? "Pending"
                : "?????? ????????????????"}
            </td>
          </tr>
        );
      }
    });
  };

  return (
    <>
      <Container
        fluid
        style={styles.crumbContainer}
        className={document.dir == "ltr" ? "text-left" : "text-right"}
      >
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
                  {document.dir == "ltr" ? "Dashboard" : " ???????? ??????????????"}
                </BreadcrumbItem>
                <BreadcrumbItem
                  onClick={() =>
                    props.history.push({
                      pathname: "/cases",
                    })
                  }
                  style={styles.crumbTabs}
                >
                  {document.dir == "ltr" ? "Cases" : " ??????????"}
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
                  {document.dir == "ltr" ? "Details" : " ????????????"}
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
                  {document.dir == "ltr" ? "Timeline" : " ???????????? ????????????"}
                </BreadcrumbItem>
                <BreadcrumbItem style={styles.crumb}>
                  {document.dir == "ltr" ? "RFA" : "?????? ??????????????"} - ARB
                  {props.location.state.createdAt.split("-")[0]}-
                  {pad(props.location.state.caseNumber)}
                </BreadcrumbItem>
              </Breadcrumb>
            ) : null}
            {role == "claimant" ||
            role == "respondent" ||
            role == "arbitrator" ||
            role == "rapporteur" ||
            role == "expert" ||
            role == "witness" ||
            role == "interpretor" ? (
              <Breadcrumb>
                <BreadcrumbItem
                  onClick={() =>
                    props.history.push({
                      pathname: `/${role}`,
                    })
                  }
                  style={styles.crumbTabs}
                >
                  {document.dir == "ltr" ? "Cases" : "??????????"}
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
                  {document.dir == "ltr" ? "Details" : "????????????"}
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
                  {document.dir == "ltr" ? "Timeline" : "???????????? ????????????"}
                </BreadcrumbItem>
                <BreadcrumbItem style={styles.crumb}>
                  {document.dir == "ltr" ? "RFA" : "?????? ??????????????"} - ARB
                  {props.location.state.createdAt.split("-")[0]}-
                  {pad(props.location.state.caseNumber)}
                </BreadcrumbItem>
              </Breadcrumb>
            ) : null}
          </Col>
        </Row>
      </Container>
      <Container style={styles.formUserContainer} className="shadow">
        <Row>
          <Col>
            <Row>
              <Col style={styles.btnRow} md={2} lg={2}>
                <CustomInput
                  style={{
                    overflow: "hidden",
                    backgroundColor: "white",
                    border: "none",
                  }}
                  type="file"
                  label={document.dir == "ltr" ? "Upload a File" : "?????????? ??????"}
                  onChange={(e) => {
                    handleUpload(e.target.files[0]);
                  }}
                />
              </Col>
            </Row>
            <Card style={styles.cardBg}>
              <h6 className="pl-2" style={styles.center}>
                I.{" "}
                {document.dir == "ltr"
                  ? "Submission of Request for Arbitration (RFA)"
                  : "?????????? ?????? ??????????????"}
                {role == "admin" ? (
                  <span style={{ float: "right" }}>
                    <a
                      className="pr-2"
                      style={styles.templates}
                      onClick={() => handleNavigation(props.location.state)}
                    >
                      {document.dir == "ltr" ? "Templates" : "??????????????"}
                    </a>
                  </span>
                ) : null}
              </h6>
              <CardBody>
                <Table bordered hover>
                  <thead>
                    <tr>
                      <th>{document.dir == "ltr" ? "S. No." : "?????? ??????"}</th>
                      <th>{document.dir == "ltr" ? "File" : "??????"}</th>
                      <th>
                        {document.dir == "ltr"
                          ? "Uploaded By"
                          : "???? ?????????? ????????????"}
                      </th>
                      <th>{document.dir == "ltr" ? "Date" : "??????????"}</th>
                      <th>{document.dir == "ltr" ? "Status" : "????????"}</th>
                    </tr>
                    <tr>
                      <td>{romanize(1)}.</td>
                      <td>
                        <a
                          href={`${baseURL}/${props.location.state.autoPdf}`}
                          target="_blank"
                        >
                          {document.dir == "ltr" ? "RFA" : "?????????? ?????? ??????????????"}
                        </a>
                      </td>
                      <td>{props.location.state.claimantName}</td>
                      <td>{props.location.state.createdAt.split("T")[0]}</td>
                      <td>
                        {props.location.state.approved
                          ? document.dir == "ltr"
                            ? "Approved"
                            : "????????"
                          : document.dir == "ltr"
                          ? "Pending"
                          : "?????? ????????????????"}
                      </td>
                    </tr>
                    <tr>
                      <td>{romanize(2)}.</td>
                      <td>
                        <a
                          href={`${baseURL}/${props.location.state.autoPdfRespondent}`}
                          target="_blank"
                        >
                          {document.dir == "ltr"
                            ? "Response to RFA"
                            : "???????? ?????? ?????? ??????????????"}
                        </a>
                      </td>
                      <td>{props.location.state.claimantName}</td>
                      <td>{props.location.state.createdAt.split("T")[0]}</td>
                      <td>
                        {props.location.state.approved
                          ? document.dir == "ltr"
                            ? "Approved"
                            : "????????"
                          : document.dir == "ltr"
                          ? "Pending"
                          : "?????? ????????????????"}
                      </td>
                    </tr>
                    <tr>
                      <td>{romanize(2)}.</td>
                      <td>
                        <a
                          href={`${baseURL}/${props.location.state.disputeDocuments}`}
                          target="_blank"
                        >
                          {document.dir == "ltr"
                            ? "Dispute Documents"
                            : "?????????????? ????????????"}
                        </a>
                      </td>
                      <td>{props.location.state.claimantName}</td>
                      <td>{props.location.state.createdAt.split("T")[0]}</td>
                      <td>
                        {props.location.state.approved
                          ? document.dir == "ltr"
                            ? "Approved"
                            : "????????"
                          : document.dir == "ltr"
                          ? "Pending"
                          : "?????? ????????????????"}
                      </td>
                    </tr>
                    <tr>
                      <td>{romanize(3)}.</td>
                      <td>
                        <a
                          href={`${baseURL}/${props.location.state.arbitrationAgreement}`}
                          target="_blank"
                        >
                          {document.dir == "ltr"
                            ? "Arbitration Agreement"
                            : "?????????? ??????????????"}
                        </a>
                      </td>
                      <td>{props.location.state.claimantName}</td>
                      <td>{props.location.state.createdAt.split("T")[0]}</td>
                      <td>
                        {props.location.state.approved
                          ? document.dir == "ltr"
                            ? "Approved"
                            : "????????"
                          : document.dir == "ltr"
                          ? "Pending"
                          : "?????? ????????????????"}
                      </td>
                    </tr>
                  </thead>
                  <tbody>{docs()}</tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row
          className="shadow-lg"
          style={{
            backgroundColor: "white",
            position: "fixed",
            width: "100vw",
            padding: "0",
            bottom: -2,
            textAlign: "center",
            alignContent: "center",
            height: "8vh",
          }}
        >
          <Col style={{ textAlign: "center" }}>
            <span
              style={footerNavLeft}
              onClick={() =>
                props.history.push({
                  pathname: "/cases/timeline",
                  state: props.location.state,
                })
              }
              onMouseEnter={() =>
                setFooterNavLeft({
                  cursor: "pointer",
                  fontSize: "20px",
                  color: "green",
                  letterSpacing: "5px",
                  fontWeight: "bolder",
                  transition: ".5s",
                })
              }
              onMouseLeave={() =>
                setFooterNavLeft({
                  cursor: "pointer",
                  fontSize: "20px",
                  color: "black",
                  letterSpacing: "1px",
                  transition: ".5s",
                })
              }
            >
              &#60;&#60;{document.dir == "ltr" ? "Prev" : "????????????"}
            </span>
          </Col>
          <Col style={{ textAlign: "center" }}>
            <span
              style={footerNavRight}
              onClick={() => {
                if (role == "admin" && step < 2) {
                  Swal.fire({
                    title:
                      document.dir == "ltr"
                        ? "Enable the next step in Proceeding"
                        : "???? ???????????? ???????????? ?????????????? ???? ????????????????",
                    icon: "info",
                    showCancelButton: true,
                    confirmButtonText: document.dir == "ltr" ? "Yes" : "??????",
                    cancelButtonText: document.dir == "ltr" ? "No" : "????",
                  })
                  .then((result) => {
                    if (result.value) {
                      enableNextStep(props.location.state._id);
                      Swal.fire(
                        document.dir == "ltr" ? "Unlocked" : "????????????",
                        "success"
                      );
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                      Swal.fire(
                        document.dir == "ltr" ? "Cancelled" : "??????????",
                        "error"
                      );
                    }
                  });
                } else if (step > 1) {
                  props.history.push({
                    pathname: "/cases/notice",
                    state: props.location.state,
                  });
                } else {
                  Swal.fire({
                    title:
                      document.dir == "ltr"
                        ? "Acces Denied, Contact IICRA"
                        : "?????? ???????????? ?? ???????? ??????????????",
                    icon: "error",
                  });
                }
              }}
              onMouseEnter={() =>
                setFooterNavRight({
                  cursor: "pointer",
                  fontSize: "20px",
                  color: "green",
                  letterSpacing: "5px",
                  fontWeight: "bolder",
                  transition: ".5s",
                })
              }
              onMouseLeave={() =>
                setFooterNavRight({
                  cursor: "pointer",
                  fontSize: "20px",
                  color: "black",
                  letterSpacing: "1px",
                  transition: ".5s",
                })
              }
            >
              {document.dir == "ltr" ? "Next" : "????????????"} &#62;&#62;
            </span>
          </Col>
        </Row>
      </Container>
    </>
  );
};

const styles = {
  center: {
    color: "white",
    textAlign: "left",
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
    border: "none",
  },
  btnRow: { marginBottom: "1vh", textAlign: "left" },
  save: {
    backgroundColor: "#008f53",
    marginLeft: "1vh",
  },
  templates: {
    textDecoration: "underline",
    cursor: "pointer",
    color: "white",
  },
  crumbContainer: {
    height: "12vh",
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
export default SubmissionOfRfa;
