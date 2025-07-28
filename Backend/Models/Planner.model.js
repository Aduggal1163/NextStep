import mongoose from "mongoose";
const plannerSchema = new mongoose.Schema({
  plannerName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 30,
  },
    contactDetails: {
        type: Number,
        required: true,
        minLength: 10,
    },
    role:{
        enum:['user','admin','planner','vendor'],
        type: String,
        default: 'planner',
    },
    assignedBookings:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
    }],
    customPackages:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CustomPackage',
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
    }],
},{timestamps: true});
export const Planner = mongoose.model('Planner', plannerSchema);
export default Planner;