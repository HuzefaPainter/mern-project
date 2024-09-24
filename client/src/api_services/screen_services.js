
const { axiosInstance } = require('.');

export const getAllScreensByTheatreId = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/screens/get-all-screens-by-theatre-id/${id}`);
    return response.data;
  } catch (e) {
    throw (new Error(e.message));
  }
};

export const getScreenById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/screens/${id}`);
    return response.data;
  } catch (err) {
    throw (new Error(err.message));
  }
};

export const addScreen = async (value) => {
  try {
    const response = await axiosInstance.post("/api/screens/add-screen", value, {
      validateStatus: function (status) {
        return status < 500;
      }
    });
    if (response.data.success) {
      return response.data;
    } else {
      throw (new Error(response.data.message));
    }
  } catch (e) {
    throw (new Error(e.message));
  }
};

export const updateScreen = async (value) => {
  try {
    const response = await axiosInstance.put("/api/screens/update-screen", value, {
      validateStatus: function (status) {
        return status < 500;
      }
    });
    if (response.data.success) {
      return response.data;
    } else {
      throw (new Error(response.data.message));
    }
  } catch (e) {
    throw (new Error(e.message));
  }
};

export const deleteScreen = async (value) => {
  try {
    const response = await axiosInstance.delete(`/api/screens/delete-screen/${value}`, {
      validateStatus: function (status) {
        return status < 500;
      }
    });
    if (response.data.success) {
      return response.data;
    } else {
      throw (new Error(response.data.message));
    }
  } catch (e) {
    throw (new Error(e.message));
  }
};