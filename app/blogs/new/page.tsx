"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createBlog } from "../../actions/blogs"
import { useNotification } from "../../components/NotificationContext"

const initialState = {
  errors: {} as { title?: string; author?: string; url?: string },
  values: { title: "", author: "", url: "" },
  success: false,
}

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, initialState)
  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      showNotification("blog created")
      router.push("/blogs")
    }
  }, [state, showNotification, router])

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Create a new blog</h2>
      <form action={formAction} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">
            Title
            <input
              type="text"
              name="title"
              className="mt-1 block w-full border rounded px-3 py-2"
              defaultValue={state.values?.title}
            />
          </label>
          {state.errors.title && (
            <p className="text-red-600 text-sm">{state.errors.title}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">
            Author
            <input
              type="text"
              name="author"
              className="mt-1 block w-full border rounded px-3 py-2"
              defaultValue={state.values?.author}
            />
          </label>
          {state.errors.author && (
            <p className="text-red-600 text-sm">{state.errors.author}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">
            URL
            <input
              type="text"
              name="url"
              className="mt-1 block w-full border rounded px-3 py-2"
              defaultValue={state.values?.url}
            />
          </label>
          {state.errors.url && (
            <p className="text-red-600 text-sm">{state.errors.url}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create
        </button>
      </form>
    </div>
  )
}

export default NewBlog
