const express = require("express");
const {createBooking, getPage} = require("../Controller/bookingController");
const {protectRoute} = require("../Controller/userController");
const bookingRouter = express.Router();

bookingRouter.route("/createSession").post(protectRoute,createBooking)
.get(getPage);

module.exports = bookingRouter;

