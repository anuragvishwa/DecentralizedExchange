// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./Token.sol";

contract Swap {
    string public name = "Swapper";
    Token public token; //Represents Token smart contract

    constructor(Token _token) public {
        token = _token;
    }
}
