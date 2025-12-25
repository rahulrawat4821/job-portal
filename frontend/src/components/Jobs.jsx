import React, { useMemo, useState } from "react";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";

const Jobs = () => {
  const { allJobs } = useSelector(store => store.job);
  const [selectedFilters, setSelectedFilters] = useState({});

  const filteredJobs = useMemo(() => {
    return allJobs.filter(job => {
      return (
        (!selectedFilters.Location ||
          job.location?.toLowerCase() ===
          selectedFilters.Location.toLowerCase()) &&

        (!selectedFilters.Industry ||
          job.title?.toLowerCase().includes(
            selectedFilters.Industry.toLowerCase().split(" ")[0]
          ) ||
          job.description?.toLowerCase().includes(
            selectedFilters.Industry.toLowerCase().split(" ")[0]
          ))
        &&

        (!selectedFilters.Salary ||
          job.salaryRange === selectedFilters.Salary)
      );
    });
  }, [allJobs, selectedFilters]);

  return (
    <div className="max-w-7xl mx-auto px-4 mt-6">
      <div className="flex gap-6">
        <aside className="hidden md:block w-1/4">
          <FilterCard
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        </aside>

        <main className="flex-1">
          {filteredJobs.length === 0 ? (
            <p>Job not found</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredJobs.map(job => (
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
