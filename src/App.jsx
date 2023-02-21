import { useEffect } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import { ClassHub, Students, Courses, FormPage, Details } from "./pages";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  useEffect(() => {
    const fetchAllData = async () => {
      const classData = await axios.get("http://localhost:9000/api/v1/class/");
      const studentsData = await axios.get(
        "http://localhost:9000/api/v1/student/"
      );
      const courseData = await axios.get(
        "http://localhost:9000/api/v1/course/"
      );

      // console.log(courseData.data.data);

      localStorage.setItem("classData", JSON.stringify(classData.data.data));
      localStorage.setItem("courseData", JSON.stringify(courseData.data.data));
      localStorage.setItem(
        "studentsData",
        JSON.stringify(studentsData.data.data)
      );
    };

    fetchAllData();
  }, []);

  return (
    <>
      <ToastContainer theme="colored" pauseOnHover={false} autoClose={3000} />
      <Routes>
        <Route path="/" element={<ClassHub />} />
        <Route path="/students" element={<Students />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </>
  );
}

export default App;
