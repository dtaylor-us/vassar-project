// Import dependencies

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const personRoutes = require('./routes/person.routes');
const dbConfig = require('./config/db.config.js');
const db = require("./models");
const Role = db.role;
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Connecting to the database
let mongoUrl = process.env.ENV === 'production' ? process.env.MONGO_URL : dbConfig.url;

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
    initial();
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// Create a new express application named 'app'
const app = express();

// Set our backend port to be either an environment variable or port 5000
const port = process.env.PORT || 5000;

// This application level middleware prints incoming requests to the servers console, useful to see incoming requests
app.use((req, res, next) => {
    console.log(`Request_Endpoint: ${req.method} ${req.url}`);
    next();
});

// Configure the bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Configure app to use route
app.use('/api/v1/', personRoutes);
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

// Configure the CORs middleware
app.use(cors());

// This middleware informs the express application to serve our compiled React files
app.use(express.static(path.join(__dirname, '..', 'client/build')));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'client/build', 'index.html'));
});


// Catch any bad requests
app.get('*', (req, res) => {
    res.status(200).json({
        msg: 'Catch All'
    });
});


// Configure our server to listen on the port defiend by our port variable
app.listen(port, () => console.log(`BACK_END_SERVICE_PORT: ${port}`));

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'user' to roles collection");
            });

            new Role({
                name: "moderator"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'moderator' to roles collection");
            });

            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });
        }
    });
}
