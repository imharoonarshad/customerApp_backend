import mongoose from "mongoose";

const signSchema = mongoose.Schema({
   
    custoname: String,
    email: String,
    password: String,
    id: String

});
 

const Signupschema = mongoose.model('SignUp', signSchema)
export default Signupschema; 