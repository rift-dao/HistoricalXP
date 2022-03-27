const { ethers } = require('hardhat');
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');
const lootIds = require('../data/hxpS1.json');

function hashLoot(lootId, xp) {
    return Buffer.from(ethers.utils.solidityKeccak256(['uint256', 'uint256'], [lootId, xp]).slice(2), 'hex');
}

// Create Tree from LootID : XP pairs
const leaves = Object.entries(lootIds).map(lootId => hashLoot(...lootId));
const tree = new MerkleTree(leaves, keccak256, {sortPairs:true});

// Merkle Root
console.log("---------------------------------")
console.log("Generated Merkle Tree with Root:")
const root = tree.getRoot().toString('hex')
console.log(root);
console.log("");

// get a proof for a specific LootID
console.log("---------------------------------")
console.log("Data for bag 612")
console.log("612 xp is: ", lootIds[612]);
console.log("");
console.log("...generating proof for 612")
const leaf = hashLoot(612, lootIds[612]);
const proof = tree.getProof(leaf);
console.log("");
console.log("..verifying proof");
console.log(tree.verify(proof, leaf, root))
