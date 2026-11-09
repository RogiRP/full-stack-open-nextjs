import Link from "next/link"
import { redirect } from "next/navigation"
import { getCurrentUser } from "../services/session"
import { generateToken } from "../actions/users"
import { markReadingAsRead } from "../actions/blogs"
import { getUserWithReadingList } from "../services/readingList"

const MePage = async () => {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const userWithReadingList = await getUserWithReadingList(user.id)
  const readings = userWithReadingList?.readingList ?? []
  const unread = readings.filter((reading) => !reading.read)
  const read = readings.filter((reading) => reading.read)

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
        <>
          <h4 className="font-semibold mt-4 mb-2">Unread</h4>
          {unread.length === 0 ? (
            <p className="text-gray-600">No unread blogs</p>
          ) : (
            <ul className="space-y-2">
              {unread.map((reading) => (
                <li
                  key={reading.id}
                  className="border rounded p-3 flex items-center justify-between"
                >
                  <span>
                    <Link
                      href={`/blogs/${reading.blog.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {reading.blog.title}
                    </Link>{" "}
                    by {reading.blog.author}
                  </span>
                  <form action={markReadingAsRead}>
                    <input type="hidden" name="id" value={reading.id} />
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      mark as read
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          )}
          <h4 className="font-semibold mt-4 mb-2">Read</h4>
          {read.length === 0 ? (
            <p className="text-gray-600">No read blogs</p>
          ) : (
            <ul className="space-y-2">
              {read.map((reading) => (
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
        </>
      )}
    </div>
  )
}

export default MePage
