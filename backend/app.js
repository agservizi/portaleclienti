const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./config/db");

const authRoutes = require("./routes/auth");
const contrattiRoutes = require("./routes/contratti");
const richiesteRoutes = require("./routes/richieste");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rotte
app.use("/api/auth", authRoutes);
app.use("/api/contratti", contrattiRoutes);
app.use("/api/richieste", richiesteRoutes);

// Avvio del server
app.listen(port, () => {
    console.log(`Server in esecuzione su http://localhost:${port}`);
});