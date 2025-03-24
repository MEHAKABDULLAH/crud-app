import { useState } from "react";
import axios from "axios";


export default function PostForm({ setPosts }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [categories, setCategories] = useState("");
    const token = localStorage.getItem("token");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("📢 Token being sent:", token);

        if (!token) {
            alert("❌ No token found. Please log in again.");
            return;
        }

        try {
            // Decode JWT token to extract user email
            const tokenPayload = JSON.parse(atob(token.split(".")[1]));
            const userEmail = tokenPayload.email; // Extract user email from token

            if (!userEmail) {
                alert("❌ No user email found in token.");
                return;
            }

            const res = await axios.post(
                "https://backend-iota-tan-15.vercel.app/api/posts",
                { 
                    title, 
                    description, 
                    categories: categories.split(","), 
                    userEmail // ✅ Include userEmail
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("✅ Post created successfully:", res.data);
            setPosts((prev) => [res.data, ...prev]);
            setTitle("");
            setDescription("");
            setCategories("");
        } catch (err) {
            console.error("❌ Failed to create post:", err.response?.data || err.message);
            alert(err.response?.data?.message || "Failed to create post");
        }
    };

    return (
        <div>
            <h2>Create Post</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                <input type="text" placeholder="Categories (comma separated)" value={categories} onChange={(e) => setCategories(e.target.value)} />
                <button type="submit">Post</button>
            </form>
        </div>
    );
}
