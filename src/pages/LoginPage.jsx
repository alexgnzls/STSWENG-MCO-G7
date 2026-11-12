import { useState } from 'react';

export default function LoginPage({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const HandleSubmit = (e) => {
        e.preventDefault(); //[cite: 7]
        if (username.trim() && password.length >= 6) {
            onLogin(username.trim());
        }
    };

    return (
        <div className='min-h-screen w-full bg-gray-900 text-slate-100 flex flex-row'>
            {/* Left panel */}
            <div className='w-1/2 bg-yellow-500 border-r border-yellow-600 p-12 flex flex-col justify-between relative overflow-hidden'>
                <div className='absolute -top-32 -left-32 w-96 h-96 bg-white/20 rounded-full blur-3xl pointer-events-none' />
                <div className='absolute -bottom-32 -right-32 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl pointer-events-none' />
                <div className='flex items-center gap-3 z-10'></div>

                <div className='max-w-lg z-10 flex flex-col gap-4'>
                    <h1 className='text-4xl font-extrabold tracking-tight leading-tight text-black'>
                        Need a condo service? Manong is here to fix it!
                    </h1>
                    <p className='text-gray-800 text-base leading-relaxed'>
                        Whether it be plumbing leaks, air conditioning malfunctions, or even appliance breakdowns, you name it, there is a Manong you can call.
                    </p>
                </div>

                <div className='flex items-center justify-between text-xs text-gray-800 z-10'>
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
                        <p className='text-sm text-slate-400'>
                            Enter an admin credential below.
                        </p>
                    </div>

                    <form onSubmit={HandleSubmit} className='flex flex-col gap-5'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor='username' className='text-sm font-medium text-slate-200'>
                                Username
                            </label>
                            <input
                                id='username'
                                type='text'
                                placeholder='Enter username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className='w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:bg-slate-700 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-colors text-sm'
                            />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <div className='flex items-center justify-between'>
                                <label htmlFor='password' className='text-sm font-medium text-slate-200'>
                                    Password
                                </label>
                                <a href="#forgot" className="text-xs text-yellow-500 hover:text-yellow-400 transition-colors">
                                    Forgot password?
                                </a>
                            </div>
                            <input
                                id='password'
                                type='password'
                                placeholder='Enter password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:bg-slate-700 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-colors text-sm'
                            />
                        </div>

                        <button
                            type='submit'
                            className='w-full py-2.5 px-4 mt-2 rounded-lg bg-yellow-500 transition-colors hover:bg-yellow-400 text-black font-semibold text-sm shadow-lg shadow-yellow-500/10 cursor-pointer'>
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}