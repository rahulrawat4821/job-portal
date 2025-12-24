import { createSlice } from "@reduxjs/toolkit";
import { set } from "mongoose";

const companySlice = createSlice({
  name: "company",
  initialState: {
    singleCompany: null,
    companies: [],
    serachCompanyText:"",
  },
  reducers: {
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
    setAllCompanies: (state, action) => {
      state.companies = action.payload;
    },
    setSearchCompanyText:(state,action)=>{
      state.serachCompanyText=action.payload;
    },
  },
});

export const { setSingleCompany, setAllCompanies, setSearchCompanyText } = companySlice.actions;
export default companySlice.reducer;
