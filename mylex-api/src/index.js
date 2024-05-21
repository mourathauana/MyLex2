const express = require("express")
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://IgorSantiago:rafael301125@cluster0.goak2rn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

const app = express()
const port = 3000

const Advogado = mongoose.model("Advogado", {
    nomeCompleto: String,
    razaoSocial: String,
    emailCorporativo: String,
    senha: Number,
    cnpj: Number,
    cna: Number,
    telefone: Number
});

app.get("/get", async (req, res) => {
    const advogados = await Advogado.find()
    return res.send(advogados)
})

app.delete("/delete:id", async (req, res) => {
    const advogado = await Advogado.findByIdAndRemove(req.params.id)
    return res.send(advogado)
})

app.put("/update:id", async (req, res) => {
    const advogado = await Advogado.findByIdAndUpdate(req.params.id, {
        nomeCompleto: req.body.nomeCompleto,
        razaoSocial: req.body.razaoSocial,
        emailCorporativo: req.body.emailCorporativo,
        senha: req.body.senha,
        cnpj: req.body.cnpj,
        cna: req.body.cna,
        telefone: req.body.telefone
    }, {
        new: true
    })

    return res.send(advogado)
})

app.post("/post", async (req, res) => {
    const advogado = new Advogado({
        nomeCompleto: req.body.nomeCompleto,
        razaoSocial: req.body.razaoSocial,
        emailCorporativo: req.body.emailCorporativo,
        senha: req.body.senha,
        cnpj: req.body.cnpj,
        cna: req.body.cna,
        telefone: req.body.telefone
    })
    
    await advogado.save()
    return res.send(advogado)
})

app.listen(port, () => {
    console.log("Rodando maria hihi")
})