
const Screen = require('../models/ScreenModel');

const somethingWentWrong = new Error("Something went wrong, please try again");

const addScreen = async (req, res) => {
  try {
    const newScreen = new Screen(req.body);
    const savedScreen = await newScreen.save();
    if (savedScreen) {
      res.send({ success: true, message: "New screen added successfully" });
    } else {
      throw (somethingWentWrong);
    }
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

const getScreen = async (req, res) => {
  try {
    const screen = await Screen.findById(req.params.id);
    if (screen) {
      res.send({
        success: true,
        message: "Screen fetched successfully",
        data: screen
      });
    } else {
      throw (somethingWentWrong);
    }
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

const getAllScreensByTheatreId = async (req, res) => {
  try {
    const allScreens = await Screen.find({ theatre: req.params.id });
    if (allScreens) {
      res.send({
        success: true,
        message: "All screens fetched successfully",
        data: allScreens
      });
    } else {
      throw (somethingWentWrong);
    }
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

const updateScreen = async (req, res) => {
  try {
    const updatedScreen = await Screen.findByIdAndUpdate(req.body._id, req.body);
    if (updatedScreen) {
      res.send({
        success: true,
        message: "Screen updated successfully",
        data: updatedScreen
      });
    } else {
      throw (somethingWentWrong);
    }
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

const deleteScreen = async (req, res) => {
  try {
    const deleted = await Screen.findByIdAndDelete(req.params.id);
    if (deleted) {
      res.send({
        success: true,
        message: "Screen deleted successfully"
      });
    } else {
      throw (somethingWentWrong);
    }
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

module.exports = {
  addScreen,
  getAllScreensByTheatreId,
  updateScreen,
  deleteScreen,
  getScreen
};