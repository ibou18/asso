import React from "react";

const HeaderAdmin = ({ name, description, picto }) => {
  return (
    <div>
      <header className="page-header page-header-dark bg-gradient-primary-to-secondary pb-10 mt-n5">
        <div className="container-xl px-4">
          <div className="page-header-content pt-2">
            <div className="row align-items-center justify-content-between">
              <div className="col-auto mt-2">
                <h1 className="page-header-title">
                  <div className="page-header-icon">{picto}</div>
                  {name}
                </h1>
                <div className="page-header-subtitle">{description}</div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default HeaderAdmin;
