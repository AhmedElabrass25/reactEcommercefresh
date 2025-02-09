import React from "react";

const PageTitle = ({ title }) => {
  return (
    <>
      <h2 className="bg-main text-white w-full text-center mb-5 rounded-md py-2 capitalize">
        {title}{" "}
      </h2>
    </>
  );
};

export default PageTitle;
