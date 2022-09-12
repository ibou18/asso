import React from "react";
import { TableUsers, CardStatus, GraphPaiement } from "../layout/";

// import Comptalist from "../meeting/components/ComptaList";

const DashboardMain = () => {
  return (
    <div className="container-xl  mt-n10">
      <CardStatus />
      <GraphPaiement />
      <TableUsers />
      {/* <Comptalist /> */}
    </div>
  );
};

export default DashboardMain;
