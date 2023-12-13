import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: Request) {
  const data = await request.json();

  // getServerSession es una funcion especial para el BE, muy similar al useSession en el client solo que se permite usar desde el BE
  // como parametro necesita la configuracion del NextAuth
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const newProject = await prisma.project.create({
    data: {
      title: data.title,
      description: data.description,
      user: {
        // en connect le digo con que propiedad del usuario va a ir conectado
        connect: {
          id: parseInt(session.user.id),
        },
      },
    },
  });

  return NextResponse.json(newProject, {
    status: 201,
  });
}
