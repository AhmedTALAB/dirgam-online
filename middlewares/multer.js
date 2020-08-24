const multer = require("multer");
const path = require("path");
//set storage engine
const storage = multer.diskStorage({
  destination: "./public/img/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
// init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("IMAGES only"));
    }
  },
}).single("link");

module.exports = upload;
