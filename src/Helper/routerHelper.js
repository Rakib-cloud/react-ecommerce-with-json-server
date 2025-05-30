import UserHomePage from "../pages/User/UserHomePage";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import OrderSuccess from "../pages/User/components/OrderSuccess";
import Dashboard from "../admin/Dashboard";
import ProductList from "../admin/ProductList";
import AdminUserListPage from "../admin/AdminUserListPage";
import AdminOrderListPage from "../admin/AdminOrderListPage";
import AddProduct from "../admin/AddProduct";
import ProfilePage from "../pages/User/ProfilePage";
import CartPage from "../pages/User/CartPage";
import PrivateRoute from "../components/PrivateRoute";

export const allRoutes = [
    // Public routes
    {
        path: "/",
        element: UserHomePage,
        isPrivate: false
    },
    {
        path: "/login",
        element: Login,
        isPrivate: false
    },
    {
        path: "/register",
        element: Register,
        isPrivate: false
    },
    {
        path: "/order-success",
        element: OrderSuccess,
        isPrivate: false
    },

    // Admin routes
    {
        path: "/admin/dashboard",
        element: Dashboard,
        isPrivate: true,
        role: "admin"
    },
    {
        path: "/admin/products",
        element: ProductList,
        isPrivate: true,
        role: "admin"
    },
    {
        path: "/admin/users",
        element: AdminUserListPage,
        isPrivate: true,
        role: "admin"
    },
    {
        path: "/admin/orders",
        element: AdminOrderListPage,
        isPrivate: true,
        role: "admin"
    },
    {
        path: "/admin/add-product",
        element: AddProduct,
        isPrivate: true,
        role: "admin"
    },

    // User routes
    {
        path: "/user",
        element: UserHomePage,
        isPrivate: true,
        role: "user"
    },
    {
        path: "/profile",
        element: ProfilePage,
        isPrivate: true,
        role: "user"
    },
    {
        path: "/cart",
        element: CartPage,
        isPrivate: true,
        role: "user"
    }
];


export const renderRouteElement = (route) => {
    const Component = route.element;

    if (route.isPrivate) {
        return (
            <PrivateRoute role={route.role}>
                <Component />
            </PrivateRoute>
        );
    }

    return <Component />;
};