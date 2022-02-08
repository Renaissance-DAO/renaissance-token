require("@nomiclabs/hardhat-web3");

// List of addresses deployed to Hardhat Network. 
// Edit the addresses below if the deployed addresses are different.
const FRAX_ADDRESS = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"

task("balance", "Prints an account's balance")
  .addParam("account", "The account's address")
  .setAction(async (taskArgs) => {
    const account = web3.utils.toChecksumAddress(taskArgs.account);
    const balance = await web3.eth.getBalance(account);
    console.log(`"Account: ${account} Balance: ${balance}`)
});

task("mint-frax", "Mint test FRAX to an account")
  .addParam("account", "The account's address to mint and send FRAX to.")
  .addParam("amount", "Amount of FRAX to mint")
  .setAction(async (taskArgs) => {
    const fraxAmount = web3.utils.toWei(taskArgs.amount, "ether");

    const accounts = await ethers.getSigners();
    const FRAX = await ethers.getContractFactory("FRAX");
    const frax = new hre.ethers.Contract(FRAX_ADDRESS, FRAX.interface, accounts[0]);
  
    await frax.mint(taskArgs.account, fraxAmount);
    console.log(`Minted ${taskArgs.amount} FRAX to Address ${taskArgs.account}`);
});

module.exports = {};