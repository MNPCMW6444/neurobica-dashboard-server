const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const proModal = require("./models/proModal");
dotenv.config();

// setup express server

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://laughing-murdock-38b76c.netlify.app",
    ],
    credentials: true,
  })
);
app.use(cookieParser());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// set up routers


// connect to mongoDB

mongoose.connect(
  process.env.MDB_CONNECT_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return console.error(err);
    console.log("Connected to MongoDB");
  }
);

app.get("/getallmy", async (req, res) => {
  try {

    const pros = await proModal.find();

    res.json(pros.length>0? pros : new Array({header:"none",tasks:new Array({name:"אין עדיין",complete:true})},{header:"none",tasks:new Array({name:"אין עדיין",complete:true})}));

  } catch (err) {
    res.status(500).send();
  }
});


app.post("/sendpro", async (req, res) => {
  try {
    const a =new proModal ({header:"none",tasks:new Array({name:"אין עדיין",complete:true})});

    const saved = await a.save();


  } catch (err) {
    res.status(500).send();
  }
});

app.post("/sendtask", async (req, res) => {
  try {

    const {
      name,
      id
    } = req.body;
    const newa =await proModal.findById(id);

    newa.tasks.push({name:name, complete:false});


    const snewa = await newa.save();

    res.json(snewa);
  } catch (err) {
    res.status(500).send();
    console.log(err);
  }
});


app.post("/sendpro", async (req, res) => {
  try {
    console.log("2s");
    const {
     pro
    } = req.body;

    console.log("2s");

    const newa ={header:pro,tasks:new Array()};
    console.log("2");

    const newa2 = await newa.save();
console.log("readyt");
    res.json(newa2);
    console.log("done");


  } catch (err) {
    res.status(500).send();
    console.log(err);
  }
});