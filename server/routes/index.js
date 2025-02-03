const express = require("express");
const router = express.Router();

const registerUser = require("../controllers/registerUser.js");
const checkEmail = require("../controllers/checkEmail.js");
const checkPassword = require("../controllers/checkPassword.js");
const userDetails = require("../controllers/userDetails.js");
const addCase = require("../controllers/addCase.js");
const addHearing = require("../controllers/addHearing.js");
const statusUpdate = require("../controllers/statusUpdate.js");

//user registering
router.post("/register", registerUser);

//email confirming
router.post("/email", checkEmail);

//password checking ,creating cookie
router.post("/password", checkPassword);

//give user details
router.get("/user-details", userDetails);

//add case
router.post("/add-case", addCase);

//add hearing
router.post("/add-hearing", addHearing);

//update status
router.post("/status-update", statusUpdate);

module.exports = router;
