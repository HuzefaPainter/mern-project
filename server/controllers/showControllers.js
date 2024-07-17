const Show = require('../models/ShowModel');

const somethingWentWrong = new Error("Something went wrong, please try again");

const getShow = async (req, res) => {
  try {
    const show = await Show.findById(req.params.id).populate('movie').populate('theatre');
    res.send({
      success: true,
      data: show,
      message: "Fetched show successfully",
    });
  } catch (e) {
    console.log("Error in showControllers: ", e);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error"
    });
  }
}
const addShow = async (req, res) => {
  try {
    const newShow = new Show(req.body);
    const savedShow = await newShow.save();
    if (savedShow) {
      res.send({ success: true, message: "New show added successfully" });
    } else {
      throw (somethingWentWrong);
    }
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

const getAllShowsByMovie = async (req, res) => {
  try {
    const allShows = await Show.find({ movie: req.params.movieId });
    if (allShows) {
      res.send({
        success: true,
        message: "All shows fetched successfully",
        data: allShows
      });
    } else {
      throw (somethingWentWrong);
    }
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

const getAllShowsByTheatre = async (req, res) => {
  try {
    const allShows = await Show.find({ theatre: req.params.theatreId }).populate("movie");
    if (allShows) {
      res.send({
        success: true,
        message: "All shows by theatre fetched successfully",
        data: allShows
      });
    } else {
      throw (somethingWentWrong);
    }
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

const getAllShows = async (req, res) => {
  try {
    const allShows = await Show.find();
    if (allShows) {
      res.send({
        success: true,
        message: "All shows fetched successfully",
        data: allShows
      });
    } else {
      throw (somethingWentWrong);
    }
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

const updateShow = async (req, res) => {
  try {
    const updatedShow = await Show.findByIdAndUpdate(req.body._id, req.body);
    if (updatedShow) {
      res.send({
        success: true,
        message: "Show updated successfully",
        data: updatedShow
      });
    } else {
      throw (somethingWentWrong);
    }
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

const deleteShow = async (req, res) => {
  try {
    const deleted = await Show.findByIdAndDelete(req.params.id);
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
  addShow,
  getShow,
  getAllShows,
  getAllShowsByMovie,
  getAllShowsByTheatre,
  updateShow,
  deleteShow,
};