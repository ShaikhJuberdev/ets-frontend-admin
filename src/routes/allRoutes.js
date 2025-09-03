import React from "react";

// Profile
import UserProfile from "../pages/Authentication/user-profile";

// Pages Calendar
import Calendar from "../pages/Calendar/index";

//Email
// import EmailInbox from "../pages/Email/email-inbox";
// import EmailRead from "../pages/Email/email-read";
// import EmailCompose from "../pages/Email/email-compose";

// import Emailtemplatealert from "../pages/EmailTemplate/email-template-alert";
// import Emailtemplatebasic from "../pages/EmailTemplate/email-template-basic";
// import Emailtemplatebilling from "../pages/EmailTemplate/email-template-billing";

// Authentication related pages
// import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";

import ForgetPwd from "../pages/Authentication/ForgetPassword";
import EmailVerification from "pages/Authentication/EmailVerification";
import WelcomePage from "pages/Authentication/WelcomePage";
import Login from "pages/Authentication/Login";
          

//  // Inner Authentication
import Login1 from "../pages/AuthenticationInner/Login";
import Login2 from "../pages/AuthenticationInner/Login2";

import Register2 from "../pages/AuthenticationInner/Register2";
import Recoverpw from "../pages/AuthenticationInner/Recoverpw";
import Recoverpw2 from "../pages/AuthenticationInner/Recoverpw2";
import ForgetPwd1 from "../pages/AuthenticationInner/ForgetPassword";
import LockScreen from "../pages/AuthenticationInner/auth-lock-screen";
import LockScreen2 from "../pages/AuthenticationInner/auth-lock-screen-2";
import ConfirmMail from "../pages/AuthenticationInner/page-confirm-mail";
import ConfirmMail2 from "../pages/AuthenticationInner/page-confirm-mail-2";

import EmailVerification2 from "../pages/AuthenticationInner/auth-email-verification-2";
import TwostepVerification from "../pages/AuthenticationInner/auth-two-step-verification";
import TwostepVerification2 from "../pages/AuthenticationInner/auth-two-step-verification-2";




import AddMailForm from "pages/QuickTask/AddMailForm";   

// Dashboard
import Dashboard from "../pages/Dashboard/index";
// Charts
import ChartApex from "../pages/Charts/Apexcharts";
import ChartjsChart from "../pages/Charts/ChartjsChart";
import EChart from "../pages/Charts/EChart";
import SparklineChart from "../pages/Charts/SparklineChart";

// Maps
// import MapsGoogle from "../pages/Maps/MapsGoogle";
// import MapsVector from "../pages/Maps/MapsVector";
// import MapsLeaflet from "../pages/Maps/MapsLeaflet";

//Icons
// import IconDripicons from "../pages/Icons/IconDripicons";
// import IconMaterialdesign from "../pages/Icons/IconMaterialdesign";
// import TypiconsIcon from "../pages/Icons/IconTypicons";
// import IconIon from "../pages/Icons/IconIon";
// import ThemifyIcon from "../pages/Icons/IconThemify";
// import IconFontawesome from "../pages/Icons/IconFontawesome";

//Tables
// import BasicTables from "../pages/Tables/BasicTables";
// import DatatableTables from "../pages/Tables/DatatableTables";
// import ResponsiveTables from "../pages/Tables/ResponsiveTables";

// Forms
// import FormElements from "../pages/Forms/FormElements";
// import FormAdvanced from "../pages/Forms/FormAdvanced";
// import FormEditors from "../pages/Forms/FormEditors";
// import FormValidations from "../pages/Forms/FormValidations";
// import FormMask from "../pages/Forms/FormMask";
// import FormRepeater from "../pages/Forms/FormRepeater";
// import FormUpload from "../pages/Forms/FormUpload";
// import FormWizard from "../pages/Forms/FormWizard";

//Ui
import UiAlert from "../pages/Ui/UiAlert";
import UiButtons from "../pages/Ui/UiButtons";
import UiCards from "../pages/Ui/UiCards";
import UiCarousel from "../pages/Ui/UiCarousel";
import UiColors from "../pages/Ui/UiColors";
import UiDropdown from "../pages/Ui/UiDropdown";
import UiGeneral from "../pages/Ui/UiGeneral";
import UiGrid from "../pages/Ui/UiGrid";
import UiImages from "../pages/Ui/UiImages";
import UiLightbox from "../pages/Ui/UiLightbox";
import UiModal from "../pages/Ui/UiModal";
import UiProgressbar from "../pages/Ui/UiProgressbar";
import UiTabsAccordions from "../pages/Ui/UiTabsAccordions";
import UiTypography from "../pages/Ui/UiTypography";
import UiVideo from "../pages/Ui/UiVideo";
import UiSessionTimeout from "../pages/Ui/UiSessionTimeout";
import UiRating from "../pages/Ui/UiRating";
import UiUtilities from "pages/Ui/UiUtilities";
import UiOffcanvas from "pages/Ui/UiOffcanvas";

//Pages
import PagesStarter from "../pages/Utility/pages-starter";
import PagesMaintenance from "../pages/Utility/pages-maintenance";
import PagesComingsoon from "../pages/Utility/pages-comingsoon";
import PagesTimeline from "../pages/Utility/pages-timeline";
import PagesInvoice from "../pages/Utility/PagesInvoice";
import PagesFaqs from "../pages/Utility/pages-faqs";
import PagesPricing from "../pages/Utility/pages-pricing";
import Pages404 from "../pages/Utility/pages-404";
import Pages500 from "../pages/Utility/pages-500";
import PagesGallery from "../pages/Utility/PagesGallery";
import PagesDirectory from "../pages/Utility/PagesDirectory";
import PagesProfile from "pages/Utility/pages-profile";



import SendMessage from "pages/QuickTask/SendMessage";
import GroupManagement from "pages/Groups/GroupManagement";
import CreateGroup from "pages/Groups/CreateGroup";
import GroupMessage from "pages/QuickTask/GroupMessage";
import RmManagement from "pages/Authentication/RmManagement";
import TotalCustomer from "pages/Authentication/TotalCustomer";
import HNCustomer from "pages/Authentication/HNCustomer";
import EditGroup from "pages/Groups/EditGroup";
import Geolocation from "pages/Geolocation/GeoLocation";




//   Alert List
import AlertList from "pages/Alertlist/AlertList";


const userRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
    { path: "/geolocation", component: <Geolocation/> },

    { path: "/alertlist", component: <AlertList /> },




  { path: "/addmailform", component: <AddMailForm /> },

   { path: "/groupmessage", component: <GroupMessage /> },


   
   { path: "/sendmessage", component: <SendMessage/> },
   { path: "/group-management", component: <GroupManagement/> },

    { path: "/rmmanagement", component: <RmManagement/> },
    
    { path: "/totalcustomer", component: <TotalCustomer/> },

    { path: "/hncustomer", component: <HNCustomer/> },





    

 
   

  // //calendar
  { path: "/calendar", component: <Calendar /> },

  // //profile
  { path: "/profile", component: <UserProfile /> },

  //Group Work
  { path: "/creategroup", component: <CreateGroup/> },
  { path: "/group-management", component: <GroupManagement/> },
    { path: "/edit-group", component: <EditGroup/> },
  


  //Charts
  { path: "/apex-charts", component: <ChartApex /> },
  { path: "/chartjs-charts", component: <ChartjsChart /> },
  { path: "/e-charts", component: <EChart /> },
  { path: "/sparkline-charts", component: <SparklineChart /> },

 
  // Ui
  { path: "/ui-alerts", component: <UiAlert /> },
  { path: "/ui-buttons", component: <UiButtons /> },
  { path: "/ui-cards", component: <UiCards /> },
  { path: "/ui-carousel", component: <UiCarousel /> },
  { path: "/ui-colors", component: <UiColors /> },
  { path: "/ui-dropdowns", component: <UiDropdown /> },
  { path: "/ui-general", component: <UiGeneral /> },
  { path: "/ui-grid", component: <UiGrid /> },
  { path: "/ui-images", component: <UiImages /> },
  { path: "/ui-lightbox", component: <UiLightbox /> },
  { path: "/ui-modals", component: <UiModal /> },
  { path: "/ui-progressbars", component: <UiProgressbar /> },
  { path: "/ui-tabs-accordions", component: <UiTabsAccordions /> },
  { path: "/ui-typography", component: <UiTypography /> },
  { path: "/ui-video", component: <UiVideo /> },
  { path: "/ui-session-timeout", component: <UiSessionTimeout /> },
  { path: "/ui-rating", component: <UiRating /> },
  { path: "/ui-utilities", component: <UiUtilities /> },
  { path: "/ui-offcanvas", component: <UiOffcanvas /> },

  //Utility
  { path: "/pages-starter", component: <PagesStarter /> },
  { path: "/pages-timeline", component: <PagesTimeline /> },
  { path: "/pages-invoice", component: <PagesInvoice /> },
  { path: "/pages-directory", component: <PagesDirectory /> },
  { path: "/pages-faqs", component: <PagesFaqs /> },
  { path: "/pages-pricing", component: <PagesPricing /> },
  { path: "/pages-gallery", component: <PagesGallery /> },
  { path: "/pages-profile", component: <PagesProfile /> },

  // this route should be at the end of all other routes
  { path: "/", component: < Dashboard/> },
];

const authRoutes = [
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/login", component: <Login /> },
  { path: "/emailverification", component: <EmailVerification/> },
   { path: "/welcomepage", component: <WelcomePage/> },
  

  { path: "/pages-maintenance", component: <PagesMaintenance /> },
  { path: "/pages-comingsoon", component: <PagesComingsoon /> },
  { path: "/pages-404", component: <Pages404 /> },
  { path: "/pages-500", component: <Pages500 /> },

  // Authentication Inner
  { path: "/pages-login", component: <Login1 /> },
  { path: "/pages-login-2", component: <Login2 /> },
  // { path: "/pages-register", component: <Register1 /> },
  { path: "/pages-register-2", component: <Register2 /> },
  { path: "/page-recoverpw", component: <Recoverpw /> },
  { path: "/page-recoverpw-2", component: <Recoverpw2 /> },
  { path: "/pages-forgot-pwd", component: <ForgetPwd1 /> },
  { path: "/auth-lock-screen", component: <LockScreen /> },
  { path: "/auth-lock-screen-2", component: <LockScreen2 /> },
  { path: "/page-confirm-mail", component: <ConfirmMail /> },
  { path: "/page-confirm-mail-2", component: <ConfirmMail2 /> },
  { path: "/auth-email-verification", component: <EmailVerification /> },
  { path: "/auth-email-verification-2", component: <EmailVerification2 /> },
  { path: "/auth-two-step-verification", component: <TwostepVerification /> },
  { path: "/auth-two-step-verification-2", component: <TwostepVerification2 /> },
];

export { userRoutes, authRoutes };
