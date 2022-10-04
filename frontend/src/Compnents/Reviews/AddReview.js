import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { createReviewAction } from "../../redux/slices/review/reviewSlice";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

const styles = {
  container: {
    // display: "flex",
    flexDirection: "column",
    // alignItems: "center",
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
  textarea: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    padding: 10,
    margin: "20px 0",
    minHeight: 200,
  },
};

const formSchema = Yup.object({
  review: Yup.string().required("review is required").min(20,'Min Length 20 words')
});

export default function AddReview({ children, visible, onClose }) {
  const dispatch = useDispatch();

  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0);

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const formik = useFormik({
    initialValues: {
      review: "",
    },
    onSubmit: (values, { resetForm }) => {
      const data = {
        // postId,
        review: values?.review,
        rating:currentValue
      };
      dispatch(createReviewAction(data));
      onClose()
      resetForm({ values: "" });
    },
    validationSchema: formSchema,
  });

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };
  if (!visible) return null;
  const handleOnBackDropClick = (e) => {
    if (e.target.id === "backdrop") onClose && onClose();
  };
  return (
    <div
      id="backdrop"
      onClick={handleOnBackDropClick}
      className="bg-black bg-opacity-50 backdrop-blur-sm fixed inset-0 flex items-center justify-center"
    >
      <div className="bg-white w-1/2 p-5 rounded">
        <div style={styles.container}>
          <h2 className="font-bold mb-4"> Reviews and Rating</h2>
          <form onSubmit={formik.handleSubmit} className="mt-1 w-full ">
            <div style={styles.stars}>
              {stars.map((_, index) => {
                return (
                  <FaStar
                    key={index}
                    size={24}
                    onClick={() => handleClick(index + 1)}
                    onMouseOver={() => handleMouseOver(index + 1)}
                    onMouseLeave={handleMouseLeave}
                    color={
                      (hoverValue || currentValue) > index
                        ? colors.orange
                        : colors.grey
                    }
                    style={{
                      marginRight: 10,
                      cursor: "pointer",
                    }}
                  />
                );
              })}
              {currentValue} Rating
            </div>
            <div className="flex justify-center">
              <textarea
                onBlur={formik.handleBlur("review")}
                value={formik.values.review}
                onChange={formik.handleChange("review")}
                className="w-full"
                placeholder="Enter your review (minimun 20 words)"
                style={styles.textarea}
                minLength={20}
              />
            </div>
            <p className="text-red-500">
              {formik.touched.review && formik.errors.review}
            </p>
            <div className="flex justify-center">
              <button className="mx-auto m-auto h-10 mt-2 border-cyan-500 text-cyan-500 rounded border w-32">
                Submit Review
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"></div>
      </div>
    </div>
  );
}
