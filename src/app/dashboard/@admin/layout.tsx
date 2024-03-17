import Link from 'next/link'
import React from 'react'


export default function AdminLayout ({ children }:{ children:React.ReactNode }) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 h-screen flex flex-col">
        {/* Add your sidebar content here */}
            <Link className='w-full' href='/dashboard/posts' legacyBehavior passHref>
                <a>Blog Posts</a>
            </Link>
            <Link className='w-full' href='/dashboard/landAcc' legacyBehavior passHref>
                <a>LandLoard account Creation</a>
            </Link>
            <Link className='w-full' href='/dashboard/stuAcc' legacyBehavior passHref>
                <a>Student account Creation</a>
            </Link>
            <Link className='w-full' href='/dashboard/warAcc' legacyBehavior passHref>
                <a>Warden account Creation</a>
            </Link>
      </div>

      {/* Main content */}
      <div className="w-3/4">
        {/* Add your main content here */}
        {children}
      </div>
    </div>
  )
}
