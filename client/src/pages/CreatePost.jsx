// client/src/pages/CreatePost.jsx
import { useState, useEffect } from "react";
import { postService, categoryService } from "../services/api";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";

function CreatePost() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    categoryService.getAllCategories().then(setCategories);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    if (image) formData.append("featuredImage", image);

    try {
      await postService.createPost(formData);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to create post.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <Card>
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:-text-gray-100">
          Create New Post
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Title */}
          <div>
            <label className="block font-medium mb-1 text-gray-700 dark-:text-gray-300">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border dark-:border-gray-700 px-3 py-2 rounded
                         bg-white dark-:bg-gray-900 text-gray-900 dark-:text-gray-100
                         focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block font-medium mb-1 text-gray-700 dark-:text-gray-300">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows="6"
              className="w-full border dark-:border-gray-700 px-3 py-2 rounded
                         bg-white dark-:bg-gray-900 text-gray-900 dark-:text-gray-100
                         focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium mb-1 text-gray-700 dark-:text-gray-300">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full border dark-:border-gray-700 px-3 py-2 rounded
                         bg-white dark-:bg-gray-900 text-gray-900 dark-:text-gray-100
                         focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option value={c._id} key={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-medium mb-1 text-gray-700 dark-:text-gray-300">
              Featured Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-gray-700 dark-:text-gray-300
                         file:bg-blue-600 file:text-white file:border-none
                         file:px-4 file:py-2 file:rounded
                         dark:file:bg-blue-700
                         cursor-pointer"
            />

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-4 w-full max-w-xs rounded shadow"
              />
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg
                       hover:bg-blue-700 dark:bg-blue-700 dark-:hover:bg-blue-800
                       transition"
          >
            Create Post
          </button>
        </form>
      </Card>
    </div>
  );
}

export default CreatePost;
