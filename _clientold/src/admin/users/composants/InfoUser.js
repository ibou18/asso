import React, { useEffect } from "react";
import TablePaiements from "../../paiements/components/TablePaiements";
import { Link } from "react-router-dom";

const InfoUser = () => {
  useEffect(() => {}, []);

  return (
    <div class="row">
      <div class="col-xl-4">
        {/*<!-- Profile picture card--> */}
        <div class="card mb-4 mb-xl-0">
          <div class="card-header">Mes informations </div>
          <div class="card-body text-center">
            {/*<!-- Profile picture image--> */}
            <img
              class="img-account-profile rounded-circle mb-2"
              src="/assets/img/illustrations/profiles/profile-2.png"
              alt=""
            />
            <div>
              Nom: <span> Diallo </span>
            </div>
            <div>
              Prénom : <span> Ibrahima </span>
            </div>
            <div>
              ville: <span> Laval QC </span>
            </div>
            <div>
              Téléphone: <span> 514.222.6801 </span>
            </div>
            <div>
              Status: <span> OK </span>
            </div>
            <div>
              A payer: <span> 0€ </span>
            </div>
            <Link to="/admin/profileedit">
              <button class="btn btn-primary mt-3" type="button">
                Modifier votre profil
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div class="col-xl-8">
        <div class="card mb-4">
          <div class="card-header">Historique des paiements </div>
          <div class="card-body">
            {/*  table de paiement  */}
            <TablePaiements />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoUser;
