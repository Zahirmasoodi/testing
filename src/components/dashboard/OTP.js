import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Card,
  CardBody,
  Button,
} from "reactstrap";
import Input from "reactstrap/lib/Input";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Label from "reactstrap/lib/Label";
import { getEnvironment } from "../../config";

const OTP = (props) => {
  const baseURL = getEnvironment().apiUrl;

  const history = useHistory();

  const [otp, setOTP] = useState("");

  const submit = () => {
    const form = new FormData();

    form.append("code", otp);
    form.append("email", props.location.state.email);
    form.append("role", props.location.state.role);
    form.append("password", props.location.state.password);

    axios
      .post(`${baseURL}/form/verifyOTP`, form)
      .then((res) => {
        if (res.data.valid && props.location.state.role == "claimant") {
          history.push("/claimant");
        } else if (res.data.valid && props.location.state.role == "admin") {
          history.push("/dashboard");
        } else if (
          res.data.valid &&
          props.location.state.role == "respondent"
        ) {
          history.push("/respondent");
        } else if (
          res.data.valid &&
          props.location.state.role == "arbitrator"
        ) {
          localStorage.setItem("arbitratorEmail", res.data.email);
          history.push("/arbitrator");
        } else if (res.data.valid && props.location.state.role == "witness") {
          localStorage.setItem("witnessEmail", res.data.email);
          history.push("/witness/cases");
        } else if (
          res.data.valid &&
          props.location.state.role == "rapporteur"
        ) {
          history.push("/rapporteur");
        } else if (
          res.data.valid &&
          props.location.state.role == "interpretor"
        ) {
          localStorage.setItem("interpreterEmail", res.data.email);
          history.push("/interpreter");
        } else if (res.data.valid && props.location.state.role == "expert") {
          localStorage.setItem("expertEmail", res.data.email);
          history.push("/expert");
        } else if (res.data.valid && props.location.state.role == "first") {
          history.push("/first");
        } else if (res.data.valid && props.location.state.role == "second") {
          history.push("/secondd_");
        } else if (res.data.valid && props.location.state.role == "concil") {
          history.push("/concil");
        } else {
          alert("ROLE NOT FOUND / WRONG OTP");
          history.push("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setOTP(e.target.value);
  };

  return (
    <Container>
      <Row>
        <Col md={3} lg={3} xl={3}></Col>
        <Col sm={12} md={6} lg={6} xl={6}>
          <Card className="shadow-lg" style={styles.card}>
            <CardBody style={{ textAlign: "center" }}>
              <Form onSubmit={submit}>
                <FormGroup style={{ display: "inline" }}>
                  <Row>
                    <Col style={{ textAlign: "left" }}>
                      <Label>OTP</Label>
                      <Input
                        autoFocus
                        value={otp}
                        type="number"
                        name="num1"
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>
              </Form>
              <Button onClick={submit} className="mt-3">
                Submit
              </Button>
            </CardBody>
          </Card>
        </Col>
        <Col md={3} lg={3} xl={3}></Col>
      </Row>
    </Container>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
  },
  head: {
    textAlign: "right",
  },
  card: {
    borderRadius: "10px",
    marginTop: "35vh",
  },
};

export default OTP;
