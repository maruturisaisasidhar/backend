const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/Aarogya")
    .then(() => {
        console.log("Connection established successfully");
    })
    .catch((error) => {
        console.error("Error in connection:", error);
    });

// Define the user schema
const userSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create the user model
const User = mongoose.model("User", userSchema);

module.exports = { User };
