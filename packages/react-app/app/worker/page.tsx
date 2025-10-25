'use client';

import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { formatEther } from 'viem';
import { STREAM_SPLIT_ADDRESS, STREAM_SPLIT_ABI } from '@/config/contracts';

export default function WorkerDashboard() {
  const { address, isConnected } = useAccount();
  const [currentTime, setCurrentTime] = useState(Date.now());
  const { writeContract, isPending: isWithdrawing } = useWriteContract();

  // Fetch stream info for the connected worker
  const { data: streamInfo, refetch } = useReadContract({
    address: STREAM_SPLIT_ADDRESS as `0x${string}`,
    abi: STREAM_SPLIT_ABI,
    functionName: 'getStreamInfo',
    args: address ? [BigInt(0)] : undefined, // Stream ID 0 - we'll need to iterate through all streams
    query: {
      enabled: !!address,
      refetchInterval: 1000, // Refetch every second for real-time updates
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
      refetch(); // Refetch stream data every second
    }, 1000);
    return () => clearInterval(interval);
  }, [refetch]);

  const handleWithdraw = async () => {
    if (!address) return;
    try {
      await writeContract({
        address: STREAM_SPLIT_ADDRESS as `0x${string}`,
        abi: STREAM_SPLIT_ABI,
        functionName: 'withdraw',
        args: [BigInt(0)], // Stream ID 0
      });
    } catch (error) {
      console.error('Withdrawal error:', error);
      alert('Failed to withdraw');
    }
  };

  // Calculate earned amount from stream info
  const earnedAmount = streamInfo && Array.isArray(streamInfo) && streamInfo.length > 6
    ? formatEther(streamInfo[6] as bigint)
    : '0.000000';
  
  // Format with more decimals for demo
  const displayEarned = parseFloat(earnedAmount).toFixed(18);

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-bold text-slate-900 mb-6">Worker Dashboard</h1>
          <p className="text-slate-600 mb-8">Connect your wallet to view earnings</p>
          <div className="mb-8">
            <ConnectButton />
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-left">
            <h3 className="font-bold text-blue-900 mb-3">📝 First time setup:</h3>
            <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
              <li>Install MetaMask browser extension</li>
              <li>Create or import a wallet</li>
              <li>Add Celo Alfajores testnet to MetaMask</li>
              <li>Click "Connect Wallet" above</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-2xl font-bold text-slate-900">StreamSplit</span>
          </Link>
          <ConnectButton />
        </div>
      </nav>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8 text-slate-900">Worker Dashboard</h1>
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 mb-8 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-green-50 mb-2 font-medium">Real-Time Earnings (Updates Every Second)</p>
              <h2 className="text-4xl font-bold mb-1 text-white font-mono tracking-tight">{displayEarned} CELO</h2>
              <p className="text-green-50 text-sm mt-2">⚡ Live streaming payment - watch it grow!</p>
            </div>
            <button 
              onClick={handleWithdraw}
              disabled={isWithdrawing || parseFloat(earnedAmount) === 0}
              className="px-8 py-4 bg-white text-green-600 font-semibold rounded-xl hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isWithdrawing ? 'Withdrawing...' : 'Withdraw All'}
            </button>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-300 shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-slate-900">Your Payment Streams</h2>
          {streamInfo && Array.isArray(streamInfo) && streamInfo[7] ? (
            <div className="border border-slate-200 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-slate-500">From Employer</p>
                  <p className="font-mono text-sm">{streamInfo[0]?.toString().slice(0, 10)}...</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  Active
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-500">Rate per second</p>
                  <p className="font-semibold font-mono">{formatEther(streamInfo[2] as bigint)} CELO/s</p>
                </div>
                <div>
                  <p className="text-slate-500">Total deposited</p>
                  <p className="font-semibold">{parseFloat(formatEther(streamInfo[3] as bigint)).toFixed(6)} CELO</p>
                </div>
                <div>
                  <p className="text-slate-500">Already withdrawn</p>
                  <p className="font-semibold">{parseFloat(formatEther(streamInfo[4] as bigint)).toFixed(6)} CELO</p>
                </div>
                <div>
                  <p className="text-slate-500">Currently earned (live)</p>
                  <p className="font-semibold text-green-600 font-mono">{displayEarned} CELO</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500">
              <svg className="w-16 h-16 mx-auto mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="font-medium text-slate-600">No active payment streams</p>
              <p className="text-sm mt-2 text-slate-500">When an employer creates a stream for you, it will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
