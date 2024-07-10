
const { axiosInstance } = require('.');

export const getAllMovies = async () => {
  try {
    const response = await axiosInstance.get("/api/movies/get-all-movies");
    return response.data;
  } catch (e) {
    console.log("Error:", e);
  }
};

export const addMovie = async (value) => {
  try {
    const response = await axiosInstance.post("/api/movies/add-movie", value, {
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

export const updateMovie = async (value) => {
  try {
    const response = await axiosInstance.put("/api/movies/update-movie", value, {
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

export const deleteMovie = async (value) => {
  try {
    const response = await axiosInstance.delete(`/api/movies/delete-movie/${value}`, {
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