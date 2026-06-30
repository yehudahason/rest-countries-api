import { useQuery } from "@tanstack/react-query";

export default function App() {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
      );
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return await response.json();
    },
  });

  if (isPending) return "Loading...";

  if (error) return <h1>{error.message}</h1>;

  return (
    <main className="h-screen bg-blue-700 text-white flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <div>
          {data.map((post: { id: number; title: string }) => (
            <p key={post.id}>{post.title}</p>
          ))}
        </div>

        <div>{isFetching ? "Updating..." : ""}</div>
      </div>
    </main>
  );
}
