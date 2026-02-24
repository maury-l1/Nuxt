import { eq } from "drizzle-orm";
import * as schema from "./../db/schema";

export async function throwIfUserExists(email: string) {

    const existingUser = await useDb().query.users.findFirst({
        where: eq(schema.users.email, email)
    })

    if (existingUser) {
        throw createError({
            statusCode: 400,
            statusMessage: "Usuario existente"
        })
    }
}
export async function registerUser(name: string, email: string, password: string) {
    const result = await useDb().insert(schema.users).values({
        name,
        email,
        password: await hashPassword(password),
        login: email
    }).returning()
    const newUser = result.at(0);
    if (!newUser) {
        throw createError({ statusCode: 500, statusMessage: "Error al registrar el usuario" })
    }

    return newUser
}   