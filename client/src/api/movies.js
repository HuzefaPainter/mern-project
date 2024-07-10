
const { axiosInstance } = require('.');

export const getAllMovies = async () => {
  try {
    const response = await axiosInstance.get("api/movies/get-all-movies");
    return response.data;
  } catch (e) {
    console.log("Error:", e);
  }
};

export const addMovie = async (value) => {
  try {
    const response = await axiosInstance.post("api/movies/add-movie", value);
    return response.data;
  } catch (e) {
    console.log("Error:", e);
  }
};

export const updateMovie = async (value) => {
  try {
    const response = await axiosInstance.put("api/movies/update-movie", value);
    return response.data;
  } catch (e) {
    console.log("Error:", e);
  }
};

export const deleteMovie = async (value) => {
  try {
    const response = await axiosInstance.delete(`api/movies/delete-movie/${value}`);
    return response.data;
  } catch (e) {
    console.log("Error:", e);
  }
};