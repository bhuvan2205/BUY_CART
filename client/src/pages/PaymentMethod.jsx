import { useEffect, useState } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addPaymentMethod } from "../features/cartSlice";
import { toast } from "react-toastify";

const PaymentMethod = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState("");
  
  const {
    shippingAddress,
    cartItems,
    paymentMethod: paymentDetail,
  } = useSelector((state) => state?.cart);

  useEffect(() => {
    if (paymentDetail) {
      setPaymentMethod(paymentDetail);
    }
  }, [paymentDetail]);

  useEffect(() => {
    if (!cartItems?.length) {
      navigate("/cart");
    }

    if (!shippingAddress?.address) {
      navigate("/checkout/step1");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="py-16 flex justify-center">
        <CheckoutSteps steps={3} />
      </div>
      <div className="flex justify-center items-center w-full flex-col">
        <div className="bg-base-200 p-12 rounded-lg overflow-hidden shadow-lg">
          <h1 className="text-2xl">Choose Payment Method</h1>
          <div className="form-control py-8">
            <label className="label cursor-pointer">
              <span className="label-text">PayPal or Credit Card</span>
              <input
                type="radio"
                name="payment"
                value="Paypal"
                className="radio checked:bg-primary"
                onChange={(e) => setPaymentMethod(e.target.value)}
                checked={paymentMethod === "Paypal"}
              />
            </label>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => {
              if (!paymentMethod) {
                return toast.error("Select Payment Method", {
                  closeOnClick: true,
                  pauseOnHover: true,
                });
              }
              dispatch(addPaymentMethod(paymentMethod));
              navigate("/checkout/step3");
            }}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentMethod;
