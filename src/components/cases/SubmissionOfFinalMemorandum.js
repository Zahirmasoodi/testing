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

const SubmissionOfFinalMemorandum = (props) => {
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
      pathname: "/email/memorandum",
      state: data,
    });
  };

  const enableNextStep = (id) => {
    const stepForm = new FormData();
    stepForm.append("step", 11);
    stepForm.append("stepName", "issuance");
    axios
      .post(`${baseURL}/form/enableNextStep/${id}`, stepForm)
      .then((res) => {
        Swal.fire({
          title: res.data,
          icon: "success",
        }).then(() => {
          props.history.push({
            pathname: "/cases/issuance",
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
    form.append("type", "memorandum");

    axios
      .post(`${baseURL}/form/upload/${props.location.state._id}`, form)
      .then(() =>
        Swal.fire({
          title:
            document.dir == "ltr"
              ? "File has been uploaded successfully"
              : "تم تحميل الملف بنجاح",
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

  let index = 0;

  const docs = () => {
    return props.location.state.attachments.map((attach) => {
      if (attach.type == "memorandum") {
        index += 1;
        return (
          <tr key={attach._id}>
            <td>{romanize(index)}.</td>
            <td>
              <a href={`${baseURL}/${attach.name}`} target="_blank">
                {document.dir == "ltr" ? "File" : "ملف"}-{index}
              </a>
            </td>
            <td>{attach.author}</td>
            <td>{attach.date}</td>
            <td>
              {attach.status
                ? document.dir == "ltr"
                  ? "Approved"
                  : "وافق"
                : document.dir == "ltr"
                ? "Pending"
                : "قيد الانتظار"}
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
                <BreadcrumbItem
                  onClick={() =>
                    props.history.push({
                      pathname: "/cases/expanded",
                      state: props.location.state,
                    })
                  }
                  style={styles.crumbTabs}
                >
                  {document.dir == "ltr" ? "Details" : " تفاصيل"}
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
                  {document.dir == "ltr" ? "Timeline" : " الجدول الزمني"}
                </BreadcrumbItem>
                <BreadcrumbItem style={styles.crumb}>
                  {document.dir == "ltr"
                    ? "Submission of Final Memorandum"
                    : "تقديم المذكرة النهائية"}{" "}
                  - ARB
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
                  {document.dir == "ltr" ? "Cases" : "حالات"}
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
                  {document.dir == "ltr" ? "Details" : "تفاصيل"}
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
                  {document.dir == "ltr" ? "Timeline" : "الجدول الزمني"}
                </BreadcrumbItem>
                <BreadcrumbItem style={styles.crumb}>
                  {document.dir == "ltr"
                    ? "Submission of Final Memorandum"
                    : "تقديم المذكرة النهائية"}{" "}
                  - ARB
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
                  label={document.dir == "ltr" ? "Upload a File" : "تحميل ملف"}
                  onChange={(e) => {
                    handleUpload(e.target.files[0]);
                  }}
                />
              </Col>
            </Row>
            <Card style={styles.cardBg}>
              <h6 className="pl-2" style={styles.center}>
                X.{" "}
                {document.dir == "ltr"
                  ? "Submission of Final Memorandum"
                  : "تقديم المذكرة النهائية"}
                {role == "admin" ? (
                  <span style={{ float: "right" }}>
                    <a
                      className="pr-2"
                      style={styles.templates}
                      onClick={() => handleNavigation(props.location.state)}
                    >
                      {document.dir == "ltr" ? "Templates" : "القوالب"}
                    </a>
                  </span>
                ) : null}
              </h6>
              <CardBody>
                <Table bordered hover>
                  <thead>
                    <tr>
                      <th>{document.dir == "ltr" ? "S. No." : "رقم سري"}</th>
                      <th>{document.dir == "ltr" ? "File" : "ملف"}</th>
                      <th>
                        {document.dir == "ltr"
                          ? "Uploaded By"
                          : "تم الرفع بواسطة"}
                      </th>
                      <th>{document.dir == "ltr" ? "Date" : "تاريخ"}</th>
                      <th>{document.dir == "ltr" ? "Status" : "حالة"}</th>
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
                  pathname: "/cases/hearing",
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
              &#60;&#60;{document.dir == "ltr" ? "Prev" : "السابق"}
            </span>
          </Col>
          <Col style={{ textAlign: "center" }}>
            <span
              style={footerNavRight}
              onClick={() => {
                if (role == "admin" && step < 10) {
                  Swal.fire({
                    title:
                      document.dir == "ltr"
                        ? "Enable the next step in Proceeding"
                        : "قم بتمكين الخطوة التالية في المتابعة",
                    icon: "info",
                    showCancelButton: true,
                    confirmButtonText: document.dir == "ltr" ? "Yes" : "نعم",
                    cancelButtonText: document.dir == "ltr" ? "No" : "لا",
                  }).then((result) => {
                    if (result.value) {
                      enableNextStep(props.location.state._id);
                      Swal.fire(
                        document.dir == "ltr" ? "Unlocked" : "مفتوحة",
                        "success"
                      );
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                      Swal.fire(
                        document.dir == "ltr" ? "Cancelled" : "ألغيت",
                        "error"
                      );
                    }
                  });
                } else if (step > 9) {
                  props.history.push({
                    pathname: "/cases/issuance",
                    state: props.location.state,
                  });
                } else {
                  Swal.fire({
                    title:
                      document.dir == "ltr"
                        ? "Acces Denied, Contact IICRA"
                        : "رفض القبول ، اتصل بالمركز",
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
              {document.dir == "ltr" ? "Next" : "التالي"} &#62;&#62;
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
export default SubmissionOfFinalMemorandum;
