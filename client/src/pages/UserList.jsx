import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useFetchAllUsersQuery } from "../features/userApiSlice";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";

const UserList = () => {
  const { data, isLoading, isError, error } = useFetchAllUsersQuery();
  return (
    <div className="container mx-auto">
      <div className="py-8">
        <Link to={`/admin/dashboard`}>
          <button className="btn  btn-primary">Go Back</button>
        </Link>
      </div>
      <div>
        {isError && (
          <Message
            variant="alert-error"
            message={error?.data?.message || error?.message}
          />
        )}
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <h2 className="text-2xl font-bold pb-4">List of Users</h2>
            <table className="table bg-base-200 shadow-xl rounded-lg overflow-hidden">
              {/* head */}
              <thead className="bg-base-300">
                <tr className="text-lg">
                  <th></th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Created At</th>
                  <th>Is Admin</th>
                </tr>
              </thead>
              <tbody>
                {data?.users &&
                  data?.users?.map((user, index) => (
                    <tr key={user?._id}>
                      <th>{index + 1}</th>
                      <td>{user?._id}</td>
                      <td>{user?.name}</td>
                      <td>{user?.email}</td>
                      <td>{user?.createdAt.slice(0, 10)}</td>
                      <td>
                        {user?.isAdmin ? (
                          <FaCheckCircle className="text-xl text-success" />
                        ) : (
                          <FaTimesCircle className="text-xl text-error" />
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default UserList;
