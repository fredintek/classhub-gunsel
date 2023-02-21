import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BodyHeader = ({ type, title }) => {
  const [queryStr, setQueryStr] = useState(() => {
    if (title === "Class") return "class";
    if (title === "Student") return "student";
    if (title === "Course") return "course";
  });

  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:9000/api/v1/${queryStr}/`);
      setData(res.data.data)
    };

    fetchData();
  }, [queryStr]);


  const navigate = useNavigate();
  const handleBodyHeadClick = () => {
    navigate("/form", { state: { title: title, data: data } });
  };

  return (
    <div className="mt-10">
      <div
        className={`container flex ${
          type ? "justify-center" : "justify-between"
        } items-center`}
      >
        {type ? (
          <p className="text-xl max-[450px]:text-base font-medium">{type}</p>
        ) : (
          <p className="text-xl max-[450px]:text-base font-medium">
            All {title}
          </p>
        )}

        <motion.div
          onClick={handleBodyHeadClick}
          whileTap={{ scale: 0.8 }}
          className={`${
            type ? "hidden" : ""
          } cursor-pointer flex items-center gap-x-3 bg-dark-purple p-2 rounded-md text-white`}
        >
          <span className="text-base">Add {title}</span>
          <FontAwesomeIcon icon={faPlus} />
        </motion.div>
      </div>
    </div>
  );
};

export default BodyHeader;
