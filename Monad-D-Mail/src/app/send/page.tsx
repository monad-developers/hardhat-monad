'use client';

import { MessageForm } from '@/components/MessageForm';
import { useWallet } from '@/context/WalletContext';

export default function Send() {
  const { postMessage, posting, account } = useWallet();
  return <MessageForm onPostMessage={postMessage} posting={posting} account={account} />;
}
