import { desc, eq, ilike } from "drizzle-orm"
import { db } from "../../db"
import { blogs } from "../../db/schema"
import { getCurrentUser } from "./session"
import { addToReadingList } from "./readingList"

export const getBlogs = async (filter: string) => {
  return db.query.blogs.findMany({
    where: ilike(blogs.title, `%${filter}%`),
    orderBy: [desc(blogs.likes)],
  })
}

export const getBlogById = async (id: number) => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id),
  })
}

export const addBlog = async (title: string, author: string, url: string) => {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Not logged in")
  }

  const [blog] = await db
    .insert(blogs)
    .values({ title, author, url, userId: user.id })
    .returning()

  await addToReadingList(user.id, blog.id)
}

export const addLike = async (id: number) => {
  const blog = await getBlogById(id)
  if (blog) {
    await db
      .update(blogs)
      .set({ likes: blog.likes + 1 })
      .where(eq(blogs.id, id))
  }
}
