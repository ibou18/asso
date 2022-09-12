import React from "react";
// Paiement des Adhérents
const TablePaiements = () => {
  return (
    <table className="table table-hover" id="datatablesSimple">
      <thead>
        <tr>
          <th>id</th>
          <th>Année</th>
          <th>Q1</th>
          <th>Q2</th>
          <th>Q3</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>001</td>
          <td>2021</td>
          <td>30,00€</td>
          <td>30,00€</td>
          <td>00,00€</td>
        </tr>
        <tr>
          <td>001</td>
          <td>2020</td>
          <td>30,00€</td>
          <td>30,00€</td>
          <td>30,00€</td>
        </tr>
        <tr>
          <td>001</td>
          <td>2019</td>
          <td>30,00€</td>
          <td>30,00€</td>
          <td>30,00€</td>
        </tr>
        <tr>
          <td>001</td>
          <td>2018</td>
          <td>30,00€</td>
          <td>30,00€</td>
          <td>30,00€</td>
        </tr>
      </tbody>
    </table>
  );
};

export default TablePaiements;
