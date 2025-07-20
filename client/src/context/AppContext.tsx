import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import humanizeDuration from 'humanize-duration'
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";
import type { Course, User } from "../types/interfaces";

interface AppContextType {
    navigate: ReturnType<typeof useNavigate>;
    isEducator: boolean;
    backendUrl: string;
    setIsEducator: (value: boolean) => void;
    getToken: () => Promise<string>;
    allCourses: Course[];
    setAllCourses: React.Dispatch<React.SetStateAction<Course[]>>;
    searchInput: string;
    setSearchInput: React.Dispatch<React.SetStateAction<string>>;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    sort: string;
    setSort: React.Dispatch<React.SetStateAction<string>>;
    order: string;
    setOrder: React.Dispatch<React.SetStateAction<string>>;
    totalPages: number;
    setTotalPages: React.Dispatch<React.SetStateAction<number>>;
    currency: string;

    calculateRating: (course: { courseRatings: { rating: number }[] }) => number;
    calculateChapterTime: (chapter: { chapterContent: { lectureDuration: number }[] }) => string;
    calculateCourseDuration: (course: { courseContent: { chapterContent: { lectureDuration: number }[] }[] }) => string;
    calculateNoOfLectures: (course: { courseContent: { chapterContent: any[] }[] }) => number;

    userData: User | null;
    enrolledCourses: Course[];
    fetchUserEnrolledCourses: () => Promise<void>;
    fetchAllCourses: () => Promise<void>;
}

interface AppContextProviderProps {
    children: ReactNode;
}

const defaultContextValue: AppContextType = {
    navigate: () => { },
    isEducator: false,
    backendUrl: '',
    setIsEducator: () => { },
    getToken: async () => '',
    allCourses: [],
    setAllCourses: () => { },
    searchInput: '',
    setSearchInput: () => { },
    page: 1,
    setPage: () => { },
    sort: '',
    setSort: () => { },
    order: '',
    setOrder: () => { },
    totalPages: 1,
    setTotalPages: () => { },
    currency: 'USD',
    calculateRating: () => 0,
    calculateChapterTime: () => '',
    calculateCourseDuration: () => '',
    calculateNoOfLectures: () => 0,
    userData: null,
    enrolledCourses: [],
    fetchUserEnrolledCourses: async () => { },
    fetchAllCourses: async () => { }
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
    const [searchInput, setSearchInput] = useState<string>("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(8);
    const [sort, setSort] = useState("createdAt");
    const [order, setOrder] = useState("desc");
    const [totalPages, setTotalPages] = useState<number>(1);

    // Fetch all courses
    const fetchAllCourses = async (
        search: string = "",
        page: number = 1,
        limit: number = 10,
        sort: string = "createdAt",
        order: string = "desc"
    ) => {
        try {
            const { data } = await axios.get(
                `${backendUrl}/api/course/all`,
                {
                    params: {
                        search,
                        page,
                        limit,
                        sort,
                        order
                    }
                }
            );

            if (data.success) {
                setAllCourses(data.courses);
                setTotalPages(data.totalPages);
            } else {
                toast.error(data.message);
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    //Function to fetch user data
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
            toast.error((error as Error).message)
        }
    }

    // Function to calculate average rating of course
    const calculateRating = (course: { courseRatings: any[]; }) => {
        if (course.courseRatings.length === 0) {
            return 0;
        }
        let totalRating = 0
        course.courseRatings.forEach((rating: { rating: number; }) => {
            totalRating += rating.rating
        })
        return Math.floor(totalRating / course.courseRatings.length)
    }

    //Function to calculate chapter time
    const calculateChapterTime = (chapter: { chapterContent: any[]; }) => {
        let time = 0
        chapter.chapterContent.map((lecture: { lectureDuration: number; }) => time += lecture.lectureDuration)
        return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] })
    }

    //Function to calculate course duration
    const calculateCourseDuration = (course: { courseContent: any[]; }) => {
        let time = 0
        course.courseContent.map((chapter: { chapterContent: any[]; }) => chapter.chapterContent.map((lecture: { lectureDuration: number; }) => time += lecture.lectureDuration))
        return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] })
    }

    //Function to calculate no of lectures in the course
    const calculateNoOfLectures = (course: { courseContent: any[]; }) => {
        let totalLectures = 0;
        course.courseContent.forEach((chapter: { chapterContent: string | any[]; }) => {
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
            toast.error((error as Error).message)
        }
    }

    useEffect(() => {
        fetchAllCourses(searchInput, page, limit, sort, order);
    }, [searchInput, page, limit, sort, order]);

    useEffect(() => {
        if (user) {
            fetchUserData()
            fetchUserEnrolledCourses()
        }
    }, [user])


    const value: any = {
        currency, allCourses, navigate, calculateRating,
        isEducator, setIsEducator, calculateChapterTime, calculateCourseDuration, calculateNoOfLectures,
        enrolledCourses, setEnrolledCourses, fetchUserEnrolledCourses, backendUrl, userData, setUserData, getToken, fetchAllCourses,
        searchInput, setSearchInput, page, setPage, limit, setLimit, sort, setSort, order, setOrder, totalPages, setTotalPages
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

