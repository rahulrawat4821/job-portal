import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { COMPANY_API_END_POINT } from "../../utils/context";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "../../redux/companySlice";

function CompanyCreate() {
  const [companyName, setCompanyName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!companyName.trim()) {
      toast.error("Company name is required");
      return;
    }

    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { name: companyName },
        { withCredentials: true }
      );

      if (res.data.success) {
        const companyId = res.data.company._id;

        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);

        // ✅ navigate to CompanySetup
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-20 px-4">
      <h1 className="text-2xl font-semibold mb-2">Your Company Name</h1>

      <p className="text-gray-500 mb-8">
        What would you like to give your company name? you can change this later.
      </p>

      <form onSubmit={submitHandler}>
        <label className="block font-medium mb-2">Company Name</label>

        <input
          type="text"
          placeholder="JobHunt, Microsoft etc."
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="w-full border-2 border-black rounded-lg px-4 py-3 mb-8 focus:outline-none"
        />

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => navigate("/admin/companies")}
            className="px-6 py-2 border rounded-md"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}

export default CompanyCreate;
