import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";

const Setting = () => {
  const [profileData, setProfileData] = useState();
  const [value, setValue] = useState({ address: "" });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setValue({...value, [name]: value});
  }

  useEffect(() => {
    const fetch = async () => {
      try {
      const response = await axios.get("http://localhost:3000/api/v1/users/get-user-information", {headers});
      setProfileData(response.data);
      setValue({ address: response.data.address });
      }catch (err) {
        console.log(err);
      }    
    }
    fetch();
  }, []);

  const submitAddress = async () => {
    try {
      const response = await axios.put("http://localhost:3000/api/v1/users/update-address", value, { headers });
      alert(response.data.message);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {!profileData && (
        <div className="w-full h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      )}
      {profileData && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Settings
          </h1>
          <div className="flex gap-12">
            <div>
              <label htmlFor="">Username</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {profileData.username}
              </p>
            </div>
            <div>
              <label htmlFor="">Email</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {profileData.email}
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-col">
            <label htmlFor="">Address</label>
            <textarea
               className="p-2 rounded bg-zinc-800 mt-2 font-semibold"
               rows="5"
               placeholder="address"
               name="address"
               value={value.address} 
               onChange={change}
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button 
              onClick={submitAddress} 
              className="bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400 transition-all duration-300">
              Update
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Setting