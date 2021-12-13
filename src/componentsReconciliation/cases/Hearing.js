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

const Hearing = (props) => {
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

  // const handleNavigation = (data) => {
  //   props.history.push({
  //     pathname: "/email/hearing",
  //     state: data,
  //   });
  // };

  const handleMinutes = (data) => {
    props.history.push({
      pathname: "/cases_/hearing_/minutes_",
      state: data,
    });
  };

  const enableNextStep = (id) => {
    const stepForm = new FormData();
    stepForm.append("step", 10);
    stepForm.append("stepName", "submission");
    axios
      .post(`${baseURL}/formReconciliation/enableNextStep/${id}`, stepForm)
      .then((res) => {
        Swal.fire({
          title: res.data,
          icon: "success",
        }).then(() => {
          props.history.push({
            pathname: "/cases_/submission_",
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
    form.append("type", "hearing");
    axios
      .post(
        `${baseURL}/formReconciliation/noticeOfArb/${props.location.state._id}`,
        form
      )
      .then(() =>
        Swal.fire({
          title: "File has been uploaded successfully",
          icon: "success",
        }).then(() =>
          props.history.push({
            pathname: "/cases_/expanded_",
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

  const pad = (num) => {
    if (num < 10) {
      return "00" + num;
    } else if (num > 9 && num < 100) {
      return "0" + num;
    } else return num;
  };

  let index = 0;

  const docs = () => {
    return props.location.state.attachments.map((attach) => {
      if (attach.type == "hearing") {
        index += 1;
        return (
          <tr key={attach._id}>
            <td>{romanize(index)}.</td>
            <td>
              <a href={`${baseURL}/${attach.name}`} target="_blank">
                File
              </a>
            </td>
            <td>{attach.author}</td>
            <td>{attach.date}</td>
            <td>{attach.status ? "Approved" : "Pending"}</td>
          </tr>
        );
      }
    });
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
                      pathname: "/cases_",
                    })
                  }
                  style={styles.crumbTabs}
                >
                  Cases
                </BreadcrumbItem>
                <BreadcrumbItem
                  onClick={() =>
                    props.history.push({
                      pathname: "/cases_/expanded_",
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
                      pathname: "/cases_/timeline_",
                      state: props.location.state,
                    })
                  }
                  style={styles.crumbTabs}
                >
                  Timeline
                </BreadcrumbItem>
                <BreadcrumbItem style={styles.crumb}>
                  Hearing(s) -{" "}
                  {props.location.state.caseNumber
                    ? `REC${props.location.state.createdAt.split("-")[0]}-${pad(
                        props.location.state.caseNumber
                      )}`
                    : "CASE/REC"}
                </BreadcrumbItem>
              </Breadcrumb>
            ) : null}
            {role == "first" ||
            role == "second" ||
            role == "concil" ||
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
                  Cases
                </BreadcrumbItem>
                <BreadcrumbItem
                  onClick={() =>
                    props.history.push({
                      pathname: "/cases_/expanded_",
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
                      pathname: "/cases_/timeline_",
                      state: props.location.state,
                    })
                  }
                  style={styles.crumbTabs}
                >
                  Timeline
                </BreadcrumbItem>
                <BreadcrumbItem style={styles.crumb}>
                  Hearing(s) -{" "}
                  {props.location.state.caseNumber
                    ? `REC${props.location.state.createdAt.split("-")[0]}-${pad(
                        props.location.state.caseNumber
                      )}`
                    : "CASE/REC"}
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
                  label="Upload a File"
                  onChange={(e) => {
                    handleUpload(e.target.files[0]);
                  }}
                />
              </Col>
            </Row>
            <Card style={styles.cardBg}>
              <h6 className="pl-2" style={styles.center}>
                IX. Hearing
                <span style={{ float: "right" }}>
                  {role == "admin" ? (
                    <a
                      style={styles.templates}
                      className="mr-1"
                      onClick={() => handleMinutes(props.location.state)}
                    >
                      Minutes
                    </a>
                  ) : null}
                  {/* <a
                    className="pr-2"
                    style={styles.templates}
                    onClick={() => handleNavigation(props.location.state)}
                  >
                    Templates
                  </a> */}
                </span>
              </h6>
              <CardBody>
                <Table bordered hover>
                  <thead>
                    <tr>
                      <th>S. No.</th>
                      <th>Hearing(s)</th>
                      <th>Uploaded By</th>
                      <th>Date</th>
                      <th>Status</th>
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
                  pathname: "/cases_/prehearing_",
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
              &#60;&#60; Prev
            </span>
          </Col>
          <Col style={{ textAlign: "center" }}>
            <span
              style={footerNavRight}
              onClick={() => {
                if (role == "admin" && step < 9) {
                  Swal.fire({
                    title: "Enable the next step in Proceeding",
                    icon: "info",
                    showCancelButton: true,
                    confirmButtonText: "Yes",
                    cancelButtonText: "No",
                  }).then((result) => {
                    if (result.value) {
                      enableNextStep(props.location.state._id);
                      Swal.fire("Unlocked", "", "success");
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                      Swal.fire("Cancelled", "", "error");
                    }
                  });
                } else if (step > 8) {
                  props.history.push({
                    pathname: "/cases_/submission_",
                    state: props.location.state,
                  });
                } else {
                  Swal.fire({
                    title: "Not Authorised",
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
              Next &#62;&#62;
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
export default Hearing;
