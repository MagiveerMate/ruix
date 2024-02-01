// App.js

import React, { useState, useEffect } from 'react';
import SignUpPage from './SignUpPage';
import axios from 'axios';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState([]);

  const handleSuccessfulRegistration = () => {
    setIsAuthenticated(true);
  };

  const handleRegistration = async (userData) => {
    try {
      const response = await axios.post('http://localhost:3001/users/register', userData);

      if (response.status === 200) {
        handleSuccessfulRegistration();
      } else {
        // Handle registration error (e.g., display an error message)
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000');
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchUsers();
    }
  }, [isAuthenticated]);

  return (
    <div className="App">
      {!isAuthenticated ? (
        <SignUpPage onSuccessfulRegistration={handleRegistration} />
      ) : (
        <div>
          <p>Welcome! You are now authenticated.</p>
          <p>Users:</p>
          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
