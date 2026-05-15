const sharp = require("sharp");
const { uploadFileToIk } = require("../services/storage.services");

const editImage = async (req, res) => {
  try {
    const { brightness, contrast, saturation, rotation, flipH, flipV } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    let image = sharp(req.file.buffer);

    // --- Rotate first ---
    const angle = Number(rotation) || 0;
    if (angle !== 0) {
      image = image.rotate(angle);
    }

    // --- Flip ---
    if (flipH === "true" || flipH === true) {
      image = image.flop(); // horizontal flip
    }
    if (flipV === "true" || flipV === true) {
      image = image.flip(); // vertical flip
    }

    // --- Brightness & Saturation via modulate ---
    const brightnessVal = Number(brightness);
    const saturationVal = Number(saturation);

    image = image.modulate({
      brightness: isNaN(brightnessVal) ? 1 : brightnessVal,
      saturation: isNaN(saturationVal) ? 1 : saturationVal,
    });

    // --- Contrast via linear (a * pixel + b) ---
    const contrastVal = Number(contrast);
    if (!isNaN(contrastVal) && contrastVal !== 1) {
      // centre around mid-grey: output = contrast*(input - 128) + 128
      image = image.linear(contrastVal, -(128 * contrastVal - 128));
    }

    const outputBuffer = await image.jpeg({ quality: 90 }).toBuffer();

    res.set("Content-Type", "image/jpeg");
    res.set("Content-Disposition", 'inline; filename="edited.jpg"');
    res.send(outputBuffer);
  } catch (error) {
    console.error("editImage error:", error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * POST /api/image/save
 * Applies the same transforms then uploads the result to ImageKit.
 * Returns the ImageKit URL.
 */
const saveToImageKit = async (req, res) => {
  try {
    const { brightness, contrast, saturation, rotation, flipH, flipV } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    let image = sharp(req.file.buffer);

    const angle = Number(rotation) || 0;
    if (angle !== 0) image = image.rotate(angle);

    if (flipH === "true" || flipH === true) image = image.flop();
    if (flipV === "true" || flipV === true) image = image.flip();

    const brightnessVal = Number(brightness);
    const saturationVal = Number(saturation);

    image = image.modulate({
      brightness: isNaN(brightnessVal) ? 1 : brightnessVal,
      saturation: isNaN(saturationVal) ? 1 : saturationVal,
    });

    const contrastVal = Number(contrast);
    if (!isNaN(contrastVal) && contrastVal !== 1) {
      image = image.linear(contrastVal, -(128 * contrastVal - 128));
    }

    const outputBuffer = await image.jpeg({ quality: 90 }).toBuffer();

    const base64Image = outputBuffer.toString("base64");
    const fileName = `edited-${Date.now()}.jpg`;

    const result = await uploadFileToIk(base64Image, fileName);

    res.json({
      success: true,
      url: result.url,
      fileId: result.fileId,
      name: result.name,
    });
  } catch (error) {
    console.error("saveToImageKit error:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { editImage, saveToImageKit };