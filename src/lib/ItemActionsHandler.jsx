// import axios from "axios";
// import { baseUrl } from "../Constant";
// import { useAuth } from "./AuthContext";

// export const handleMultipleDelete = async (ep, selectedIds, fetch) => {
//   try {
//     const { getToken } = useAuth();
//     const token = getToken();
//     await Promise.all(
//       selectedIds.map((id) => axios.delete(`${baseUrl}/${ep}/${id}`))
//     );

//     fetch();
//   } catch (error) {
//     throw error;
//   }
// };
