# Monad D-Mail

A fully decentralized messaging application built on the Monad Testnet, enabling secure, censorship-resistant, and user-controlled communication directly on-chain.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Available-brightgreen)](https://monad-d-mail.vercel.app/inbox)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Built on Monad](https://img.shields.io/badge/Built%20on-Monad-blue)](https://monad.xyz)

## Features

- **Wallet Integration** – Connect MetaMask and interact with the Monad Testnet
- **On-Chain Messaging** – All messages are permanently stored on-chain using smart contracts
- **Public Feed** – View a live stream of messages broadcasted to the public
- **Contact Management** – Add and manage local contacts using browser storage
- **Responsive UI** – Mobile and desktop optimized interface
- **EVM Compatibility** – Built with Hardhat + Ethers.js, fully compatible with Ethereum toolchain

## Tech Stack

- **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS, ShadCN/UI
- **Web3**: Ethers.js
- **Smart Contracts**: Solidity, Hardhat
- **Deployment**: Monad Testnet

## Demo

🔗 **Live Application**: [monad-d-mail.vercel.app/inbox](https://monad-d-mail.vercel.app/inbox)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MetaMask wallet extension
- Monad Testnet funds ([Get from faucet](https://faucet.monad.xyz/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dinitheth/Monad-D-Mail.git
   cd Monad-D-Mail
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Add your private key to `.env`:
   ```env
   PRIVATE_KEY=your_metamask_private_key
   ```
   > ⚠️ **Warning**: Never commit your `.env` file or share your private key publicly.

4. **Deploy the smart contract**
   ```bash
   npx hardhat run scripts/deploy.ts --network monad
   ```
   This will deploy `MessageBoard.sol` and save the contract address and ABI to `src/contracts/contract-address.json`.

5. **Start the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:9002](http://localhost:9002) in your browser.

## Project Structure

```
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # UI components (ShadCN/UI)
│   ├── context/          # WalletContext and state management
│   ├── hooks/            # Custom React hooks
│   └── contracts/        # Contract address and ABI
├── contracts/            # Solidity smart contracts
├── scripts/              # Hardhat deployment scripts
└── hardhat.config.js     # Hardhat configuration
```

## Smart Contract

The core messaging functionality is implemented in `MessageBoard.sol`:

```solidity
function sendMessage(address recipient, string calldata text) public;
function getMessageCount() public view returns (uint256);
```

- Public feed messages use `address(0)` as the recipient
- All messages are stored on-chain and indexed by ID
- Messages include sender, recipient, content, and timestamp

## Usage

1. **Connect Wallet**: Click "Connect Wallet" and select MetaMask
2. **Switch Network**: Ensure you're connected to Monad Testnet
3. **Send Messages**: 
   - Use `0x0000000000000000000000000000000000000000` for public messages
   - Enter any valid address for private messages
4. **View Messages**: Check the public feed or your inbox for received messages
5. **Manage Contacts**: Add frequently used addresses to your contact list

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Developer

**crypto_xbr**

## Acknowledgments

- Built on [Monad](https://monad.xyz) - High-performance EVM-compatible blockchain
- UI components from [ShadCN/UI](https://ui.shadcn.com)
- Styled with [Tailwind CSS](https://tailwindcss.com)

---

**Disclaimer**: This is a testnet application for demonstration purposes. Do not use real funds or sensitive information.
