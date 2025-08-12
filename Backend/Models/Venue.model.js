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
    rating: {
        type: Number,
        require: true,
        min : 1,
        max : 10,
    },
    description:{
        type: String,
        default: '',
    }
},{timestamps: true});

export const Venue = mongoose.model('Venue', venueSchema);
export default Venue;
