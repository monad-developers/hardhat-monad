'use client';
import { useState, useEffect, useCallback } from 'react';

export interface Contact {
  name: string;
  address: string;
}

const isBrowser = typeof window !== 'undefined';
const CONTACTS_STORAGE_KEY = 'monad-dmail-contacts';

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    if (isBrowser) {
      try {
        const storedContacts = localStorage.getItem(CONTACTS_STORAGE_KEY);
        if (storedContacts) {
          setContacts(JSON.parse(storedContacts));
        }
      } catch (error) {
        console.error("Failed to parse contacts from localStorage", error);
      }
    }
  }, []);

  const saveContacts = useCallback((newContacts: Contact[]) => {
    if (isBrowser) {
        try {
            // Sort by name before saving
            const sortedContacts = newContacts.sort((a, b) => a.name.localeCompare(b.name));
            setContacts(sortedContacts);
            localStorage.setItem(CONTACTS_STORAGE_KEY, JSON.stringify(sortedContacts));
        } catch (error) {
            console.error("Failed to save contacts to localStorage", error);
        }
    }
  }, []);

  const addContact = useCallback((newContact: Contact) => {
    // Prevent adding duplicates (case-insensitive address)
    if (contacts.some(c => c.address.toLowerCase() === newContact.address.toLowerCase())) {
        console.warn("Contact with this address already exists.");
        // Optionally, show a toast notification here
        return;
    }
    saveContacts([...contacts, newContact]);
  }, [contacts, saveContacts]);

  const removeContact = useCallback((address: string) => {
    const newContacts = contacts.filter(c => c.address.toLowerCase() !== address.toLowerCase());
    saveContacts(newContacts);
  }, [contacts, saveContacts]);
  
  const getContactByAddress = useCallback((address: string) => {
    return contacts.find(c => c.address.toLowerCase() === address.toLowerCase());
  }, [contacts]);


  return { contacts, addContact, removeContact, getContactByAddress };
}
