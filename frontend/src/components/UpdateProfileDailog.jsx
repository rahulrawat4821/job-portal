import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";

const UpdateProfileDialog = ({ open, setOpen, user }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    bio: user.bio || "",
    skills: user.skills?.join(",") || "",
    resume: null,
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fileHandler = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const updatedUser = {
      ...user,
      name: formData.name,
      bio: formData.bio,
      phone: formData.phone,
      skills: formData.skills.split(","),
      resume: formData.resume
        ? formData.resume.name // frontend demo
        : user.resume,
    };

    dispatch(setUser(updatedUser));
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl p-6 relative">
        <button
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 text-xl"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-5">Update Profile</h2>

        <form onSubmit={submitHandler} className="space-y-4">
          {/* Name */}
          <input
            name="name"
            value={formData.name}
            onChange={changeHandler}
            placeholder="Name"
            className="w-full border p-3 rounded-lg"
          />

          {/* Email */}
          <input
            name="email"
            value={formData.email}
            disabled
            className="w-full border p-3 rounded-lg bg-gray-100"
          />

          {/* Phone */}
          <input
            name="phone"
            value={formData.phone}
            onChange={changeHandler}
            placeholder="Phone"
            className="w-full border p-3 rounded-lg"
          />

          {/* Bio */}
          <textarea
            name="bio"
            value={formData.bio}
            onChange={changeHandler}
            placeholder="Bio"
            className="w-full border p-3 rounded-lg"
          />

          {/* Skills */}
          <input
            name="skills"
            value={formData.skills}
            onChange={changeHandler}
            placeholder="Skills (comma separated)"
            className="w-full border p-3 rounded-lg"
          />

          {/* Resume Upload */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Resume (PDF only)
            </label>

            <input
              type="file"
              accept=".pdf"
              onChange={fileHandler}
              className="w-full border p-2 rounded-lg"
            />

            {formData.resume && (
              <p className="text-sm text-green-600 mt-1">
                Selected: {formData.resume.name}
              </p>
            )}

            {!formData.resume && user.resume && (
              <p className="text-sm text-gray-500 mt-1">
                Current: {user.resume}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-slate-900 to-slate-700 text-white py-3 rounded-lg font-semibold"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileDialog;
