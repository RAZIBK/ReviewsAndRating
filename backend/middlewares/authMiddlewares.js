const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../model/User/User");

const authmidlewarres = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split("Bearer ")[1];
      console.log(req.headers);
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findById(decoded?.id).select("-password");
        req.user = user;
        console.log(user);
        next();
      }
    } catch (error) {
      throw new Error("not authorizied token expired, login again");
    }
  } else {
    throw new Error("There is no token attached to the header");
  }
});

module.exports = authmidlewarres;