import { useEffect, useState } from 'react';
import axios from 'axios';
const PostList = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/posts').then(res => setPosts(res.data));
    }, []);
    return (
        <div>
            {posts.map((post) => (
                <div key={post._id}>
                    <h4>{post.email}</h4>
                    <p>{post.content}</p>
                </div>
            ))}
        </div>
    );
};
export default PostList;