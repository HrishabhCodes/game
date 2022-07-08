import React from "react";
import Loader from "../../assets/loading.gif";
import "./Loading.css";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <motion.div
      className="loading-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <img className="loader" src={Loader} alt="" />
    </motion.div>
  );
};

export default Loading;
