import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoginMutation } from "../features/userApiSlice";
import { ROUTES } from "../constants/routes";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../features/userSlice";
import Spinner from "../components/Spinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state?.auth);
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (user?._id) {
      navigate(ROUTES.HOME);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Fields cannot be empty", {
        closeOnClick: true,
        pauseOnHover: false,
      });
    }
    try {
      const user = await login({ email, password }).unwrap();
      dispatch(setUserDetails(user));
      toast.success("User Logged In Successfully", {
        closeOnClick: true,
        pauseOnHover: false,
      });
      navigate(ROUTES.HOME);
    } catch (error) {
      toast.error(error?.data?.message || error?.message, {
        closeOnClick: true,
        pauseOnHover: false,
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="bg-base-200 p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold py-4">Sign In</h1>
          <p className="text-sm dark:text-gray-400">
            Sign in to access your account
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
          <div className="my-8">
            <button
              className="btn btn-primary btn-block"
              type="submit"
              disabled={isLoading}
            >
              {isLoading && <Spinner />}
              Submit
            </button>
            <p className="flex items-center justify-center">
              {"Don't have an account yet? "}
              <Link to={ROUTES.REGISTER} className="px-1">
                <button className="btn btn-link btn-md p-0">Sign Up</button>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
