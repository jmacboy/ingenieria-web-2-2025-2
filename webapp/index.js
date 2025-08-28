require('dotenv').config()
const express = require('express')
const bodyParser = require("body-parser");
const db = require("./models/");

const app = express()
const port = 3000

app.set("view engine", "ejs");
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));

db.sequelize.sync({
    // force: true // drop tables and recreate
}).then(() => {
    console.log("db resync");
});

require("./routes")(app);


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
