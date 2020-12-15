const express = require('express');
const cors = require('cors');
const faker = require('faker');
const fs = require('fs');

const port = 3000;
const hostname = 'localhost';

const app = express();
app.use(cors());

const gerarPessoaAleatoria = () =>{

    let pessoa = {
        nome: `${faker.name.firstName()} ${faker.name.lastName()}`,
        email: faker.internet.email(),
        position: {
            latitude: faker.address.latitude(),
            longitude: faker.address.longitude()
        }
    }

    return (pessoa);
}

app.get('/', (req, resp) => {
    resp.setHeader('Content-Type', 'application/json');
    let pessoaVetor = [];
    for(let i = 0; i <  10; i++ ){
        pessoaVetor.push(gerarPessoaAleatoria())
    }
    resp.end(JSON.stringify(pessoaVetor));
});

app.listen(port, hostname, () => {
    console.log(`Servidor rodando no endereço http://${hostname}:${port}`);
})