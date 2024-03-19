import User from "../models/userModel.js";
import { createToken, verifyToken } from "../utility/jwt.js";
import { accountActivationMail } from "../utility/mail.js";
import { makeHash } from "../utility/makeHash.js";
import { validateMessage } from "../utility/validate.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * Profile Page Show
 * @param {*} req
 * @param {*} res
 */
export const profilePage = (req, res) => {
  res.render("profile");
};
/**
 * Log Ine Page Show
 * @param {*} req
 * @param {*} res
 */
export const loginPage = (req, res) => {
  res.render("login");
};
/**
 * Register Page Show
 * @param {*} req
 * @param {*} res
 */
export const registerPage = (req, res) => {
  res.render("register");
};

/**
 * Profile Change Page Show
 * @param {*} req
 * @param {*} res
 */

export const profileChangePage = (req, res) => {
  res.render("profileChange");
};

/**
 * password Change Page Show
 * @param {*} req
 * @param {*} res
 */

export const passwordChangePage = (req, res) => {
  res.render("passwordChange");
};

/**
 * profile info Change Page Show
 * @param {*} req
 * @param {*} res
 */

export const profileInfoChangePage = (req, res) => {
  res.render("infoChange");
};

export const galleryPage = (req, res) => {
  res.render("gallery");
};

/*************************************************************************************************************** */

/**
 *  user Register
 *
 */

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // validation
    if (!name || !email || !password) {
      validateMessage("All fields are required", "/register", req, res);
    } else {
      // Email Chech
      const user = await User.findOne({ email });

      if (user) {
        validateMessage("Email already  existse", "/register", req, res);
      } else {
        const createUser = await User.create({
          name,
          email,
          password: makeHash(password),
        });
        const token = createToken(
          { id: createUser._id },
          1000 * 60 * 60 * 24 * 3
        );
        const activation_link = `${process.env.APP_URL}/activate/${token}`;
        accountActivationMail(email, "Active your Account", {
          name: name,
          link: activation_link,
        });
        validateMessage("user register successfull", "/login", req, res);
      }
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    return validateMessage("Something went wrong", "/register", req, res);
  }
};

/**
 *  logIN USER
 *
 */
//
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      validateMessage("All fields are required", "/login", req, res);
    } else {
      const loginUser = await User.findOne().where("email").equals(email);
      if (!loginUser) {
        validateMessage("Email Not Found", "/login", req, res);
      } else {
        if (!loginUser.isActivate) {
          validateMessage("Please Activate account", "/login", req, res);
        } else {
          const userPass = bcrypt.compareSync(password, loginUser.password);
          if (!userPass) {
            validateMessage("Wrong Password", "/login", req, res);
          } else {
            const token = createToken(
              { id: loginUser._id },
              1000 * 60 * 60 * 24 * 365
            );
            res.cookie("authToken", token);
            req.session.user = loginUser;
            validateMessage("Login successfull", "/", req, res);
          }
        }
      }
    }
  } catch (error) {
    validateMessage(error.message, "/login", req, res);
  }
};
/**
 *  logoutUser
 *
 */
//
export const logoutUser = (req, res) => {
  delete req.session.user;
  res.clearCookie("authToken");
  validateMessage("Logout Successful", "/login", req, res);
};

/**
 * USER ACCOUNT SCTIVATION
 */
export const userAccountActivation = async (req, res) => {
  try {
    const { token } = req.params;
    const tokenVerify = verifyToken(token);

    if (!tokenVerify) {
      validateMessage("Invalid activation link", "/login", req, res);
    } else {
      const activationUser = await User.findOne({ _id: tokenVerify.id });

      if (activationUser.isActivate) {
        validateMessage("Account alredy activate", "/login", req, res);
      } else {
        await User.findByIdAndUpdate(tokenVerify.id, {
          isActivate: true,
        });
        validateMessage(
          "Your Account activation successfull",
          "/login",
          req,
          res
        );
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};
/***
 * user profile upload
 */
export const profileUpload = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.session.user._id, {
      photo: req.file.filename,
    });
    req.session.user.photo = req.file.filename;
    validateMessage("profile Upload Successful", "/", req, res);
  } catch (error) {
    validateMessage(error.message, "/login", req, res);
  }
};

/**
 * gallery photo upload
 */
export const galleryPhotoupload = async (req, res) => {
  try {
    // for (let i = 0; i < req.files.length; i++) {
    //   await User.findByIdAndUpdate(req.session.user._id, {
    //     $push: { gallery: req.files[i].filename },
    //   });
    // }
    let file_arr = [];
    req.files.forEach((img) => {
      file_arr.push(img.filename);
      req.session.user.gallery.push(img.filename);
    });
    await User.findByIdAndUpdate(req.session.user._id, {
      $push: {
        gallery: { $each: file_arr },
      },
    });
    validateMessage("gallery photo Upload successful", "/", req, res);
  } catch (error) {
    validateMessage(error.message, "/update-gallery", req, res);
  }
};
/**
 * Find Friends Show
 * @param {*} req
 * @param {*} res
 */
export const findFriendsPage = async (req, res) => {
  try {
    const friends = await User.find().where("_id").ne(req.session.user._id);
    res.render("findFrinds", {
      friends,
    });
  } catch (error) {}
};

/**
 * Single User Profile
 */
export const singleUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await User.findById(id);
    res.render("userProfile", {
      profile,
    });
  } catch (error) {
    console.log(error.message);
  }
};
/**
 * following user
 */
export const followUser = async (req, res) => {
  try {
    const { id } = req.params;
    const follow = await User.findByIdAndUpdate(req.session.user._id, {
      $push: {
        following: id,
      },
    });

    await User.findByIdAndUpdate(id, {
      $push: {
        follower: req.session.user._id,
      },
    });

    req.session.user.following.push(id);
    validateMessage("following Successful", "/find-friends", req, res);
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * unFollowUser
 */
export const unFollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const unfollow = await User.findByIdAndUpdate(req.session.user._id, {
      $pull: {
        following: id,
      },
    });
    await User.findByIdAndUpdate(id, {
      $pull: {
        follower: req.session.user._id,
      },
    });

    let unfollow_list = req.session.user.following.filter((data) => data != id);
    req.session.user.following = unfollow_list;
    validateMessage("following Successful", "/find-friends", req, res);
  } catch (error) {
    console.log(error.message);
  }
};
