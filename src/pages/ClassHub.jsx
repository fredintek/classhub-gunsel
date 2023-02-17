import axios from "axios";
import React, { useEffect, useState } from "react";
import { BodyHeader, DisplayCard, Navbar, Sidebar } from "./../components";
import { useDispatch, useSelector } from "react-redux";
import { addClassHub, selectClassHub } from "../redux/slices/classHub";

const ClassHub = () => {
  const dispatch = useDispatch()
  const getClassHub = useSelector(selectClassHub)

  useEffect(() => {
    axios
      .get("http://10.80.1.92:5000/classes")
      .then((res) => {
        dispatch(addClassHub(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // console.log(classData)

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className={`flex-1 min-h-screen`}>
        <Navbar />
        <BodyHeader title="Class" />
        <div className="container mt-10 flex flex-wrap gap-7 justify-center">
          {getClassHub.map((item) => {
            return (
              <DisplayCard
                key={item.id}
                type="classHub"
                update="classHub"
                title="Class"
                data={item}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ClassHub;
