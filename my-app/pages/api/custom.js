import path from "path";
import { promises as fs } from "fs";
import dbConnect from "../../lib/dbConnect";
import CustomModel from "../../models/custom";
export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  if (method != "POST") {
    res.status(200).redirect("/");
  }
  let data = await CustomModel.findOne();

  data.sensor[req.body.select].title = req.body.title;
  data.sensor[req.body.select].maxValue = req.body.maxValue;
  data.sensor[req.body.select].description = req.body.description;
  data.sensor[req.body.select].unit = req.body.unit;
  await data.save();

  console.log(data);

  res.status(200).redirect("/");
}
