import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const App = () => {
  const { mode } = useSelector((state) => state?.theme);

  return (
    <div
      data-theme={mode === "dark" ? "dark" : "light"}
      className="min-h-screen"
    >
      <Header />
      <Outlet />
      <ToastContainer />
    </div>
  );
};

export default App;
