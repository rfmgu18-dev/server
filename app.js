const express = require('express');
const app = express();

const {infoCursos} = require("./cursos.js");

app.use(express.json());

//Routers
const routerProgramacion = express.Router();
app.use("/api/cursos/programacion", routerProgramacion);
routerProgramacion.use(express.json());


const routerMath = express.Router();
app.use("/api/cursos/matematicas", routerMath);

//Routing
app.get("/api/cursos", (req, res) => {
    res.send(JSON.stringify(infoCursos));
});

app.get("/", (request, response) => {
    response.send("Mi primer server con Express. Cursosos wow.");

});

routerMath.get("/", (re, res) => {
    res.json(infoCursos.matematicas);
});

//Programacion

routerProgramacion.get("/", (req, res) => {
    res.send(JSON.stringify(infoCursos.programacion));
});

routerProgramacion.get("/:nivel", (req, res) => {
});

routerProgramacion.get("/:lenguaje/:nivel", (req, res) => {
    const lenguaje = req.params.lenguaje;
    const nivel = req.params.nivel;

    const resultados =infoCursos.programacion.filter(curso => curso.lenguaje === lenguaje);
    if (resultados.length === 0) {
        return res.status(404).send(`No se encontraron cursos relacionados con ${lenguaje}`)
    }
    res.send(JSON.stringify(resultados));
    console.log(lenguaje, nivel);
    
});

routerProgramacion.post("/", (req, res) => {
    let cursoNuevo = req.body;
    infoCursos.programacion.push(cursoNuevo);
    res.send(JSON.stringify(infoCursos.programacion));
});

routerProgramacion.put("/:id", (req, res) => {
    const cursoActualizado = req.body;
    const id = req.params.id;

    const indice = infoCursos.programacion.findIndex(curso => curso.id == id);
    
    if (indice >= 0 ) {
        infoCursos.programacion[indice] = cursoActualizado;
    }
    res.send(JSON.stringify(infoCursos.programacion));
});

routerProgramacion.patch("/:id", (req, res) => {
    const infoActualizada = req.body;
    const id = req.params.id;

    const indice = infoCursos.programacion.findIndex(curso => curso.id == id);
    if (indice >= 0 ) {
        const cursoAModificar = infoCursos.programacion[indice];
        Object.assign(cursoAModificar, infoActualizada);
    }
    res.send(JSON.stringify(infoCursos.programacion));
});

routerProgramacion.delete("/:id", (req, res) => {
    const id = req.params.id;
    const indice = infoCursos.programacion.findIndex(curso => curso.id == id);

    if (indice >= 0 ) {
        infoCursos.programacion.splice(indice, 1);
    }
    res.send(JSON.stringify(programacion));
});
//Matematicas

routerMath.get("/", (req, res) => {
    res.send(JSON.stringify(infoCursos.matematicas));
});

routerMath.get("/:tema", (req, res) => {
    const tema = req.params.tema;
    const resultados = infoCursos.matematicas.filter(curso => curso.tema === tema);

    if(resultados.length === 0) {
        return res.status(404).send(`No se encontraron cursos relacionados con ${tema}`);
    }
    res.send(JSON.stringify(resultados));
})
const puerto = process.env.PORT || 3001;

app.listen(puerto, () => {
    console.log(`El servidor está escuchando el puerto ${puerto}... Espere un momento...`); 
});