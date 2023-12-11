import { NextResponse } from "next/server";
import prisma from "@/libs/prisma"

export async function POST(request: Request) {
  // tiene que convertir los datos que recibo a traves de la peticion que hago en SignupForm.tsx en JSON
  const data = await request.json()

  const newUser = await prisma.user.create({
    data
  })

  return NextResponse.json(newUser, {
    status: 201
  })
}