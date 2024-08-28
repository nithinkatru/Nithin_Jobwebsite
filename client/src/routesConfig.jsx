import RoleProtectedRoute from "./context/RoleProtectedRoute"; // Import RoleProtectedRoute
import CandidateHome from "./pages/candidate/Home";
import JobDisplay from "./pages/candidate/JobDisplay";
import Profile from "./pages/candidate/Profile";
import ForgotPassword from "./pages/common/ForgotPassword";
import Signin from "./pages/common/Signin";
import Signup from "./pages/common/Signup";
import Employerprofile from "./pages/employer/Employerprofile";
import EmployerHome from "./pages/employer/Home";
import JobCreation from "./pages/employer/JobCreation";
import JobListing from "./pages/employer/JobListing";
import Aboutus from "./pages/common/AboutUs";
import Aboutus_employee from "./pages/candidate/AboutUs";
import Contactus from "./pages/common/ContactUs";
import Contactus_employee from "./pages/candidate/ContactUs";

const routes = [
  // Common routes
  {
    path: "/aboutus",
    element: <Aboutus />,
    index: true,
  },
  {
    path: "/aboutus_employee",
    element: <Aboutus_employee />,
    index: true,
  },
  {
    path: "/contactus",
    element: <Contactus />,
    index: true,
  },
  {
    path: "/contactus_employee",
    element: <Contactus_employee />,
    index: true,
  },


  // Candidate routes
  {
    path: "/",
    element: (
      <RoleProtectedRoute allowedRoles={["Candidate"]}>
        <CandidateHome />
      </RoleProtectedRoute>
    ),
    index: true,
  },
  {
    path: "/profile",
    element: (
      <RoleProtectedRoute allowedRoles={["Candidate"]}>
        <Profile />
      </RoleProtectedRoute>
    ),
  },
  {
    path: "/jobs",
    element: (
      <RoleProtectedRoute allowedRoles={["Candidate"]}>
        <JobDisplay />
      </RoleProtectedRoute>
    ),
  },

  // Employer routes
  {
    path: "/employer",
    element: (
      <RoleProtectedRoute allowedRoles={["Employer"]}>
        <EmployerHome />
      </RoleProtectedRoute>
    ),
    index: true,
  },
  {
    path: "/Employerprofile",
    element: (
      <RoleProtectedRoute allowedRoles={["Employer"]}>
        <Employerprofile />
      </RoleProtectedRoute>
    ),
  },
  {
    path: "/employer/job-creation",
    element: (
      <RoleProtectedRoute allowedRoles={["Employer"]}>
        <JobCreation />
      </RoleProtectedRoute>
    ),
  },
  {
    path: "/employer/job-listings",
    element: (
      <RoleProtectedRoute allowedRoles={["Employer"]}>
        <JobListing />
      </RoleProtectedRoute>
    ),
  },

  // Authentication routes
  {
    path: "/auth/signin",
    element: <Signin />,
  },
  {
    path: "/auth/signup",
    element: <Signup />,
  },
  {
    path: "/auth/forgot-password",
    element: <ForgotPassword />,
  },
];

export default routes;
