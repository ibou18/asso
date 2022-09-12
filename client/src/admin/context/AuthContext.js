import React, { createContext, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

// Create Context
const AuthContext = createContext([]);

// Traitement des fonctions pour ensuite les transférer dans le provider
// Est Appeler dans le fichier Index.js
export const AuthProvider = (props) => {
  const [isConnect, setIsConnect] = useState(false);
  const [user, setUser] = useState({});
  const history = useHistory();

  const login = async (formData) => {
    try {
      let data = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/api/user/login`,
        withCredentials: false,
        data: {
          mail: formData.mail,
          password: formData.password,
        },
      });

      console.log("je suis connecté ", data.data.user);
      setIsConnect(true);

      localStorage.setItem("id", data.data.user._id);

      console.log("isconnect =", isConnect);

      setUser(data.data);

      return data.data.user;

      history.push("/admin");
      // props.history.push("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  const AuthValue = {
    isConnect,
    login,
    user,
    setUser,
  };

  // Englobe le provider dans
  return <AuthContext.Provider value={AuthValue} {...props} />;
};

// Export
export const Auth = () => React.useContext(AuthContext);
