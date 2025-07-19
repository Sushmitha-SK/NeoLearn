import { useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'

const CallToAction = () => {
    const navigate = useNavigate()
    return (

        <div className='flex flex-col items-center gap-4 pt-10 pb-24 px-8 md:px-0'>
            <h1 className='text-xl md:text-4xl text-gray-800 font-semibold'> Empower Your Learning Journey<br />Anywhere, Anytime</h1>
            <p className='text-gray-500 sm:text-base'>
                Access high-quality courses and expert-led content at your own pace. Whether you're upgrading skills or exploring something new,<br /> we're here to support your growth—on your schedule.                </p>
            <div className='flex items-cente font-medium gap-6 mt-4'>
                <button className='px-10 py-3 rounded-md text-white bg-primaryBlue hover:bg-secondaryHoverBlue'>
                    <a href='#hero'>Get started</a>
                </button>
                <button className='flex items-center gap-2' onClick={() => navigate('/about')}>
                    Learn more <img src={assets.arrow_icon} alt="arrow_icon" />
                </button>
            </div>
        </div>

    )
}

export default CallToAction