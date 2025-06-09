const fs = require('fs');

function refreshDb(req, res, next) {
    const data = JSON.parse(fs.readFileSync('./db.json', 'utf-8'));
    req.app.get('router').db.setState(data);
    next();
}

module.exports = refreshDb;
