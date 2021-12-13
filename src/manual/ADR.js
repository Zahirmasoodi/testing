import React from "react";
import { Container, Card, CardBody } from "reactstrap";
import adr from "../assets/adr.png";
const ADR = () => {
  return (
    <Container className="mt-5">
      <Card className="p-1">
        <Card className="shadow">
          <CardBody style={{ textAlign: "center" }}>
            <h3 className="text text-success">
              {document.dir == "ltr"
                ? "INTERNATIONAL ISLAMIC CENTRE FOR RECONCILIATION AND ARBITRATION (IICRA)"
                : "المركز الاسلامي الدولي للمصالحة والتحكيم"}
            </h3>
            <p style={{ textAlign: "justify", fontSize: "16px" }}>
              <b style={{ color: "#A4865C" }}>
                {document.dir == "ltr" ? "IICRA " : "المركز "}
              </b>
              {document.dir == "ltr"
                ? "is an international non-profit organization established in 2005 under International convention to be one of the infrastructure institutions of the Islamic Economy"
                : "هي منظمة دولية غير ربحية تأسست عام 2005 بموجب اتفاقية دولية لتكون واحدة من مؤسسات البنية التحتية للاقتصاد الإسلامي"}
            </p>
            <p style={{ textAlign: "justify", fontSize: "16px" }}>
              <b style={{ color: "#A4865C" }}>
                {document.dir == "ltr" ? "IICRA " : "المركز "}
              </b>
              {document.dir == "ltr"
                ? "objective is to enable all dealers of Islamic economy from the Islamic financial institutions, clients and other entities to settle all financial disputes with compliance of Shari’ah Law through institutional Reconciliation and Arbitration."
                : "الهدف هو تمكين جميع المتعاملين في الاقتصاد الإسلامي من المؤسسات المالية الإسلامية والعملاء والكيانات الأخرى لتسوية جميع النزاعات المالية مع الامتثال لأحكام الشريعة الإسلامية من خلال التوفيق والتحكيم المؤسسي."}
            </p>
          </CardBody>
        </Card>
        <Card className="shadow mt-1">
          <CardBody style={{ textAlign: "center" }}>
            <h3 className="text text-success">
              {document.dir == "ltr"
                ? "METHODS OF ALTERNATIVE DISPUTES RESOLUTION (ADR) IN IICRA"
                : "طرق حل النزاعات البديلة في المركز"}
            </h3>
            <p style={{ textAlign: "justify", fontSize: "16px" }}>
              <b style={{ color: "#A4865C" }}>
                {document.dir == "ltr" ? "RECONCILIATION " : "تصالح "}
              </b>
              {document.dir == "ltr"
                ? "IICRA adopts the reconciliation to adjudicate all disputes brought before it under arbitration basis."
                : "تتبنى IICRA المصالحة للفصل في جميع النزاعات المعروضة عليها على أساس التحكيم."}
            </p>
            <p style={{ textAlign: "justify", fontSize: "16px" }}>
              <b style={{ color: "#A4865C" }}>
                {document.dir == "ltr" ? "ARBITRATION " : "تحكم "}
              </b>
              {document.dir == "ltr"
                ? "IICRA manages the arbitration cases in accordance with the international practices through IICRA Rules."
                : "تدير IICRA قضايا التحكيم وفقًا للممارسات الدولية من خلال قواعد IICRA."}
            </p>
          </CardBody>
        </Card>
        <Card className="shadow mt-1">
          <CardBody style={{ textAlign: "center" }}>
            <h3 className="text text-success">
              {document.dir == "ltr"
                ? "SETTLING ALL KINDS OF DISPUTES"
                : "تسوية جميع أنواع النزاعات"}
            </h3>
            <div>
              <img src={adr} style={{ height: "100%", width: "100%" }} />
            </div>
          </CardBody>
        </Card>
        <Card className="shadow mt-1">
          <CardBody style={{ textAlign: "center" }}>
            <h3 className="text text-success">
              {document.dir == "ltr"
                ? "ESSENTIAL FEATURES OF ALTERNATIVE DISPUTE RESOLUTION IN IICRA"
                : "الميزات الأساسية لحل النزاع البديل في IICRA"}
            </h3>
            <p style={{ textAlign: "justify", fontSize: "16px" }}>
              <b style={{ color: "#A4865C" }}>
                {document.dir == "ltr" ? "SPECIALIZATION: " : "تخصص: "}
              </b>
              {document.dir == "ltr"
                ? `IICRA is a unique international platform specialized in settling
              all kinds of banking, nancial and commercial disputes through
              international reconciliation and arbitration with compliance of
              Shari’ah Law, by approving rigid proceedings for reviewing and
              auditing of the arbitration procedures and decisions.`
                : `IICRA هي منصة دولية فريدة من نوعها متخصصة في تسوية جميع أنواع المنازعات المصرفية والمالية والتجارية من خلال المصالحة الدولية والتحكيم مع الامتثال لأحكام الشريعة الإسلامية ، من خلال الموافقة على الإجراءات الصارمة لمراجعة وتدقيق إجراءات وقرارات التحكيم.`}
            </p>
            <p style={{ textAlign: "justify", fontSize: "16px" }}>
              <b style={{ color: "#A4865C" }}>
                {document.dir == "ltr" ? "PROFESSIONALISM: " : "احترافية: "}
              </b>
              {document.dir == "ltr"
                ? `IICRA applies the best internationally approved practices and
              standards for settlement on which the rules of reconciliation and
              arbitration of IICRA are based.`
                : "تطبق IICRA أفضل الممارسات والمعايير المعتمدة دوليًا للتسوية والتي تستند إليها قواعد المصالحة والتحكيم IICRA."}
            </p>
            <p style={{ textAlign: "justify", fontSize: "16px" }}>
              <b style={{ color: "#A4865C" }}>
                {document.dir == "ltr" ? "INDEPENDENCE: " : "استقلال: "}
              </b>
              {document.dir == "ltr"
                ? "IICRA’s organizational structure is composed of the General Assembly, Board of Trustees, Executive Committee and Secretary-General as traditionally recognized in an International organization."
                : "يتألف الهيكل التنظيمي لـ IICRA من الجمعية العامة ومجلس الأمناء واللجنة التنفيذية والأمين العام على النحو المعترف به تقليديًا في منظمة دولية "}
            </p>
            <p style={{ textAlign: "justify", fontSize: "16px" }}>
              <b style={{ color: "#A4865C" }}>
                {document.dir == "ltr"
                  ? "NON-PROFITABILITY: "
                  : "عدم الربحية: "}
              </b>
              {document.dir == "ltr"
                ? "IICRA seeks to keep the non-protability of its service fees which only covers its operational expenses. The total arbitration costs of any dispute, including IICRA administrative fees and arbitrators’ fes shall not exceed to 2% of the total value."
                : "تسعى IICRA إلى الحفاظ على عدم قابلية رسوم الخدمة الخاصة بها لتغطية تكاليف التشغيل فقط. إجمالي تكاليف التحكيم لأي نزاع ، بما في ذلك الرسوم الإدارية IICRA وأجرة المحكمين يجب ألا تتجاوز 2٪ من القيمة الإجمالية."}
            </p>
            <p style={{ textAlign: "justify", fontSize: "16px" }}>
              <b style={{ color: "#A4865C" }}>
                {document.dir == "ltr" ? "FLEXIBILITY: " : "المرونة: "}
              </b>
              {document.dir == "ltr"
                ? "In parallel with professionalism and eciency, IICRA guarantees the parties to exercise the exibility to choose number of arbitrators and nominate them, select the language and the venue of proceedings, and adapt time limits agreed upon by the parties."
                : "بالتوازي مع الاحتراف والكفاءة ، تضمن IICRA للأطراف ممارسة المرونة في اختيار عدد المحكمين وترشيحهم ، واختيار اللغة ومكان الإجراءات ، وتكييف الحدود الزمنية المتفق عليها بين الأطراف."}
            </p>
            <p style={{ textAlign: "justify", fontSize: "16px" }}>
              <b style={{ color: "#A4865C" }}>
                {document.dir == "ltr"
                  ? "MULTIFUNCTIONAL: "
                  : "متعدد الوظائف: "}
              </b>
              {document.dir == "ltr"
                ? "IICRA provides all disputes resolution services in one stop starting with conciliation, arbitration, training, appointment of experts and specialists, auditing of the decisions and draft awards from Shari’ah and Legal aspects."
                : "تقدم IICRA جميع خدمات تسوية المنازعات في مكان واحد بدءًا من التوفيق والتحكيم والتدريب وتعيين الخبراء والمتخصصين ومراجعة القرارات ومسودة القرارات من الجوانب الشرعية والقانونية."}
            </p>
            <p style={{ textAlign: "justify", fontSize: "16px" }}>
              <b style={{ color: "#A4865C" }}>
                {document.dir == "ltr" ? "CONFIDENTIALITY: " : "سرية: "}
              </b>
              {document.dir == "ltr"
                ? "The important advantage of arbitration in IICRA guarantees privacy and safeguard of case information disclosed only to those involved."
                : "الميزة المهمة للتحكيم في IICRA تضمن الخصوصية وحماية معلومات الحالة التي يتم الكشف عنها فقط للمشاركين."}
            </p>
            <p style={{ textAlign: "justify", fontSize: "16px" }}>
              <b style={{ color: "#A4865C" }}>
                {document.dir == "ltr" ? "INTERNATIONALITY: " : "الدولية: "}
              </b>
              {document.dir == "ltr"
                ? "IICRA as an international institution was established on 5 April 2005 which embodied the eorts of International Conventions concerned to support the Islamic nancial industry."
                : "تأسست IICRA كمؤسسة دولية في 5 أبريل 2005 والتي جسدت جهود الاتفاقيات الدولية المعنية بدعم الصناعة المالية الإسلامية."}
            </p>
            <p style={{ textAlign: "justify", fontSize: "16px" }}>
              <b style={{ color: "#A4865C" }}>
                {document.dir == "ltr" ? "EFFICIENT: " : "فعالة: "}
              </b>
              {document.dir == "ltr"
                ? "IICRA focuses on reduction of the terms of proceedings since the rules of IICRA dened the timeframe of six (6) months for rendering of the nal Arbitral Award from the date of hand over of arbitration le to the arbitral tribunal."
                : "تركز IICRA على تخفيض شروط الإجراءات لأن قواعد IICRA حددت الإطار الزمني لستة (6) أشهر لتقديم قرار التحكيم النهائي من تاريخ تسليم التحكيم إلى هيئة التحكيم."}
            </p>
            <p style={{ textAlign: "justify", fontSize: "16px" }}>
              <b style={{ color: "#A4865C" }}>
                {document.dir == "ltr"
                  ? "INTEGRITY/ BINDING AWARDS: "
                  : "جوائز النزاهة / الملزمة: "}
              </b>
              {document.dir == "ltr"
                ? "The binding Awards rendered by the IICRA are nal and may not be challenged by appeal or cassation and shall be enforced in accordance with the acceptable international proceedings enforceable of law."
                : "تعتبر القرارات الملزمة الصادرة عن IICRA نهائية ولا يجوز الطعن فيها عن طريق الاستئناف أو النقض ويجب تنفيذها وفقًا للإجراءات الدولية المقبولة والقادرة على إنفاذ القانون."}
            </p>
          </CardBody>
        </Card>
      </Card>
    </Container>
  );
};

export default ADR;
