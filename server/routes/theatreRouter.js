const theatreRouter = require('express').Router();
const {
  addTheatre,
  getAllTheatres,
  getAllTheatresByOwner,
  updateTheatre,
  deleteTheatre,
} = require("../controllers/theatreControllers");
const { auth, adminAuth, partnerAuth } = require('../middlewares/authMiddlewares');

theatreRouter.post('/add-theatre', partnerAuth, addTheatre);
theatreRouter.get('/get-all-theatres', auth, getAllTheatres);
theatreRouter.get('/get-all-theatres-by-owner/:id', partnerAuth, getAllTheatresByOwner);
theatreRouter.put('/update-theatre', partnerAuth, updateTheatre);
theatreRouter.delete('/delete-theatre/:id', partnerAuth, deleteTheatre);

module.exports = theatreRouter;