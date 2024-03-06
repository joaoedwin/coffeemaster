const express = require("express");
const app = express();
const cors = require('cors');
const mysql = require("mysql");
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const util = require('util');
const { promisify } = require('util');




const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "joIS180301--",
    database: "coffeemdb",
});


app.use(cors());

// Middleware para verificar o token JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  
    if (token == null) return res.sendStatus(401); // Sem token, não autorizado
  
    jwt.verify(token, 'secretpassword', (err, user) => {
      if (err) return res.sendStatus(403); // Token inválido ou expirado
      req.user = user;
      next(); // Continuar para a rota protegida
    });
  };


  // Rota protegida que requer autenticação
app.get('/profile', authenticateToken, (req, res) => {
  // req.user contém os dados do usuário extraídos do token
  res.send(`Bem-vindo ao seu perfil, ${req.user.name}`);
});

// Middleware para permitir JSON no corpo da requisição
app.use(express.json());


// Rota para obter dados de um usuário pelo ID
app.get('/users/:id', (req, res) => {
    const { id } = req.params;

    // Verifique se id é um número inteiro válido
    if (!Number.isInteger(parseInt(id))) {
        return res.status(400).json({ error: 'Invalid user ID format.' });
    }

    // Execute a consulta no banco de dados para obter os dados do usuário pelo ID
    db.query("SELECT * FROM users WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const user = result[0];

        // Remova a senha do objeto de usuário antes de enviar para o cliente
        delete user.password;

        res.status(200).json(user);
    });
});


async function findByUser(username) {
    const queryAsync = util.promisify(db.query).bind(db);
    try {
        const result = await queryAsync('SELECT * FROM users WHERE user = ?', [username]);
        if (result.length > 0) {
            return result[0]; // Retorna o primeiro usuário encontrado
        }
        return null;
    } catch (err) {
        console.error('Erro ao buscar usuário:', err.message);
        throw err; // Repasse o erro para ser tratado onde a função é chamada
    }
}


app.post('/login', async (req, res) => {
    const { user, password } = req.body;
  
    try {
      const userRecord = await findByUser(user);
      if (!userRecord) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }
  
      const passwordMatch = await bcrypt.compare(password, userRecord.password_hash);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }
  
      const token = jwt.sign({ userId: userRecord.id }, 'secretpassword', { expiresIn: '1h' });
      res.json({ token, id: userRecord.id });
    } catch (err) {
      console.error('Erro durante o login:', err.message);
      res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
    }
  });

  



// Rota para obter um post pelo ID
app.get('/posts/:id', (req, res) => {
    const { id } = req.params;

    // Verifique se id é um número inteiro válido
    if (!Number.isInteger(parseInt(id))) {
        return res.status(400).json({ error: 'Invalid post ID format.' });
    }

    // Execute a consulta no banco de dados para obter os dados do post pelo ID
    db.query("SELECT * FROM posts WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'Post not found.' });
        }

        const post = result[0];

        res.status(200).json(post);
    });
});




// Rota para obter posts com ordenação e limite
app.get('/posts', (req, res) => {
    const { _limit } = req.query;

    // A consulta SQL agora sempre ordenará os resultados do mais recente para o mais antigo
    let sqlQuery = "SELECT * FROM posts ORDER BY STR_TO_DATE(date, '%Y-%m-%d') DESC";

    if (_limit) {
        sqlQuery += ` LIMIT ${_limit}`;
    }

    // Execute a consulta no banco de dados
    db.query(sqlQuery, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.status(200).json(result);
    });
});




// Rota para criar novo post
app.post('/posts', authenticateToken, (req, res) => {
    const { id_user, date, imageUrl, category, title, resume, content, duration, star, views, status } = req.body;

    // Verifique se id_user é fornecido
    if (!id_user) {
        return res.status(400).json({ error: 'id_user is required.' });
    }

    // Execute a consulta no banco de dados para criar um novo post associado ao id_user
    db.query("INSERT INTO posts (id_user, date, imageUrl, category, title, resume, content, duration, star, views, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
        [id_user, date, imageUrl, category, title, resume, content, duration, star, views, status], 
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            // Retorna o id do post criado
            const postId = result.insertId;

            res.status(201).json({ message: 'Post created successfully.', id: postId });
        });
});




app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
