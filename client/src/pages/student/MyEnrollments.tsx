import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { Line } from 'rc-progress'
import Footer from '../../components/student/Footer'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyEnrollments = () => {
    const { enrolledCourses, calculateCourseDuration, calculateNoOfLectures, navigate, getToken, backendUrl, userData, fetchUserEnrolledCourses } = useContext(AppContext)
    const [progressArray, setProgressArray] = useState([])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const getCourseProgress = async () => {
        try {
            const token = await getToken();
            const tempProgressArray = await Promise.all(
                enrolledCourses.map(async (course) => {
                    const { data } = await axios.post(`${backendUrl}/api/user/get-course-progress`, {
                        courseId: course._id
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    let totalLectures = calculateNoOfLectures(course);
                    const lectureCompleted = data.progressData ? data.progressData.lectureCompleted.length : 0;
                    return { totalLectures, lectureCompleted }
                })
            )
            setProgressArray(tempProgressArray);
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (userData) {
            fetchUserEnrolledCourses()
        }
    }, [userData])

    useEffect(() => {
        if (enrolledCourses.length > 0) {
            getCourseProgress()
        }
    }, [enrolledCourses])

    return (
        <>
            <div className='md:px-36 px-4 pt-10 pb-20'>
                <h1 className='text-3xl font-bold text-gray-800 mb-8'>My Enrollments</h1>
                <div className="overflow-x-auto rounded-lg shadow-md">
                    <table className='w-full table-auto text-sm text-left text-gray-700'>
                        <thead className='bg-gray-100 text-gray-900 uppercase text-xs font-semibold tracking-wide'>
                            <tr>
                                <th className='px-6 py-4'>Course</th>
                                <th className='px-6 py-4 max-sm:hidden'>Duration</th>
                                <th className='px-6 py-4 max-sm:hidden'>Progress</th>
                                <th className='px-6 py-4 text-center'>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {enrolledCourses.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-10 text-gray-500">
                                        You haven’t enrolled in any courses yet.
                                    </td>
                                </tr>
                            ) : (
                                enrolledCourses.map((course, index) => {
                                    const progress = progressArray[index]
                                    const percentage = progress ? (progress.lectureCompleted * 100) / progress.totalLectures : 0
                                    const isCompleted = progress && progress.lectureCompleted === progress.totalLectures

                                    return (
                                        <tr key={index} className='bg-white  hover:bg-gray-50 transition'>
                                            <td className='px-6 py-4 flex items-center gap-4'>
                                                <img src={course.courseThumbnail} alt="thumbnail" className='w-14 h-14 object-cover rounded border' />
                                                <div>
                                                    <p className='font-medium text-gray-800'>{course.courseTitle}</p>
                                                    <div className='mt-2 w-40'>
                                                        <Line
                                                            strokeWidth={3}
                                                            percent={percentage}
                                                            strokeColor="#3b82f6"
                                                            trailColor="#e5e7eb"
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='px-6 py-4 max-sm:hidden whitespace-nowrap'>
                                                {calculateCourseDuration(course)}
                                            </td>
                                            <td className='px-6 py-4 max-sm:hidden whitespace-nowrap'>
                                                {progress &&
                                                    <span className="font-medium text-gray-800">
                                                        {progress.lectureCompleted} / {progress.totalLectures}
                                                        <span className='ml-1 text-gray-500'>Lectures</span>
                                                    </span>
                                                }
                                            </td>
                                            <td className='px-6 py-4 text-center'>
                                                <button
                                                    className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide shadow-sm ${isCompleted
                                                        ? 'bg-green-600 hover:bg-green-700 text-white'
                                                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                                                        }`}
                                                    onClick={() => navigate('/player/' + course._id)}
                                                >
                                                    {isCompleted ? 'Completed' : 'Continue'}
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default MyEnrollments

