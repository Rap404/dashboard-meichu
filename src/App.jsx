import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth pages/LoginPage";
import BasicLayout from "./layouts/BasicLayout";
import CategoriesPage from "./pages/CategoriesPage";
import ProductsPage from "./pages/ProductsPage";
import EventsPage from "./pages/EventsPage";
import UsersPage from "./pages/UsersPage";
import Ambassador from "./pages/AmbassadorPage";
import CreateCategory from "./pages/form pages/FormCategory";
import CreateAmbassador from "./pages/form pages/FormAmbassadors";
import CreateProduct from "./pages/form pages/FormProduct";
import CreateEvent from "./pages/form pages/FormEvent";
import RequestsPage from "./pages/RequestsPage";
import AdminProfilePage from "./pages/AdminProfilePage";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useAuth } from "./lib/AuthContext";
import ForgotPassword from "./pages/auth pages/ForgotPassword";
import ErrorPage from "./pages/ErrorPage";
import { useState } from "react";
import FormCategory from "./pages/form pages/FormCategory";
import FormProduct from "./pages/form pages/FormProduct";
import FormAmbassador from "./pages/form pages/FormAmbassadors";
import FormEvent from "./pages/form pages/FormEvent";
import Requestdetail from "./pages/detail pages/Requestdetail";
import ContentPage from "./pages/ContentPage";
import SlotMachine from "./components/SlotsMachine";
import GachaPage from "./components/GachaMachine";
import Spinner from "./components/Spinner";
import SlotsMachine from "./components/SlotsMachine";

function App() {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState({});
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
            <Route element={<BasicLayout setUserProfile={setUserProfile} />}>
              <Route path="/" element={<HomePage profile={userProfile} />} />
              {/* <Route path="/tes" element={<GachaPage />} /> */}

              {/* Pages */}
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/ambassadors" element={<Ambassador />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/requests" element={<RequestsPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/profile" element={<AdminProfilePage />} />
              <Route path="/content" element={<ContentPage />} />

              {/* Form Pages */}
              <Route path="/categories/create" element={<FormCategory />} />
              <Route path="/categories/edit/:id" element={<FormCategory />} />

              <Route path="/ambassadors/create" element={<FormAmbassador />} />
              <Route
                path="/ambassadors/edit/:id"
                element={<FormAmbassador />}
              />

              <Route path="/products/create" element={<FormProduct />} />
              <Route path="/products/edit/:id" element={<FormProduct />} />

              <Route path="/events/create" element={<FormEvent />} />
              <Route path="/events/edit/:id" element={<FormEvent />} />

              {/* Detail Pages */}
              <Route path="/products/detail" element={<CreateProduct />} />
              <Route path="/requests/detail/:id" element={<Requestdetail />} />
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
