import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Admin/Sidebar/Sidebar.jsx";
import "./AdminLayout.css";
import AdminNavbar from "../Components/Admin/AdminNavbar/AdminNavbar.jsx";
import { useTheme } from "../ThemeContext.jsx";

const AdminLayout = ({ children }) => {
  const [sideBarClass, setSideBarClass] = useState("");
  const { themeStyles } = useTheme();

  function handleResize() {
    if (window.innerWidth <= 991) {
      setSideBarClass("collapsed");
    } else {
      setSideBarClass("");
    }
  }

  function sideBarToggle() {
    setSideBarClass((prevClass) => (prevClass === "" ? "collapsed" : ""));
  }

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={{ ...themeStyles }}>
      <AdminNavbar sideBarToggle={sideBarToggle} />
      <div className="">
        <Sidebar sideBarToggle={sideBarToggle} sideBarClass={sideBarClass} />
        <div className={`screensSectionContainer ${sideBarClass ? "expanded" : ""}`}>
          <div className="appContainer">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
