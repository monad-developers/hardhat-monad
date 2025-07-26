
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Inbox, Send, Bot, Users, Contact } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavLinksProps {
  onLinkClick?: () => void;
}

const navLinks = [
  { href: '/inbox', label: 'Public Feed', icon: Inbox },
  { href: '#', label: 'Inbox', icon: Inbox, disabled: true },
  { href: '/send', label: 'Send', icon: Send },
  { href: '/contacts', label: 'Contacts', icon: Contact },
];

export function NavLinks({ onLinkClick }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <>
      <div className="flex items-center gap-2 mb-10">
        <Bot className="h-8 w-8 text-primary" />
        <h1 className="text-xl font-bold font-headline text-foreground">
          Monad D-Mail
        </h1>
      </div>
      <nav className="space-y-2">
        {navLinks.map(({ href, label, icon: Icon, disabled }) => {
          const isActive = pathname === href || (href === '/inbox' && pathname === '/');
          return (
            <Link
              key={href + label}
              href={disabled ? '#' : href}
              onClick={onLinkClick}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all",
                !disabled && "hover:text-primary hover:bg-muted",
                isActive && "bg-muted text-primary",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
              {disabled && <span className="text-xs ml-auto">(Soon)</span>}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
