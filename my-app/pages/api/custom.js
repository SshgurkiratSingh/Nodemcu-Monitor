import fs from "fs";

export default function handler(req, res) {
  if (req.method === "POST") {
    // let jsonData = fs.readFileSync("./../../customisation.json");
    // let data = JSON.parse(jsonData);
    // data.sensor[req.body.select].title = req.body.title;
    // data.sensor[req.body.select].subtitle = req.body.subtitle;
    // data.sensor[req.body.select].description = req.body.description;
    // data.sensor[req.body.select].unit = req.body.unit;
    // data.sensor[req.body.select].guage = req.body.guage;
    // data.sensor[req.body.select].guage = req.body.maxValue;
    console.log(req.body);

    // fs.writeFileSync("customisation.json", JSON.stringify(data));

    res.redirect("/");
  } else {
    res.json("hi").status(405).end(); // Method Not Allowed
  }
}
