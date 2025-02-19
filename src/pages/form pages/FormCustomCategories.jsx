import React, { useEffect, useState } from "react";
import FormLayout from "../../layouts/FormLayout";
import LoadingComponent from "../../components/text/Loading";
import { errorNotif, successNotif } from "../../components/text/Notification";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../lib/AuthContext";
import { productsService } from "../../Api/services/productsService";
import { requestsService } from "../../Api/services/requestsService";
import { customCategoryService } from "../../Api/services/customCategoriesService";
import { formCustomCategories } from "../../Constant";
import { handleChange } from "../../lib/FormHandler";

const FormCustomCategories = ({}) => {
  const { token } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const pages = ["Categories", ">", id ? "Edit" : "Create"];
  const initialFormState = {
    name: "",
    isBundle: false,
  };
  const [formData, setFormData] = useState(initialFormState);
  const [requests, setRequests] = useState({});
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // const fetchProducts = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await requestsService.getAllData();
  //     setRequests(response.data);
  //     setError(null);
  //   } catch (error) {
  //     console.error(error);
  //     setError(error?.message || "Failed fetch Products");
  //     setRequests([]);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const data = await customCategoryService.getCategory(id);
      setCategory(data.data);
      setFormData({
        name: data.data.attributes.name,
        isBundle: data.data.attributes.isBundle,
      });
      setRequests(data.data.attributes.requests);
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

  const createCategory = async (nav, resetForm = false) => {
    try {
      const data = {
        name: formData.name,
        isBundle: formData.isBundle,
      };

      const categoryResponse = await customCategoryService.createCategory({
        data,
      });

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
      const data = {
        name: formData.name,
        isBundle: formData.isBundle,
      };
      const categoryResponse = await customCategoryService.updateCategory(id, {
        data,
      });

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
    id ? fetchCategory() : "";
  }, []);

  if (loading) return <LoadingComponent />;
  if (error) return errorNotif(error?.message || error);

  return (
    <div>
      <FormLayout
        formConstant={formCustomCategories}
        formData={formData}
        setFormData={setFormData}
        pages={pages}
        availableItems={requests}
        changeHandler={(e) => handleChange(e, setFormData)}
        multiSelectValue={""}
        onMultiChange={""}
        mainFunc={() =>
          id
            ? updateCategory("/custom-categories")
            : createCategory("/custom-categories")
        }
        scFunc={() => createCategory("/categories/create", true)}
        isUseButton={id ? false : true}
      />
    </div>
  );
};

export default FormCustomCategories;
