import { Link, useNavigate } from "react-router-dom";
import profile from "../assets/profile.jpg";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "../constants/routes";
import { removeUserDetails } from "../features/userSlice";
import { useLogoutMutation } from "../features/userApiSlice";
import { toast } from "react-toastify";
import { FaMoon, FaShoppingCart, FaSun } from "react-icons/fa";
import { clearShippingAddress } from "../features/cartSlice";
import { toggleTheme } from "../features/themeSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state?.cart);
  const { user } = useSelector((state) => state?.auth);
  const { mode } = useSelector((state) => state?.theme);

  const [logout, { isLoading }] = useLogoutMutation();

  const basketCount =
    cartItems?.length > 0
      ? cartItems?.reduce((acc, item) => {
          return (acc += item.quantity);
        }, 0)
      : 0;
  const subTotal =
    cartItems?.length > 0
      ? cartItems?.reduce((acc, item) => {
          return (acc += item.price);
        }, 0)
      : 0;

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(removeUserDetails());
      dispatch(clearShippingAddress());
      toast.success("User Logged Out Successfully", {
        closeOnClick: true,
        pauseOnHover: true,
      });
    } catch (error) {
      toast.error(error?.data?.message || error?.message, {
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  return (
    <div className="navbar bg-base-300 py-4 px-0">
      <div className="container mx-auto">
        <div className="flex-1">
          <Link className="font-bold text-primary text-xl" to={ROUTES.HOME}>
            Buy Cart
          </Link>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end pe-4">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="indicator">
                <FaShoppingCart className="text-2xl" />
                <span className="badge badge-sm badge-secondary indicator-item">
                  {basketCount}
                </span>
              </div>
            </label>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body bg-base-200">
                <span className="font-bold text-lg">
                  {cartItems?.length ? cartItems?.length : 0} Items
                </span>
                <span className="text-primary">
                  Subtotal: ${subTotal.toFixed(2)}
                </span>
                <div className="card-actions">
                  <button
                    className="btn  btn-primary"
                    onClick={() => navigate(ROUTES.CART)}
                  >
                    View cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="profile" src={profile} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
            >
              {user?._id ? (
                <>
                  <li>
                    <button
                      className="justify-between"
                      onClick={() => {
                        navigate("/profile");
                      }}
                    >
                      <span>Profile</span>
                      <span
                        className="badge badge-primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(toggleTheme());
                        }}
                      >
                        {mode === "dark" ? <FaMoon /> : <FaSun />}
                      </span>
                    </button>
                  </li>
                  <li>
                    <button disabled={isLoading} onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/register">Register</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
