import { assets, dummyTestimonial } from '../../assets/assets'

const Testimonials = () => {
    return (
        <div className='pb-14 px-8 md:px-0' id='testimonials'>
            <h2 className="text-4xl font-semibold text-gray-800 text-center">What Our Learners Say</h2>
            <p className="text-center text-gray-600 mt-4 md:text-base">
                Hear from our learners as they share their journeys of transformation, success, and how our <br className="hidden md:block" />
                platform has made a difference in their lives.
            </p>
            <div className="grid grid-cols-[repeat(auto-fit,_minmax(280px,_1fr))] gap-10 mt-16">
                {dummyTestimonial.map((testimonial, index) => (
                    <div
                        key={index}
                        className="bg-white text-left rounded-2xl shadow-xs border border-gray-200 hover:shadow-md transition-all duration-200"
                    >
                        <div className='flex items-center gap-4 px-5 py-4 bg-gray-500/10 rounded-tl-2xl rounded-tr-2xl'>
                            <img className='h-12 w-12 rounded-full' src={testimonial.image} alt={testimonial.name} />
                            <div>
                                <h1 className='text-lg font-medium text-gray-800'>{testimonial.name}</h1>
                                <p className='text-gray-800/80'>{testimonial.role}</p>
                            </div>

                        </div>
                        <div className='p-5 pb-7'>
                            <div className='flex gap-0.5'>
                                {[...Array(5)].map((_, i) => (
                                    <img className='h-5' key={i} src={i < Math.floor(testimonial.rating) ? assets.star : assets.star_blank} alt="" />
                                ))}
                            </div>
                            <p className="text-gray-600 mt-5 italic relative pl-6 before:content-['“'] before:absolute before:left-0 before:top-0 before:text-4xl before:text-gray-400">
                                {testimonial.feedback}
                            </p>
                        </div>

                    </div>
                ))}



            </div>

        </div>
    )
}

export default Testimonials