import React, { useState, useEffect } from 'react';
import ProfileInfo from '../Cards/ProfileInfo';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import { getUserProfile } from '../../pages/Home/noteServices';

const Navbar = ({ searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getUserProfile();
        setUser(profile);
      } catch (err) {
        console.error('Failed to load user profile', err);
      }
    };
    fetchProfile();
  }, []);

const onLogout = () => {
  localStorage.removeItem('token');       
  navigate('/login');
};

  const handleSearch = () => {
    setSearchQuery(searchQuery.trim());
  };

  const onClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
      <h2 className='text-xl font-medium text-black py-2'>Note App</h2>
      <SearchBar
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />
      <ProfileInfo user={user} onLogout={onLogout} />
    </div>
  );
};

export default Navbar;
