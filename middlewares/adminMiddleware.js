const userModel = require("../models/userModel");

module.exports = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.body.id);

    if (user.userType !== "admin") {
      res.status(401).send({
        success: false,
        message: "Access Denied!",
      });
    } else {
      next();
    }
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Unauthorized access", error });
  }
};
