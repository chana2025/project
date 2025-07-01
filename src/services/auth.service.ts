import axios from "axios";
import { SignupData } from "../types/SignUp.Types";

const baseURL = "https://localhost:7091/";

export const login = async (email: string, password: string) => {
  const formData = new FormData();
  formData.append("Email", email);
  formData.append("Password", password);

  const response = await axios.post(baseURL + "api/Login/login", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const user = response.data;

  // שמירת טוקן במידת הצורך
  if (user.token) {
    localStorage.setItem("token", user.token);
  }

  // שמירת מזהה משתמש לשימוש עתידי בכל הדפים
  if (user.id !== undefined && user.id !== null) {
    localStorage.setItem("userId", user.id.toString());
  } else {
    console.warn("user.id לא נמצא בתגובה מהשרת");
  }

  return user;
};

export const signUp = async (formData: SignupData) => {
  const dataToSend = new FormData();
  dataToSend.append("FullName", formData.fullName);
  dataToSend.append("Email", formData.email);
  dataToSend.append("Phone", formData.phone);
  dataToSend.append("Password", formData.password);
  dataToSend.append("Role", formData.role.toString());
  dataToSend.append("Height", formData.height?.toString() ?? "");
  dataToSend.append("Weight", formData.weight?.toString() ?? "");

  if (formData.fileImage) {
    dataToSend.append("FileImage", formData.fileImage);
  }

  if (formData.likedProductIds) {
    formData.likedProductIds.forEach((id) =>
      dataToSend.append("LikedProductIds", id.toString())
    );
  }

  if (formData.dislikedProductIds) {
    formData.dislikedProductIds.forEach((id) =>
      dataToSend.append("DislikedProductIds", id.toString())
    );
  }

  const response = await axios.post(baseURL + "api/SignUp", dataToSend, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
