import * as schema from "../../db/schema";
import { eq } from "drizzle-orm"


export default defineEventHandler(async (event) => {

  const { email, password } = await readBody(event)
  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Faltan campos por introducir"
    })
  }

  const existingUser = await useDb().query.users.findFirst({
    where: eq(schema.users.email, email)
  })

  if (!existingUser) {
    throw createError({
      statusCode: 400,
      statusMessage: "Usuario no registrado"
    })
  }

  if(!existingUser.password){
    throw createError({
      statusCode: 400,
      statusMessage: "Contraseña incorrecta Github"
    })
  }

  const isValid = await verifyPassword(existingUser.password, password)

  if(!isValid){
    throw createError ({
      statusCode: 400,
      statusMessage: "Contraseña incorrecta"
    })
  }

});
