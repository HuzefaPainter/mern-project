const { axiosInstance } = require('.');

export const RegisterUser = async (value) => {
  try {
    const response = await axiosInstance.post("api/users/register", value);
    return response.data;
  } catch (e) {
    console.log("Error:", e);
  }
};

export const LoginUser = async (value) => {
  try {
    const response = await axiosInstance.post("api/users/login", value);
    return response.data;
  } catch (e) {
    console.log("Error:", e);
  }
};

export const GetCurrentUser = async (value) => {
  try {
    console.log("Bearer token in get user:", localStorage.getItem("jwtToken"));
    const response = await axiosInstance.get("api/users/get-current-user");
    return response.data;
  } catch (e) {
    console.log("Error:", e);
  }
};