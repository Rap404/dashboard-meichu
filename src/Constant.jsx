export const baseUrl = import.meta.env.VITE_BASE_URL;
export const mediaUrl = import.meta.env.VITE_MEDIA_URL;

export const formFieldLogin = [
  {
    id: "identfier",
    name: "identifier",
    type: "identifier",
    placeholder: "Enter your email or username",
    label: "Email address",
  },
  {
    id: "password",
    name: "password",
    type: "password",
    placeholder: "Enter your Password",
    label: "Password",
  },
];

export const formForgotPassword = [
  {
    id: "email",
    name: "email",
    type: "email",
    placeholder: "Enter your email",
    label: "Email",
  },
];

export const formResetPassword = [
  {
    id: "password",
    name: "password",
    type: "password",
    placeholder: "Enter your new password",
    label: "New password",
  },
];

export const formCategories = [
  {
    id: "name",
    name: "name",
    type: "text",
    required: true,
    placeholder: "Enter category name",
    label: "Category name",
  },
  {
    id: "products",
    name: "products",
    type: "multiselect",
    placeholder: "Select the products",
    label: "Select products",
  },
];

export const formProduct = [
  {
    id: "name",
    name: "name",
    type: "text",
    placeholder: "Enter product name",
    required: true,
    label: "Product name",
  },
  {
    id: "categories",
    name: "categories",
    type: "multiselect",
    placeholder: "Select product categories",
    label: "Product categories",
  },
  {
    id: "thumbnail",
    name: "thumbnail",
    type: "file",
    label: "Product Thumbnail",
    required: true,
    preset: "portrait",
  },
  {
    id: "images",
    name: "images",
    type: "files",
    label: "Product images",
    required: true,
    preset: "square",
  },
  {
    id: "description",
    name: "description",
    type: "textArea",
    placeholder: "Enter product description",
    required: true,
    label: "Product description",
  },
  {
    id: "price",
    name: "price",
    type: "price",
    placeholder: "Enter product price",
    required: true,
    label: "Product price",
  },
  {
    id: "product_link",
    name: "product_link",
    type: "text",
    placeholder: "Enter product link",
    required: true,
    label: "Product link",
  },
];

export const formAmbassador = [
  {
    id: "name",
    name: "name",
    type: "text",
    placeholder: "Enter ambassador name",
    required: true,
    label: "Ambassador name",
  },
  {
    id: "image",
    name: "image",
    type: "file",
    label: "Ambassador image",
    preset: "portrait",
  },
  {
    id: "description",
    name: "description",
    type: "textArea",
    required: true,
    label: "Ambassador description",
  },
  {
    id: "twitter",
    name: "twitter",
    type: "text",
    label: "Ambassador twitter link ",
    placeholder: "Add ambassador twitter link",
  },
  {
    id: "instagram",
    name: "instagram",
    type: "text",
    label: "Ambassador instagram link",
    placeholder: "Add ambassador instagram link",
  },
  {
    id: "youtube",
    name: "youtube",
    type: "text",
    label: "Ambassador youtube link",
    placeholder: "Add ambassador youtube link",
  },
  {
    id: "tiktok",
    name: "tiktok",
    type: "text",
    label: "Ambassador tiktok link",
    placeholder: "Add ambassador tiktok link",
  },
];

export const formEvent = [
  {
    id: "name",
    name: "name",
    type: "text",
    placeholder: "Enter event name",
    required: true,
    label: "Event name",
  },
  {
    id: "event_link",
    name: "event_link",
    type: "text",
    placeholder: "Enter event link",
    required: true,
    label: "Event link",
  },
  {
    id: "image_cover",
    name: "image_cover",
    type: "file",
    placeholder: "Enter image cover",
    label: "Image cover",
  },
  {
    id: "description",
    name: "description",
    type: "textArea",
    placeholder: "Enter event description",
    required: true,
    label: "Event description",
  },
  {
    id: "start_date",
    name: "start_date",
    type: "date",
    placeholder: "Enter event start date",
    required: true,
    label: "Event start date",
  },
  {
    id: "end_date",
    name: "end_date",
    type: "date",
    placeholder: "Enter event end date",
    required: true,
    label: "Event end date",
  },
];

export const adminProfileForm = [
  {
    id: "image",
    name: "image",
    type: "profile",
    placeholder: "Enter image profile",
    label: "Image profile",
    preset: "profile",
  },
  {
    id: "username",
    name: "username",
    type: "text",
    placeholder: "Enter your username",
    label: "Username",
  },
  {
    id: "email",
    name: "email",
    type: "text",
    label: "Email",
    disabled: true,
  },
  {
    id: "createdAt",
    name: "createdAt",
    type: "text",
    label: "Joined date",
    disabled: true,
  },
];

// export const detailRequest = [{}];
