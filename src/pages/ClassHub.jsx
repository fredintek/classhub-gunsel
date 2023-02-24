import axios from "axios";
import React, { useEffect, useState } from "react";
import { BodyHeader, DisplayCard, Navbar, Sidebar } from "./../components";
import { useDispatch, useSelector } from "react-redux";
import { addClassHub, selectClassHub } from "../redux/slices/classHub";

const ClassHub = () => {
  const dispatch = useDispatch();
  const getClassHub = useSelector(selectClassHub);
  useEffect(() => {
    axios
      .get("/api/class")
      .then((res) => {
        dispatch(addClassHub(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // console.log(getClassHub);
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className={`flex-1 min-h-screen pb-12`}>
        <Navbar />
        <BodyHeader title="Class" />
        <div className="container mt-10 flex flex-wrap gap-7 justify-center">
          {getClassHub.length > 0 ? (
            getClassHub.map((item) => {
              return (
                <DisplayCard
                  key={item.id}
                  type="classHub"
                  update="classHub"
                  title="Class"
                  data={item}
                />
              );
            })
          ) : (
            <div className="text-2xl min-[600px]:text-4xl text-center mt-12 p-5 bg-white shadow-myshadow">
              <h1>No Classes Found</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassHub;
