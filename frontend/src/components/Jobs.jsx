import React from "react";
import FilterCard from "./FilterCard";
import Job from "./Job";

const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 mt-6">
      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Sidebar (hidden on mobile) */}
        <aside className="hidden md:block md:w-1/4 lg:w-1/5">
          <FilterCard />
        </aside>

        {/* Jobs Section */}
        <main className="flex-1 h-[85vh] overflow-y-auto pb-4">
          {jobsArray.length === 0 ? (
            <p>Job not found</p>
          ) : (
            <div className="
              grid 
              grid-cols-1 
              sm:grid-cols-2 
              lg:grid-cols-3 
              gap-5
            ">
              {jobsArray.map((item, index) => (
                <Job key={index} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Jobs;
