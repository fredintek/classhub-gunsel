import axios from "axios";
import React, { useEffect, useState } from "react";
import { BodyHeader, DisplayCard, Navbar, Sidebar } from "./../components";
import { useDispatch, useSelector } from "react-redux";
import { addClassHub, selectClassHub } from "../redux/slices/classHub";

const ClassHub = () => {
  useEffect(() => {
    axios
      .get("http://localhost:9000/api/v1/class/")
      .then((res) => {
        dispatch(addClassHub(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const dispatch = useDispatch();
  const getClassHub = useSelector(selectClassHub);

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
