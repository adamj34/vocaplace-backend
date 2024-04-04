import multer from "multer";

// keep the uploaded file in memory without saving it to the disk
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export default upload;
