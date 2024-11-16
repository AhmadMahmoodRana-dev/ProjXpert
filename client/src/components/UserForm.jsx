import { useContext, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Radio,
  RadioGroup,
} from "@headlessui/react";
import { FaXmark, FaStar } from "react-icons/fa6";
import axios from "axios";
import { Context } from "@/context/Context";
import { Button } from "./ui/button";
import { darkBackground } from "./Colors";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const UserForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "client", // default role (adjust if necessary)
  });
  const { getUsers,openUserForm, setOpenUserForm ,mode} = useContext(Context);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:1337/api/form/register",
        formData
      );
      getUsers();
      setOpenUserForm(false)
    } catch (err) {
      setMessage("Error signing up, please try again");
    }
  };

  return (
    <Dialog open={openUserForm} onClose={setOpenUserForm} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:block"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
          <DialogPanel
            transition
            className="flex w-full transform text-left text-base transition data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:my-8 md:max-w-2xl md:px-4 data-[closed]:md:translate-y-0 data-[closed]:md:scale-95 lg:max-w-4xl"
          >
            <div className={`relative flex w-full items-center overflow-hidden ${mode ? darkBackground : 'bg-white'} px-4 pb-14 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8 rounded-md`}>
              <button
                type="button"
                onClick={() => setOpenUserForm(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
              >
                <span className="sr-only">Close</span>
                <FaXmark aria-hidden="true" className="h-6 w-6" />
              </button>

              <form
                onSubmit={handleSubmit}
                className="w-full pt-10 px-10 flex flex-col gap-6"
              >
              <h1 className="text-center text-xl font-bold italic underline text-gray-400 pb-5">Add Users</h1>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset bg-transparent sm:text-sm/6"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset bg-transparent sm:text-sm/6"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset bg-transparent sm:text-sm/6"
                />
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset bg-transparent sm:text-sm/6"
                >
                  <option value="client">Client</option>
                  <option value="worker">Worker</option>
                  <option value="admin">Admin</option>
                </select>
                <Button type="submit">Sign Up</Button>
              </form>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default UserForm;
