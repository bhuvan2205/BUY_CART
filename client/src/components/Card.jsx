import { Link, useNavigate } from "react-router-dom";
import Placeholder from "./Placeholder";

const Card = (props) => {
  const navigate = useNavigate();
  const { title, description, btn, image, price, isLoading, id } = props || {};

  if (isLoading) {
    return <Placeholder />;
  }
  return (
    <>
      <div className="card w-96 bg-base-200 shadow-xl overflow-hidden">
        <Link to={`/product/${id}`}>
          <figure className="h-60">
            <img src={image} alt={title} className="h-full w-full object-cover" />
          </figure>
        </Link>
        <div className="card-body">
          <h2 className="card-title truncate text-2xl">{title}</h2>
          <p>{description}</p>
          <div className="card-actions justify-between items-center">
            <p className="font-bold text-white">${Number(price).toFixed(2)}</p>
            <button
              className="btn btn-secondary"
              onClick={() => navigate(`/product/${id}`)}
            >
              {btn}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
