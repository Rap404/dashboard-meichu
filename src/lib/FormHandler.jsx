export const handleChange = (e, setFormData) => {
  const { type, value, name } = e.target;
  setFormData((prevFormData) => ({
    ...prevFormData,
    [name]: value,
  }));
};

export const oneHandleChange = (e, setInput) => {
  setInput(e.target.value);
};

// export const handleSelectChange = (value) => {
//   setSelectedCategory(value);
//   setFormData((prevFormData) => ({
//     ...prevFormData,
//     category: value,
//   }));
// };
