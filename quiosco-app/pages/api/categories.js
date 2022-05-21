// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req, res) {

  const categories = await prisma.categoria.findMany({
    include:{productos:true}
  })

  res.json(categories)
}
