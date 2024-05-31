require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const User = require("./userdetails");

const app = express();
const mongoUrl = "mongodb+srv://npallapo:gC580rwLVY55JlWR@cluster0.gumrtg8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const port = process.env.PORT || 5001;

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Database connected");
    })
    .catch((e) => {
        console.error("Database connection error: ", e);
    });

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send({ status: "Started" });
});

app.post('/register', async (req, res) => {
    const { name, email, phone, address, password, confirm_password } = req.body;

    if (!name || !email || !phone || !address || !password || !confirm_password) {
        return res.send({ status: "error", data: "All fields are required" });
    }

    if (password !== confirm_password) {
        return res.send({ status: "error", data: "Passwords do not match" });
    }

    try {
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.send({ status: "error", data: "User already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            phone,
            address,
            password: hashedPassword,
        });

        await newUser.save();
        res.send({ status: "success", data: "User created" });
    } catch (error) {
        console.error("Error creating user: ", error);
        res.status(500).send({ status: "error", data: error.message });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.send({ status: "error", data: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.send({ status: "error", data: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.send({ status: "error", data: "Invalid password" });
        }

        res.send({ status: "success", data: "Login successful" });
    } catch (error) {
        console.error("Login error: ", error);
        res.status(500).send({ status: "error", data: error.message });
    }
});

app.listen(port, () => {
    console.log(`Node.js server started on port ${port}`);
});
