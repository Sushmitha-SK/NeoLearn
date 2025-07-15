import { assets } from '../../assets/assets';

const AboutUs = () => {
    return (
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
                                    Achieve your goals through NeoLearn
                                </h2>
                                <p className="text-gray-500 text-base leading-relaxed">
                                    At NeoLearn, we’re redefining education by making quality learning accessible, engaging, and impactful.
                                    Our platform is built to support learners, educators, and institutions with powerful tools that drive success.
                                    Whether you're upgrading your skills or teaching the next generation, NeoLearn empowers you to grow, connect, and thrive.
                                </p>
                            </div>

                            {/* Statistics */}
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
                        <div className="w-full sm:w-auto">
                            <button className="w-full sm:w-fit px-5 py-3 bg-primaryBlue hover:bg-secondaryBlue transition-all duration-300 rounded-lg shadow justify-center items-center flex">
                                <span className="text-white text-sm font-medium">Explore NeoLearn</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
