const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authentication.split(" ")[1];
    let decode = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decode;
    next();
  } catch (error) {
    console.log("Error", error);
    return res.status(401).json({
      message: `Authentication failed - ${error.message}`,
      success: false,
    });
  }
};
