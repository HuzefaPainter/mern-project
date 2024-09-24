
const screenRouter = require('express').Router();
const {
  addScreen,
  getAllScreensByTheatreId,
  updateScreen,
  deleteScreen, getScreen,
} = require("../controllers/screenControllers");
const { auth, adminAuth } = require('../middlewares/authMiddlewares');

screenRouter.post('/add-screen', adminAuth, addScreen);
screenRouter.get('/get-all-screens-by-theatre-id/:id', auth, getAllScreensByTheatreId);
screenRouter.get('/:id', auth, getScreen);
screenRouter.put('/update-screen', adminAuth, updateScreen);
screenRouter.delete('/delete-screen/:id', adminAuth, deleteScreen);

module.exports = screenRouter;