const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = 3000;
const hostname = "localhost";

app.use(express.json());

//READ
app.get('/', (request, response) => {
    response.end(JSON.stringify({
        message: 'Acessando o / com o verbo GET'
    }))
})

//CREATE
app.post('/', (request, response) => {
    console.log(request.body)
    response.end(JSON.stringify(request.body))
})

app.delete('/', (request, response) => {
    response.end(JSON.stringify({
        message: 'Acessando o / com o verbo DELETE'
    }))
})

app.patch('/', (request, response) => {
    response.end(JSON.stringify({
        message: 'Acessando o / com o verbo PATCH'
    }))
})

app.listen(port, hostname, () => console.log(`Servidor rodando na porta http://${hostname}:${port}`));