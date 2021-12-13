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
import { getEnvironment } from "../config";

const MemberOtp = (props) => {
  const baseURL = getEnvironment().apiUrl;

  const history = useHistory();

  const [otp, setOTP] = useState("");

  const submit = () => {
    const form = new FormData();

    form.append("code", otp);
    form.append("email", props.location.state.email);
    form.append("password", props.location.state.password);

    axios
      .post(`${baseURL}/form/verify-member-otp`, form)
      .then((res) => {
        if (res.data.valid && props.location.state.role == "member") {
          history.push({
            pathname: "/memberWelcome",
            state: res.data,
          });
        } else {
          localStorage.setItem("iicra-token", null);
          history.push("/login");
        }
      })
      .catch((err) => console.log(err.response.data));
  };

  const handleChange = (e) => {
    setOTP(e.target.value);
  };

  return (
    <Container style={styles.formUserContainer}>
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
  formUserContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    mozTransform: "translateX(-50%) translateY(-50%)",
    webkitTransform: "translateX(-50%) translateY(-50%)",
    transform: "textDecorationThickness",
  },
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
  },
};

export default MemberOtp;
