require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");

//multiplayer 


/* handling cors policy issue */ 

const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    Credential: true,
};
 
app.use(cors(corsOptions));

/*
this line of code adds express middleware that parses incoming bodies with json payloads. 
it's important to place this before any routes that need to be handle json data in the request body.
*/
app.use(express.json());


//mount the touter: to use the router in main express app
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);

app.use(errorMiddleware);

const PORT = 5000;

connectDb().then(() => {

    app.listen(PORT, () => {
        console.log(`server is running at port : ${PORT}`);
    });
});
 