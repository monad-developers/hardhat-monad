# Monad flavored Hardhat starter

This project demonstrates a basic Hardhat use case configured for Monad. It comes with a sample
contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

## Project Structure

```
hardhat-monad/
├── contracts/             # Smart contract source files
│   └── Counter.sol        # Simple counter contract (no constructor params)
├── ignition/              # Hardhat Ignition deployment modules
│   └── modules/
│       └── Counter.ts     # Deployment configuration for Counter contract
├── .env.example           # Example environment variables file
├── hardhat.config.ts      # Hardhat configuration
├── package.json           # Project dependencies
└── tsconfig.json          # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js (v16+)

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/monad-developers/hardhat-monad.git
   cd hardhat-monad
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Add your private key and Etherscan API key to the `.env` file:
   ```
   PRIVATE_KEY=your_private_key_here
   ETHERSCAN_API_KEY=your_etherscan_api_key_here
   ```
   ⚠️ **IMPORTANT**: Never commit your `.env` file or expose your private key.

## Testing

Run tests with Hardhat:

```bash
npx hardhat test
```

## Deployment

This project uses Hardhat Ignition for deployments, which makes it easy to manage complex deployment procedures.

### Deploy to Local Chain

To deploy the contract to a local hardhat node, first start the node:

```bash
npx hardhat node
```

Then deploy:

```bash
npx hardhat ignition deploy ignition/modules/Counter.ts
```

### Deploy to Monad Testnet

To deploy to Monad Testnet, you need an account with funds. Make sure you have set your private key in the `.env` file:

```bash
npx hardhat ignition deploy ignition/modules/Counter.ts --network monadTestnet
```

To redeploy to a different address:

```bash
npx hardhat ignition deploy ignition/modules/Counter.ts --network monadTestnet --reset
```

To verify the deployed contract on Monad Testnet (uses Sourcify and MonadScan):

```bash
npx hardhat verify <CONTRACT_ADDRESS> --network monadTestnet
```

**Note:** The verification command may show an error message, but this is often misleading - the contract is usually verified successfully on both Sourcify and MonadScan. Check the explorer links to confirm verification.

### Deploy to Monad Mainnet

To deploy to Monad Mainnet, ensure you have set your private key in the `.env` file:

```bash
npx hardhat ignition deploy ignition/modules/Counter.ts --network monadMainnet
```

To redeploy to a different address:

```bash
npx hardhat ignition deploy ignition/modules/Counter.ts --network monadMainnet --reset
```

To verify the deployed contract on Monad Mainnet (uses Sourcify and MonadScan):

```bash
npx hardhat verify <CONTRACT_ADDRESS> --network monadMainnet
```

**Note:** The verification command may show an error message, but this is often misleading - the contract is usually verified successfully on both Sourcify and MonadScan. Check the explorer links to confirm verification.

Once verified, you can view your contract on:
- [MonadVision](https://monadvision.com) (Sourcify)
- [MonadScan](https://monadscan.com) (Etherscan)

## Counter Contract

The sample Counter contract includes:
- `inc()` - Increment counter by 1
- `incBy(uint)` - Increment counter by a specified amount
- `x` - Public variable to read the current count

## Got questions?

- Refer to [docs.monad.xyz](https://docs.monad.xyz) for Monad-specific documentation
- Visit [Hardhat Documentation](https://hardhat.org/docs) for Hardhat help
- Check [Hardhat Ignition Guide](https://hardhat.org/ignition/docs/getting-started) for deployment assistance

## License

This project is licensed under the MIT License.
