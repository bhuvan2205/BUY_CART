import { Router } from "express";
import multer from "multer";
import path from "path";

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 100);
    cb(null, file?.fieldname + "-" + uniqueSuffix);
  },
});

function fileFilter(req, file, cb) {
  const filetypes = /jpe?g|png|webp/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only");
  }
}

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");

router.post("/", (req, res) => {
  uploadSingleImage(req, res, function (err) {
    if (err) {
      return res.status(400).send({ message: err?.message });
    }

    res.status(200).send({
      message: "Image uploaded successfully",
      image: `/${req?.file?.path}`,
    });
  });
});

export default router;
