import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Index";
import { useOutletContext } from "react-router-dom";
import UserTable from "./UserTable";
import axios from "axios";

function Table() {
  const [sidebarToggle] = useOutletContext();

  const [loading, setLoading] = useState(false);

  const dataHeader = [
    {
      key: "nomcomplet",
      label: "Nom Complet",
    },
    {
      key: "dateNaissance",
      label: "Date de Naissance",
    },
    {
      key: "lieuNaissance",
      label: "Lieu de Naissance",
    },
    {
      key: "profession",
      label: "Profession",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "numeroCarteElecteur",
      label: "Numero de Carte d'Electeur",
    },
  ];

  const [data, setData] = useState([]);

  const handleDelete = () => {};

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://your-remote-server.com/candidates");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      <main className="h-full">
        <Navbar toggle={sidebarToggle} />

        {/* Main Content */}
        <div className="mainCard">
          <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md">
            <UserTable
              loading={loading}
              dataHeader={dataHeader}
              data={data}
              handleDelete={handleDelete}
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default Table;