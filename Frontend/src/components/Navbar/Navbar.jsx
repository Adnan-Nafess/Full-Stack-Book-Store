import { Link, NavLink } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useState } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false); 

    const links = [
        {
            title: "Home",
            link: "/",
        },
        {
            title: "All Books",
            link: "/all-books",
        },
        {
            title: "Cart",
            link: "/cart",
        },
        {
            title: "Profile",
            link: "/profile",
        },
        {
            title: "Admin Profile",
            link: "/profile",
        },
    ];

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);
    
    if(isLoggedIn === false) {
        links.splice(2, 2);
    };

    if (isLoggedIn === true && role === "user") {
        links.splice(4, 1);
    };

    if(isLoggedIn === true && role === "admin") {
        links.splice(3, 1);
    };

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <nav className="relative bg-zinc-800 text-white px-8 py-2 flex items-center justify-between z-50">
                <div className="flex items-center">
                    <img
                        className="h-10 me-4"
                        src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
                        alt="logo"
                    />
                    <h1 className="text-2xl font-semibold">BookHeaven</h1>
                </div>
                <div className="nav-links-bookheaven block md:flex items-center gap-4">
                    <div className="hidden md:flex gap-4">
                        {links.map((item, id) => (
                            <NavLink
                                to={item.link}
                                key={id}
                                className="hover:text-blue-500 transition-all duration-300"
                                onClick={handleLinkClick}
                            >
                                {item.title}
                            </NavLink>
                        ))}
                    </div>
                   {isLoggedIn === false && (
                        <div className="hidden md:flex gap-4">
                            <Link
                                to="/login"
                                className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                                onClick={handleLinkClick}
                            >
                                LogIn
                            </Link>
                            <Link
                                to="/signup"
                                className="px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                                onClick={handleLinkClick}
                            >
                                SignUp
                            </Link>
                        </div>
                   )}
                    {/* Hamburger icon, only visible on mobile */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-white text-2xl hover:text-zinc-400 md:hidden"
                        aria-expanded={isMenuOpen ? "true" : "false"}
                        aria-label="Toggle menu"
                    >
                        <FaGripLines />
                    </button>
                </div>
            </nav>
            {/* Mobile menu */}
            <div
                className={`${isMenuOpen ? "block" : "hidden"} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}
            >
                {links.map((item, id) => (
                    <NavLink
                        to={item.link}
                        key={id}
                        className="text-white text-4xl mb-4 font-semibold hover:text-blue-500 transition-all duration-300"
                        onClick={handleLinkClick}
                    >
                        {item.title}
                    </NavLink>
                ))}
                {isLoggedIn === false && ( 
                  <>
                    <Link
                        to="/login"
                        className="mb-4 text-3xl font-semibold px-8 py-2 border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300"
                        onClick={handleLinkClick}
                    >
                        LogIn
                    </Link>
                    <Link
                        to="/signup"
                        className="mb-4 text-3xl font-semibold px-8 py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                        onClick={handleLinkClick}
                    >
                        SignUp
                    </Link>
                   </>
               )}
            </div>
        </>
    );
};

export default Navbar;
