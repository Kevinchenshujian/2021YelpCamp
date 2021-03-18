const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//one to many: campground
const reviewSchema = new Schema({
  body: String,
  rating: Number,
});

module.exports = mongoose.model("Review", reviewSchema);
