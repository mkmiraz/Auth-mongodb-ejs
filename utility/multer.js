import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname == "profile_image") {
      cb(null, "./public/images/profile");
    }

    if (file.fieldname == "gallery") {
      cb(null, "./public/images/gallery");
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

export const profileimageUpdate = multer({ storage }).single("profile_image");

export const galleryImgUpdate = multer({ storage }).array("gallery", 10);
