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
          className="bg-[#61afef] hover:bg-[#528bbd] text-[#1a1d24] font-bold py-2 px-4 rounded-md shadow-lg transition duration-300"
        >
          Generate Posts
        </button>
      </form>

      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-[#21252b] shadow-lg rounded-md p-4 mb-4 border border-[#528bbd]"
        >
          <p className="font-bold text-[#ff79c6]">@{post.user.username}</p>
          <p className="mt-2 text-[#dcdfe4]">{post.content}</p>
          <p className="mt-2 text-sm text-[#50fa7b]">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
