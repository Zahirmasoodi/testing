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

const ContainerArbNotice = (props) => {
  const role = JSON.parse(localStorage.getItem("iicra-token"));

  const handleNavigation = (path) => {
    props.history.push({
      pathname: path,
      state: props.location.state,
    });
  };

  const list = [
    {
      path: "/email/transmission/transferMinutes",
      text: "Minutes of Handover of Case Files",
      textAr: "محضر تسليم ملفات القضية",
    },
    {
      path: "/email/transmission/filesHandedover",
      text: "Notice of Handing Over the Case File to the Tribunal",
      textAr: "إشعار بتسليم ملف القضية إلى المحكمة",
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
                  onClick={() => handleNavigation("/cases/transmission")}
                  className="crumbTabs"
                >
                  {document.dir == "ltr"
                    ? "Transmission of Arbitration File to Arbitrator(s)"
                    : "إحالة ملف التحكيم إلى المحكم"}
                </BreadcrumbItem>
                <BreadcrumbItem className="crumb">
                  {document.dir == "ltr" ? "Templates" : "القوالب"} -{" "}
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
                  onClick={() => handleNavigation("/cases/transmission")}
                  className="crumbTabs"
                >
                  {document.dir == "ltr"
                    ? "Transmission of Arbitration File to Arbitrator(s)"
                    : "إحالة ملف التحكيم إلى المحكم"}
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

export default ContainerArbNotice;
