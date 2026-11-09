import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import { likeBlog } from "../../actions/blogs"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
      <p className="text-gray-600 mb-2">Author: {blog.author}</p>
      <p className="mb-2">
        URL:{" "}
        <a href={blog.url} className="text-blue-600 hover:underline">
          {blog.url}
        </a>
      </p>
      <div className="flex items-center gap-3">
        <p>Likes: {blog.likes}</p>
        <form action={likeBlog}>
          <input type="hidden" name="id" value={blog.id} />
          <button
            type="submit"
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            like
          </button>
        </form>
      </div>
    </div>
  )
}

export default BlogPage
