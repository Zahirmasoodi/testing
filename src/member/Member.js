import axios from "axios";
import { useEffect, useState } from "react";
import { getEnvironment } from "../config";
import { Container, Row, Col, Table, Card, CardBody } from "reactstrap";

const Member = (props) => {
  const baseURL = getEnvironment().apiUrl;
  const [member, setMember] = useState({
    name: "",
    email: "",
    logo: "",
  });

  useEffect(() => {
    axios.get(`${baseURL}/form/member/${props.location.state}`).then((res) => {
      setMember({
        ...member,
        name: res.data.name,
        email: res.data.email,
        logo: res.data.logo,
      });
      console.log(res.data, "here");
    });
  }, []);
  return (
    <Container style={styles.formUserContainer} className="shadow">
      <Row>
        <Col>
          <Card style={styles.cardBg}>
            <h6 className="pr-2" style={styles.center}>
              {props.location.state}
            </h6>
            <CardBody>
              <Table striped bordered hover>
                <tbody>
                  <tr>
                    <td>{member.name}</td>
                  </tr>
                  <tr>
                    <td>{member.email}</td>
                  </tr>
                  <tr onClick={() => console.log(member.logo)}>
                    <img
                      style={{ height: "300px" }}
                      src={`${baseURL}/${member.logo}`}
                      alt="member logo"
                    />
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
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
    padding: "1vh",
    borderRadius: "5px",
    cursor: "not-allowed",
  },
  formUserContainer: {
    marginTop: "10vh",
    paddingTop: "5vh",
    paddingBottom: "3vh",
    backgroundColor: "#f6f6f6",
    minHeight: "79vh",
  },
  cardBg: {
    backgroundColor: "#f6f6f6",
    border: "none",
  },
  crumbContainer: {
    width: "100vw",
    position: "fixed",
    top: "8vh",
    paddingLeft: "0px",
    paddingRight: "0px",
    zIndex: 9,
  },
  crumb: { color: "green" },
  crumbTabs: {
    cursor: "pointer",
  },
};

export default Member;
