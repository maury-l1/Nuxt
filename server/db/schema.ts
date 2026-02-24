import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  login: text("login"),
  password: text("password"),
});

export const tasks = sqliteTable("tasks", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  finalDate: text("finalDate"),
  userId: integer("userId")
    .notNull()
    .references(() => users.id), // ← aquí se define la foreign key
});