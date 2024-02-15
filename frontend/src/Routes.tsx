import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes as DOMRoutes,
} from "react-router-dom";
import Login from "./pages/Login";
import SignupPage from "./pages/signup";
import VotingPage from "./pages/Voting";


const Routes: React.FC = () => {
  return (
    <Router>
      <DOMRoutes>
          <Route path="/" element={<VotingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignupPage />} />
      </DOMRoutes>
    </Router>
  );
};

export default Routes;
