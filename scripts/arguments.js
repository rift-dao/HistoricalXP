const { ethers } = require('hardhat');
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');
const lootIds = require('./hxpS1.json');

function hashLoot(lootId, xp) {
    return Buffer.from(ethers.utils.solidityKeccak256(['uint256', 'uint256'], [lootId, xp]).slice(2), 'hex');
}

// Create Tree from LootID : XP pairs
const leaves = Object.entries(lootIds).map(lootId => hashLoot(...lootId));
const tree = new MerkleTree(leaves, keccak256, {sortPairs:true});

module.exports = [
    tree.getRoot(),
    "0xA1604ced1D0DBAE35f84Ac4ec1dA64cc222c1570"
  ];