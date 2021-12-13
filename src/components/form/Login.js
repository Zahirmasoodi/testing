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
import { getEnvironment } from "../../config";
import Swal from "sweetalert2";

const Login = () => {
  const baseURL = getEnvironment().apiUrl;

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loginType, setLoginType] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    if (email != null && password != null && loginType != null) {
      const loginUser = { email, password, loginType };
      const loginResponse = await axios
        .post(`${baseURL}/form/login`, loginUser)
        .then((res) => {
          setUserData({
            token: res.data.token,
            user: res.data.user,
            auth: res.data.role,
            email: res.data.email,
          });

          localStorage.setItem("iicra-token", JSON.stringify(res.data.role));

          localStorage.setItem("x-auth-token", res.data.token);

          let credentials = {
            loginType,
            email,
            password,
            role: res.data.role,
          };

          if (res.data.token && res.data.role == "admin") {
            history.push("/dashboard");
          } else if (res.data.token) {
            history.push({
              pathname: "/auth/twoFactor",
              state: credentials,
            });
          }
        })
        .catch((err) => setError(err.response.data));
    } else {
      Swal.fire({ text: "All fields are required", icon: "warning" });
    }
  };

  return (
    <Container
      style={styles.formUserContainer}
      className={document.dir == "ltr" ? "text-left" : "text-right"}
    >
      <Row>
        <Col md={3} lg={3} xl={3}></Col>
        <Col sm={12} md={6} lg={6} xl={6}>
          <Card className="shadow-lg" style={styles.card}>
            <CardBody>
              <Form onSubmit={submit}>
                <Row>
                  <Col sm={12} md={12} lg={12} xl={12}>
                    <FormGroup>
                      <Label>{document.dir == "ltr" ? "Role" : "دور"}</Label>
                      <Input
                        autoFocus
                        type="select"
                        id="loginType"
                        onChange={(e) => setLoginType(e.target.value)}
                      >
                        <option>
                          {document.dir == "ltr" ? "Select" : "يختار"}
                        </option>
                        <option>
                          {document.dir == "ltr" ? "Claimant" : "المحتكم"}
                        </option>
                        <option>
                          {document.dir == "ltr" ? "Respondent" : "المحتكم ضده"}
                        </option>
                        <option>
                          {document.dir == "ltr" ? "Arbitrator" : "المحكم"}
                        </option>
                        <option>
                          {document.dir == "ltr" ? "Rapporteur" : "مقرر"}
                        </option>
                        <option>
                          {document.dir == "ltr" ? "Witness" : "الشاهد"}
                        </option>
                        <option>
                          {document.dir == "ltr" ? "Interpretor" : "مترجم"}
                        </option>
                        <option>
                          {document.dir == "ltr" ? "Admin" : "مشرف"}
                        </option>
                        <option>
                          {document.dir == "ltr" ? "Expert" : "خبير"}
                        </option>
                        <option>
                          {document.dir == "ltr"
                            ? "First Party"
                            : "الطرف الأول"}
                        </option>
                        <option>
                          {document.dir == "ltr"
                            ? "Second Party"
                            : "الطرف الثاني"}
                        </option>
                        <option>
                          {document.dir == "ltr" ? "Conciliator" : "موفق"}
                        </option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12} md={12} lg={12} xl={12}>
                    <FormGroup>
                      <Label>
                        {document.dir == "ltr" ? "Email" : "البريد الإلكتروني"}
                      </Label>
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
                      <Label>
                        {document.dir == "ltr" ? "Password" : "كلمه السر"}
                      </Label>
                      <Input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
              <Button className="mr-2 btn-success" onClick={submit}>
                {document.dir == "ltr" ? "Submit" : "إرسال"}
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
                  {error}
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
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
  },
  head: {
    textAlign: "right",
  },
  card: {
    borderRadius: "10px",
    marginTop: "15vh",
  },
};

export default Login;
