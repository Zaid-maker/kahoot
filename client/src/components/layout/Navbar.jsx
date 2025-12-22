import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md p-4 flex justify-between items-center">
            <div className="text-2xl font-black text-purple-600 tracking-tighter">
                QUIZLY
            </div>
            <div>
                <button className="text-sm font-bold text-gray-500 hover:text-purple-600 transition-colors">
                    Login
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
