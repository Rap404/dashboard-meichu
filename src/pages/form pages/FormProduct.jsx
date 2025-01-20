import React, { useEffect, useState } from "react";
import FormLayout from "../../layouts/FormLayout";
import { baseUrl, formProduct, mediaUrl } from "../../Constant";
import { handleChange } from "../../lib/FormHandler";
import { errorNotif, successNotif } from "../../components/text/Notification";
import axios from "axios";
import { useAuth } from "../../lib/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { uploadFileTostrapi } from "../../lib/ImageHandler";
import LoadingComponent from "../../components/text/Loading";

const FormProduct = () => {
  const { token } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const pages = ["Products", ">", id ? "Edit" : "Create"];
  const [selectedCategories, setSelectedCategories] = useState([]);
  const initialFormState = {
    name: "",
    categories: selectedCategories,
    thumbnail: null,
    images: [],
    description: "",
    price: "",
    product_link: "",
    isBundle: false,
  };
  const [formData, setFormData] = useState(initialFormState);
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log(formData);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/categories`);
      setCategories(response.data.data || []);
      setError(null);
    } catch (error) {
      setError(error.message) || "Failed fetch categories";
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/products/${id}`);
      setFormData({
        name: response.data.data.attributes.name,
        thumbnail:
          response?.data?.data?.attributes?.thumbnail?.data?.attributes?.url ||
          null,
        description: response.data.data.attributes.description,
        price: response.data.data.attributes.price,
        product_link: response.data.data.attributes.product_link,
        isBundle: response.data.data.attributes.isBundle,
        images: [],
        categories: [],
      });
      console.log(response);
      if (response.data.data.attributes.categories) {
        setSelectedCategories([]);
        response.data.data.attributes.categories.data.map((item) =>
          setSelectedCategories((prevData) => [...(prevData || []), item?.id])
        );
        setFormData((prev) => ({
          ...prev,
          categories: [
            ...(prev.categories || []),
            ...response.data.data.attributes.categories.data.map(
              (item) => item?.id
            ),
          ],
        }));
      }
      if (response?.data?.data?.attributes?.images?.data) {
        setFormData((prev) => ({
          ...prev,
          images: [
            ...(prev.images || []),
            ...response.data.data.attributes.images.data.map((item) => item),
          ],
        }));
      }
      setError(null);
    } catch (error) {
      setError(error?.message || "Failed fetch product");
      console.error(error?.message || []);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProducts = async (e, resetForm = false) => {
    e?.preventDefault();
    try {
      setLoading(true);
      const productData = {
        name: formData.name,
        categories: formData.categories,
        description: formData.description,
        price: formData.price,
        product_link: formData.product_link,
        isBundle: formData?.isBundle || null,
      };
      let thumbnail_id = null;
      if (
        formData.thumbnail &&
        (formData.thumbnail instanceof File ||
          formData.thumbnail instanceof Blob)
      ) {
        const thumbnailResponse = await uploadFileTostrapi(
          formData.thumbnail,
          formData.name + " thumbnail",
          token
        );
        thumbnail_id = thumbnailResponse[0].id;
        productData.thumbnail = thumbnail_id;
      }
      let imageIds = [];
      if (formData.images && Array.isArray(formData.images)) {
        for (let image of formData.images) {
          const imageResponse = await uploadFileTostrapi(
            image,
            formData.name,
            token
          );
          imageIds.push(imageResponse[0].id);
        }
        productData.images = imageIds;
      }
      const response = await axios.post(
        `${baseUrl}/products`,
        { data: productData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (resetForm) {
        setSelectedCategories(null);
      } else {
        navigate("/products");
      }
      successNotif("Products successfully made");
    } catch (error) {
      console.error("error", error);

      setError(error?.response?.data?.error?.name);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProducts = async (e) => {
    e?.preventDefault();
    try {
      setLoading(true);
      const productData = {
        name: formData.name,
        categories: formData.categories,
        description: formData.description,
        price: formData.price,
        product_link: formData.product_link,
        isBundle: formData.isBundle,
      };

      console.log("pro", productData);

      let thumbnail_id = null;
      if (
        formData.thumbnail instanceof File ||
        formData.thumbnail instanceof Blob
      ) {
        const thumbnailResponse = await uploadFileTostrapi(
          formData.thumbnail,
          formData.name + " thumbnail",
          token
        );
        console.log(thumbnailResponse);
        thumbnail_id = thumbnailResponse[0].id;
        productData.thumbnail = thumbnail_id;
      }

      if (formData.images && formData.images.length > 0) {
        const processImages = async () => {
          const imagePromises = formData.images.map(async (image) => {
            if (image instanceof File || image instanceof Blob) {
              const response = await uploadFileTostrapi(
                image,
                formData.name,
                token
              );
              return response[0].id;
            } else if (typeof image === "object" && image.id) {
              return image.id;
            }
            return null;
          });

          const imageIds = await Promise.all(imagePromises);
          return imageIds.filter((id) => id !== null);
        };

        productData.images = await processImages();
      } else {
        productData.images = [];
      }

      const response = await axios.put(
        `${baseUrl}/products/${id}`,
        { data: productData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
      successNotif("Product successfully updated");
      navigate("/products");
    } catch (error) {
      console.error("error", error);

      setError(error.response.data.error.name);
    } finally {
      setLoading(false);
    }
  };

  const onMultiChangeHandler = (value) => {
    setSelectedCategories(value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      categories: value,
    }));
  };

  useEffect(() => {
    fetchCategories();
    id ? fetchProducts() : "";
  }, []);

  if (loading) return <LoadingComponent />;
  if (error)
    return (
      <div className="">{errorNotif(error || "Error uploading product")}</div>
    );

  return (
    <div className="h-screen overflow-auto">
      <FormLayout
        formConstant={formProduct}
        formData={formData}
        pages={pages}
        setFormData={setFormData}
        availableItems={categories}
        changeHandler={(e) => handleChange(e, setFormData)}
        multiSelectValue={selectedCategories}
        onMultiChange={onMultiChangeHandler}
        mainFunc={(e) =>
          id ? handleUpdateProducts(e) : handleCreateProducts(e)
        }
        scFunc={(e) => handleCreateProducts(e, true)}
        isUseButton={id ? false : true}
      />
    </div>
  );
};

export default FormProduct;
