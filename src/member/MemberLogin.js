import {
  Container,
  Row,
  Col,
  Input,
  FormGroup,
  Label,
  Button,
  Card,
  CardBody,
  Form,
} from "reactstrap";
import { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import axios from "axios";
import { getEnvironment } from "../config";

const MemberLogin = () => {
  const baseURL = getEnvironment().apiUrl;

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };
      const loginResponse = await axios.post(
        `${baseURL}/form/member-login`,
        loginUser
      );

      if (loginResponse.data.msg) {
        setError(loginResponse.data.msg);
      }

      setUserData({
        token: loginResponse.data.token,
        // user: loginResponse.data.user,
        auth: loginResponse.data.role,
        email: loginResponse.data.email,
      });

      localStorage.setItem(
        "iicra-token",
        JSON.stringify(loginResponse.data.role)
      );

      localStorage.setItem("x-auth-token", loginResponse.data.token);

      let credentials = {
        email,
        password,
        role: loginResponse.data.role,
        // member: loginResponse.data.content,
      };

      if (loginResponse.data.token && loginResponse.data.role == "member") {
        history.push({ pathname: "/authenticateMember", state: credentials });
      }
    } catch (err) {
      console.log(err.response.data);
      setError(err.response.data);
    }
  };

  return (
    <Container className={document.dir == "ltr" ? "text-left" : "text-right"}>
      <Row style={styles.formUserContainer}>
        <Col style={{ width: "400px" }} sm={12} md={12} lg={12} xl={12}>
          <Card className="shadow-lg" style={styles.card}>
            <CardBody>
              <Form onSubmit={submit}>
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
                <Row>
                  <Col sm={12} md={12} lg={12} xl={12}>
                    <FormGroup>
                      <Link to="/memberForgotPassword">
                        {document.dir == "ltr"
                          ? "Forgot Password"
                          : "هل نسيت كلمة السر"}
                      </Link>
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
  formContainer: {
    textAlign: "center",
  },
  card: {
    borderRadius: "10px",
  },
};

export default MemberLogin;
