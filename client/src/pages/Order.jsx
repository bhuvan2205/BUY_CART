import { Link, useNavigate, useParams } from "react-router-dom";
import { useFetchOrderQuery } from "../features/orderApiSlice";

const Order = () => {
  const { id } = useParams();
  const { data, isLoading } = useFetchOrderQuery(id);

  return <div>Order</div>;
};

export default Order;
