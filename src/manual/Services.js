import React from "react";
import { Container, Card, CardBody, Row, Col } from "reactstrap";
import services1 from "../assets/services1.jpg";
import services2 from "../assets/services2.jpg";
import services3 from "../assets/services3.jpg";
import services4 from "../assets/services4.jpg";
import services5 from "../assets/services5.jpg";
import services6 from "../assets/services6.jpg";
import services7 from "../assets/services7.jpg";
import services8 from "../assets/services8.jpg";
import services9 from "../assets/services9.jpg";
import services10 from "../assets/services10.jpg";
import services11 from "../assets/services11.jpg";
import services12 from "../assets/services12.jpg";

const Services = () => {
  return (
    <Container className="mt-5 pb-5">
      <Card className="p-1">
        <Card className="shadow">
          <CardBody style={{ textAlign: "center" }}>
            <h3 style={{ textAlign: "left", color: "#008f53" }}>
              {document.dir == "ltr" ? "IICRA Rules 2020" : "قواعد IICRA 2020"}
            </h3>
            <p style={{ textAlign: "justify", fontSize: "16px" }}>
              <b style={{ color: "#A4865C" }}>
                {document.dir == "ltr" ? "SPECIALIZATION :" : "تخصص: "}
              </b>

              {document.dir == "ltr"
                ? "IICRA has launched an online platform for dispute resolution through Reconciliation and Arbitration in accordance with the updated IICRA Rules of 2020, along with its annexes and attachments thereto."
                : "أطلقت IICRA منصة عبر الإنترنت لتسوية المنازعات من خلال المصالحة والتحكيم وفقًا لقواعد IICRA المحدثة لعام 2020 ، جنبًا إلى جنب مع ملحقاتها ومرفقاتها."}
            </p>
          </CardBody>
        </Card>
        <Card className="shadow mt-1">
          <CardBody
            style={{
              textAlign: "center",
              backgroundColor: "#008F53",
              color: "white",
            }}
          >
            <h3 style={{ textAlign: "left", color: "#A4865C" }}>
              {document.dir == "ltr"
                ? "IICRA ONLINE SERVICES"
                : "خدمات IICRA عبر الإنترنت"}
            </h3>
            <p style={{ textAlign: "justify", fontSize: "16px" }}>
              {document.dir == "ltr"
                ? `This platform operates exclusively online. The objective of this
              platform is to allow the parties to resolve their dispute with the
              use of electronic technology. The benets of this online platform
              include:`
                : `تعمل هذه المنصة حصريًا عبر الإنترنت. الهدف من هذه المنصة هو السماح للأطراف بحل نزاعهم باستخدام التكنولوجيا الإلكترونية. تشمل مزايا هذه المنصة عبر الإنترنت:`}
            </p>
            <Row>
              <Col lg={1} md={2} sm={3}>
                <img src={services1} style={{ width: "100%" }} />
              </Col>
              <Col lg={10} md={8} sm={9}>
                <p style={{ textAlign: "justify", fontSize: "16px" }}>
                  <u>
                    {document.dir == "ltr" ? "24/7 Access: " : "24/7 الوصول: "}
                  </u>
                  {document.dir == "ltr"
                    ? "Participants can instantly view and monitor the status of their arbitration /conciliation cases anytime via this online platform. This will help them manage their cases more eectively."
                    : "يمكن للمشاركين عرض حالة قضايا التحكيم / التصالح الخاصة بهم ومراقبتها على الفور في أي وقت عبر هذه المنصة عبر الإنترنت. سيساعدهم هذا في إدارة قضاياهم بشكل أكثر فعالية."}
                </p>
              </Col>
            </Row>
            <Row>
              <Col lg={1} md={2} sm={3}>
                <img src={services2} style={{ width: "100%" }} />
              </Col>
              <Col lg={10} md={8} sm={9}>
                <p style={{ textAlign: "justify", fontSize: "16px" }}>
                  <u>
                    {document.dir == "ltr"
                      ? "User-friendly: "
                      : "سهل الاستخدام: "}
                  </u>
                  {document.dir == "ltr"
                    ? "It applies the simple user interface design that allows any of the two parties to attend in online arbitration/conciliation without proper training or legal representation."
                    : "يطبق تصميم واجهة المستخدم البسيط الذي يسمح لأي من الطرفين بالحضور في التحكيم / التوفيق عبر الإنترنت دون تدريب مناسب أو تمثيل قانوني."}
                </p>
              </Col>
            </Row>
            <Row>
              <Col lg={1} md={2} sm={3}>
                <img src={services3} style={{ width: "100%" }} />
              </Col>
              <Col lg={10} md={8} sm={9}>
                <p style={{ textAlign: "justify", fontSize: "16px" }}>
                  <u>{document.dir == "ltr" ? "Security: " : "حماية: "}</u>
                  {document.dir == "ltr"
                    ? "It applies 2-way authentication. This platform ensures that nobody can observe any details or evidence without being authorized."
                    : "يتم تطبيق المصادقة ثنائية الاتجاه. يضمن هذا النظام الأساسي عدم تمكن أي شخص من مراقبة أي تفاصيل أو أدلة دون الحصول على إذن."}
                </p>
              </Col>
            </Row>
            <Row>
              <Col lg={1} md={2} sm={3}>
                <img src={services4} style={{ width: "100%" }} />
              </Col>
              <Col lg={10} md={8} sm={9}>
                <p style={{ textAlign: "justify", fontSize: "16px" }}>
                  <u>
                    {document.dir == "ltr"
                      ? "Integrity & Condentiality: "
                      : "النزاهة والوثوقية: "}
                  </u>
                  {document.dir == "ltr"
                    ? "Passwords and hash are stored in database. Even the Administrator has no access to passwords."
                    : "يتم تخزين كلمات المرور والتجزئة في قاعدة البيانات. حتى المسؤول ليس لديه حق الوصول إلى كلمات المرور."}
                </p>
              </Col>
            </Row>
            <Row>
              <Col lg={1} md={2} sm={3}>
                <img src={services5} style={{ width: "100%" }} />
              </Col>
              <Col lg={10} md={8} sm={9}>
                <p style={{ textAlign: "justify", fontSize: "16px" }}>
                  <u>
                    {document.dir == "ltr"
                      ? "Information Access: "
                      : "الوصول إلى المعلومات: "}
                  </u>
                  {document.dir == "ltr"
                    ? "This platform is available and can be viewed on your device, whether you are on your laptop, tablet, or mobile devices."
                    : "هذه المنصة متاحة ويمكن عرضها على جهازك ، سواء كنت تستخدم الكمبيوتر المحمول أو الكمبيوتر اللوحي أو الأجهزة المحمولة."}
                </p>
              </Col>
            </Row>
            <Row>
              <Col lg={1} md={2} sm={3}>
                <img src={services6} style={{ width: "100%" }} />
              </Col>
              <Col lg={10} md={8} sm={9}>
                <p style={{ textAlign: "justify", fontSize: "16px" }}>
                  <u>
                    {document.dir == "ltr"
                      ? "Cross Browser Compatibility: "
                      : "التوافق عبر المتصفح: "}
                  </u>
                  {document.dir == "ltr"
                    ? "This platform is fully compatible across dierent browsers."
                    : "هذا النظام الأساسي متوافق تمامًا عبر المتصفحات المختلفة."}
                </p>
              </Col>
            </Row>
            <Row>
              <Col lg={1} md={2} sm={3}>
                <img src={services7} style={{ width: "100%" }} />
              </Col>
              <Col lg={10} md={8} sm={9}>
                <p style={{ textAlign: "justify", fontSize: "16px" }}>
                  <u>
                    {document.dir == "ltr"
                      ? "Secure Document Sharing: "
                      : "مشاركة آمنة للمستندات: "}
                  </u>
                  {document.dir == "ltr"
                    ? "It allows documents to be uploaded and have them only visible to the parties to the dispute."
                    : "يسمح بتحميل المستندات وجعلها مرئية فقط لأطراف النزاع."}
                </p>
              </Col>
            </Row>
            <Row>
              <Col lg={1} md={2} sm={3}>
                <img src={services8} style={{ width: "100%" }} />
              </Col>
              <Col lg={10} md={8} sm={9}>
                <p style={{ textAlign: "justify", fontSize: "16px" }}>
                  <u>
                    {document.dir == "ltr"
                      ? "Virtual Hearings: "
                      : "جلسات الاستماع الافتراضية: "}
                  </u>
                  {document.dir == "ltr"
                    ? "Conducting all or parts of a hearing in the form of a virtual hearing with all the disputing parties."
                    : "إجراء جلسة استماع كاملة أو أجزاء منها في شكل جلسة استماع افتراضية مع جميع الأطراف المتنازعة."}
                </p>
              </Col>
            </Row>
            <Row>
              <Col lg={1} md={2} sm={3}>
                <img src={services9} style={{ width: "100%" }} />
              </Col>
              <Col lg={10} md={8} sm={9}>
                <p style={{ textAlign: "justify", fontSize: "16px" }}>
                  <u>
                    {document.dir == "ltr"
                      ? "Case Stats & Calendar: "
                      : "احصائيات الحالة والتقويم: "}
                  </u>
                  {document.dir == "ltr"
                    ? "This platform adopted the dashboard view which provides the information about your case(s), pending work to be followed up, reminders or schedule event(s) so that everyone can log in simultaneously when it is required."
                    : "اعتمدت هذه المنصة عرض لوحة المعلومات الذي يوفر معلومات حول حالتك (حالاتك) ، والعمل المعلق الذي يتعين متابعته ، والتذكير أو جدولة الحدث (الأحداث) بحيث يمكن للجميع تسجيل الدخول في وقت واحد عندما يكون ذلك مطلوبًا."}
                </p>
              </Col>
            </Row>
            <Row>
              <Col lg={1} md={2} sm={3}>
                <img src={services10} style={{ width: "100%" }} />
              </Col>
              <Col lg={10} md={8} sm={9}>
                <p style={{ textAlign: "justify", fontSize: "16px" }}>
                  <u>
                    {document.dir == "ltr"
                      ? "On The Go Templates: "
                      : "قوالب:  On The Go"}
                  </u>
                  {document.dir == "ltr"
                    ? "Having templates ready to go means you don’t have to waste time building or drafting letter from scratch. Just use the templates you need according to the proceeding."
                    : "يعني وجود نماذج جاهزة للاستخدام أنك لست مضطرًا إلى إضاعة الوقت في بناء أو صياغة الخطاب من البداية. ما عليك سوى استخدام القوالب التي تحتاجها وفقًا للإجراءات."}
                </p>
              </Col>
            </Row>
            <Row>
              <Col lg={1} md={2} sm={3}>
                <img src={services11} style={{ width: "100%" }} />
              </Col>
              <Col lg={10} md={8} sm={9}>
                <p style={{ textAlign: "justify", fontSize: "16px" }}>
                  <u>
                    {document.dir == "ltr"
                      ? "Alerts Emails and Push Notifications: "
                      : "تنبيهات البريد الإلكتروني والإخطارات: "}
                  </u>
                  {document.dir == "ltr"
                    ? "Relay time-sensitive information regarding the development of proceedings."
                    : "ترحيل المعلومات الحساسة للوقت فيما يتعلق بتطوير الإجراءات."}
                </p>
              </Col>
            </Row>
            <Row>
              <Col lg={1} md={2} sm={3}>
                <img src={services12} style={{ width: "100%" }} />
              </Col>
              <Col lg={10} md={8} sm={9}>
                <p style={{ textAlign: "justify", fontSize: "16px" }}>
                  <u>
                    {document.dir == "ltr"
                      ? "Invoicing & Payments: "
                      : "الفواتير والمدفوعات: "}
                  </u>
                  {document.dir == "ltr"
                    ? "Issuing invoices and receive payments within the platform itself."
                    : "إصدار الفواتير واستلام المدفوعات داخل المنصة نفسها."}
                </p>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Card>
    </Container>
  );
};

export default Services;
