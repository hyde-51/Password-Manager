import React from 'react'


const Navbar = () => {
  return (
    <nav className='bg-black flex items-center justify-between px-40 h-14 text-white'>
        <div className="logo font-bold  text-2xl">
          <span className='text-green-500'>&lt;</span>
          Pass
          <span className='text-green-500'>OP/&gt;</span>
        </div>
    
      <button className='text-white '>
        <img className='invert p-4 w-16' src="/icons/github.svg" alt="github" />
      </button>
    </nav>
  )
}

export default Navbar
