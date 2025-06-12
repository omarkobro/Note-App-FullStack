import React from 'react';
import { getInitials } from '../../utils/helper';

const ProfileInfo = ({ user, onLogout }) => {
  if (!user) return null;

  return (
    <div className='flex items-center gap-3'>
      <div className='w-12 h-12 flex items-center justify-center ml-1 rounded-full text-slate-950 font-medium bg-slate-100'>
        {getInitials(user.fullName || `${user.firstName} ${user.lastName}`)}
      </div>
      <div>
        <p className='text-sm font-medium'>{user.firstName}</p>
        <button className='text-sm text-slate-700 underline' onClick={onLogout}>
          logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
