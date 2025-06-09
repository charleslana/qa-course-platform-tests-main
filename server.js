const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const path = require('path');
const express = require('express');
const fs = require('fs');

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use('/public', express.static(path.join(__dirname, 'public')));

// Middleware para bloquear e-mails duplicados
server.post('/usuarios', (req, res, next) => {
  const db = router.db; // lowdb instance
  const existe = db.get('usuarios').find({ email: req.body.email }).value();

  if (existe) {
    return res.status(400).json({ erro: 'Usuário já cadastrado' });
  }

  next();
});

server.use((req, res, next) => {
  const data = JSON.parse(fs.readFileSync('./db.json', 'utf-8'));
  router.db.setState(data);
  next();
});

server.use(router);
server.listen(3000, () => {
  console.log('🚀 JSON Server rodando com validação de e-mail duplicado');
});
