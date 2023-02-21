import axios from "axios";
import React, { useEffect, useState } from "react";
import { BodyHeader, DisplayCard, Navbar, Sidebar } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { addCourseData, selectCourseData } from "../redux/slices/courses";

const Courses = () => {
  useEffect(() => {
    axios
      .get("http://localhost:9000/api/v1/course/")
      .then((res) => {
        dispatch(addCourseData(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const dispatch = useDispatch();
  const getCourseData = useSelector(selectCourseData);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className={`flex-1 min-h-screen`}>
        <Navbar />
        <BodyHeader title="Course" />
        <div className="container mt-10 flex flex-wrap gap-7 justify-center">
          {getCourseData.map((item, index) => {
            return (
              <DisplayCard
                key={index}
                type="course"
                update="courses"
                title="Course"
                data={item}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Courses;
