import React from "react";

export default function DescriptionCard({ title, src, alt, description }) {
  return (
    <div className="flex flex-col items-center w-full h-auto bg-secondaryBackground shadow-md hover:shadow-lg rounded-lg p-4 lg:p-8">
      <div className="w-32 h-32 mb-8 transition transform ease-in-out hover:scale-110 duration-100">
        <img src={src} alt={alt} />
      </div>
      <h4 className="text-primaryText text-center text-xl font-bold">
        {title}
      </h4>
      <h6 className="text-primaryText text-center text-sm p-4 text-center">
        {description}
      </h6>
    </div>
  );
}
