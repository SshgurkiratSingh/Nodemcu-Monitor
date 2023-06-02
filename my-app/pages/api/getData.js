import dbConnect from "../../lib/dbConnect";
import CustomModel from "../../models/custom";
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // Connect to MongoDB
    await dbConnect();

    // Fetch the data from MongoDB
    const data = await CustomModel.findOne();

    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
