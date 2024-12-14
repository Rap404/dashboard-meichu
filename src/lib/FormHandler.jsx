export const handleChange = (e, setFormData, setError) => {
  const { type, value, name } = e.target;

  if (type === "number") {
    if (/^\d*$/.test(value)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
      // Hapus error jika input valid
      setError((prevError) => ({
        ...prevError,
        [name]: "",
      }));
    } else {
      // Set error jika input tidak valid
      setError((prevError) => ({
        ...prevError,
        [name]: "Hanya angka yang diperbolehkan",
      }));
    }
  } else {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }
};

export const oneHandleChange = (e, setInput) => {
  setInput(e.target.value);
};
