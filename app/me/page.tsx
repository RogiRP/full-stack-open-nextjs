import Link from "next/link"
import { redirect } from "next/navigation"
import { getCurrentUser } from "../services/session"
import { generateToken } from "../actions/users"
import { getUserWithReadingList } from "../services/readingList"

const MePage = async () => {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const userWithReadingList = await getUserWithReadingList(user.id)
  const readings = userWithReadingList?.readingList ?? []

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">{user.name}</h2>
      <p className="mb-4">Username: {user.username}</p>
      <h3 className="text-xl font-semibold mb-2">API token</h3>
      {user.token ? (
        <p className="mb-2">
          <code className="bg-gray-100 px-2 py-1 rounded">{user.token}</code>
        </p>
      ) : (
        <p className="mb-2 text-gray-600">No token has been generated yet</p>
      )}
      <form action={generateToken}>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Generate new token
        </button>
      </form>
      <h3 className="text-xl font-semibold mt-6 mb-2">Reading list</h3>
      {readings.length === 0 ? (
        <p className="text-gray-600">Your reading list is empty</p>
      ) : (
        <ul className="space-y-2">
          {readings.map((reading) => (
            <li key={reading.id} className="border rounded p-3">
              <Link
                href={`/blogs/${reading.blog.id}`}
                className="text-blue-600 hover:underline"
              >
                {reading.blog.title}
              </Link>{" "}
              by {reading.blog.author}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default MePage
