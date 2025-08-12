import mongoose from "mongoose";
const packageSchema = new mongoose.Schema(
  {
    plannerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "planner",
    },
    title: {
      type: String,
      required: true,
    },
    servicesIncluded: {
      type: String,
      enum: [
        "decor",
        "makeup",
        "food",
        "photography",
        "music",
        "transport",
        "lighting",
        "drinks",
        "decoration",
        "other",
      ],
      required: true,
    },
    description: {
      type: String,
    },
    basePrice: {
      type: Number,
      required: true,
    },
    customizable: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export const Package = mongoose.model("Package", packageSchema);
export default Package;
