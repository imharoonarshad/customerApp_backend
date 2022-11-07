import mongoose from "mongoose";

const userSchema = mongoose.Schema({
   
    tname: String,
    desname: String,
    dateTime: String

});


const Customer = mongoose.model('Customer', userSchema)
export default Customer; 