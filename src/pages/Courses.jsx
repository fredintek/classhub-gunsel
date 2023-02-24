import axios from "axios";
import React, { useEffect, useState } from "react";
import { BodyHeader, DisplayCard, Navbar, Sidebar } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { addCourseData, selectCourseData } from "../redux/slices/courses";

const Courses = () => {
  useEffect(() => {
    axios
      .get("/api/course")
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
      <div className={`flex-1 min-h-screen pb-12`}>
        <Navbar />
        <BodyHeader title="Course" />
        <div className="container mt-10 flex flex-wrap gap-7 justify-center">
          {getCourseData.length > 0 ? (
            getCourseData.map((item, index) => {
              return (
                <DisplayCard
                  key={index}
                  type="course"
                  update="courses"
                  title="Course"
                  data={item}
                />
              );
            })
          ) : (
            <div className="text-2xl min-[600px]:text-4xl text-center mt-12 p-5 bg-white shadow-myshadow">
              <h1>No Courses Found</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
