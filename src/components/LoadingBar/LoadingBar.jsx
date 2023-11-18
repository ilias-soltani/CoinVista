import React from "react";
import { MoonLoader } from "react-spinners";

const LoadingBar = () => {
  return (
    <div className="loading-bar">
      <MoonLoader color="#007fff" />
    </div>
  );
};

export default LoadingBar;
