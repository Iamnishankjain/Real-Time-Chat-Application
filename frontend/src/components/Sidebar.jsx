import React from 'react'
import useAuthUser from '../hooks/useAuthUser'
import { Link, useLocation } from 'react-router-dom';
import { BellIcon, HomeIcon, ShipWheelIcon, UserIcon } from 'lucide-react';

const Sidebar = () => {
  const {authUser}=useAuthUser();
  const location = useLocation();
  const currentPath=location.pathname;

  return (
    <aside className='w-64 bg-base-100 border-r border-indigo-500/25 hidden lg:flex flex-col h-screen sticky top-0 shadow-sm'>
      <div className='p-5 border-b border-indigo-500/25'>
        <Link to="/" className='flex items-center gap-2.5'>
          <ShipWheelIcon className="size-9 text-indigo-500"/>
          <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-indigo-300 tracking-wider'>
            ChatBridge
          </span>
        </Link>
      </div>

      <nav className='flex-1 p-4 space-y-1'>
        <Link 
          to="/" 
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/" ? "bg-indigo-100 text-indigo-600" : ""
          }`}
        >
          <HomeIcon className="size-5 text-indigo-500" />
          <span>Home</span>
        </Link>

        <Link 
          to="/friends" 
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/friends" ? "bg-indigo-100 text-indigo-600" : ""
          }`}
        >
          <UserIcon className="size-5 text-indigo-500" />
          <span>Friends</span>
        </Link>

        <Link 
          to="/notifications" 
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/notifications" ? "bg-indigo-100 text-indigo-600" : ""
          }`}
        >
          <BellIcon className="size-5 text-indigo-500" />
          <span>Notifications</span>
        </Link>
      </nav>

      {/*User Profile */}
      <div className='p-4 border-t border-indigo-500/25 mt-auto'>
        <div className='flex items-center gap-3'>
          <div className='avatar'>
            <div className='w-10 rounded-full border border-indigo-500/40'>
              <img src={authUser?.profilePicture} alt="User Avatar" />
            </div>
          </div>
          <div className='flex-1'>
            <p className='font-semibold text-sm'>
              {authUser?.fullName}
            </p>
            <p className='text-xs text-indigo-500 flex items-center gap-1'>
              <span className='size-2 rounded-full bg-indigo-500 inline-block'/>
              Online
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
