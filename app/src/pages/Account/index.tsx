// @ts-nocheck

import React from "react";
import { Typography, Paper, Container } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import logo from "../logo.png";
import { Autorenew } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  logo: {
    margin: "auto",
    display: "block",
  },
  lineChart: {
    margin: "auto",
  },
  headingtext: {
    textAlign: "center",
    color: "rgb(16 152 107)",
  },
}));

const AccountPage = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <main>
        <div className={classes.drawerHeader} />
        {/* <img src={logo} alt="logo" className={classes.logo} /> */}
        <Typography paragraph>
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"


        </Typography>
        Forecast of carbon dioxide emissions worldwide from 2018 to 2050 in
        billion metric tons.
      </main>
    </Container>
  );
};

export { AccountPage };
