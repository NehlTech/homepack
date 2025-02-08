import { uploadImage } from "../actions/product2";
import fs from "fs/promises";

async function testUpload() {
  try {
    const imageBuffer = await fs.readFile("./public/image1.png"); // Path relative to test script
    const file = new File([imageBuffer], "image1.png", { type: "image/png" });

    const url = await uploadImage(file);
    console.log("Test upload returned:", url);
  } catch (error) {
    console.error("Test upload error:", error);
  }
}

testUpload();
