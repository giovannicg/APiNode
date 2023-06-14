const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000; // Puerto en el que se ejecutará el servidor
app.use(express.json());

// Conexión a la base de datos MongoDB
mongoose.connect(
  "mongodb+srv://giovanni:Loannes21@cluster0.hy43r.mongodb.net/LocationDB?retryWrites=true&w=majority"
);

// Eventos de conexión de MongoDB
mongoose.connection.on("connected", () => {
  console.log("Conexión a la base de datos establecida");
});

mongoose.connection.on("error", (err) => {
  console.error("Error al conectar a la base de datos:", err);
});

// Definir un modelo de ejemplo para la colección
const locationModel = new mongoose.Schema({
  comentario: {type:String,required:true},
  latitude: {type:Number,required:true},
  longitude: {type:Number,required:true},
  status: {type:String,required:true},
  usuario: {type:String,required:true},
  datetime: {type:Date,default:Date.now}
});

const LocationModel = mongoose.model("Location", locationModel);

// Middleware to parse JSON data
app.use(express.json());

// Ruta para insertar un nuevo registro
app.post("/api/insert",async (req, res) => {
  const { comentario, latitude, longitude, status, usuario } = req.body;
  console.log(req.body);

  const newRecord = new LocationModel({
    comentario,
    latitude,
    longitude,
    status,
    usuario,
  });
  try {
    const result = await newRecord.save();
    console.log(result);
    res.status(200).send("Registro creado correctamente");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al crear el registro");
  }
});

app.get("", (req, res) => {
  res.send("Hola Mundo");
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
