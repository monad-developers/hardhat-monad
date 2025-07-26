'use client';
import { NavLinks } from './NavLinks';
import { Info } from 'lucide-react';

export function Sidebar() {
  return (
    <aside className="hidden lg:flex w-64 flex-shrink-0 border-r border-border/20 p-6 flex-col">
      <div className="flex-grow">
        <NavLinks />
      </div>
      <div className="mt-auto space-y-4 flex-shrink-0">
        <div className="flex items-center justify-center p-3 rounded-lg bg-muted/70 text-muted-foreground text-xs">
            <Info className="mr-2 h-4 w-4 text-accent flex-shrink-0" />
            <p>
                This app is running on the Monad Testnet.
            </p>
        </div>
        <p className="text-sm text-muted-foreground text-center">Dev crypto_xbr</p>
      </div>
    </aside>
  );
}
