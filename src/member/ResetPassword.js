import { useState } from "react";
import axios from "axios";
import {
  Button,
  Form,
  Card,
  Row,
  Col,
  Input,
  FormGroup,
  Label,
  Container,
} from "reactstrap";
import { getEnvironment } from "../config";
import { useParams, useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const Reset = () => {
  const baseURL = getEnvironment().apiUrl;

  const { token } = useParams();
  const history = useHistory();

  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password == "" || confirmPassword == "") {
      Swal.fire({ text: "All fields are mandatory", icon: "warning" });
    } else if (password !== confirmPassword) {
      Swal.fire({ text: "Passwords don't match", icon: "error" });
    } else {
      const formData = new FormData();
      formData.append("resetLink", token);
      formData.append("password", password);
      formData.append("confirmPassword", confirmPassword);

      axios
        .post(`${baseURL}/form/reset-password`, formData)
        .then(() => {
          history.push("/memberLogin");
        })
        .catch((err) =>
          Swal.fire({ text: "Something went Wrong", icon: "error" })
        );
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
            top: "35%",
            position: "absolute",
          }}
        >
          <Card className="bg-light border-1 border-secondary shadow-sm">
            <Form className="m-5" onSubmit={handleSubmit}>
              <FormGroup controlId="formBasicPassword">
                <Label className="text-muted">
                  {document.dir == "ltr" ? "Password" : "كلمه السر"}
                </Label>
                <Input
                  required
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>

              <FormGroup controlId="formBasicConfirmPassword">
                <Label className="text-muted">
                  {document.dir == "ltr"
                    ? "Confirm Password"
                    : "تأكيد كلمة المرور"}
                </Label>
                <Input
                  required
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </FormGroup>

              <FormGroup className="text-center" controlId="formBasicSubmit">
                <Button variant="primary" type="submit">
                  {document.dir == "ltr"
                    ? "Reset Password"
                    : "إعادة تعيين كلمة المرور"}
                </Button>
              </FormGroup>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Reset;
