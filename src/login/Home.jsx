import { useEffect, useState } from "react";
import axios from "axios";
import PostForm from "../components/PostForm";

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [editingPost, setEditingPost] = useState(null);
    const [updatedTitle, setUpdatedTitle] = useState("");
    const [updatedDescription, setUpdatedDescription] = useState("");
    
    const token = localStorage.getItem("token");
    const userEmail = token ? JSON.parse(atob(token.split(".")[1])).email : null;

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/posts");
                setPosts(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchPosts();
    }, []);

    const handleDelete = async (postId) => {
        try {
            await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPosts(posts.filter(post => post._id !== postId));
        } catch (err) {
            console.error("Failed to delete post", err);
        }
    };

    const handleUpdate = async (postId) => {
        try {
            const res = await axios.put(`http://localhost:5000/api/posts/${postId}`, {
                title: updatedTitle,
                description: updatedDescription,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPosts(posts.map(post => post._id === postId ? res.data : post));
            setEditingPost(null);
        } catch (err) {
            console.error("Failed to update post", err);
        }
    };

    return (
        <div>
            {token && <PostForm setPosts={setPosts} />}
            <h2>All Posts</h2>
            {posts.map((post) => (
                <div key={post._id} className="post">
                    {editingPost === post._id ? (
                        <>
                            <input 
                                type="text" 
                                value={updatedTitle} 
                                onChange={(e) => setUpdatedTitle(e.target.value)} 
                            />
                            <textarea 
                                value={updatedDescription} 
                                onChange={(e) => setUpdatedDescription(e.target.value)}
                            />
                            <button onClick={() => handleUpdate(post._id)}>Save</button> <br /> <br />
                            <button onClick={() => setEditingPost(null)}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <h3>{post.title}</h3>
                            <p>{post.description}</p>
                            <p><b>Categories:</b> {post.categories.join(", ")}</p>
                            <p><b>Posted by:</b> {post.userEmail}</p>
                            <p><b>Created at:</b> {new Date(post.createdAt).toLocaleString()}</p>
                            {userEmail === post.userEmail && (
                                <>
                                    <button onClick={() => {
                                        setEditingPost(post._id);
                                        setUpdatedTitle(post.title);
                                        setUpdatedDescription(post.description);
                                    }}>Edit</button> <br /> <br />
                                    <button onClick={() => handleDelete(post._id)}>Delete</button>
                                </>
                            )}
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}
