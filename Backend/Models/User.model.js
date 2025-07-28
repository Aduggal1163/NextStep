import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
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
        maxLength: 30,
    },
    contactDetails:{
        type:Number,
        required: true,
        minLength: 10
    },
    role:{
        enum:['user','admin','planner','vendor'],
        type: String,
        default: 'user',
    },
    weddingPlan:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WeddingPlan',
    },
    paymentHistory:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PaymentHistory',
    }],
    reviews:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
    }],
},{timestamps: true});
const User = mongoose.model('User', userSchema);
export default User;