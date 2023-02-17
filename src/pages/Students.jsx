import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BodyHeader, DisplayCard, Navbar, Sidebar } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { addStudentData, selectStudentData } from "../redux/slices/student";

const Students = () => {
  const dispatch = useDispatch()
  const getStudentData = useSelector(selectStudentData)

  useEffect(() => {
    axios
      .get("http://10.80.1.92:5000/students")
      .then((res) => {
        dispatch(addStudentData(res.data))
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  // console.log(students)

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className={`flex-1 min-h-screen`}>
        <Navbar />
        <BodyHeader title="Student" />
        <div className="container mt-10 flex flex-wrap gap-7 justify-center">
          {getStudentData.map((item) => {
            return (
              <DisplayCard
                key={item.id}
                type="student"
                update="students"
                title="Student"
                data={item}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Students;
