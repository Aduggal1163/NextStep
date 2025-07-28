import mongoose from "mongoose";
const packageSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    servicesIncluded: {
        type: mongoose.Schema.Types.objectId,
        ref: 'Service',
        required: true,
    },
    basePrice:{
        type: Number,
        required: true,
    },
    customizable:{
        type: Boolean,
        required: true,
    }
},{timestamps: true});

export const Package = mongoose.model('Package', packageSchema);
export default Package;