export { default } from "next-auth/middleware"

// en la siguiente linea se va a decir que es lo que se quiere proteger de personas que no estan autenticadas
// en el siguiente caso se esta diciendo que proteja o restrinja todo lo que esta en la carpeta dashboard
// :path* es como decir cualquier ruta que venga despues de /dashboard/ entonces la proteje
export const config = { matcher: ["/dashboard/:path*"] }