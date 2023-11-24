import { Link, useNavigate } from "react-router-dom";
import Placeholder from "./Placeholder";
import Reviews from "./Reviews";

const Card = (props) => {
  const navigate = useNavigate();
  const { title, btn, image, price, isLoading, id, rating = 1 } = props || {};

  if (isLoading) {
    return <Placeholder />;
  }
  return (
    <>
      <div className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-base-300 bg-base-200 shadow-md">
        <Link to={`/product/${id}`}>
          <img
            className="object-cover md:h-60"
            src={image}
            alt="product image"
          />
        </Link>

        <div className="mt-4 px-5 pb-5">
          <a href="#">
            <h5 className="text-xl tracking-tight truncate">
              {title.charAt(0).toUpperCase() + title.slice(1)}
            </h5>
          </a>
          <div className="mt-2 mb-5 flex items-center justify-between">
            <p>
              <span className="text-xl font-bold ">
                ${Number(price).toFixed(2)}
              </span>
              <span className="text-sm  line-through">$699</span>
            </p>
            <div className="flex items-center">
              <Reviews rating={rating} />
              <span className="mr-2 ml-3 rounded bg-secondary text-black px-2.5 py-0.5 text-xs font-semibold">
              {rating}
              </span>
            </div>
          </div>
          <button
            href="#"
            className="btn btn-primary btn-block"
            onClick={() => navigate(`/product/${id}`)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {btn}
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
