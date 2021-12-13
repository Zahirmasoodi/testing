import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Breadcrumb,
  BreadcrumbItem,
  Button,
} from "reactstrap";
import { useHistory } from "react-router";

const NotFound = (props) => {
  const role = localStorage.getItem("iicra-token");
  const history = useHistory();

  return (
    <>
      <Container
        fluid
        style={styles.crumbContainer}
        className={document.dir == "ltr" ? "text-left" : "text-right"}
      >
        <Row>
          <Col>
            {JSON.parse(role) == "admin" ? (
              <Breadcrumb>
                <BreadcrumbItem
                  onClick={() =>
                    props.history.push({
                      pathname: "/dashboard",
                    })
                  }
                  style={styles.crumbTabs}
                >
                  Dashboard
                </BreadcrumbItem>
                <BreadcrumbItem
                  onClick={() =>
                    props.history.push({
                      pathname: "/cases",
                    })
                  }
                  style={styles.crumbTabs}
                >
                  Cases
                </BreadcrumbItem>
              </Breadcrumb>
            ) : null}
            {JSON.parse(role) == "claimant" ||
            JSON.parse(role) == "respondent" ||
            JSON.parse(role) == "arbitrator" ||
            JSON.parse(role) == "rapporteur" ||
            JSON.parse(role) == "expert" ||
            JSON.parse(role) == "witness" ? (
              <Breadcrumb>
                <BreadcrumbItem
                  onClick={() =>
                    props.history.push({
                      pathname: `/${role.split(`"`)[1]}`,
                    })
                  }
                  style={styles.crumbTabs}
                >
                  Cases
                </BreadcrumbItem>
              </Breadcrumb>
            ) : null}
          </Col>
        </Row>
      </Container>
      <Container style={styles.formUserContainer} className="text-center">
        <Row>
          <Col>
            <Card style={styles.cardBg}>
              <CardBody>
                <h1 style={{ color: "green", paddingTop: "10%" }}>
                  {document.dir == "ltr" ? "404! Not Found" : "404! غير موجود"}
                </h1>
                <h4>
                  {document.dir == "ltr"
                    ? "Sorry, Link is Broken."
                    : "الارتباط معطل"}
                </h4>
                <Button
                  color="success"
                  className="pl-3 pr-3"
                  onClick={() => history.goBack()}
                >
                  {document.dir == "ltr" ? "Go Back" : "عد"}
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

const styles = {
  formUserContainer: {
    textAlign: "center",
    padding: 0,
    marginTop: "10vh",
    // backgroundColor: "#f6f6f6",
    // minHeight: "70vh",
  },
  cardBg: {
    minHeight: "70vh",
    borderRadius: "10px",
  },
  crumbContainer: {
    width: "100vw",
    position: "fixed",
    top: "8vh",
    paddingLeft: "0px",
    paddingRight: "0px",
    zIndex: 9,
  },
  crumb: { color: "green", cursor: "not-allowed" },
  crumbTabs: {
    cursor: "pointer",
  },
};
export default NotFound;
