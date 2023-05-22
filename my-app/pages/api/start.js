import path from "path";
import { promises as fs } from "fs";

export default async function handler(req, res) {
  const jsonFilePath = path.join(process.cwd(), "customisation.json");

  try {
    const fileContents = await fs.readFile(jsonFilePath, "utf-8");
    const data = JSON.parse(fileContents);

    res.status(200).json({ fetchServer: data.fetchServer });
  } catch (error) {
    console.error(error);
  }
}
