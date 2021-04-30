import React, { useState, useInput } from "react";
import Buy from "./Buy";
import Sell from "./Sell";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function LayoutTextFields(props) {
  const [value, setValue] = useState(true);
  const changeValue = (e) => {
    setValue(!value);
  };
  let content;
  if (value) {
    content = (
      <Buy
        etherBalance={props.etherBalance}
        tokenBalance={props.tokenBalance}
        buyTokens={props.buyTokens}
      />
    );
  } else {
    content = (
      <Sell
        etherBalance={props.etherBalance}
        tokenBalance={props.tokenBalance}
        sellTokens={props.sellTokens}
      />
    );
  }
  return (
    <>
      {content}
      <div>
        <Button onClick={changeValue} variant="contained" color="secondary">
          Reset
        </Button>
      </div>
    </>
  );
}
