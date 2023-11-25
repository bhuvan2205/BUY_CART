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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route path="/checkout/step1" element={<Shipping />} />
        <Route path="/checkout/step2" element={<PaymentMethod />} />
        <Route path="/checkout/step3" element={<PlaceOrder />} />
        <Route path="/order/:id" element={<Order />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route element={<AdminRoute />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/orderlist" element={<OrderList />} />
        <Route path="/admin/productlist" element={<ProductList />} />
        <Route path="/admin/product/edit/:id" element={<ProductEdit />} />
        <Route path="/admin/userlist" element={<UserList />} />
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
