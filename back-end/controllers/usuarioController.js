import { db } from '../config/dbConfig.js';

// Função para cadastrar usuário
export const cadastrarUsuario = (req, res) => {
    const { nome, email, senha, telefone } = req.body;

    if (!nome || !email || !senha || !telefone) {
        return res.status(400).send('Todos os campos são obrigatórios.');
    }

    db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, result) => {
        if (err) return res.status(500).send('Erro ao verificar e-mail.');
        if (result.length > 0) return res.status(400).send('E-mail já cadastrado.');

        db.query('INSERT INTO usuarios (nome, email, senha, telefone) VALUES (?, ?, ?, ?)',
            [nome, email, senha, telefone], (err) => {
                if (err) return res.status(500).send('Erro ao cadastrar usuário.');
                res.status(200).send({ message: 'Usuário cadastrado com sucesso!' });
            });
    });
};

// Função para fazer login
export const loginUsuario = (req, res) => {
    const { email, senha } = req.body;

    db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, result) => {
        if (err) return res.status(500).send('Erro ao buscar usuário.');
        if (result.length === 0) return res.status(400).send('E-mail não encontrado.');

        const usuario = result[0];
        if (senha !== usuario.senha) return res.status(400).send('Senha incorreta.');

        res.status(200).send({ message: `Bem-vindo, ${usuario.nome}` });
    });
};
