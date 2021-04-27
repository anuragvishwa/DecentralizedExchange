// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./Token.sol";

contract Swap {
    string public name = "Swapper";
    Token public token; //Represents Token smart contract
    uint256 public rate = 100;

    event TokenPurchased(
        address account, //Calling the function
        address token, //who purchased the Token
        uint256 amount,
        uint256 rate
    );

    event TokensSold(
        address account,
        address token,
        uint256 amount,
        uint256 rate
    );

    constructor(Token _token) public {
        token = _token;
    }

    function buyTokens() public payable {
        //1 Ether = 100 tokens
        //Total Number of tokens to buy
        uint256 tokenAmount = msg.value * rate;

        //Require that Swap has enough tokens
        require(token.balanceOf(address(this)) >= tokenAmount);

        //Transfer tokens to the user
        token.transfer(msg.sender, tokenAmount);

        //Emit the event
        emit TokenPurchased(msg.sender, address(token), tokenAmount, rate);
    }

    function sellTokens(uint256 _amount) public {
        // User can't sell more tokens than they have
        require(token.balanceOf(msg.sender) >= _amount);

        // Calculate the amount of Ether to redeem
        uint256 etherAmount = _amount / rate;

        // Require that EthSwap has enough Ether
        require(address(this).balance >= etherAmount);

        // Perform sale
        token.transferFrom(msg.sender, address(this), _amount);
        msg.sender.transfer(etherAmount);

        // Emit an event
        emit TokensSold(msg.sender, address(token), _amount, rate);
    }
}
