import {
  FaAngleLeft,
  FaShippingFast,
  FaTimes,
  FaTrashAlt,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { removeCartItems } from "../features/cartSlice";

const Cart = () => {
  const {
    cartItems = 0,
    subTotal = 0,
    shippingCost = 0,
    taxCost = 0,
    orderTotal = 0,
  } = useSelector((state) => state?.cart);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="container mx-auto">
      <div className="py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col max-w-3xl p-6 space-y-4 sm:p-10 bg-base-200">
          <h2 className="text-2xl font-semibold">Your cart</h2>
          <ul className="flex flex-col divide-y divide-gray-700">
            {cartItems?.map((item) => (
              <li
                className="flex flex-col py-6 sm:flex-row sm:justify-between"
                key={item?._id}
              >
                <div className="flex w-full space-x-2 sm:space-x-4">
                  <img
                    className="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500"
                    src={item.image}
                    alt={item.name}
                  />
                  <div className="flex flex-col justify-between w-full pb-4">
                    <div className="flex justify-between w-full pb-2 space-x-2">
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold leading-normal sm:pr-8">
                          {item.name}
                        </h3>
                        <p className="text-sm dark:text-gray-400">
                          <span className="pe-2">{item.brand}</span>
                          <span className="">{item.category}</span>
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="flex text-sm divide-x">
                      <button
                        type="button"
                        className="flex items-center px-2 py-1 pl-0 space-x-1"
                        onClick={() => {
                          dispatch(removeCartItems(item?._id));
                        }}
                      >
                        <FaTrashAlt />
                        <span>Remove</span>
                      </button>
                      <button
                        type="button"
                        className="flex items-center px-2 py-1 space-x-1"
                      >
                        <FaAngleLeft />
                        <span
                          onClick={() =>
                            navigate(`${ROUTES.PRODUCT}/${item._id}`)
                          }
                        >
                          View Product
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="space-y-1 text-right">
            <p>
              Total amount:
              <span className="font-semibold"> ${subTotal}</span>
            </p>
            <p className="text-sm dark:text-gray-400">
              Not including taxes and shipping costs
            </p>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-6 py-2 border rounded-md btn btn-outline btn-primary"
              onClick={() => navigate(ROUTES.HOME)}
            >
              Back
              <span className="sr-only sm:not-sr-only"> to home</span>
            </button>
            <button
              type="button"
              className="px-6 py-2 border rounded-md btn-primary btn"
              disabled={cartItems?.length === 0}
              onClick={() => {
                navigate("/checkout/step1");
              }}
            >
              <span className="sr-only sm:not-sr-only">Continue to </span>
              Checkout
            </button>
          </div>
        </div>
        <div>
          <div className="flex flex-col max-w-md p-6 space-y-4 divide-y sm:w-96 sm:p-10 divide-gray-700 bg-base-200">
            <h2 className="text-2xl font-semibold">Order items</h2>
            <ul className="flex flex-col pt-4 space-y-2">
              {cartItems?.map((item) => (
                <li key={item._id} className="flex items-start justify-between">
                  <h3>
                    {item.name}
                    <span className="text-sm text-primary px-4 font-bold">
                      <FaTimes className="inline text-sm" />
                      {item.quantity}
                    </span>
                  </h3>
                  <div className="text-right">
                    <span className="block">
                      ${(item?.price * item?.quantity).toFixed(2)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="pt-4 space-y-2">
              <div>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subTotal}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <span className="text-info py-2">
                    Spend $2000, get free shipping
                    <FaShippingFast className="inline ms-1" />
                  </span>
                </div>
              </div>
            </div>
            <div className="pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Delivery fee</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between">
                  <span>Tax fee</span>
                  <span>${taxCost.toFixed(2)}</span>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex justify-between">
                  <span>Order Total</span>
                  <span className="font-semibold">
                    ${orderTotal.toFixed(2)}
                  </span>
                </div>
                <button
                  type="button"
                  className="w-full py-2 font-semibold border rounded btn btn-primary"
                  disabled={cartItems?.length === 0}
                  onClick={() => {
                    navigate("/checkout/step1");
                  }}
                >
                  Go to checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
