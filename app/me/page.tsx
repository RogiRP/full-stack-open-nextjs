import { redirect } from "next/navigation"
import { getCurrentUser } from "../services/session"
import { generateToken } from "../actions/users"

const MePage = async () => {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

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
    </div>
  )
}

export default MePage
