import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import StdBox from "./StdBox";
import axios from "axios";
import { selectStdBox, setStdBox } from "../redux/slices/courses";
import { toast } from "react-toastify";

const FormTemplate = ({ title, update }) => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [classData, setClassData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [courseData, setCourseData] = useState([]);

  // GET DATA FROM PREV PAGE
  const location = useLocation();
  const data = location.state;

  // FORM STATES
  const [classname, setClassName] = useState(null);
  const [firstname, setFirstName] = useState(null);
  const [lastname, setLastName] = useState(null);
  const [coursename, setCourseName] = useState(null);
  const [age, setAge] = useState(null);
  const [selectClass, setSelectClass] = useState(null);
  const selectCourseIds = useSelector(selectStdBox);

  useEffect(() => {
    setClassData(JSON.parse(localStorage.getItem("classData")));
    setCourseData(JSON.parse(localStorage.getItem("courseData")));
    setStudentData(JSON.parse(localStorage.getItem("studentsData")));

    if (update === "students" && title === "Student") {
      setFirstName(data.data.firstname);
      setLastName(data.data.lastname);
      setSelectClass(data.data.class);
      setAge(data.data.age);
    }
  }, [title]);

  useEffect(() => {
    let arr = [];
    if (update === "students" && title === "Student") {
      courseData.forEach((item) => {
        if (
          data.data.courses.find((obj) => obj.coursename === item.coursename)
        ) {
          arr.push(item.id);
        }
      });
    }
    dispatch(setStdBox(arr));
  }, [courseData]);

  const [showStd, setShowStd] = useState(false);

  const config = {
    headers: { "content-type": "multipart/form-data" },
  };
  const handleAddUpdateForm = async (e) => {
    e.preventDefault();
    if (!update && title === "Class") {
      const url = "http://localhost:9000/api/v1/class/";
      const data = {
        classname: classname,
      };

      axios
        .post(url, data)
        .then((response) => {
          navigator(-1);
          toast.success(response.data.message);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }

    if (update === "classHub" && title === "Class") {
      const url = `http://localhost:9000/api/v1/class/${data.data.id}`;
      const formData = {
        classname: classname,
      };

      axios
        .patch(url, formData)
        .then((response) => {
          navigator(-1);
          toast.success(response.data.message);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }

    if (!update && title === "Student") {
      const url = "http://localhost:9000/api/v1/student/";
      const data = {
        firstname,
        lastname,
        age,
        classname: selectClass,
        coursename: selectCourseIds,
      };

      axios
        .post(url, data)
        .then((response) => {
          navigator(-1);
          toast.success(response.data.message);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }

    if (update === "students" && title === "Student") {
      const url = `http://localhost:9000/api/v1/student/${data.data.id}`;
      const formData = {
        firstname,
        lastname,
        age,
        classname: selectClass,
        coursename: selectCourseIds,
      };

      axios
        .patch(url, formData)
        .then((response) => {
          navigator(-1);
          toast.success(response.data.message);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }

    if (!update && title === "Course") {
      const url = `http://localhost:9000/api/v1/course/`;
      const formData = {
        coursename,
      };

      axios
        .post(url, formData)
        .then((response) => {
          console.log(response);
          navigator(-1);
          toast.success(response.data.message);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }

    if (update === "courses" && title === "Course") {
      const url = `http://localhost:9000/api/v1/course/${data.data.id}`;
      const formData = {
        coursename,
      };

      axios
        .patch(url, formData)
        .then((response) => {
          navigator(-1);
          toast.success(response.data.message);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
  };

  return (
    <form
      id="classHub-form"
      encType="multipart/form-data"
      onSubmit={handleAddUpdateForm}
      className="bg-white shadow-myshadow max-w-2xl mx-auto flex flex-col gap-y-10 rounded-md p-5"
    >
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
              name="classname"
              id=""
              onChange={(e) => setClassName(e.target.value)}
              placeholder={`${data.data.classname || "Enter new classname"}`}
            />
          </>
        ) : title !== "Student" ? (
          <>
            {" "}
            <input
              onChange={(e) => setCourseName(e.target.value)}
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
                  onChange={(e) => setFirstName(e.target.value)}
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
                  onChange={(e) => setLastName(e.target.value)}
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
                      data={item}
                      name={item.coursename}
                      key={idx}
                      updated={data.data.courses.find(
                        (obj) => obj.coursename === item.coursename
                      )}
                    />
                  ))
                : courseData.map((item, idx) => (
                    <StdBox data={item} name={item.coursename} key={idx} />
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
              onChange={(e) => setAge(e.target.value)}
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
              onChange={(e) => setSelectClass(e.target.value)}
              defaultValue={"select class"}
              className="border border-gray-300 rounded-md p-1 outline-none cursor-pointer"
              name=""
              id=""
            >
              <option value="select class">Select Class</option>
              {classData.map((item) => (
                <option key={item.id} value={item.classname}>
                  {item.classname}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* {title === "Student" && (
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
      )} */}

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
