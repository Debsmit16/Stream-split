'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import MobileMenu from './components/MobileMenu';

export default function Home() {
  const [earnings, setEarnings] = useState(0);
  const [stars, setStars] = useState<Array<{id: number, x: number, y: number, size: number, duration: number, delay: number}>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setEarnings(prev => prev + 0.000027777);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Generate stars
  useEffect(() => {
    const generatedStars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
    setStars(generatedStars);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated Stars */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-cyan-400"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
              boxShadow: '0 0 10px rgba(0, 255, 255, 0.8)',
            }}
          />
        ))}
      </div>

      {/* Retro Grid Background */}
      <div className="fixed inset-0 pointer-events-none opacity-30 z-[1]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-purple-500/10"></div>
      </div>

      {/* Scanlines Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-10 z-10" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(0, 255, 255, 0.03) 0px, rgba(0, 255, 255, 0.03) 1px, transparent 1px, transparent 2px)',
      }}></div>

      {/* Glowing Lines */}
      <div className="fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50 z-10"></div>
      <div className="fixed bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50 z-10"></div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
      `}</style>

      {/* Navigation */}
      <nav className="relative border-b border-cyan-500/30 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/50 relative">
              <span className="text-white font-bold text-lg sm:text-2xl relative z-10">S</span>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 blur-md opacity-75"></div>
            </div>
            <span className="text-xl sm:text-2xl md:text-3xl font-bold tracking-wider font-mono" style={{
              textShadow: '0 0 10px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)',
            }}>
              <span className="text-cyan-400">STREAM</span>
              <span className="text-purple-400">SPLIT</span>
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/employer" className="hidden sm:block text-sm font-mono text-cyan-300 hover:text-cyan-100 transition-colors relative group">
              <span className="relative z-10">[EMPLOYER]</span>
              <div className="absolute inset-0 bg-cyan-500/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
            <Link href="/worker" className="hidden sm:block text-sm font-mono text-purple-300 hover:text-purple-100 transition-colors relative group">
              <span className="relative z-10">[WORKER]</span>
              <div className="absolute inset-0 bg-purple-500/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
            <div className="hidden sm:block">
              <ConnectButton />
            </div>
            <MobileMenu />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 md:py-32">
        {/* Floating Geometric Shapes - hidden on mobile */}
        <div className="hidden md:block absolute top-10 right-10 w-64 h-64 border border-cyan-500/20 rotate-45 animate-pulse"></div>
        <div className="hidden md:block absolute bottom-20 left-10 w-48 h-48 border border-purple-500/20 rotate-12 animate-pulse" style={{ animationDelay: '1s' }}></div>

        <div className="text-center relative z-10">
          {/* Retro Badge */}
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 border-2 border-cyan-500/50 bg-black/50 backdrop-blur-sm mb-6 sm:mb-10 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10"></div>
            <span className="relative flex h-2 w-2 sm:h-3 sm:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-full w-full bg-cyan-500"></span>
            </span>
            <span className="text-xs sm:text-sm font-mono tracking-wider text-cyan-300 relative z-10">
              POWERED BY CELO BLOCKCHAIN
            </span>
          </div>
          
          {/* Main Headline with Retro Effect */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6 sm:mb-8 leading-tight font-mono">
            <div className="relative inline-block">
              <span className="block text-cyan-400" style={{
                textShadow: '0 0 20px rgba(0, 255, 255, 0.8), 0 0 40px rgba(0, 255, 255, 0.4)',
              }}>
                GET PAID
              </span>
            </div>
            <div className="relative inline-block mt-2 sm:mt-4">
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent" style={{
                textShadow: '0 0 30px rgba(168, 85, 247, 0.6)',
              }}>
                EVERY SECOND
              </span>
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 opacity-20 blur-2xl"></div>
            </div>
          </h1>
          
          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 sm:mb-16 leading-relaxed font-mono px-4">
            <span className="text-cyan-300">&gt;</span> Real-time salary streaming protocol
            <br />
            <span className="text-purple-300">&gt;</span> Built on blockchain • Zero delays • Instant access
          </p>

          {/* Live Demo Counter - Retro Style */}
          <div className="mb-10 sm:mb-16 max-w-3xl mx-auto px-4">
            <div className="relative border-2 border-cyan-500/50 bg-black/70 backdrop-blur-sm p-6 sm:p-10">
              <div className="absolute top-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-l-2 border-cyan-500"></div>
              <div className="absolute top-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-r-2 border-cyan-500"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-l-2 border-purple-500"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-r-2 border-purple-500"></div>
              
              <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <p className="text-xs sm:text-sm font-mono text-gray-400 tracking-wider">LIVE STREAM ACTIVE</p>
              </div>
              
              <div className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold font-mono text-green-400 mb-2 break-all" style={{
                textShadow: '0 0 20px rgba(34, 197, 94, 0.8)',
                fontFamily: 'Courier New, monospace',
              }}>
                {earnings.toFixed(18)}
              </div>
              <p className="text-xs sm:text-sm font-mono text-gray-400">CELO // 0.1 PER HOUR</p>
            </div>
          </div>

          {/* CTA Buttons - Retro Style */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-16 sm:mb-24 px-4">
            <Link 
              href="/employer"
              className="group relative px-6 sm:px-10 py-4 sm:py-5 border-2 border-cyan-500 bg-cyan-500/10 font-mono font-bold text-sm sm:text-base md:text-lg overflow-hidden transition-all hover:bg-cyan-500/20"
            >
              <span className="relative z-10 text-cyan-300 group-hover:text-cyan-100 flex items-center justify-center gap-2">
                [[ START AS EMPLOYER ]]
                <span className="group-hover:translate-x-2 transition-transform">&gt;&gt;</span>
              </span>
              <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/10 transition-all"></div>
            </Link>
            <Link 
              href="/worker"
              className="group relative px-6 sm:px-10 py-4 sm:py-5 border-2 border-purple-500 bg-purple-500/10 font-mono font-bold text-sm sm:text-base md:text-lg overflow-hidden transition-all hover:bg-purple-500/20"
            >
              <span className="relative z-10 text-purple-300 group-hover:text-purple-100 flex items-center justify-center gap-2">
                [[ JOIN AS WORKER ]]
                <span className="group-hover:translate-x-2 transition-transform">&gt;&gt;</span>
              </span>
              <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/10 transition-all"></div>
            </Link>
          </div>

          {/* Stats Grid - Retro Style */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { value: '$0.00', label: 'FEES', color: 'cyan' },
              { value: '1.0s', label: 'INTERVAL', color: 'green' },
              { value: '24/7', label: 'UPTIME', color: 'purple' },
              { value: '100%', label: 'SECURE', color: 'pink' },
            ].map((stat, i) => (
              <div key={i} className="relative border border-gray-700 bg-black/50 backdrop-blur-sm p-6 group hover:border-cyan-500/50 transition-all">
                <div className="absolute top-0 left-0 w-2 h-2 bg-cyan-500"></div>
                <div className="absolute top-0 right-0 w-2 h-2 bg-cyan-500"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 bg-purple-500"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-purple-500"></div>
                
                <div className="text-4xl font-bold font-mono text-cyan-400 mb-2" style={{
                  textShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
                }}>
                  {stat.value}
                </div>
                <div className="text-xs font-mono text-gray-500 tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 font-mono">
          <span className="text-cyan-400" style={{ textShadow: '0 0 20px rgba(0, 255, 255, 0.6)' }}>
            [[ FEATURES ]]
          </span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'INSTANT ACCESS',
              desc: 'Workers can withdraw earnings anytime. Money flows continuously every second.',
            },
            {
              title: 'BLOCKCHAIN SECURED',
              desc: 'Smart contracts ensure transparent, tamper-proof payments on Celo.',
            },
            {
              title: 'NEAR-ZERO FEES',
              desc: 'Built on Celo eco-friendly blockchain. Save money on every payment.',
            },
          ].map((feature, i) => (
            <div key={i} className="relative border-2 border-gray-700 bg-black/50 backdrop-blur-sm p-8 group hover:border-cyan-500/50 transition-all">
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-500"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-purple-500"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-purple-500"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-500"></div>
              
              <h3 className="text-2xl font-bold font-mono text-cyan-300 mb-4">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works - Terminal Style */}
      <section className="relative max-w-5xl mx-auto px-6 py-20">
        <div className="border-2 border-cyan-500/50 bg-black/70 backdrop-blur-sm p-12">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-4 text-sm font-mono text-gray-500">streamsplit.terminal</span>
          </div>
          
          <h2 className="text-3xl font-bold font-mono text-green-400 mb-12" style={{ textShadow: '0 0 10px rgba(34, 197, 94, 0.6)' }}>
            $ ./how-it-works
          </h2>
          
          <div className="space-y-8">
            {[
              {
                step: '01',
                cmd: 'CREATE_STREAM',
                desc: 'Employers deposit funds and set payment rates. Configure hourly wages and duration.',
              },
              {
                step: '02',
                cmd: 'MONEY_FLOWS',
                desc: 'Smart contracts stream payments every second automatically. Real-time balance updates.',
              },
              {
                step: '03',
                cmd: 'INSTANT_WITHDRAW',
                desc: 'Workers withdraw earned wages anytime. No waiting, no delays. Get paid as you work.',
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-6">
                <div className="text-4xl font-bold font-mono text-cyan-400/50">[{item.step}]</div>
                <div>
                  <div className="text-xl font-mono text-purple-300 mb-2">&gt; {item.cmd}</div>
                  <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative max-w-5xl mx-auto px-6 py-20">
        <div className="border-2 border-purple-500/50 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 backdrop-blur-sm p-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-mono text-cyan-400 mb-6" style={{ textShadow: '0 0 20px rgba(0, 255, 255, 0.6)' }}>
            READY TO START?
          </h2>
          <p className="text-xl text-gray-300 mb-10 font-mono">
            Join the future of continuous payments. Start streaming salaries today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/employer"
              className="px-10 py-5 border-2 border-cyan-500 bg-cyan-500/20 text-cyan-300 font-mono font-bold hover:bg-cyan-500/30 hover:scale-105 transition-all"
            >
              [[ EMPLOYER DASHBOARD ]]
            </Link>
            <Link 
              href="/worker"
              className="px-10 py-5 border-2 border-purple-500 bg-purple-500/20 text-purple-300 font-mono font-bold hover:bg-purple-500/30 hover:scale-105 transition-all"
            >
              [[ WORKER PORTAL ]]
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-cyan-500/30 bg-black/50 backdrop-blur-xl mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center">
          <p className="text-sm font-mono text-gray-500">
            <span className="text-cyan-400">Built on CELO</span> • <span className="text-purple-400">Secured by Smart Contracts</span> • <span className="text-green-400">Carbon Negative</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
