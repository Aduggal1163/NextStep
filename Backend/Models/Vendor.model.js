import mongoose from "mongoose";
const vendorSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 100,
    },
    role: {
      type: String,
      enum: ["user", "admin", "planner", "vendor"],
      default: "vendor",
    },
    servicesOffered: [
      {
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
    ],
    description: {
      type: String,
      default: "",
    },
    assignedWeddings: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Wedding",
      },
    ],
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);
const Vendor = mongoose.model("Vendor", vendorSchema);
export default Vendor;
