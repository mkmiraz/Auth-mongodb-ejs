import { validateMessage } from "../utility/validate.js";

// auth redirect
export const authMiddleware = (req, res, next) => {
  const token = req.cookies.authToken;
  if (token) {
    validateMessage("", "/", req, res);
  } else {
    next();
  }
};
