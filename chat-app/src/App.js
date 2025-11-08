import React, { useState } from 'react';
import Chat from './pages/Chat';

function App() {
  const [user, setUser] = useState({ username: 'User' });

  const handleLogout = () => {

    localStorage.removeItem('token');
    setUser({ username: 'User' }); 
  };

  return (
    <div className="App bg-gray-100 min-h-screen">
      <Chat user={user} onLogout={handleLogout} />
    </div>
  );
}

export default App;