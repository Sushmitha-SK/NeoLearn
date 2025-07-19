// 


import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/student/Loading'
import axios from 'axios'
import { toast } from 'react-toastify'

const ITEMS_PER_PAGE = 10;

const StudentsEnrolled = () => {
    const { isEducator, backendUrl, getToken } = useContext(AppContext);
    const [enrolledStudents, setEnrolledStudents] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchEnrolledStudents = async () => {
        try {
            const token = await getToken();
            const { data } = await axios.get(backendUrl + '/api/educator/enrolled-students', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (data.success) {
                setEnrolledStudents(data.enrolledStudents.reverse());
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (isEducator) {
            fetchEnrolledStudents();
        }
    }, []);

    if (!enrolledStudents) return <Loading />;

    const totalPages = Math.ceil(enrolledStudents.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedStudents = enrolledStudents.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className='min-h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0'>
            <div className='w-full overflow-x-auto'>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Students Enrolled</h2>
                <div className='inline-block min-w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow'>
                    <table className='min-w-full divide-y divide-gray-200'>
                        <thead className='bg-gray-100 sticky top-0 z-10 text-left'>
                            <tr>
                                <th className='px-6 py-4 text-sm font-semibold text-gray-700 text-center hidden sm:table-cell'>#</th>
                                <th className='px-6 py-4 text-sm font-semibold text-gray-700'>Student</th>
                                <th className='px-6 py-4 text-sm font-semibold text-gray-700'>Course Title</th>
                                <th className='px-6 py-4 text-sm font-semibold text-gray-700 hidden sm:table-cell'>Enrolled On</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-100'>
                            {paginatedStudents.map((item, index) => (
                                <tr key={index} className='hover:bg-gray-50 transition'>
                                    <td className='px-6 py-4 text-center text-sm text-gray-600 hidden sm:table-cell'>
                                        {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                                    </td>
                                    <td className='px-6 py-4 flex items-center gap-3'>
                                        <img src={item.student.imageUrl} alt={item.student.name} className='w-10 h-10 rounded-full object-cover border' />
                                        <span className='text-gray-900 text-sm font-medium truncate max-w-[150px]'>{item.student.name}</span>
                                    </td>
                                    <td className='px-6 py-4 text-sm text-gray-700 truncate max-w-[200px]'>{item.courseTitle}</td>
                                    <td className='px-6 py-4 text-sm text-gray-600 hidden sm:table-cell'>
                                        {new Date(item.purchaseDate).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
                            className={`px-3 py-1 rounded text-sm border 
                                ${currentPage === i + 1 ? 'bg-indigo-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
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

export default StudentsEnrolled;
