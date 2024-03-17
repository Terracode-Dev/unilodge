import React from 'react';

export default function dashLayout({ 
    admin, 
    landloard, 
    student, 
    warden}:{
    admin: React.ReactNode,
    landloard: React.ReactNode,
    student: React.ReactNode,
    warden: React.ReactNode
}) {
    const role = 'admin';
    return (
        <div className='m-4'>
            {role === 'admin' ? admin :
                role === 'landloard' ? landloard :
                role === 'student' ? student :
                role === 'warden' ? warden : null}
        </div>
    )
}
