const { ethers } = require("hardhat");
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');
const lootIds = require('../data/hxpS1.json');

function hashLoot(lootId, xp) {
    return Buffer.from(ethers.utils.solidityKeccak256(['uint256', 'uint256'], [lootId, xp]).slice(2), 'hex');
}

// Create Tree from LootID : XP pairs
const leaves = Object.entries(lootIds).map(lootId => hashLoot(...lootId));
const tree = new MerkleTree(leaves, keccak256, {sortPairs:true});

async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const HXP = await ethers.getContractFactory("HistoricalXP");
    // RIFTDATA 
    // ROPSTEN: 0xA1604ced1D0DBAE35f84Ac4ec1dA64cc222c1570
    // MAINNET: 0x632678bBa8a4DD16255F164e9d74853BeA9856E7
    const hxp = await HXP.deploy(tree.getRoot(), "0xA1604ced1D0DBAE35f84Ac4ec1dA64cc222c1570");
  
    console.log("Token address:", hxp.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });