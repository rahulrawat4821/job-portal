import React from "react";
import { useNavigate } from 'react-router-dom';


const LatestJobCard = ({job}) => {
   const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/description/${job._id}`)} className="border border-gray-100 p-5 rounded-xl bg-white cursor-pointer hover:shadow-xl">
     <div>
        <h1 className="font-medium text-lg">{job?.company?.name}</h1>
         <p className="text-sm text-gray-500">India</p>
     </div>
     <div>
      <h1 className="font-bold text-lg my-2">{job?.title}</h1>
      <p className="text-sm text-gray-600">{job?.description}</p>
     </div>
     <div className="flex items-center gap-2 mt-4">
      <h3 className="text-blue-700 bg-blue-100 px-3 py-1 rounded-full text-xs font-semibold">{job?.position} Positions</h3>
      <h3 className="text-red-600 bg-red-100 px-3 py-1 rounded-full text-xs font-semibold">{job?.jobType}</h3>
      <h3 className="text-purple-700 bg-purple-100 px-3 py-1 rounded-full text-xs font-semibold">{job?.salary} LPA</h3>
     </div>
    
    </div>
  );
};

export default LatestJobCard;
