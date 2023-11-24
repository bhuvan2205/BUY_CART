import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { user } = useSelector((state) => state?.auth);

  return (
    <>{user?._id ? <Outlet /> : <Navigate to="/login" replace={true} />}</>
  );
};

export default PrivateRoute;
