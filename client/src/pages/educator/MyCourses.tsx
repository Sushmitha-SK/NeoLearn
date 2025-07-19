import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/student/Loading'
import axios from 'axios'
import { toast } from 'react-toastify'

const COURSES_PER_PAGE = 5;

const MyCourses = () => {
    const { currency, isEducator, getToken, backendUrl } = useContext(AppContext);

    const [courses, setCourses] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchEducatorCourses = async () => {
        try {
            const token = await getToken();
            const { data } = await axios.get(backendUrl + '/api/educator/courses', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (data.success) setCourses(data.courses);
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (isEducator) fetchEducatorCourses();
    }, [isEducator]);

    if (!courses) return <Loading />;

    // Pagination logic
    const totalPages = Math.ceil(courses.length / COURSES_PER_PAGE);
    const startIndex = (currentPage - 1) * COURSES_PER_PAGE;
    const paginatedCourses = courses.slice(startIndex, startIndex + COURSES_PER_PAGE);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className='min-h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0'>
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
                                {paginatedCourses.map((course) => (
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

                {/* Pagination Controls */}
                <div className="flex justify-end items-center gap-2 mt-4">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 rounded text-sm border bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => handlePageChange(i + 1)}
                            className={`px-3 py-1 rounded text-sm border ${currentPage === i + 1 ? 'bg-primaryBlue text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 rounded text-sm border bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyCourses;
