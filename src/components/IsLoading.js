import React from "react";
import '../App.css'
import ReactLoading from "react-loading";

const IsLoading = () => (
  <div className="pages load">
    <ReactLoading type={"bars"} color={"#17B6FB"} height={334} width={188} />
  </div>
);

export default IsLoading;
