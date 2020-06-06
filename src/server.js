const express = require("express")
const server = express()

// config public
server.use(express.static("public"))


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

server.get("/search", (req, res) => {
    return res.render("search.html")
})



// ligar o servidor
server.listen(3000)