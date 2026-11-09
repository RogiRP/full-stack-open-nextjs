"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { users } from "@/db/schema"

type RegisterErrors = {
  username?: string
  password?: string
  passwordConfirm?: string
}

export const registerUser = async (
  prevState: { errors: RegisterErrors },
  formData: FormData,
) => {
  const username = (formData.get("username") as string)?.trim()
  const name = (formData.get("name") as string)?.trim()
  const password = formData.get("password") as string
  const passwordConfirm = formData.get("passwordConfirm") as string

  const errors: RegisterErrors = {}
  if (!username || username.length < 4) {
    errors.username = "Username must be at least 4 characters long"
  }
  if (!password || password.length < 4) {
    errors.password = "Password must be at least 4 characters long"
  }
  if (password !== passwordConfirm) {
    errors.passwordConfirm = "Passwords do not match"
  }

  if (!errors.username) {
    const existingUser = await db.query.users.findFirst({
      where: eq(users.username, username),
    })
    if (existingUser) {
      errors.username = "Username is already taken"
    }
  }

  if (Object.keys(errors).length > 0) {
    return { errors }
  }

  const passwordHash = await bcrypt.hash(password, 10)

  await db.insert(users).values({ username, name, passwordHash })

  revalidatePath("/users")
  redirect("/login")
}
