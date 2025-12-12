import { Routes, Route } from "react-router-dom";
import Login from "./components/shared/auth/Login";
import Signup from "./components/shared/auth/SignUp";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";

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
      </Route>

    </Routes>
  );
}
