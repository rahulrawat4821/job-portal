import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import {useDispatch} from 'react-redux';
import { setSearchedQuery } from '../redux/jobSlice';
import {useNavigate} from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate('/browse');
    }   
    return (
        <div className='text-center mt-5'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No. 1 Job Hunt Website </span>
                <h1 className='text-5xl font-bold'>Search, Appy & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur, error corrupti perspiciatis nulla illo in?</p>
                <div className="flex w-[40%] h-16 shadow-lg border border-gray-200 rounded-full items-center px-4 mx-auto">
                    <input
                        type="text"
                        placeholder="Find Your Dream Jobs"
                        onChange={(e) => setQuery(e.target.value)}
                        className="flex-1 outline-none border-none text-gray-700"
                    />
                    <button onClick={searchJobHandler} className="h-12 w-12 flex items-center justify-center rounded-full bg-[#6A38C2] text-white">
                        <CiSearch className="h-6 w-6" />
                    </button>
                </div>

            </div>

        </div>
    )
}

export default HeroSection