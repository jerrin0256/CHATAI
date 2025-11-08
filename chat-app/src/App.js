import React, { useState } from 'react';
import Chat from './pages/Chat';

function App() {
  // Create a default user since we're skipping login
  const [user, setUser] = useState({ username: 'User' });

  const handleLogout = () => {
    // This function can remain in case you implement logout functionality later
    localStorage.removeItem('token');
    setUser({ username: 'User' }); // Reset to default user instead of null
  };

  return (
    <div className="App bg-gray-100 min-h-screen">
      <Chat user={user} onLogout={handleLogout} />
    </div>
  );
}

export default App;