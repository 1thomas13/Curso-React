
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req, res) {

    if(req.method === 'POST') {
        const orden = await prisma.orden.create({
            data: {
                nombre:req.body.nombre,
                total:req.body.total,
                pedido:req.body.pedido,
                fecha:req.body.fecha,
            }
        })

        return res.status(200).json(orden)
    }


    return res.json({error: 'El metodo debe ser POST'})
}
