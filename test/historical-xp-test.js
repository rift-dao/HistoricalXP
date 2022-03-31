const { expect } = require("chai");
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

describe("HistoricalXP", function () {
  it("Should award xp", async function () {
    const RiftData = await ethers.getContractFactory("RiftData");
    const riftdata = await RiftData.deploy();
    const HistoricalXP = await ethers.getContractFactory("HistoricalXP");
    const hxp = await HistoricalXP.deploy(tree.getRoot(), riftdata.address);
    await hxp.deployed();
    await riftdata.addXPController(hxp.address);

    expect(await riftdata.xpMap(612)).to.equal(0)

    const proof = tree.getHexProof(hashLoot(612, lootIds[612]));
    await hxp.claimXP(612, 2000, proof);

    expect(await riftdata.xpMap(612)).to.equal(lootIds[612])

    // gloot test
    expect(await riftdata.xpMap(9997962)).to.equal(0)

    const gproof = tree.getHexProof(hashLoot(9997962, lootIds[9997962]));
    await hxp.claimXP(9997962, 200, gproof);

    expect(await riftdata.xpMap(9997962)).to.equal(lootIds[9997962])

  });

  it("Should award xp to multiple", async function () {
    const RiftData = await ethers.getContractFactory("RiftData");
    const riftdata = await RiftData.deploy();
    const HistoricalXP = await ethers.getContractFactory("HistoricalXP");
    const hxp = await HistoricalXP.deploy(tree.getRoot(), riftdata.address);
    await hxp.deployed();
    await riftdata.addXPController(hxp.address);

    expect(await riftdata.xpMap(612)).to.equal(0)
    expect(await riftdata.xpMap(9997962)).to.equal(0)

    const proof = tree.getHexProof(hashLoot(612, lootIds[612]));
    const gproof = tree.getHexProof(hashLoot(9997962, lootIds[9997962]));

    await hxp.claimXPMultiple([612, 9997962], [2000, 200], [proof, gproof]);

    expect(await riftdata.xpMap(612)).to.equal(lootIds[612])
    expect(await riftdata.xpMap(9997962)).to.equal(lootIds[9997962])

  });
});
