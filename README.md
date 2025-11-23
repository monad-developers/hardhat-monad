# Monad flavored Hardhat starter

This project demonstrates a basic Hardhat use case configured for Monad. It comes with a sample
contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

## Project Structure

```
hardhat-monad/
├── contracts/             # Smart contract source files
│   └── Lock.sol           # Sample time-locked wallet contract
├── ignition/              # Hardhat Ignition deployment modules
│   └── modules/
│       └── Lock.ts        # Deployment configuration for Lock contract
├── test/                  # Test files
│   └── Lock.ts            # Tests for the Lock contract
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
npx hardhat ignition deploy ignition/modules/Lock.ts
```

### Deploy to Monad Testnet

To deploy to Monad Testnet, you need an account with funds. Make sure you have set your private key in the `.env` file:

```bash
npx hardhat ignition deploy ignition/modules/Lock.ts --network monadTestnet
```

To redeploy to a different address:

```bash
npx hardhat ignition deploy ignition/modules/Lock.ts --network monadTestnet --reset
```

To verify the deployed contract on Monad Testnet (uses Sourcify and MonadScan):

```bash
npx hardhat verify <CONTRACT_ADDRESS> --network monadTestnet
```

### Deploy to Monad Mainnet

To deploy to Monad Mainnet, ensure you have set your private key in the `.env` file:

```bash
npx hardhat ignition deploy ignition/modules/Lock.ts --network monadMainnet
```

To redeploy to a different address:

```bash
npx hardhat ignition deploy ignition/modules/Lock.ts --network monadMainnet --reset
```

To verify the deployed contract on Monad Mainnet (uses Sourcify and MonadScan):

```bash
npx hardhat verify <CONTRACT_ADDRESS> --network monadMainnet
```

Once verified, you can view your contract on:
- [MonadVision](https://monadvision.com) (Sourcify)
- [MonadScan](https://monadscan.com) (Etherscan)

## Customizing the Lock Contract

The sample Lock contract is a simple time-locked wallet that:
- Accepts ETH during deployment
- Locks funds until a specified timestamp
- Allows only the owner to withdraw once the time has passed

You can modify the unlock time in `ignition/modules/Lock.ts` or pass it as a parameter during deployment.

## Got questions?

- Refer to [docs.monad.xyz](https://docs.monad.xyz) for Monad-specific documentation
- Visit [Hardhat Documentation](https://hardhat.org/docs) for Hardhat help
- Check [Hardhat Ignition Guide](https://hardhat.org/ignition/docs/getting-started) for deployment assistance

## License

This project is licensed under the MIT License.
