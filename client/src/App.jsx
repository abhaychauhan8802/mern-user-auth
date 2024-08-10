import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { useSelector } from "react-redux";

import Header from "./components/Header";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser) {
    return <Navigate to="/sign-in" replace />;
  }

  if (!currentUser.verified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

const VerifyEmailRedirectIfVerify = ({ children }) => {
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser) {
    return <Navigate to="/sign-in" />;
  }

  if (currentUser && currentUser.verified) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { currentUser } = useSelector((state) => state.user);

  if (currentUser && currentUser.verified) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const App = () => {
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/contact-us" element={<h1>Contact US</h1>} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/verify-email"
          element={
            <VerifyEmailRedirectIfVerify>
              <VerifyEmail />
            </VerifyEmailRedirectIfVerify>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/sign-in"
          element={
            <RedirectAuthenticatedUser>
              <SignIn />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/sign-up"
          element={
            <RedirectAuthenticatedUser>
              <SignUp />
            </RedirectAuthenticatedUser>
          }
        />
      </Routes>
    </NextUIProvider>
  );
};

export default App;
