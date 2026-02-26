import { readBody } from "h3";
import { useDb } from "../../utils";
import { tasks } from '../../db/schema';


export default defineEventHandler(async (event) => {
  
  const db = useDb();
    // GET /api/tasks
  if (event.node.req.method === "GET") {
  
  const allTasks = await db.select().from(tasks);
  return allTasks;
  }
  // POST /api/tasks
  if (event.node.req.method === "POST") {
    const body = await readBody(event);
    return await db.insert(tasks).values({
      title: body.title,
      description: body.description,
      finalDate: body.finalDate,
      userId: body.userId
    });
  }
});