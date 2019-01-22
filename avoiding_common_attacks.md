## Avoiding Common Attacks


### Reentrancy ➰
We are using the withdrawl pattern in the Smart Contract. The withdraw function is a used by user to withdraw their funds. By using the transfer() function instead of call.value() we limit the amount of wei transmitted to any fallback function.


### Integer overflows/underflows 🔬
Used the awesome [SafeMath](https://github.com/OpenZeppelin/openzeppelin-solidity/) contract for this. 

### DDoS 💻
We are using the pull over push payments method and thus it protects against the threat of DDoS.


### Timestamping / miner tampering ⏲️
We have not touched the timestamps of any block and hence it protects us from minor tampering with the blocks.


### Owner Profile 🕵️
The constructor initializes the owner's profile using their address so in case something goes wrong one can kill the contract and remove it from the blockchain with all the funds remaining safe.


### Bugs 🐛
In case any bugs are detected in the contract, we can freeze the contract and fix them without incorporating heavy damage while the bug is being fixed.
