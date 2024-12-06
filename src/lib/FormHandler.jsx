export const handleChange = function handleChange(e, setFormData) {
  setFormData((prevFormData) => {
    return {
      ...prevFormData,
      [e.target.name]: e.target.value,
    };
  });
};

export const oneHandleChange = (e, setInput) => {
  setInput(e.target.value);
};
