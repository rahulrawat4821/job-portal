import React from "react";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { use } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { setSearchCompanyText } from "../../redux/companySlice";

const Companies = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyText(input));
  }, [input, dispatch]);

  return (
    <div className="max-w-6xl mx-auto my-10 px-4">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <input
          type="text"
          placeholder="Filter by name"
          className="border border-gray-300 rounded-md px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-gray-400"
          onChange={(e) => setInput(e.target.value)}
        />

        <button onClick={() => navigate("/admin/companies/create")} className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition">
          New Company
        </button>
      </div>
      
      <CompaniesTable />
    </div>
  );
};

export default Companies;
