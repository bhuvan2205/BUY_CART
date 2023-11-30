import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Product from "./pages/Product.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import Cart from "./pages/Cart.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Shipping from "./pages/Shipping.jsx";
import PaymentMethod from "./pages/PaymentMethod.jsx";
import PlaceOrder from "./pages/PlaceOrder.jsx";
import Order from "./pages/Order.jsx";
import Profile from "./pages/Profile.jsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import AdminRoute from "./components/AdminRoute.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import OrderList from "./pages/OrderList.jsx";
import ProductList from "./pages/ProductList.jsx";
import UserList from "./pages/UserList.jsx";
import ProductEdit from "./pages/ProductEdit.jsx";
import { ROUTES } from "./constants/routes.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path={`${ROUTES.SEARCH}/:keywords`} element={<Home />} />
      <Route path={`${ROUTES.PRODUCT}/:id`} element={<Product />} />
      <Route path={ROUTES.CART} element={<Cart />} />
      <Route path={ROUTES.REGISTER} element={<Register />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route path={ROUTES.CHECKOUT_STEP_1} element={<Shipping />} />
        <Route path={ROUTES.CHECKOUT_STEP_2} element={<PaymentMethod />} />
        <Route path={ROUTES.CHECKOUT_STEP_3} element={<PlaceOrder />} />
        <Route path={`${ROUTES.ORDER}/:id`} element={<Order />} />
        <Route path={ROUTES.PROFILE} element={<Profile />} />
      </Route>
      <Route element={<AdminRoute />}>
        <Route path={ROUTES.ADMIN_DASHBOARD} element={<Dashboard />} />
        <Route path={ROUTES.ORDER_LIST} element={<OrderList />} />
        <Route path={ROUTES.PRODUCT_LIST} element={<ProductList />} />
        <Route path={`${ROUTES.PRODUCT_EDIT}/:id`} element={<ProductEdit />} />
        <Route path={ROUTES.USER_LIST} element={<UserList />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
