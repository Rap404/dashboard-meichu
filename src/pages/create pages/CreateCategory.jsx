import React, { useEffect, useState } from "react";
import FormLayout from "../../layouts/FormLayout";
import { baseUrl, formCategories } from "../../Constant";
import { handleChange } from "../../lib/FormHandler";
import axios from "axios";
import { useAuth } from "../../lib/AuthContext";
import { errorNotif, successNotif } from "../../components/text/Notification";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const CreateCategory = () => {
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const pages = ["Categories", ">", "Create"];
  const [selectedProducts, setSelectedProducts] = useState([]);
  const initialFormState = {
    uuid: uuidv4(),
    name: "",
    products: selectedProducts,
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
      console.error(error);
      setError(error.message) || "Failed fetch Products";
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  console.log(formData);

  const onMultiChangeHandler = (value) => {
    setSelectedProducts(value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      products: value,
    }));
  };

  const createCategory = async (nav, resetForm = false) => {
    try {
      const categoryResponse = await axios.post(
        `${baseUrl}/categories`,
        {
          data: {
            name: formData.name,
            uuid: formData.uuid,
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

      if (resetForm) {
        setFormData(initialFormState);
      } else {
        navigate(nav);
      }
    } catch (error) {
      console.error(
        "Gagal membuat kategori:",
        error.response?.data || error.message,
        "Status:",
        error.response?.status
      );

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
      throw error;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <div className="">load...</div>;
  if (loading)
    return <div className="">{errorNotif(error?.message || error)}</div>;

  return (
    <div>
      <FormLayout
        formConstant={formCategories}
        formData={formData}
        pages={pages}
        availableItems={products}
        changeHandler={(e) => handleChange(e, setFormData)}
        multiSelectValue={selectedProducts}
        onMultiChange={onMultiChangeHandler}
        mainFunc={() => createCategory("/categories")}
        scFunc={() => createCategory("/categories/create", true)}
      />
    </div>
  );
};

export default CreateCategory;
