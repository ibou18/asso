import React from "react";

import { Bar } from "react-chartjs-2";

const state = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      label: "Cotisations",
      backgroundColor: "rgba(67, 170, 139, 0.80)",
      hoverBackgroundColor: "rgba(67, 170, 139)",
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 0,
      data: [65, 59, 80, 81, 56],
    },
    {
      label: "Dépenses",
      backgroundColor: "rgba(249, 65, 68, 0.80)",
      hoverBackgroundColor: "rgba(249, 65, 68)",
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 0,
      data: [6, 35, 130, 60, 15],
    },
  ],
};

const Graphs = () => {
  return (
    <div>
      <div className="card mb-4">
        <div className="card-header">Evolution du compte (€)</div>
        <div className="card-body p-5">
          <Bar
            width={200}
            height={300}
            data={state}
            options={{
              maintainAspectRatio: false,
              borderRadius: 5,
              title: {
                display: true,
                text: "Roboto",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
        </div>
        <div className="card-footer small text-muted">
          Mise jour le 30/03/2021
        </div>
      </div>

      <div className="row"></div>
    </div>
  );
};

export default Graphs;
