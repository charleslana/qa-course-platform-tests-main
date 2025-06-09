const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const path = require('path');
const middlewares = jsonServer.defaults({
  static: path.join(__dirname, 'public')
});
const fs = require('fs');
const refreshDb = require('./refresh-db');

// Aqui você registra o router no app para buscar la no middleware
server.set('router', router);

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Middleware refreshDb usado para obter os dados novamente do db.json
server.post('/usuarios', refreshDb, (req, res, next) => {
  const db = router.db; // lowdb instance
  const existe = db.get('usuarios').find({ email: req.body.email }).value();

  if (existe) {
    return res.status(400).json({ erro: 'Usuário já cadastrado' });
  }

  next();
});

// Middleware global caso queira em todas rotas
// server.use((req, res, next) => {
//   const data = JSON.parse(fs.readFileSync('./db.json', 'utf-8'));
//   router.db.setState(data);
//   next();
// });

server.use(router);
server.listen(3000, () => {
  console.log('🚀 JSON Server rodando com validação de e-mail duplicado');
});
