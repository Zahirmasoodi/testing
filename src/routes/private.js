import NotFound from "../components/cases/NotFound";
import UserForm from "../components/form/UserForm";
import ListAll from "../components/cases/ListAll";
import ListAll_ from "../componentsReconciliation/cases/ListAll";
import CaseExpanded from "../components/cases/CaseExpanded";
import CaseExpanded_ from "../componentsReconciliation/cases/CaseExpanded";
import TimelineReport from "../components/cases/TimelineReport";
import TimelineReport_ from "../componentsReconciliation/cases/TimelineReport";

import SubmissionOfRfa from "../components/cases/SubmissionOfRfa";
import NoticeOfArbitration from "../components/cases/NoticeOfArbitration";
import NominationOfArbitrator from "../components/cases/NominationOfArbitrator";
import TransmissionOfArbitrationFile from "../components/cases/TransmissionOfArbitrationFile";
import InvitationForHearing from "../components/cases/InvitationForHearing";
import PreliminaryMeeting from "../components/cases/PreliminaryMeeting";
import Hearing from "../components/cases/Hearing";
import SubmissionOfFinalMemorandum from "../components/cases/SubmissionOfFinalMemorandum";
import IssuanceOfFinalAward from "../components/cases/IssuanceOfFinalAward";

import SubmissionOfRfa_ from "../componentsReconciliation/cases/SubmissionOfRfa";
import NoticeOfArbitration_ from "../componentsReconciliation/cases/NoticeOfArbitration";
import NominationOfArbitrator_ from "../componentsReconciliation/cases/NominationOfArbitrator";
import TransmissionOfArbitrationFile_ from "../componentsReconciliation/cases/TransmissionOfArbitrationFile";
import InvitationForHearing_ from "../componentsReconciliation/cases/InvitationForHearing";
import InvitationForPreliminaryMeeting_ from "../componentsReconciliation/cases/InvitationForPreliminaryMeeting";
import DraftTerms_ from "../componentsReconciliation/cases/DraftTerms";
import PreliminaryMeeting_ from "../componentsReconciliation/cases/PreliminaryMeeting";
import Hearing_ from "../componentsReconciliation/cases/Hearing";
import SubmissionOfFinalMemorandum_ from "../componentsReconciliation/cases/SubmissionOfFinalMemorandum";
import IssuanceOfFinalAward_ from "../componentsReconciliation/cases/IssuanceOfFinalAward";

//Containers for email templates
import ContainerRfa from "../components/emails/containers/ContainerRfa";
import ContainerRfa_ from "../componentsReconciliation/email/containers/ContainerRfa";
import ContainerArbNotice from "../components/emails/containers/ContainerArbNotice";
import ContainerAppointArb from "../components/emails/containers/ContainerAppointArb";
import ContainerAppointArb_ from "../componentsReconciliation/email/containers/ContainerAppointArb";
import ContainerTransmission from "../components/emails/containers/ContainerTransmission";
import ContainerPreMeeting from "../components/emails/containers/ContainerPreMeeting";
import ContainerPreMeeting_ from "../componentsReconciliation/email/containers/ContainerPreMeeting";
import ContainerInvHearing from "../components/emails/containers/ContainerInvHearing";
import ContainerInvHearing_ from "../componentsReconciliation/email/containers/ContainerInvHearing";
import ContainerMemorandum from "../components/emails/containers/ContainerMemorandum";
import ContainerAward from "../components/emails/containers/ContainerAward";
import ContainerExchangeDocs from "../components/emails/containers/ContainerExchangeDocs";
import ContainerSummon from "../components/emails/containers/ContainerSummon";
import ExchangeDocs from "../components/cases/ExchangeDocs";
import Summon from "../components/cases/Summoning";
import CorrectFinalAward from "../components/cases/CorrectFinalAward";

//Emails rfa
import Confirmation from "../components/emails/rfa/Confirmation";
import NoticeOfConciliation from "../componentsReconciliation/email/rfa/Notice of RFC";
import Rejection from "../components/emails/rfa/Rejection";
import Pending from "../components/emails/rfa/Pending";

//Emails notice of arbitration
import EmailSoleArbitrator from "../components/emails/noticeOfArbitration/EmailSoleArbitrator";
import EmailEmergencyArbitrator from "../components/emails/noticeOfArbitration/EmailEmergencyArbitrator";
import EmailConfExtRFARes from "../components/emails/noticeOfArbitration/EmailConfExtRFARes";

//Emails Nomination and appointment of the Arbitrators

import EmailAppointSole from "../components/emails/appointmentOfArbitrators/EmailAppointSole";
import EmailAppointSole_ from "../componentsReconciliation/email/appointmentOfArbitrators/AppointConciliator";
import EmailAppointSoleConfirm from "../componentsReconciliation/email/appointmentOfArbitrators/ConfirmAppointConciliator";
import MissionContractConciliator from "../componentsReconciliation/email/appointmentOfArbitrators/EmailMissionContract";

import EmailAppointTribunal from "../components/emails/appointmentOfArbitrators/EmailAppointTribunal";
import EmailConfirmSole from "../components/emails/appointmentOfArbitrators/EmailConfirmSole";
import EmailConfirmTribunal from "../components/emails/appointmentOfArbitrators/EmailConfirmTribunal";
import EmailMissionContract from "../components/emails/appointmentOfArbitrators/EmailMissionContract";

//
import OTP from "../components/dashboard/OTP";
import Dashboard from "../components/dashboard/Dashboard";
import Dashboard1 from "../components/dashboard/Dashboard1";
import Dashboard2 from "../components/dashboard/Dashboard2";
import Dashboard3 from "../components/dashboard/Dashboard3";
import Dashboard4 from "../components/dashboard/Dashboard4";
import Dashboard5 from "../components/dashboard/Dashboard5";
import Dashboard6 from "../components/dashboard/Dashboard6";
import Dashboard7 from "../components/dashboard/Dashboard7";
import Dashboard8 from "../componentsReconciliation/dashboard/Dashboard8";
import Dashboard9 from "../componentsReconciliation/dashboard/Dashboard9";
import Dashboard10 from "../componentsReconciliation/dashboard/Dashboard10";

//
import HearingWitness from "../components/witness/Hearing";
import CasesWitness from "../components/witness/Cases";
import Minutes from "../components/cases/Minutes";
import Minutes_ from "../componentsReconciliation/cases/Minutes";

//
import CasesArbitrator from "../components/arbitrator/Cases";
import MissionContract from "../components/arbitrator/MissionContract";
import EmailSoleNominatingRap from "../components/emails/appointmentOfArbitrators/EmailSoleNominatingRap";
import EmailMissionContractRapSole from "../components/emails/appointmentOfArbitrators/EmailMissionContractRapSole";

//
import Email1 from "../components/emails/invitationPreliminaryMeeting/Email1";
// import Email1_ from "../componentsReconciliation/email/invitationForFirstMeeting/Email1";

import Email3 from "../components/emails/invitationPreliminaryMeeting/Email3";
import Email5 from "../components/emails/invitationPreliminaryMeeting/Email5";
import Email7 from "../components/emails/invitationPreliminaryMeeting/Email7";
import Email9 from "../components/emails/invitationPreliminaryMeeting/Email9";
import Email12 from "../components/emails/preliminaryMeeting/Email12";
import Email15 from "../components/emails/draftTerms/Email15";

import Email19 from "../components/emails/draftTerms/Email19";
import Email22 from "../components/emails/draftTerms/Email22";

import Email24 from "../components/emails/draftTerms/Email24";
import Email27 from "../components/emails/draftTerms/Email27";

import Email29 from "../components/emails/invitationHearing/Email29";
import Email29_ from "../componentsReconciliation/email/inviteFinalMeeting/Email29";

import Email31 from "../components/emails/invitationHearing/Email31";
import Email32 from "../components/emails/invitationHearing/Email32";
import Email35 from "../components/emails/invitationHearing/Email35";
import Email41 from "../components/emails/invitationHearing/Email41";
import Email43 from "../components/emails/invitationHearing/Email43";
import Email44 from "../components/emails/invitationHearing/Email44";
import Email48 from "../components/emails/invitationHearing/Email48";
import Email51 from "../components/emails/invitationHearing/Email51";
import Email53 from "../components/emails/hearing/Email53";
import Email54 from "../components/emails/hearing/Email54";
import Email55 from "../components/emails/memorandum/Email55";
import Email56 from "../components/emails/memorandum/Email56";
import Email57 from "../components/emails/memorandum/Email57";
import Email58 from "../components/emails/memorandum/Email58";
import Email60 from "../components/emails/finalAward/Email60";
import AdditionalAward from "../components/emails/finalAward/AdditionalAward";
import CorrectedAward from "../components/emails/finalAward/CorrectedAward";
import MinutesOfTransfer from "../components/emails/transmissionOfFiles/MinutesOfHandover";
import AcceptRejoinder from "../components/emails/invitationPreliminaryMeeting/AcceptRejoinder";
import RejectRejoinder from "../components/emails/invitationPreliminaryMeeting/RejectRejoinder";
import FilesHandedover from "../components/emails/transmissionOfFiles/FilesHandedover";
import WelcomeMember from "../member/Welcome";
import MemberOtp from "../member/MemberOtp";
import ListCasesMember from "../member/ListCasesMember";
import AddMember from "../member/AddMember";
import Members from "../member/Members";
import Member from "../member/Member";
import OtherRequests from "../components/cases/OtherRequests";
import ContainerCorrection from "../components/emails/containers/ContainerCorrection";
import ContainerRequest from "../components/emails/containers/ContainerRequests";

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
  {
    path: "/cases/requests", //
    component: OtherRequests,
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
