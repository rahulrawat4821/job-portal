import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAllAppliedJobs } from "../redux/jobSlice";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "../utils/context";

const useGetAppliedJob = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/get`,
          { withCredentials: true }
        );

        dispatch(setAllAppliedJobs(res.data));
      } catch (error) {
        console.error("Applied jobs error:", error);
        dispatch(setAllAppliedJobs([]));
      }
    };

    fetchAppliedJobs();
  }, [dispatch]);
};

export default useGetAppliedJob;
