import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Index";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faPhone } from "@fortawesome/free-solid-svg-icons";

function Form() {
  const [sidebarToggle] = useOutletContext();
  const [form, setForm] = useState({
    nomComplet: "",
    photo: "",
    biographie: "",
    partiPolitique: "",
    numeroCarteElecteur: "",
    dateNaissance: "",
    lieuNaissance: "",
    profession: "",
    email: "",
  });
  const [candidate, setCandidate] = useState(null);
  const [candidateId, setCandidateId] = useState("");
  const [error, setError] = useState("");
  const [isNew, setIsNew] = useState(true);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCandidateIdChange = (e) => {
    setCandidateId(e.target.value);
    setError("");
    setIsNew(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(`https://example.com/api/electeurs/${candidateId}`)
      .then((response) => {
        if (response.data.numeroCarteElecteur) {
          setCandidate(response.data);
          setForm({
            nomComplet: response.data.nomComplet,
            photo: response.data.photo,
            biographie: response.data.biographie,
            partiPolitique: response.data.partiPolitique,
            dateNaissance: response.data.dateNaissance,
            lieuNaissance: response.data.lieuNaissance,
            profession: response.data.profession,
            email: response.data.email,
          });
          setIsNew(false);
          setError("");
        } else {
          setError("Le candidat considéré n’est pas présent dans le fichier électoral");
        }
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setError("Le candidat considéré n’est pas présent dans le fichier électoral");
        } else {
          setError("Une erreur s'est produite lors de la récupération des données du candidat");
        }
      });
  };

  return (
    <>
      <main className="h-full">
        <Navbar toggle={sidebarToggle} />

        {/* Main Content */}
        <div className="mainCard">
          <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md">
            <form onSubmit={handleSubmit}>
              {/* Numéro de carte électeur */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="numeroCarteElecteur"
                    className="text-sm text-gray-600"
                  >
                    Numéro de carte électeur
                  </label>
                  <input
                    id="numeroCarteElecteur"
                    type="text"
                    name="numeroCarteElecteur"
                    value={candidateId}
                    onChange={handleCandidateIdChange}
                    className="text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                    placeholder="Numéro de carte électeur"
                    style={{ marginBottom: "1.5rem" }}
                  />
                  {error && <p className="text-red-500">{error}</p>}
                  {!isNew && <p className="text-green-500">Candidat déjà enregistré !</p>}
                </div>
              </div>

              {candidate && (
                <>
                  {/* Nom complet */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="nomComplet" className="text-sm text-gray-600">
                        Nom complet
                      </label>
                      <input
                        id="nomComplet"
                        type="text"
                        name="nomComplet"
                        value={form.nomComplet}
                        onChange={handleChange}
                        className="text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                        placeholder="Nom complet"
                        readOnly
                      />
                    </div>

                    {/* Date de naissance */}
                    <div>
                      <label htmlFor="dateNaissance" className="text-sm text-gray-600">
                        Date de naissance
                      </label>
                      <input
                        id="dateNaissance"
                        type="date"
                        name="dateNaissance"
                        value={form.dateNaissance}
                        onChange={handleChange}
                        className="text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                        placeholder="Date de naissance"
                        readOnly
                      />
                    </div>
                  </div>

                  {/* Lieu de naissance */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="lieuNaissance" className="text-sm text-gray-600">
                        Lieu de naissance
                      </label>
                      <input
                        id="lieuNaissance"
                        type="text"
                        name="lieuNaissance"
                        value={form.lieuNaissance}
                        onChange={handleChange}
                        className="text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                        placeholder="Lieu de naissance"
                        readOnly
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="text-sm text-gray-600">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                        placeholder="Email"
                      />
                    </div></div>

                  {/* Telephone */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="telephone" className="text-sm text-gray-600">
                        Telephone
                      </label>
                      <input
                        id="telephone"
                        type="tel"
                        name="telephone"
                        value={form.telephone}
                        onChange={handleChange}
                        className="text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                        placeholder="Telephone"
                      />
                    </div>
                  </div>

                  {/* Parti politique */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="partiPolitique" className="text-sm text-gray-600">
                        Parti politique
                      </label>
                      <input
                        id="partiPolitique"
                        type="text"
                        name="partiPolitique"
                        value={form.partiPolitique}
                        onChange={handleChange}
                        className="text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                        placeholder="Parti politique"
                      />
                    </div>
                  </div>

                  {/* Slogan */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="slogan" className="text-sm text-gray-600">
                        Slogan
                      </label>
                      <input
                        id="slogan"
                        type="text"
                        name="slogan"
                        value={form.slogan}
                        onChange={handleChange}
                        className="text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                        placeholder="Slogan"
                      />
                    </div>
                  </div>

                  {/* Photo */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="photo" className="text-sm text-gray-600">
                        Photo
                      </label>
                      <input
                        id="photo"
                        type="file"
                        name="photo"
                        onChange={(e) => setForm({ ...form, photo: e.target.files[0] })}
                        className="text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                        placeholder="Photo"
                      />
                    </div>
                  </div>

                  {/* Couleurs du parti */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="couleursParti" className="text-sm text-gray-600">
                        Couleurs du parti
                      </label>
                      <input
                        id="couleursParti"
                        type="text"
                        name="couleursParti"
                        value={form.couleursParti.join(", ")}
                        onChange={(e) =>
                          setForm({
                           ...form,
                            couleursParti: e.target.value.split(",").map((color) => color.trim()),
                          })
                        }
                        className="text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                        placeholder="Couleurs du parti"
                      />
                    </div>
                  </div>

                  {/* Page du parti */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="pageParti" className="text-sm text-gray-600">
                        Page du parti
                      </label>
                      <input
                        id="pageParti"
                        type="text"
                        name="pageParti"
                        value={form.pageParti}
                        onChange={handleChange}
                        className="text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                        placeholder="Page du parti"
                      />
                    </div>
                  </div>
                  </>
                  )}
                  {/* Submit button */}
                  <div className="mt-6">
                    <button className="bg-emerald-600 text-gray-100 px-3 py-2 rounded-lg shadow-lg text-sm">
                      Enregistrer
                    </button>
                  </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default Form;