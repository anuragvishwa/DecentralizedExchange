import React, { useState, useInput } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Buy(props) {
  const classes = useStyles();
  const [value, setValue] = useState("0");
  const [etherBalance, setEtherBalance] = useState(
    window.web3.utils.fromWei(props.etherBalance, "Ether")
  );

  const setEtherAmount = (e) => {
    setValue(e.target.value * 100);
  };

  const purchaseToken = async (event) => {
    event.preventDefault();
    let etherAmount;
    etherAmount = value / 100;
    etherAmount = window.web3.utils.toWei(etherAmount.toString(), "Ether");
    await props.buyTokens(etherAmount);
    setEtherBalance(window.web3.utils.fromWei(props.etherBalance, "Ether"));
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <form onSubmit={purchaseToken}>
          <TextField
            id="standard-full-width"
            onChange={setEtherAmount}
            style={{ margin: 8 }}
            placeholder="0"
            helperText={"Balance: " + etherBalance}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">ETH</InputAdornment>
              ),
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            id="standard-full-width"
            style={{ margin: 8 }}
            placeholder="0"
            helperText={
              "Balance: " +
              window.web3.utils.fromWei(props.tokenBalance, "Ether")
            }
            fullWidth
            disabled={true}
            margin="normal"
            value={value}
            variant="filled"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">UNI</InputAdornment>
              ),
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <CardActions>
            <Button type="submit" variant="contained" color="primary">
              SWAP
            </Button>
            <p>Exchange rate : 1 ETH = 100 UNI</p>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );
}
