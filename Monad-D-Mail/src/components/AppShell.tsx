'use client';
import { Header } from './Header';
import { useWallet } from '@/context/WalletContext';
import { Sidebar } from './Sidebar';

export function AppShell({ children }: { children: React.ReactNode }) {
  const { connectWallet, account } = useWallet();

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-y-auto">
        <Header onConnectWallet={connectWallet} account={account} />
        <main className="flex-grow">
          {children}
        </main>
      </div>
    </div>
  );
}

declare global {
  interface Window {
    ethereum?: any;
  }
}
