import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import prisma from "@/libs/prisma"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@something.com" },
        password: { label: "Password", type: "password" }
      },
      // authorize recibe los datos que me manda el front cuando hago uso de la funcion signIn provista por next-auth (ver SigninForm.tsx)
      async authorize(credentials: any, req) {
        const { email, password } = credentials

        const userFound = await prisma.user.findUnique({
          where: {
            email
          }
        })

        if (!userFound) throw new Error("Invalid credentials")

        // ya en esta instancia el usuario se encontro por lo tanto comparo la contraseña que recibo y la que esta almacenada en la bd
        const validPassword = await bcrypt.compare(password, userFound.password)

        if (!validPassword) throw new Error("Invalid credentials")

        return {
          // convierto el id en un string
          id: userFound.id + "",
          name: userFound.name,
          email: userFound.email
        }
      }
    })
  ],
  pages: {
    signIn: "/auth/login"
  }
})

export { handler as GET, handler as POST }