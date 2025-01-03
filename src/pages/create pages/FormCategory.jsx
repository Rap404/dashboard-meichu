import React, { useEffect, useState } from "react";
import FormLayout from "../../layouts/FormLayout";
import { baseUrl, formCategories } from "../../Constant";
import { handleChange } from "../../lib/FormHandler";
import axios from "axios";
import { useAuth } from "../../lib/AuthContext";
import { errorNotif, successNotif } from "../../components/text/Notification";
import { useNavigate, useParams } from "react-router-dom";

const FormCategory = () => {
  const { token } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const pages = ["Categories", ">", id ? "Edit" : "Create"];
  const [selectedProducts, setSelectedProducts] = useState([]);
  const initialFormState = {
    name: "",
    products: selectedProducts,
  };
  const [formData, setFormData] = useState(initialFormState);
  const [products, setProducts] = useState({});
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/products`);
      setProducts(response.data.data || []);
      setError(null);
    } catch (error) {
      console.error(error);
      setError(error?.message || "Failed fetch Products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategory = async () => {
    try {
      setLoading(true);
      setSelectedProducts([]);
      const response = await axios.get(`${baseUrl}/categories/${id}`);
      setCategory(response.data.data || []);
      setFormData({
        name: response.data.data.attributes.name,
      });
      response.data.data.attributes.products.data.map((item) =>
        setSelectedProducts((prev) => [...prev, item.id])
      );
      setError(null);
    } catch (error) {
      console.error(error);
      setError(error?.message || "Failed fetch Products");
      setFormData(initialFormState);
      setCategory([]);
    } finally {
      setLoading(false);
    }
  };

  const onMultiChangeHandler = (value) => {
    setSelectedProducts(value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      products: value,
    }));
  };

  const createCategory = async (nav, resetForm = false) => {
    try {
      const categoryData = {
        name: formData.name,
      };

      if (formData.products && formData.products.length > 0) {
        categoryData.products = formData.products;
      }

      const categoryResponse = await axios.post(
        `${baseUrl}/categories`,
        {
          data: categoryData,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("categoryResponse", categoryResponse);

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
            errorNotif("You don't have permissions to create a category");
            break;
          case 401:
            errorNotif("Authentication is failed, please re-login");
            break;
          default:
            errorNotif("Some isues happen while created category");
        }
      }

      setError(error);
    }
  };

  const updateCategory = async (nav) => {
    try {
      const categoryResponse = await axios.put(
        `${baseUrl}/categories/${category.attributes.uuid}`,
        {
          data: {
            name: formData.name,
            products: formData?.products || [],
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      successNotif("Category successfully updated");

      navigate(nav);
    } catch (error) {
      console.error(
        "failed updated category:",
        error.response?.data || error.message,
        "Status:",
        error.response?.status
      );

      if (error.response) {
        switch (error.response.status) {
          case 403:
            errorNotif("You don't have permissions to update a category");
            break;
          case 401:
            errorNotif("Authentication is failed, please re-login");
            break;
          default:
            errorNotif("Some isues happen while updated category");
        }
      }

      setError(error);
      throw error;
    }
  };

  useEffect(() => {
    fetchProducts();
    id ? fetchCategory() : "";
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
        mainFunc={() =>
          id ? updateCategory("/categories") : createCategory("/categories")
        }
        scFunc={() => createCategory("/categories/create", true)}
        isUseButton={id ? false : true}
      />
    </div>
  );
};

export default FormCategory;
