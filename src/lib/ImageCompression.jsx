import sharp from "sharp";

export const compressImage = async (file, preset) => {
  try {
    // Konversi file ke Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Kompresi gambar menggunakan sharp
    const compressedImage = await sharp(buffer)
      .resize({
        width:
          preset === "profile"
            ? 500
            : preset === "cover"
            ? 1200
            : preset === "portrait"
            ? 675
            : 1200,
        height:
          preset === "profile"
            ? 500
            : preset === "cover"
            ? 675
            : preset === "portrait"
            ? 1200
            : 1200,
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .webp({ quality: 80 })
      .toBuffer();

    // Buat file baru dari buffer yang di kompresi
    return new File([compressedImage], file.name);
  } catch (error) {}
};
