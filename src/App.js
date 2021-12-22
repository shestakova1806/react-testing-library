import React, { useState, useEffect } from 'react';
import './App.css';

const getUser = () => Promise.resolve({ id: 1, name: 'Sasha' });

const Search = ({ value, onChange, children }) => (
  <div>
    <label htmlFor="search">{children}</label>
    <input
      placeholder="search text..."
      id="search"
      type="text"
      value={value}
      onChange={onChange}
    />
  </div>
);

const App = () => {
  const [search, setSearch] = useState('');
  const [user, setUser] = useState();

  useEffect(() => {
    const loadUser = async () => {
      const user = await getUser();
      setUser(user);
    };
    loadUser();
  }, []);

  const handleChange = ({ target }) => {
    setSearch(target.value);
  };

  return (
    <div>
      {user && <h2>Logged in as {user.name}</h2>}
      <img src="" alt="search image" className="image" />
      <Search value={search} onChange={handleChange}>
        SEARCH:
      </Search>
      <p>Searches for {search ? search : '...'}</p>
    </div>
  );
};

export default App;
