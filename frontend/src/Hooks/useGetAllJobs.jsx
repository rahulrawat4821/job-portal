import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { JOB_API_END_POINT } from "../utils/context";
import { setAllJobs } from "../redux/jobSlice";

const useGetAllJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_END_POINT}/get`,
          { withCredentials: true }
        );

        // ✅ FIXED HERE
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.log("Job fetch error:", error);
      }
    };

    fetchAllJobs();
  }, [dispatch]);
};

export default useGetAllJobs;
