import  { useEffect, useState } from 'react'
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
            if (window.scrollY > 100) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScrollToTop = () => [
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    ]


    return (
        <div className='flex flex-col items-center space-t-7 text-center'>
            <Hero />
            <Companies />
            <AboutUs />
            <CoursesSection />
            <Testimonials />
            <CallToAction />
            <Footer />
            <a
                href="#scrolltop"
                id="scrolltop"
                className={`scrolltop ${showScrollTop ? 'scrolltop--show' : ''}`}
                onClick={handleScrollToTop}
            >
                <TiArrowSortedUp className="w-6 h-6" />
            </a>
        </div>
    )
}

export default Home

