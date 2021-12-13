import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Input,
  Button,
  FormGroup,
  Label,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Table,
} from "reactstrap";
import Swal from "sweetalert2";
import clc from "../assets/clc.png";

export class Calculator extends Component {
  state = {
    arbFee: "",
    iicraFee: "",
    numberOfArbitrators: "",
    valueOfDispute: "",
    selector: "Arbitration",
  };

  handleChange = (e) => {
    e.preventDefault();

    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleFee = () => {
    const { valueOfDispute, numberOfArbitrators } = this.state;

    if (this.state.selector == "Arbitration") {
      if (valueOfDispute > 0 && valueOfDispute <= 1500000) {
        this.setState({
          iicraFee: Math.floor(valueOfDispute * 0.02),
        });
      } else if (valueOfDispute >= 1500001 && valueOfDispute <= 3000000) {
        this.setState({
          iicraFee: Math.floor(15000 + (valueOfDispute - 1500000) * 0.016),
        });
      } else if (valueOfDispute >= 3000001 && valueOfDispute <= 5500000) {
        this.setState({
          iicraFee: Math.floor(25000 + (valueOfDispute - 3000000) * 0.008),
        });
      } else if (valueOfDispute >= 5500001 && valueOfDispute <= 10000000) {
        this.setState({
          iicraFee: Math.floor(35000 + (valueOfDispute - 5500000) * 0.006),
        });
      } else if (valueOfDispute >= 10000001 && valueOfDispute <= 15000000) {
        this.setState({
          iicraFee: Math.floor(45000 + (valueOfDispute - 10000000) * 0.003),
        });
      } else if (valueOfDispute >= 15000001 && valueOfDispute <= 20000000) {
        this.setState({
          iicraFee: Math.floor(55000 + (valueOfDispute - 15000000) * 0.002),
        });
      } else if (valueOfDispute >= 20000001 && valueOfDispute <= 30000000) {
        this.setState({
          iicraFee: Math.floor(65000 + (valueOfDispute - 20000000) * 0.001),
        });
      } else if (valueOfDispute >= 30000001) {
        this.setState({
          iicraFee: Math.floor(75000 + (valueOfDispute - 30000000) * 0.0005),
        });
      } else {
        this.setState({
          iicraFee: "",
          arbFee: "",
        });
        Swal.fire({
          title: "The Value of Dispute is not Valid!",
          icon: "info",
        });
      }
      if (numberOfArbitrators == 1 || numberOfArbitrators == "١") {
        if (valueOfDispute > 0 && valueOfDispute <= 250000) {
          this.setState({
            arbFee: 17500 / 2,
          });
        } else if (valueOfDispute >= 250000 && valueOfDispute <= 750000) {
          this.setState({
            arbFee: Math.floor(17500 + (valueOfDispute - 250000) * 0.075) / 2,
          });
        } else if (valueOfDispute >= 750001 && valueOfDispute <= 1500000) {
          this.setState({
            arbFee: Math.floor(32500 + (valueOfDispute - 750001) * 0.07) / 2,
          });
        } else if (valueOfDispute >= 1500001 && valueOfDispute <= 3000000) {
          this.setState({
            arbFee: Math.floor(55000 + (valueOfDispute - 1500001) * 0.03) / 2,
          });
        } else if (valueOfDispute >= 3000001 && valueOfDispute <= 5500000) {
          this.setState({
            arbFee: Math.floor(75000 + (valueOfDispute - 3000001) * 0.0185) / 2,
          });
        } else if (valueOfDispute >= 5500001 && valueOfDispute <= 10000000) {
          this.setState({
            arbFee: Math.floor(100000 + (valueOfDispute - 5500001) * 0.01) / 2,
          });
        } else if (valueOfDispute >= 10000001 && valueOfDispute <= 15000000) {
          this.setState({
            arbFee:
              Math.floor(125000 + (valueOfDispute - 10000001) * 0.0065) / 2,
          });
        } else if (valueOfDispute >= 15000001 && valueOfDispute <= 20000000) {
          this.setState({
            arbFee:
              Math.floor(150000 + (valueOfDispute - 15000001) * 0.0045) / 2,
          });
        } else if (valueOfDispute >= 20000001 && valueOfDispute <= 30000000) {
          this.setState({
            arbFee:
              Math.floor(170000 + (valueOfDispute - 20000001) * 0.0025) / 2,
          });
        } else if (valueOfDispute >= 30000001) {
          this.setState({
            arbFee:
              Math.floor(190000 + (valueOfDispute - 30000001) * 0.0005) / 2,
          });
        } else {
          this.setState({
            iicraFee: "",
            arbFee: "",
          });
          Swal.fire({
            title: "The Value of Dispute is not Valid!",
            icon: "info",
          });
        }
      } else if (numberOfArbitrators == 3 || numberOfArbitrators == "٣") {
        if (valueOfDispute > 0 && valueOfDispute <= 250000) {
          this.setState({
            arbFee: 17500,
          });
        } else if (valueOfDispute >= 250000 && valueOfDispute <= 750000) {
          this.setState({
            arbFee: Math.floor(17500 + (valueOfDispute - 250000) * 0.075),
          });
        } else if (valueOfDispute >= 750001 && valueOfDispute <= 1500000) {
          this.setState({
            arbFee: Math.floor(32500 + (valueOfDispute - 750001) * 0.07),
          });
        } else if (valueOfDispute >= 1500001 && valueOfDispute <= 3000000) {
          this.setState({
            arbFee: Math.floor(55000 + (valueOfDispute - 1500001) * 0.03),
          });
        } else if (valueOfDispute >= 3000001 && valueOfDispute <= 5500000) {
          this.setState({
            arbFee: Math.floor(75000 + (valueOfDispute - 3000001) * 0.0185),
          });
        } else if (valueOfDispute >= 5500001 && valueOfDispute <= 10000000) {
          this.setState({
            arbFee: Math.floor(100000 + (valueOfDispute - 5500001) * 0.01),
          });
        } else if (valueOfDispute >= 10000001 && valueOfDispute <= 15000000) {
          this.setState({
            arbFee: Math.floor(125000 + (valueOfDispute - 10000001) * 0.0065),
          });
        } else if (valueOfDispute >= 15000001 && valueOfDispute <= 20000000) {
          this.setState({
            arbFee: Math.floor(150000 + (valueOfDispute - 15000001) * 0.0045),
          });
        } else if (valueOfDispute >= 20000001 && valueOfDispute <= 30000000) {
          this.setState({
            arbFee: Math.floor(170000 + (valueOfDispute - 20000001) * 0.0025),
          });
        } else if (valueOfDispute >= 30000001) {
          this.setState({
            arbFee: Math.floor(190000 + (valueOfDispute - 30000001) * 0.0005),
          });
        } else {
          this.setState({
            iicraFee: "",
            arbFee: "",
          });
          Swal.fire({
            title: "The Value of Dispute is not Valid!",
            icon: "info",
          });
        }
      } else {
        this.setState({
          iicraFee: "",
          arbFee: "",
        });
        Swal.fire({
          title: "Please Select the Number of Arbitrators!",
          icon: "info",
        });
      }
    } else if (this.state.selector == "Reconciliation") {
      if (valueOfDispute > 0 && valueOfDispute <= 1500000) {
        this.setState({
          iicraFee: Math.floor((valueOfDispute * 0.02) / 2),
        });
      } else if (valueOfDispute >= 1500001 && valueOfDispute <= 3000000) {
        this.setState({
          iicraFee: Math.floor(
            (15000 + (valueOfDispute - 1500000) * 0.016) / 2
          ),
        });
      } else if (valueOfDispute >= 3000001 && valueOfDispute <= 5500000) {
        this.setState({
          iicraFee: Math.floor(
            (25000 + (valueOfDispute - 3000000) * 0.008) / 2
          ),
        });
      } else if (valueOfDispute >= 5500001 && valueOfDispute <= 10000000) {
        this.setState({
          iicraFee: Math.floor(
            (35000 + (valueOfDispute - 5500000) * 0.006) / 2
          ),
        });
      } else if (valueOfDispute >= 10000001 && valueOfDispute <= 15000000) {
        this.setState({
          iicraFee: Math.floor(
            (45000 + (valueOfDispute - 10000000) * 0.003) / 2
          ),
        });
      } else if (valueOfDispute >= 15000001 && valueOfDispute <= 20000000) {
        this.setState({
          iicraFee: Math.floor(
            (55000 + (valueOfDispute - 15000000) * 0.002) / 2
          ),
        });
      } else if (valueOfDispute >= 20000001 && valueOfDispute <= 30000000) {
        this.setState({
          iicraFee: Math.floor(
            (65000 + (valueOfDispute - 20000000) * 0.001) / 2
          ),
        });
      } else if (valueOfDispute >= 30000001) {
        this.setState({
          iicraFee: Math.floor(
            (75000 + (valueOfDispute - 30000000) * 0.0005) / 2
          ),
        });
      } else {
        this.setState({
          iicraFee: "",
          arbFee: "",
        });
        Swal.fire({
          title: "The Value of Dispute is not Valid!",
          icon: "info",
        });
      }

      if (valueOfDispute > 0 && valueOfDispute <= 250000) {
        this.setState({
          arbFee: 17500 / 2 / 2,
        });
      } else if (valueOfDispute >= 250000 && valueOfDispute <= 750000) {
        this.setState({
          arbFee:
            Math.floor((17500 + (valueOfDispute - 250000) * 0.075) / 2) / 2,
        });
      } else if (valueOfDispute >= 750001 && valueOfDispute <= 1500000) {
        this.setState({
          arbFee:
            Math.floor((32500 + (valueOfDispute - 750001) * 0.07) / 2) / 2,
        });
      } else if (valueOfDispute >= 1500001 && valueOfDispute <= 3000000) {
        this.setState({
          arbFee:
            Math.floor((55000 + (valueOfDispute - 1500001) * 0.03) / 2) / 2,
        });
      } else if (valueOfDispute >= 3000001 && valueOfDispute <= 5500000) {
        this.setState({
          arbFee:
            Math.floor((75000 + (valueOfDispute - 3000001) * 0.0185) / 2) / 2,
        });
      } else if (valueOfDispute >= 5500001 && valueOfDispute <= 10000000) {
        this.setState({
          arbFee:
            Math.floor((100000 + (valueOfDispute - 5500001) * 0.01) / 2) / 2,
        });
      } else if (valueOfDispute >= 10000001 && valueOfDispute <= 15000000) {
        this.setState({
          arbFee:
            Math.floor((125000 + (valueOfDispute - 10000001) * 0.0065) / 2) / 2,
        });
      } else if (valueOfDispute >= 15000001 && valueOfDispute <= 20000000) {
        this.setState({
          arbFee:
            Math.floor((150000 + (valueOfDispute - 15000001) * 0.0045) / 2) / 2,
        });
      } else if (valueOfDispute >= 20000001 && valueOfDispute <= 30000000) {
        this.setState({
          arbFee:
            Math.floor((170000 + (valueOfDispute - 20000001) * 0.0025) / 2) / 2,
        });
      } else if (valueOfDispute >= 30000001) {
        this.setState({
          arbFee:
            Math.floor((190000 + (valueOfDispute - 30000001) * 0.0005) / 2) / 2,
        });
      } else {
        this.setState({
          iicraFee: "",
          arbFee: "",
        });
        Swal.fire({
          title: "The Value of Dispute is not Valid!",
          icon: "info",
        });
      }
    }
  };

  render() {
    return (
      <Container
        style={{
          marginTop: "5vh",
          paddingTop: "5vh",
          backgroundColor: "#f6f6f6",
          fontSize: "15px",
          minHeight: "80vh",
          textAlign: document.dir == "ltr" ? "left" : "right",
        }}
        className="shadow"
      >
        <Row>
          <Col lg={4} md={4} sm={12} className="shadow-sm">
            <Row>
              <Col xl={8} lg={8} md={8} sm={8}>
                <FormGroup>
                  <InputGroup>
                    <Input
                      type="select"
                      name="selector"
                      onChange={this.handleChange}
                      defaultValue={this.state.selector}
                    >
                      <option>
                        {document.dir == "ltr" ? "Arbitration" : "تحكيم"}
                      </option>
                      <option>
                        {document.dir == "ltr" ? "Reconciliation" : "صلح"}
                      </option>
                    </Input>
                  </InputGroup>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xl={8} lg={8} md={8} sm={8}>
                <FormGroup>
                  <Label for="valueOfDispute">
                    {document.dir == "ltr"
                      ? "Value of Dispute"
                      : "قيمة النزاع "}{" "}
                  </Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>$</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      name="valueOfDispute"
                      onChange={this.handleChange}
                      defaultValue={this.state.valueOfDispute}
                    />
                  </InputGroup>
                </FormGroup>
              </Col>
            </Row>
            {this.state.selector == "Arbitration" && (
              <>
                <Row>
                  <Col>
                    <Label for="numberOfArbitrators">
                      {document.dir == "ltr"
                        ? `Select the Number of Arbitrator(s)`
                        : "عدد المحكمين لسير إجراءات التحكيم"}{" "}
                    </Label>
                  </Col>
                </Row>

                <Row>
                  <Col xl={4} lg={4} md={4} sm={4}>
                    <FormGroup>
                      {/* <Label for="numberOfArbitrators">
                    {document.dir == "ltr"
                      ? `Select the Number of Arbitrator(s)`
                      : "عدد المحكمين لسير إجراءات التحكيم"}{" "}
                  </Label> */}
                      <Input
                        type="select"
                        name="numberOfArbitrators"
                        onChange={this.handleChange}
                        defaultValue={this.state.numberOfArbitrators}
                      >
                        <option></option>
                        <option>{document.dir == "ltr" ? "1" : "١"}</option>
                        <option>{document.dir == "ltr" ? "3" : "٣"}</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
              </>
            )}
            <Row>
              <Col className="text-center mt-2 mb-2">
                <Button onClick={this.handleFee} color="success">
                  {document.dir == "ltr" ? "Calculate Fee" : "حساب الرسوم"}
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                {this.state.iicraFee ? (
                  <>
                    <label>Administrative Fee : </label>
                    <b> $ {this.state.iicraFee - this.state.iicraFee * 0.2}</b>
                  </>
                ) : null}
              </Col>
            </Row>

            <Row>
              <Col>
                {this.state.arbFee ? (
                  <>
                    <label>Arbitral Tribunal Fee : </label>
                    <b> $ {this.state.arbFee - this.state.arbFee * 0.2}</b>
                  </>
                ) : null}
              </Col>
            </Row>

            <Row>
              <Col>
                {this.state.iicraFee && this.state.arbFee ? (
                  <>
                    <label>Total Fee : </label> ${" "}
                    <s className="text text-danger">
                      {this.state.iicraFee + this.state.arbFee}{" "}
                    </s>{" "}
                    <b>
                      &nbsp;${" "}
                      {this.state.iicraFee -
                        this.state.iicraFee * 0.2 +
                        (this.state.arbFee - this.state.arbFee * 0.2)}
                    </b>
                  </>
                ) : null}
              </Col>
            </Row>

            {/* <Row>
              <Col>

              </Col>
            </Row> */}
          </Col>

          <Col lg={4} md={4} sm={12} className="shadow-sm">
            <Table bordered>
              <tbody style={{ textAlign: "justify" }}>
                <tr>
                  <td>
                    {document.dir == "ltr"
                      ? `1. This fee includes IICRA administrative fees, remuneration of Arbitral Tribunal, as well as 5% allocated amount to cover an additional expense for Arbitration (such as transportation expenses, arbitrators ’accommodation, translation costs, experts’ remuneration, etc.) and in case these expenses exceed the allocated amount, IICRA shall then mandate both parties or either of them to pay additional expenses (if any).`
                      : `1.	هذه الرسوم تشمل الرسوم الإدارية للمركز وأتعاب هيئة التحكيم، كما تشمل مبلغ قدره 5% مخصص لتغطية المصاريف الإضافية للتحكيم (على غرار مصاريف تنقل وسكن المحكمين، ونفقات الترجمة، وأتعاب خبراء الخ)، وفي حال تجاوزت تلك المصاريف ذلك المبلغ المخصص يقوم المركز بتكليف الأطراف أو أي منهم بسداد النفقات الإضافية (إن وجدت). `}
                  </td>
                </tr>
                <tr>
                  <td>
                    {document.dir == "ltr"
                      ? `2. If dispute is resolved by reconciliation, these fees then shall be reduced by half as per IICRA decision case by case.`
                      : `2.	في حال تم فض النزاع بالصلح، تخفض تلك الرسوم إلى النصف وفق القرار الصادر عن المركز حالة بحالة.`}
                  </td>
                </tr>
                <tr>
                  <td>
                    {document.dir == "ltr"
                      ? `3. With regard to IICRA being a non-profit organization, and in support of promoting Islamic Arbitration, IICRA is currently offering an additional 20% discount on the total arbitration cost & expenses, the arbitration expenses shown herewith are post applicable discount.`
                      : `3. في إطار عدم ربحية المركز، ودعمًا لنشر ثقافة التحكيم الإسلامي يمنح المركز حاليًا خصمًا إضافيًا قدره 20% على نفقات التحكيم الإجالية، بحيث تظهر لديكم نفقات التحكيم بعد تطبيق الخصم المشار إليه.`}
                  </td>
                </tr>
                <tr>
                  <td>
                    {document.dir == "ltr" ? (
                      <a href="#" target="_blank">
                        For more details, download (Regulations for Controlling
                        Arbitration and Conciliation Expenses)
                      </a>
                    ) : (
                      <a href="#" target="_blank">
                        لمزيد من التفاصيل حمل (لائحة ضبط نفقات التحكيم والصلح).
                      </a>
                    )}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>

          <Col
            className="shadow-sm"
            lg={4}
            md={4}
            sm={12}
            style={{
              backgroundImage: `url(${clc})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              minHeight: "400px",
            }}
          ></Col>
        </Row>
      </Container>
    );
  }
}

export default Calculator;
