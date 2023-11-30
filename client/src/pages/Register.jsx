import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useRegisterUserMutation } from "../features/userApiSlice";
import { ROUTES } from "../constants/routes";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const { user } = useSelector((state) => state?.auth);
  const [register, { isLoading }] = useRegisterUserMutation();

  useEffect(() => {
    if (user?._id) {
      navigate(ROUTES.HOME);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      return toast.error("Fields cannot be empty", {
        closeOnClick: true,
        pauseOnHover: false,
      });
    }
    try {
      await register({ email, password, name }).unwrap();
      navigate(ROUTES.LOGIN);
    } catch (error) {
      toast.error(error?.data?.message || error?.message, {
        closeOnClick: true,
        pauseOnHover: false,
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="bg-base-200 p-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold py-4">Sign Up</h1>
          <p className="text-sm dark:text-gray-400">
            Sign up to register your account
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="my-4">
            <label htmlFor="email" className="py-2 inline-block">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered input-primary w-full max-w-lg md:min-w-[200px]"
            />
          </div>
          <div className="my-4">
            <label htmlFor="name" className="py-2 inline-block">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="User Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered input-primary w-full max-w-lg md:min-w-[200px]"
            />
          </div>
          <div className="my-4">
            <label htmlFor="password" className="py-2 inline-block">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered input-primary w-full max-w-lg md:min-w-[200px]"
            />
          </div>
          <div className="my-4">
            <label htmlFor="confirmPassword" className="py-2 inline-block">
              Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input input-bordered input-primary w-full max-w-lg md:min-w-[200px]"
            />
          </div>
          <div className="my-8">
            <button
              className={`btn btn-primary btn-block ${
                isLoading && "animate-spin"
              }`}
              type="submit"
              disabled={isLoading}
            >
              Register
            </button>
            <p className="flex items-center justify-center">
              Already have an account?{" "}
              <Link to={ROUTES.LOGIN} className="px-1">
                <button className="btn btn-link btn-md p-0">Login</button>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
