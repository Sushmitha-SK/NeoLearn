import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import SearchBar from '../../components/student/SearchBar'
import { useParams } from 'react-router-dom'
import CourseCard from '../../components/student/CourseCard'
import { assets } from '../../assets/assets'
import Footer from '../../components/student/Footer'

const CoursesList = () => {

    const { navigate, allCourses, searchInput, setSearchInput, page, setPage, sort, setSort, order, setOrder, totalPages } = useContext(AppContext)
    const { input } = useParams()

    const [filteredCourse, setfilteredCourse] = useState([])

    useEffect(() => {
        if (input) {
            setSearchInput(input)
        } else {
            setSearchInput("")
        }
    }, [input])


    useEffect(() => {
        setfilteredCourse(allCourses);
    }, [allCourses, input]);


    return (
        <>
            <div className='relative md:px-36 px-8 pt-20 text-left'>

                <div className='flex md:flex-row flex-col gap-6 items-start justify-between w-full'>
                    <div>
                        <h1 className='text-4xl font-semibold text-gray-800'>Course List</h1>
                        <p className='text-gray-500 mt-2'>
                            <span className='text-blue-600 cursor-pointer' onClick={() => navigate('/')}>Home</span>
                            {' '}/{' '}
                            <span>Course List</span>
                        </p>
                    </div>
                    <SearchBar data={searchInput} />
                </div>
                <div className="flex flex-wrap gap-4 items-center mt-6">
                    <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-600 font-medium">Sort by:</label>
                        <select
                            className="border border-gray-200 rounded px-4 py-2  bg-white text-gray-700 focus:outline-none"
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                        >
                            <option value="createdAt">Newest</option>
                            <option value="courseTitle">Title</option>
                            <option value="coursePrice">Price</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-800 font-medium">Order:</label>
                        <select
                            className="border border-gray-200 rounded px-4 py-2  bg-white text-gray-700 focus:outline-none"
                            value={order}
                            onChange={(e) => setOrder(e.target.value)}
                        >
                            <option value="desc">Descending</option>
                            <option value="asc">Ascending</option>
                        </select>
                    </div>
                </div>
                {input && (
                    <div className='inline-flex items-center gap-3 px-4 py-2  border border-gray-300 bg-white mt-8 rounded-md text-sm text-gray-700'>
                        <p className="font-medium">{input}</p>
                        <img
                            src={assets.cross_icon}
                            alt="clear"
                            className='w-2 h-2 cursor-pointer hover:scale-110 transition-transform duration-150'
                            onClick={() => {
                                setSearchInput("");
                                navigate("/course-list/", { replace: true }); 
                            }}
                        />
                    </div>
                )}
                <div className='my-16 px-2 md:p-0'>
                    {filteredCourse.length > 0 ? (
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
                            {filteredCourse.map((course, index) => (
                                <CourseCard key={index} course={course} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 text-gray-500">
                            <p className="text-lg font-medium">No courses found.</p>
                            <p className="text-sm">Try adjusting your search or filter criteria.</p>
                        </div>
                    )}
                </div>

                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 my-6">
                        <button
                            className="px-4 py-2 border rounded disabled:opacity-50"
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                            disabled={page === 1}
                        >
                            Prev
                        </button>
                        <span className="font-semibold">Page {page}</span>
                        <button
                            className="px-4 py-2 border rounded disabled:opacity-50"
                            onClick={() => setPage((prev) => prev + 1)}
                            disabled={page >= totalPages}
                        >
                            Next
                        </button>
                    </div>
                )}

            </div>
            <Footer />
        </>
    )
}

export default CoursesList

