const Web3 = require("web3");
const web3 = new Web3("http://localhost:7545");

const Token = artifacts.require("Token");
const Swap = artifacts.require("Swap");
require("chai").use(require("chai-as-promised")).should();

function tokens(n) {
  return web3.utils.toWei(n, "ether");
}

contract("Swap", (accounts) => {
  let token;
  let swap;

  beforeEach(async () => {
    token = await Token.new();
    swap = await Swap.new(token.address);
    //Transfer all tokens to Swap
    await token.transfer(swap.address, tokens("1000000"));
  });

  describe("Token deployment ", async () => {
    it("contract has a name", async () => {
      const name = await token.name();
      assert.equal(name, "Triology");
    });
  });

  describe("Swap deployment ", async () => {
    it("contract has a name", async () => {
      const name = await swap.name();
      assert.equal(name, "Swapper");
    });

    it("contract has tokens", async () => {
      let balance = await token.balanceOf(swap.address);
      assert.equal(balance.toString(), tokens("1000000"));
    });
  });
});
