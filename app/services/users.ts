import { db } from "../../db"

export const getUsers = async () => {
  return db.query.users.findMany()
}
