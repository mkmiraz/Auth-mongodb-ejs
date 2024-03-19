// validate message
export const validateMessage = (msg, redirect, req, res) => {
  req.session.message = msg;
  res.redirect(redirect);
};
