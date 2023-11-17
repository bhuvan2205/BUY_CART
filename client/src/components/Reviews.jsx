import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const Reviews = (props) => {
  const { rating } = props || {};
  return (
    <div className="flex text-yellow-500 text-3xl justify-center items-center">
      {rating > 0.5 ? <FaStar /> : <FaStarHalfAlt />}
      {rating > 1.5 ? <FaStar /> : <FaStarHalfAlt />}
      {rating > 2.5 ? <FaStar /> : <FaStarHalfAlt />}
      {rating > 3.5 ? <FaStar /> : <FaStarHalfAlt />}
      {rating > 4.5 ? <FaStar /> : <FaStarHalfAlt />}
    </div>
  );
};

export default Reviews;
