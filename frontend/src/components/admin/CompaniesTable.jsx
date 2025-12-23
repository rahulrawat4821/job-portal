import React from "react";
import { useSelector } from "react-redux";
import useGetAllCompanies from "../../Hooks/useGetAllCompanies";

const CompaniesTable = () => {
  useGetAllCompanies(); // fetch companies on mount
  const { companies } = useSelector((store) => store.company);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      {companies && companies.length > 0 ? (
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b text-gray-500 text-sm">
              <th className="text-left py-4 px-4">Logo</th>
              <th className="text-left py-4 px-4">Name</th>
              <th className="text-left py-4 px-4">Date</th>
              <th className="text-right py-4 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company._id} className="border-b hover:bg-gray-50">
                <td className="py-4 px-4">
                  <img
                    src={
                      company.logo ||
                      "https://cdn-icons-png.flaticon.com/512/5968/5968705.png"
                    }
                    alt={company.name}
                    className="w-8 h-8 rounded-full"
                  />
                </td>
                <td className="py-4 px-4 font-medium text-gray-800">
                  {company.name}
                </td>
                <td className="py-4 px-4 text-gray-600">
                  {new Date(company.createdAt).toLocaleDateString()}
                </td>
                <td className="py-4 px-4 text-right">
                  <button className="text-xl font-bold">•••</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-400 py-6">
          You haven't registered any companies yet. Create one to get started!
        </p>
      )}
    </div>
  );
};

export default CompaniesTable;
