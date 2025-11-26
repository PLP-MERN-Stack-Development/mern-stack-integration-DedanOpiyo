// client/src/components/CategorySidebar.jsx
import { useEffect, useState } from "react";
import { categoryService } from "../services/api";

export default function CategorySidebar({ onCategorySelect }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    categoryService.getAllCategories().then(setCategories);
  }, []);

  return (
    <div className="p-4 bg-white shadow rounded-lg mb-6">
      <h3 className="text-lg font-semibold mb-4">Categories</h3>

      <button
        onClick={() => onCategorySelect(null)}
        className="block mb-2 text-blue-600 hover:underline"
      >
        All Posts
      </button>

      {categories.map((cat) => (
        <button
          key={cat._id}
          onClick={() => onCategorySelect(cat._id)}
          className="block text-gray-700 hover:text-blue-600 hover:underline mb-2"
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
