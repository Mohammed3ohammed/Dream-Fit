import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import User from "./ui/User";
import Admin from "./ui/Admin";
import Header from "./components/Header";
import Orders from "./components/Orders";
import Footer from "./components/Footer";
import Products from "./components/Products";
import CartPage from "./components/CartPage";
import { CartProvider } from "./context/CartContext";
import ConfirmOrder from "./components/ConfirmOrder";

const Layout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Products /> },
      { path: '/user', element: <User /> },
      { path: '/admin', element: <Admin /> },
      { path: '/orders', element: <Orders /> },
      { path: '/cart', element: <CartPage /> },
      { path: '/confirm-order', element: <ConfirmOrder /> }

    ],
  },
]);

function App() {
    return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;