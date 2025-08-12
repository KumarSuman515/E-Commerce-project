// Re-implement create/update/delete using our Mongoose-backed API instead of Firestore.

/**
 * Create a new category
 * @param {Object} params
 * @param {Object} params.data - category data {name, slug}
 * @param {File} params.image - image file
 */
export const createNewCategory = async ({ data, image }) => {
  if (!data?.name) throw new Error("Name is required");
  if (!data?.slug) throw new Error("Slug is required");

  try {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("slug", data.slug);
    if (image) formData.append("image", image);

    const res = await fetch("/api/categories", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) {
      const msg = await res.json().catch(() => ({}));
      throw new Error(msg?.message || "Failed to create category");
    }
    return await res.json();
  } catch (error) {
    console.error("createNewCategory error:", error);
    throw error;
  }
};

/**
 * Update an existing category
 * @param {Object} params
 * @param {Object} params.data - category data {id, name, slug, imageURL}
 * @param {File} [params.image] - optional new image file
 */
export const updateCategory = async ({ data, image }) => {
  if (!data?.id) throw new Error("ID is required");
  if (!data?.name) throw new Error("Name is required");
  if (!data?.slug) throw new Error("Slug is required");

  try {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("slug", data.slug);
    if (image) formData.append("image", image);

    const res = await fetch(`/api/categories/${data.id}`, {
      method: "PUT",
      body: formData,
    });
    if (!res.ok) {
      const msg = await res.json().catch(() => ({}));
      throw new Error(msg?.message || "Failed to update category");
    }
    return await res.json();
  } catch (error) {
    console.error("updateCategory error:", error);
    throw error;
  }
};

/**
 * Delete a category
 * @param {Object} params
 * @param {string} params.id - category ID
 */
export const deleteCategory = async ({ id }) => {
  if (!id) throw new Error("ID is required");

  try {
    const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const msg = await res.json().catch(() => ({}));
      throw new Error(msg?.message || "Failed to delete category");
    }
    return await res.json();
  } catch (error) {
    console.error("deleteCategory error:", error);
    throw error;
  }
};
