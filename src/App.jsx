import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import User from "./components/User";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Products from "./components/Products";
import CartPage from "./components/CartPage";
import { CartProvider } from "./context/CartContext";

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
      { path: 'user', element: <User /> },
      { path: 'cart', element: <CartPage /> },
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