const mongoose = require("mongoose")

const PizzaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String },
  preco: { type: Number, required: true },
  imagem: { type: String } // pode guardar URL da imagem
})

module.exports = mongoose.model("Pizza", PizzaSchema)
