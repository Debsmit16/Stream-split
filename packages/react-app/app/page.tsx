'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
              StreamSplit
            </span>
          </div>
          <ConnectButton />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-full mb-8">
            <span className="text-sm font-medium text-yellow-800">Powered by</span>
            <Image 
              src="https://docs.celo.org/img/logo.svg" 
              alt="Celo" 
              width={60} 
              height={20}
              className="h-5 w-auto"
            />
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent leading-tight">
            Real-Time Salary
            <br />
            <span className="bg-gradient-to-r from-yellow-500 to-green-500 bg-clip-text text-transparent">
              Streaming Protocol
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed">
            Revolutionize payroll with continuous money streams. Get paid every second instead of waiting for payday.
            Built on Celo blockchain for instant, low-cost transactions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link 
              href="/employer"
              className="group px-8 py-4 bg-gradient-to-r from-slate-900 to-slate-700 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>Start Streaming Payroll</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link 
              href="/worker"
              className="px-8 py-4 bg-white border-2 border-slate-900 text-slate-900 rounded-xl font-semibold hover:bg-slate-50 hover:shadow-lg transition-all duration-200"
            >
              Receive Streaming Income
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mb-20">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900">$0</div>
              <div className="text-sm text-slate-600 mt-1">Transaction Fees</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900">1s</div>
              <div className="text-sm text-slate-600 mt-1">Payment Interval</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900">24/7</div>
              <div className="text-sm text-slate-600 mt-1">Always Available</div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Instant Payments</h3>
            <p className="text-slate-600">Money flows continuously every second. Workers can withdraw their earned wages anytime, no waiting required.</p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Blockchain Secured</h3>
            <p className="text-slate-600">Smart contracts on Celo ensure transparent, tamper-proof payment streams. Your funds are always safe and verifiable.</p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Near-Zero Fees</h3>
            <p className="text-slate-600">Built on Celo's carbon-negative blockchain with minimal transaction costs. Save money on every payment.</p>
          </div>
        </div>

        {/* How it Works */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-12 text-white">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-slate-900">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Stream</h3>
              <p className="text-slate-300">Employers set up continuous payment streams for their workers with customizable rates.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-slate-900">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Money Flows</h3>
              <p className="text-slate-300">Smart contracts automatically stream payments every second. Watch your balance grow in real-time.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-slate-900">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Withdraw Anytime</h3>
              <p className="text-slate-300">Workers withdraw their earned wages instantly, whenever they need it. No waiting for payday.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-slate-600">
          <p>Built on <span className="font-semibold text-slate-900">Celo</span> blockchain • Powered by smart contracts</p>
        </div>
      </footer>
    </div>
  );
}
