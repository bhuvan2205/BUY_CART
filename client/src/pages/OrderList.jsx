import { useFetchAllOrdersQuery } from "../features/orderApiSlice";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useState } from "react";

const OrderList = () => {
  const [page, setPage] = useState(1);
  const {
    data,
    isLoading: fetchingOrders,
    isError: isErrorOrders,
    error: ordersError,
  } = useFetchAllOrdersQuery({ page });

  return (
    <div className="container mx-auto">
      <div className="py-8">
        <Link to={`/admin/dashboard`}>
          <button className="btn  btn-primary">Go Back</button>
        </Link>
      </div>
      <div>
        {isErrorOrders && (
          <Message
            variant="alert-error"
            message={ordersError?.data?.message || ordersError?.message}
          />
        )}
        {fetchingOrders ? (
          <Loader />
        ) : (
          <>
            <h2 className="text-2xl font-bold pb-4">List of Orders</h2>

            <table className="table bg-base-200 shadow-xl rounded-lg overflow-hidden">
              {/* head */}
              <thead className="bg-base-300">
                <tr className="text-lg">
                  <th></th>
                  <th>ID</th>
                  <th>User</th>
                  <th>Email</th>
                  <th>Shipping Address</th>
                  <th>Is Paid</th>
                  <th>Is Delivered</th>
                </tr>
              </thead>
              <tbody>
                {data?.orders &&
                  data?.orders?.map((order, index) => (
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
                      <td>{order?.user?.email}</td>
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
            <div className="py-8">
              <div className="join">
                <button
                  className="join-item btn text-primary"
                  disabled={!data?.hasPrevPage}
                  onClick={() => {
                    setPage((prevState) => prevState - 1);
                  }}
                >
                  «
                </button>
                <button className="join-item btn">
                  Page {page}
                </button>
                <button
                  className="join-item btn text-primary"
                  disabled={!data?.hasNextPage}
                  onClick={() => {
                    setPage((prevState) => prevState + 1);
                  }}
                >
                  »
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderList;
