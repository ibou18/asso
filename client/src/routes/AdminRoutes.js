import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "../components/Layout/admin/Header";
import SideBar from "../components/Layout/admin/SideBar";
import { Dashboard, UserPage } from "../pages/admin";

const AdminRoute = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gray-100">
      <Router>
        <div>
          <SideBar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
          <div className="md:pl-64 flex flex-col">
            <Header setSidebarOpen={setSidebarOpen} />
            <main className="flex-1 pb-8 ">
              <Switch>
                <Route exact component={UserPage} path="/admin/users" />
                <Route exact component={Dashboard} path="*" />
                <Route exact component={Dashboard} path="/" />
              </Switch>
            </main>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default AdminRoute;
