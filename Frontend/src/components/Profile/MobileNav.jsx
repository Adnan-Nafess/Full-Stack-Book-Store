import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MobileNav = () => {
    const role = useSelector((state) => state.auth.role);

  return (
    <>
      {role === "user" && ( <div className="w-full flex lg:hidden items-center justify-between my-5">
          <Link
              to="/profile"
              className="text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 transition-all duration-300"
          >
              Favourites
          </Link>
          <Link
              to="/profile/orderHistory"
              className="text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 transition-all duration-300"
          >
              Order History
          </Link>
          <Link
              to="/profile/settings"
              className="text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 transition-all duration-300"
          >
              Settings
          </Link>
      </div>
      )}
       {role === "admin" && ( <div className="w-full flex lg:hidden items-center justify-between my-5">
          <Link
              to="/profile"
              className="text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 transition-all duration-300"
          >
              All Orders
          </Link>
          <Link
              to="/profile/add-book"
              className="text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 transition-all duration-300"
          >
              Order History
          </Link>
      </div>
      )}
    </>
  )
};

export default MobileNav;