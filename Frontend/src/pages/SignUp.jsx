import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });

  const navigate = useNavigate();

  const changeHandle = (e) => {
      const {name, value} = e.target;
      setValues({...values, [name]: value });
  };

  const submit = async ()  => {
     try {
      if(values.username === "" || values.email === "" || values.password === "" || values.address === "") {
        alert("All fields are required");
      }else {
        const response = await axios.post("http://localhost:3000/api/v1/users/sign-up", values);
        alert(response.data.message);
        navigate("/LogIn");
      }
     }catch (err) {
      alert(err.response.data.message);
     };
  }

  return (
    <div className="h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl">Sign Up</p>
        <div className="mt-4">
          <div>
            <label htmlFor="" className="text-zinc-400">
              Username
            </label>
            <input 
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="username"
              name="username"
              required
              value={values.username}
              onChange={changeHandle}   
              />
          </div>
          <div className="mt-4">
            <label htmlFor="" className="text-zinc-400">
              Email
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="xyz@example.com"
              name="email"
              required
              value={values.email}
              onChange={changeHandle} 
            />
          </div>
          <div className="mt-4">
            <label htmlFor="" className="text-zinc-400">
              Password
            </label>
            <input
              type="password"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="password"
              name="password"
              required
              value={values.password}
              onChange={changeHandle} 
            />
          </div>
          <div className="mt-4">
            <label htmlFor="" className="text-zinc-400">
              Address
            </label>
            <input
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              rows="5"
              placeholder="xyz@example.com"
              name="address"
              required
              value={values.address}
              onChange={changeHandle} 
            />
          </div>
          <div className="mt-4">
            <button onClick={submit} className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-700">
              SignUp
            </button>
          </div>
          <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">
            Or
          </p>
          <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
            Already have an acoount? &nbsp;
            <Link to="/login" className="hover:text-blue-500">
              <u>Login</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp