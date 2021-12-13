import React from "react";
import { Card, CardBody, Container, Row, Table, Col } from "reactstrap";

const costs = () => {
  return (
    <Container className="mt-3 pb-3" style={{ fontSize: "12px" }}>
      <Card>
        <Row>
          <Col className="text text-center pt-3">
            <h3 style={{ color: "#008F53" }}>
              {document.dir == "ltr"
                ? "TABLE OF ARBITRATION & RECONCILIATION COSTS"
                : "جدول تكاليف التحكيم والمصالحة"}
            </h3>
          </Col>
        </Row>
        <CardBody>
          <Row style={{ textAlign: "center" }}>
            <Col>
              <Table
                style={{ border: "2px solid #008F53" }}
                striped
                bordered
                hover
              >
                <thead>
                  <tr>
                    <th colSpan="4" style={{ color: "#008F53" }}>
                      <b>
                        {document.dir == "ltr"
                          ? "ICRA’s Administrative Fees in US Dollar"
                          : "الرسوم الإدارية لـ ICRA بالدولار الأمريكي"}
                      </b>
                    </th>
                  </tr>
                  <tr>
                    <th
                      colSpan="2"
                      style={{ backgroundColor: "#C1A987", color: "white" }}
                    >
                      {document.dir == "ltr"
                        ? "Amount in Dispute"
                        : "المبلغ المتنازع عليه"}
                    </th>
                    <th
                      colSpan="2"
                      rowSpan="2"
                      //   style={{ display: "flex", justifyContent: "center" }}
                      style={{ backgroundColor: "#008f53", color: "white" }}
                    >
                      {document.dir == "ltr"
                        ? "Administrative Fees"
                        : "الرسوم الإدارية"}
                    </th>
                  </tr>
                  <tr>
                    <th
                      colSpan="1"
                      style={{ backgroundColor: "#008f53", color: "white" }}
                    >
                      {document.dir == "ltr" ? "From" : "من عند"}
                    </th>
                    <th
                      colSpan="1"
                      style={{ backgroundColor: "#008f53", color: "white" }}
                    >
                      {document.dir == "ltr" ? "To" : "إلى"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="2">
                      {document.dir == "ltr"
                        ? "Up To 1,500,000"
                        : "ما يصل إلى 1500000"}
                    </td>
                    <td colSpan="2">2%</td>
                  </tr>
                  <tr>
                    <td colSpan="1">1,500,001</td>
                    <td colSpan="1">3,000,000</td>
                    <td colSpan="2">
                      {document.dir == "ltr"
                        ? "An amount of %1.6 + 15,000 on amounts e xceeding 1,500,000"
                        : "مبلغ 1.6٪ + 15.000 على المبالغ التي تزيد عن 1.500.000"}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="1">3,000,001</td>
                    <td colSpan="1">5,500,000</td>
                    <td colSpan="2">
                      {document.dir == "ltr"
                        ? "An amount of %0.8 + 25,000 on amounts exceeding 3,000,000"
                        : "مبلغ 0.8٪ + 25.000 على المبالغ التي تزيد عن 3.000.000"}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="1">5,500,001</td>
                    <td colSpan="1">10,000,000</td>
                    <td colSpan="2">
                      {document.dir == "ltr"
                        ? "An amount of %0.6 + 35,000 on amounts exceeding 5,500,000"
                        : "مبلغ 0.6٪ + 35000 على المبالغ التي تزيد عن 5،500،000"}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="1">10,000,001</td>
                    <td colSpan="1">15,000,000</td>
                    <td colSpan="2">
                      {document.dir == "ltr"
                        ? "An amount of %0.3 + 45,000 on amounts exceeding 10,000,000"
                        : "مبلغ 0.3٪ + 45.000 على المبالغ التي تزيد عن 10.000.000"}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="1">15,000,001</td>
                    <td colSpan="1">20,000,000</td>
                    <td colSpan="2">
                      {document.dir == "ltr"
                        ? "An amount of %0.2 + 55,000 on amounts exceeding 15,000,000"
                        : "مبلغ 0.2 + 55.000٪ على المبالغ التي تزيد عن 15.000.000"}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="1">20,000,001</td>
                    <td colSpan="1">30,000,000</td>
                    <td colSpan="2">
                      {document.dir == "ltr"
                        ? "An amount of %0.1 + 65,000 on amounts exceeding 20,000,000"
                        : "مبلغ 0.1٪ + 65.000 على المبالغ التي تزيد عن 20.000.000"}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      {document.dir == "ltr"
                        ? "More than 30,000,000"
                        : "أكثر من 30000000"}
                    </td>
                    <td colSpan="2">
                      {document.dir == "ltr"
                        ? "An amount of %0.05 + 75,000 on amounts exceeding 30,000,000"
                        : "مبلغ 0.05٪ + 75.000 على المبالغ التي تزيد عن 30.000.000"}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <Row style={{ textAlign: "center" }}>
            <Col>
              <Table
                style={{ border: "2px solid #008F53" }}
                striped
                bordered
                hover
              >
                <thead>
                  <tr>
                    <th colSpan="4" style={{ color: "#008F53" }}>
                      <b>
                        {document.dir == "ltr"
                          ? "Arbitral Tribunal’s Fee in US Dollar"
                          : "رسوم هيئة التحكيم بالدولار الأمريكي"}
                      </b>
                    </th>
                  </tr>
                  <tr>
                    <th
                      colSpan="2"
                      style={{ backgroundColor: "#C1A987", color: "white" }}
                    >
                      {document.dir == "ltr"
                        ? "Amount in Dispute"
                        : "المبلغ المتنازع عليه"}
                    </th>
                    <th
                      colSpan="2"
                      rowSpan="2"
                      //   style={{ display: "flex", justifyContent: "center" }}
                      style={{ backgroundColor: "#008f53", color: "white" }}
                    >
                      {document.dir == "ltr"
                        ? "Arbitrators’ Fees consisting of three arbitrators"
                        : "أتعاب المحكمين تتكون من ثلاثة محكمين"}
                    </th>
                  </tr>
                  <tr>
                    <th
                      colSpan="1"
                      style={{ backgroundColor: "#008f53", color: "white" }}
                    >
                      {document.dir == "ltr" ? "From" : "من عند"}
                    </th>
                    <th
                      colSpan="1"
                      style={{ backgroundColor: "#008f53", color: "white" }}
                    >
                      {document.dir == "ltr" ? "To" : "إلى"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="2">
                      {document.dir == "ltr"
                        ? "Up to 250,000"
                        : "ما يصل إلى 250000"}
                    </td>
                    <td colSpan="2">
                      {document.dir == "ltr"
                        ? "An amount of 17,500"
                        : "مبلغ 17500"}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="1">250,0001</td>
                    <td colSpan="1">750,000</td>
                    <td colSpan="2">
                      {document.dir == "ltr"
                        ? "An amount of %7.5 + 17,500 on amounts exceeding 250,000"
                        : "مبلغ 7.5٪ + 17،500 عن المبالغ التي تزيد عن 250،000"}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="1">750,001</td>
                    <td colSpan="1">1,500,000</td>
                    <td colSpan="2">
                      {document.dir == "ltr"
                        ? "An amount of %7 + 32,500 on amounts exceeding 750,000"
                        : "مبلغ 7٪ + 32،500 عن المبالغ التي تزيد عن 750،000"}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="1">1,500,001</td>
                    <td colSpan="1">3,000,000</td>
                    <td colSpan="2">
                      {document.dir == "ltr"
                        ? " An amount of %3 + 55,000 on amounts exceeding 1,500,000"
                        : "مبلغ 3٪ + 55.000 على المبالغ التي تزيد عن 1.500.000"}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="1">3,000,001</td>
                    <td colSpan="1">5,500,000</td>
                    <td colSpan="2">
                      {document.dir == "ltr"
                        ? "An amount of %1.85 + 75,000 on amounts exceeding 3,000,000"
                        : "مبلغ 1.85٪ + 75.000 على المبالغ التي تزيد عن 3.000.000"}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="1">5,500,001</td>
                    <td colSpan="1">10,000,000</td>
                    <td colSpan="2">
                      {document.dir == "ltr"
                        ? "An amount of %1 + 100,000 on amounts exceeding 5,500,000"
                        : "مبلغ 1٪ + 100،000 على المبالغ التي تزيد عن 5،500،000"}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="1">10,000,001</td>
                    <td colSpan="1">15,000,000</td>
                    <td colSpan="2">
                      {document.dir == "ltr"
                        ? "An amount of %0.65 + 125,000 on amounts exceeding 10,000,000"
                        : "مبلغ 0.65٪ + 125.000 عن المبالغ التي تزيد عن 10.000.000"}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="1">15,000,001</td>
                    <td colSpan="1">20,000,000</td>
                    <td colSpan="2">
                      {document.dir == "ltr"
                        ? "An amount of %0.45 + 150,000 on amounts exceeding 15,000,000"
                        : "مبلغ 0.45٪ + 150.000 عن المبالغ التي تزيد عن 15.000.000"}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="1">20,000,001</td>
                    <td colSpan="1">30,000,000</td>
                    <td colSpan="2">
                      {document.dir == "ltr"
                        ? "An amount of %0.25 + 170,000 on amounts exceeding 20,000,000"
                        : "مبلغ 0.25٪ + 170.000 عن المبالغ التي تزيد عن 20.000.000"}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      {document.dir == "ltr"
                        ? "More than 30,000,000"
                        : "أكثر من 30000000"}
                    </td>
                    <td colSpan="2">
                      {document.dir == "ltr"
                        ? "An amount of %0.05 + 190,000 on amounts exceeding 30,000,000"
                        : "مبلغ 0.05٪ + 190.000 عن المبالغ التي تزيد عن 30.000.000"}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Container>
  );
};

export default costs;
