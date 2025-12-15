import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { useSelector } from "react-redux";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDailog";

const Profile = () => {
  const { user } = useSelector((store) => store.auth);
  const [open, setOpen] = useState(false);

  if (!user) return null;

  return (
    <div>
      <div className="max-w-7xl mx-auto bg-white border rounded-2xl my-5 p-8">
        {/* Top Section */}
        <div className="flex justify-between items-start">
          <div className="flex gap-5">
            <img
              src={user.profilePic || "https://i.pravatar.cc/100"}
              alt="profile"
              className="w-16 h-16 rounded-full border"
            />

            <div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-600 mt-1 max-w-xl text-sm">
                {user.bio || "No bio added"}
              </p>
            </div>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="p-2 border rounded-lg hover:bg-gray-100"
          >
            <FiEdit size={18} />
          </button>
        </div>

        {/* Contact */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-3">
            <MdEmail /> <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <FaPhoneAlt /> <span>{user.phone}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Skills</h3>
          <div className="flex gap-3 flex-wrap">
            {user.skills?.length ? (
              user.skills.map((skill, i) => (
                <span
                  key={i}
                  className="bg-slate-900 text-white px-4 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-gray-500">NA</span>
            )}
          </div>
        </div>

        {/* Resume */}
        <div className="mt-6">
          <h3 className="font-semibold mb-1">Resume</h3>
          {user.resume ? (
            <a href={user.resume} className="text-blue-600 underline">
              View Resume
            </a>
          ) : (
            <span className="text-gray-500">NA</span>
          )}
        </div>
      </div>
      <AppliedJobTable/>
      
      <UpdateProfileDialog open={open} setOpen={setOpen} user={user} />
    </div>
  );
};

export default Profile;
