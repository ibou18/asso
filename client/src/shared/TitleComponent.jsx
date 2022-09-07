import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TitleComponent = ({ title, icon, color }) => {
  return (
    <div>
      <div className="flex align-center mt-10 mb-3">
        <span>
          <FontAwesomeIcon
            icon={icon}
            className={`text-2xl mr-5 mt-1 ${color}`}
          />
        </span>
        <h1 className="text-bold text-2xl  "> {title}</h1>
      </div>
    </div>
  );
};

export default TitleComponent;
