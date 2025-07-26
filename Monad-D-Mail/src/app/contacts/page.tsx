import { ContactManager } from '@/components/ContactManager';

export default function ContactsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold font-headline mb-6">Contacts</h1>
      <ContactManager />
    </div>
  );
}
