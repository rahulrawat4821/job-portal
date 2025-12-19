import React from "react";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";

const Jobs = () => {
  const { allJobs } = useSelector(store => store.job);

  return (
    <div className="max-w-7xl mx-auto px-4 mt-6">
      <div className="flex gap-6">
        <aside className="hidden md:block w-1/4">
          <FilterCard />
        </aside>

        <main className="flex-1">
          {allJobs?.length === 0 ? (
            <p>Job not found</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {allJobs.map(job => (
                <Job key={job._id} job={job} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Jobs;
