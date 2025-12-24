import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { APPLICATION_API_END_POINT } from "../utils/context";
import { setAllAppliedJobs } from "../redux/jobSlice";

const useGetAppliedJob = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/applied-jobs`,
          { withCredentials: true }
        );

        // backend returns ARRAY
        if (Array.isArray(res.data)) {
          dispatch(setAllAppliedJobs(res.data));
        } else {
          dispatch(setAllAppliedJobs([]));
        }
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
        dispatch(setAllAppliedJobs([]));
      }
    };

    fetchAppliedJobs();
  }, [dispatch]);
};

export default useGetAppliedJob;
