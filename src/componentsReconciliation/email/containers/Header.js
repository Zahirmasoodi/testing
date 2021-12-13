import React from "react";
import { Container, Row, Col, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { useHistory } from "react-router-dom";

function Header(props) {
  const role = JSON.parse(localStorage.getItem("iicra-token"));

  const history = useHistory();
  return (
    <Container fluid style={styles.crumbContainer}>
      <Row>
        <Col>
          {role == "admin" ? (
            <Breadcrumb>
              <BreadcrumbItem
                onClick={() =>
                  history.push({
                    pathname: "/dashboard",
                  })
                }
                style={styles.crumbTabs}
              >
                Dashboard
              </BreadcrumbItem>
              <BreadcrumbItem
                onClick={() =>
                  history.push({
                    pathname: "/cases",
                  })
                }
                style={styles.crumbTabs}
              >
                Cases
              </BreadcrumbItem>
              <BreadcrumbItem
                onClick={() =>
                  history.push({
                    pathname: "/cases/expanded",
                    state: props.data,
                  })
                }
                style={styles.crumbTabs}
              >
                Details
              </BreadcrumbItem>
              <BreadcrumbItem
                onClick={() =>
                  history.push({
                    pathname: "/cases/timeline",
                    state: props.data,
                  })
                }
                style={styles.crumbTabs}
              >
                Timeline
              </BreadcrumbItem>
              <BreadcrumbItem
                onClick={() =>
                  history.push({
                    pathname: `/cases/${props.stepPathPrev}`,
                    state: props.data,
                  })
                }
                style={styles.crumbTabs}
              >
                {props.stepName}
              </BreadcrumbItem>
              <BreadcrumbItem
                onClick={() =>
                  history.push({
                    pathname: `/email/${props.stepPath}`,
                    state: props.data,
                  })
                }
                style={styles.crumbTabs}
              >
                Templates
              </BreadcrumbItem>
              <BreadcrumbItem style={styles.crumb}>
                {props.name} - {props.data._id}
              </BreadcrumbItem>
            </Breadcrumb>
          ) : null}
          {role == "claimant" ||
          role == "respondent" ||
          role == "arbitrator" ||
          role == "rapporteur" ||
          role == "expert" ||
          role == "witness" ? (
            <Breadcrumb>
              <BreadcrumbItem
                onClick={() =>
                  history.push({
                    pathname: `/${role}`,
                  })
                }
                style={styles.crumbTabs}
              >
                Cases
              </BreadcrumbItem>
              <BreadcrumbItem
                onClick={() =>
                  history.push({
                    pathname: "/cases/expanded",
                    state: props.data,
                  })
                }
                style={styles.crumbTabs}
              >
                Details
              </BreadcrumbItem>
              <BreadcrumbItem
                onClick={() =>
                  history.push({
                    pathname: "/cases/timeline",
                    state: props.data,
                  })
                }
                style={styles.crumbTabs}
              >
                Timeline
              </BreadcrumbItem>
              <BreadcrumbItem
                onClick={() =>
                  history.push({
                    pathname: `/cases/${props.stepPathPrev}`,
                    state: props.data,
                  })
                }
                style={styles.crumbTabs}
              >
                {props.stepName}
              </BreadcrumbItem>
              <BreadcrumbItem
                onClick={() =>
                  history.push({
                    pathname: `/email/${props.stepPath}`,
                    state: props.data,
                  })
                }
                style={styles.crumbTabs}
              >
                Templates
              </BreadcrumbItem>
              <BreadcrumbItem style={styles.crumb}>
                {props.name} - {props.data._id}
              </BreadcrumbItem>
            </Breadcrumb>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
}

const styles = {
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

export default Header;
