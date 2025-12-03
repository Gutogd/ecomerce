const Entrega = require('../models/Entrega')
const Pedido = require('../models/Pedido')

module.exports = {

    async cadastrar(dados) {

    // Agora permite cadastrar sem pedido
    const novaEntrega = await Entrega.create({
        idPedido: dados.idPedido || null,
        cep: dados.cep, 
        logradouro: dados.logradouro,
        numero: dados.numero,
        complemento: dados.complemento,
        bairro: dados.bairro,
        localidade: dados.localidade,
        uf: dados.uf,
        dataEstimada: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        codigoRastreio: `BR${Math.floor(Math.random() * 999999999)}`,
        statusEntrega: "PENDENTE"
    })

    return novaEntrega
},


    async listar() {
        return await Entrega.findAll()
    },


    async atualizarStatus(idEntrega, statusEntrega) {

        const entrega = await Entrega.findByPk(idEntrega)

        if (!entrega) {
            throw new Error("Entrega não encontrada!")
        }

        entrega.statusEntrega = statusEntrega
        await entrega.save()

        return entrega
    }
}
