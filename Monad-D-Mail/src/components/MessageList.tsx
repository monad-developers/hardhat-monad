import { MessageCard, type Message } from './MessageCard';
import { MessageSquare } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';


interface MessageListProps {
  messages: Message[];
  currentUser: string | null;
  loading: boolean;
}

export default function MessageList({ messages, currentUser, loading }: MessageListProps) {
  // Always show loading skeletons if loading is true, regardless of message count.
  // This prevents the "No Messages" screen from flashing while data is being fetched.
  if (loading) {
    return (
       <div className="space-y-6 max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
      </div>
    )
  }
  
  // Only show "No Messages" if loading is complete AND there are no messages.
  if (messages.length === 0) {
    return (
      <div className="text-center py-16 rounded-lg border-2 border-dashed border-muted-foreground/20 max-w-3xl mx-auto mt-8">
        <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/50" />
        <h2 className="mt-4 text-2xl font-headline text-muted-foreground">No Messages Found</h2>
        <p className="text-muted-foreground mt-2">
          Be the first to send a message on the Monad Testnet!
        </p>
      </div>
    );
  }

  // If not loading and messages exist, display them.
  return (
    <div className="space-y-6 max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
      {messages.map((msg, index) => (
        <MessageCard key={msg.timestamp.toISOString() + msg.author + index} message={msg} index={index} currentUser={currentUser} />
      ))}
    </div>
  );
}
