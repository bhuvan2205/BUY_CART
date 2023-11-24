import { Link, useNavigate, useParams } from "react-router-dom";
import { useFetchProductQuery } from "../features/productApiSice";
import Message from "../components/Message";
import Reviews from "../components/Reviews";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCartItems } from "../features/cartSlice";
import { ROUTES } from "../constants/routes";
import Loader from "../components/Loader";

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { data, isLoading, isError, error } = useFetchProductQuery(id);

  const addToCartHandler = () => {
    dispatch(addCartItems({ quantity, ...data?.product }));
    navigate(ROUTES.CART);
  };

  return (
    <div className="container mx-auto">
      <div className="py-8">
        <Link to={ROUTES.HOME}>
          <button className="btn  btn-primary">Go Back</button>
        </Link>
        <div className="py-8">
          {isError && (
            <Message
              message={error?.data?.message || error?.message}
              variant="alert-error"
            />
          )}
          {isLoading && <Loader />}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
            {data && (
              <>
                <div>
                  <figure>
                    <img src={data?.product?.image} alt={data?.product?.name} />
                  </figure>
                </div>
                <div className="text-center lg:ps-12">
                  <h1 className="text-3xl pb-4">{data?.product?.name}</h1>
                  <h2 className="text-2xl py-4">Ratings:</h2>
                  <Reviews className="py-8" rating={data?.product?.rating} />
                  <p className="py-4 text-justify">
                    {data?.product?.description}
                  </p>
                </div>
                <div className="stats stats-vertical shadow bg-base-200 p-4">
                  <div className="stat">
                    <div className="stat-title text-xl font-bold">Price</div>
                    <div className="stat-value">${data?.product?.price}</div>
                  </div>
                  <div className="stat">
                    <div className="stat-title text-xl font-bold">
                      {data?.product?.countInStock > 0 ? (
                        <span className="badge badge-success">In Stock</span>
                      ) : (
                        <span className="badge badge-error">Out of Stock</span>
                      )}
                    </div>
                  </div>
                  <div className="stat">
                    <div className="stat-title text-xl font-bold">
                      Select Quantity
                    </div>
                    <select
                      id="quantity"
                      className="p-2 mt-2 bg-base-300"
                      onChange={(e) => setQuantity(Number(e.target.value))}
                    >
                      {[...Array(data?.product?.countInStock)].map(
                        (_, index) => (
                          <option key={index} className="px-1">
                            {index + 1}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                  <div className="stat text-center">
                    <div className="stat-actions">
                      <button
                        className="btn btn-primary"
                        disabled={data?.product?.countInStock === 0}
                        onClick={addToCartHandler}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
