import mongoose from 'mongoose';
const vendorSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
        minLength: 8,
        maxLength: 100,
    },
    role:{
        type: String,
        enum:['user','admin','planner','vendor'],
        default: 'vendor',
    },
    servicesOffered :[{
        type:mongoose.Types.ObjectId,
        ref: 'Service'
    }],
    assignedWeddings :[{
        type: mongoose.Types.ObjectId,
        ref: 'Wedding'
    }],
    reviews: [{
        type: mongoose.Types.ObjectId,
        ref: 'Review'
    }],
},{timestamps: true});
const Vendor = mongoose.model('Vendor', vendorSchema);
export default Vendor;