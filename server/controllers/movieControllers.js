const Movie = require('../models/MovieModel');

const somethingWentWrong = new Error("Something went wrong, please try again");
const addMovie = async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    const savedMovie = await newMovie.save();
    if (savedMovie) {
      res.send({ success: true, message: "New movie added successfully" });
    } else {
      throw (somethingWentWrong);
    }
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      res.send({
        success: true,
        message: "Movie fetched successfully",
        data: movie
      });
    } else {
      throw (somethingWentWrong);
    }
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

const getAllMovies = async (req, res) => {
  try {
    console.log("In get all movies");
    const allMovies = await Movie.find();
    if (allMovies) {
      res.send({
        success: true,
        message: "All movies fetched successfully",
        data: allMovies
      });
    } else {
      throw (somethingWentWrong);
    }
  } catch (e) {
    console.log("Error in get all movies");
    res.status(500).json({ success: false, message: e.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(req.body._id, req.body);
    if (updatedMovie) {
      res.send({
        success: true,
        message: "Movie updated successfully",
        data: updatedMovie
      });
    } else {
      throw (somethingWentWrong);
    }
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const deleted = await Movie.findByIdAndDelete(req.params.id);
    if (deleted) {
      res.send({
        success: true,
        message: "Movie deleted successfully"
      });
    } else {
      throw (somethingWentWrong);
    }
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

module.exports = {
  addMovie,
  getAllMovies,
  updateMovie,
  deleteMovie,
  getMovieById
};