const express = require("express")
const server = express()


// pegar db
const db = require("./database/db.js")

// config public
server.use(express.static("public"))

// habilitar uso req.body
server.use(express.urlencoded({ extended: true }))


// utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// config caminhos aplicação
server.get("/", (req, res) => {
    return res.render("index.html")
})


server.get("/createpoint", (req, res) => {
    return res.render("createpoint.html")
})

server.post("/savepoint", (req, res) => {

    // inserir dados
    const query = `INSERT INTO places (
    name,
    image,
    address,
    address2,
    state,
    city,
    items
    ) VALUES (?,?,?,?,?,?,?);`
    const values = [
        req.body.name,
        req.body.image,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if (err) {
            return console.log(err)
        }
        console.log("Cadastrado com sucesso!")
        console.log(this)
        return res.render("createpoint.html", { saved: true })
    }

    db.run(query, values, afterInsertData)
})


server.get("/search", (req, res) => {

    const search = req.query.search

    if (search == "") {
        return res.render("search.html", { total: 0 })
    }

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if (err) {
            return console.log(err)
        }
        const total = rows.length

        // mostrar a página com os dados do bd
        return res.render("search.html", { places: rows, total: total })
    })

})

// ligar o servidor
server.listen(3000)