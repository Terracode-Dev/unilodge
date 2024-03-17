import React from 'react'
import Student from './Studentm'
import Studentb from './Studentb'


export default function page() {
  return (
      <div className="grid grid-cols-7 gap-2 ">
            <Student/>
            <Studentb/>
    </div>
  )
}
