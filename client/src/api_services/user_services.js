const { axiosInstance } = require('.');

export const RegisterUser = async (value) => {
  try {
    const response = await axiosInstance.post("/api/users/register", value);
    return response.data;
  } catch (e) {
    console.log("Error:", e);
  }
};

export const LoginUser = async (value) => {
  try {
    //TODO: Hash password before sending it off
    const response = await axiosInstance.post("/api/users/login", value);
    return response.data;
  } catch (e) {
    console.log("Error:", e);
  }
};

export const GetCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("/api/users/get-current-user");
    return response.data;
  } catch (e) {
    console.log("Error:", e);
  }
};