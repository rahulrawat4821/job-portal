import React from 'react'
import Job from './Job';

const randomJobs = [1, 2, 3];

const Browse = () => {
  return (
    <div className="max-w-7xl mx-auto my-10 px-3">
      <h1 className="text-xl font-semibold mb-5">
        Search Results ({randomJobs.length})
      </h1>

      {/* GRID FIXED */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {randomJobs.map((item, index) => (
          <Job key={index} />
        ))}
      </div>
    </div>
  );
};

export default Browse;
