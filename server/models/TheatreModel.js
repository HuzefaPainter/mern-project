const mongoose = require('mongoose');

const theatreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isActive: {
    type: Boolean,
    required: false,
  },
}, {
  timestamps: true
});

const Theatre = mongoose.model("theatres", theatreSchema);
module.exports = Theatre;