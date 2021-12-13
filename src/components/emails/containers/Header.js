import React from "react";
import { Container, Row, Col, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { useHistory } from "react-router-dom";
import "./containers.css";
import pad from "../../../pad";

const Header = (props) => {
  const role = JSON.parse(localStorage.getItem("iicra-token"));

  const handleNavigation = (path) => {
    history.push({
      pathname: path,
      state: props.data,
    });
  };

  const history = useHistory();
  return (
    <Container fluid className="crumbContainer">
      <Row>
        <Col>
          {role == "admin" ? (
            <Breadcrumb>
              <BreadcrumbItem
                onClick={() => handleNavigation("/dashboard")}
                className="crumb"
              >
                {document.dir == "ltr" ? "Dashboard" : " لوحة القيادة"}
              </BreadcrumbItem>
              <BreadcrumbItem
                onClick={() => handleNavigation("/cases")}
                className="crumbTabs"
              >
                {document.dir == "ltr" ? "Cases" : " حالات"}
              </BreadcrumbItem>
              <BreadcrumbItem
                onClick={() => handleNavigation("/cases/expanded")}
                className="crumbTabs"
              >
                {document.dir == "ltr" ? "Details" : " تفاصيل"}
              </BreadcrumbItem>
              <BreadcrumbItem
                onClick={() => handleNavigation("/cases/timeline")}
                className="crumbTabs"
              >
                {document.dir == "ltr" ? "Timeline" : " الجدول الزمني"}
              </BreadcrumbItem>
              <BreadcrumbItem
                onClick={() => handleNavigation(`/cases/${props.stepPathPrev}`)}
                className="crumbTabs"
              >
                {props.stepName}
              </BreadcrumbItem>
              <BreadcrumbItem
                onClick={() => handleNavigation(`/email/${props.stepPath}`)}
                className="crumbTabs"
              >
                {document.dir == "ltr" ? "Templates" : "القوالب"}
              </BreadcrumbItem>
              <BreadcrumbItem className="crumb">
                {props.name} -
                {` ARB${props.data.createdAt.split("-")[0]}-${pad(
                  props.data.caseNumber
                )} `}
              </BreadcrumbItem>
            </Breadcrumb>
          ) : (
            <Breadcrumb>
              <BreadcrumbItem
                onClick={() => handleNavigation(`/${role}`)}
                className="crumbTabs"
              >
                {document.dir == "ltr" ? "Cases" : "حالات"}
              </BreadcrumbItem>
              <BreadcrumbItem
                onClick={() => handleNavigation("/cases/expanded")}
                className="crumbTabs"
              >
                {document.dir == "ltr" ? "Details" : "تفاصيل"}
              </BreadcrumbItem>
              <BreadcrumbItem
                onClick={() => handleNavigation("/cases/timeline")}
                className="crumbTabs"
              >
                {document.dir == "ltr" ? "Timeline" : "الجدول الزمني"}
              </BreadcrumbItem>
              <BreadcrumbItem
                onClick={() => handleNavigation(`/cases/${props.stepPathPrev}`)}
                className="crumbTabs"
              >
                {props.stepName}
              </BreadcrumbItem>
              <BreadcrumbItem
                onClick={() => handleNavigation(`/email/${props.stepPath}`)}
                className="crumbTabs"
              >
                {document.dir == "ltr" ? "Templates" : "القوالب"}
              </BreadcrumbItem>
              <BreadcrumbItem className="crumb">
                {props.name} -{" "}
                {` ARB${props.data.createdAt.split("-")[0]}-${pad(
                  props.data.caseNumber
                )} `}
              </BreadcrumbItem>
            </Breadcrumb>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
