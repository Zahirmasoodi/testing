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
import pad from "../../../pad";
import "./containers.css";

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
      path: "/email/nominateArb/soleArbitrator",
      text: "Nomination of Sole Arbitrator",
      textAr: "ترشيح المحكم الوحيد",
    },
    {
      path: "/email/nominateArb/coArbitrator",
      text: "Nomination of the Chairman of Arbitral Tribunal",
      textAr: "ترشيح رئيس هيئة التحكيم",
    },

    {
      path: "/email/nominateArb/confirmSole",
      text: "Appointment of Sole Arbitrator",
      textAr: "تعيين محكم منفرد",
    },

    {
      path: "/email/nominateArb/confirmCo",
      text: "Appointment of Arbitral-Tribunal",
      textAr: "تعيين هيئة التحكيم",
    },

    {
      path: "/email/nominateArb/missionContract",
      text: "Mission Contract of Arbitrator",
      textAr: "عقد مهمة المحكم",
    },

    {
      path: "/email/nominateArb/soleNomRap",
      text: "Nomination of Arbitral Tribunal Secratary",
      textAr: "ترشيح هيئة التحكيم امين السر",
    },
    {
      path: "/email/nominateArb/missionContractRapSole",
      text: "Mission Contract of Arbitral Tribunal Secratary",
      textAr: "عقد مهمة هيئة التحكيم القضائية",
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
                  onClick={() => handleNavigation("/cases/nomination")}
                  className="crumbTabs"
                >
                  {document.dir == "ltr"
                    ? "Nomination and Appointment of the Arbitrator(s)"
                    : "ترشيح وتعيين المحكم"}
                </BreadcrumbItem>
                <BreadcrumbItem crumbTabs="crumb">
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
                  onClick={() => handleNavigation("/cases/nomination")}
                  className="crumbTabs"
                >
                  {document.dir == "ltr"
                    ? "Nomination and Appointment of the Arbitrator(s)"
                    : "ترشيح وتعيين المحكم"}
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
