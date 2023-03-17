const fs = require("fs");
const path = require("path");
const uploadConfig = require("../configs/upload");

class DiskStorage {
	async saveFile(file) {
		try {
			await fs.promises.rename(
				path.resolve(uploadConfig.TMP_FOLDER, file),
				path.resolve(uploadConfig.UPLOADS_FOLDER, file),
			);
			return file;
		} catch (error) {
			throw new Error(error.message);
		}
	}
}

module.exports = new DiskStorage();
