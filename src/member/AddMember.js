import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Card,
  CardBody,
  Button,
  CustomInput,
  Input,
  Label,
} from "reactstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { getEnvironment } from "../config";
import Swal from "sweetalert2";

const AddMember = (props) => {
  const baseURL = getEnvironment().apiUrl;

  const history = useHistory();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [logo, setLogo] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const form = new FormData();

    if (!name || !email || !password || !logo) {
      console.log(name, "1 ", email, "2 ", password, "3 ", logo, "4");
      Swal.fire({ text: "All fields are mandatory", icon: "warning" });
    } else {
      form.append("email", email);
      form.append("name", name);
      form.append("password", password);
      form.append("passwordCheck", password);
      form.append("logo", logo);

      axios
        .post(`${baseURL}/form/add-member`, form)
        .then((res) => {
          Swal.fire({ text: "Member Added", icon: "success" });
        })
        .catch((err) =>
          Swal.fire({ text: err.response.data, icon: "success" })
        );
    }
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
                      <Label>Email</Label>
                      <Input
                        autoFocus
                        value={email}
                        type="email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup style={{ display: "inline" }}>
                  <Row>
                    <Col style={{ textAlign: "left" }}>
                      <Label>Password</Label>
                      <Input
                        value={password}
                        type="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup style={{ display: "inline" }}>
                  <Row>
                    <Col style={{ textAlign: "left" }}>
                      <Label>Name</Label>
                      <Input
                        value={name}
                        type="text"
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup style={{ display: "inline" }}>
                  <Row>
                    <Col style={{ textAlign: "left" }}>
                      <Label>Logo</Label>
                      <CustomInput
                        name="logo"
                        style={{
                          overflow: "hidden",
                          backgroundColor: "white",
                          border: "none",
                        }}
                        type="file"
                        accept="image/jpeg, image/jpg, image/png, image/gif"
                        label={
                          document.dir == "ltr"
                            ? "Upload an Image"
                            : "تحميل الملف"
                        }
                        type="file"
                        onChange={(e) => setLogo(e.target.files[0])}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Button
                    type="submit"
                    color="success"
                    // onClick={submit}
                    className="mt-3"
                  >
                    Submit
                  </Button>
                </FormGroup>
              </Form>
              {/* <Button
                type="submit"
                color="success"
                // onClick={submit}
                className="mt-3"
              >
                Submit
              </Button> */}
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

export default AddMember;
