import { useEffect } from 'react'
import Footer from '../../components/student/Footer'
import { assets } from '../../assets/assets'
import { FaChalkboardTeacher, FaGlobe, FaBolt } from 'react-icons/fa'
import { TfiBook } from "react-icons/tfi";
import { PiTargetLight } from "react-icons/pi";
import { RiGlobalFill } from "react-icons/ri";

export const features = [
    {
        icon: <TfiBook size={24} />,
        title: 'Interactive Learning',
        desc: 'Gamified lessons, quizzes, and instant feedback that make learning enjoyable and effective.',
    },
    {
        icon: <FaChalkboardTeacher size={24} />,
        title: 'Expert Instructors',
        desc: 'Learn from industry veterans and top educators who bring real-world expertise into every lesson.',
    },
    {
        icon: <FaGlobe size={24} />,
        title: 'Global Community',
        desc: 'Collaborate and connect with learners and mentors across continents and cultures.',
    },
    {
        icon: <FaBolt size={24} />,
        title: 'Fast Transactions',
        desc: 'Simplified and secure payments through Stripe for a hassle-free experience.',
    },
]

const About = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='flex flex-col items-center space-y-7 text-center'>
            <section className="py-16 md:py-24 relative">
                <div className="w-full max-w-7xl px-4 mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 order-last lg:order-first">
                            <div className="flex justify-start sm:justify-end pt-12 sm:pt-24">
                                <img
                                    className="rounded-xl object-cover w-full h-auto max-h-96"
                                    src={assets.aboutusImg2}
                                    alt="About Us"
                                />
                            </div>
                            <div className="flex justify-end sm:justify-start">
                                <img
                                    className="rounded-xl object-cover w-full h-auto max-h-96"
                                    src={assets.aboutusImg1}
                                    alt="About Us"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col items-center lg:items-start gap-10 text-center lg:text-left">
                            <div className="flex flex-col gap-8">
                                <div className="flex flex-col gap-3">
                                    <h2 className="text-gray-800 text-3xl md:text-4xl font-semibold leading-snug">
                                        About Us
                                    </h2>
                                    <p className="text-gray-500 text-base leading-relaxed">
                                        At NeoLearn, we’re redefining education by making quality learning accessible, engaging, and impactful.
                                        Our platform is built to support learners, educators, and institutions with powerful tools that drive success.
                                        Whether you're upgrading your skills or teaching the next generation, NeoLearn empowers you to grow, connect, and thrive.
                                    </p>
                                </div>

                                <div className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-10">
                                    <div className="flex flex-col items-center lg:items-start">
                                        <h3 className="text-gray-900 text-3xl md:text-4xl font-bold font-manrope">33+</h3>
                                        <p className="text-gray-500 text-base">Years of Educational Excellence</p>
                                    </div>
                                    <div className="flex flex-col items-center lg:items-start">
                                        <h3 className="text-gray-900 text-3xl md:text-4xl font-bold font-manrope">125+</h3>
                                        <p className="text-gray-500 text-base">Courses Delivered</p>
                                    </div>
                                    <div className="flex flex-col items-center lg:items-start">
                                        <h3 className="text-gray-900 text-3xl md:text-4xl font-bold font-manrope">52+</h3>
                                        <p className="text-gray-500 text-base">Partner Institutions</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <div>
                <section className="w-full py-20 px-6 bg-gradient-to-b from-white via-gray-50 to-white">
                    <div className="max-w-6xl mx-auto text-center space-y-14">
                        <div className="space-y-6">
                            <h2 className="text-gray-800 text-3xl md:text-4xl font-semibold">
                                Empowering the Future Through Learning
                            </h2>
                            <p className="text-gray-500 text-base max-w-3xl mx-auto">
                                Our mission and vision are grounded in a deep belief that education is the key to unlocking human potential. At <span className="font-semibold text-primaryBlue">NeoLearn</span>, we're building more than just a learning platform — we're nurturing a global movement of empowered learners and educators.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="bg-white border-l-4 border-primaryBlue p-8 rounded-xl shadow hover:shadow-md transition text-left">
                                <div className="flex items-center gap-3 mb-4">
                                    <PiTargetLight className="text-2xl text-secondaryHoverBlue w-8 h-8" />
                                    <h3 className="text-2xl font-semibold text-gray-800">Our Mission</h3>
                                </div>
                                <p className="text-gray-600 text-base leading-relaxed">
                                    To deliver high-impact, inclusive, and flexible learning solutions that help individuals grow professionally and personally — wherever they are in the world.
                                </p>
                            </div>

                            <div className="bg-white border-l-4 border-primaryBlue p-8 rounded-xl shadow hover:shadow-md transition text-left">
                                <div className="flex items-center gap-3 mb-4">
                                    <RiGlobalFill className="text-2xl text-secondaryHoverBlue w-8 h-8" />
                                    <h3 className="text-2xl font-semibold text-gray-800">Our Vision</h3>
                                </div>
                                <p className="text-gray-600 text-base leading-relaxed">
                                    To create a world where access to education is no longer a privilege, but a universal right — where anyone, from any background, can learn, connect, and thrive.
                                </p>
                            </div>
                        </div>

                        <div className="pt-6">
                            <p className="text-gray-500 italic text-sm">
                                "Together, we’re not just educating minds — we’re shaping futures."
                            </p>
                        </div>
                    </div>
                </section>


                <section className="py-24 ">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-10 lg:mb-16 flex justify-center items-center flex-col gap-x-0 gap-y-6 lg:gap-y-0 lg:flex-row lg:justify-between max-md:max-w-lg max-md:mx-auto">
                            <div className="relative w-full text-center lg:text-left lg:w-2/4">
                                <h2 className="text-4xl font-bold text-gray-900 leading-[3.25rem] lg:mb-6 mx-auto max-w-max lg:max-w-md lg:mx-0">
                                    Why Choose NeoLearn?</h2>
                            </div>
                            <div className="relative w-full text-center  lg:text-left lg:w-2/4">
                                <p className="text-lg font-normal text-gray-500 mb-5">We provide all the advantages that can simplify all your financial transactions without any further requirements</p>

                            </div>
                        </div>
                        <div className="flex justify-center items-center  gap-x-5 gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8">

                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="group relative w-full md:w-2/5 xl:w-1/4 bg-gray-100 rounded-2xl p-6 transition-all duration-500 hover:bg-primaryBlue text-center md:text-left"
                                >
                                    <div className="bg-white rounded-full w-14 h-14 flex items-center justify-center mb-4 mx-auto md:mx-0">
                                        <div className="text-primaryBlue hover:text-white">
                                            {feature.icon}
                                        </div>
                                    </div>
                                    <h4 className="text-xl font-semibold text-gray-900 group-hover:text-white mb-2">{feature.title}</h4>
                                    <p className="text-sm text-gray-500 group-hover:text-white leading-5">
                                        {feature.desc}
                                    </p>
                                </div>
                            ))}

                        </div>
                    </div>
                </section>
            </div>





            <Footer />
        </div>
    )
}

export default About
