import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/student/Loading'
import axios from 'axios'
import { toast } from 'react-toastify'

const StudentsEnrolled = () => {

    const { isEducator, backendUrl, getToken } = useContext(AppContext)
    const [enrolledStudents, setEnrolledStudents] = useState(null)

    const fetchEnrolledStudents = async () => {
        try {
            const token = await getToken()
            const { data } = await axios.get(backendUrl + '/api/educator/enrolled-students', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (data.success) {
                setEnrolledStudents(data.enrolledStudents.reverse())
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (isEducator) {
            fetchEnrolledStudents()
        }
    }, [])


    return enrolledStudents ? (


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
                            {enrolledStudents.map((item, index) => (
                                <tr key={index} className='hover:bg-gray-50 transition'>
                                    <td className='px-6 py-4 text-center text-sm text-gray-600 hidden sm:table-cell'>{index + 1}</td>
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
            </div>
        </div>

    ) : <Loading />
}

export default StudentsEnrolled