import React from 'react'
import { assets } from '../../assets/assets'
import SearchBar from './SearchBar'

const Hero = () => {
    return (
        <div className='flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-lightBackground'>
            <div className="text-center md:text-center max-w-3xl">
                <h1 className="text-3xl sm:text-4xl md:text-5xl text-black">
                    Empower your future with the courses designed to{" "}
                    <span className="block font-bold text-primaryBlue mt-1 relative">
                        fit your choice.
                        <img src={assets.sketch} alt="sketch" className='md:block hidden absolute -bottom-7 right-0' />
                    </span>
                </h1>
            </div>
            <p className='md:block hidden text-gray-500 max-w-2xl mx-auto'>
                We bring together world-class instructors, interactive content, and a supportive community to help you achieve your personal and professional goals.
            </p>

            <p className='md:hidden text-gray-500 max-w-sm mx-auto'>
                We bring together world-class instructors to help you achieve your professional goals.
            </p>

            <SearchBar />
        </div>





    )
}

export default Hero