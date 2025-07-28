import mongoose from "mongoose";
const venueSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    capacity: {
        type : Number,
        required: true,
    },
    features:{
        type: String,
        required: true,
    },
},{timestamps: true});

export const Venue = mongoose.model('Venue', venueSchema);
export default Venue;
