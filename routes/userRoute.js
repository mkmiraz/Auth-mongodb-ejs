import express from "express";
import {
  loginPage,
  loginUser,
  profilePage,
  registerPage,
  registerUser,
  logoutUser,
  userAccountActivation,
  profileChangePage,
  passwordChangePage,
  profileInfoChangePage,
  profileUpload,
  galleryPage,
  galleryPhotoupload,
  findFriendsPage,
  singleUserProfile,
  followUser,
  unFollowUser,
} from "../controllers/userController.js";
import { authredirectMiddleware } from "../middlewares/authRedirectMiddlewares.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { galleryImgUpdate, profileimageUpdate } from "../utility/multer.js";

const router = express.Router();

// page show router
router.get("/", authredirectMiddleware, profilePage);
router.get("/edit-info", authredirectMiddleware, profileInfoChangePage);
router.get("/change-password", authredirectMiddleware, passwordChangePage);
router.get("/update-profile", authredirectMiddleware, profileChangePage);
router.get("/update-gallery", authredirectMiddleware, galleryPage);
router.get("/find-friends", authredirectMiddleware, findFriendsPage);
router.get("/follow/:id", authredirectMiddleware, followUser);
router.get("/unfollow/:id", authredirectMiddleware, unFollowUser);

router.get("/login", authMiddleware, loginPage);
router.get("/register", authMiddleware, registerPage);

// other
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/activate/:token", userAccountActivation);
// profile photo upload
router.post("/update-profile", profileimageUpdate, profileUpload);

// gallery photo upload
router.post("/update-gallery", galleryImgUpdate, galleryPhotoupload);
router.get("/:id", authredirectMiddleware, singleUserProfile);
// export defaulr
export default router;
