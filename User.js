import mongoose from 'mongoose'

import { Schema } from 'mongoose';


let userschema=mongoose.Schema({
username:{
    type:String,

},
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
   
})


let User=mongoose.model("User",userschema);
export default User