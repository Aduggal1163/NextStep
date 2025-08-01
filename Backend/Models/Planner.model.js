import mongoose from "mongoose";

const plannerSchema = new mongoose.Schema({
  plannerName: {
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
  contactDetails: {
    type: String,
    required: true,
    minLength: 10,
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'planner', 'vendor'],
    default: 'planner',
  },
  assignedBookings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
  }],
  customPackages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CustomPackage',
  }],
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
  }],
}, { timestamps: true });

const Planner = mongoose.model('Planner', plannerSchema);
export default Planner;
