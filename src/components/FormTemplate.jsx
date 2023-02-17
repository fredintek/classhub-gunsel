import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpload,
  faCaretDown,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import StdBox from "./StdBox";
import { useSelector } from "react-redux";
import { selectClassHub } from "../redux/slices/classHub";
import { selectStudentData } from "../redux/slices/student";
import { selectCourseData } from "../redux/slices/courses";

const FormTemplate = ({ title, update }) => {
  const [showStd, setShowStd] = useState(false);
  const location = useLocation();
  const data = location.state;
  const stdId = data.data.Students?.map(item => item.id)
  const studentData = useSelector(selectStudentData);
  const courseData = useSelector(selectCourseData);


  

  return (
    <form className="bg-white shadow-myshadow max-w-2xl mx-auto flex flex-col gap-y-10 rounded-md p-5">
      <h1 className="text-3xl text-center text-dark-purple">
        {update
          ? update === "classHub"
            ? `Update ${title}Hub`
            : update === "students"
            ? `Update ${title}`
            : update === "courses" && `Update ${title}`
          : `Add ${title}`}
      </h1>

      <div className="flex flex-col gap-y-2">
        <label
          className="font-bold"
          htmlFor={`${title === "Class" && "selectclass"}`}
        >
          {title === "Class" && "Class Name"}
          {title === "Course" && "Course Name"}
        </label>
        {title === "Class" ? (
          <>
            <input
              className="border border-gray-300 rounded-md p-1 outline-none"
              type="text"
              name=""
              id=""
              placeholder={`${data.data.class || "Enter new classname"}`}
            />
          </>
        ) : title !== "Student" ? (
          <>
            {" "}
            <input
              className="border border-gray-300 rounded-md p-1 outline-none"
              type="text"
              name=""
              id=""
              placeholder={`${
                title === "Class"
                  ? "Enter Class Name"
                  : title === "Course" &&
                    `${data.data.coursename || "Enter Course Name"}`
              }`}
            />
          </>
        ) : (
          <>
            <div className="flex justify-between">
              <div className="flex flex-[0.45] flex-col gap-y-2">
                <label className="font-bold" htmlFor="">
                  Firstname
                </label>
                <input
                  className="border border-gray-300 rounded-md p-1 outline-none"
                  type="text"
                  name=""
                  id=""
                  placeholder={`${
                    update ? data.data.firstname : "Enter your firstname"
                  }`}
                />
              </div>

              <div className="flex flex-[0.45] flex-col gap-y-2">
                <label className="font-bold" htmlFor="">
                  Lastname
                </label>
                <input
                  className="border border-gray-300 rounded-md p-1 outline-none"
                  type="text"
                  name=""
                  id=""
                  placeholder={`${
                    update ? data.data.lastname : "Enter your lastname"
                  }`}
                />
              </div>
            </div>
          </>
        )}
      </div>

      {title === "Student" && (
        <div className="flex flex-col gap-y-2">
          <label className="font-bold" htmlFor="">
            Courses
          </label>
          <div className="h-max flex flex-col gap-y-2">
            <div
              onClick={() => setShowStd(!showStd)}
              className="cursor border border-gray-300 rounded-md p-1 flex items-center justify-between"
            >
              <p className="text-gray-400">Choose from available courses</p>
              <FontAwesomeIcon icon={faCaretDown} className="text-gray-700" />
            </div>
            <div
              className={`${
                showStd ? "scale-100" : "scale-0 hidden"
              } origin-top border border-gray-300 rounded-md p-1 flex flex-wrap gap-3`}
            >
              {update
                ? courseData.map((item, idx) => (
                    <StdBox
                      name={item.coursename}
                      key={idx}
                      updated={data.data.course.includes(item.coursename)}
                    />
                  ))
                : courseData.map((item, idx) => (
                    <StdBox name={item.coursename} key={idx} />
                  ))}
            </div>
          </div>
        </div>
      )}

      {title === "Student" && (
        <div className="flex justify-between">
          <div className="flex flex-[0.45] flex-col gap-y-2">
            <label className="font-bold" htmlFor="">
              Age
              <span className="text-[10px] ml-2 text-red-400">(16-30)</span>
            </label>
            <input
              className="border border-gray-300 rounded-md p-1 outline-none"
              type="number"
              min={16}
              max={30}
              name=""
              id=""
              placeholder={`${update ? data.data.age : "Enter your age"}`}
            />
          </div>

          <div className="flex flex-[0.45] flex-col gap-y-2">
            <label className="font-bold" htmlFor="">
              Class
            </label>
            <select
              defaultValue={"Select Class"}
              className="border border-gray-300 rounded-md p-1 outline-none cursor-pointer"
              name=""
              id=""
            >
              <option value="select class">Select Class</option>

              <option value="class a">Class A</option>
              <option value="class b">Class B</option>
              <option value="class c">Class C</option>
              <option value="class d">Class D</option>
            </select>
          </div>
        </div>
      )}

      {title === "Student" && (
        <div className="flex flex-col gap-y-2">
          <div className="font-bold">
            Profile Picture{" "}
            <span className="text-[10px] ml-2 text-red-400">(optional)</span>
          </div>
          <label
            htmlFor="student-image"
            className="border border-gray-300 rounded-md p-2 outline-none cursor-pointer"
          >
            <FontAwesomeIcon icon={faUpload} className="block mx-auto" />
          </label>
          <input
            className="hidden"
            type="file"
            name="student-image"
            id="student-image"
            accept="image/*"
          />
        </div>
      )}

      {title === "Course" && (
        <div className="flex flex-col gap-y-2">
          <label className="font-bold" htmlFor="">
            Students
          </label>
          <div className="h-max flex flex-col gap-y-2">
            <div
              onClick={() => setShowStd(!showStd)}
              className="cursor border border-gray-300 rounded-md p-1 flex items-center justify-between"
            >
              <p className="text-gray-400">Choose from available students</p>
              <FontAwesomeIcon icon={faCaretDown} className="text-gray-700" />
            </div>
            <div
              className={`${
                showStd ? "scale-100" : "scale-0 hidden"
              } origin-top border border-gray-300 rounded-md p-1 flex flex-wrap gap-3`}
            >
              {update
                ? studentData.map((student, idx) => (
                    <StdBox
                      key={idx}
                      name={student.firstname}
                      lastname={student.lastname}
                      updated={stdId.includes(student.id)}
                    />
                  ))
                : studentData.map((student, idx) => (
                    <StdBox
                      key={idx}
                      name={student.firstname}
                      lastname={student.lastname}
                    />
                  ))}
            </div>
          </div>
        </div>
      )}

      <motion.button
        whileTap={{ scale: 0.8 }}
        className="bg-dark-purple p-2 rounded-md text-white cursor-pointer"
        type="submit"
      >
        {update ? "Update" : "Add"}
      </motion.button>
    </form>
  );
};

export default FormTemplate;
