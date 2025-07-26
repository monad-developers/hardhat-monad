const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const MessageBoard = await ethers.getContractFactory("MessageBoard");
  const messageBoard = await MessageBoard.deploy();

  await messageBoard.waitForDeployment();
  const contractAddress = await messageBoard.getAddress();

  console.log(`MessageBoard contract deployed to: ${contractAddress}`);

  // Save the contract address to a file
  const contractInfo = {
    address: contractAddress,
    abi: JSON.parse(messageBoard.interface.formatJson())
  };

  const contractsDir = path.join(__dirname, "..", "src", "contracts");
  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }
  fs.writeFileSync(
    path.join(contractsDir, "contract-address.json"),
    JSON.stringify(contractInfo, null, 2)
  );

  console.log("Contract address and ABI saved to src/contracts/contract-address.json");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
