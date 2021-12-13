import axios from "axios";
import { useEffect, useState } from "react";
import { getEnvironment } from "../config";
import { Container, Row, Col, Table, Card, CardBody } from "reactstrap";

const Members = (props) => {
  const baseURL = getEnvironment().apiUrl;
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios.get(`${baseURL}/form/members`).then((res) => {
      setMembers(res.data);
      console.log(res, "here");
    });
  }, []);
  return (
    <Container style={styles.formUserContainer} className="shadow">
      <Row>
        <Col>
          <Card style={styles.cardBg}>
            <h6 className="pr-2" style={styles.center}>
              All Members
            </h6>
            <CardBody>
              <Table striped bordered hover>
                <tbody>
                  {members.map((mem, index) => {
                    return (
                      <tr
                        key={index + 1}
                        onClick={() =>
                          props.history.push({
                            pathname: "/member/",
                            state: mem,
                          })
                        }
                      >
                        <td>{mem}</td>
                      </tr>
                    );
                  })}
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

export default Members;
