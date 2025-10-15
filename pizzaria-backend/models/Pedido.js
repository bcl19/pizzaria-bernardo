const mongoose = require("mongoose")

const PedidoSchema = new mongoose.Schema({
  usuario: { type: String, required: true }, // email do usuário
  pizzas: [
    {
      pizzaId: { type: mongoose.Schema.Types.ObjectId, ref: "Pizza" },
      quantidade: { type: Number, required: true }
    }
  ],
  total: { type: Number, required: true },
  status: { type: String, default: "Em preparo" }, // "Em preparo", "Pronto", "Entregue"
  data: { type: Date, default: Date.now }
})

module.exports = mongoose.model("Pedido", PedidoSchema)
