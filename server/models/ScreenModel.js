
const mongoose = require('mongoose');

const screenSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  theatre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "theatres",
    required: true,
  },
  noOfRows: {
    type: Number,
    required: true,
  },
  noOfColumns: {
    type: Number,
    required: true,
  },
  seatingStructure: {
    type: Array,
    default: [],
    required: true
  },
  sections: {
    type: Array,
    default: [],
    required: true
  },
  leftToRightNumbering: {
    type: Boolean,
    required: true,
  },
  topToBottomNumbering: {
    type: Boolean,
    required: true,
  },
}, {
  timestamps: true
});

const Screen = mongoose.model("screens", screenSchema);
module.exports = Screen;