'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { parseEther } from 'viem';
import { useWriteContract } from 'wagmi';
import { STREAM_SPLIT_ADDRESS, STREAM_SPLIT_ABI } from '@/config/contracts';

export default function EmployerDashboard() {
  const { address, isConnected } = useAccount();
  const [workerAddress, setWorkerAddress] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [durationDays, setDurationDays] = useState('');
  const { writeContract, isPending } = useWriteContract();

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
      alert('Please fill in all fields');
      return;
    }
    const params = calculateStreamParams();
    if (!params) return;
    try {
      await writeContract({
        address: STREAM_SPLIT_ADDRESS as `0x${string}`,
        abi: STREAM_SPLIT_ABI,
        functionName: 'createStream',
        args: [workerAddress as `0x${string}`, params.ratePerSecond],
        value: params.deposit,
      });
      setWorkerAddress('');
      setHourlyRate('');
      setDurationDays('');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create stream');
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-bold text-slate-900 mb-6">Employer Dashboard</h1>
          <p className="text-slate-600 mb-8">Connect your wallet to start</p>
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
        <h1 className="text-4xl font-bold mb-8 text-slate-900">Employer Dashboard</h1>
        <div className="bg-white rounded-2xl border border-slate-300 shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-slate-900">Create New Stream</h2>
          <form onSubmit={handleCreateStream} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700">Worker Address</label>
              <input type="text" value={workerAddress} onChange={(e) => setWorkerAddress(e.target.value)} placeholder="0x..." className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700">Hourly Rate (CELO)</label>
              <input type="number" step="0.001" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)} placeholder="0.01" className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700">Duration (Days)</label>
              <input type="number" value={durationDays} onChange={(e) => setDurationDays(e.target.value)} placeholder="30" className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900" required />
            </div>
            <button type="submit" disabled={isPending} className="w-full py-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 disabled:opacity-50">
              {isPending ? 'Creating...' : 'Create Stream'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
