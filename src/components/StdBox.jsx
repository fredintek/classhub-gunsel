import React, { useEffect, useState, useCallback, memo } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { appendStdBox, popStdBox, selectStdBox } from "../redux/slices/courses";

const StdBox = memo( function StdBox ({ name, lastname, updated, data }) {
  const dispatch = useDispatch();
  const getStdBox = useSelector(selectStdBox);
  const [selectedStd, setSelectedStd] = useState(false);
  const [ifUpdated, setIfUpdated] = useState(updated);

  const handleSingleClick = useCallback(() => {
    // if updated do not run single click
    if (ifUpdated) {
      setSelectedStd(false);
      setIfUpdated(false);
      dispatch(popStdBox(data.id));
    }

    //check if data id exists in global stdbox
    if (!getStdBox.find((item) => item === data.id)) {
      setSelectedStd(true);
      dispatch(appendStdBox(data.id));
    } else {
      setSelectedStd(false);
      dispatch(popStdBox(data.id));
    }
  }, [data, getStdBox]);


  return (
    <motion.div
      onClick={handleSingleClick}
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
});

export default StdBox;
