import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const { user } = useSelector((state) => state?.auth);

  return (
    <>{user?.isAdmin ? <Outlet /> : <Navigate to="/login" replace={true} />}</>
  );
};

export default AdminRoute;
