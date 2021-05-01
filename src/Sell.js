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

export default function Sell(props) {
  const classes = useStyles();
  const [value, setValue] = useState("0");

  const tokenAmount = (e) => {
    setValue(e.target.value / 100);
  };

  const sellToken = (event) => {
    event.preventDefault();
    let etherAmount;
    // etherAmount = value;
    etherAmount = window.web3.utils.toWei(value.toString(), "Ether");
    props.sellTokens(etherAmount);
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <form onSubmit={sellToken}>
          <TextField
            id="standard-full-width"
            label="Input"
            onChange={tokenAmount}
            style={{ margin: 8 }}
            placeholder="0"
            helperText={
              "Balance: " +
              window.web3.utils.fromWei(props.tokenBalance, "Ether")
            }
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">UNI</InputAdornment>
              ),
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="standard-full-width"
            label="Output"
            style={{ margin: 8 }}
            placeholder="0"
            helperText={
              "Balance: " +
              window.web3.utils.fromWei(props.etherBalance, "Ether")
            }
            fullWidth
            disabled={true}
            margin="normal"
            value={value}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">ETH</InputAdornment>
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
            <p>Exchange rate : 100 UNI = 1 ETH</p>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );
}
