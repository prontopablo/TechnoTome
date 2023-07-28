// App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import HomePage from './HomePage';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 250); // 3000ms = 3 seconds

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(loadingTimeout);
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <div>
          <div className="loading-bar">
            <div className="glow progress"></div>
          </div>
        </div>
      ) : (
        <HomePage />
      )}
    </div>
  );
}

export default App;
