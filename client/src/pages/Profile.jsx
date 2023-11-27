import Message from "../components/Message";
import Skeleton from "../components/Skeleton";
import { useProfileQuery } from "../features/userApiSlice";
import profile from "../assets/profile.jpg";
import cover from "../assets/cover.jpg";
import {
  FaBox,
  FaCheckCircle,
  FaEnvelope,
  FaHeart,
  FaStar,
  FaTimesCircle,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { useFetchMyOrdersQuery } from "../features/orderApiSlice";

const Profile = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useProfileQuery();
  const {
    data: myOrders,
    isLoading: fetchingOrders,
    isError: isMyOrderError,
    error: myOrderError,
  } = useFetchMyOrdersQuery();
  return (
    <>
      <div className="container mx-auto">
        <div className="py-8">
          <Link to={ROUTES.HOME}>
            <button className="btn  btn-primary">Go Home</button>
          </Link>
          {isError && (
            <Message
              variant="alert-error"
              message={error?.data?.message || error?.message}
            />
          )}
          {isMyOrderError && (
            <Message
              variant="alert-error"
              message={myOrderError?.data?.message || myOrderError?.message}
            />
          )}
          <div className="lg:grid lg:grid-cols-12">
            <div className="col-span-8 col-start-1">
              {fetchingOrders && <Skeleton />}
              <div className="overflow-x-auto py-8">
                <table className="table bg-base-200 shadow-xl rounded-lg overflow-hidden">
                  {/* head */}
                  <thead className="bg-base-300">
                    <tr className="text-lg">
                      <th></th>
                      <th>ID</th>
                      <th>Shipping Address</th>
                      <th>Is Paid</th>
                      <th>Is Delivered</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myOrders?.orders &&
                      myOrders?.orders?.map((order, index) => (
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

            <div className="col-span-4 col-start-9">
              {isLoading && <Skeleton />}
              {data && (
                <>
                  <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto shadow-xl rounded-lg">
                    <div className="rounded-t-lg h-32 overflow-hidden bg-base-200">
                      <img
                        className="object-cover object-top w-full"
                        src={cover}
                        alt="profile cover"
                      />
                    </div>
                    <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
                      <img
                        className="object-cover object-center h-32"
                        src={profile}
                        alt="profile"
                      />
                    </div>
                    <div className="text-center mt-2">
                      <h2 className="font-semibold">{data?.name}</h2>
                      <span className="text-gray-500">
                        {data?.email}
                        <FaEnvelope className="inline-block mx-2" />
                      </span>
                    </div>
                    <ul className="py-4 mt-2 flex items-center justify-around">
                      <li className="flex flex-col items-center justify-around">
                        <FaStar className="text-info" />
                        <p>2k</p>
                      </li>
                      <li className="flex flex-col items-center justify-between">
                        <FaHeart className="text-secondary" />
                        <div>10k</div>
                      </li>
                      <li className="flex flex-col items-center justify-around">
                        <FaBox className="text-accent" />
                        <p>15</p>
                      </li>
                    </ul>
                    <div className="p-6 border-t mx-8 flex items-center justify-center">
                      {data?.isAdmin && (
                        <button
                          className="w-2/3  btn btn-primary rounded-full text-center"
                          onClick={() => {
                            navigate(data?.isAdmin ? "/admin/dashboard" : "#");
                          }}
                        >
                          View Dashboard
                        </button>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
