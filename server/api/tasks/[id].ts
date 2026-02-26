import { defineEventHandler, readBody, getRouterParam } from "h3";
import { eq } from "drizzle-orm";
import { useDb } from "../../utils";
import { tasks } from '../../db/schema';

export default defineEventHandler(async (event) => {
    const db = useDb();

    // Obtenemos el id de la URL: /api/tasks/:id
    const idParam = getRouterParam(event, "id");
    const id = Number(idParam); // convertimos a número

    if (isNaN(id)) {
        return { error: "ID inválido" };
    }

    if (event.req.method === "WHERE") {

        const task = await db
            .select()
            .from(tasks)
            .where(eq(tasks.id, id))
            .get(); // .get() devuelve un solo objeto en SQLite

        return task ?? { error: "Tarea no encontrada" };
    }

    // -----------------------------
    // PUT /api/tasks/:id -> actualizar tarea
    // -----------------------------
    if (event.req.method === "PUT") {
        const body = await readBody(event);

        // Actualizamos solo los campos enviados
        const updated = await db
            .update(tasks)
            .set({
                title: body.title,
                description: body.description,
                finalDate: body.finalDate,
                userId: body.userId
            })
            .where(eq(tasks.id, id));

        return { success: true, updated };
    }

    // -----------------------------
    // DELETE /api/tasks/:id -> borrar tarea
    // -----------------------------
    if (event.req.method === "DELETE") {
        const deleted = await db
            .delete(tasks)
            .where(eq(tasks.id, id));

        return { success: true, deleted };
    }

    return { error: "Método no soportado" };
});