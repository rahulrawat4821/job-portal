import React from "react";

const LatestJobCard = ({job}) => {
  return (
    <div className="border border-gray-100 p-5 rounded-xl bg-white cursor-pointer hover:shadow-xl">
     <div>
        <h1 className="font-medium text-lg">{job?.company?.name}</h1>
         <p className="text-sm text-gray-500">India</p>
     </div>
     <div>
      <h1 className="font-bold text-lg my-2">{job?.title}</h1>
      <p className="text-sm text-gray-600">{job?.description}</p>
     </div>
     <div className="flex items-center gap-2 mt-4">
      <h3 className="text-blue-700">{job?.position}</h3>
      <h3 className="text-[#F83002]">{job?.jobType}</h3>
      <h3 className="text-[#7209b7]">{job?.salary}</h3>
     </div>
    
    </div>
  );
};

export default LatestJobCard;
