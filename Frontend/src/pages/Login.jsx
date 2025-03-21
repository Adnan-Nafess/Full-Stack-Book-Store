import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";

const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeHandle = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const submit = async () => {
    try {
      if (values.username === "" || values.password === "") {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          "https://full-stack-book-store-gamma.vercel.app/api/v1/users/sign-in",
          values
        );
        dispatch(authActions.login());
        dispatch(authActions.changeRole(response.data.role)); 
        console.log(authActions)
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        // console.log(response.data);
        navigate("/profile");
      }
    } catch (err) {
      alert(err.response.data.message);
    };
  }

  return (
    <div className="h-screen bg-zinc-900 px-12 py-8 flex items-center justify-center">
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
              value={values.username}
              onChange={changeHandle}
              required
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
              value={values.password}
              onChange={changeHandle}
              required
            />
          </div>
          <div className="mt-4">
            <button onClick={submit} className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-700">
              Login
            </button>
          </div>
          <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">
            Or
          </p>
          <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
            Already have an account? &nbsp;
            <Link to="/signup" className="hover:text-blue-500">
              <u>Sign Up</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
