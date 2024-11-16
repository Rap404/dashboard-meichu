import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
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

function App() {
  return (
    <>
      <Routes>
        <Route element={<BasicLayout />}>
          <Route path="/" element={<HomePage />} />

          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categories/create" element={<CreateCategory />} />

          <Route path="/ambassadors" element={<Ambassador />} />
          <Route path="/ambassadors/create" element={<CreateAmbassador />} />

          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/create" element={<CreateProduct />} />

          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/create" element={<CreateEvent />} />

          <Route path="/users" element={<UsersPage />} />
          {/* <Route path="/users/create" element={<CreateUe />} /> */}
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
