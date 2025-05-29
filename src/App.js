
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import {  AuthProvider } from "./context/AuthContext";
import Dashboard from "./admin/Dashboard";
import AddProduct from "./admin/AddProduct";
import ProductList from "./admin/ProductList";
import UserHomePage from "./pages/User/UserHomePage";
import PrivateRoute from "./components/PrivateRoute";
import ProfilePage from "./pages/User/ProfilePage";
import CartPage from "./pages/User/CartPage";
import OrderSuccess from "./pages/User/components/OrderSuccess";
import AdminUserListPage from "./admin/AdminUserListPage";
import AdminOrderListPage from "./admin/AdminOrderListPage";


function App() {
  return (
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<UserHomePage/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
                path="/admin/dashboard"
                element={
                  <PrivateRoute role="admin">
                      <Dashboard />
                  </PrivateRoute>
                }
            />

              <Route
                  path="/admin/products"
                  element={
                      <PrivateRoute role="admin">
                          <ProductList />
                      </PrivateRoute>
                  }
              />

              <Route path="/admin/users" element={<PrivateRoute role="admin"><AdminUserListPage /></PrivateRoute>} />
              <Route path="/admin/orders" element={<PrivateRoute role="admin"><AdminOrderListPage /></PrivateRoute>} />

              <Route
                  path="/admin/add-product"
                  element={
                      <PrivateRoute role="admin">
                          <AddProduct />
                      </PrivateRoute>
                  }
              />

            <Route
                path="/user"
                element={
                  <PrivateRoute role="user">
                   <UserHomePage/>
                  </PrivateRoute>
                }
            />
              <Route path="/profile" element={<PrivateRoute role="user"><ProfilePage /></PrivateRoute>} />
              <Route path="/cart" element={<PrivateRoute role="user"><CartPage /></PrivateRoute>} />
              <Route path="/order-success" element={<OrderSuccess />} />
          </Routes>
        </Router>
      </AuthProvider>
  );
}

export default App;
