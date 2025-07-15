import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/student/Loading'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyCourses = () => {

    const { currency, isEducator, getToken, backendUrl } = useContext(AppContext)

    const [courses, setCourses] = useState(null)

    const fetchEducatorCourses = async () => {
        try {
            const token = await getToken()
            const { data } = await axios.get(backendUrl + '/api/educator/courses', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            data.success && setCourses(data.courses)

        } catch (error) {
            toast.error(error.message)
        }
    }
    useEffect(() => {
        if (isEducator) {
            fetchEducatorCourses()
        }

    }, [isEducator])


    return courses ? (

        <div className='h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0'>
            <div className='w-full'>
                <h2 className="pb-4 text-xl font-semibold text-gray-800">My Courses</h2>
                <div className='w-full overflow-x-auto'>
                    <div className='inline-block min-w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow'>
                        <table className='min-w-full divide-y divide-gray-200'>
                            <thead className='bg-gray-100 sticky top-0 z-10'>
                                <tr>
                                    <th className='px-6 py-4 text-left text-sm font-semibold text-gray-700'>Course</th>
                                    <th className='px-6 py-4 text-left text-sm font-semibold text-gray-700'>Earnings</th>
                                    <th className='px-6 py-4 text-left text-sm font-semibold text-gray-700'>Students</th>
                                    <th className='px-6 py-4 text-left text-sm font-semibold text-gray-700'>Published</th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-gray-100'>
                                {courses.map((course) => (
                                    <tr key={course._id} className='hover:bg-gray-50 transition'>
                                        <td className='px-6 py-4 flex items-center space-x-4'>
                                            <img src={course.courseThumbnail} alt="Thumbnail" className='w-12 h-12 rounded object-cover border' />
                                            <span className='text-sm font-medium text-gray-900 truncate max-w-xs'>{course.courseTitle}</span>
                                        </td>
                                        <td className='px-6 py-4 text-sm text-gray-600'>
                                            {currency} {Math.floor(course.enrolledStudents.length * (course.coursePrice - course.discount * course.coursePrice / 100))}
                                        </td>
                                        <td className='px-6 py-4 text-sm text-gray-600'>{course.enrolledStudents.length}</td>
                                        <td className='px-6 py-4 text-sm text-gray-600'>{new Date(course.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    ) : <Loading />
}

export default MyCourses