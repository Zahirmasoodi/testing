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
      path: "/email/invitePrelimMeeting/11",
      text: "Acceptance of Request for Third Party Intervention",
      textAr: "قبول طلب تدخل طرف ثالث",
    },
    {
      path: "/email/invitePrelimMeeting/12",
      text: "Rejection of Request for Third Party Intervention",
      textAr: "رفض طلب تدخل طرف ثالث",
    },
    {
      path: "/email/invitePrelimMeeting/1",
      text: "Invitation to Attend the Preliminary Meeting",
      textAr: "دعوة لحضور الاجتماع التمهيدي",
    },
    {
      path: "/email/invitePrelimMeeting/3",
      text: "Confirmation to Reschedule the Preliminary Meeting",
      textAr: "تأكيد لإعادة جدولة الاجتماع التمهيدي",
    },
    {
      path: "/email/invitePrelimMeeting/9",
      text: "Rejection to Reschedule the Preliminary Meeting",
      textAr: "رفض إعادة جدولة الاجتماع التمهيدي",
    },
    {
      path: "/email/invitePrelimMeeting/7",
      text: "Reminder to Attend the Preliminary Meeting",
      textAr: "تذكير بحضور الاجتماع التمهيدي",
    },
    {
      path: "/email/prelimMeeting/2",
      text: "Virtual Minutes of Preliminary Meeting",
      textAr: "محاضر افتراضية للاجتماع التمهيدي - هيئة التحكيم",
    },
    {
      path: "/email/draftTerms/3",
      text: "Arbitral Tribunal Rejected the Request to Extend the Deadline Submission of Documents",
      textAr: "رفضت هيئة التحكيم طلب تمديد الموعد النهائي لتقديم المستندات",
    },
    {
      path: "/email/draftTerms/7",
      text: "Arbitral Tribunal Confirmation to Extend the Submission of Documents",
      textAr: "تأكيد هيئة التحكيم على تمديد تقديم المستندات",
    },
    {
      path: "/email/draftTerms/10",
      text: "FINAL Comments on Draft Terms of Reference by Arbitral Tribunal",
      textAr: "تعليقات نهائية على مسودة الاختصاصات من قبل هيئة التحكيم",
    },
    {
      path: "/email/draftTerms/12",
      text: "Final Terms of Reference (TOR)",
      textAr: "الاختصاصات النهائية (الاختصاصات)",
    },
    {
      path: "/email/draftTerms/15",
      text: "Confirmation for the Feedback on Draft TOR by Arbitral Tribunal",
      textAr: "تأكيد للتعليق على مسودة الاختصاصات من قبل هيئة التحكيم",
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
                  onClick={() => handleNavigation("/cases/meeting")}
                  className="crumbTabs"
                >
                  {document.dir == "ltr"
                    ? "Preliminary Meeting"
                    : "الاجتماع التمهيدي"}
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
                  onClick={() => handleNavigation("/cases/meeting")}
                  className="crumbTabs"
                >
                  {document.dir == "ltr"
                    ? "Preliminary Meeting"
                    : "الاجتماع التمهيدي"}
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
