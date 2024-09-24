const theatreRouter = require('express').Router();
const {
  addTheatre,
  getAllTheatres,
  getTheatre,
  getAllTheatresByOwner,
  getAllTheatresByMovie,
  updateTheatre,
  deleteTheatre,
} = require("../controllers/theatreControllers");
const { auth, adminAuth, partnerAuth } = require('../middlewares/authMiddlewares');

theatreRouter.post('/add-theatre', partnerAuth, addTheatre);
theatreRouter.get('/get-all-theatres', auth, getAllTheatres);
theatreRouter.get('/:id', auth, getTheatre);
theatreRouter.get('/get-all-theatres-by-owner/:id', partnerAuth, getAllTheatresByOwner);
theatreRouter.post('/get-all-theatres-by-movie', auth, getAllTheatresByMovie);
theatreRouter.put('/update-theatre', partnerAuth, updateTheatre);
theatreRouter.delete('/delete-theatre/:id', partnerAuth, deleteTheatre);

module.exports = theatreRouter;