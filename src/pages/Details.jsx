import React, { useEffect, useState } from "react";
import {
  BodyHeader,
  DisplayCard,
  Navbar,
  Sidebar,
  StdBox,
} from "../components";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { studentsData } from "../dev-data/studentsData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { selectCourseData } from "../redux/slices/courses";
import { selectStudentData } from "../redux/slices/student";

const Details = () => {
  const location = useLocation();
  const studentData = location.state?.data;
  // console.log(location.state.data);
  const classData = location.state?.data;
  const courseData = useSelector(selectCourseData);
  const getStdData = useSelector(selectStudentData);
  // console.log(getStdData);
  const type = location.state?.type;
  const [showStd, setShowStd] = useState(false);
  const [stdID, setStdID] = useState([]);

  useEffect(() => {
    const stdID = studentData.Students?.map((item) => item.id);
    setStdID(stdID);
  }, [studentData]);

  // console.log(stdID)
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className={`flex-1 min-h-screen`}>
        <Navbar />
        <div className="container mt-32 gap-y-4 flex flex-col">
          {type === "Student" && (
            <>
              <div className="flex flex-1 flex-col gap-y-3 border-b-2 border-dark-purple pb-3">
                <label className="font-bold" htmlFor="">
                  Add Courses
                </label>
                <div className="h-max flex flex-col gap-y-2">
                  <div
                    onClick={() => setShowStd(!showStd)}
                    className="cursor border border-gray-300 rounded-md p-1 flex items-center justify-between"
                  >
                    <p className="text-gray-400">
                      Choose from available courses
                    </p>
                    <FontAwesomeIcon
                      icon={faCaretDown}
                      className="text-gray-700"
                    />
                  </div>
                  <div
                    className={`${
                      showStd ? "scale-100" : "scale-0 hidden"
                    } origin-top border border-gray-300 rounded-md p-1 flex flex-wrap gap-3`}
                  >
                    {courseData.map((item, idx) => (
                      <StdBox
                        data={item}
                        name={item.coursename}
                        key={idx}
                        updated={studentData.course.includes(item.coursename)}
                      />
                    ))}
                  </div>
                </div>
                <motion.div
                  whileTap={{ scale: 0.8 }}
                  className="bg-dark-purple self-center p-2 rounded-md mt-4 text-white cursor-pointer"
                >
                  Add Courses
                </motion.div>
              </div>
              <div className="flex flex-col items-center">
                {/* <div className="border-2 border-dark-purple w-32 h-32 rounded-full overflow-hidden">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXhj0MXnWk2z2bk2itVBekfxmTo6DO8cddqw&usqp=CAU"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div> */}
                <div className="flex gap-x-3">
                  <p className="mt-4 text-3xl">{studentData.firstname}</p>
                  <p className="mt-4 text-3xl">{studentData.lastname}</p>
                </div>
                <p className="mb-3 text-md font-medium">
                  Class: {studentData.class}
                </p>
                <div className="flex flex-col gap-y-1 items-center">
                  <span className="border-2 border-dark-purple w-9 h-9 rounded-full grid place-items-center">
                    {studentData.age}
                  </span>
                  <p className="text-md font-medium">Age</p>
                </div>

                <div className="mt-4 bg-white shadow-myshadow max-w-xl h-max px-7 py-4 rounded-md flex flex-col gap-y-2 items-center">
                  <h1 className="text-dark-purple text-2xl font-bold text-center">
                    All Your Courses
                  </h1>
                  {studentData.course.length > 0
                    ? studentData.course.map((course, idx) => (
                        <p key={idx} className="text-xl font-medium">
                          {course}
                        </p>
                      ))
                    : "You have no courses"}
                </div>
              </div>
            </>
          )}

          {type === "Course" && (
            <>
              <div className="flex flex-1 flex-col gap-y-3 border-b-2 border-dark-purple pb-3">
                <label className="font-bold" htmlFor="">
                  Add Students
                </label>
                <div className="h-max flex flex-col gap-y-2">
                  <div
                    onClick={() => setShowStd(!showStd)}
                    className="cursor border border-gray-300 rounded-md p-1 flex items-center justify-between"
                  >
                    <p className="text-gray-400">
                      Choose from available students
                    </p>
                    <FontAwesomeIcon
                      icon={faCaretDown}
                      className="text-gray-700"
                    />
                  </div>
                  <div
                    className={`${
                      showStd ? "scale-100" : "scale-0 hidden"
                    } origin-top border border-gray-300 rounded-md p-1 flex flex-wrap gap-3`}
                  >
                    {getStdData
                      .filter((item) => !stdID.includes(item.id))
                      .map((item, idx) => (
                        <StdBox
                          data={item}
                          name={item.firstname}
                          lastname={item.lastname}
                          key={idx}
                        />
                      ))}
                  </div>
                </div>
                <motion.div
                  whileTap={{ scale: 0.8 }}
                  className="bg-dark-purple self-center p-2 rounded-md mt-4 text-white cursor-pointer"
                >
                  Add Students
                </motion.div>
              </div>

              <div>
                <h1 className="text-4xl">{courseData.coursename}</h1>
                <div className="bg-white shadow-myshadow w-[70vw] p-5 mt-4 rounded-md flex flex-col gap-y-3">
                  <h1 className="text-center font-semibold text-dark-purple">
                    All Students
                  </h1>
                  <div className="flex flex-wrap justify-center gap-5">
                    {location.state.data.Students.map((item) => (
                      <motion.div
                        key={item.id}
                        whileTap={{ scale: 0.8 }}
                        className={`flex items-center gap-x-1 w-max p-2 rounded-md cursor-pointer bg-dark-purple text-white`}
                      >
                        <span>{item.firstname}</span>
                        <span>{item.lastname}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {type === "Class" && (
            <>
              <h1 className="text-4xl">CLass {classData.classname}</h1>
              <div className="bg-white shadow-myshadow w-[70vw] p-5 mt-4 rounded-md flex flex-col gap-y-3">
                <h1 className="text-center font-semibold text-dark-purple">
                  All Students
                </h1>
                <div className="flex flex-wrap justify-center gap-5">
                  {classData.students.length > 0
                    ? classData.students.map((item, idx) => (
                        <motion.div
                          key={idx}
                          whileTap={{ scale: 0.8 }}
                          className={`flex items-center gap-x-1 w-max p-2 rounded-md cursor-pointer bg-dark-purple text-white`}
                        >
                          <span>{item.firstname}</span>
                          <span>{item.lastname}</span>
                        </motion.div>
                      ))
                    : "There are no students"}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;
