import React, { useState, Fragment } from "react";
import { useLoginMutation } from "../../redux/action/authAction";
import Loader from "../../components/shared/Loader";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon, ExclamationIcon } from "@heroicons/react/outline";
import ModalComponent from "../../shared/ModalConfirm";
import ModalConfirm from "../../shared/ModalConfirm";

export default function Register(props) {
  const [loading, setLoading] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    password: "",
    confirmPassword: "",
    mail: "",
    picture: "",
    isAdmin: "",
    phone: "",
    houseNumber: "",
    nameAdress: "",
    nameCity: "",
    postCode: "",
  });

  let token = props.match.params.token;

  const [register] = useLoginMutation(token);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    // e.preventDefault();
    setLoading(true);
    let data = await register(formData);
    console.log(data.error);
    if (data.error?.status === 400) {
      setLoading(false);
      setOpen1(true);
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen">
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-blue-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Enregistrer vore compte !
            </h2>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md  ">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form className="space-y-5 ">
                <div className=" space-y-3">
                  <div>
                    <label
                      htmlFor="text"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nom
                    </label>
                    <div className="mt-1">
                      <input
                        value={formData.firstName}
                        onChange={handleChange}
                        id="firstName"
                        name="firstName"
                        type="firstName"
                        autoComplete="firstName"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Prénom
                    </label>
                    <div className="mt-1">
                      <input
                        value={formData.lastName}
                        onChange={handleChange}
                        id="lastName"
                        name="lastName"
                        type="lastName"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                {/* Adresse */}
                <div className="flex space-x-4">
                  <div className="w-1/4">
                    <label
                      htmlFor="text"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Rue
                    </label>
                    <div className="space-x-2">
                      <input
                        value={formData.houseNumber}
                        onChange={handleChange}
                        id="houseNumber"
                        name="houseNumber"
                        type="number"
                        autoComplete="houseNumber"
                        required
                        className="appearance-none block w-full  px-2 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="w-3/4">
                    <label
                      htmlFor="text"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Adresse
                    </label>
                    <input
                      value={formData.nameAdress}
                      onChange={handleChange}
                      id="nameAdress"
                      name="nameAdress"
                      type="text"
                      autoComplete="nameAdress"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                {/* Adresse Suite */}
                <div className="flex space-x-4">
                  <div className="w-2/5">
                    <label
                      htmlFor="text"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Code Postal
                    </label>
                    <div className="space-x-2">
                      <input
                        value={formData.postCode}
                        onChange={handleChange}
                        id="postCode"
                        name="postCode"
                        type="text"
                        maxLength={6}
                        autoComplete="postCode"
                        required
                        className="appearance-none block w-full  px-2 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="w-3/5">
                    <label
                      htmlFor="text"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Ville
                    </label>
                    <input
                      value={formData.nameCity}
                      onChange={handleChange}
                      id="nameCity"
                      name="nameCity"
                      type="text"
                      autoComplete="nameCity"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                {/* Phone */}
                <div className=" space-y-3">
                  <div>
                    <label
                      htmlFor="text"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Téléphone
                    </label>
                    <div className="mt-1">
                      <input
                        value={formData.phone}
                        onChange={handleChange}
                        id="phone"
                        name="phone"
                        type="number"
                        maxLength={10}
                        autoComplete="tel"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Mot de Passe */}
                <div className=" space-y-3">
                  <div>
                    <label
                      htmlFor="text"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Mot de passe
                    </label>
                    <div className="mt-1">
                      <input
                        value={formData.password}
                        onChange={handleChange}
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="password"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Confirmer le Mot de passe
                    </label>
                    <div className="mt-1">
                      <input
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center"></div>

                  <div className="text-sm">
                    <a
                      href="/forgot-password"
                      className="font-medium text-current hover:text-hovers hover:underline"
                    >
                      Mot de passe oublier ?
                    </a>
                  </div>
                </div>
                <div>
                  <button
                    // onClick={onSubmit}
                    onClick={() => setOpen1(true)}
                    className="w-full flex justify-center py-3 mx-10 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Enregistrer le Compte
                  </button>
                </div>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500"> ... </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <ModalConfirm
        setOpen={setOpen1}
        open={open1}
        text={"Êtes-vous sûr de vouloir Valider ?"}
        titre={"Enregistrer le nouveau compte"}
        fnAction={onSubmit}
      />
    </div>
  );
}
