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

function useInput({ type /*...*/ }) {
  const [value, setValue] = useState("");
  const input = (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type={type}
    />
  );
  return [value, input];
}

export default function LayoutTextFields(props) {
  const classes = useStyles();
  const [output, setOutput] = useState(0);
  const [value, setValue] = useInput({ type: "text" });

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <TextField
          id="standard-full-width"
          label="Input"
          onChange={(event) => {
            console.log("changing....");
            // const etherAmount = this.input.value;
            // setOutput(etherAmount * 100);
            {
              value;
            }
          }}
          style={{ margin: 8 }}
          placeholder="0"
          helperText={
            "Balance: " + window.web3.utils.fromWei(props.etherBalance, "Ether")
          }
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
          label="Output"
          style={{ margin: 8 }}
          placeholder="0"
          helperText={
            "Balance: " + window.web3.utils.fromWei(props.tokenBalance, "Ether")
          }
          fullWidth
          margin="normal"
          value={output}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">DAI</InputAdornment>
            ),
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <CardActions>
          <Button variant="contained" color="primary">
            SWAP
          </Button>
          <p>Exchange rate : 1 ETH = 100 DAI</p>
        </CardActions>
      </CardContent>
    </Card>
  );
}
