import { FaCheckCircle, FaInfoCircle, FaTimesCircle } from "react-icons/fa";

const Message = (props) => {
  const { variant, message } = props || {};
  return (
    <div className={`alert ${variant}`}>
      {variant === "alert-success" && <FaCheckCircle className="text-xl" />}
      {variant === "alert-info" && <FaInfoCircle className="text-xl" />}
      {variant === "alert-error" && <FaTimesCircle className="text-xl" />}
      <span>{message}</span>
    </div>
  );
};

export default Message;
