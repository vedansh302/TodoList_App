import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-slate-700 text-white p-6 items-center'>
        <div className="logo">
            <span className='font-bold text-lg md:text-xl cursor-pointer'>Taskme</span>
        </div>
        <ul className="flex gap-4">
            <li className='cursor-pointer sm:text-lg text-xs hover:font-bold transition-all duration-100 w-10 sm:w-16'>Home</li>
            <li className='cursor-pointer sm:text-lg text-xs hover:font-bold transition-all duration-100 w-20 sm:w-28'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
