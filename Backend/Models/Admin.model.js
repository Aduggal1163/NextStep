import mongoose from "mongoose";   
const AdminSchema=new mongoose.Schema({
    adminName:{
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
    role:{
        type: String,
        enum: ['user', 'admin', 'planner', 'vendor'],
        default: 'admin',
    },
},{ timestamps:true})
const Admin = mongoose.model('Admin', AdminSchema);
export default Admin;