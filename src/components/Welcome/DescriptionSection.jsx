import React from "react";
import DescriptionCard from "./DescriptionCard";

export default function SignupSection({ id }) {
  return (
    <div className="w-full h-auto bg-gradient-r-primary pb-8">
      <div className="flex flex-col w-full h-full bg-primaryBackground shadow-lg rounded-b-lg sm:p-20 p-4">
        <div className="flex flex-col w-full justify-center items-center my-8">
          <h1 className="text-3xl font-bold text-primaryText sm:p-12 p-4">
            bla bla bla bla.
          </h1>
          <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 w-full gap-4 gap-y-12 lg:gap-y-16 md:gap-y-12 sm:gap-y-12 py-8 px-0 md:px-20">
            <DescriptionCard
              title="Something1"
              src="https://static.independent.co.uk/2021/12/07/10/PRI213893584.jpg"
              alt="Something1"
              description="ABC"
            />
            <DescriptionCard
              title="Something2"
              src="https://static.independent.co.uk/2021/12/07/10/PRI213893584.jpg"
              alt="Something2"
              description="XYZ"
            />
            <DescriptionCard
              title="Public Channels"
              src="https://static.independent.co.uk/2021/12/07/10/PRI213893584.jpg"
              alt="Public Channels"
              description="ABC"
            />
          </div>
        </div>
        <div className="flex flex-col w-full justify-center items-center my-8 mb-20">
          <h2 className="text-3xl font-bold text-primaryText sm:p-12 p-4">
            Why
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 w-full gap-4 gap-y-12 lg:gap-y-16 md:gap-y-12 sm:gap-y-12 p-8 px-0 md:px-20">
            <DescriptionCard
              title="Something3"
              src="https://static.independent.co.uk/2021/12/07/10/PRI213893584.jpg"
              alt="Something3"
              description="bla bla bla"
            />
            <DescriptionCard
              title="Something4"
              src="https://static.independent.co.uk/2021/12/07/10/PRI213893584.jpg"
              alt="Something4"
              description="bla bla bla"
            />
            <DescriptionCard
              title="Something5"
              src="https://static.independent.co.uk/2021/12/07/10/PRI213893584.jpg"
              alt="Something5"
              description="bla bla bla"
            />
            <DescriptionCard
              title="Something6"
              src="https://static.independent.co.uk/2021/12/07/10/PRI213893584.jpg"
              alt="Something6"
              description="bla bla bla"
            />
            <DescriptionCard
              title="Something7"
              src="https://static.independent.co.uk/2021/12/07/10/PRI213893584.jpg"
              alt="Something7"
              description="bla bla bla"
            />
            <DescriptionCard
              title="Something8"
              src="https://static.independent.co.uk/2021/12/07/10/PRI213893584.jpg"
              alt="Something8"
              description="bla bla bla"
            />
          </div>
          <p className="w-full h-auto flex justify-end text-secondaryText text-sm px-0 md:px-16">
            Icon made by Freepik from www.flaticon.com
          </p>
        </div>
      </div>
    </div>
  );
}
