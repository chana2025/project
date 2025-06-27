import axios from "./axios";

export const getCustomerById = async (id: number) => {
  const response = await axios.get(`/api/Customer/${id}`);
  return response.data;
};