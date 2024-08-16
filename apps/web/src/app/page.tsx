import { generatePosts } from "@/actions";
import { db } from "@repo/db";

export default async function Home() {
  const posts = await db.post.findMany({
    select: {
      id: true,
      content: true,
      createdAt: true,
      user: { select: { id: true, username: true, name: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form action={generatePosts} className="flex justify-end mb-6">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Generate Posts
        </button>
      </form>

      {posts.map((post) => (
        <div key={post.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
          <p className="font-bold text-blue-500">@{post.user.username}</p>
          <p className="mt-2 text-gray-700">{post.content}</p>
          <p className="mt-2 text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
