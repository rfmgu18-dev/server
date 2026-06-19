const express = require('express');
const app = express();

const {infoCursos} = require("./cursos.js");

//Routing

app.get("/", (request, response) => {
    response.send("Mi primer server con Express. Cursosos wow.");

});

app.get("/api/cursos", (req, res) => {
    res.send(JSON.stringify(infoCursos));
});

app.get("/api/cursos/matematicas", (re, res) => {
    res.send(JSON.stringify(infoCursos.matematicas));
});

app.get("/api/cursos/programacion", (req, res) => {
    res.send(JSON.stringify(infoCursos.programacion));
});

app.get("/api/cursos/programacion/:lenguaje", (req, res) => {
    const lenguaje = req.params.lenguaje;

    console.log(lenguaje);
    
})
const puerto = process.env.PORT || 3001;

app.listen(puerto, () => {
    console.log(`El servidor está escuchando el puerto ${puerto}... Espere un momento...`); 
});