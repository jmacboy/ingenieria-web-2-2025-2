require('dotenv').config()
const express = require('express')
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');

const db = require("./models/");
const session = require('express-session')

const app = express()
const port = 3000

app.set("view engine", "ejs");
//Para habilitar las carpetas públicas
app.use(express.static('public'));

// Para que lleguen los valores de formulario en las peticiones
app.use(bodyParser.urlencoded({ extended: false }));

// Configuración de carga de archivos
app.use(fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
}));

//configuracion de session
app.use(session({
    secret: 'esta es la clave de encriptación de la sesión y puede ser cualquier texto'
}))

// Para habilitar la BD
db.sequelize.sync({
    // force: true // drop tables and recreate
}).then(() => {
    console.log("db resync");
});


require("./routes")(app);


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
