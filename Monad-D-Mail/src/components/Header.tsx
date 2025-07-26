import { Menu, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { NavLinks } from './NavLinks';
import { useState } from 'react';

interface HeaderProps {
  onConnectWallet: () => void;
  account: string | null;
}

export function Header({ onConnectWallet, account }: HeaderProps) {
  const [isSheetOpen, setSheetOpen] = useState(false);

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  }

  return (
    <header className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl flex justify-between items-center">
        <div className="lg:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs p-6">
                <SheetHeader>
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                </SheetHeader>
                <NavLinks onLinkClick={() => setSheetOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>
        
        <div className="flex-1 flex justify-end">
          {account ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">
                    <Wallet className="mr-2 h-4 w-4" />
                    {formatAddress(account)}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{account}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Button onClick={onConnectWallet}>
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
