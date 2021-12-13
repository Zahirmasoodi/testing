import { useState } from "react";
import axios from "axios";
import {
  Row,
  Col,
  Card,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
} from "reactstrap";
import { getEnvironment } from "../config";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import validator from "validator";

const ForgotPassword = () => {
  const baseURL = getEnvironment().apiUrl;
  const history = useHistory();
  const [load, setLoad] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validator.isEmail(email)) {
      setLoad(true);
      const formData = new FormData();
      formData.append("email", email);

      axios
        .post(`${baseURL}/form/forgot-password`, formData)
        .then((res) => {
          Swal.fire({
            text: "Reset Link Sent! Please Check Your Inbox.",
            icon: "success",
          });
          history.push("/memberLogin");
        })
        .catch((err) => {
          Swal.fire({ text: err.response.data.msg, icon: "warning" });
        })
        .finally(() => setLoad(false));
    } else {
      Swal.fire({ text: "Invalid Email", icon: "error" });
      setLoad(false);
    }
  };

  return (
    <Container className={document.dir == "ltr" ? "text-left" : "text-right"}>
      <Row className="justify-content-center">
        <Col
          lg={4}
          md={4}
          sm={6}
          style={{
            top: "calc(35%)",
            position: "absolute",
          }}
        >
          <Card className="bg-light border-1 border-secondary shadow-sm">
            <Form className="m-5" onSubmit={handleSubmit}>
              <FormGroup controlId="formBasicEmail">
                <Label className="text-muted">
                  {document.dir == "ltr" ? "Email" : "بريد إلكتروني"}
                </Label>
                <Input
                  required
                  type="email"
                  placeholder={
                    document.dir == "ltr"
                      ? "Enter email"
                      : "أدخل البريد الإلكتروني"
                  }
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>

              {error && (
                <FormGroup controlId="formBasicNotify">
                  <Label className="text-muted text-center text-danger">
                    <span className="text-danger">{error}</span>
                  </Label>
                </FormGroup>
              )}

              <FormGroup className="text-center" controlId="formBasicSubmit">
                {load ? (
                  <Button color="danger">
                    {document.dir == "ltr" ? "Wait" : "انتظر"}
                  </Button>
                ) : (
                  <Button color="warning" type="submit">
                    {document.dir == "ltr" ? "Reset" : "إعادة ضبط"}
                  </Button>
                )}
              </FormGroup>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;
