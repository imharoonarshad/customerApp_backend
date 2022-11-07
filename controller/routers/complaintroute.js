import express from "express";
import Customer from "../../model/complaintschema.js";
import { signup, login } from "./user.js";
// import { signup } from "./user.js";


const route = express.Router();

route.post("/", async (req, res) => {
    console.log(req.body)
    const { formValues } = req.body
    console.log('sss', formValues)
    const customerService = new Customer({
    
        tname: formValues.tname,
        desname: formValues.desname,
        dateTime: formValues.dateTime
        
    })
    const data = await customerService.save()
    console.log(data)
    res.end()
}) 

route.get("/", async (req, res) => {
    const data = await Customer.find({})
    console.log("data",data)
    res.send(data)
    res.end()
})


route.post('/signup', signup)

route.post('/login',login)




export default route;