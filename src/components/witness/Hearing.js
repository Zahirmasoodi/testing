import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Table,
  Button,
  CustomInput,
} from "reactstrap";
import axios from "axios";
import { getEnvironment } from "../../config";

const HearingWitness = (props) => {
  const baseURL = getEnvironment().apiUrl;

  const role = JSON.parse(localStorage.getItem("iicra-token"));

  const handleNavigation = (data) => {
    props.history.push({
      pathname: "/witness/hearing",
      state: data,
    });
  };

  const handleUpload = (file) => {
    const form = new FormData();
    form.append("arbit", file);
    form.append("author", role);
    form.append("type", "hearing");
    axios
      .put(`${baseURL}/form/noticeOfArb/${props.location.state._id}`, form)
      .then(() => console.log("done"))
      .catch((res) => console.log(res.err));
  };

  const docs = () => {
    let index = 1;
    return props.location.state.attachments.map((attach) => {
      if (attach.type == "hearing") {
        index += 1;
        return (
          <tr key={attach._id}>
            <td>{index}</td>
            <td>{attach.name}</td>
            <td>{attach.author}</td>
            <td>{attach.date}</td>
            <td>{attach.status}</td>
          </tr>
        );
      }
    });
  };

  return (
    <Container style={styles.formUserContainer} className="shadow">
      <Row>
        <Col>
          <Row>
            <Col style={styles.btnRow}>
              <Button onClick={() => handleNavigation(props.location.state)}>
                Templates
              </Button>
            </Col>
          </Row>
          <Card style={styles.cardBg}>
            <h6 style={styles.center}>Hearing</h6>
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
          <Row>
            <Col style={styles.btnRow}>
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
        </Col>
      </Row>
    </Container>
  );
};

const styles = {
  center: {
    color: "white",
    textAlign: "center",
    backgroundColor: "#008f53",
    paddingTop: "1vh",
    paddingBottom: "1vh",
    cursor: "not-allowed",
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
    border: "none",
  },
  btnRow: { marginBottom: "1vh", textAlign: "right" },
  save: {
    backgroundColor: "#008f53",
    marginLeft: "1vh",
  },
};
export default HearingWitness;
