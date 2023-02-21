import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BodyHeader, DisplayCard, Navbar, Sidebar } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { addStudentData, selectStudentData } from "../redux/slices/student";

const Students = () => {
  useEffect(() => {
    axios
      .get("http://localhost:9000/api/v1/student/")
      .then((res) => {
        dispatch(addStudentData(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  const dispatch = useDispatch();
  const getStudentData = useSelector(selectStudentData);

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
