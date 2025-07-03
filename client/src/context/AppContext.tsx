import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";

interface AppContextType {
}

interface AppContextProviderProps {
    children: ReactNode;
}

const defaultContextValue: AppContextType = {
};

export const AppContext = createContext<AppContextType>(defaultContextValue);

export const AppContextProvider = ({ children }: AppContextProviderProps) => {

    const currency = import.meta.env.VITE_CURRENCY
    const navigate = useNavigate()

    const [allCourses, setAllCourses] = useState([])
    const [isEducator, setIsEducator] = useState(true)

    // Fetch all courses
    const fetchAllCourses = async () => {
        setAllCourses(dummyCourses)
    }

    // Function to calculate average rating of course
    const calculateRating = (course) => {
        if (course.courseRatings.length === 0) {
            return 0;
        }
        let totalRating = 0
        course.courseRatings.forEach(rating => {
            totalRating += rating.rating
        })
        return totalRating / course.courseRatings.length
    }

    useEffect(() => {
        fetchAllCourses()
    }, [])


    const value: AppContextType = {
        currency, allCourses, navigate, calculateRating,
        isEducator,setIsEducator
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

