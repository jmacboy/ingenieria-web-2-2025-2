require('dotenv').config()
const express = require('express')
const bodyParser = require("body-parser");
const db = require("./models/");
const session = require('express-session')

const app = express()
const port = 3000

app.set("view engine", "ejs");
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));

//configuracion de session
app.use(session({
    secret: 'esta es la clave de encriptación de la sesión y puede ser cualquier texto'
}))

db.sequelize.sync({
    // force: true // drop tables and recreate
}).then(() => {
    console.log("db resync");
});

require("./routes")(app);


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
