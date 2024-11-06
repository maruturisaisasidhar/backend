const express = require("express");
const path = require("path"); // Add path module
const { User } = require("./models/mongo");
const app = express();

// Set EJS as the view engine
app.set("view engine", "ejs");

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("login.ejs", { error: null });
});

// Route to render advice template
app.get("/advice", (req, res) => {
  res.render("advice.ejs");
});

// Route to render the login form
app.get("/login", (req, res) => {
  res.render("login", { error: null }); // Pass error as null on initial load
});

// Route to handle login form submission
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.render("login", { error: "No user found with that email." });
    }

    if (user.password !== password) {
      return res.render("login", { error: "Invalid password." });
    }

    console.log("Login successful");
    res.redirect("/home");
  } catch (error) {
    console.error("Error during login:", error);
    res.render("login", { error: "An error occurred. Please try again." });
  }
});

app.get("/home", (req, res) => {
  res.render("home"); // Renders home.ejs
});

// Route to render the signup form
app.get("/signup", (req, res) => {
  res.render("signup", { error: null }); // Pass error as null when rendering the form
});

// Route to handle signup form submission
app.post("/signup", async (req, res) => {
  const { user_name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.render("signup", { error: "Passwords do not match." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render("signup", { error: "Email is already in use." });
    }

    const newUser = new User({ user_name, email, password });
    await newUser.save();

    console.log("User registered successfully");
    res.redirect("/login");
  } catch (error) {
    console.error("Error during user registration:", error);
    res.render("signup", { error: "An error occurred. Please try again." });
  }
});

app.listen(3000, () => {
  console.log("Server Started");
});
