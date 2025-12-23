import React, { use, useEffect } from 'react'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './Footer'
import useGetAllJobs from '../Hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

const Home = () => {
  useGetAllJobs();
  const {user} = useSelector(store=>store.auth);
  const navigate = useNavigate();
  useEffect(()=>{
    if(user?.role === 'recruiter'){
      navigate("admin/companies");
    }
  }, []);


  return (
    <div>
       <HeroSection/>
       <CategoryCarousel/>
       <LatestJobs/>
       <Footer/>
    </div>
  )
}

export default Home