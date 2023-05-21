import path from "path";
import { promises as fs } from "fs";

export default async function handler(req, res) {
  const jsonFilePath = path.join(process.cwd(), "customisation.json");

  try {
    const fileContents = await fs.readFile(jsonFilePath, "utf-8");
    const data = JSON.parse(fileContents);

    data.sensor[req.body.select].title = req.body.title;
    data.sensor[req.body.select].maxValue = req.body.maxValue;
    data.sensor[req.body.select].description = req.body.description;
    data.sensor[req.body.select].unit = req.body.unit;

    await fs.writeFile(jsonFilePath, JSON.stringify(data));

    console.log(req.body);
  } catch (error) {
    console.error(error);
  }

  res.status(200).redirect("/");
}
