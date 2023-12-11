import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import prisma from "@/libs/prisma"

export async function POST(request: Request) {
  // tiene que convertir los datos que recibo a traves de la peticion que hago en SignupForm.tsx en JSON
  const data = await request.json()

  // hace que el algoritmo de hash se ejecute con un string unico, lo que lo hace un poco mas seguro
  const salt = await bcrypt.genSalt(10)
  data.password = await bcrypt.hash(data.password, salt)

  const newUser = await prisma.user.create({
    data
  })

  // de esta manera omito el password en el objeto newUser y hago que no se muestre en la respuesta que se retorna
  const { password, ...user } = newUser

  return NextResponse.json(user, {
    status: 201
  })
}