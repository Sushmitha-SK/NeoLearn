import  { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import CourseCard from './CourseCard'

const CoursesSection = () => {
    const { allCourses } = useContext(AppContext)
    
    return (
        <div className='py-16 md:px-40 px-8' id="courses">
            <h2 className=' text-4xl font-semibold text-gray-800 text-center'>Learn from the best</h2>
            <p className="text-center text-gray-600 mt-4 md:text-base">
                Discover our top-rated courses across various categories.
                From coding and design to <br /> business and wellness, our courses are crafted to deliver results.
            </p>
            <div className='grid lg:grid-cols-4 gap-4 md:px-0 md:my-16 my-10 md:grid-cols-2 sm:grid-cols-2'>
                {allCourses.slice(0, 4).map((course, index) => (
                    <CourseCard key={index} course={course} />
                ))}
            </div>

            <Link
                to={'/course-list'}
                onClick={() => scrollTo(0, 0)}
                className=' bg-primaryBlue text-white border border-gray-500/30 px-10 py-3 inline-block mt-6 hover:bg-secondaryHoverBlue hover:text-white  transition-all duration-300 rounded-lg shadow'
            >
                Show all courses
            </Link>
        </div>
    )
}

export default CoursesSection
