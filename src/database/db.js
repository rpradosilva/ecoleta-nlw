// importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()

// Criar obj que irá fazer operações no bd
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db