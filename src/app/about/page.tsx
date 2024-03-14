import ProfileCard from '@/components/Profilecard'
import React from 'react'

type Props = {}

export default function About({}: Props) {
  const navindu = {
    name:'Navindu',
    imageUrl: 'https://i.ibb.co/jrt7KD6/default-profile.png'
  }
  const nomin = {
    name:'Nomin',
    imageUrl: 'https://i.ibb.co/jrt7KD6/default-profile.png'
  }
  const pasindu = {
    name:'Pasindu',
    imageUrl: 'https://i.ibb.co/jrt7KD6/default-profile.png'
  
  }
  const chamod = {
    name:'Chamod',
    imageUrl: 'https://i.ibb.co/jrt7KD6/default-profile.png'
  
  }
  return (
    <div className="flex justify-center items-center h-screen gap-2">
      <ProfileCard {...navindu} />
      <ProfileCard {...nomin} />
      <ProfileCard {...pasindu} />
      <ProfileCard {...chamod} />
    </div>
  )
}
