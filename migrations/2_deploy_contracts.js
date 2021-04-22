const Token = artifacts.require("Token");
const Swap = artifacts.require("Swap");

module.exports = async (deployer) => {
  await deployer.deploy(Token);
  const token = await Token.deployed();

  await deployer.deploy(Swap, token.address);
  const swap = await Swap.deployed();

  //Transfer all tokens to Swap
  await token.transfer(swap.address, "1000000000000000000000000");
};
