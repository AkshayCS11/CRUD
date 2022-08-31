const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config();

app.use(express.json({ limit: '20mb' }))
app.use(express.urlencoded({ extended: false, limit: '20mb' }))

/* Initializing the path for routes */
app.use("/", require("./routes"));

/* Setting up server */
app.listen(process.env.PORT, function () {
    console.log("This server port is up and running ");
})
global.dbconn = "";

/* Connected the app with mongoose */
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (client, err) => {
        try {
            console.log("Connected to db: " + client)
        } catch (err) {
            console.log(err);
        }
    }
);
// Passport Config
require('./config/passport')(passport);

app.use(express.json({ limit: '20mb' }))
app.use(express.urlencoded({ extended: false, limit: '20mb' }))

// Express session
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
