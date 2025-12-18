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
    <div className="max-w-7xl mx-auto my-5 p-8 bg-white border rounded-2xl">
      {/* Top Section */}
      <div className="flex justify-between items-start">
        <div className="flex gap-5">
          <img
            src={user.profile?.profilePhoto || "https://i.pravatar.cc/100"}
            alt="profile"
            className="w-16 h-16 rounded-full border"
          />
          <div>
            <h2 className="text-xl font-semibold">{user.fullname}</h2>
            <p className="text-gray-600 mt-1 max-w-xl text-sm">
              {user.profile?.bio || "No bio added"}
            </p>
          </div>
        </div>

        {/* Edit Button */}
        <button
          onClick={() => setOpen(true)}
          className="p-2 border rounded-lg hover:bg-gray-100"
        >
          <FiEdit size={18} />
        </button>
      </div>

      {/* Contact Section */}
      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-3">
          <MdEmail /> <span>{user.email}</span>
        </div>
        <div className="flex items-center gap-3">
          <FaPhoneAlt /> <span>{user.phoneNumber}</span>
        </div>
      </div>

      {/* Skills Section */}
      <div className="mt-6">
        <h3 className="font-semibold mb-2">Skills</h3>
        <div className="flex gap-3 flex-wrap">
          {user.profile?.skills?.length ? (
            user.profile.skills.map((skill, i) => (
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

      {/* Resume Section */}
      <div className="mt-6">
        <h3 className="font-semibold mb-1">Resume</h3>
        {user.profile?.resume ? (
          <a
            href={user.profile.resume}
            className="text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {user.profile.resumeOriginalName || "View Resume"}
          </a>
        ) : (
          <span className="text-gray-500">NA</span>
        )}
      </div>

      {/* Applied Jobs Table */}
      <div className="mt-6">
        <AppliedJobTable />
      </div>

      {/* Update Profile Dialog */}
      <UpdateProfileDialog open={open} setOpen={setOpen} user={user} />
    </div>
  );
};

export default Profile;
