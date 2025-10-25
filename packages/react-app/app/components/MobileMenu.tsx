'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="sm:hidden flex flex-col gap-1.5 p-2 border border-cyan-500/50 bg-black/50"
        aria-label="Toggle menu"
      >
        <span className={`block w-6 h-0.5 bg-cyan-400 transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-cyan-400 transition-all ${isOpen ? 'opacity-0' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-cyan-400 transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="sm:hidden fixed inset-0 z-50 bg-black/95 backdrop-blur-md">
          <div className="flex flex-col h-full">
            {/* Close Button */}
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 border-2 border-red-500 bg-red-500/10 text-red-400 font-mono font-bold"
              >
                [[ CLOSE ]]
              </button>
            </div>

            {/* Menu Items */}
            <nav className="flex flex-col items-center justify-center flex-1 gap-8 p-8">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="text-2xl font-mono text-cyan-300 hover:text-cyan-100 transition-colors border-2 border-cyan-500/50 px-8 py-4 w-full text-center bg-cyan-500/10 hover:bg-cyan-500/20"
              >
                [[ HOME ]]
              </Link>
              <Link
                href="/employer"
                onClick={() => setIsOpen(false)}
                className="text-2xl font-mono text-cyan-300 hover:text-cyan-100 transition-colors border-2 border-cyan-500/50 px-8 py-4 w-full text-center bg-cyan-500/10 hover:bg-cyan-500/20"
              >
                [[ EMPLOYER ]]
              </Link>
              <Link
                href="/worker"
                onClick={() => setIsOpen(false)}
                className="text-2xl font-mono text-purple-300 hover:text-purple-100 transition-colors border-2 border-purple-500/50 px-8 py-4 w-full text-center bg-purple-500/10 hover:bg-purple-500/20"
              >
                [[ WORKER ]]
              </Link>
            </nav>

            {/* Grid decoration */}
            <div className="absolute inset-0 pointer-events-none opacity-20 -z-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '30px 30px',
              }}></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
