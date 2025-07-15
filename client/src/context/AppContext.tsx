import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import humanizeDuration from 'humanize-duration'
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";
import type { Course, User } from "../types/interfaces";

interface AppContextType {
}

interface AppContextProviderProps {
    children: ReactNode;
}

const defaultContextValue: AppContextType = {
};

export const AppContext = createContext<AppContextType>(defaultContextValue);

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
    const backendUrl = 'https://neo-learn-server.vercel.app'
    const currency = import.meta.env.VITE_CURRENCY
    const navigate = useNavigate()

    const { getToken } = useAuth()
    const { user } = useUser()

    const [isEducator, setIsEducator] = useState(false)
    const [allCourses, setAllCourses] = useState<Course[]>([]);
    const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
    const [userData, setUserData] = useState<User | null>(null);

    // Fetch all courses
    const fetchAllCourses = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/course/all');

            if (data.success) {
                setAllCourses(data.courses)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)

        }
    }

    const fetchUserData = async () => {
        if (user && user.publicMetadata?.role === 'educator') {
            setIsEducator(() => {
                return true;
            });
        }

        try {
            const token = await getToken();
            const { data } = await axios.get(backendUrl + '/api/user/data', {
                headers: { Authorization: `Bearer ${token}` }
            })

            if (data.success) {
                setUserData(data.user)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
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
        return Math.floor(totalRating / course.courseRatings.length)
    }

    //Function to calculate chapter time

    const calculateChapterTime = (chapter) => {
        let time = 0
        chapter.chapterContent.map((lecture) => time += lecture.lectureDuration)
        return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] })
    }

    //Function to calculate course duration

    const calculateCourseDuration = (course) => {
        let time = 0
        course.courseContent.map((chapter) => chapter.chapterContent.map((lecture) => time += lecture.lectureDuration))
        return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] })
    }

    //Function to calculate no of lectures in the course

    const calculateNoOfLectures = (course) => {
        let totalLectures = 0;
        course.courseContent.forEach(chapter => {
            if (Array.isArray(chapter.chapterContent)) {
                totalLectures += chapter.chapterContent.length
            }
        });
        return totalLectures;
    }

    // Fetch user enrolled courses
    const fetchUserEnrolledCourses = async () => {
        try {
            const token = await getToken();

            const { data } = await axios.get(backendUrl + '/api/user/enrolled-courses', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (data.success) {
                setEnrolledCourses(data.enrolledCourses.reverse())
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchAllCourses()
    }, [])


    useEffect(() => {
        if (user) {
            fetchUserData()
            fetchUserEnrolledCourses()
        }
    }, [user])


    const value: AppContextType = {
        currency, allCourses, navigate, calculateRating,
        isEducator, setIsEducator, calculateChapterTime, calculateCourseDuration, calculateNoOfLectures,
        enrolledCourses, setEnrolledCourses, fetchUserEnrolledCourses, backendUrl, userData, setUserData, getToken, fetchAllCourses
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

