import mongoose from "mongoose";

const CustomSchema = new mongoose.Schema({
  sensor: {
    value1: {
      maxValue: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      unit: {
        type: String,
      },
      gauge: {
        type: String,
      },
      image: {
        type: String,
      },
    },
    value2: {
      maxValue: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      subtitle: {
        type: String,
        required: true,
      },
      unit: {
        type: String,
        required: true,
      },
      image: {
        type: String,
      },
    },
    value3: {
      maxValue: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      subtitle: {
        type: String,
        required: true,
      },
      unit: {
        type: String,
        required: true,
      },
      image: {
        type: String,
      },
    },
    value4: {
      maxValue: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      subtitle: {
        type: String,
        required: true,
      },
      unit: {
        type: String,
        required: true,
      },
      gauge: {
        type: String,
      },
      image: {
        type: String,
      },
    },
  },
});

const CustomModel =
  mongoose.models.custom || mongoose.model("custom", CustomSchema);

export default CustomModel;
