import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import * as dotenv from "dotenv";

import mongoose from "mongoose";

// ConfigApp
dotenv.config();

const app = express();
const PORT = 8000;

mongoose.set('strictQuery', false);

// use method
app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());

app.use(bodyParser.json({
    limit: "50mb",
}));

app.use(bodyParser.urlencoded({
    extended: true
}));

// Connect Server and DB
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`);
});

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            autoIndex: true,
            autoCreate: true,
        });
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.log(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

connectDB();


