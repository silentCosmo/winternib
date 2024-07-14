import React from 'react'

function Loading() {
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center flex-col'>
        <span className="loader"></span>
        <div className='mt-16'>
            <p className='-mt-12 z-50 text-cyan-700 animate-pulse font-bold tracking-widest uppercase'>Loading..</p>
        </div>
    </div>
  )
}

export default Loading