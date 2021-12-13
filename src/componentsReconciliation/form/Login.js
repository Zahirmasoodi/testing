import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/UserContext";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  Button,
} from "reactstrap";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loginType, setLoginType] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password, loginType };
      const loginResponse = await axios.post(
        `http://localhost:5000/form/login`,
        loginUser
      );
      console.log(loginResponse.data);

      if (loginResponse.data.msg) {
        setError(loginResponse.data.msg);
      }
      //test

      setUserData({
        token: loginResponse.data.token,
        user: loginResponse.data.user,
        auth: loginResponse.data.role,
        email: loginResponse.data.email,
      });

      localStorage.setItem(
        "iicra-token",
        JSON.stringify(loginResponse.data.role)
      );
      localStorage.setItem("x-auth-token", loginResponse.data.token);

      let credentials = {
        loginType,
        email,
        password,
        role: loginResponse.data.role,
      };

      if (loginResponse.data.token && loginResponse.data.role == "admin") {
        history.push("/dashboard");
      } else if (loginResponse.data.token) {
        history.push({
          pathname: "/auth/twoFactor",
          state: credentials,
        });
      }
      // if (loginResponse.data.role == "admin") {
      //   history.push({ pathname: "/dashboard", auth: loginResponse.data.role });
      // } else if (loginResponse.data.role == "claimant") {
      //   history.push("/claimant");
      // } else if (loginResponse.data.role == "respondent") {
      //   history.push("/respondent");
      //   alert("here");
      // } else if (loginResponse.data.role == "arbitrator") {
      //   history.push("/arbitrator");
      // } else if (loginResponse.data.role == "witness") {
      //   history.push("/witness/cases");
      // } else if (loginResponse.data.role == "rapporteur") {
      //   history.push("/rapporteur");
      // } else if (loginResponse.data.role == "interpreter") {
      //   history.push("/interpreter");
      // } else if (loginResponse.data.role == "expert") {
      //   history.push("/expert");
      // } else {
      //   history.push("/login");
      // }
    } catch (err) {
      setError("All fields are required");
    }
  };

  return (
    <Container style={styles.formUserContainer}>
      <Row>
        <Col md={3} lg={3} xl={3}></Col>
        <Col sm={12} md={6} lg={6} xl={6}>
          <Card className="shadow-lg" style={styles.card}>
            <CardBody>
              <Form onSubmit={submit}>
                <Row>
                  <Col sm={12} md={12} lg={12} xl={12}>
                    <FormGroup>
                      <Label>Role</Label>
                      <Input
                        autoFocus
                        type="select"
                        id="loginType"
                        onChange={(e) => setLoginType(e.target.value)}
                      >
                        <option>Select</option>
                        <option>Claimant</option>
                        <option>Respondent</option>
                        <option>Arbitrator</option>
                        <option>Rapporteur</option>
                        <option>Witness</option>
                        <option>Interpretor</option>
                        <option>Admin</option>
                        <option>Expert</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12} md={12} lg={12} xl={12}>
                    <FormGroup>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                      ></Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12} md={12} lg={12} xl={12}>
                    <FormGroup>
                      <Label>Password</Label>
                      <Input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
              <Button className="mr-2" onClick={submit}>
                Submit
              </Button>
              {error && (
                <p
                  style={{
                    color: "red",
                    textAlign: "center",
                    display: "inline",
                    float: "right",
                  }}
                >
                  Not Authorised
                  {/* {error} */}
                </p>
              )}
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
    // backgroundImage: `url(${formBg})`,
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
  },
  head: {
    textAlign: "right",
  },
  card: {
    borderRadius: "10px",
    marginTop: "20vh",
  },
};

export default Login;
