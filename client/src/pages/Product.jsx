import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useAddReviewMutation,
  useFetchProductQuery,
} from "../features/productApiSice";
import Message from "../components/Message";
import Reviews from "../components/Reviews";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCartItems } from "../features/cartSlice";
import { ROUTES } from "../constants/routes";
import Loader from "../components/Loader";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import profile from "../assets/profile.jpg";

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");

  const { data, isLoading, isError, error, refetch } = useFetchProductQuery(id);
  const [addReview, { isLoading: addingReview }] = useAddReviewMutation();

  const addToCartHandler = () => {
    dispatch(addCartItems({ quantity, ...data?.product }));
    navigate(ROUTES.CART);
  };

  const handleReview = async (e) => {
    e.preventDefault();

    if (!rating || !review) {
      return toast.error("Add your comment and Rating", {
        closeOnClick: true,
        pauseOnHover: false,
      });
    }

    try {
      await addReview({ rating, comment: review, id }).unwrap();
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error?.message, {
        closeOnClick: true,
        pauseOnHover: false,
      });
    }
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
          {data && (
            <>
              <div className="rounded-lg overflow-hidden">
                <img
                  src={data?.product?.image}
                  alt={data?.product?.name}
                  className="h-96 w-full object-cover md:h-[500px]"
                />
              </div>
              <div className="grid gap-8 grid-cols-12 py-8">
                <div className="col-span-6 col-start-1 bg-base-200 p-8 shadow-lg rounded-lg overflow-hidden">
                  <h1 className="font-bold text-xl">
                    {data?.product?.name?.charAt(0)?.toUpperCase() +
                      data?.product?.name?.slice(1)}
                  </h1>
                  <h6 className="py-4 text-justify">
                    {data?.product?.description}
                  </h6>
                  <div className="flex justify-between">
                    <div>
                      <h6 className="text-lg font-bold">Price</h6>
                      <p className="text-xl font-bold">
                        ${data?.product?.price?.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <h6 className="text-lg font-bold">Reviews:</h6>
                      <div className="flex">
                        <Reviews
                          rating={data?.product?.rating}
                          variant="small"
                        />
                        <span className="ms-2 text-sm">
                          {data?.product?.numReviews} Reviews
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 grid grid-cols-2">
                    {data?.product?.reviews?.map((item) => (
                      <div key={item?._id} className="py-2">
                        <div className="flex my-2">
                          <span>
                            <img
                              className="h-6 w-6 object-cover rounded-full me-2"
                              src={profile}
                              alt={item?.name}
                            />
                          </span>
                          {item?.name}
                        </div>
                        <p className="mb-2">{item?.comment}</p>
                        <div className="flex">
                          <Reviews
                            rating={item?.rating}
                            classNames="justify-start text-left items-center"
                          />
                          <p className="mx-2">
                            {item?.createdAt?.slice(0, 10)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-span-3 col-start-7 shadow-lg p-8 bg-base-200 rounded-lg overflow-hidden">
                  <h2 className="font-bold pb-4">Product Details</h2>
                  <div className="py-2 flex justify-between">
                    <p>Brand: </p>
                    <span className="text-left w-1/2">
                      {data?.product?.brand}
                    </span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <p>Category: </p>
                    <span className="text-left w-1/2">
                      {data?.product?.category}
                    </span>
                  </div>
                  <div className="py-2 flex justify-between items-center">
                    <h6>Select Quantity:</h6>
                    <div className="join w-1/2 text-left">
                      <button
                        className="join-item btn btn-neutral"
                        disabled={quantity === 1}
                        onClick={() =>
                          setQuantity((prevState) => prevState - 1)
                        }
                      >
                        -
                      </button>
                      <span className="join-item btn">{quantity}</span>
                      <button
                        className="join-item btn btn-neutral"
                        disabled={quantity === data?.product?.countInStock}
                        onClick={() =>
                          setQuantity((prevState) => prevState + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="py-2">
                    <button
                      className="btn btn-primary"
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
                <div className="col-span-3 col-start-10 bg-base-200 p-8 shadow-lg rounded-lg overflow-hidden">
                  <h1 className="text-md font-bold">Add your Review</h1>
                  <form onSubmit={handleReview}>
                    <div className="my-4">
                      <label htmlFor="comment" className="py-2 inline-block">
                        Comment
                      </label>
                      <input
                        id="comment"
                        type="text"
                        placeholder="Add you Comments"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        className="input input-bordered input-primary w-full max-w-lg md:min-w-[200px]"
                      />
                    </div>
                    <div className="my-4">
                      <label className="mx-2 inline-block">Select Rating</label>
                      <select
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="px-2 py-1 cursor-pointer"
                      >
                        <option value=""></option>
                        {[...Array(5)]?.map((item, index) => (
                          <option value={item} key={index}>
                            {index + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="my-8">
                      <button
                        className="btn btn-primary btn-block"
                        type="submit"
                        disabled={addingReview}
                      >
                        {addingReview && <Spinner />}
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
