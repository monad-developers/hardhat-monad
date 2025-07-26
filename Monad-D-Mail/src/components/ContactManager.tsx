'use client';
import { useContacts } from '@/hooks/use-contacts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ethers } from 'ethers';
import { Trash2, UserPlus } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  address: z.string().refine((value) => ethers.isAddress(value), {
    message: 'Please enter a valid wallet address',
  }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactManager() {
  const { contacts, addContact, removeContact } = useContacts();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      address: '',
    },
  });

  const onSubmit: SubmitHandler<ContactFormValues> = (data) => {
    addContact(data);
    form.reset();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus /> Add New Contact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Vitalik" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wallet Address</FormLabel>
                    <FormControl>
                      <Input placeholder="0x..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Save Contact
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Saved Contacts ({contacts.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {contacts.length === 0 ? (
            <p className="text-muted-foreground text-center">No contacts saved yet.</p>
          ) : (
            contacts.map((contact) => (
              <div key={contact.address} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                <div>
                  <p className="font-semibold">{contact.name}</p>
                  <p className="text-xs text-muted-foreground font-code" title={contact.address}>
                    {`${contact.address.substring(0, 10)}...${contact.address.substring(contact.address.length - 8)}`}
                  </p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeContact(contact.address)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
