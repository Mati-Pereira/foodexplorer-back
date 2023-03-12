const ImageKit = require("imagekit");

const imagekit = new ImageKit({
	publicKey: process.env.IMAGE_KIT_PUBLIC,
	privateKey: process.env.IMAGE_KIT_PRIVATE,
	urlEndpoint: process.env.IMAGE_KIT_URL,
});

module.exports = imagekit;
