'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { config } from '@/config/wagmi';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#000',
                color: '#fff',
                border: '2px solid #00FFFF',
                borderRadius: '0',
                padding: '16px',
                fontFamily: 'monospace',
                boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
              },
              success: {
                iconTheme: {
                  primary: '#00FF00',
                  secondary: '#000',
                },
                style: {
                  border: '2px solid #00FF00',
                  boxShadow: '0 0 20px rgba(0, 255, 0, 0.5)',
                },
              },
              error: {
                iconTheme: {
                  primary: '#FF0000',
                  secondary: '#000',
                },
                style: {
                  border: '2px solid #FF0000',
                  boxShadow: '0 0 20px rgba(255, 0, 0, 0.5)',
                },
              },
              loading: {
                iconTheme: {
                  primary: '#00FFFF',
                  secondary: '#000',
                },
                style: {
                  border: '2px solid #00FFFF',
                  boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
                },
              },
            }}
          />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
