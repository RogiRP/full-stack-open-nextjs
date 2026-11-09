import Link from "next/link"
import { getBlogs } from "../services/blogs"

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) => {
  const { filter = "" } = await searchParams
  const blogs = await getBlogs(filter)

  return (
    <div>
      <h2>Blogs</h2>
      <form action="/blogs">
        <input type="text" name="filter" defaultValue={filter} />
        <button type="submit">search</button>
      </form>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link> by{" "}
            {blog.author}, {blog.likes} likes
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Blogs
