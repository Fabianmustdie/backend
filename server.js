const express = require("express");
const { agregar, consultar, like } = require("./funciones");
const app = express();
const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 3000;
const protocol = process.env.PROTOCOL || "http";
app.listen(port, (req, res) => {
  console.log(`Server ${protocol}://${host}:${port}`);
});

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/post", async (req, res) => {
  try {
    const dato = Object.values(req.body);
    const result = await agregar(dato);
    res.send(result);
  } catch (err) {
    console.log("Error al crear post", err);
  }
});
app.get("/posts", async (req, res) => {
  try {
    const result = await consultar();
    res.send(result);
  } catch (err) {
    console.error("Error al ver posts", err);
  }
});

app.put("/post/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await like(id);
    res.json(result);
  } catch (err) {
    console.error("Error al dar like", err);
  }
});
