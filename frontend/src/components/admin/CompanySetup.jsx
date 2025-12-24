import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../../utils/context";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "../../Hooks/useGetCompanyById";

const CompanySetup = () => {
  
  const { id } = useParams();
  const navigate = useNavigate();
  const { singleCompany } = useSelector((store) => store.company);

  useGetCompanyById(id);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  useEffect(() => {
    if (singleCompany) {
      setFormData({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: null,
      });
    }
  }, [singleCompany]);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fileHandler = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("website", formData.website);
    data.append("location", formData.location);

    if (formData.file) {
      data.append("file", formData.file); // 🔥 MUST MATCH multer
    }

    try {
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${id}`,
        data,
        { withCredentials: true } // ✅ DO NOT set Content-Type
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 px-4">
      <button onClick={() => navigate(-1)} className="mb-6 text-gray-600">
        ← Back
      </button>

      <h1 className="text-2xl font-semibold mb-6">Company Setup</h1>

      <form onSubmit={submitHandler} className="grid grid-cols-2 gap-6">
        <input name="name" value={formData.name} onChange={changeHandler} placeholder="Company Name" />
        <input name="description" value={formData.description} onChange={changeHandler} placeholder="Description" />
        <input name="website" value={formData.website} onChange={changeHandler} placeholder="Website" />
        <input name="location" value={formData.location} onChange={changeHandler} placeholder="Location" />
        <input type="file" onChange={fileHandler} className="col-span-2" />

        <button className="col-span-2 bg-black text-white py-3 rounded-md">
          Update
        </button>
      </form>
    </div>
  );
};

export default CompanySetup;
