
'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { ethers } from 'ethers';
import { useToast } from '@/hooks/use-toast';
import contractInfo from '@/contracts/contract-address.json';
import { Message } from '@/components/MessageCard';

const monadTestnet = {
  chainId: '0x279F', // 10143 in hex
  chainName: 'Monad Testnet',
  nativeCurrency: { name: 'MON', symbol: 'MON', decimals: 18 },
  rpcUrls: ['https://testnet-rpc.monad.xyz/'],
  blockExplorerUrls: ['https://testnet.monadexplorer.com/'],
};

const contractAddress = contractInfo.address;
const contractABI = contractInfo.abi;

interface WalletState {
  account: string | null;
  messages: Message[];
  posting: boolean;
  loadingMessages: boolean;
  connectWallet: () => Promise<void>;
  postMessage: (message: string, recipient: string) => Promise<void>;
}

const WalletContext = createContext<WalletState | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageCount, setMessageCount] = useState<number>(0);
  const [posting, setPosting] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const switchNetwork = async (p: ethers.BrowserProvider) => {
    try {
      await p.send('wallet_switchEthereumChain', [{ chainId: monadTestnet.chainId }]);
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await p.send('wallet_addEthereumChain', [monadTestnet]);
        } catch (addError) {
          console.error("Could not add Monad Testnet:", addError);
          toast({ title: "Network Error", description: "Could not add the Monad Testnet to your wallet.", variant: "destructive" });
        }
      } else {
        console.error("Could not switch to Monad Testnet:", switchError);
        toast({ title: "Network Error", description: "Could not switch to the Monad Testnet.", variant: "destructive" });
      }
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const browserProvider = new ethers.BrowserProvider(window.ethereum);
        await browserProvider.send('eth_requestAccounts', []);
        await switchNetwork(browserProvider);
        
        const signer = await browserProvider.getSigner();
        const address = await signer.getAddress();

        setProvider(browserProvider);
        setAccount(address);
        
        toast({ title: "Wallet Connected!", description: "You're on the Monad Testnet." });

      } catch (error) {
        console.error("Error connecting wallet:", error);
        toast({ title: "Connection Failed", description: "Could not connect to the wallet.", variant: "destructive" });
      }
    } else {
      toast({ title: "MetaMask Not Found", description: "Please install MetaMask to use this dApp.", variant: "destructive" });
    }
  };
  
  const handleAccountsChanged = useCallback((accounts: string[]) => {
      if (accounts.length === 0) {
        console.log('Please connect to MetaMask.');
        setAccount(null);
        setProvider(null);
        setMessages([]);
        toast({ title: "Wallet Disconnected", description: "Your wallet has been disconnected." });
      } else if (accounts[0] !== account) {
        setAccount(accounts[0]);
      }
  }, [account, toast]);


  // Effect to handle wallet connection persistence and event listeners
  useEffect(() => {
    if (!isClient) return;
    const init = async () => {
        if (typeof window.ethereum !== 'undefined') {
            const browserProvider = new ethers.BrowserProvider(window.ethereum);
            const accounts = await browserProvider.send('eth_accounts', []);

            if (accounts.length > 0) {
                const network = await browserProvider.getNetwork();
                if (network.chainId.toString() === parseInt(monadTestnet.chainId, 16).toString()) {
                    setProvider(browserProvider);
                    setAccount(accounts[0]);
                }
            } else {
              setLoadingMessages(false);
            }
            
            window.ethereum.on('accountsChanged', handleAccountsChanged);
            window.ethereum.on('chainChanged', () => window.location.reload());
        } else {
          setLoadingMessages(false);
        }
    }

    init();

    return () => {
      if (window.ethereum?.removeListener) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', () => window.location.reload());
      }
    };
  }, [handleAccountsChanged, isClient]);


  const fetchMessages = useCallback(async () => {
    console.log("Attempting to fetch messages from the blockchain...");
    setLoadingMessages(true);
    try {
        const readOnlyProvider = new ethers.JsonRpcProvider(monadTestnet.rpcUrls[0]);
        const contract = new ethers.Contract(contractAddress, contractABI, readOnlyProvider);
        const countBigInt = await contract.getMessageCount();
        const count = Number(countBigInt);
        
        console.log(`Found ${count} messages on-chain. Fetching...`);
        const fetchedMessages: Message[] = [];
        for (let i = count - 1; i >= 0; i--) {
            const msg = await contract.messages(i);
            fetchedMessages.push({
                author: msg.author,
                recipient: msg.recipient,
                text: msg.text,
                timestamp: new Date(Number(msg.timestamp) * 1000),
            });
        }
        
        setMessages(fetchedMessages);
        setMessageCount(count);
        console.log("Successfully loaded and set messages.");
    } catch (error) {
        console.error("Error fetching messages:", error);
        toast({ title: "Loading Error", description: "Could not fetch messages from the blockchain.", variant: "destructive" });
    } finally {
        setLoadingMessages(false);
    }
  }, [toast]);

  // Initial fetch and polling setup
  useEffect(() => {
    if (!isClient) return;
    fetchMessages(); // Initial fetch

    const pollInterval = setInterval(async () => {
        try {
            const readOnlyProvider = new ethers.JsonRpcProvider(monadTestnet.rpcUrls[0]);
            const contract = new ethers.Contract(contractAddress, contractABI, readOnlyProvider);
            const countBigInt = await contract.getMessageCount();
            const count = Number(countBigInt);
            
            setMessageCount(prevCount => {
                if (count > prevCount) {
                    console.log("New messages detected, refetching...");
                    fetchMessages();
                }
                return count;
            });
        } catch (error) {
            console.error("Error polling for message count:", error);
        }
    }, 15000); // Poll every 15 seconds

    return () => {
        clearInterval(pollInterval);
    };
  }, [fetchMessages, isClient]);


  const postMessage = async (message: string, recipient: string) => {
    if (!provider) {
      toast({ title: "Wallet Not Connected", description: "Please connect your wallet.", variant: "destructive" });
      return;
    }
    if (contractAddress === 'REPLACE_WITH_YOUR_CONTRACT_ADDRESS' || !contractABI || contractABI.length === 0) {
        toast({ title: "Contract Not Deployed", description: "Please deploy the smart contract first.", variant: "destructive" });
        return;
    }

    setPosting(true);
    try {
      const signer = await provider.getSigner();
      const contractWithSigner = new ethers.Contract(contractAddress, contractABI, signer);
      const tx = await contractWithSigner.sendMessage(recipient, message);
      
      toast({ title: "Sending Message...", description: "Waiting for transaction confirmation." });
      
      await tx.wait();

      // The polling will pick up the new message, no need to manually fetch
      toast({ title: "Message Sent!", description: "Your message is now on the Monad blockchain." });

    } catch (error: any) {
      console.error("Error posting message:", error);
      const getRevertReason = (err: any) => {
        if (err.reason) return err.reason;
        if (err.data?.message) return err.data.message;
        if (err.message) return err.message;
        if (typeof err === 'string') return err;
        return "There was an error with your transaction.";
      }
      toast({ title: "Transaction Failed", description: getRevertReason(error), variant: "destructive" });
    }
    setPosting(false);
  };

  const value = {
    account,
    messages,
    posting,
    loadingMessages,
    connectWallet,
    postMessage,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
