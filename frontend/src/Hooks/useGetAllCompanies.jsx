import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../utils/context";
import { setAllCompanies } from "../redux/companySlice";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setAllCompanies(res.data.companies));
        } else {
          dispatch(setAllCompanies([])); // set empty array if no companies
        }
      } catch (error) {
        console.log("Company fetch error:", error);
        dispatch(setAllCompanies([])); // fail-safe
      }
    };

    fetchCompanies();
  }, [dispatch]);
};

export default useGetAllCompanies;
