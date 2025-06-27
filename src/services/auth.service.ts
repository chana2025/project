import axios from "axios";

const baseURL = "https://localhost:7091/";

export const login = async (email: string, password: string) => {
  // אם ה-API שלך מקבל FormData - השתמש כך:
  const formData = new FormData();
  formData.append("Email", email);
  formData.append("Password", password);

  const response = await axios.post(baseURL + "api/Login/login", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
