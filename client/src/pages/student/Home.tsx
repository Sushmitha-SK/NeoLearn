import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Hero from '../../components/student/Hero'
import Companies from '../../components/student/Companies'
import CoursesSection from '../../components/student/CoursesSection'
import Testimonials from '../../components/student/Testimonials'
import CallToAction from '../../components/student/CallToAction'
import Footer from '../../components/student/Footer'
import AboutUs from '../../components/student/AboutUs'
import { TiArrowSortedUp } from "react-icons/ti";

const Home = () => {
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };


    return (
        <div className='flex flex-col items-center space-t-7 text-center'>
            <Hero />
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                variants={sectionVariants}
            >

                <Companies />
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                variants={sectionVariants}
            >

                <AboutUs />
            </motion.div>


            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                variants={sectionVariants}
            >
                <CoursesSection />
            </motion.div>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                variants={sectionVariants}
            >
                <Testimonials />
            </motion.div>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                variants={sectionVariants}
            >
                <CallToAction />
            </motion.div>
            <Footer />

            <motion.a
                href="#scrolltop"
                id="scrolltop"
                className={`fixed bottom-6 right-6 p-2 bg-gray-200 dark:bg-gray-800 rounded-full shadow-lg transition-opacity duration-300 ${showScrollTop ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={handleScrollToTop}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Scroll to Top"
            >
                <TiArrowSortedUp className="w-6 h-6 text-black dark:text-white" />
            </motion.a>
        </div>
    );
};

export default Home;
