import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Table,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import "./containers.css";
import pad from "../../../pad";

const ContainerRfa = (props) => {
  const role = JSON.parse(localStorage.getItem("iicra-token"));

  const handleNavigation = (path) => {
    props.history.push({
      pathname: path,
      state: props.location.state,
    });
  };

  const list = [
    {
      path: "/email/rfa/approved",
      text: "RFA - Approved",
      textAr: "تم موافقة طلب التحكيم",
    },
    {
      path: "/email/rfa/rejected",
      text: "RFA - Rejected",
      textAr: "تم رفض طلب التحكيم",
    },
    {
      path: "/email/rfa/pending",
      text: "RFA - Incomplete Information",
      textAr: "طلب التحكيم _ معلومات ناقصة",
    },
  ];

  return (
    <>
      <Container
        fluid
        className={
          document.dir == "ltr"
            ? "text-left crumbContainer"
            : "text-right crumbContainer"
        }
      >
        <Row>
          <Col>
            {role == "admin" ? (
              <Breadcrumb>
                <BreadcrumbItem
                  onClick={() => handleNavigation("/dashboard")}
                  className="crumbTabs"
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
                  onClick={() => handleNavigation("/cases/rfa")}
                  className="crumbTabs"
                >
                  {document.dir == "ltr" ? "RFA" : "طلب التحكيم"}
                </BreadcrumbItem>
                <BreadcrumbItem className="crumb">
                  {document.dir == "ltr" ? "Templates" : "القوالب"}-{" "}
                  {`ARB${props.location.state.createdAt.split("-")[0]}-${pad(
                    props.location.state.caseNumber
                  )}`}
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
                  onClick={() => handleNavigation("/cases/rfa")}
                  className="crumbTabs"
                >
                  {document.dir == "ltr" ? "RFA" : "طلب التحكيم"}
                </BreadcrumbItem>
                <BreadcrumbItem className="crumb">
                  {document.dir == "ltr" ? "Templates" : "القوالب"} -{" "}
                  {`ARB${props.location.state.createdAt.split("-")[0]}-${pad(
                    props.location.state.caseNumber
                  )}`}
                </BreadcrumbItem>
              </Breadcrumb>
            )}
          </Col>
        </Row>
      </Container>
      <Container className="shadow formUserContainer">
        <Row>
          <Col>
            <Card className="cardBg">
              <h6 className="center">
                {document.dir == "ltr" ? "Templates" : "نماذج"}
              </h6>
              <CardBody>
                <Table bordered hover className="table">
                  <tbody>
                    {list.map((menu, index) => {
                      return (
                        <tr className="border" key={index}>
                          <td onClick={() => handleNavigation(menu.path)}>
                            {document.dir == "ltr" ? menu.text : menu.textAr}
                          </td>
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
    </>
  );
};

export default ContainerRfa;
