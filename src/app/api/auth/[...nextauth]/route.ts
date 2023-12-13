import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import prisma from "@/libs/prisma"

export const authOptions: AuthOptions = {
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
  // son como eventos que se ejecutan
  callbacks: {
    // se ejecuta cuando se crea el token en el front, es decir cuando se crea o inicia la sesion. Se ejecuta cuando se define el jwt en la cookie
    // este evento lo guarda en el token
    async jwt({ token, user, account, profile }) {
      if (user) {
        // al objeto token le añado una propiedad llamada id y le agrego el valor de user.id
        token.id = user.id;
      }

      return token;
    },
    // se ejecuta cuando se crea la sesion pero es lo que se puede ver en consola
    // este evento lo guarda en la sesion
    async session({ session, user, token }) {
      if (token) {
        // al objeto session le añado una propiedad llamada id y le agrego el valor de token.sub que vendria a ser el id
        session.user.id = token.sub as string;
      }

      return session;
    }
  },
  pages: {
    signIn: "/auth/login"
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }