import Searchbar from '@/components/Search'
import SearchBox from '@/components/Search'
import React from 'react'
import Card from '@/components/Card'

function Studentb() {
  return (
    
        <div className='col-span-3 grid-flow-col backdrop-blur-sm bg-white/30  rounded-lg   mr-2 mt-6 shadow-md p-4 h-full'>
            <div className='grid row-span-5 gap-4  '>
                <div className='row-span-1'>
                    <Searchbar />
                </div>
                <div className="row-span-1 container mx-auto p-0 ">
                    <Card
                        imageSrc="https://via.placeholder.com/150"
                        title="Card Title"
                        description="This is a wider card with supporting text below as a natural lead-in to additional content."
                    />
                </div>
                <div className="row-span-1 container mx-auto p-0 ">
                    <Card
                        imageSrc="https://via.placeholder.com/150"
                        title="Card Title"
                        description="This is a wider card with supporting text below as a natural lead-in to additional content."
                    />
                </div>
                {/* <div className='row-span-1 bg-white rounded-lg border border-gray-200 shadow-md p-4 h-[110px] hidden'>
                    
                </div>
                <div className='row-span-1 bg-white rounded-lg border border-gray-200 shadow-md p-4 h-[110px] hidden'>
                    
                </div> */}

            </div>
        </div>
      
    
  )
}

export default Studentb
