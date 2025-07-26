
'use client';
import { useState } from 'react';
import { Send, User, ChevronDown, Check, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useContacts, type Contact } from '@/hooks/use-contacts';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { useToast } from '@/hooks/use-toast';
import { ethers } from 'ethers';
import { cn } from '@/lib/utils';
import { Switch } from './ui/switch';
import { Label } from './ui/label';

interface MessageFormProps {
  onPostMessage: (message: string, recipient: string) => Promise<void>;
  posting: boolean;
  account: string | null;
}

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export function MessageForm({ onPostMessage, posting, account }: MessageFormProps) {
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState(ZERO_ADDRESS);
  const [isPublic, setIsPublic] = useState(true);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const { contacts } = useContacts();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalRecipient = isPublic ? ZERO_ADDRESS : recipient;

    if (!ethers.isAddress(finalRecipient)) {
      toast({ title: "Invalid Address", description: "The recipient wallet address is not valid.", variant: "destructive" });
      return;
    }
    if (message.trim() && finalRecipient.trim()) {
      onPostMessage(message.trim(), finalRecipient.trim());
      setMessage('');
    }
  };
  
  const isDisabled = posting || !account;
  const finalRecipient = isPublic ? ZERO_ADDRESS : recipient;

  const handleSelectContact = (contact: Contact) => {
    setRecipient(contact.address);
    setPopoverOpen(false);
  }

  const handlePublicToggle = (checked: boolean) => {
    setIsPublic(checked);
    if (checked) {
      setRecipient(ZERO_ADDRESS);
    } else {
      setRecipient('');
    }
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <Card className="overflow-hidden shadow-lg border-primary/20 max-w-3xl mx-auto">
        <form onSubmit={handleSubmit}>
          <CardContent className="p-4 space-y-4">
            <div className="flex flex-col md:flex-row items-start gap-4">
              <Avatar className="mt-1 hidden md:flex">
                <AvatarImage src={account ? `https://api.dicebear.com/8.x/bottts-neutral/svg?seed=${account}` : "https://placehold.co/40x40.png"} data-ai-hint="user avatar" alt="Your Avatar" />
                <AvatarFallback>{account ? account.substring(2,4).toUpperCase() : 'U'}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2 w-full">
                  <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                       <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                          <PopoverTrigger asChild disabled={true}>
                               <Button
                                  variant="outline"
                                  role="combobox"
                                  aria-expanded={popoverOpen}
                                  className={cn("w-full justify-between pl-9 font-normal", isPublic && "text-muted-foreground")}
                              >
                                  {'Public Message (Broadcast)'}
                                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                             <Command>
                                 <CommandInput 
                                      placeholder="Search or paste address..."
                                      onValueChange={setRecipient}
                                  />
                                 <CommandList>
                                  <CommandEmpty>No contacts found.</CommandEmpty>
                                  <CommandGroup>
                                      {contacts.map((contact) => (
                                      <CommandItem
                                          key={contact.address}
                                          value={`${contact.name} ${contact.address}`}
                                          onSelect={() => handleSelectContact(contact)}
                                      >
                                          <div className="flex items-center justify-between w-full">
                                            <div className="flex flex-col">
                                                <span>{contact.name}</span>
                                                <span className="text-xs text-muted-foreground">{contact.address}</span>
                                            </div>
                                            <Check
                                              className={cn(
                                                "mr-2 h-4 w-4",
                                                recipient.toLowerCase() === contact.address.toLowerCase() ? "opacity-100" : "opacity-0"
                                              )}
                                            />
                                          </div>
                                      </CommandItem>
                                      ))}
                                  </CommandGroup>
                                 </CommandList>
                             </Command>
                          </PopoverContent>
                      </Popover>
                  </div>
                  <Textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={account ? "What's on your mind? Your message will be public on the Monad chain." : "Please connect your wallet to post a message."}
                      rows={3}
                      className="resize-none flex-1 border-0 focus-visible:ring-0 shadow-none px-0"
                      disabled={isDisabled}
                  />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end p-4 py-3 bg-muted/50">
            <Button type="submit" disabled={!message.trim() || !finalRecipient.trim() || isDisabled}>
              {posting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

