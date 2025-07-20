import { useContext } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { Link } from 'react-router-dom'

const CourseCard = ({ course }: any) => {
    const { currency, calculateRating }: any = useContext(AppContext)
    const rating = Math.floor(calculateRating(course))
    // const discountedPrice = (course.coursePrice - (course.discount * course.coursePrice) / 100).toFixed(2)

    return (
        <Link
            to={`/course/${course._id}`}
            onClick={() => scrollTo(0, 0)}
            className='group border border-gray-200 rounded-2xl overflow-hidden shadow-sm bg-white'
        >
            <img
                src={course.courseThumbnail}
                alt={course.courseTitle}
                className='w-full h-40 object-cover'
            />
            <div className='p-4 space-y-2 text-left'>
                <h3 className='text-lg font-semibold text-gray-800 truncate'>{course.courseTitle}</h3>
                <p className='text-sm text-gray-500'>{course.educator?.name}</p>
                <div className='flex items-center space-x-2'>
                    <p>{calculateRating(course)}</p>
                    <div className='flex'>
                        {[...Array(5)].map((_, i) => (
                            <img
                                key={i}
                                src={i < rating ? assets.star : assets.star_blank}
                                alt=''
                                className='w-3.5 h-3.5'
                            />
                        ))}
                    </div>
                    <p className='text-gray-500'>({course.courseRatings.length})</p>
                </div>
                <p className='text-base font-semibold text-gray-800'>{currency}{(course.coursePrice - course.discount * course.coursePrice / 100).toFixed(2)}</p>


            </div>
        </Link>
    )
}

export default CourseCard


