import React, { useState } from "react";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "FullStack Developer",
      "UI/UX Designer",
    ],
  },
  {
    filterType: "Salary",
    array: ["0 - 40k", "40k - 1 Lakh", "1 Lakh - 5 Lakh"],
  },
];

const FilterCard = () => {
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleChange = (type, value) => {
    setSelectedFilters({
      ...selectedFilters,
      [type]: value,
    });
  };

  return (
    <div className="w-full bg-white shadow-lg p-5 rounded-xl border">
      <h2 className="text-lg font-semibold pb-2 mb-4 border-b">Filters</h2>

      {filterData.map((section, index) => (
        <div key={index} className="mb-5">
          <h3 className="font-medium text-gray-800 mb-2">
            {section.filterType}
          </h3>

          <div className="flex flex-col gap-2">
            {section.array.map((item, idx) => (
              <label key={idx} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={section.filterType}
                  value={item}
                  checked={selectedFilters[section.filterType] === item}
                  onChange={() => handleChange(section.filterType, item)}
                  className="accent-purple-600 w-4 h-4 cursor-pointer"
                />
                <span className="text-sm text-gray-700">{item}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
