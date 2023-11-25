import { Link, useParams } from "react-router-dom";
import {
  useDeliverOrderMutation,
  useFetchOrderQuery,
  useFetchPaypalClientIDQuery,
  usePayOrderMutation,
} from "../features/orderApiSlice";
import { FaTimes } from "react-icons/fa";
import Skeleton from "../components/Skeleton";
import Message from "../components/Message";
import { toast } from "react-toastify";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useEffect } from "react";
import { ROUTES } from "../constants/routes";
import { useSelector } from "react-redux";
import Slider from "../components/Slider";

const Order = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state?.auth);
  const { data, isLoading, isError, error, refetch } = useFetchOrderQuery(id);
  const {
    data: paypal,
    isLoading: loadingPaypal,
    error: errorPaypal,
  } = useFetchPaypalClientIDQuery();
  const [paypalDispatch, { isLoading: paypalLoading }] =
    usePayPalScriptReducer();
  const [payOrder] = usePayOrderMutation();
  const [deliverOrder] = useDeliverOrderMutation();

  const {
    shippingAddress,
    cartItems,
    subTotal = 0,
    orderTotal = 0,
    shippingCost = 0,
    taxCost = 0,
    isPaid = false,
    isDelivered = false,
    paidAt = "",
    deliveredAt = "",
  } = data?.order || {};

  const handleDeliver = async () => {
    try {
      await deliverOrder({ id });
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error?.message, {
        closeOnClick: true,
        pauseOnHover: false,
      });
    }
  };

  const createOrder = async (data, actions) => {
    const orderID = await actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: orderTotal.toFixed(2),
          },
        },
      ],
    });
    return orderID;
  };

  const onApprove = async (data, actions) => {
    try {
      const details = await actions.order.capture();
      const { payer } = details || {};
      await payOrder({ id, ...payer });
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error?.message, {
        closeOnClick: true,
        pauseOnHover: false,
      });
    }
  };

  const onError = () => {
    toast.error("An Error occurs with Payment", {
      closeOnClick: true,
      pauseOnHover: true,
    });
  };

  useEffect(() => {
    if (!errorPaypal && !loadingPaypal && paypal?.clientID) {
      const loadPayPalScript = async () => {
        paypalDispatch.dispatch({
          type: "resetOptions",
          value: {
            clientId: paypal?.clientID,
            currency: "USD",
          },
        });
        paypalDispatch.dispatch({
          type: "setLoadingStatus",
          value: "pending",
        });
      };
      if (data?.order && !data?.order?.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    errorPaypal,
    loadingPaypal,
    data?.order,
    paypal?.clientID,
    paypalDispatch,
  ]);

  const paidDate = new Date(paidAt);
  const formattedPaidDate = `${("0" + paidDate.getDate()).slice(-2)}/${(
    "0" +
    (paidDate.getMonth() + 1)
  ).slice(-2)}/${paidDate.getFullYear()}`;
  const formattedPaidTime = `${("0" + paidDate.getHours()).slice(-2)}:${(
    "0" + paidDate.getMinutes()
  ).slice(-2)}`;

  const deliveredDate = new Date(deliveredAt);
  const formattedDeliveredDate = `${("0" + deliveredDate.getDate()).slice(
    -2
  )}/${("0" + (deliveredDate.getMonth() + 1)).slice(
    -2
  )}/${deliveredDate.getFullYear()}`;
  const formattedDeliveredTime = `${("0" + deliveredDate.getHours()).slice(
    -2
  )}:${("0" + deliveredDate.getMinutes()).slice(-2)}`;

  return (
    <>
      <div className="container mx-auto">
        <div className="py-8">
          <Link to={ROUTES.HOME}>
            <button className="btn  btn-primary">Go Home</button>
          </Link>
        </div>
        <div>
          {isError ? (
            <Message
              variant="alert-error"
              message={error?.data?.message || error?.message}
            />
          ) : (
            <div className="lg:grid lg:grid-cols-12 flex flex-col gap-8">
              <div className="lg:col-start-1 lg:col-span-7">
                {isLoading ? (
                  <Skeleton />
                ) : (
                  <div className="flex flex-col p-6 space-y-4 divide-y sm:p-10 divide-gray-700 bg-base-200">
                    <div>
                      <h2 className="text-2xl font-semibold">Order Items</h2>
                    </div>
                    <ul className="flex flex-col divide-y divide-gray-700">
                      {cartItems?.map((item) => (
                        <li
                          className="flex flex-col py-6 sm:flex-row sm:justify-between"
                          key={item?._id}
                        >
                          <div className="flex w-full space-x-2 sm:space-x-4">
                            <img
                              className="flex-shrink-0 object-cover w-20 h-12 dark:border-transparent rounded outline-none sm:w-20 sm:h-20 dark:bg-gray-500"
                              src={item?.image}
                              alt={item?.name}
                            />
                            <div className="flex flex-col justify-between w-full pb-4">
                              <div className="flex justify-between w-full pb-2 space-x-2">
                                <div className="space-y-1">
                                  <h3 className="text-lg font-semibold leading-normal sm:pr-8">
                                    {item?.name}
                                  </h3>
                                  <p className="text-sm dark:text-gray-400">
                                    <span className="pe-2">{item?.brand}</span>
                                    <span className="">{item?.category}</span>
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="text-lg font-semibold">
                                    ${item?.price.toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                    {isPaid && (
                      <div className="pt-4">
                        <h2 className="text-2xl font-semibold">Paid At</h2>
                        <div className="py-4">
                          <Message
                            variant="alert-success"
                            message={`Order Paid at ${formattedPaidTime} on ${formattedPaidDate} `}
                          />
                        </div>
                      </div>
                    )}
                    {isDelivered && (
                      <div className="pt-4">
                        <h2 className="text-2xl font-semibold">Delivered At</h2>
                        <div className="py-4">
                          <Message
                            variant="alert-success"
                            message={`Order Delivered at ${formattedDeliveredTime} on ${formattedDeliveredDate} `}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="lg:col-start-9 lg:col-span-4">
                {isLoading ? (
                  <Skeleton />
                ) : (
                  <div className="flex flex-col p-6 space-y-4 divide-y sm:p-10 divide-gray-700 bg-base-200">
                    <h2 className="text-2xl font-semibold">Order Summary</h2>
                    <ul className="flex flex-col pt-4 space-y-2">
                      {cartItems?.map((item) => (
                        <li
                          key={item?._id}
                          className="flex items-start justify-between"
                        >
                          <h3>
                            {item?.name}
                            <span className="text-sm text-primary px-4 font-bold">
                              <FaTimes className="inline text-sm" />
                              {item?.quantity}
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
                      </div>
                    </div>
                    <div className="pt-4">
                      <h2 className="text-2xl font-semibold">
                        Shipping Address
                      </h2>
                      <p className="pt-4 text-sm">{shippingAddress?.address}</p>
                      <p className="pt-1 text-sm">
                        {shippingAddress?.city}, {shippingAddress?.postalCode},{" "}
                        {shippingAddress?.country}
                      </p>
                    </div>
                    <div className="pt-4">
                      <h2 className="text-2xl font-semibold">Payment Method</h2>
                      <p className="text-sm pt-4">Paypal</p>
                    </div>
                    {!isPaid && (
                      <>
                        {paypalLoading && <Slider />}
                        <PayPalButtons
                          style={{ layout: "vertical" }}
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        />
                      </>
                    )}
                    {user?.isAdmin && isPaid && !isDelivered && (
                      <div className="pt-4">
                        <h2 className="text-2xl font-semibold">
                          Mark it Delivered
                        </h2>
                        <button
                          className="btn btn-primary mt-4"
                          onClick={handleDeliver}
                        >
                          Delivered
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Order;
