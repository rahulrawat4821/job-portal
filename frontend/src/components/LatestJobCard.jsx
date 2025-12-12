import React from "react";

const LatestJobCard = () => {
  return (
    <div className="border border-gray-100 p-5 rounded-xl bg-white cursor-pointer hover:shadow-xl">
     <div>
        <h1 className="font-medium text-lg">Company Name</h1>
         <p className="text-sm text-gray-500">India</p>
     </div>
     <div>
      <h1 className="font-bold text-lg my-2">Job Title</h1>
      <p className="text-sm text-gray-600">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
     </div>
     <div className="flex items-center gap-2 mt-4">
      <h3 className="text-blue-700">12 Positions</h3>
      <h3 className="text-[#F83002]">Part Time</h3>
      <h3 className="text-[#7209b7]">24 LPA</h3>
     </div>
    
    </div>
  );
};

export default LatestJobCard;
