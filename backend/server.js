const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.static("public"));

const devices = {
  macbook: { width: 2880, height: 1800 },
  iphone15: { width: 1179, height: 2556 },
  samsungGalaxy: { width: 1440, height: 3200 },
  pixel: { width: 1080, height: 2340 },
};

app.post("/upload", upload.single("wallpaper"), async (req, res) => {
  const { file } = req;

  if (!file) return res.status(400).send("No file uploaded.");

  const processedImages = [];
  for (const [device, dimensions] of Object.entries(devices)) {
    const outputPath = `processed/${device}-${file.filename}.jpg`;

    await sharp(file.path)
      .resize(dimensions.width, dimensions.height)
      .toFile(outputPath);

    processedImages.push({ device, path: outputPath });
  }

  fs.unlinkSync(file.path); // Clean up uploaded file
  res.json({ images: processedImages });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
