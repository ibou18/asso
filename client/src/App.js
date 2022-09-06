// import Accueil from "./components/Accueil";
// import About from "./components/About";
// import News from "./components/News";
// import Login from "./components/Login";
import Navbar from "./static/components/Navbar";

// import Footer from "./components/Footer";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import FrontRoute from "./FrontRoute";
import AdminRoute from "./AdminRoute";
// import ErrorPage from "./Admin/components/error404";

function App() {
  return (
    <Router>
      <div className="container-fluid ">
        <Navbar />
        {/* <Switch> */}
        <AdminRoute />
        <FrontRoute />
        {/* </Switch> */}
      </div>
      <div style={{ height: "100px", width: "30px" }}> </div>

      {/* <Footer /> */}
    </Router>
  );
}

export default App;
