import React, { useEffect, useState } from "react";
import FormLayout from "../../layouts/FormLayout";
import { baseUrl, formProduct } from "../../Constant";
import { handleChange } from "../../lib/FormHandler";
import { v4 as uuidV4 } from "uuid";
import { errorNotif, successNotif } from "../../components/text/Notification";
import axios from "axios";
import { useAuth } from "../../lib/AuthContext";
import { useNavigate } from "react-router-dom";
import { uploadFileTostrapi } from "../../lib/ImageHandler";
import ReactLoading from "react-loading";
import LoadingComponent from "../../components/text/Loading";

const CreateProduct = () => {
  const pages = ["Products", ">", "Create"];
  const { token } = useAuth();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const initialFormState = {
    uuid: uuidV4(),
    name: "",
    category: null,
    thumbnail: null,
    images: [],
    description: "",
    price: "",
    product_link: "",
  };
  const [formData, setFormData] = useState(initialFormState);
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateProducts = async (e, resetForm = false) => {
    e?.preventDefault();
    try {
      setLoading(true);
      const productData = {
        uuid: formData.uuid,
        name: formData.name,
        category: formData.category,
        description: formData.description,
        price: formData.price,
        product_link: formData.product_link,
      };
      let thumbnail_id = null;
      if (
        formData.thumbnail &&
        (formData.thumbnail instanceof File ||
          formData.thumbnail instanceof Blob)
      ) {
        const thumbnailResponse = await uploadFileTostrapi(
          formData.thumbnail,
          token
        );
        // console.log(thumbnailResponse);
        thumbnail_id = thumbnailResponse[0].id;
        productData.thumbnail = thumbnail_id;
      }
      let imageIds = [];
      if (formData.images && Array.isArray(formData.images)) {
        for (let image of formData.images) {
          const imageResponse = await uploadFileTostrapi(image, token);
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
        setFormData(initialFormState);
        setSelectedCategory(null);
      } else {
        navigate("/products");
      }
      successNotif("Products successfully made");
    } catch (error) {
      console.error("error", error.response.data.error.message);

      setError(error.response.data.error.name);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChange = (value) => {
    setSelectedCategory(value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      category: value,
    }));
  };

  if (loading) return <LoadingComponent />;
  if (error)
    return (
      <div className="">{errorNotif(error || "Error uploading product")}</div>
    );

  return (
    <div>
      <FormLayout
        formConstant={formProduct}
        formData={formData}
        setFormData={setFormData}
        pages={pages}
        availableItems={categories}
        changeHandler={(e) => handleChange(e, setFormData, setError)}
        selectValue={selectedCategory}
        onSelectChange={handleSelectChange}
        mainFunc={(e) => handleCreateProducts(e)}
        scFunc={(e) => handleCreateProducts(e, true)}
      />
    </div>
  );
};

export default CreateProduct;
