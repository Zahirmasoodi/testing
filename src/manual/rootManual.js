import React from "react";
import { Container, Card, CardBody, Row, Col } from "reactstrap";

const RootManual = (props) => {
  const menu = [
    { header: "ADR", headerAr: "حل النزاع البديل", path: "/manual/adr" },
    {
      header: "Online Services",
      headerAr: "خدمات عبر الانترنت",
      path: "/manual/services",
    },
    { header: "Arbitration", headerAr: "تحكم", path: "/manual/arbitration" },
    {
      header: "Reconciliation",
      headerAr: "تصالح",
      path: "/manual/reconciliation",
    },
    { header: "Costs", headerAr: "التكاليف", path: "/manual/costs" },
  ];

  const handleNavigation = (data) => {
    props.history.push({
      pathname: data,
    });
  };

  return (
    <Container className="mt-5">
      <Card>
        <CardBody>
          {menu.map((el) => {
            return (
              <Row
                style={{
                  textAlign: "center",
                }}
                onClick={() => {
                  handleNavigation(el.path);
                }}
              >
                <Col className="mb-2">
                  <Card style={{ border: "1px dashed green" }}>
                    <CardBody id="manualMenu">
                      <b>{document.dir == "ltr" ? el.header : el.headerAr}</b>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            );
          })}
        </CardBody>
      </Card>
    </Container>
  );
};

export default RootManual;
