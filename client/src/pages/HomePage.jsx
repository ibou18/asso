import React from "react";
import TitleComponent from "../shared/TitleComponent";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const HomePage = () => {
  return (
    <div>
      <div>
        <TitleComponent
          title={"Accueil"}
          icon={faHome}
          color={"text-blue-500"}
        />
      </div>
      <div>
        <p> Test pour le site</p>
      </div>
    </div>
  );
};

export default HomePage;
