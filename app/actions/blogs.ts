"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import { addBlog, addLike } from "../services/blogs"
import { getCurrentUser } from "../services/session"
import { addToReadingList } from "../services/readingList"

type BlogErrors = {
  title?: string
  author?: string
  url?: string
}

type BlogValues = {
  title: string
  author: string
  url: string
}

export const createBlog = async (
  prevState: { errors: BlogErrors; values?: BlogValues; success?: boolean },
  formData: FormData,
) => {
  const session = await auth()
  if (!session) {
    redirect("/login")
  }

  const title = formData.get("title") as string
  const author = formData.get("author") as string
  const url = formData.get("url") as string

  const errors: BlogErrors = {}
  if (!title || title.length < 5) {
    errors.title = "Title must be at least 5 characters long"
  }
  if (!author || author.length < 5) {
    errors.author = "Author must be at least 5 characters long"
  }
  if (!url || url.length < 5) {
    errors.url = "URL must be at least 5 characters long"
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { title, author, url }, success: false }
  }

  await addBlog(title, author, url)

  revalidatePath("/blogs")
  return {
    errors: {},
    values: { title: "", author: "", url: "" },
    success: true,
  }
}

export const likeBlog = async (formData: FormData) => {
  const id = Number(formData.get("id"))
  await addLike(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}

export const addBlogToReadingList = async (formData: FormData) => {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  const blogId = Number(formData.get("blogId"))
  await addToReadingList(user.id, blogId)
  revalidatePath(`/blogs/${blogId}`)
  revalidatePath("/me")
}
