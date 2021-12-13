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
      path: "/email/inviteHearing/1",
      text: "Arbitral Tribunal Call to Attend the Main Hearing",
      textAr: "دعوة هيئة التحكيم لحضور الجلسة الرئيسية",
    },
    {
      path: "/email/inviteHearing/23",
      text: "Arbitral Tribunal Confirms to Reschedule the Arbitration Hearing",
      textAr: "تؤكد هيئة التحكيم إعادة جدولة جلسة التحكيم",
    },
    {
      path: "/email/inviteHearing/20",
      text: "Arbitral Tribunal Rejected the Request to Reschedule the Arbitration Hearing",
      textAr: "رفضت هيئة التحكيم طلب إعادة تحديد موعد جلسة التحكيم",
    },
    {
      path: "/email/inviteHearing/3",
      text: "Reminder to Attend the Hearing",
      textAr: "تذكير بحضور الجلسة",
    },
    {
      path: "/email/inviteHearing/4",
      text: "Appointment of an Expert",
      textAr: "تعيين خبير",
    },
    {
      path: "/email/inviteHearing/7",
      text: "Arbitral Tribunal Rejects the Request to Summon Witness(es)",
      textAr: "ترفض هيئة التحكيم طلب استدعاء الشاهد",
    },
    {
      path: "/email/inviteHearing/15",
      text: "Arbitral Tribunal Accepts the Request to Summon Witness(es)",
      textAr: "هيئة التحكيم تقبل طلب استدعاء الشاهد",
    },
    {
      path: "/email/inviteHearing/16",
      text: "Appointment of Simultaneous Interpreter",
      textAr: "تعيين مترجم فوري",
    },
    {
      path: "/email/inviteHearing/13",
      text: "Arbitral Tribunal Rejecting the Summon Certified Interpreter",
      textAr: "هيئة التحكيم رفض استدعاء المترجم المعتمد",
    },
    {
      path: "/cases/hearing/minutes",
      text: "Minutes of Hearing",
      textAr: "محضر الجلسة",
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
                  onClick={() => handleNavigation("/cases/prehearing")}
                  className="crumbTabs"
                >
                  {document.dir == "ltr"
                    ? "Invitation for Hearing"
                    : "دعوة للسمع"}
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
                  onClick={() => handleNavigation("/cases/prehearing")}
                  className="crumbTabs"
                >
                  {document.dir == "ltr"
                    ? "Invitation for Hearing"
                    : "دعوة للسمع"}
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
                {document.dir == "ltr" ? "Templates" : "القوالب"}
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
