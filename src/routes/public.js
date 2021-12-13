import { lazy } from "react";
import Choose from "../general/Choose";
import Login from "../components/form/Login";
import UserForm from "../components/form/UserForm";
import MemberLogin from "../member/MemberLogin";
import ForgotPassword from "../member/ForgotPassword";
import ResetPassword from "../member/ResetPassword";

const UserFormReconciliation = lazy(() =>
  import("../componentsReconciliation/form/UserFormReconciliation")
);
const Calculator = lazy(() => import("../components/Calculator"));
const Manual = lazy(() => import("../manual/rootManual"));
const ADR = lazy(() => import("../manual/ADR"));
const Arbitration = lazy(() => import("../manual/Arbitration"));
const Reconciliation = lazy(() => import("../manual/Reconciliation"));
const Services = lazy(() => import("../manual/Services"));
const Costs = lazy(() => import("../manual/Costs"));

const routes = [
  { path: "/memberLogin", component: MemberLogin },
  { path: "/memberForgotPassword", component: ForgotPassword },
  { path: "/memberResetPassword/:token", component: ResetPassword },
  { path: "/", component: Choose },
  { path: "/arbitration", component: UserForm },
  { path: "/reconciliation", component: UserFormReconciliation },
  { path: "/login", component: Login },
  { path: "/arbitration-calculator", component: Calculator },
  { path: "/manual", component: Manual },
  { path: "/manual/adr", component: ADR },
  { path: "/manual/services", component: Services },
  { path: "/manual/arbitration", component: Arbitration },
  { path: "/manual/reconciliation", component: Reconciliation },
  { path: "/manual/costs", component: Costs },
];

export default routes;
