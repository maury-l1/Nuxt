import { useDb } from "../../utils";
import { users } from '../../db/schema';


export default defineEventHandler(async (event) => {
  // ejemplo simple: GET /api/users
  const db = useDb();
  const allUsers = await db.select().from(users);
  return allUsers;
});