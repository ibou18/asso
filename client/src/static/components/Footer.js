import React from 'react';
import { Link } from 'react-router-dom';


const Footer = () => {
    return (
    <footer className=" fixed-bottom mt-3"> 
            <div className="row align-items-center alert-warning p-3 "> 
                <div className="col-8">
                    <strong> Association des Francos-Guinéens de Tokosséré </strong> <br/>
                    <span> 3 Voie romaine 01170 Gex </span> 
                </div >
                <div className="col-4 text-center ">
                    <span > Adhérent </span>  <Link className="nav-link active" to="/login"> Se Connecter </Link> 
                </div >
            </div>
    </footer>
    )
}

export default Footer;