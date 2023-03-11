const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config();

cloudinary.config({
	cloud_name: "di7ef5lns",
	api_key: "572558339868145",
	api_secret: "KA4g4XY_WR0YNdN3eP7qy9wavMA",
});

module.exports = cloudinary;
