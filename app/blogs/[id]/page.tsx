import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import { likeBlog, addBlogToReadingList } from "../../actions/blogs"
import { getCurrentUser } from "../../services/session"
import { isInReadingList } from "../../services/readingList"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  const user = await getCurrentUser()
  const canAddToReadingList =
    user &&
    blog.userId !== user.id &&
    !(await isInReadingList(user.id, blog.id))

  return (
    <div data-testid="blog-detail" className="max-w-2xl mx-auto p-6">
      <h2 data-testid="blog-title" className="text-2xl font-bold mb-2">
        {blog.title}
      </h2>
      <p data-testid="blog-author" className="text-gray-600 mb-2">
        Author: {blog.author}
      </p>
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
      {canAddToReadingList && (
        <form action={addBlogToReadingList} className="mt-4">
          <input type="hidden" name="blogId" value={blog.id} />
          <button
            type="submit"
            data-testid="add-to-reading-list-button"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            add to reading list
          </button>
        </form>
      )}
    </div>
  )
}

export default BlogPage
