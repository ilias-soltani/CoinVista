import React from "react";
import { RiSearch2Line } from "react-icons/ri";

import "./EmptySearch.scss";

const EmptySearch = ({ searchText }) => {
  return (
    <div className="empty-search">
      <div className="icon">
        <RiSearch2Line />
      </div>
      <h2>
        No results for <span>"{searchText}"</span>
      </h2>
    </div>
  );
};

export default EmptySearch;
