
'use client';
import { useWallet } from "@/context/WalletContext";
import { useState, useEffect } from 'react';

export default function InboxPage() {
  const { messages, account } = useWallet();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const currentUser = account?.toLowerCase();

  return (
    <div className="p-4 sm:p-6 lg:p-8">

      {messages.length === 0 ? (
        <div className="text-center py-16 rounded-lg border-2 border-dashed border-muted-foreground/20 max-w-3xl mx-auto mt-8">
          <p className="text-muted-foreground">No messages found.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 max-w-3xl mx-auto">
          {messages.map((msg, index) => {
            const isSent = msg.author.toLowerCase() === currentUser;

            return (
              <div
                key={index}
                className={`flex flex-col rounded-lg p-3 shadow-md max-w-[70%] min-w-[150px] ${
                  isSent 
                    ? "bg-primary text-primary-foreground self-end rounded-br-none" 
                    : "bg-muted text-muted-foreground self-start rounded-bl-none"
                }`}
              >
                <div className="flex justify-between items-baseline gap-3 text-xs opacity-80 mb-2">
                  <span className="font-bold truncate" title={msg.author}>
                    {isSent ? "You" : (msg.author.slice(0, 6) + "..." + msg.author.slice(-4))}
                  </span>
                  <span>
                    {isClient ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                  </span>
                </div>
                <p className="text-base whitespace-pre-wrap break-words text-left">
                  {msg.text}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
