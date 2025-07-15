// import React, { useContext, useEffect, useState } from 'react'
// import { AppContext } from '../../context/AppContext'
// import { Line } from 'rc-progress'
// import Footer from '../../components/student/Footer'
// import axios from 'axios'
// import { toast } from 'react-toastify'

// const MyEnrollments = () => {

//     const { enrolledCourses, calculateCourseDuration, calculateNoOfLectures,navigate, getToken, backendUrl, userData, fetchUserEnrolledCourses } = useContext(AppContext)

//     const [progressArray, setProgressArray] = useState([])

//     const getCourseProgress = async () => {
//         try {
//             const token = await getToken();
//             const tempProgressArray = await Promise.all(
//                 enrolledCourses.map(async (course) => {
//                     const { data } = await axios.post(`${backendUrl}/api/user/get-course-progress`, {
//                         courseId: course._id
//                     }, {
//                         headers: {
//                             Authorization: `Bearer ${token}`
//                         }
//                     })
//                     let totalLectures = calculateNoOfLectures(course);
//                     const lectureCompleted = data.progressData ? data.progressData.lectureCompleted.length : 0;
//                     return { totalLectures, lectureCompleted }
//                 })
//             )
//             setProgressArray(tempProgressArray);
//         } catch (error) {
//             toast.error(error.message);
//         }
//     }

//     useEffect(() => {
//         if (userData) {
//             fetchUserEnrolledCourses()
//         }
//     }, [userData])

//     useEffect(() => {
//         if (enrolledCourses.length > 0) {
//             getCourseProgress()
//         }
//     }, [enrolledCourses])



//     return (
//         <>
//             <div className='md:px-36 px-8 pt-10'>
//                 <h1 className='text-2xl font-semibold'>My Enrollments</h1>
//                 <table className='md:table-auto table-fixed w-full overflow-hidden border mt-10'>
//                     <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left max-sm:hidden'>
//                         <tr>
//                             <th className='px-4 py-3 font-semibold truncate'>Course</th>
//                             <th className='px-4 py-3 font-semibold truncate'>Duration</th>
//                             <th className='px-4 py-3 font-semibold truncate'>Completed</th>
//                             <th className='px-4 py-3 font-semibold truncate'>Status</th>
//                         </tr>
//                     </thead>
//                     <tbody className='text-gray-700'>
//                         {enrolledCourses.map((course, index) => (
//                             <tr key={index} className='border-b border-gray-500/20'>
//                                 <td className='md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3'>
//                                     <img src={course.courseThumbnail} alt="" className='w-14 sm:w-24 md:w-28' />
//                                     <div className='flex-1'>
//                                         <p className='mb-1 max-sm:text-sm'>{course.courseTitle}</p>
//                                         <Line strokeWidth={2} percent={progressArray[index] ? (progressArray[index].lectureCompleted * 100) / progressArray[index].totalLectures : 0} className='bg-gray-300 rounded-full' />
//                                     </div>
//                                 </td>
//                                 <td className='px-4 py-3 max-sm:hidden'>
//                                     {calculateCourseDuration(course)}
//                                 </td>
//                                 <td className='px-4 py-3 max-sm:hidden'>
//                                     {progressArray[index] && `${progressArray[index].lectureCompleted} /
//                                         ${progressArray[index].totalLectures}`}
//                                     <span>Lectures</span>
//                                 </td>
//                                 <td className='px-4 py-3 max-sm:text-right'>
//                                     <button className='px-3 sm:px-5 py-1.5 sm:py-2 bg-blue-600 max-sm:text-xs text-white' onClick={() => navigate('/player/' + course._id)}>
//                                         {progressArray[index] && progressArray[index].lectureCompleted / progressArray[index].totalLectures === 1 ? 'Completed' : 'On Going'}
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//             <Footer />
//         </>
//     )
// }

// export default MyEnrollments


import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { Line } from 'rc-progress'
import Footer from '../../components/student/Footer'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyEnrollments = () => {

    const { enrolledCourses, calculateCourseDuration, calculateNoOfLectures, navigate, getToken, backendUrl, userData, fetchUserEnrolledCourses } = useContext(AppContext)
    const [progressArray, setProgressArray] = useState([])

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
            <div className='md:px-36 px-4 pt-10'>
                <h1 className='text-3xl font-bold text-gray-800 mb-8'>My Enrollments</h1>
                <div className="overflow-x-auto">
                    <table className='w-full text-sm text-left text-gray-700 shadow-md rounded-lg overflow-hidden'>
                        <thead className='bg-gray-100 text-gray-900 uppercase text-xs font-medium'>
                            <tr>
                                <th className='px-6 py-4'>Course</th>
                                <th className='px-6 py-4 max-sm:hidden'>Duration</th>
                                <th className='px-6 py-4 max-sm:hidden'>Completed</th>
                                <th className='px-6 py-4 text-center'>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {enrolledCourses.map((course, index) => (
                                <tr key={index} className='bg-white border-b-gray-600 hover:bg-gray-50 transition'>
                                    <td className='px-6 py-4 flex items-center gap-4'>
                                        <img src={course.courseThumbnail} alt="thumbnail" className='w-16 h-16 object-cover rounded-md border' />
                                        <div>
                                            <p className='font-semibold text-base'>{course.courseTitle}</p>
                                            <div className='mt-1'>
                                                <Line
                                                    strokeWidth={2}
                                                    percent={progressArray[index] ? (progressArray[index].lectureCompleted * 100) / progressArray[index].totalLectures : 0}
                                                    strokeColor="#2563eb"
                                                    trailColor="#e5e7eb"
                                                    className='rounded-full'
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className='px-6 py-4 max-sm:hidden whitespace-nowrap'>
                                        {calculateCourseDuration(course)}
                                    </td>
                                    <td className='px-6 py-4 max-sm:hidden whitespace-nowrap'>
                                        {progressArray[index] &&
                                            <>
                                                <span className="font-medium text-gray-800">
                                                    {progressArray[index].lectureCompleted}
                                                </span> / {progressArray[index].totalLectures}
                                                <span className='ml-1 text-gray-500'>Lectures</span>
                                            </>
                                        }
                                    </td>
                                    <td className='px-6 py-4 text-center'>
                                        <button
                                            className={`px-4 py-2 rounded-md text-sm font-medium text-white transition ${
                                                progressArray[index] &&
                                                progressArray[index].lectureCompleted / progressArray[index].totalLectures === 1
                                                    ? 'bg-green-600 hover:bg-green-700'
                                                    : 'bg-blue-600 hover:bg-blue-700'
                                            }`}
                                            onClick={() => navigate('/player/' + course._id)}
                                        >
                                            {progressArray[index] &&
                                                progressArray[index].lectureCompleted / progressArray[index].totalLectures === 1
                                                ? 'Completed'
                                                : 'Continue'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default MyEnrollments
