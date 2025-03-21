import { Outlet } from "react-router-dom";
import Sidebar from "../components/Profile/Sidebar";
// import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import MobileNav from "../components/Profile/MobileNav";

const Profile = () => {
  // const isLoggedIn = useSelector();
  const [profile, setProfile] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  };

  useEffect(() => {
    try {
     const fetch = async () => {
       const response = await axios.get(
         `https://full-stack-book-store-gamma.vercel.app/api/v1/users//get-user-information`,
         { headers }
       );
       setProfile(response.data);
     }
     fetch();  
    }catch (err) {
      console.log(err);
    }
  }, [])

  return (
    <div className="bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row py-8 gap-4 text-white">
    {!profile && (
      <div className="w-full h-[100%] flex items-center justify-center">
        <Loader />
      </div>
      )}
    {profile && (
       <>
          <div className="w-full md:w-1/6 h-auto lg:h-screen">
            <Sidebar data={profile} />
            <MobileNav />
          </div>
          <div className="w-full md:w-5/6">
            <Outlet />
          </div>
       </>
    )}
    </div>
  )
}

export default Profile