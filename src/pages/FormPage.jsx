import React from 'react'
import { useLocation } from 'react-router-dom';
import { BodyHeader, Navbar, Sidebar, FormTemplate } from "../components";

const FormPage = () => {
  const location = useLocation();
  const update = location.state.update
  const title = location.state.title
  const data = location.state.data

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className={`flex-1 min-h-screen`}>
        <Navbar />
        <BodyHeader type="Form" title={title} />
        <div className="container mt-10">
          <FormTemplate update={update} title={title} />
        </div>
      </div>
    </div>
  );
}

export default FormPage