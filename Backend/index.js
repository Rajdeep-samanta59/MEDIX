// const express= require('express');
// const app= express();
// const bodyParser = require('body-parser'); // Import body-parser
// const mongoose=require('mongoose');
// const cors=require('cors');
// const Medix=require("./models/medicine.js");
// const jwt = require('jsonwebtoken');
// const Razorpay=require('razorpay');
// require("dotenv").config();
// // const session=require("express-session");
// app.use(express.json());

// const nodemailer = require('nodemailer');

// // const passport=require("passport")
// // const LocalStrategy=require("passport-local");
// const bcrypt = require('bcryptjs');

// const User=require('./models/user.js');
// const Cart=require('./models/cart.js');
// const Address=require('./models/Address.js');
// const Pay=require("./models/Payment.js");
// const { validatePaymentVerification } = require('razorpay/dist/utils/razorpay-utils');
// // const Order=require('./models/Order.js');

// // const Razorpay=require('razorpay')
// // cors // to talk to frontend

// app.use(cors({
//   origin: 'http://localhost:5173',credentials:true}));
// app.use(bodyParser.json('body-parser'));
// app.use(express.urlencoded({extended:true}));

// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/medweb');
// }

// const secretKey = 'kjhdfuisehfuierl337dfjgdkq82df378u2dfdjhdf';

// app.post('/order',async(req,res)=>{

//   try{
//     console.log("hi");
//   const razorpay = new Razorpay({
//   key_id: process.env.KEY_ID,
//   key_secret: process.env.SECRET_KEY,
// });

// const options= req.body;

// console.log(options);

// const order=await razorpay.orders.create(options);

// console.log(order);

// res.json({order:order});

//   }catch(e){
//     console.log(e);
//     console.log(e.message)
//   }

// })

// app.get('/getKey',(req,res)=>{
//   let key=process.env.KEY_ID;
//   console.log(key)
//   res.json({key:process.env.KEY_ID});
// })

// app.post('/paymentVerification',async(req,res)=>{

//   // console.log(req.body);

//   const {
//     razorpay_order_id,
//     razorpay_payment_id,
//     razorpay_signature,
//     user_id,
//     product,
//     status,
//     amount,
//     currency,
//     address,
//     mobile,
//     name
// } = req.body;

// const instance = new Razorpay({ key_id: process.env.KEY_ID, key_secret: process.env.SECRET_KEY })

// // console.log(validatePaymentVerification());

//   let isValid=validatePaymentVerification({"order_id": razorpay_order_id, "payment_id": razorpay_payment_id }, razorpay_signature, process.env.SECRET_KEY);

//   if(isValid){

//     const newPayment = new Pay({
//       razorpay_payment_id,
//       razorpay_order_id,
//       razorpay_signature,
//       user_id,
//       product,
//       status,
//       amount,
//       currency,
//       address,
//       mobile,
//       name
//   });
// // console.log(newPayment);
//   await newPayment.save();

//   // let order_id=razorpay_order_id;
//   let user=await User.findOne({_id:user_id});

//   let mail=user.email;

//   console.log(razorpay_order_id,mail);

//   const subject = 'Order Accepted';
//   const text = `Your order ${razorpay_order_id} has been accepted. Thank you for shopping with medix!`;

//   const mail_Options={
//     from:process.env.EMAIL_USER,
//     to:mail,
//     subject:subject,
//     text:text,
//   }

//   // mail accept

//   const transporter =nodemailer.createTransport({
//     service:'Gmail',
//     auth:{
//       user:process.env.EMAIL_USER,
//       pass:process.env.EMAIL_PASS
//     }
//   })

//   transporter.sendMail(mail_Options, (error, info) => {
//     if (error) {
//       console.error('Error sending email:', error);
//     } else {
//       console.log('Email sent:', info.response);
//     }
//   });

//   res.json({mess:"okk"})

//   }

// })

// app.get('/getAddress',async(req,res)=>{
// let{id}=req.query;
// console.log(id);
// let add=await Address.findById(id);
// // console.log(add);
// res.json({finAdd:add});
// })

// app.get("/",async(req,res)=>{
//   try{
//     // console.log(req.user,"haa mai hu");
//     // console.log(req.query);
// let{search}=req.query;

// search=search.toLowerCase();
// let d=await Medix.findOne({name:search})
// // console.log(d);
// res.json({med:d})
//   }
//   catch(err){
//     console.log(err.message);
//   }
// })

// app.get('/getBar/:med',async(req,res)=>{
//   let{med}=req.params;
//   // console.log(med);
//   if(med=="#"){return res.json({ans:[]})};
//   let ans=await Medix.find({name:{$regex:`^${med}`,$options:'i'}});
//   res.json({ans});
// })

// app.get('/getNum',async(req,res)=>{
//     let data= await User.find({});
//     res.json({num:data.length});
// })

// app.post('/getUser',async(req,res)=>{
//   let {token}=req.body;
//   console.log(token);

//   if(token==null){
//     return res.json({details:"nf"});

//   }

//   const decoded = jwt.verify(token, secretKey);
//   // Extract the username from the decoded token

//   const { username } = decoded;

//   let details=await User.findOne({username:username});
//   // console.log(details);

//   res.json({details:details})

// })

// app.post('/signin',async(req,res)=>{
//   try{
//     let {formData}=req.body;
//     // console.log(formData);
//     let{email,username,password}=formData;

//     let user= await User.findOne({username:username});

//     if(user){
//      return res.json({mess:"already"});
//     }

//     let encyPass=await bcrypt.hash(password,15);

//     const newUser= new User(
//       {email:email,
//         username:username,
//         password:encyPass
//       });

//       await newUser.save();

//     let newUsrCart=new Cart({
//         email:email,
//         product:[]
//     })
//     await newUsrCart.save();
//     // req.flash("success","Weclome new user");
//     res.json({mess:"okk"})

//     }
//     catch(e){

//         res.json({mess:e.message});
//     }
// })

// app.get('/listOrder',async(req,res)=>{

//   let {user_id}=req.query;

//   let order=await Pay.find({user_id:user_id}).populate('product.prod');

//   console.log(order);
//   res.json({order:order});

// })

// app.post('/login', async function(req, res) {

//   // console.log(req.body);
//   let {formData}=req.body;

//   let {username,password}=formData;

//   let chkUser= await User.findOne({username:username})

//   console.log(chkUser);

//   if(!chkUser){
//     return res.json({mess:"nope User exists"});
//   }

//   if(await bcrypt.compare(password,chkUser.password)){
//     //  const token=jwt.sign({},secretKey);
//     const userObject = chkUser.toObject();
//      const token = jwt.sign(userObject, secretKey); // Include user object in payload

//      if(token){
//       return res.json({data:token});
//      }else{
//       return res.json({mess:"error"})
//      }

//   }

//   return res.json({mess:"pass not match"});

//   })

//   app.get("/getCart/:name",async(req,res)=>{
// let{name}=req.params;
// let cartData=await Cart.findOne({email:name}).populate('product.prod');

// res.json({data:cartData});
//   })

//   app.post("/cart/:mail/:id",async(req,res)=>{

//     let {mail}=req.params;
//     let {id}=req.params;

//     let usr=await Cart.findOne({email:mail});
//     let {product}=usr;

//     let Med=await Medix.findById(id);

//     let chk=false;
//     for(let prd of product){

//         if(prd.prod.valueOf()===id){
//             chk=true;break;
//         }
//     }

//     if(!chk){
//         // console.log("jhj")
//         let ans={prod:Med , qty:1};
//         await Cart.findOneAndUpdate({email:mail},{$set:{product:[...product,ans]}});
//     }

//     // let carts=await Cart.find({name:req.user.username});

//     res.json({result:"data add"})

// })

// app.get('/getRandomMedi',async(req,res)=>{

//   let dataRandom=await Medix.find({});

//   let medi=[];

//   for(let i=0;i<4;i++){
//        let len=dataRandom.length;
//        let idx=Math.floor(Math.random()*len);
//        medi.push(dataRandom[idx]);
//        dataRandom.splice(idx,1);
//   }

//   // console.log(medi);

//   res.json({medi:medi});

// })

// app.get('/getDataClk/:id',async(req,res)=>{
//   let {id}=req.params;
//   let med=await Medix.findOne({_id:id});
//   // console.log(med)
//   res.json({med});

// })

// app.get('/getOrder',async(req,res)=>{
//   let{mail}=req.query;

//   console.log(mail);

//   let Order=await Cart.findOne({email:mail}).populate('product.prod');
//   console.log(Order);

//   res.json({order:Order});

// })

// app.post('/addcart/:username',async(req,res)=>{
//   let {username}=req.params;
// let {product}=req.body;
// console.log(product,username)
// let data=await Cart.findOneAndUpdate({email:username},{$set:{product:product}},{new:true}).populate('product.prod');

// res.json({value:data.product});
// })

// app.post('/saveAdd',async(req,res)=>{

//   let {add,login}=req.body;
//   let data= new Address(add);
//   data.user=login
//   // console.log(data);
//   await data.save();
//   res.json({data:"ok"});

// })

// app.get('/getUserAdd/:id',async(req,res)=>{

//   let {id}=req.params;

//   let add=await Address.find({user:id})
//   // console.log(add);

//   res.json({add:add})

// })

// app.use((err,req,res,next)=>{
//   console.log(err.message)
// })

// app.listen(8080,()=>{
//     console.log("app listing");
// })

// down is the same code  but added comments by some ai agent

// Importing required modules

const express = require("express"); // express framework
const app = express();
const bodyParser = require("body-parser"); // parses incoming request bodies
const mongoose = require("mongoose"); // to interact with MongoDB database
const cors = require("cors"); // to allow cross-origin requests
const Medix = require("./models/medicine.js"); // Medicine model
const jwt = require("jsonwebtoken"); // to create and verify JSON web tokens
const Razorpay = require("razorpay"); // for payment gateway integration
require("dotenv").config(); // to load environment variables from a .env file
const nodemailer = require("nodemailer"); // for sending emails
const bcrypt = require("bcryptjs"); // for password hashing

// Importing other models
const User = require("./models/user.js");
const Cart = require("./models/cart.js");
const Address = require("./models/Address.js");
const Pay = require("./models/Payment.js");
const {
  validatePaymentVerification,
} = require("razorpay/dist/utils/razorpay-utils");

// Middlewares
app.use(express.json()); // to parse JSON data sent from frontend
app.use(
  cors({
    origin: "http://localhost:5173",
    // allowing only this frontend URL to connect
    // That means, only the frontend running at port 5173
    // (likely your React app) will be allowed to send requests to the
    // backend running on port 8080.
    credentials: true,
    /**This option allows the server to accept cookies or authorization headers (like JWT tokens) sent from the frontend.
In simple terms, it enables sharing authentication information across domains (frontend and backend). */
  })
);
app.use(bodyParser.json("body-parser")); // body-parser middleware
app.use(express.urlencoded({ extended: true })); // to parse form data

// Connect to MongoDB database
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/medweb"); // local mongo db
}

// Secret key used for signing JWT tokens
const secretKey = "kjhdfuisehfuierl337dfjgdkq82df378u2dfdjhdf";

// ========================== ROUTES =============================

// Create Razorpay Order
app.post("/order", async (req, res) => {
  try {
    console.log("Order creation called");
    // a new instance of Razorpay is cerated with the key_id and key_secret from the environment variables
    const razorpay = new Razorpay({
      key_id: process.env.KEY_ID,
      key_secret: process.env.SECRET_KEY,
    });

    const options = req.body; // options sent from frontend
    console.log(options);

    const order = await razorpay.orders.create(options); // order object is created using Razorpay API this contains order details
    console.log(order);

    res.json({ order: order }); // backend sends the order object to frontend in json format
  } catch (e) {
    console.log(e);
    console.log(e.message);
  }
});

// process.env.KEY_ID reads the public rezorpay api key from the environment variables .Sends the key to the frontend via res.json  The public key is safe to expose — unlike the secret key, which must never go to the frontend.
app.get("/getKey", (req, res) => {
  let key = process.env.KEY_ID;
  console.log(key);
  res.json({ key: key }); // backend sends the public key to frontend
});

// Verifying payment after checkout
// This route verifies a Razorpay payment and saves the order to your MongoDB database, then sends a confirmation email to the user
app.post("/paymentVerification", async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    user_id,
    product,
    status,
    amount,
    currency,
    address,
    mobile,
    name,
  } = req.body;
  // To perform actions like creating orders or verifying payments, Razorpay needs to know who is calling their API.
  const instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.SECRET_KEY,
  });

  // Verify the payment using Razorpay's utility function
  let isValid = validatePaymentVerification(
    { order_id: razorpay_order_id, payment_id: razorpay_payment_id },
    razorpay_signature,
    process.env.SECRET_KEY
  );

  if (isValid) {
    // Save payment details to database
    const newPayment = new Pay({
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      user_id,
      product,
      status,
      amount,
      currency,
      address,
      mobile,
      name,
    });
    await newPayment.save();

    // Sending order confirmation email to user
    let user = await User.findOne({ _id: user_id });
    let mail = user.email;
    console.log(razorpay_order_id, mail);

    const subject = "Order Accepted";
    const text = `Your order ${razorpay_order_id} has been accepted. Thank you for shopping with medix!`;

    const mail_Options = {
      from: process.env.EMAIL_USER,
      to: mail,
      subject: subject,
      text: text,
    };

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    transporter.sendMail(mail_Options, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res.json({ mess: "okk" });
  }
});

// Fetch an Address document by ID
// Because you are retrieving (not modifying) data — specifically, an address by its ID so get is used
app.get("/getAddress", async (req, res) => {
  let { id } = req.query;
  console.log(id);
  let add = await Address.findById(id); // Finds the address in MongoDB using Mongoose:
  res.json({ finAdd: add }); /// This wraps the add object inside another object with the key name "finAdd".
});

// Search for a medicine by name
app.get("/", async (req, res) => {
  try {
    // client sends data like -->GET /?search=paracetamol

    let { search } = req.query;
    search = search.toLowerCase();
    let d = await Medix.findOne({ name: search });
    res.json({ med: d });
    /*
    if found data will look like this
    {
      "med": {
        "_id": "some_id",
        "name": "paracetamol",
        "description": "Pain reliever",
        "price": 10
      }
    }
    */
  } catch (err) {
    console.log(err.message);
  }
});

// Autocomplete suggestions for medicine names
//retriving suggesstions for medicine names based on prefix
app.get("/getBar/:med", async (req, res) => {
  let { med } = req.params;
  if (med == "#") {
    return res.json({ ans: [] });
  }
  // This uses MongoDB regex to find all documents where the name starts with med.
  let ans = await Medix.find({ name: { $regex: `^${med}`, $options: "i" } });
  res.json({ ans });
  // if cliet calls  GET /getBar/pan
  /* {
  "ans": [
    {
      "_id": "...",
      "name": "Pantoprazole",
      ...
    }
  ]
}
*/
});

// Get number of users registered
// ( as retriving no of users registered so get )
app.get("/getNum", async (req, res) => {
  let data = await User.find({}); //Find all users in the User collection:
  res.json({ num: data.length }); // It calculates the number of users using .length and sends it in the response as a JSON object.
});

// Fetch user details from token
app.post("/getUser", async (req, res) => {
  // Extract the token from the request body:
  // frontend sends token in the body of the request
  let { token } = req.body;
  console.log(token);

  // If there is no token, it means the user isn’t logged in. So, we return:
  if (token == null) {
    return res.json({ details: "nf" });
  }
  // jwt.verify() decodes and validates the token using the secretKey ||.This gives us the original data stored in the token (like username).
  const decoded = jwt.verify(token, secretKey);
  const { username } = decoded;
  //
  let details = await User.findOne({ username: username });

  res.json({ details: details });

  // Because without JWT: The server would need to ask the database every time: “Is this user allowed?” Or the user would need to log in again and again. Or we’d have to store login state on the server (hard to scale). JWT lets the user prove their identity in a secure way without needing to re-login or hit the database every time.
});

// Register a new user
app.post("/signin", async (req, res) => {
  try {
    // req.body.formData contains { email, username, password } sent from frontend.
    let { formData } = req.body;
    let { email, username, password } = formData;

    let user = await User.findOne({ username: username });

    if (user) {
      return res.json({ mess: "already" }); // user already exists
    }

    let encyPass = await bcrypt.hash(password, 15); // encrypt the passwordadds strong security (15 = salt rounds).

    const newUser = new User({
      email: email,
      username: username,
      password: encyPass,
    });

    await newUser.save();

    // Create empty cart for new user
    let newUsrCart = new Cart({
      email: email,
      product: [],
    });
    await newUsrCart.save();

    res.json({ mess: "okk" });
  } catch (e) {
    res.json({ mess: e.message });
  }
});

// List all orders for a user
app.get("/listOrder", async (req, res) => {
  let { user_id } = req.query;
  // Searches the Payment collection for all entries with this user’s ID.
  let order = await Pay.find({ user_id: user_id }).populate("product.prod");
  // populate is a Mongoose method. It fetches the full medicine details (from the Medix model) linked in the product.prod field.
  console.log(order);
  res.json({ order: order });
});

// Login user
app.post("/login", async function (req, res) {
  let { formData } = req.body;
  let { username, password } = formData;

  let chkUser = await User.findOne({ username: username });

  console.log(chkUser);

  if (!chkUser) {
    return res.json({ mess: "nope User exists" });
  }

  if (await bcrypt.compare(password, chkUser.password)) {
    //bcrypt.compare() checks if the plaintext password matches the hashed password stored in the database.
    const userObject = chkUser.toObject(); // toObject() is a Mongoose method that converts a Mongoose document (like chkUser) into a plain JavaScript object.
    //Before: chkUser is a Mongoose document with methods and internal metadata.After: userObject is just a clean, plain JavaScript object, which you can safely use to create the JWT or return data to the user.

    const token = jwt.sign(userObject, secretKey); // generate token// his line generates a JSON Web Token (JWT) using the jwt.sign() method from the jsonwebtoken library.jwt.sign() creates a JWT token using the user's data (userObject) and a secret key (secretKey)

    if (token) {
      return res.json({ data: token });
    } else {
      return res.json({ mess: "error" });
    }
  }

  return res.json({ mess: "pass not match" });
  /* ✅ Why does the token differ every time?
When you call:

jwt.sign(payload, secretKey);
Even if the payload is the same, the token changes each time because JWT automatically adds some metadata inside the token, such as:

iat (issued at): A timestamp of when the token was created.

So even with the same data, the token changes because the iat field is different. */
  ///////////////////
  // Header → Info about how the token is encrypted (e.g., HS256)

  // Payload → The user info or data you want to include (like a mini JSON object)

  // Signature → A secure hash to verify the token wasn’t tampered with
});

// Fetch user cart items
app.get("/getCart/:name", async (req, res) => {
  let { name } = req.params;
  let cartData = await Cart.findOne({ email: name }).populate("product.prod"); // .populate("product.prod"):This replaces the product IDs in the cart with actual product documents from the Medix collection (via Mongoose).So instead of just _id, you'll get full medicine details like name, price, etc
  res.json({ data: cartData });
});

// Add a medicine into cart {POST method} as updating the data in the cart
app.post("/cart/:mail/:id", async (req, res) => {
  let { mail } = req.params;
  let { id } = req.params;

  let usr = await Cart.findOne({ email: mail }); // Find the cart document where the email matches mail. impp
  let { product } = usr; //Extract the product array from the user's cart.

  let Med = await Medix.findById(id);
  // Fetch the medicine document from the Medix collection using the given ID.

  let chk = false;
  for (let prd of product) {
    if (prd.prod.valueOf() === id) {
      chk = true;
      break;
    }
  }

  if (!chk) {
    let ans = { prod: Med, qty: 1 };
    await Cart.findOneAndUpdate(
      { email: mail },
      { $set: { product: [...product, ans] } }
    );
  }

  res.json({ result: "data add" });
});

// Get 4 random medicines (for home page maybe)
app.get("/getRandomMedi", async (req, res) => {
  let dataRandom = await Medix.find({}); // Fetch all medicines from the  Medix collection
  let medi = [];

  for (let i = 0; i < 4; i++) {
    let len = dataRandom.length;
    let idx = Math.floor(Math.random() * len);
    medi.push(dataRandom[idx]);
    dataRandom.splice(idx, 1); // remove picked item
  }

  res.json({ medi: medi });
});

// Fetch a single medicine details by ID
app.get("/getDataClk/:id", async (req, res) => {
  let { id } = req.params;
  let med = await Medix.findOne({ _id: id }); // Search in the Medix collection for a document where _id matches the provided id.
  res.json({ med });
});

// Fetch all cart items for a user
app.get("/getOrder", async (req, res) => {
  let { mail } = req.query;
  console.log(mail);
  let Order = await Cart.findOne({ email: mail }).populate("product.prod");
  console.log(Order);
  res.json({ order: Order });
  /*
  // without populate 

  product: [{ prod: "663abc123", qty: 2 }]

  // with populate

  product: [{
  prod: { _id: "663abc123", name: "Dolo 650", price: 30 },
  qty: 2
}]

 */
});

// Save cart data after update (quantity changes etc)
app.post("/addcart/:username", async (req, res) => {
  let { username } = req.params; //😀 Extracts the username from the request parameters.
  // req.body contains the updated cart data sent from the frontend.
  let { product } = req.body; //😁Extracts the updated cart data sent from the frontend.
  console.log(product, username);

  let data = await Cart.findOneAndUpdate(
    { email: username },
    { $set: { product: product } }, // REPLACES THE EXISTING CART WITH THE NEW ONE
    { new: true }
  ).populate("product.prod");
  res.json({ value: data.product }); //Sends the updated product list (with full data) back to the frontend.
});

// Save address of user
app.post("/saveAdd", async (req, res) => {
  let { add, login } = req.body;
  let data = new Address(add); //Creates a new Address document using the data in add.
  data.user = login; //Adds the reference to the user who owns this address.
  await data.save();
  res.json({ data: "ok" });
});

// Fetch all addresses of a user
app.get("/getUserAdd/:id", async (req, res) => {
  let { id } = req.params;
  let add = await Address.find({ user: id });
  res.json({ add: add }); //Returns the list of addresses as a JSON response.
});

// Express default error handler
app.use((err, req, res, next) => {
  console.log(err.message);
});

// Start the server
app.listen(8080, () => {
  console.log("app listing");
});



// ========================== END OF CODE =============================
/*Frontend (React): Runs on port 5173.

Backend (Express): Runs on port 8080.

Even though they are on different ports, 
they are considered to be on different origins. 
This is where CORS comes into play — without CORS, the browser would block requests between 
different origins for security reasons.




*/