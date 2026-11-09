import { and, eq } from "drizzle-orm"
import { db } from "../../db"
import { readingList, users } from "../../db/schema"

export const addToReadingList = async (userId: number, blogId: number) => {
  await db.insert(readingList).values({ userId, blogId })
}

export const isInReadingList = async (userId: number, blogId: number) => {
  const entry = await db.query.readingList.findFirst({
    where: and(eq(readingList.userId, userId), eq(readingList.blogId, blogId)),
  })
  return Boolean(entry)
}

export const getUserWithReadingList = async (id: number) => {
  return db.query.users.findFirst({
    where: eq(users.id, id),
    with: { readingList: { with: { blog: true } } },
  })
}
