import {
  FaCheckCircle,
  FaHeart,
  FaShoppingBag,
  FaTimesCircle,
} from "react-icons/fa";
import profile from "../assets/profile.jpg";
import sales from "../assets/sales.jpg";
import Slider from "../components/Slider";
import { useFetchAllOrdersQuery } from "../features/orderApiSlice";
import { useFetchProductsQuery } from "../features/productApiSice";
import Message from "../components/Message";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const {
    data,
    isLoading,
    isError: isErrorProduct,
    error: productError,
  } = useFetchProductsQuery();
  const {
    data: orders,
    isLoading: fetchingOrders,
    isError: isErrorOrders,
    error: ordersError,
  } = useFetchAllOrdersQuery({ limit: 5, page: 1 });
  const navigate = useNavigate();
  return (
    <div className="container mx-auto">
      <div className="py-8">
        <div className="pb-8">
          <Link to={"/profile"}>
            <button className="btn  btn-primary">Go to Profile</button>
          </Link>
        </div>
        <div className="lg:grid lg:grid-cols-12 gap-8">
          <div className="col-span-9 col-start-1">
            <div className="flex w-full shadow-lg bg-base-200 p-4 divide-x-2 rounded-lg overflow-hidden">
              <div className="stat">
                {fetchingOrders && <Slider />}
                {isErrorOrders && (
                  <Message
                    variant="alert-error"
                    message={ordersError?.data?.message || ordersError?.message}
                  />
                )}
                {orders && (
                  <>
                    <div className="stat-figure text-primary">
                      <FaHeart className="text-2xl" />
                    </div>
                    <div className="stat-title">Total Orders</div>
                    <div className="stat-value text-primary">
                      {orders?.orders?.length ?? 0}
                    </div>
                    <div className="stat-desc">21% more than last month</div>
                    <span
                      className="badge cursor-pointer badge-primary mt-4"
                      onClick={() => {
                        navigate("/admin/orderlist");
                      }}
                    >
                      View All 
                    </span>
                  </>
                )}
              </div>
              <div className="stat">
                <div className="stat-figure text-secondary">
                  <div className="avatar online">
                    <div className="w-12 rounded-full">
                      <img src={profile} alt="profile" />
                    </div>
                  </div>
                </div>
                <div className="stat-title">Active Users</div>
                <div className="stat-value text-secondary">2</div>
                <div className="stat-desc">39% more than last month</div>
                <span
                  className="badge cursor-pointer badge-secondary mt-4"
                  onClick={() => {
                    navigate("/admin/userlist");
                  }}
                >
                  View All
                </span>
              </div>
              <div className="stat">
                {isLoading && <Slider />}
                {isErrorProduct && (
                  <Message
                    variant="alert-error"
                    message={
                      productError?.data?.message || productError?.message
                    }
                  />
                )}
                <div className="stat-figure text-info">
                  <FaShoppingBag className="text-2xl" />
                </div>
                <div className="stat-title">Available Products</div>
                <div className="stat-value text-info">
                  {data?.products?.length ?? 0}
                </div>
                <div className="stat-desc">30 sales in Last month</div>
                <span
                  className="badge cursor-pointer badge-info mt-4"
                  onClick={() => {
                    navigate("/admin/productlist");
                  }}
                >
                  View All
                </span>
              </div>
            </div>
            <div>
              <div className="overflow-x-auto py-8">
                <div className="py-4 flex justify-between">
                  <h2 className="text-xl font-bold pb-4">Latest Orders</h2>
                  <Link
                    to="/admin/orderlist"
                    className="badge-primary badge cursor-pointer no-underline"
                  >
                    View All
                  </Link>
                </div>
                <table className="table bg-base-200 shadow-xl rounded-lg overflow-hidden">
                  <thead className="bg-base-300">
                    <tr className="text-lg">
                      <th></th>
                      <th>ID</th>
                      <th>User</th>
                      <th>Shipping Address</th>
                      <th>Is Paid</th>
                      <th>Is Delivered</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders?.orders &&
                      orders?.orders?.map((order, index) => (
                        <tr key={order?._id}>
                          <th>{index + 1}</th>
                          <td>
                            <Link
                              className="btn-link p-0 m-0 no-underline"
                              to={`/order/${order?._id}`}
                            >
                              {order?._id}
                            </Link>
                          </td>
                          <td>{order?.user?.name}</td>
                          <td>{order?.shippingAddress?.address}</td>
                          <td>
                            {order?.isPaid ? (
                              <FaCheckCircle className="text-xl text-success text-center w-full" />
                            ) : (
                              <FaTimesCircle className="text-xl text-error text-center w-full" />
                            )}
                          </td>
                          <td>
                            {order?.isDelivered ? (
                              <FaCheckCircle className="text-xl text-success text-center w-full" />
                            ) : (
                              <FaTimesCircle className="text-xl text-error text-center w-full" />
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-span-3 col-start-10">
            <div className="rounded-md overflow-hidden h-auto max-h-full">
              <img
                src={sales}
                alt="sales"
                className="h-full w-full object-cover shadow-lg brightness-50"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
