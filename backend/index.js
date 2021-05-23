if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const session = require("express-session");
const flash = require("connect-flash");
const helmet = require("helmet");
// const unless = require("express-unless")
const bodyParser = require("body-parser");

const mongoSanitize = require("express-mongo-sanitize");

const userRoutes = require("./routes/users");
const roomRoutes = require("./routes/rooms");
const messageRoutes = require("./routes/messages");


const MongoStore = require("connect-mongo");





const dbUrl = process.env.DB_URL
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});



const app = express();

app.use(express.json());
app.use(bodyParser.json());

// app.engine("ejs", ejsMate);
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(mongoSanitize());

const secret = process.env.SECRET || "secretpassword";

const store = MongoStore.create({
  mongoUrl: dbUrl,
  touchAfter: 24 * 60 * 60,
  crypto: {
    secret,
  },
});

store.on("error", function () {
  console.log("SESSION STORE ERROR", e);
});

const sessionConfig = {
  store,
  name: "session",
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));
app.use(flash());
app.use(helmet({ contentSecurityPolicy: false }));




// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Routes
app.use("/api", userRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/rooms/:id/messages", messageRoutes);
// Other routes

// app.use("/profile", (req,res) => {
//   console.log("HAHA")
// })
// router.route("/profile").get(isLoggedIn)

require("./SSE-handler")(app)



app.use((req, res, next) => {
    if(req.originalUrl.includes("/assets/")) return;
    res.locals.currentUser = req.user;

    next();
});


// ######################################
// USE THIS CODE WHEN SERVING STATIC FILE
// ######################################

// // Serve Dist folder
// app.use(express.static(path.join(__dirname, "..", "dist")));


// app.get("*", (req,res) => {
//     res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
// })

app.use("/", (err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Oh No, Something Went Wrong!";
    console.log("ERROR " + err)
    res.status(statusCode).json({ error: err });
});




app.listen(process.env.PORT || 8080, () => {
    console.log(`Server running on 8080`);
});
