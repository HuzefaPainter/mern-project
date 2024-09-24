const Show = require('../models/ShowModel');
const Theatre = require('../models/TheatreModel');

const somethingWentWrong = new Error("Something went wrong, please try again");

const addTheatre = async (req, res) => {
  try {
    const newTheatre = new Theatre(req.body);
    const savedTheatre = await newTheatre.save();
    if (savedTheatre) {
      res.send({ success: true, message: "New theatre added successfully" });
    } else {
      throw (somethingWentWrong);
    }
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

const getAllTheatres = async (req, res) => {
  try {
    const allTheatres = await Theatre.find();
    if (allTheatres) {
      res.send({
        success: true,
        message: "All theatres fetched successfully",
        data: allTheatres
      });
    } else {
      throw (somethingWentWrong);
    }
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

const getTheatre = async (req, res) => {
  try {
    const theatre = await Theatre.findById(req.params.id);
    if (theatre) {
      res.send({
        success: true,
        message: "Theatre fetched successfully",
        data: theatre
      });
    } else {
      throw (somethingWentWrong);
    }
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

const getAllTheatresByOwner = async (req, res) => {
  try {
    const allTheatres = await Theatre.find({ owner: req.params.id });
    if (allTheatres) {
      res.send({
        success: true,
        message: "All theatres fetched successfully",
        data: allTheatres
      });
    } else {
      throw (somethingWentWrong);
    }
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

const getAllTheatresByMovie = async (req, res) => {
  try {
    const { movie, date } = req.body;
    const allShowsByMovie = await Show.find({ movie, date }).populate('theatre');

    const theatreSet = new Set();
    let allTheatres = [];
    for (const show of allShowsByMovie) {
      if (!theatreSet.has(show.theatre._id)) {
        const showsInThisTheatre = allShowsByMovie.filter((showToFilter) => showToFilter.theatre._id === show.theatre._id);
        theatreSet.add(show.theatre._id);
        allTheatres.push({ theatre: show.theatre, shows: showsInThisTheatre });
      }
    }

    console.log("Returning theatres", allTheatres);
    if (allTheatres) {
      res.send({
        success: true,
        message: "All theatres fetched successfully",
        data: allTheatres
      });
    } else {
      throw (somethingWentWrong);
    }
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

const updateTheatre = async (req, res) => {
  try {
    const updatedTheatre = await Theatre.findByIdAndUpdate(req.body._id, req.body);
    if (updatedTheatre) {
      res.send({
        success: true,
        message: "Theatre updated successfully",
        data: updatedTheatre
      });
    } else {
      throw (somethingWentWrong);
    }
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

const deleteTheatre = async (req, res) => {
  try {
    const deleted = await Theatre.findByIdAndDelete(req.params.id);
    if (deleted) {
      res.send({
        success: true,
        message: "Theatre deleted successfully"
      });
    } else {
      throw (somethingWentWrong);
    }
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

module.exports = {
  addTheatre,
  getAllTheatres,
  getTheatre,
  getAllTheatresByOwner,
  getAllTheatresByMovie,
  updateTheatre,
  deleteTheatre
};