import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'

const Footer = () => {
    return (
        <footer className='bg-gray-900 md:px-36 text-left w-full mt-10'>
            <div className='flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-white/30'>
                <div className='flex flex-col md:items-start items-center w-full'>
                    <img src={assets.logo_dark} alt="logo" />
                    <p className='mt-6 text-center md:text-left text-sm text-white/80'>
                        NeoLearn is your trusted partner in online education, providing high-quality courses, interactive learning tools, and expert guidance.
                        Whether you're a student, educator, or professional, our platform empowers lifelong learning and skill development anytime, anywhere.
                    </p>
                </div>

                <div className='flex flex-col md:items-start items-center w-full'>
                    <h2 className='font-semibold text-white mb-5'>Company</h2>
                    <ul className='flex md:flex-col w-full justify-between text-sm text-white/80 md:space-y-2'>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contactus">Contact Us</Link></li>
                        <li><Link to="/privacypolicy">Privacy Policy</Link></li>
                    </ul>
                </div>

                <div className='hidden md:flex flex-col items-start w-full'>
                    <h2 className='font-semibold text-white mb-5'>Contact Info</h2>
                    <p className='text-sm text-white/80'>Email: support@neolearn.com</p>
                    <p className='text-sm text-white/80'>Phone: +1 (800) 123-4567</p>
                    <p className='text-sm text-white/80'>Hours: Mon - Fri, 9AM - 6PM</p>
                    <p className='text-sm text-white/80'>Address: 123 Learning Lane, Edutown, USA</p>
                </div>
            </div>
            <p className='py-4 text-center text-xs md:text-sm text-white/60'>
                Copyright {new Date().getFullYear()} © NeoLearn. All Rights Reserved.
            </p>
        </footer>
    )
}

export default Footer
