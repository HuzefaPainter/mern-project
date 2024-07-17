const { axiosInstance } = require('.');

export const getAllShows = async () => {
  try {
    const response = await axiosInstance.get("/api/shows/get-all-shows");
    return response.data;
  } catch (e) {
    console.log("Error:", e);
  }
};

export const getShow = async (showId) => {
  try {
    const response = await axiosInstance.get(`/api/shows/get-show/${showId}`);
    return response.data;
  } catch (e) {
    console.log("Error:", e);
  }
};
export const getAllShowsByMovie = async (movieId) => {
  try {
    const response = await axiosInstance.get(`/api/shows/get-all-shows-by-movie/${movieId}`);
    return response.data;
  } catch (e) {
    console.log("Error:", e);
  }
};

export const getAllShowsByTheatre = async (theatreId) => {
  try {
    const response = await axiosInstance.get(`/api/shows/get-all-shows-by-theatre/${theatreId}`);
    return response.data;
  } catch (e) {
    console.log("Error:", e);
  }
};

export const addShow = async (value) => {
  try {
    const response = await axiosInstance.post("/api/shows/add-show", value, {
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

export const updateShow = async (value) => {
  try {
    const response = await axiosInstance.put("/api/shows/update-show", value, {
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

export const deleteShow = async (showId) => {
  try {
    const response = await axiosInstance.delete(`/api/shows/delete-show/${showId}`, {
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