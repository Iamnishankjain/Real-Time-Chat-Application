import React from 'react'
import useAuthUser from '../hooks/useAuthUser'
import { Navigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { BellIcon, LogOutIcon, ShipWheelIcon } from 'lucide-react';
import ThemeSelector from './ThemeSelector.jsx';
import useLogout from '../hooks/useLogout.js';

const Navbar = () => {
  const {authUser} = useAuthUser();
  const location = useLocation();
  const isChatPage=location.pathname?.startsWith("/chat");

  const {logoutMutation} = useLogout();

  return (
    <nav className='bg-base-100 border-b border-indigo-500/25 sticky top-0 z-30 h-16 flex items-center shadow-sm'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-end w-full'>
          {/*Logo when on chat page */}
          {
            isChatPage && (
              <div className='pl-5'>
                <Link to="/" className='flex items-center gap-2.5'>
                  <ShipWheelIcon className="size-9 text-indigo-500" />
                  <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-indigo-300 tracking-wider'>
                    ChatBridge
                  </span>
                </Link>
              </div>
            )
          }

          <div className='flex items-center gap-3 sm:gap-4 ml-auto'>
            <Link to={"/notifications"}>
              <button className='btn btn-ghost btn-circle'>
                <BellIcon className="h-6 w-6 text-indigo-500" />
              </button>
            </Link>
          </div>

          {/*Theme Select */}
          <ThemeSelector/>

          {/*User profile */}
          <div className='avatar'>
            <div className='w-9 rounded-full border border-indigo-500/40'>
              <img src={authUser?.profilePicture} alt="User Avatar" referrerPolicy="no-referrer" />
            </div>
          </div>

          {/*logout button */}
          <button className='btn btn-ghost btn-circle' onClick={logoutMutation}>
            <LogOutIcon className='h-6 w-6 text-indigo-500' />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
