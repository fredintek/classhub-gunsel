import { useEffect } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import { ClassHub, Students, Courses, FormPage, Details } from "./pages";

function App() {

  useEffect(() => {
    const fetchAllData = async () => {
      const studentsData = await axios.get("http://10.80.1.92:5000/students")
      const classData = await axios.get("http://10.80.1.92:5000/classes")
      const courseData = await axios.get("http://10.80.1.92:5000/courses");
      localStorage.setItem("studentsData", JSON.stringify(studentsData.data))
      localStorage.setItem("classData", JSON.stringify(classData.data))
      localStorage.setItem("courseData", JSON.stringify(courseData.data));

    }

    fetchAllData()
  }, [])

  return (
    <>
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
