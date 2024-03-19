import { validateMessage } from "../utility/validate.js";
import { verifyToken } from "../utility/jwt.js";
import User from "../models/userModel.js";

// auth redirect
export const authredirectMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.authToken;
    if (token) {
      const tokenCheck = verifyToken(token);
      if (tokenCheck) {
        const userData = await User.findById(tokenCheck.id);
        if (userData) {
          next();
        } else {
          delete req.session.user;
          res.clearCookie("authToken");
          validateMessage("Token user not found", "/login", req, res);
        }
      } else {
        validateMessage("Invalide Token", "/login", req, res);
      }
    } else {
      validateMessage("Auth token not Found", "/login", req, res);
    }
  } catch (error) {
    delete req.session.user;
    res.clearCookie("authToken");
    validateMessage("bed Error", "/login", req, res);
  }
};
