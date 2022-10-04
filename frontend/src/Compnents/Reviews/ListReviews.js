import React from "react";
import DateFormatter from "../../utils/DateFormat";
import StarRating from "./StarRating";

export default function ListReviews({item}) {
  return (
    <div className=" flex-wrap mx-1  border-t-2 mt-3  border-gray-00  p-1">
      <div className="inline-flex  mt-5 items-center">
        <img
          className="mr-5 w-14  h-14 rounded-full"
          src="https://cdn.pixabay.com/photo/2021/02/24/23/43/boy-6047786_960_720.jpg"
          alt=""
        />
        <div className="text-left">
          <h4 className="text-md  text-gray-900">
           
           Razi
           
          </h4>

          <p className="text-gray-500">
            <StarRating value={item.rating}/>
          </p>
        </div>
      </div>

      <div className="w-full mt-3">
        <h3 className="mb-1 text-2xl text-gray-900 font-bold font-heading">
          {item?.review}
        </h3>

        <p className="text-gray-600 truncate">
      
          <DateFormatter date={item?.createdAt} />
        </p>
       
      </div>
    </div>
  );
}
