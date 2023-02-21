import React, { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { appendStdBox, popStdBox, selectStdBox } from "../redux/slices/courses";

const StdBox = ({ name, lastname, updated, data }) => {
  const dispatch = useDispatch();
  const [selectedStd, setSelectedStd] = useState(false);
  const [ifUpdated, setIfUpdated] = useState(updated);

  const handleStdBox = () => {
    if (!selectedStd) {
      dispatch(appendStdBox(data.id));
    } else {
      dispatch(popStdBox(data.id));
    }
    setIfUpdated(false);
    setSelectedStd(!selectedStd);
  };

  return (
    <motion.div
      onClick={handleStdBox}
      whileTap={{ scale: 0.8 }}
      className={`${
        selectedStd || ifUpdated ? "bg-dark-purple text-white" : "bg-gray-300"
      } flex items-center gap-x-1 w-max p-2 rounded-md cursor-pointer`}
    >
      <span>{name}</span> <span>{lastname}</span>{" "}
      <div>
        <FontAwesomeIcon icon={faPlus} />
      </div>
    </motion.div>
  );
};

export default StdBox;
