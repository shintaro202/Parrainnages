const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const cors = require("cors");
const { ControlerFichierElecteurs, ControlerElecteurs } = require("./plsql-functions");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(bodyParser.json());
app.use(cors());

app.post("/api/import-electoral-file", upload.single("file"), async (req, res) => {
  const file = req.file;
  const checksum = req.body.checksum;

  if (!file || !checksum) {
    return res.status(400).json({ error: "File and checksum are required." });
  }

  try {
    const fileChecksum = await ControlerFichierElecteurs(file.path, checksum);

    if (!fileChecksum.success) {
      return res.status(400).json({ error: fileChecksum.error });
    }

    const electorData = await ControlerElecteurs(file.path);

    if (!electorData.success) {
      return res.status(400).json({ error: electorData.error });
    }

    // Store the data in a temporary table here

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});