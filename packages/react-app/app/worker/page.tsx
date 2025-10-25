'use client';

import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { formatEther } from 'viem';
import { STREAM_SPLIT_ADDRESS, STREAM_SPLIT_ABI } from '@/config/contracts';
import toast from 'react-hot-toast';

export default function WorkerDashboard() {
  const { address, isConnected } = useAccount();
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [stars, setStars] = useState<Array<{id: number, x: number, y: number, size: number, duration: number, delay: number}>>([]);
  const { writeContract, isPending: isWithdrawing } = useWriteContract();

  // Generate stars
  useEffect(() => {
    const generatedStars = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
    setStars(generatedStars);
  }, []);

  // State to store the stream ID - user can input which stream to check
  const [streamId, setStreamId] = useState<bigint>(BigInt(0));
  const [streamIdInput, setStreamIdInput] = useState<string>('0');

  // Fetch stream info
  const { data: streamInfo } = useReadContract({
    address: STREAM_SPLIT_ADDRESS as `0x${string}`,
    abi: STREAM_SPLIT_ABI,
    functionName: 'getStreamInfo',
    args: [streamId],
    query: {
      enabled: !!address && isLoggedIn,
      refetchInterval: 1000,
    }
  });

  // Fetch real-time earned amount using calculateEarned
  const { data: earnedBigInt, refetch } = useReadContract({
    address: STREAM_SPLIT_ADDRESS as `0x${string}`,
    abi: STREAM_SPLIT_ABI,
    functionName: 'calculateEarned',
    args: [streamId],
    query: {
      enabled: !!address && isLoggedIn && !!streamInfo,
      refetchInterval: 1000, // Update every second for real-time display
    }
  });

  // Update current time every second to force UI re-render
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleWithdraw = async () => {
    if (!address) return;
    
    const toastId = toast.loading('[PROCESSING] Withdrawing earnings...');
    
    try {
      await writeContract({
        address: STREAM_SPLIT_ADDRESS as `0x${string}`,
        abi: STREAM_SPLIT_ABI,
        functionName: 'withdraw',
        args: [streamId],
      });
      toast.success('[SUCCESS] Withdrawal complete!', { id: toastId });
      // Refetch after withdrawal to update balance
      setTimeout(() => refetch(), 2000);
    } catch (error) {
      console.error('Withdrawal error:', error);
      toast.error('[ERROR] Failed to withdraw', { id: toastId });
    }
  };

  // Get the earned amount from calculateEarned function
  const earnedAmount = earnedBigInt ? formatEther(earnedBigInt) : '0.000000';
  
  // Display with 18 decimals to show real-time changes
  const displayEarned = parseFloat(earnedAmount).toFixed(18);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      setIsLoggedIn(true);
      setShowLogin(false);
    }
  };

  if (!isLoggedIn) {
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

        {/* Grid Background */}
        <div className="fixed inset-0 pointer-events-none opacity-20 z-[1]">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}></div>
        </div>

        {/* Scanlines */}
        <div className="fixed inset-0 pointer-events-none opacity-10 z-10" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(0, 255, 255, 0.03) 0px, rgba(0, 255, 255, 0.03) 1px, transparent 1px, transparent 2px)',
        }}></div>

        <style jsx>{`
          @keyframes twinkle {
            0%, 100% { opacity: 0.2; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.5); }
          }
        `}</style>

        <nav className="relative border-b border-cyan-500/30 bg-black/50 backdrop-blur-md z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/50">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-2xl font-bold font-mono" style={{
                textShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
              }}>
                <span className="text-cyan-400">STREAM</span><span className="text-purple-400">SPLIT</span>
              </span>
            </Link>
          </div>
        </nav>

        <div className="relative z-20 flex items-center justify-center min-h-[calc(100vh-80px)] px-6">
          <div className="max-w-md w-full">
            {!showLogin ? (
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 border border-purple-500/50 bg-purple-500/10 mb-8">
                  <span className="flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-purple-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                  </span>
                  <span className="text-sm font-mono text-purple-300">WORKER PORTAL</span>
                </div>
                
                <h1 className="text-5xl font-bold mb-6 font-mono" style={{
                  textShadow: '0 0 20px rgba(168, 85, 247, 0.8)',
                }}>
                  <span className="text-purple-400">WORKER</span>
                  <br />
                  <span className="text-cyan-400">ACCESS</span>
                </h1>
                
                <p className="text-gray-400 mb-12 font-mono text-sm">
                  &gt; AUTHENTICATE TO VIEW YOUR EARNINGS
                </p>

                <button
                  onClick={() => setShowLogin(true)}
                  className="w-full px-8 py-5 border-2 border-purple-500 bg-purple-500/20 text-purple-300 font-mono font-bold hover:bg-purple-500/30 hover:scale-105 transition-all mb-6 relative group"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    [[ LOGIN ]]
                    <span className="group-hover:translate-x-2 transition-transform">&gt;&gt;</span>
                  </span>
                  <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/10 transition-all"></div>
                </button>

                <div className="border border-cyan-500/30 bg-black/50 p-6 text-left">
                  <h3 className="font-bold font-mono text-cyan-400 mb-3 text-sm">
                    [[ SYSTEM INFO ]]
                  </h3>
                  <ul className="text-xs text-gray-400 space-y-2 font-mono">
                    <li>&gt; View real-time earnings</li>
                    <li>&gt; Withdraw anytime</li>
                    <li>&gt; Track payment streams</li>
                    <li>&gt; Blockchain secured</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="border-2 border-purple-500/50 bg-black/70 backdrop-blur-sm p-8 relative">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-purple-500"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-purple-500"></div>

                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="ml-2 text-xs font-mono text-gray-500">worker.auth</span>
                </div>

                <h2 className="text-2xl font-bold font-mono text-purple-400 mb-6" style={{
                  textShadow: '0 0 10px rgba(168, 85, 247, 0.6)',
                }}>
                  $ ./authenticate
                </h2>

                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label className="block text-sm font-mono text-cyan-300 mb-2">
                      &gt; USERNAME
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-4 py-3 bg-black/50 border border-purple-500/50 text-white font-mono focus:outline-none focus:border-purple-400 focus:shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                      placeholder="Enter username..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-mono text-cyan-300 mb-2">
                      &gt; PASSWORD
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-black/50 border border-purple-500/50 text-white font-mono focus:outline-none focus:border-purple-400 focus:shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                      placeholder="Enter password..."
                      required
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 border-2 border-green-500 bg-green-500/20 text-green-300 font-mono font-bold hover:bg-green-500/30 transition-all"
                    >
                      [[ ENTER ]]
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowLogin(false)}
                      className="flex-1 px-6 py-3 border-2 border-red-500 bg-red-500/20 text-red-300 font-mono font-bold hover:bg-red-500/30 transition-all"
                    >
                      [[ CANCEL ]]
                    </button>
                  </div>
                </form>

                <p className="text-xs text-gray-500 font-mono mt-6 text-center">
                  &gt; Demo: Use any credentials
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-black text-white overflow-hidden relative">
        {/* Stars Background */}
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

        <div className="fixed inset-0 pointer-events-none opacity-20 z-[1]">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}></div>
        </div>

        <style jsx>{`
          @keyframes twinkle {
            0%, 100% { opacity: 0.2; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.5); }
          }
        `}</style>

        <div className="relative z-20 text-center px-6 py-20">
          <h1 className="text-4xl font-bold mb-6 font-mono text-purple-400" style={{ textShadow: '0 0 20px rgba(168, 85, 247, 0.8)' }}>
            WORKER DASHBOARD
          </h1>
          <p className="text-gray-400 mb-8 font-mono">&gt; Connect wallet to continue</p>
          <div className="mb-8 inline-block">
            <ConnectButton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Stars Background */}
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

      {/* Grid Background */}
      <div className="fixed inset-0 pointer-events-none opacity-20 z-[1]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}></div>
      </div>

      {/* Scanlines */}
      <div className="fixed inset-0 pointer-events-none opacity-10 z-10" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(0, 255, 255, 0.03) 0px, rgba(0, 255, 255, 0.03) 1px, transparent 1px, transparent 2px)',
      }}></div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
      `}</style>

      <nav className="relative border-b border-cyan-500/30 bg-black/50 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/50">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-2xl font-bold font-mono" style={{
              textShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
            }}>
              <span className="text-cyan-400">STREAM</span><span className="text-purple-400">SPLIT</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsLoggedIn(false)}
              className="text-sm font-mono text-red-400 hover:text-red-300 transition-colors"
            >
              [LOGOUT]
            </button>
            <ConnectButton />
          </div>
        </div>
      </nav>
      
      <div className="relative z-20 max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center gap-3 mb-8">
          <span className="flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
          </span>
          <h1 className="text-4xl font-bold font-mono text-purple-400" style={{
            textShadow: '0 0 20px rgba(168, 85, 247, 0.8)',
          }}>
            WORKER DASHBOARD
          </h1>
        </div>

        <div className="border-2 border-purple-500/50 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 backdrop-blur-sm p-8 mb-8 relative">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-purple-500"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-purple-500"></div>
          
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-purple-300 mb-2 font-mono text-sm">&gt; REAL-TIME EARNINGS</p>
              <h2 className="text-5xl font-bold mb-1 text-green-400 font-mono" style={{
                textShadow: '0 0 20px rgba(34, 197, 94, 0.8)',
              }}>
                {displayEarned}
              </h2>
              <p className="text-cyan-300 text-sm mt-2 font-mono">CELO // UPDATING LIVE</p>
            </div>
            <button 
              onClick={handleWithdraw}
              disabled={isWithdrawing || parseFloat(earnedAmount) === 0}
              className="px-8 py-4 border-2 border-green-500 bg-green-500/20 text-green-300 font-mono font-bold hover:bg-green-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isWithdrawing ? '[PROCESSING...]' : '[[ WITHDRAW ALL ]]'}
            </button>
          </div>
        </div>

        {/* Stream ID Input */}
        <div className="border-2 border-cyan-500/50 bg-black/50 backdrop-blur-sm p-6 mb-8 relative">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-purple-500"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-purple-500"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500"></div>
          
          <label className="block text-sm font-mono text-cyan-300 mb-2">
            &gt; STREAM ID (Ask your employer for this)
          </label>
          <div className="flex gap-4">
            <input
              type="number"
              value={streamIdInput}
              onChange={(e) => setStreamIdInput(e.target.value)}
              className="flex-1 px-4 py-3 bg-black/50 border border-cyan-500/50 text-white font-mono focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(0,255,255,0.5)]"
              placeholder="Enter stream ID (e.g., 0, 1, 2...)"
            />
            <button
              onClick={() => setStreamId(BigInt(streamIdInput || '0'))}
              className="px-6 py-3 border-2 border-cyan-500 bg-cyan-500/20 text-cyan-300 font-mono font-bold hover:bg-cyan-500/30 transition-all"
            >
              [[ LOAD STREAM ]]
            </button>
          </div>
          <p className="text-xs text-gray-500 font-mono mt-2">
            &gt; Current Stream ID: {streamId.toString()}
          </p>
        </div>

        <div className="border-2 border-cyan-500/50 bg-black/70 backdrop-blur-sm p-8 relative">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-purple-500"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-purple-500"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500"></div>

          <h2 className="text-2xl font-bold mb-6 font-mono text-cyan-400" style={{
            textShadow: '0 0 10px rgba(0, 255, 255, 0.6)',
          }}>
            [[ PAYMENT STREAMS ]]
          </h2>
          
          {streamInfo && Array.isArray(streamInfo) && streamInfo[7] ? (
            <div className="border border-purple-500/50 bg-purple-500/5 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs text-gray-500 font-mono">FROM EMPLOYER</p>
                  <p className="font-mono text-sm text-cyan-300">{streamInfo[0]?.toString().slice(0, 10)}...</p>
                </div>
                <span className="px-3 py-1 border border-green-500 bg-green-500/20 text-green-400 font-mono text-xs">
                  [ACTIVE]
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm font-mono">
                <div>
                  <p className="text-gray-500 text-xs mb-1">&gt; RATE/SECOND</p>
                  <p className="text-purple-300">{formatEther(streamInfo[2] as bigint)} CELO/s</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">&gt; TOTAL DEPOSITED</p>
                  <p className="text-purple-300">{parseFloat(formatEther(streamInfo[5] as bigint)).toFixed(6)} CELO</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">&gt; WITHDRAWN</p>
                  <p className="text-purple-300">{parseFloat(formatEther(streamInfo[6] as bigint)).toFixed(6)} CELO</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">&gt; CURRENT EARNED</p>
                  <p className="text-green-400" style={{ textShadow: '0 0 10px rgba(34, 197, 94, 0.6)' }}>
                    {displayEarned} CELO
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 border-2 border-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-3xl">💤</span>
              </div>
              <p className="font-mono text-gray-500 text-sm mb-2">&gt; NO ACTIVE STREAMS</p>
              <p className="text-xs text-gray-600 font-mono">Waiting for employer to create stream...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
