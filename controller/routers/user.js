// import express from "express";
import Signupschema from "../../model/signupschema.js";
import bcrypt from "bcrypt";
import  jwt  from "jsonwebtoken";




// const Signuproute = express.Router();
const secret = "test";

export const login = async (req, res) => {
    console.log(req.body)
    const { email,password } = req.body

    try {
      const oldUser = await Signupschema.findOne({email});
  
      if (!oldUser)
        return res.status(404).json({ message: "User doesn't exist" });
  
      const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
  
      if (!isPasswordCorrect)
        return res.status(400).json({success:false, message: "Invalid credentials" });
  
      const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
        expiresIn: "2h",
      });
  
      res.status(200).json({ success:true, token });
    } catch (err) {
      res.status(500).json({success:false, message: "Something went wrong" });
    }
  };


export const signup = async (req, res) => {
    console.log(req.body)
    const { email,password,custoname } = req.body
    // console.log("value", signupValues)
    // const customerService = new Signupschema({

    //     custoname: signupValues.custoname,
    //     email: signupValues.email,
    //     password: signupValues.password
        

    // })

    try {
        const oldUser = await Signupschema.findOne({email})

        if (oldUser)
            return res.status(400).json({ message: "User already exists" })
            // console.log(password)

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await Signupschema.create({
            email,
            password: hashedPassword,
            custoname,
        });

        const token = jwt.sign({ email: result.email, id: result._id }, secret, {
            expiresIn: "1h",
        });
        res.status(201).json({ result, token});
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });

        console.log(error);
    }

    
}




// Signuproute.get("/", async (req, res) => {
//     const data = await Signupschema.find({})
//     console.log("data",data)
//     res.send(data)
//     res.end()
// })

// export default Signuproute;







