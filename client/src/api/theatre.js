const { axiosInstance } = require('.');

export const getAllTheatres = async () => {
  try {
    const response = await axiosInstance.get("/api/theatres/get-all-theatres");
    return response.data;
  } catch (e) {
    console.log("Error:", e);
  }
};

export const getAllTheatresByOwner = async (ownerId) => {
  try {
    const response = await axiosInstance.get(`/api/theatres/get-all-theatres-by-owner/${ownerId}`);
    return response.data;
  } catch (e) {
    console.log("Error:", e);
  }
};

export const addTheatre = async (value) => {
  try {
    const response = await axiosInstance.post("/api/theatres/add-theatre", value, {
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

export const updateTheatre = async (value) => {
  try {
    const response = await axiosInstance.put("/api/theatres/update-theatre", value, {
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

export const deleteTheatre = async (theatreId) => {
  try {
    const response = await axiosInstance.delete(`/api/theatre/delete-theatre/${theatreId}`, {
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