// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./Token.sol";

contract Swap {
    string public name = "Swapper";
    Token public token; //Represents Token smart contract
    uint256 public rate = 100;

    constructor(Token _token) public {
        token = _token;
    }

    function buyTokens() public payable {
        //1 Ether = 100 tokens
        //Total Number of tokens to buy
        uint256 tokenAmount = msg.value * rate;
        token.transfer(msg.sender, tokenAmount);
    }
}
