
'use client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { ArrowRight, Globe } from 'lucide-react';
import { useContacts } from '@/hooks/use-contacts';
import { useState, useEffect } from 'react';

export interface Message {
  text: string;
  author: string;
  recipient: string;
  timestamp: Date;
}

interface MessageCardProps {
  message: Message;
  index: number;
  currentUser: string | null;
}

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';


export function MessageCard({ message, index, currentUser }: MessageCardProps) {
  const { getContactByAddress } = useContacts();
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    // This runs only on the client, after hydration
    setTimeAgo(formatDistanceToNow(new Date(message.timestamp), { addSuffix: true }));
  }, [message.timestamp]);


  const isSender = currentUser && message.author.toLowerCase() === currentUser.toLowerCase();
  const isRecipient = currentUser && message.recipient.toLowerCase() === currentUser.toLowerCase();
  const isPublicBroadcast = message.recipient === ZERO_ADDRESS;
  
  const authorContact = getContactByAddress(message.author);
  const recipientContact = getContactByAddress(message.recipient);

  const getDisplayName = (address: string, contact: any, isSelf: boolean) => {
    if (isSelf) return 'You';
    if (contact) return contact.name;
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  }

  const authorDisplayName = getDisplayName(message.author, authorContact, isSender);
  
  const recipientDisplayName = isPublicBroadcast 
    ? 'Public' 
    : getDisplayName(message.recipient, recipientContact, isRecipient);

  return (
    <div 
      className="opacity-0 animate-in fade-in-0 slide-in-from-bottom-5 duration-500 ease-out fill-mode-forwards"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Card className="w-full shadow-lg border-2 transition-all hover:shadow-xl hover:border-primary/50">
        <CardHeader className="flex flex-row items-center justify-between p-4 border-b-2 border-border/50">
           <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={`https://api.dicebear.com/8.x/bottts-neutral/svg?seed=${message.author}`} alt="Author Avatar" />
                <AvatarFallback>{message.author.substring(2, 4).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                  <div className="flex items-center gap-2 text-sm font-medium">
                      <span className="font-semibold font-code truncate" title={message.author}>
                          {authorDisplayName}
                      </span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      {isPublicBroadcast ? (
                        <span className="font-semibold font-code truncate flex items-center gap-1.5">
                          <Globe className="h-4 w-4 text-accent" /> {recipientDisplayName}
                        </span>
                      ) : (
                         <span className="font-semibold font-code truncate" title={message.recipient}>
                          {recipientDisplayName}
                        </span>
                      )}
                  </div>
              </div>
           </div>
            <div className="text-right">
                <p className="text-xs text-muted-foreground">
                  {timeAgo}
                </p>
            </div>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-foreground/90 whitespace-pre-wrap break-words leading-relaxed">{message.text}</p>
        </CardContent>
      </Card>
    </div>
  );
}
