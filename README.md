# HistoricalXP

This is a smart contract to claim XP for Loot in the Rift via a merkle tree proof.

1. Takes Loot participation data from THE BLOCKCHAIN as csv
2. Converts csv to json
3. Converts json to Merkle Tree
4. Merkle tree root is set on the contract. Claims can now begin.

The contract also tracks how much XP has been claimed per loot bag. This allows new data sets to be published that increase a bag's XP.