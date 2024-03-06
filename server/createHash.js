const express = require("express");
const app = express();
const cors = require('cors');
const mysql = require("mysql");
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const util = require('util');  // Adicione esta linha

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "joIS180301--",
    database: "coffeemdb",
});

app.use(cors());
app.use(bodyParser.json());

// Middleware para permitir JSON no corpo da requisição
app.use(express.json());

// Função para criar um novo usuário
async function createUser(newUser) {
    try {
        // Hash da senha usando bcrypt
        const hashedPassword = await bcrypt.hash(newUser.password, 10);

        // Gerar um auth_token (exemplo: usando jwt.sign)
        const authToken = jwt.sign({ user: newUser.user }, 'secretpassword');

        // Inserir usuário no banco de dados com senha hash e auth_token
        const queryAsync = util.promisify(db.query).bind(db);
        const result = await queryAsync("INSERT INTO users (user, name, surname, password_hash, description, image_profile, auth_token) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [newUser.user, newUser.name, newUser.surname, hashedPassword, newUser.description, newUser.imageProfile, authToken]);

        console.log("Query executada:", result.sql);

        if (result.affectedRows !== undefined) {
            console.log("Número de linhas afetadas:", result.affectedRows);
            if (result.affectedRows > 0) {
                console.log("Novo usuário criado com sucesso. ID:", result.insertId);
            } else {
                console.error("Erro ao criar usuário. Nenhuma linha afetada.");
            }
        } else {
            console.error("Erro ao criar usuário. Número de linhas afetadas é indefinido.");
            console.error("Erro MySQL:", result.error?.code, "-", result.error?.sqlMessage);
        }
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
    }
}

// Exemplo de uso da função para criar um novo usuário
const exampleNewUser = {
    user: "joaoedu",
    name: "João Eduardo",
    surname: "Miranda",
    password: "123456",
    description: "Descrição de Joao",
    imageProfile: "https://nyousefali.com.br/blog/profile/ny.png"
};

// Chama a função para criar um novo usuário
createUser(exampleNewUser);
