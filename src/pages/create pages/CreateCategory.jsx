import React, { useEffect, useState } from "react";
import FormLayout from "../../layouts/FormLayout";
import { baseUrl, formCategories } from "../../Constant";
import { handleChange } from "../../lib/FormHandler";
import axios from "axios";
import { useAuth } from "../../lib/AuthContext";
import { errorNotif, successNotif } from "../../components/text/Notification";
import { useNavigate } from "react-router-dom";

const CreateCategory = () => {
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const pages = ["Categories", ">", "Create"];
  const initialFormState = {
    name: "",
    products: [],
  };
  const [formData, setFormData] = useState(initialFormState);
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = getToken();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/products`);
      setProducts(response.data.data || []);
      setError(null);
    } catch (error) {
      setError(error.message) || "Failed fetch Products";
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (nav, resetForm = false) => {
    try {
      const categoryResponse = await axios.post(
        `${baseUrl}/categories`,
        {
          data: {
            name: formData.name,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newCategoryId = categoryResponse.data.data.id;

      if (formData.products && formData.products.length > 0) {
        await axios.put(
          `${baseUrl}/categories/${newCategoryId}`,
          {
            data: {
              products: formData.products,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      successNotif("Category successfully made");
      navigate(nav);

      if (resetForm) {
        setFormData(initialFormState);
      }
    } catch (error) {
      console.error(
        "Gagal membuat kategori:",
        error.response?.data || error.message,
        "Status:",
        error.response?.status
      );

      // Tampilkan pesan error spesifik
      if (error.response) {
        switch (error.response.status) {
          case 403:
            errorNotif("Anda tidak memiliki izin untuk membuat kategori");
            break;
          case 401:
            errorNotif("Autentikasi gagal. Silakan login ulang");
            break;
          default:
            errorNotif("Terjadi kesalahan saat membuat kategori");
        }
      }

      setError(error);
      throw error; // Rethrow untuk penanganan lebih lanjut
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <div className="">load...</div>;
  if (loading) return <div className="">{errorNotif(error.message)}</div>;

  return (
    <div>
      <FormLayout
        pages={pages}
        formData={formCategories}
        changeHandler={(e) => handleChange(e, setFormData)}
        data={formData}
        itemsSelect={products}
        func={() => createCategory("/categories")}
        scFunc={() => createCategory("/categories/create", true)}
      />
    </div>
  );
};

export default CreateCategory;
