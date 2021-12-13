import React from "react";
import { Container, Card, CardBody } from "reactstrap";

const Reconciliation = () => {
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
                    ? "Click the “Guest” Reconciliation Section."
                    : `انقر فوق قسم التسوية "الضيف".`}
                </li>
                <li>
                  {document.dir == "ltr"
                    ? "Click and complete the Request for Conciliation (RFC)."
                    : "انقر واستكمل طلب التوفيق (RFC)."}
                </li>
                <li>
                  {document.dir == "ltr"
                    ? "Registration of Reconciliation Case is “Free of Charge”"
                    : `تسجيل قضية التصالح "مجاني"`}
                </li>
                <li>
                  {document.dir == "ltr"
                    ? "Notfication will be sent to the applicant via email regarding the status of case registration."
                    : "سيتم إرسال الإخطار إلى مقدم الطلب عبر البريد الإلكتروني فيما يتعلق بحالة تسجيل الحالة."}
                </li>
                <li>
                  {document.dir == "ltr"
                    ? "For the approved RFC, the applicant will receive information about how to access the IICRA online platform."
                    : "بالنسبة لـ RFC المعتمد ، سيتلقى مقدم الطلب معلومات حول كيفية الوصول إلى منصة IICRA عبر الإنترنت."}
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
                    ? "Click the “Member” Reconciliation Section"
                    : `انقر فوق قسم التسوية "الأعضاء"`}
                </li>
                <li>
                  {document.dir == "ltr"
                    ? "Log in with your “Email” and “Password”."
                    : `قم بتسجيل الدخول باستخدام "البريد الإلكتروني" و "كلمة المرور".`}
                </li>
                <li>
                  {document.dir == "ltr"
                    ? "Go to Reconciliation Section."
                    : "انتقل إلى قسم المصالحة."}
                </li>
                <li>
                  {document.dir == "ltr"
                    ? "Click and complete the Request for Conciliation (RFC)."
                    : "انقر واستكمل طلب التوفيق (RFC)."}
                </li>
                <li>
                  {document.dir == "ltr"
                    ? "Registration of Reconciliation Case is “Free of Charge”."
                    : `تسجيل قضية التصالح "مجاني".`}
                </li>
                <li>
                  {document.dir == "ltr"
                    ? "Notification will be sent to the applicant via email regarding the status of case registration."
                    : "سيتم إرسال إشعار إلى مقدم الطلب عبر البريد الإلكتروني فيما يتعلق بحالة تسجيل الحالة."}
                </li>
                <li>
                  {document.dir == "ltr"
                    ? "For the approved RFC, the applicant will receive information regarding the next step of arbitration proceeding."
                    : "بالنسبة لـ RFC المعتمد ، سيتلقى مقدم الطلب معلومات بخصوص الخطوة التالية من إجراءات التحكيم."}
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
                    ? "Click the “Member” Reconciliation Section"
                    : `انقر فوق قسم التسوية "الأعضاء"`}
                </li>
                <li>
                  {document.dir == "ltr"
                    ? "Log in with your “Email” and “Password”."
                    : `قم بتسجيل الدخول باستخدام "البريد الإلكتروني" و "كلمة المرور".`}
                </li>
                <li>
                  {document.dir == "ltr"
                    ? "Go to Reconciliation Section."
                    : "انتقل إلى قسم المصالحة."}
                </li>
                <li>
                  {document.dir == "ltr"
                    ? "Click the Reconciliation Case Number"
                    : "انقر فوق رقم حالة التسوية"}
                </li>
                <li>
                  {document.dir == "ltr"
                    ? "Update your information and submit the required document(s)."
                    : "حدِّث معلوماتك وأرسل المستند (المستندات) المطلوبة."}
                </li>
                <li>
                  {document.dir == "ltr"
                    ? "Notification regarding the next step of reconciliation proceeding will be sent to the party(ies) via email."
                    : "سيتم إرسال إشعار بشأن الخطوة التالية من إجراءات التسوية إلى الطرف (الأطراف) عبر البريد الإلكتروني."}
                </li>
              </ol>
            </p>
          </CardBody>
        </Card>
      </Card>
    </Container>
  );
};

export default Reconciliation;
