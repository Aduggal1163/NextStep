import mongoose from "mongoose";
const bookingSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Type.ObjectId,
        ref: 'User',
        required: true,
    },
    plannerId:{
        type: mongoose.Schema.Type.ObjectId,
        ref: 'Planner',
    },
    packageId:{
        type: mongoose.Schema.Type.ObjectId,
        ref: 'Package',
    },
    date:{
        type: date,
        required: true,
    },
    status:{
        type: String,
        required: true,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending',
    },
    customRequests:{
        type: String,
        default: '',
    },
    vendors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
    }],
    destinationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Destination',
        required: true,
    },
})

export const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;