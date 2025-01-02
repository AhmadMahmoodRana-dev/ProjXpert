import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "@/context/Context";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const { login } = useContext(Context);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      navigate("/");
    } catch (err) {
      setMessage("Error logging in, please try again");
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 w-full bg-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign In
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6 " onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#20bb59] placeholder:text-[#20bb59] focus:ring-2 focus:ring-inset focus:ring-[#20bb59] sm:text-sm/6 px-2"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
               
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#20bb59] placeholder:text-[#20bb59] focus:ring-2 focus:ring-inset focus:ring-[#20bb59] sm:text-sm/6 px-2"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-[#20bb59] px-3 py-1.5 text-sm/6 font-semibold text-[#20bb59] hover:text-white hover:border-white shadow-sm hover:bg-[#20bb59] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
              >
                Sign in
              </button>
            </div>
          </form>

          
        </div>
      </div>
    </>
  );
};

export default Login;
