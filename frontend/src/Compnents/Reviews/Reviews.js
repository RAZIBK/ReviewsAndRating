import React, { useEffect, useState } from "react";
import AddReview from "./AddReview";
import ListReviews from "./ListReviews";
import StarRating from "./StarRating";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllReviewAction } from "../../redux/slices/review/reviewSlice";
import { percentge } from "./percentage";

// import ProgressBar from "./progress-bar.component";

export default function Reviews() {
  const dispatch = useDispatch();

  const state = useSelector((state) => state?.review);
  const { reviewCreated, allreview, isCreated } = state;

  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    dispatch(fetchAllReviewAction());
  }, [isCreated]);

  let sum = 0;
  const val = allreview?.forEach((element) => {
    sum += element.rating;
  });
  const value = sum / allreview?.length;

  return (
    <div className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
        <div>
          <div className="flex justify-between mb-4">
            <div className="font-bold">Reviews and Rating</div>
            <div className="flex">
              <div
                onClick={() => setShowModal(true)}
                type="button"
                className=" mr-5 hover:bg-gray-100 block px-4 py-1 text-sm text-cyan-500 overflow-auto rounded border-2 border-cyan-400"
              >
                Write a Review
              </div>
              <AddReview
                visible={showModal}
                onClose={() => setShowModal(false)}
              />
              <div
                type="button "
                className="flex mr-5 hover:bg-gray-100 block px-4 py-1 text-sm text-gray-700 overflow-auto rounded border-2 border-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="mr-1 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                  />
                </svg>
                <p>{allreview?.length} Review</p>
              </div>
            </div>
          </div>

          <div className="flex mb-10">
            <div className="border-r-2 border-gray-400 mr-16 pr-8 ">
              <h2 className="text-center">Overall</h2>
              {value?
            (  <h1 className="text-center text-2xl font-bold mt-4 mb-4">
                {Math.round(value * 10) / 10}
              </h1>):  <h1 className="text-center text-2xl font-bold mt-4 mb-4">
                0
              </h1>
              }

              <div className="">
                <StarRating value={value} />
              </div>
            </div>
            <div className="w-96">
              <div class="w-full  rounded-full h-2.5 dark:bg-gray-700">
                <div className="flex">
                  <p className="mr-2">5</p>
                  <div
                    class="bg-yellow-500 h-2.5 rounded-full mt-2"
                    style={{ width: percentge(allreview, 5) }}
                  ></div>
                </div>
                <div className="flex">
                  <p className="mr-2">4</p>
                  <div
                    class="bg-yellow-500 h-2.5 rounded-full mt-2"
                    style={{ width: percentge(allreview, 4) }}
                  ></div>
                </div>
                <div className="flex">
                  <p className="mr-2">3</p>
                  <div
                    class="bg-yellow-500 h-2.5 rounded-full mt-2"
                    style={{ width: percentge(allreview, 3) }}
                  ></div>
                </div>
                <div className="flex">
                  <p className="mr-2">2</p>
                  <div
                    class="bg-yellow-500 h-2.5 rounded-full mt-2"
                    style={{ width: percentge(allreview, 2) }}
                  ></div>
                </div>
                <div className="flex">
                  <p className="mr-2">1</p>
                  <div
                    class="bg-yellow-500 h-2.5 rounded-full mt-2"
                    style={{ width: percentge(allreview, 1) }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {allreview?.map((item) => (
          <ListReviews item={item} />
        ))}
        {/* <ListReviews />
        <ListReviews /> */}
      </div>
    </div>
  );
}
