import { eq } from "drizzle-orm";
import * as schema from "../../db/schema"

export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true
  },
  async onSuccess(event, { user, tokens }) {
    await setUserSession(event, {
      user: {
        login: user.login
      }
    });
    if(!user.email){
      throw createError({
        status: 500,
        statusMessage: "No s'ha proporcionat l'email"
      });
    }
    // Comprovar si usuari de github existeix a base de dades
    const db = useDb();
    let existingUser = await db.query.users.findFirst({
      where: eq(schema.users.email, user.email),
    });
    if(!existingUser){
      const result = db.insert(schema.users).values({
        email: user.email,
        login: user.login,
        name: user.name
      }).returning()
      existingUser = (await result).at(0);
    }
    if(!existingUser){
      throw createError({
        status: 500,
        statusMessage: "Error d'autenticació Github"
      });
    }
    const { password, ...userWithoutPassword } = existingUser;
    await setUserSession(event, {
      user: {
        login: user.login
      }
    });
    return sendRedirect(event, '/');
  },
  // Optional, will return a json error and 401 status code by default
  onError(event, error) {
    console.error('GitHub OAuth error:', error);
    return sendRedirect(event, '/');
  },
});