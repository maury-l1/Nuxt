import { drizzle } from "drizzle-orm/libsql"
import { eq } from "drizzle-orm"
import * as schema from "../../db/schema";
import { registerUser, throwIfUserExists } from "~~/server/utils/registerUtils";

export default defineEventHandler(async (event) => {

    //1. Accedo a los campos del formulario 
    const { name, email, password } = await readBody(event)
    if (!name || !email || !password) {
        throw createError({
            statusCode: 400,
            statusMessage: "El usuario ya existe"
        })
    }

    await throwIfUserExists(email)

    const newUser = await registerUser(name, email, password)

    const {password: rePassword, ...userWithoutPassword} = newUser

    await setUserSession(event, {
        user: userWithoutPassword
    })

    return userWithoutPassword
})