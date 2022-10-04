const express = require("express");
const dotenv = require("dotenv");
const cors = require ('cors')

dotenv.config();
const dbConnect = require("./config/dbconnection");
const {notFound, errorHandler } = require("./middlewares/errorHandler");

const reviewRoutes = require("./router/review/reviewRouter");


const app = express();
dbConnect();

app.use(express.json());
app.use(cors());


app.use("/api/review", reviewRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log(`server is running at ${PORT}`));
