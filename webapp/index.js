require('dotenv').config()
const express = require('express')
const bodyParser = require("body-parser");
const db = require("./models/");

const app = express()
const port = 3000

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

db.sequelize.sync({
    // force: true // drop tables and recreate
}).then(() => {
    console.log("db resync");
});


app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.get("/prueba", (req, res) => {
    const nombres = ["Juan", "Pedro", "Maria"];
    res.render("prueba", { listaNombres: nombres })
})
app.get('/hola', async (req, res) => {
    res.send('¡Hola Mundo!')
    await db.persona.create({
        nombre: "Juan",
        apellido: "Pérez",
        edad: 30,
        ciudad: "Santa Cruz",
        fechaNacimiento: new Date('1993-05-15')
    });
})
app.get('/form', (req, res) => {
    res.sendFile('form.html', { root: __dirname })
})
app.post('/form-submit', (req, res) => {
    const name = req.query.name;
    const lastName = req.query.lastName;
    res.send(`Nombre: ${name}, Apellido: ${lastName}`);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
