const showRouter = require('express').Router();
const {
  addShow,
  getShow,
  getAllShows,
  getAllShowsByTheatre,
  getAllShowsByMovie,
  updateShow,
  deleteShow,
} = require("../controllers/showControllers");
const { auth, partnerAuth } = require('../middlewares/authMiddlewares');

showRouter.post('/add-show', partnerAuth, addShow);
showRouter.get('/get-show/:id', partnerAuth, getShow);
showRouter.get('/get-all-shows', auth, getAllShows);
showRouter.get('/get-all-shows-by-theatre/:theatreId', auth, getAllShowsByTheatre);
showRouter.get('/get-all-shows-by-movie/:movieId', auth, getAllShowsByMovie);
showRouter.put('/update-show', partnerAuth, updateShow);
showRouter.delete('/delete-show/:id', partnerAuth, deleteShow);

module.exports = showRouter;