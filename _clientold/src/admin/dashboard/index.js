import React from "react";
import {
  NavBarAdmin,
  HeaderAdmin,
  TableUsers,
  CardStatus,
  GraphPaiement,
  FooterAdmin,
  SideBarAdmin,
} from "../layout/";

// import Comptalist from "../meeting/components/ComptaList";

const DashboardMain = () => {
  return (
    <div className="nav-fixed">
      <NavBarAdmin />
      <div id="layoutSidenav">
        <SideBarAdmin />
        <div id="layoutSidenav_content">
          <main>
            <HeaderAdmin
              picto={<i data-feather="activity"></i>}
              name={"Dashbord"}
              description={"Suivi de votre compte"}
            />
            {/*<!-- Main page content--> */}
            <div className="container-xl  mt-n10">
              <CardStatus />
              <GraphPaiement />
              <TableUsers />
              {/* <Comptalist /> */}
            </div>
          </main>

          <FooterAdmin />
        </div>
      </div>
      <sb-customizer project="sb-admin-pro"></sb-customizer>
    </div>
  );
};

export default DashboardMain;
