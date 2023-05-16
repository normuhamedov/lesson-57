
import './App.css'

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [count, setCount] = useState(0);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  }

  const filteredPosts = posts.filter(post =>
    post.body.includes(searchTerm)
  );

  const HandleCountP = () => {
    setCount(count + 1);
  }

  const HandleCountM = () => {
    if (count === 14) {
      setShowLoader(true);
      setTimeout(() => {
        setCount(count - 1);
        setShowLoader(false);
      }, 1000);
    } else {
      setCount(count - 1);
    }
  }

  let bgColor;
  if (count > 24) {
    bgColor = 'red';
  } else if (count > 14) {
    bgColor = 'yellow';
  } else if (count < 1) {
    bgColor = "#acacace2"
  } else {
    bgColor = 'dimgray';
  }


  return (
    <>
      <div className='tamp'>
        <div className='tamp_bg' style={{ backgroundColor: bgColor }}>
          <h1>{count}°C</h1>
          {showLoader && <div className='Spinner'></div>}
        </div>
        <div className='btnWrap'>
          <button onClick={HandleCountP}>+</button>
          <button onClick={HandleCountM}>-</button>
        </div>
      </div>
    
    <div>
      <input type="text" placeholder="Search" onChange={handleSearch} />
      <ul>
        {filteredPosts.map(post =>
          <li key={post.id}>{post.title}</li>
        )}
      </ul>
    </div>
    </>
  );
}

export default App;
