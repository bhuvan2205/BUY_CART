import { Link, useNavigate } from "react-router-dom";
import Placeholder from "./Placeholder";
import Reviews from "./Reviews";
import { FaCartPlus } from "react-icons/fa";
import { ROUTES } from "../constants/routes";

const Card = (props) => {
  const navigate = useNavigate();
  const { title, btn, image, price, isLoading, id, rating = 1 } = props || {};

  if (isLoading) {
    return <Placeholder />;
  }
  return (
    <>
      <div className="relative flex w-full max-w-sm flex-col overflow-hidden rounded-lg border border-base-300 bg-base-200 shadow-md">
        <Link to={`/product/${id}`}>
          <img
            className="object-cover md:h-60 w-full"
            src={image}
            alt="product image"
          />
        </Link>

        <div className="mt-4 px-5 pb-5">
          <a href="#">
            <h5 className="text-xl tracking-tight truncate">
              {title?.charAt(0)?.toUpperCase() + title.slice(1)}
            </h5>
          </a>
          <div className="mt-2 mb-5 flex items-center justify-between">
            <p>
              <span className="text-xl font-bold ">
                ${Number(price)?.toFixed(2)}{" "}
              </span>
              <span className="text-sm  line-through">
                ${(Number(price) * 1.1)?.toFixed(2)}
              </span>
            </p>
            <div className="flex items-center">
              <Reviews rating={rating} variant="small" />
              <span className="mr-2 ml-3 rounded bg-secondary text-black px-2.5 py-0.5 text-xs font-semibold">
                {rating?.toFixed(1)}
              </span>
            </div>
          </div>
          <button
            href="#"
            className="btn btn-primary btn-block"
            onClick={() => navigate(`${ROUTES.PRODUCT}/${id}`)}
          >
            <FaCartPlus className="text-xl" />
            {btn}
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
