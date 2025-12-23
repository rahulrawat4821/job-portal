import { Routes, Route } from "react-router-dom";
import Login from "./components/shared/auth/Login";
import Signup from "./components/shared/auth/SignUp";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import Companies from "./components/admin/Companies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";

export default function App() {
  return (
    <Routes>

      {/* Auth Routes */}
      


      {/* Main App Routes (Navbar visible) */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/description/:id" element={<JobDescription/>} />


        // admin Routes
        <Route path="/admin/companies" element={<Companies />} />
        <Route path="/admin/companies/create" element={<CompanyCreate />} />
        <Route path="/admin/companies/:id" element={<CompanySetup/>} />
      </Route>

    </Routes>
  );
}
