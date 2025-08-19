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
app.get('/personas', async (req, res) => {
    const personaArr = await db.persona.findAll();
    res.render("personas/list", { personaArr });
})
app.get('/personas/create', (req, res) => {

    res.render("personas/form", { persona: null });
})
app.post('/personas/create', async (req, res) => {
    const { nombre, apellido, edad, ciudad, fechaNacimiento } = req.body;
    await db.persona.create({
        nombre,
        apellido,
        edad,
        ciudad,
        fechaNacimiento
    });
    res.redirect('/personas');
})

app.get('/personas/:id', async (req, res) => {
    const persona = await db.persona.findByPk(req.params.id);
    res.render("personas/form", { persona });
})
app.post('/personas/:id', async (req, res) => {
    const id = req.params.id;
    const { nombre, apellido, edad, ciudad, fechaNacimiento } = req.body;
    await db.persona.update({
        nombre,
        apellido,
        edad,
        ciudad,
        fechaNacimiento
    }, {
        where: { id }
    });
    res.redirect('/personas');
});

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
