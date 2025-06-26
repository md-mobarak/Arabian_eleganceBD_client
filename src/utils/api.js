import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:5000/api/v1/product", // 🔹 আপনার API URL দিন
});
 
export const baseUrl = 'https://arabian-elegance-backend.vercel.app/api/v1'


// export const userIdentity = axios.get({
//   baseURL: "http://localhost:5000/api/v1/auth/", // 🔹 আপনার API URL দিন
// });




