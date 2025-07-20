
import { useContext } from 'react';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const { isEducator } = useContext(AppContext);

    const menuItems = [
        { name: 'Dashboard', path: '/educator', icon: assets.home_icon },
        { name: 'Add Course', path: '/educator/add-course', icon: assets.add_icon },
        { name: 'My Courses', path: '/educator/my-courses', icon: assets.my_course_icon },
        { name: 'Student Enrolled', path: '/educator/student-enrolled', icon: assets.person_tick_icon },
    ];

    if (!isEducator) return null;

    return (
        <div className='md:w-64 w-16 border-r min-h-screen text-base border-r-gray-200 flex flex-col bg-white shadow-sm'>
            {menuItems.map((item) => (
                <NavLink
                    to={item.path}
                    key={item.name}
                    end={item.path === '/educator'}
                    className={({ isActive }) =>
                        `flex items-center md:flex-row flex-col md:justify-start justify-center py-3.5 md:px-6 gap-3 transition-all duration-200 
                        ${isActive ? 'bg-indigo-50 border-r-4 border-secondaryHoverBlue text-secondaryHoverBlue' : 'hover:bg-gray-100 text-gray-700 border-r-4 border-transparent'}`
                    }
                >
                    <img src={item.icon} alt={`${item.name} icon`} className='w-6 h-6' />
                    <span className='md:block hidden text-sm font-medium'>{item.name}</span>
                </NavLink>
            ))}
        </div>
    );
};

export default Sidebar;
