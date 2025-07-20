import { useContext, useEffect, useState } from 'react';
import { assets } from "../../assets/assets";
import { Link, useLocation } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";


const Navbar = () => {
  // const {
  //   navigate,
  //   isEducator,
  //   backendUrl,
  //   setIsEducator,
  //   getToken,
  // } = useContext(AppContext);
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext must be used within an AppContextProvider");
  }

  const {
    navigate,
    isEducator,
    backendUrl,
    setIsEducator,
    getToken,
  } = context;

  const location = useLocation();
  const isCourseListPage = location.pathname.includes("/course-list");

  const { openSignIn } = useClerk();
  const { user } = useUser();

  const [hasShadow, setHasShadow] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      setHasShadow(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const becomeEducator = async () => {
    try {
      if (isEducator) {
        navigate("/educator");
        return;
      }

      const token = await getToken();

      const { data } = await axios.get(`${backendUrl}/api/educator/update-role`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setIsEducator(true);
        toast.success(data.message);
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow ${hasShadow ? "shadow-md" : "shadow-none"
        } ${isCourseListPage ? "bg-white" : "bg-lightBackground"}`}
    >
      <nav className="flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-200 py-4">
        <img
          src={assets.logo}
          onClick={() => navigate("/")}
          alt="Logo"
          className="w-28 lg:w-32 cursor-pointer"
        />

        <div className="hidden md:flex items-center gap-5 text-gray-500">
          {user && (
            <>
              <button
                onClick={becomeEducator}
                className="hover:text-primaryBlue cursor-pointer"
              >
                {isEducator ? "Educator Dashboard" : "Become Educator"}
              </button>
              <span>|</span>
              <Link to="/my-enrollments" className="hover:text-primaryBlue">
                My Enrollments
              </Link>
            </>
          )}
          {user ? (
            <UserButton />
          ) : (
            <button
              onClick={() => openSignIn()}
              className="bg-primaryBlue hover:bg-secondaryHoverBlue text-white px-5 py-2 rounded-full"
            >
              Sign in
            </button>
          )}
        </div>

        <div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-500">
          {user && (
            <>
              <button onClick={becomeEducator} className="max-sm:text-xs">
                {isEducator ? "Educator Dashboard" : "Become Educator"}
              </button>
              <span>|</span>
              <Link to="/my-enrollments" className="max-sm:text-xs">
                My Enrollments
              </Link>
            </>
          )}
          {user ? (
            <UserButton />
          ) : (
            <button onClick={() => openSignIn()}>
              <img src={assets.user_icon} alt="sign in" />
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
