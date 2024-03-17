'use client'

import React, { useState } from 'react'
import {AiOutlineSearch} from 'react-icons/ai'

// Remember to import words or whatever you're using to store all the words the user can search for

const Searchbar = () => {


  return (
    <form className='w-full relative'>
        <div className="relative">
            <input type="search" placeholder='Type Here' className='w-full p-1 rounded-full bg-slate-800' />
            <button className='absolute right-1 top-1/2 -translate-y-1/2 p-1 bg-slate-600 rounded-full'>
                <AiOutlineSearch />
            </button>
        </div>

        


        
    </form>
  )
}

export default Searchbar

