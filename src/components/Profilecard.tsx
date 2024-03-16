import React from 'react';
import Image from 'next/image';

const ProfileCard = ({ name, imageUrl }: { name: string, imageUrl: string }) => {
  return (
    <div className="flex items-center border border-gray-300 p-2 rounded-lg">
      
      <Image 
        src={imageUrl}
        alt="Profile"
        width={48}
        height={48}
        className="w-16 h-16 rounded-full mr-4"
      />
      <div>
        <p className="text-sm font-semibold">{name}</p>
        <p className="text-xs text-gray-500">View Profile</p>
      </div>
    </div>
  );
};

export default ProfileCard;
