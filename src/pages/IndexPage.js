import React from "react";
import Post from "../components/Post";

function IndexPage() {
    const [posts, setPosts] = React.useState([]);

    React.useEffect(() => {
        fetch('http://localhost:4000/post').then(response => {
            response.json().then(posts => {
                console.log(posts);
                setPosts(posts);
            });
        });
    }, []);

    return (
        <>
            {posts.length > 0 && posts.map(post => (
                <Post key={post._id} {...post} />
            ))}
        </>
    );
}

export default IndexPage;