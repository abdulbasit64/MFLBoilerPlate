// src/ThemeContext.js
import React, { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(window.localStorage.getItem("theme") ?? "light");

  useEffect(() => {
    window.localStorage.setItem("theme", theme);
  }, []);

  const toggleTheme = () => {
    let theme = window.localStorage.getItem("theme");
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    window.localStorage.setItem("theme", theme === "light" ? "dark" : "light");
  };

  const themeStyles = theme === "light" ? { backgroundColor: "#fff", color: "#333" } : { backgroundColor: "#121212", color: "#fff" };

  return <ThemeContext.Provider value={{ theme, toggleTheme, themeStyles }}>{children}</ThemeContext.Provider>;
};
