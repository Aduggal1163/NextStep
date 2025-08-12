import mongoose from 'mongoose';
const WeddingPlanSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    destination:{
        type: String,
        required: true
    },
    packageId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package',
    },
    customServices:{
        type: [String],
        default: []
    },
    budget:{
        type: Number,
        required: true
    },
    vendorsList:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vendor'
    }],
    guestDetails: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'guest',
    }],
    weddingDate:{
        type: Date,
        required: true
    },
    status:{
        type: String,
        enum: ['Planning', 'Confirmed', 'Completed', 'Cancelled'],
        default: 'Planning',
    }
},{timestamps: true});
const WeddingPlan=mongoose.model("WeddingPlan",WeddingPlanSchema);
export default WeddingPlan