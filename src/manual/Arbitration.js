import React from "react";
import { Container, Card, CardBody } from "reactstrap";

const Arbitration = () => {
  return (
    <Container className="mt-5">
      <Card className="p-1">
        <Card className="shadow">
          <CardBody style={{ textAlign: "center" }}>
            <h3 style={{ textAlign: "left", color: "#008f53" }}>
              {document.dir == "ltr"
                ? "New User (Case Registration)"
                : "مستخدم جديد (تسجيل الحالة)"}
            </h3>
            <h4 style={{ color: "#A4865C" }}>
              {document.dir == "ltr"
                ? "Steps and Procedures"
                : "الخطوات والإجراءات"}
            </h4>
            <p style={{ textAlign: "justify", fontSize: "16px" }}>
              <ol>
                <li>
                  {document.dir == "ltr"
                    ? "Click the IICRA portal link http://portal.iicra.com/"
                    : "انقر فوق رابط بوابة IICRA http://portal.iicra.com/"}
                </li>
                <li>
                  {document.dir == "ltr"
                    ? "Click the “Guest” Arbitration Section."
                    : `انقر فوق قسم التحكيم "الضيف".`}
                </li>
                <li>
                  {document.dir == "ltr"
                    ? "Click and complete the Request for Arbitration (RFA)."
                    : "انقر واستكمل طلب التحكيم (RFA)."}
                </li>
                <li>
                  {document.dir == "ltr"
                    ? "Payment of USD 1000 for the registration of Arbitration case."
                    : "دفع مبلغ 1000 دولار أمريكي لتسجيل قضية التحكيم."}
                </li>
                <li>
                  {document.dir == "ltr"
                    ? "Notification will be sent to the applicant via email regarding the status of case registration."
                    : "سيتم إرسال إشعار إلى مقدم الطلب عبر البريد الإلكتروني فيما يتعلق بحالة تسجيل الحالة."}
                </li>
                <li>
                  {document.dir == "ltr"
                    ? "For the approved RFA, the applicant will receive information about how to access the IICRA online platform."
                    : "للحصول على RFA المعتمد ، سيتلقى مقدم الطلب معلومات حول كيفية الوصول إلى منصة IICRA عبر الإنترنت."}
                </li>
              </ol>
            </p>
          </CardBody>
        </Card>
        <Card className="shadow">
          <CardBody style={{ textAlign: "center" }}>
            <h3 style={{ textAlign: "left", color: "#008f53" }}>
              {document.dir == "ltr"
                ? "Member (Case Registration)"
                : "عضو (تسجيل الحالة)"}
            </h3>
            <h4 style={{ color: "#A4865C" }}>
              {document.dir == "ltr"
                ? "Steps and Procedures"
                : "الخطوات والإجراءات"}
            </h4>
            <p style={{ textAlign: "justify", fontSize: "16px" }}>
              <ol>
                <li>
                  {document.dir == "ltr"
                    ? "Click the IICRA portal link http://portal.iicra.com/"
                    : "انقر فوق رابط بوابة IICRA http://portal.iicra.com/"}
                </li>
                <li>
                  {document.dir == "ltr"
                    ? "Click the “Member” Arbitration Section"
                    : `انقر فوق قسم التحكيم "عضو"`}
                </li>
                <li>
                  {document.dir == "ltr"
                    ? `Log in with your “Email” and “Password”.`
                    : `قم بتسجيل الدخول باستخدام "البريد الإلكتروني" و "كلمة المرور".`}
                </li>
                <li>
                  {document.dir == "ltr"
                    ? "Go to Arbitration Section."
                    : "انتقل إلى قسم التحكيم."}
                </li>
                <li>
                  {document.dir == "ltr"
                    ? "Click and complete the Request for Arbitration (RFA)."
                    : "انقر واستكمل طلب التحكيم (RFA)."}
                </li>
                <li>
                  {document.dir == "ltr"
                    ? "Payment of USD 1000 for the registration of Arbitration case."
                    : "دفع مبلغ 1000 دولار أمريكي لتسجيل قضية التحكيم."}
                </li>
                <li>
                  {document.dir == "ltr"
                    ? "Notification will be sent to the applicant via email regarding the status of case registration."
                    : "سيتم إرسال إشعار إلى مقدم الطلب عبر البريد الإلكتروني فيما يتعلق بحالة تسجيل الحالة."}
                </li>
                <li>
                  {document.dir == "ltr"
                    ? "For the approved RFA, the applicant will receive information regarding the next step of arbitration proceeding."
                    : "إرسال إشعار إلى مقدم الطلب عبر البريد الإلكتروني الخاص بحالة تسجيل الحالة."}
                </li>
              </ol>
            </p>
          </CardBody>
        </Card>
        <Card className="shadow">
          <CardBody style={{ textAlign: "center" }}>
            <h3 style={{ textAlign: "left", color: "#008f53" }}>
              {document.dir == "ltr"
                ? "Member (Case Update)"
                : "عضو (تحديث حالة)"}
            </h3>
            <h4 style={{ color: "#A4865C" }}>
              {document.dir == "ltr"
                ? "Steps and Procedures"
                : "الخطوات والإجراءات"}
            </h4>
            <p style={{ textAlign: "justify", fontSize: "16px" }}>
              <ol>
                <li>
                  {document.dir == "ltr"
                    ? "Click the IICRA portal link http://portal.iicra.com/"
                    : "انقر فوق رابط بوابة IICRA http://portal.iicra.com/"}
                </li>
                <li>
                  {document.dir == "ltr"
                    ? "Click the “Member” Arbitration Section"
                    : `انقر فوق قسم التحكيم "عضو"`}
                </li>
                <li>
                  {document.dir == "ltr"
                    ? "Log in with your “Email” and “Password”."
                    : `قم بتسجيل الدخول باستخدام "البريد الإلكتروني" و "كلمة المرور".`}
                </li>
                <li>
                  {document.dir == "ltr"
                    ? "Go to Arbitration Section."
                    : "انتقل إلى قسم التحكيم."}
                </li>
                <li>
                  {document.dir == "ltr"
                    ? "Click the Arbitration Case Number"
                    : "انقر فوق رقم قضية التحكيم"}
                </li>
                <li>
                  {document.dir == "ltr"
                    ? "Update your information and submit the required document(s)."
                    : "حدِّث معلوماتك وأرسل المستند (المستندات) المطلوبة."}
                </li>
                <li>
                  {document.dir == "ltr"
                    ? "Notification regarding the next step of arbitration proceeding will be sent to the party(ies) via email."
                    : "سيتم إرسال إشعار بشأن الخطوة التالية من إجراءات التحكيم إلى الطرف (الأطراف) عبر البريد الإلكتروني."}
                </li>
              </ol>
            </p>
          </CardBody>
        </Card>
      </Card>
    </Container>
  );
};

export default Arbitration;
