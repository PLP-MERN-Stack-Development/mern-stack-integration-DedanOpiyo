// client/src/pages/PostList.jsx
import { useEffect, useState } from "react";
import { postService } from "../services/api";
import { Link } from "react-router-dom";
import PostItem from "../components/PostItem";
import SearchBar from "../components/SearchBar";
import CategorySidebar from "../components/CategorySidebar";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const data = await postService.getAllPosts(page, 5);
        setPosts(data.posts);
        console.log('Data: ', data)
        setTotalPosts(data.totalPosts);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading posts...</p>;

  return (
    <div className="container mx-auto px-4 mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">

      {/* Sidebar */}
      <div>
        <CategorySidebar
            onCategorySelect={async (categoryId) => {
            setPage(1);

            if (!categoryId) return fetchPosts();

            const data = await postService.getAllPosts(1, 10, categoryId);
            setPosts(data.posts);
            setTotalPages(data.totalPages);
            }}
        />
      </div>

      {/* Content */}
      <div className="md:col-span-3 min-h-[0.8vh]">
        <SearchBar onSearch={async (query) => {
            if (!query) return fetchPosts(); // resets posts

            const results = await postService.searchPosts(query);
            setPosts(results);
            setTotalPages(1);
        }} />

        {totalPosts === 0 ? 
          <Link to="/create" className="btn btn-primary mt-5 mb-5 text-blue-500 underline">
            Create New Post
          </Link>
          : 
          posts.map((post) => (
            <PostItem key={post._id} post={post} />
          ))
        }

        <div className="flex justify-center items-center space-x-4 mt-6 fixed bottom-5">
            <button
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
                className={`px-4 py-2 rounded ${
                page === 1 ? "bg-gray-300" : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
            >
                Previous
            </button>

            <span className="font-medium">
                Page {page} of {totalPages}
            </span>

            <button
                disabled={page === totalPages}
                onClick={() => setPage((prev) => prev + 1)}
                className={`px-4 py-2 rounded ${
                page === totalPages
                    ? "bg-gray-300"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
            >
                Next
            </button>
        </div>
      </div>
    </div>
  );
}

export default PostList;
