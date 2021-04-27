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
  let result;

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

  describe("buyTokens()", async () => {
    it("Allows user to purchase the tokens from Swap at a fixed price", async () => {
      result = await swap.buyTokens({
        from: accounts[1],
        value: web3.utils.toWei("0.1", "ether"),
      }); //Bought 10 tokens by account - 1 for 0.1 ether

      let investorBalance = await token.balanceOf(accounts[1]); //10 Tokens
      assert.equal(investorBalance.toString(), tokens("10"));

      let swapBalance = await token.balanceOf(swap.address);
      assert.equal(swapBalance.toString(), tokens("999990"));
      swapBalance = await web3.eth.getBalance(swap.address);
      assert.equal(swapBalance.toString(), web3.utils.toWei("0.1", "ether"));

      const event = result.logs[0].args;
      assert.equal(event.account, accounts[1]);
      assert.equal(event.token, token.address);
      assert.equal(event.amount.toString(), tokens("10").toString());
      assert.equal(event.rate.toString(), "100");

      // console.log(result.logs);
    });
  });

  describe("sellTokens()", async () => {
    let result;

    before(async () => {
      // Investor must approve tokens before the purchase
      await token.approve(swap.address, tokens("10"), { from: accounts[1] });
      // Investor sells tokens
      result = await swap.sellTokens(tokens("10"), { from: accounts[1] });
    });

    it("Allows user to instantly sell tokens to ethSwap for a fixed price", async () => {
      // Check investor token balance after purchase
      let investorBalance = await token.balanceOf(accounts[1]);
      assert.equal(investorBalance.toString(), tokens("0"));

      // Check ethSwap balance after purchase
      let ethSwapBalance;
      ethSwapBalance = await token.balanceOf(swap.address);
      assert.equal(ethSwapBalance.toString(), tokens("1000000"));
      ethSwapBalance = await web3.eth.getBalance(swap.address);
      assert.equal(ethSwapBalance.toString(), web3.utils.toWei("0", "Ether"));

      // Check logs to ensure event was emitted with correct data
      const event = result.logs[0].args;
      assert.equal(event.account, accounts[1]);
      // assert.equal(event.token, token.address);
      assert.equal(event.amount.toString(), tokens("10").toString());
      assert.equal(event.rate.toString(), "100");

      await swap.sellTokens(tokens("500"), { from: accounts[1] }).should.be
        .rejected;
    });
  });
});
