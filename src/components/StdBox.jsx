import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const StdBox = ({ name, lastname, updated }) => {
  const [selectedStd, setSelectedStd] = useState(false);
  const [ifUpdated, setIfUpdated] = useState(updated);


  const handleStdBox = () => {
    setIfUpdated(false)
    setSelectedStd(!selectedStd);
  };

  // console.log(ifUpdated)
  // console.log(selectedStd);

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
