import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth pages/LoginPage";
import BasicLayout from "./layouts/BasicLayout";
import CategoriesPage from "./pages/CategoriesPage";
import ProductsPage from "./pages/ProductsPage";
import EventsPage from "./pages/EventsPage";
import UsersPage from "./pages/UsersPage";
import Ambassador from "./pages/AmbassadorPage";
import CreateCategory from "./pages/create pages/CreateCategory";
import CreateAmbassador from "./pages/create pages/CreateAmbassador";
import CreateProduct from "./pages/create pages/CreateProduct";
import CreateEvent from "./pages/create pages/CreateEvent";
import RequestsPage from "./pages/RequestsPage";
import AdminProfilePage from "./pages/AdminProfilePage";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useAuth } from "./lib/AuthContext";
import ForgotPassword from "./pages/auth pages/ForgotPassword";
import ErrorPage from "./pages/ErrorPage";

function App() {
  const { user } = useAuth();
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <Routes>
        <Route path="*" element={<ErrorPage />} />

        {user ? (
          <>
            <Route element={<BasicLayout />}>
              <Route path="/" element={<HomePage />} />

              {/* Pages */}
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/ambassadors" element={<Ambassador />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/requests" element={<RequestsPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/profile" element={<AdminProfilePage />} />

              {/* Create Pages */}
              <Route path="/categories/create" element={<CreateCategory />} />
              <Route
                path="/ambassadors/create"
                element={<CreateAmbassador />}
              />
              <Route path="/products/create" element={<CreateProduct />} />
              <Route path="/events/create" element={<CreateEvent />} />

              {/* Detail Pages */}

              <Route path="/products/detail" element={<CreateProduct />} />
              <Route path="/requests/detail" element={<CreateProduct />} />
            </Route>
          </>
        ) : (
          <>
            <Route path="/" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
