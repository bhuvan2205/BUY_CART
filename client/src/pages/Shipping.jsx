import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { addShippingAddress } from "../features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";

const Shipping = () => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const { shippingAddress, cartItems } = useSelector((state) => state?.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!cartItems?.length) {
      navigate("/cart");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (shippingAddress) {
      setAddress(shippingAddress?.address || "");
      setPostalCode(shippingAddress?.postalCode || "");
      setCity(shippingAddress?.city || "");
      setCountry(shippingAddress?.country || "");
    }
  }, [shippingAddress]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!address || !city || !postalCode || !country) {
      return toast.error("Fields cannot be empty", {
        closeOnClick: true,
        pauseOnHover: false,
      });
    }

    if (postalCode.trim().length !== 6 || postalCode.trim().length >= 7) {
      return toast.error("Postal Code is not Valid", {
        closeOnClick: true,
        pauseOnHover: false,
      });
    }

    dispatch(
      addShippingAddress({ address: { address, city, postalCode, country } })
    );
    navigate("/checkout/step2");
  };
  return (
    <>
      <div className="py-12 flex justify-center">
        <CheckoutSteps steps={2} />
      </div>
      <div className="flex justify-center items-center w-full flex-col">
        <div className="bg-base-200 p-12">
          <h1 className="text-2xl font-bold py-4">Shipping Address</h1>
          <form onSubmit={handleSubmit}>
            <div className="my-4">
              <label htmlFor="address" className="py-2 inline-block">
                Address
              </label>
              <input
                id="address"
                type="text"
                placeholder="Enter your Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="input input-bordered input-primary w-full max-w-lg md:min-w-[350px]"
              />
            </div>
            <div className="my-4">
              <label htmlFor="city" className="py-2 inline-block">
                City
              </label>
              <input
                id="city"
                type="text"
                placeholder="Enter your City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="input input-bordered input-primary w-full max-w-lg md:min-w-[350px]"
              />
            </div>
            <div className="my-4">
              <label htmlFor="postalCode" className="py-2 inline-block">
                Postal Code
              </label>
              <input
                id="postalCode"
                type="text"
                placeholder="Enter your Postal Code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="input input-bordered input-primary w-full max-w-lg md:min-w-[350px]"
              />
            </div>
            <div className="my-4">
              <label htmlFor="country" className="py-2 inline-block">
                Country
              </label>
              <input
                id="country"
                type="text"
                placeholder="Enter your Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="input input-bordered input-primary w-full max-w-lg md:min-w-[350px]"
              />
            </div>
            <div className="my-4">
              <button className="btn btn-primary" type="submit">
                Save Address
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;
