import React, { Component } from "react";
import ButtonAppBar from "./Appbar";
import Web3 from "web3";
import Swap from "./abis/Swap.json";
import Token from "./abis/Token.json";
import CircularIndeterminate from "./Loader";
import Main from "./Main";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      token: {},
      swapBalance: "",
      tokenBalance: 0,
      swap: {},
      loading: true,
      swapAdd: "",
    };
  }

  async componentDidMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    console.log(this.state.account);
    const swapBalance = await web3.eth.getBalance(this.state.account);
    this.setState({ swapBalance });
    console.log("balance => ", swapBalance);

    //Load token
    const networkId = await web3.eth.net.getId();

    try {
      const tokenData = Token.networks[networkId];
      const token = await new web3.eth.Contract(Token.abi, tokenData.address);
      this.setState({ token });
      //Getting the balance of the person
      let tokenBalance = await token.methods
        .balanceOf(this.state.account)
        .call();
      console.log("tokenBalance =>", tokenBalance.toString());
      this.setState({ tokenBalance: tokenBalance.toString() });
    } catch (err) {
      window.alert("Token contract not deployed to detected network " + err);
    }

    //Load Swap

    try {
      const swapData = Swap.networks[networkId];
      const swap = await new web3.eth.Contract(Swap.abi, swapData.address);
      console.log("SwapAddress", swapData.address);
      this.setState({ swap });
      this.setState({ swapAdd: swapData.address });
    } catch (err) {
      window.alert("Swap contract not deployed to detected network " + err);
    }
    this.setState({ loading: false });
  }

  buyTokens = async (etherAmount) => {
    this.setState({ loading: true });
    await this.state.swap.methods
      .buyTokens()
      .send({ value: etherAmount, from: this.state.account });

    this.setState({ loading: false });
  };

  sellTokens = async (tokenAmount) => {
    this.setState({ loading: true });
    await this.state.token.methods
      .approve(this.state.swapAdd, tokenAmount)
      .send({ from: this.state.account });
    console.log(tokenAmount);
    await this.state.swap.methods
      .sellTokens(tokenAmount)
      .send({ from: this.state.account });
    this.setState({ loading: false });
  };

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentprovider);
    } else {
      window.alert("Non-ethereum browser detected.Install metamask");
    }
  }
  render() {
    let content;

    if (this.state.loading) {
      content = <CircularIndeterminate />;
    } else {
      content = (
        <Main
          etherBalance={this.state.swapBalance}
          tokenBalance={this.state.tokenBalance}
          buyTokens={this.buyTokens}
          sellTokens={this.sellTokens}
        />
      );
    }
    return (
      <>
        <ButtonAppBar account={this.state.account} />
        {content}
      </>
    );
  }
}

export default App;
