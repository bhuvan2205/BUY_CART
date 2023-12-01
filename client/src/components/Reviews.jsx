import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Reviews = (props) => {
  const { rating = 1, variant = "normal", classNames } = props || {};
  return (
    <div
      className={`${
        classNames && classNames
      } flex text-yellow-500 text-2xl ${
        variant === "small" ? "text-sm" : "text-2xl"
      }`}
    >
      {rating >= 1 ? (
        <FaStar />
      ) : rating >= 0.5 ? (
        <FaStarHalfAlt />
      ) : (
        <FaRegStar />
      )}
      {rating >= 2 ? (
        <FaStar />
      ) : rating >= 1.5 ? (
        <FaStarHalfAlt />
      ) : (
        <FaRegStar />
      )}
      {rating >= 3 ? (
        <FaStar />
      ) : rating >= 2.5 ? (
        <FaStarHalfAlt />
      ) : (
        <FaRegStar />
      )}
      {rating >= 4 ? (
        <FaStar />
      ) : rating >= 3.5 ? (
        <FaStarHalfAlt />
      ) : (
        <FaRegStar />
      )}
      {rating >= 5 ? (
        <FaStar />
      ) : rating >= 4.5 ? (
        <FaStarHalfAlt />
      ) : (
        <FaRegStar />
      )}
    </div>
  );
};

export default Reviews;
