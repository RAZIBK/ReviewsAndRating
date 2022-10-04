const expressAsyncHandler = require("express-async-handler");
const Review = require("../../model/Review/Review");

const createReviewCtrl = expressAsyncHandler(async (req, res) => {
  const { userId, review, rating } = req.body;
  console.log(req.body);
  try {
    const newReview = await Review.create({
      review: review,
      rating: rating,
    });
    console.log(newReview);
    res.json(newReview);
  } catch (error) {
    res.json(error);
  }
});

const allreviewsCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const newReview = await Review.find({}).sort("-createdAt");
    res.json(newReview);
  } catch (error) {
    res.json(error);
  }
});

module.exports = {
  createReviewCtrl,
  allreviewsCtrl,
};
