const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(express.json());
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    methods: ["POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.post("/text-content", async (req, res) => {
  try {
    const { url } = req.body;
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const p = [];

    $("p").each((index, element) => {
      const content = $(element).text();
      if (content) {
        p.push(content);
      }
    });

    res.send(p);
  } catch (error) {
    console.error("Si è verificato un errore:", error);
    res
      .status(500)
      .send("Si è verificato un errore durante il recupero dell'h1.");
  }
});

app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});
