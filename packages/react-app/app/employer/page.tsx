'use client';

import { useState, useEffect } from 'react';
import { useAccount, useWatchContractEvent } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { parseEther, formatEther } from 'viem';
import { useWriteContract } from 'wagmi';
import { STREAM_SPLIT_ADDRESS, STREAM_SPLIT_ABI } from '@/config/contracts';
import type { Log } from 'viem';
import toast from 'react-hot-toast';

interface StreamData {
  streamId: number;
  worker: string;
  ratePerSecond: bigint;
  deposit: bigint;
  timestamp: number;
}

export default function EmployerDashboard() {
  const { address, isConnected } = useAccount();
  const [workerAddress, setWorkerAddress] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [durationDays, setDurationDays] = useState('');
  const [streams, setStreams] = useState<StreamData[]>([]);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [stars, setStars] = useState<Array<{id: number, x: number, y: number, size: number, duration: number, delay: number}>>([]);
  const { writeContract, isPending } = useWriteContract();

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

  // Listen for StreamCreated events
  useWatchContractEvent({
    address: STREAM_SPLIT_ADDRESS as `0x${string}`,
    abi: STREAM_SPLIT_ABI,
    eventName: 'StreamCreated',
    onLogs(logs: Log[]) {
      logs.forEach((log: any) => {
        if (log.args.employer?.toLowerCase() === address?.toLowerCase()) {
          const newStream: StreamData = {
            streamId: Number(log.args.streamId),
            worker: log.args.worker,
            ratePerSecond: log.args.ratePerSecond,
            deposit: log.args.deposit,
            timestamp: Date.now(),
          };
          setStreams(prev => [newStream, ...prev]);
        }
      });
    },
  });

  const calculateStreamParams = () => {
    if (!hourlyRate || !durationDays) return null;
    const hourlyRateInWei = parseEther(hourlyRate);
    const ratePerSecond = hourlyRateInWei / BigInt(3600);
    const totalSeconds = BigInt(Math.floor(parseFloat(durationDays) * 24 * 3600));
    const deposit = ratePerSecond * totalSeconds;
    return {
      ratePerSecond,
      deposit,
      totalDeposit: (Number(deposit) / 1e18).toFixed(6)
    };
  };

  const handleCreateStream = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workerAddress || !hourlyRate || !durationDays) {
      toast.error('[ERROR] Please fill in all fields');
      return;
    }
    const params = calculateStreamParams();
    if (!params) return;
    
    const toastId = toast.loading('[PROCESSING] Creating payment stream...');
    
    try {
      await writeContract({
        address: STREAM_SPLIT_ADDRESS as `0x${string}`,
        abi: STREAM_SPLIT_ABI,
        functionName: 'createStream',
        args: [workerAddress as `0x${string}`, params.ratePerSecond],
        value: params.deposit,
      });
      toast.success('[SUCCESS] Payment stream created!', { id: toastId });
      setWorkerAddress('');
      setHourlyRate('');
      setDurationDays('');
    } catch (error) {
      console.error('Error:', error);
      toast.error('[ERROR] Failed to create stream', { id: toastId });
    }
  };

  const handlePauseStream = async (streamId: number) => {
    const toastId = toast.loading('[PROCESSING] Pausing stream...');
    try {
      await writeContract({
        address: STREAM_SPLIT_ADDRESS as `0x${string}`,
        abi: STREAM_SPLIT_ABI,
        functionName: 'pauseStream',
        args: [BigInt(streamId)],
      });
      toast.success('[SUCCESS] Stream paused!', { id: toastId });
    } catch (error) {
      console.error('Error:', error);
      toast.error('[ERROR] Failed to pause stream', { id: toastId });
    }
  };

  const handleResumeStream = async (streamId: number) => {
    const toastId = toast.loading('[PROCESSING] Resuming stream...');
    try {
      await writeContract({
        address: STREAM_SPLIT_ADDRESS as `0x${string}`,
        abi: STREAM_SPLIT_ABI,
        functionName: 'resumeStream',
        args: [BigInt(streamId)],
      });
      toast.success('[SUCCESS] Stream resumed!', { id: toastId });
    } catch (error) {
      console.error('Error:', error);
      toast.error('[ERROR] Failed to resume stream', { id: toastId });
    }
  };

  const handleStopStream = async (streamId: number) => {
    if (!confirm('Are you sure you want to stop this stream? Remaining funds will be returned to you.')) {
      return;
    }
    const toastId = toast.loading('[PROCESSING] Stopping stream...');
    try {
      await writeContract({
        address: STREAM_SPLIT_ADDRESS as `0x${string}`,
        abi: STREAM_SPLIT_ABI,
        functionName: 'stopStream',
        args: [BigInt(streamId)],
      });
      toast.success('[SUCCESS] Stream stopped!', { id: toastId });
    } catch (error) {
      console.error('Error:', error);
      toast.error('[ERROR] Failed to stop stream', { id: toastId });
    }
  };

  const handleAddDeposit = async (streamId: number) => {
    const amount = prompt('Enter amount to add (in CELO):');
    if (!amount || parseFloat(amount) <= 0) return;
    
    const toastId = toast.loading('[PROCESSING] Adding deposit...');
    try {
      await writeContract({
        address: STREAM_SPLIT_ADDRESS as `0x${string}`,
        abi: STREAM_SPLIT_ABI,
        functionName: 'addDeposit',
        args: [BigInt(streamId)],
        value: parseEther(amount),
      });
      toast.success(`[SUCCESS] Added ${amount} CELO to stream!`, { id: toastId });
    } catch (error) {
      console.error('Error:', error);
      toast.error('[ERROR] Failed to add deposit', { id: toastId });
    }
  };

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
                <div className="inline-flex items-center gap-2 px-4 py-2 border border-cyan-500/50 bg-cyan-500/10 mb-8">
                  <span className="flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                  </span>
                  <span className="text-sm font-mono text-cyan-300">EMPLOYER PORTAL</span>
                </div>
                
                <h1 className="text-5xl font-bold mb-6 font-mono" style={{
                  textShadow: '0 0 20px rgba(0, 255, 255, 0.8)',
                }}>
                  <span className="text-cyan-400">EMPLOYER</span>
                  <br />
                  <span className="text-purple-400">ACCESS</span>
                </h1>
                
                <p className="text-gray-400 mb-12 font-mono text-sm">
                  &gt; AUTHENTICATE TO MANAGE PAYMENTS
                </p>

                <button
                  onClick={() => setShowLogin(true)}
                  className="w-full px-8 py-5 border-2 border-cyan-500 bg-cyan-500/20 text-cyan-300 font-mono font-bold hover:bg-cyan-500/30 hover:scale-105 transition-all mb-6 relative group"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    [[ LOGIN ]]
                    <span className="group-hover:translate-x-2 transition-transform">&gt;&gt;</span>
                  </span>
                  <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/10 transition-all"></div>
                </button>

                <div className="border border-cyan-500/30 bg-black/50 p-6 text-left">
                  <h3 className="font-bold font-mono text-cyan-400 mb-3 text-sm">
                    [[ SYSTEM INFO ]]
                  </h3>
                  <ul className="text-xs text-gray-400 space-y-2 font-mono">
                    <li>&gt; Create payment streams</li>
                    <li>&gt; Set hourly wages</li>
                    <li>&gt; Track all payments</li>
                    <li>&gt; Instant deployment</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="border-2 border-cyan-500/50 bg-black/70 backdrop-blur-sm p-8 relative">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-purple-500"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-purple-500"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500"></div>

                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="ml-2 text-xs font-mono text-gray-500">employer.auth</span>
                </div>

                <h2 className="text-2xl font-bold font-mono text-cyan-400 mb-6" style={{
                  textShadow: '0 0 10px rgba(0, 255, 255, 0.6)',
                }}>
                  $ ./authenticate
                </h2>

                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label className="block text-sm font-mono text-purple-300 mb-2">
                      &gt; USERNAME
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-4 py-3 bg-black/50 border border-cyan-500/50 text-white font-mono focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(0,255,255,0.5)]"
                      placeholder="Enter username..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-mono text-purple-300 mb-2">
                      &gt; PASSWORD
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-black/50 border border-cyan-500/50 text-white font-mono focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(0,255,255,0.5)]"
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
          <h1 className="text-4xl font-bold mb-6 font-mono text-cyan-400" style={{ textShadow: '0 0 20px rgba(0, 255, 255, 0.8)' }}>
            EMPLOYER DASHBOARD
          </h1>
          <p className="text-gray-400 mb-8 font-mono">&gt; Connect wallet to continue</p>
          <div className="mb-8 inline-block">
            <ConnectButton />
          </div>
        </div>
      </div>
    );
  }

  const params = calculateStreamParams();

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
            <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
          </span>
          <h1 className="text-4xl font-bold font-mono text-cyan-400" style={{
            textShadow: '0 0 20px rgba(0, 255, 255, 0.8)',
          }}>
            EMPLOYER DASHBOARD
          </h1>
        </div>

        <div className="border-2 border-cyan-500/50 bg-black/70 backdrop-blur-sm p-8 mb-8 relative">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-purple-500"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-purple-500"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500"></div>

          <h2 className="text-2xl font-bold mb-6 font-mono text-cyan-400" style={{
            textShadow: '0 0 10px rgba(0, 255, 255, 0.6)',
          }}>
            [[ CREATE PAYMENT STREAM ]]
          </h2>
          
          <form onSubmit={handleCreateStream} className="space-y-6">
            <div>
              <label className="block text-sm font-mono text-purple-300 mb-2">
                &gt; WORKER WALLET ADDRESS
              </label>
              <input
                type="text"
                value={workerAddress}
                onChange={(e) => setWorkerAddress(e.target.value)}
                className="w-full px-4 py-3 bg-black/50 border border-cyan-500/50 text-white font-mono text-sm focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(0,255,255,0.5)]"
                placeholder="0x..."
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-mono text-purple-300 mb-2">
                  &gt; HOURLY RATE (CELO)
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-cyan-500/50 text-white font-mono focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(0,255,255,0.5)]"
                  placeholder="0.1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-mono text-purple-300 mb-2">
                  &gt; DURATION (DAYS)
                </label>
                <input
                  type="number"
                  step="0.001"
                  value={durationDays}
                  onChange={(e) => setDurationDays(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-cyan-500/50 text-white font-mono focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(0,255,255,0.5)]"
                  placeholder="30"
                  required
                />
              </div>
            </div>

            {params && (
              <div className="border border-purple-500/50 bg-purple-500/10 p-4 font-mono text-sm">
                <p className="text-purple-300 mb-2">&gt; STREAM CALCULATION</p>
                <p className="text-gray-300">Rate/second: {formatEther(params.ratePerSecond)} CELO</p>
                <p className="text-cyan-400 font-bold">Total deposit: {params.totalDeposit} CELO</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full px-8 py-4 border-2 border-green-500 bg-green-500/20 text-green-300 font-mono font-bold hover:bg-green-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? '[[ CREATING... ]]' : '[[ CREATE STREAM ]]'}
            </button>
          </form>
        </div>

        {/* Transaction History */}
        <div className="border-2 border-purple-500/50 bg-black/70 backdrop-blur-sm p-8 relative">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-purple-500"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-purple-500"></div>

          <h2 className="text-2xl font-bold mb-6 font-mono text-purple-400" style={{
            textShadow: '0 0 10px rgba(168, 85, 247, 0.6)',
          }}>
            [[ PAYMENT HISTORY ]]
          </h2>

          {streams.length > 0 ? (
            <div className="space-y-4">
              {streams.map((stream) => (
                <div key={stream.streamId} className="border border-cyan-500/50 bg-cyan-500/5 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="px-3 py-1 border border-cyan-500 bg-cyan-500/20 text-cyan-400 font-mono text-xs">
                        STREAM #{stream.streamId}
                      </span>
                      <p className="text-xs text-gray-500 font-mono mt-2">
                        {new Date(stream.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm font-mono mb-4">
                    <div>
                      <p className="text-gray-500 text-xs mb-1">&gt; WORKER</p>
                      <p className="text-purple-300">{stream.worker.slice(0, 10)}...{stream.worker.slice(-8)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">&gt; RATE/SEC</p>
                      <p className="text-purple-300">{formatEther(stream.ratePerSecond)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">&gt; TOTAL DEPOSIT</p>
                      <p className="text-green-400">{parseFloat(formatEther(stream.deposit)).toFixed(6)} CELO</p>
                    </div>
                  </div>

                  {/* Stream Management Controls */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <button
                      onClick={() => handlePauseStream(stream.streamId)}
                      disabled={isPending}
                      className="px-4 py-2 border border-yellow-500 bg-yellow-500/20 text-yellow-300 font-mono text-xs hover:bg-yellow-500/30 transition-all disabled:opacity-50"
                    >
                      [PAUSE]
                    </button>
                    <button
                      onClick={() => handleResumeStream(stream.streamId)}
                      disabled={isPending}
                      className="px-4 py-2 border border-green-500 bg-green-500/20 text-green-300 font-mono text-xs hover:bg-green-500/30 transition-all disabled:opacity-50"
                    >
                      [RESUME]
                    </button>
                    <button
                      onClick={() => handleStopStream(stream.streamId)}
                      disabled={isPending}
                      className="px-4 py-2 border border-red-500 bg-red-500/20 text-red-300 font-mono text-xs hover:bg-red-500/30 transition-all disabled:opacity-50"
                    >
                      [STOP]
                    </button>
                    <button
                      onClick={() => handleAddDeposit(stream.streamId)}
                      disabled={isPending}
                      className="px-4 py-2 border border-cyan-500 bg-cyan-500/20 text-cyan-300 font-mono text-xs hover:bg-cyan-500/30 transition-all disabled:opacity-50"
                    >
                      [ADD FUNDS]
                    </button>
                  </div>

                  <a
                    href={`https://alfajores.celoscan.io/tx/${stream.streamId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-mono inline-block"
                  >
                    [VIEW ON CELOSCAN] &gt;&gt;
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 border-2 border-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-3xl">📋</span>
              </div>
              <p className="font-mono text-gray-500 text-sm mb-2">&gt; NO PAYMENT STREAMS YET</p>
              <p className="text-xs text-gray-600 font-mono">Create your first stream above</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
