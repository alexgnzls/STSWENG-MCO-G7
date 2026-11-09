import { useState } from 'react'

export default function App() {
  const HandleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className='min-h-screen w-full bg-yellow-500 text-slate-100 flex flex-row'>
      {/* Left panel */}
      <div className='w-1/2 bg-gray-900 border-r border-slate-800 p-12 flex flex-col justify-between relative overflow-hidden'>
        <div className='absolute -top-32 -left-32 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none' />
        <div className='absolute -bottom-32 -right-32 w-96 h-96 bg-orange-300/10 rounded-full blur-3xl pointer-events-none' />
        <div className='flex items-center gap-3 z-10'>

        </div>
        <div className='max-w-lg z-10 flex flex-col gap-4'>
          <h1 className='text-4xl font-extrabold tracking-tight leading-tight text-white'>
            Need a condo service? Manong is here to fix it!
          </h1>
          <p className='text-slate-400 text-base leading-relaxed'>
            Whether it be plumbing leaks, air conditioning malfunctions, or even appliance breakdowns, you name it, there is a Manong you can call.
          </p>
        </div>

        <div className='flex items-center justify-between text-xs text-slate-500 z-10'>
          <span>@ {new Date().getFullYear()} Manong. All Rights Reserved.</span>
        </div>
      </div>
      {/* Right panel */}
      <div className='w-1/2 p-12 flex flex-col items-center justify-center'>
        <div className='w-full max-w-md flex flex-col gap-8'>
          <div className='flex flex-col gap-2'>
            <h2 className='text-2xl font-bold tracking-tight text-white'>
              Sign in (Admin)
            </h2>
            <p className='text-sm text-black'>
              Enter an admin credential below.
            </p>
          </div>
          { /* Login */ }
          <form onSubmit={HandleSubmit} className='flex flex-col gap-5'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='username' className='text-sm font-medium text-black'>
                Username
              </label>
              <input id='username' type='username' placeholder='Enter username'
                className='w-full px-4 py-2.5 rounded-lg bg-slate-900 border
                  border-slate-800 text-slate-100 placeholder-slate-500
                  focus:bg-white focus:outline-none focus:border-indigo-500
                  focus:ring-1 focus:ring-indigo-500 transition-colors text-sm' />
            </div>
            <div className='flex flex-col gap-2'>
              <div className='flex items-center justify-between'>
                <label htmlFor='password' className='text-sm font-medium text-black'>
                  Password
                </label>
                <a href="#forgot" className="text-xs text-blue-800 hover:text-gray-600 transition-colors">
                  Forgot password?
                </a>
              </div>
              <input id='password' type='password' placeholder='Enter password'
                  className='w-full px-4 py-2.5 rounded-lg bg-slate-900 border
                    border-slate-800 text-slate-100 placeholder-slate-500
                    focus:bg-white focus:outline-none focus:border-indigo-500
                    focus:ring-1 focus:ring-indigo-500 transition-colors text-sm' />
            </div>
            <button type='submit' className='w-full py-2.5 px-4 mt-2 rounded-lg bg-black
              transition-colors hover:bg-yellow-200 hover:text-black text-white font-medium
              text-sm shadow-lg shadow-indigo-600/20 cursor-pointer'>
                Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
