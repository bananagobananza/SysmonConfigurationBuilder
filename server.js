const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 5500;
app.use(express.static(__dirname));
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));
app.get("/api/config", (req, res) => {
  const filePath = path.join(__dirname, "json", "test.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).json({ error: "Failed to load configuration file" });
      return;
    }
    res.json(JSON.parse(data));
  });
});
app.get("*", (req, res) => {
  if(req.path.startsWith("/api/")){
    return res.status(404).send("API route not found");
  }
  res.sendFile(path.join(__dirname, "index.html"));
});
app.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}/`);
});
