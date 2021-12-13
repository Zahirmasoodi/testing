import { lazy } from "react";

import FilesHandedover from "../components/emails/transmissionOfFiles/FilesHandedover";
import UserForm from "../components/form/UserForm";
const NotFound = lazy(() => import("../components/cases/NotFound"));
const ListAll = lazy(() => import("../components/cases/ListAll"));
const ListAll_ = lazy(() =>
  import("../componentsReconciliation/cases/ListAll")
);
const CaseExpanded = lazy(() => import("../components/cases/CaseExpanded"));
const CaseExpanded_ = lazy(() =>
  import("../componentsReconciliation/cases/CaseExpanded")
);
const TimelineReport = lazy(() => import("../components/cases/TimelineReport"));
const TimelineReport_ = lazy(() =>
  import("../componentsReconciliation/cases/TimelineReport")
);

const SubmissionOfRfa = lazy(() =>
  import("../components/cases/SubmissionOfRfa")
);
const NoticeOfArbitration = lazy(() =>
  import("../components/cases/NoticeOfArbitration")
);
const NominationOfArbitrator = lazy(() =>
  import("../components/cases/NominationOfArbitrator")
);
const TransmissionOfArbitrationFile = lazy(() =>
  import("../components/cases/TransmissionOfArbitrationFile")
);
const InvitationForHearing = lazy(() =>
  import("../components/cases/InvitationForHearing")
);
const PreliminaryMeeting = lazy(() =>
  import("../components/cases/PreliminaryMeeting")
);
const Hearing = lazy(() => import("../components/cases/Hearing"));
const SubmissionOfFinalMemorandum = lazy(() =>
  import("../components/cases/SubmissionOfFinalMemorandum")
);
const IssuanceOfFinalAward = lazy(() =>
  import("../components/cases/IssuanceOfFinalAward")
);

const SubmissionOfRfa_ = lazy(() =>
  import("../componentsReconciliation/cases/SubmissionOfRfa")
);
const NoticeOfArbitration_ = lazy(() =>
  import("../componentsReconciliation/cases/NoticeOfArbitration")
);
const NominationOfArbitrator_ = lazy(() =>
  import("../componentsReconciliation/cases/NominationOfArbitrator")
);
const TransmissionOfArbitrationFile_ = lazy(() =>
  import("../componentsReconciliation/cases/TransmissionOfArbitrationFile")
);
const InvitationForHearing_ = lazy(() =>
  import("../componentsReconciliation/cases/InvitationForHearing")
);
const InvitationForPreliminaryMeeting_ = lazy(() =>
  import("../componentsReconciliation/cases/InvitationForPreliminaryMeeting")
);
const DraftTerms_ = lazy(() =>
  import("../componentsReconciliation/cases/DraftTerms")
);
const PreliminaryMeeting_ = lazy(() =>
  import("../componentsReconciliation/cases/PreliminaryMeeting")
);
const Hearing_ = lazy(() =>
  import("../componentsReconciliation/cases/Hearing")
);
const SubmissionOfFinalMemorandum_ = lazy(() =>
  import("../componentsReconciliation/cases/SubmissionOfFinalMemorandum")
);
const IssuanceOfFinalAward_ = lazy(() =>
  import("../componentsReconciliation/cases/IssuanceOfFinalAward")
);

//Emails rfa
const Confirmation = lazy(() =>
  import("../components/emails/rfa/Confirmation")
);
const NoticeOfConciliation = lazy(() =>
  import("../componentsReconciliation/email/rfa/Notice of RFC")
);

const Rejection = lazy(() => import("../components/emails/rfa/Rejection"));

//Emails notice of arbitration
const EmailSoleArbitrator = lazy(() =>
  import("../components/emails/noticeOfArbitration/EmailSoleArbitrator")
);
const EmailEmergencyArbitrator = lazy(() =>
  import("../components/emails/noticeOfArbitration/EmailEmergencyArbitrator")
);
const EmailConfExtRFARes = lazy(() =>
  import("../components/emails/noticeOfArbitration/EmailConfExtRFARes")
);

//Emails Nomination and appointment of the Arbitrators

const EmailAppointSole = lazy(() =>
  import("../components/emails/appointmentOfArbitrators/EmailAppointSole")
);
const EmailAppointSole_ = lazy(() =>
  import(
    "../componentsReconciliation/email/appointmentOfArbitrators/AppointConciliator"
  )
);
const EmailAppointSoleConfirm = lazy(() =>
  import(
    "../componentsReconciliation/email/appointmentOfArbitrators/ConfirmAppointConciliator"
  )
);

const MissionContractConciliator = lazy(() =>
  import(
    "../componentsReconciliation/email/appointmentOfArbitrators/EmailMissionContract"
  )
);

const EmailAppointTribunal = lazy(() =>
  import("../components/emails/appointmentOfArbitrators/EmailAppointTribunal")
);
const EmailConfirmSole = lazy(() =>
  import("../components/emails/appointmentOfArbitrators/EmailConfirmSole")
);
const EmailConfirmTribunal = lazy(() =>
  import("../components/emails/appointmentOfArbitrators/EmailConfirmTribunal")
);
const EmailMissionContract = lazy(() =>
  import("../components/emails/appointmentOfArbitrators/EmailMissionContract")
);

//Containers for email templates
const ContainerRfa = lazy(() =>
  import("../components/emails/containers/ContainerRfa")
);
const ContainerRfa_ = lazy(() =>
  import("../componentsReconciliation/email/containers/ContainerRfa")
);
const ContainerArbNotice = lazy(() =>
  import("../components/emails/containers/ContainerArbNotice")
);
const ContainerAppointArb = lazy(() =>
  import("../components/emails/containers/ContainerAppointArb")
);
const ContainerAppointArb_ = lazy(() =>
  import("../componentsReconciliation/email/containers/ContainerAppointArb")
);
const ContainerTransmission = lazy(() =>
  import("../components/emails/containers/ContainerTransmission")
);
const ContainerPreMeeting = lazy(() =>
  import("../components/emails/containers/ContainerPreMeeting")
);
const ContainerPreMeeting_ = lazy(() =>
  import("../componentsReconciliation/email/containers/ContainerPreMeeting")
);
const ContainerInvHearing = lazy(() =>
  import("../components/emails/containers/ContainerInvHearing")
);
const ContainerInvHearing_ = lazy(() =>
  import("../componentsReconciliation/email/containers/ContainerInvHearing")
);
const ContainerMemorandum = lazy(() =>
  import("../components/emails/containers/ContainerMemorandum")
);
const ContainerAward = lazy(() =>
  import("../components/emails/containers/ContainerAward")
);
const ContainerExchangeDocs = lazy(() =>
  import("../components/emails/containers/ContainerExchangeDocs")
);
const ContainerSummon = lazy(() =>
  import("../components/emails/containers/ContainerSummon")
);
const ContainerRequest = lazy(() =>
  import("../components/emails/containers/ContainerRequests")
);
const ContainerCorrection = lazy(() =>
  import("../components/emails/containers/ContainerCorrection")
);
const ExchangeDocs = lazy(() => import("../components/cases/ExchangeDocs"));

const Summon = lazy(() => import("../components/cases/Summoning"));
const CorrectFinalAward = lazy(() =>
  import("../components/cases/CorrectFinalAward")
);
const OtherRequests = lazy(() => import("../components/cases/OtherRequests"));

//
const OTP = lazy(() => import("../components/dashboard/OTP"));
const Dashboard = lazy(() => import("../components/dashboard/Dashboard"));
const Dashboard1 = lazy(() => import("../components/dashboard/Dashboard1"));
const Dashboard2 = lazy(() => import("../components/dashboard/Dashboard2"));
const Dashboard3 = lazy(() => import("../components/dashboard/Dashboard3"));
const Dashboard4 = lazy(() => import("../components/dashboard/Dashboard4"));
const Dashboard5 = lazy(() => import("../components/dashboard/Dashboard5"));
const Dashboard6 = lazy(() => import("../components/dashboard/Dashboard6"));
const Dashboard7 = lazy(() => import("../components/dashboard/Dashboard7"));
const Dashboard8 = lazy(() =>
  import("../componentsReconciliation/dashboard/Dashboard8")
);
const Dashboard9 = lazy(() =>
  import("../componentsReconciliation/dashboard/Dashboard9")
);
const Dashboard10 = lazy(() =>
  import("../componentsReconciliation/dashboard/Dashboard10")
);

const Pending = lazy(() => import("../components/emails/rfa/Pending"));

//
const HearingWitness = lazy(() => import("../components/witness/Hearing"));
const CasesWitness = lazy(() => import("../components/witness/Cases"));
const Minutes = lazy(() => import("../components/cases/Minutes"));
const Minutes_ = lazy(() =>
  import("../componentsReconciliation/cases/Minutes")
);

//
const CasesArbitrator = lazy(() => import("../components/arbitrator/Cases"));
const MissionContract = lazy(() =>
  import("../components/arbitrator/MissionContract")
);
const EmailSoleNominatingRap = lazy(() =>
  import("../components/emails/appointmentOfArbitrators/EmailSoleNominatingRap")
);

const EmailMissionContractRapSole = lazy(() =>
  import(
    "../components/emails/appointmentOfArbitrators/EmailMissionContractRapSole"
  )
);

//
const Email1 = lazy(() =>
  import("../components/emails/invitationPreliminaryMeeting/Email1")
);
const Email1_ = lazy(() =>
  import("../componentsReconciliation/email/invitationForFirstMeeting/Email1")
);

const Email3 = lazy(() =>
  import("../components/emails/invitationPreliminaryMeeting/Email3")
);

const Email5 = lazy(() =>
  import("../components/emails/invitationPreliminaryMeeting/Email5")
);

const Email7 = lazy(() =>
  import("../components/emails/invitationPreliminaryMeeting/Email7")
);

const Email9 = lazy(() =>
  import("../components/emails/invitationPreliminaryMeeting/Email9")
);

const AcceptRejoinder = lazy(() =>
  import("../components/emails/invitationPreliminaryMeeting/AcceptRejoinder")
);

const RejectRejoinder = lazy(() =>
  import("../components/emails/invitationPreliminaryMeeting/RejectRejoinder")
);
const Email12 = lazy(() =>
  import("../components/emails/preliminaryMeeting/Email12")
);
const Email15 = lazy(() => import("../components/emails/draftTerms/Email15"));
const Email19 = lazy(() => import("../components/emails/draftTerms/Email19"));
const Email22 = lazy(() => import("../components/emails/draftTerms/Email22"));
const Email24 = lazy(() => import("../components/emails/draftTerms/Email24"));
const Email27 = lazy(() => import("../components/emails/draftTerms/Email27"));

const Email29 = lazy(() =>
  import("../components/emails/invitationHearing/Email29")
);
const Email29_ = lazy(() =>
  import("../componentsReconciliation/email/inviteFinalMeeting/Email29")
);

const Email31 = lazy(() =>
  import("../components/emails/invitationHearing/Email31")
);
const Email32 = lazy(() =>
  import("../components/emails/invitationHearing/Email32")
);
const Email35 = lazy(() =>
  import("../components/emails/invitationHearing/Email35")
);
const Email41 = lazy(() =>
  import("../components/emails/invitationHearing/Email41")
);
const Email43 = lazy(() =>
  import("../components/emails/invitationHearing/Email43")
);
const Email44 = lazy(() =>
  import("../components/emails/invitationHearing/Email44")
);
const Email48 = lazy(() =>
  import("../components/emails/invitationHearing/Email48")
);

const Email51 = lazy(() =>
  import("../components/emails/invitationHearing/Email51")
);

const Email53 = lazy(() => import("../components/emails/hearing/Email53"));
const Email54 = lazy(() => import("../components/emails/hearing/Email54"));
const Email55 = lazy(() => import("../components/emails/memorandum/Email55"));
const Email56 = lazy(() => import("../components/emails/memorandum/Email56"));
const Email57 = lazy(() => import("../components/emails/memorandum/Email57"));
const Email58 = lazy(() => import("../components/emails/memorandum/Email58"));
const Email60 = lazy(() => import("../components/emails/finalAward/Email60"));
const AdditionalAward = lazy(() =>
  import("../components/emails/finalAward/AdditionalAward")
);
const CorrectedAward = lazy(() =>
  import("../components/emails/finalAward/CorrectedAward")
);

const MinutesOfTransfer = lazy(() =>
  import("../components/emails/transmissionOfFiles/MinutesOfHandover")
);
const WelcomeMember = lazy(() => import("../member/Welcome"));
const MemberOtp = lazy(() => import("../member/MemberOtp"));
const ListCasesMember = lazy(() => import("../member/ListCasesMember"));
const AddMember = lazy(() => import("../member/AddMember"));
const Members = lazy(() => import("../member/Members"));
const Member = lazy(() => import("../member/Member"));

const protectedRoutes = [
  { path: "/memberWelcome", component: WelcomeMember },
  { path: "/authenticateMember", component: MemberOtp },
  { path: "/memberCases", component: ListCasesMember },
  { path: "/addMember", component: AddMember },
  { path: "/members", component: Members },
  { path: "/member", component: Member },
  { path: "/email/rfa", component: ContainerRfa },
  { path: "/email_/rfc_", component: ContainerRfa_ },
  { path: "/email/arbitrationNotice", component: ContainerArbNotice },
  { path: "/email/nominateArb", component: ContainerAppointArb },
  { path: "/email_/nominateArb_", component: ContainerAppointArb_ },
  { path: "/email/transmission", component: ContainerTransmission },
  { path: "/email/preMeeting", component: ContainerPreMeeting },
  { path: "/email_/preMeeting_", component: ContainerPreMeeting_ },
  { path: "/email/inviteHearing", component: ContainerInvHearing },
  { path: "/email_/inviteHearing_", component: ContainerInvHearing_ },
  { path: "/email/memorandum", component: ContainerMemorandum },
  { path: "/email/award", component: ContainerAward },
  { path: "/email/exchange", component: ContainerExchangeDocs },
  { path: "/email/summon", component: ContainerSummon },
  { path: "/email/correct", component: ContainerCorrection },
  { path: "/email/requests", component: ContainerRequest },
  {
    path: "/cases/exchange", //
    component: ExchangeDocs,
  },

  {
    path: "/cases/summon", //
    component: Summon,
  },
  {
    path: "/cases/correct", //
    component: CorrectFinalAward,
  },
  {
    path: "/cases/requests", //
    component: OtherRequests,
  },
  { path: "/email/rfa/approved", component: Confirmation },
  { path: "/email_/rfc_/approved_", component: NoticeOfConciliation },
  { path: "/email/rfa/rejected", component: Rejection },
  { path: "/email/rfa/pending", component: Pending },

  {
    path: "/email/arbitrationNotice/emergencyArbitrator",
    component: EmailEmergencyArbitrator,
  },
  {
    path: "/email/arbitrationNotice/extensionResponse",
    component: EmailConfExtRFARes,
  },
  {
    path: "/email/arbitrationNotice/soleArbitrator",
    component: EmailSoleArbitrator,
  },
  { path: "/email/nominateArb/soleArbitrator", component: EmailAppointSole },
  { path: "/email_/nominateArb_/1", component: EmailAppointSole_ },
  { path: "/email_/nominateArb_/2", component: EmailAppointSoleConfirm },
  { path: "/email_/nominateArb_/3", component: MissionContractConciliator },
  {
    path: "/email/nominateArb/coArbitrator",
    component: EmailAppointTribunal,
  },
  { path: "/email/nominateArb/confirmSole", component: EmailConfirmSole },
  { path: "/email/nominateArb/confirmCo", component: EmailConfirmTribunal },
  {
    path: "/email/nominateArb/missionContract", //
    component: EmailMissionContract,
  },
  {
    path: "/email/transmission/transferMinutes",
    component: MinutesOfTransfer,
  },
  {
    path: "/email/transmission/filesHandedover",
    component: FilesHandedover,
  },
  {
    path: "/cases",
    component: ListAll,
  },
  {
    path: "/cases_",
    component: ListAll_,
  },
  {
    path: "/dashboard",
    component: Dashboard,
  },

  { path: "/claimant", component: Dashboard1 },
  { path: "/respondent", component: Dashboard2 },
  { path: "/respondent/reviewDetails", component: UserForm },
  { path: "/witness", component: Dashboard3 },
  { path: "/expert", component: Dashboard4 },
  { path: "/interpreter", component: Dashboard5 },
  { path: "/arbitrator", component: Dashboard6 },
  { path: "/rapporteur", component: Dashboard7 },
  { path: "/first", component: Dashboard8 },
  { path: "/secondd_", component: Dashboard9 },
  { path: "/concil", component: Dashboard10 },
  { path: "/cases/expanded", component: CaseExpanded },
  { path: "/cases_/expanded_", component: CaseExpanded_ },
  { path: "/cases/timeline", component: TimelineReport },
  { path: "/cases_/timeline_", component: TimelineReport_ },
  { path: "/cases/rfa", component: SubmissionOfRfa },
  { path: "/cases/notice", component: NoticeOfArbitration },
  { path: "/cases/nomination", component: NominationOfArbitrator },
  { path: "/cases/transmission", component: TransmissionOfArbitrationFile },
  { path: "/cases/meeting", component: PreliminaryMeeting },
  { path: "/cases/prehearing", component: InvitationForHearing },
  { path: "/cases/hearing", component: Hearing },
  { path: "/cases/submission", component: SubmissionOfFinalMemorandum },
  { path: "/cases/issuance", component: IssuanceOfFinalAward },
  { path: "/cases_/rfa_", component: SubmissionOfRfa_ },
  { path: "/cases_/notice_", component: NoticeOfArbitration_ },
  { path: "/cases_/nomination_", component: NominationOfArbitrator_ },
  { path: "/cases_/transmission_", component: TransmissionOfArbitrationFile_ },
  { path: "/cases_/meeting_", component: PreliminaryMeeting_ },
  {
    path: "/cases_/premliminary_",
    component: InvitationForPreliminaryMeeting_,
  },
  { path: "/cases_/draft_", component: DraftTerms_ },
  { path: "/cases_/prehearing_", component: InvitationForHearing_ },
  { path: "/cases_/hearing_", component: Hearing_ },
  { path: "/cases_/submission_", component: SubmissionOfFinalMemorandum_ },
  { path: "/cases_/issuance_", component: IssuanceOfFinalAward_ },
  { path: "/witness/hearing", component: HearingWitness },
  { path: "/witness/cases", component: CasesWitness },
  { path: "/arbitrator/case", component: CasesArbitrator },
  { path: "/arbitrator/missionContract", component: MissionContract },
  { path: "/cases/hearing/minutes", component: Minutes },
  { path: "/email/nominateArb/soleNomRap", component: EmailSoleNominatingRap },
  {
    path: "/email/nominateArb/missionContractRapSole",
    component: EmailMissionContractRapSole,
  },
  {
    path: "/email/invitePrelimMeeting/1",
    component: Email1,
  },
  {
    path: "/email_/prelimMeeting_/1",
    component: Minutes_,
  },
  {
    path: "/cases_/hearing_/minutes_",
    component: Minutes_,
  },

  {
    path: "/email/invitePrelimMeeting/3",
    component: Email3,
  },

  {
    path: "/email/invitePrelimMeeting/5",
    component: Email5,
  },
  {
    path: "/email/invitePrelimMeeting/7",
    component: Email7,
  },

  {
    path: "/email/invitePrelimMeeting/9",
    component: Email9,
  },
  {
    path: "/email/invitePrelimMeeting/11",
    component: AcceptRejoinder,
  },
  {
    path: "/email/invitePrelimMeeting/12",
    component: RejectRejoinder,
  },
  {
    path: "/email/prelimMeeting/2",
    component: Email12,
  },
  {
    path: "/email/draftTerms/3",
    component: Email15,
  },
  {
    path: "/email/draftTerms/7",
    component: Email19,
  },
  {
    path: "/email/draftTerms/10",
    component: Email22,
  },
  {
    path: "/email/draftTerms/12",
    component: Email24,
  },
  {
    path: "/email/draftTerms/15",
    component: Email27,
  },
  {
    path: "/email/inviteHearing/1",
    component: Email29,
  },
  {
    path: "/email_/inviteHearing_/1",
    component: Email29_,
  },
  {
    path: "/email/inviteHearing/3",
    component: Email31,
  },
  {
    path: "/email/inviteHearing/4",
    component: Email32,
  },
  {
    path: "/email/inviteHearing/7",
    component: Email35,
  },
  {
    path: "/email/inviteHearing/13",
    component: Email41,
  },
  {
    path: "/email/inviteHearing/15",
    component: Email43,
  },
  {
    path: "/email/inviteHearing/16",
    component: Email44,
  },
  {
    path: "/email/inviteHearing/20",
    component: Email48,
  },
  {
    path: "/email/inviteHearing/23",
    component: Email51,
  },
  {
    path: "/email/hearing/1",
    component: Email53,
  },
  {
    path: "/email/hearing/2",
    component: Email54,
  },
  {
    path: "/email/memorandum/1",
    component: Email55,
  },
  {
    path: "/email/memorandum/2",
    component: Email56,
  },
  {
    path: "/email/memorandum/3",
    component: Email57,
  },
  {
    path: "/email/memorandum/4",
    component: Email58,
  },
  {
    path: "/email/award/1",
    component: Email60,
  },
  {
    path: "/email/award/additionalAward",
    component: AdditionalAward,
  },
  {
    path: "/email/award/correctionOfAward",
    component: CorrectedAward,
  },
  {
    path: "/auth/twoFactor",
    component: OTP,
  },
  { path: "*", component: NotFound },
];

export default protectedRoutes;
