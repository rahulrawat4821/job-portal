import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";
import { USER_API_END_POINT } from "../utils/context";
import { toast } from "sonner";

const UpdateProfileDialog = ({ open, setOpen, user }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullname: user.fullname || "",
    phoneNumber: user.phoneNumber || "",
    bio: user.profile?.bio || "",
    skills: user.profile?.skills?.join(",") || "",
  });

  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("fullname", formData.fullname);
      data.append("phoneNumber", formData.phoneNumber);
      data.append("bio", formData.bio);
      data.append("skills", formData.skills);
      data.append("resume", formData.resume);

      const res = await axios.put(
        `${USER_API_END_POINT}/profile/update`,
        data,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        setOpen(false);
        toast.success(res.data.message || "Profile updated successfully!");

      }
    } catch (error) {
      console.log("Profile update error:", error);
      toast.error("Failed to update profile!");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl p-6 relative">

        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 text-xl"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-5">Update Profile</h2>

        <form onSubmit={submitHandler} className="space-y-4">

          {/* Full Name */}
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={changeHandler}
            placeholder="Full Name"
            className="w-full border p-3 rounded-lg"
            required
          />

          {/* Email (Readonly) */}
          <input
            type="email"
            value={user.email}
            disabled
            className="w-full border p-3 rounded-lg bg-gray-100"
          />

          {/* Phone Number */}
          <input
            type="number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={changeHandler}
            placeholder="Phone Number"
            className="w-full border p-3 rounded-lg"
            required
          />

          {/* Bio */}
          <textarea
            name="bio"
            value={formData.bio}
            onChange={changeHandler}
            placeholder="Bio"
            className="w-full border p-3 rounded-lg"
            rows={3}
          />

          {/* Skills */}
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={changeHandler}
            placeholder="Skills (comma separated)"
            className="w-full border p-3 rounded-lg"
          />

          {/* //resume */}
          <input
            type="file"
            name="resume"
            accept=".pdf"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, resume: e.target.files[0] }))
            }
            className="w-full border p-2 rounded-lg"
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-slate-900 to-slate-700 text-white py-3 rounded-lg font-semibold disabled:opacity-60"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileDialog;
