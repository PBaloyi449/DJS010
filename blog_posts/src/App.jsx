import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Blog Posts</h1>
      {error ? (
        <div className="card">
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      ) : (
        <div className="card">
          {posts.map((post, index) => (
            <div key={post.id}>
              <h2>{`${index + 1}. ${post.title}`}</h2>
              <p>{post.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
