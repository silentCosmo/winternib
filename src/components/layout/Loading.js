import React from 'react'

function Loading() {
  return (
    <div className='fixed top-0 left-0 right-0 bottom-16 flex justify-center items-center'>
        <div className='px-10'>
            <img className='w-96 h-60 md:h-80 rounded-2xl bg-clip-padding backdrop-filter opacity-40 backdrop-blur-sm' src="https://cdn.dribbble.com/users/1238723/screenshots/4794365/loading.gif" alt="" />
            <p className='-mt-12 font-bold tracking-widest text-white uppercase'>Loading</p>
        </div>
    </div>
  )
}

export default Loading