import { useState } from "react";
import { toast } from "react-hot-toast";
import { createNewCategory } from "../../../../../lib/firestore/categories/write";

export default function Form() {
  const [data, setData] = useState({});
  const [image, setImage] = useState(null);

  const handleData = (key, value) => {
    setData((prevData) => ({ ...(prevData ?? {}), [key]: value }));
  };

  const handleCreate = async () => {
    try {
      await createNewCategory ({ data, image });
      toast.success("Category created successfully");
      setData({});
      setImage(null);
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-white rounded-xl p-5 gap-5 w-full md:w-[400px] shadow-md">
      <h1 className="font-semibold text-lg mb-4">Category Form</h1>

      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleCreate();
        }}
      >
        {/* Image Upload */}
        <div>
          <label
            htmlFor="category-image"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Image <span className="text-red-500">*</span>
          </label>
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Category"
              className="mb-2 w-full h-32 object-cover rounded-md"
            />
          )}
          <input
            id="category-image"
            type="file"
            onChange={(e) => {
              if (e.target.files.length > 0) {
                setImage(e.target.files[0]);
              }
            }}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Name */}
        <div>
          <label
            htmlFor="category-name"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="category-name"
            type="text"
            placeholder="Category Name"
            value={data?.name || ""}
            onChange={(e) => handleData("name", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Slug */}
        <div>
          <label
            htmlFor="category-slug"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Slug <span className="text-red-500">*</span>
          </label>
          <input
            id="category-slug"
            type="text"
            placeholder="Category Slug"
            value={data?.slug || ""}
            onChange={(e) => handleData("slug", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
        >
          Create
        </button>
      </form>
    </div>
  );
}
