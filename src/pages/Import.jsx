import React, { useState } from "react";
import Navbar from "../components/Navbar/Index";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import "./styles.css";

function Import() {
  const [sidebarToggle] = useOutletContext();
  const [file, setFile] = useState(null);
  const [checksum, setChecksum] = useState("");
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleChecksumChange = (event) => {
    setChecksum(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file || !checksum) {
      setMessage("Please select a file and enter a checksum.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("checksum", checksum);

      const response = await axios.post("/api/import-electoral-file", formData);
      const resultat = response.data;

      if (resultat.success) {
        setMessage("File imported successfully. Please wait for validation.");
      } else {
        setMessage(resultat.error);
      }
    } catch (error) {
      console.error(error);
      setMessage("Error while importing the file.");
    }
  };

  return (
    <>
      <main className="h-full">
        <Navbar toggle={sidebarToggle} />

        {/* Main Content */}
        <div className="mainCard flex justify-center items-center">
          <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md max-w-lg">
            <h2 className="text-center mb-4">Importer le fichier électoral</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="file">Fichier CSV:</label>
                <input type="file" id="file" onChange={handleFileChange} className="w-full border py-2 px-3 rounded-md" />
              </div>

              <div className="form-group">
                <label htmlFor="checksum" className="text-sm text-gray-600">Empreinte CHECKSUM:</label>
                <input type="text" id="checksum" value={checksum} onChange={handleChecksumChange} className="w-full border py-2 px-3 rounded-md" />
              </div>
              <div className="button-container">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-4">Valider</button>
              </div>
            </form>
            <div className="message text-center mt-4">{message}</div>
          </div>
        </div>
        
      </main>
    </>
  );
}

export default Import;
