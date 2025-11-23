# Monad flavored Hardhat starter

This project demonstrates a basic Hardhat use case optimized for Monad. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

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
   git clone https://github.com/portdeveloper/hardhat-monad.git
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

4. Add your private key to the `.env` file:
   ```
   PRIVATE_KEY=your_private_key_here
   ```
   ⚠️ **IMPORTANT**: Never commit your `.env` file or expose your private key.

## Testing

Run tests with Hardhat:

```bash
npx hardhat test
```

## How to deploy your contract

This project uses Hardhat Ignition for deployments, which makes it easy to manage complex deployment procedures.

### Local Deployment (Hardhat Network)

Run hardhat node by running:

```bash
npx hardhat node
```

To deploy the contract to the local hardhat node, run the following command:

```bash
npx hardhat ignition deploy ignition/modules/Lock.ts
```

### Monad Testnet Deployment

```bash
npx hardhat ignition deploy ignition/modules/Lock.ts --network monadTestnet
```

To redeploy the same code to a different address use the command below:

```bash
npx hardhat ignition deploy ignition/modules/Lock.ts --network monadTestnet --reset
```

You can customize deployment parameters:

```bash
npx hardhat ignition deploy ignition/modules/Lock.ts --network monadTestnet --parameters '{"unlockTime": 1893456000, "lockedAmount": "1000000000000000"}'
```

### Monad Mainnet Deployment

```bash
npx hardhat ignition deploy ignition/modules/Lock.ts --network monadMainnet
```

To redeploy the same code to a different address use the command below:

```bash
npx hardhat ignition deploy ignition/modules/Lock.ts --network monadMainnet --reset
```

You can customize deployment parameters:

```bash
npx hardhat ignition deploy ignition/modules/Lock.ts --network monadMainnet --parameters '{"unlockTime": 1893456000, "lockedAmount": "1000000000000000"}'
```

## How to verify your contract

This project is configured to use Sourcify for contract verification on Monad. After deployment, you can verify your contract with:

**Monad Testnet:**
```bash
npx hardhat verify <contract_address> --network monadTestnet
```

**Monad Mainnet:**
```bash
npx hardhat verify <contract_address> --network monadMainnet
```

Once verified, you can view your contract on the [Monad Explorer](https://testnet.monadexplorer.com).

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

