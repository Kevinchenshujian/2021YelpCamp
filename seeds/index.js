const mongoose = require("mongoose");
const Campground = require("../models/campground"); //two points means back to last folder
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const ran1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 30 + 10);
    const camp = new Campground({
      location: `${cities[ran1000].city}, ${cities[ran1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: "https://source.unsplash.com/collection/483251",
      description: "WHAT is your favorite place?",
      price, //price:price
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
