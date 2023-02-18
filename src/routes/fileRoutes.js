const express = require('express');
const {uploadUser} = require('../controllers/fileController');
const fileRouter = express.Router();
const auth = require("../middleware/auth");

fileRouter.post("/upload",auth,uploadUser);

module.exports = fileRouter