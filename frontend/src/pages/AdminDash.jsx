import React from 'react'
import { isAuthenticated } from '../utils/authService';
import UnauthorizedPage from './UnAuth';

const AdminDash = () => {
  return (
    isAuthenticated()? 
    <div>
      <h1>Admin Dashboard</h1>
    </div>: <div>
      <UnauthorizedPage />
    </div>
  )
}

export default AdminDash
