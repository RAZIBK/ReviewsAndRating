const express = require("express");
const { createReviewCtrl, allreviewsCtrl } = require("../../controllers/Review/Review");
const authmidlewarres = require("../../middlewares/authMiddlewares");
const reviewRoutes = express.Router();


reviewRoutes.post('/',createReviewCtrl)
reviewRoutes.get('/',allreviewsCtrl)



module.exports = reviewRoutes;
 