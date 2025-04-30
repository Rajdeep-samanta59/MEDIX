const mongoose= require("mongoose");
const Medix=require("./medicine.js");


const CartSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    product:[{
        prod:{
            type: mongoose.Schema.Types.ObjectId, ref: 'Medix' ,
            
        },
       qty:{type:Number,required:true}

}]
})

module.exports= mongoose.model("Cart",CartSchema);