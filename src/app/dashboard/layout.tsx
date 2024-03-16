import React from 'react';

export default function dashLayout({ 
    children,
    admin, 
    landloard, 
    student, 
    warden}:{
    children: React.ReactNode,
    admin: React.ReactNode,
    landloard: React.ReactNode,
    student: React.ReactNode,
    warden: React.ReactNode
}) {
    const role = 'admin';
    return (
        <>
            {role === 'admin' ? admin :
                role === 'landloard' ? landloard :
                role === 'student' ? student :
                role === 'warden' ? warden : null}
        </>
    )
}
