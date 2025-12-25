import React, { use, useEffect } from 'react'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import useGetAllJobs from '../Hooks/useGetAllJobs';
import { setSearchedQuery } from '../redux/jobSlice';

const randomJobs = [1, 2, 3];

const Browse = () => {
  useGetAllJobs();
  const {allJobs}= useSelector((state) => state.job);
    const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    }
  },[]);
  return (
    <div className="max-w-7xl mx-auto my-10 px-3">
      <h1 className="text-xl font-semibold mb-5">
        Search Results ({allJobs.length})
      </h1>

      {/* GRID FIXED */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {allJobs.map((job) => (
          <Job key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default Browse;
